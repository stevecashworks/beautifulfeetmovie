import { connectDB } from "@/lib/db";
import { Submission } from "@/lib/models";

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      phone,
      mode,
      connectToMissionary = false,
      quantity = 1,
      amount,
    } = body || {};

    const secretKey = process.env.PAYSTACK_SECRET_KEY;
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    if (!secretKey) {
      return Response.json(
        {
          error:
            "Paystack is not configured yet. Add PAYSTACK_SECRET_KEY to your environment and restart the app.",
        },
        { status: 400 }
      );
    }

    if (!name || !email || !phone) {
      return Response.json(
        {
          error: "Name, email, and phone are required.",
        },
        { status: 400 }
      );
    }

    const numericAmount = Number(amount || 0);
    if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
      return Response.json(
        {
          error: "A valid amount is required.",
        },
        { status: 400 }
      );
    }

    const normalizedMode = mode === "donation" ? "donation" : "ticket";
    const missionaryConnectionRequested = normalizedMode === "donation" && connectToMissionary === true;

    await connectDB();
    await Submission.create({
      formType: normalizedMode,
      name: String(name).trim(),
      email: String(email).trim(),
      phone: String(phone).trim(),
      mode: normalizedMode,
      quantity: Number(quantity || 1),
      amount: numericAmount,
      source: "paystack_checkout",
      status: "pending",
      metadata: { connectToMissionary: missionaryConnectionRequested },
    });

    const payload = {
      email,
      amount: Math.round(numericAmount * 100),
      currency: "NGN",
      reference: `bf-${Date.now()}-${Math.random().toString(16).slice(2, 10)}`,
      callback_url: `${appUrl}/payments/success`,
      metadata: {
        custom_fields: [
          {
            display_name: "Full Name",
            variable_name: "full_name",
            value: name,
          },
          {
            display_name: "Phone Number",
            variable_name: "phone",
            value: phone,
          },
          {
            display_name: "Payment Type",
            variable_name: "payment_type",
            value: normalizedMode === "donation" ? "Donation" : "Ticket",
          },
          {
            display_name: "Ticket Quantity",
            variable_name: "ticket_quantity",
            value: String(quantity || 1),
          },
          {
            display_name: "Missionary Connection Requested",
            variable_name: "connect_to_missionary",
            value: missionaryConnectionRequested ? "Yes" : "No",
          },
        ],
      },
    };

    const paystackResponse = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secretKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const paystackData = await paystackResponse.json();

    if (!paystackResponse.ok) {
      return Response.json(
        {
          error: paystackData?.message || "Failed to initialize Paystack payment.",
        },
        { status: paystackResponse.status }
      );
    }

    await Submission.updateOne(
      {
        email: String(email).trim(),
        phone: String(phone).trim(),
        amount: numericAmount,
        mode: normalizedMode,
      },
      { reference: paystackData?.data?.reference || null, status: "initialized" }
    );

    return Response.json({
      authorization_url: paystackData?.data?.authorization_url,
      reference: paystackData?.data?.reference,
    });
  } catch (error) {
    return Response.json(
      {
        error: error.message || "Something went wrong while starting your payment.",
      },
      { status: 500 }
    );
  }
}
