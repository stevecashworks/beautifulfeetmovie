export async function POST(request) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      phone,
      mode,
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
            value: mode === "donation" ? "Donation" : "Ticket",
          },
          {
            display_name: "Ticket Quantity",
            variable_name: "ticket_quantity",
            value: String(quantity || 1),
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

    return Response.json({
      authorization_url: paystackData?.data?.authorization_url,
      reference: paystackData?.data?.reference,
    });
  } catch (error) {
    return Response.json(
      {
        error: "Something went wrong while starting your payment.",
      },
      { status: 500 }
    );
  }
}
