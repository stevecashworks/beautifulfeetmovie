import { connectDB } from "@/lib/db";
import { Submission } from "@/lib/models";

export async function POST(request) {
  try {
    const body = await request.json();
    const churchName = String(body?.churchName || "").trim();
    const pastorName = String(body?.pastorName || "").trim();
    const churchAddress = String(body?.churchAddress || "").trim();
    const email = String(body?.email || "").trim();
    const phone = String(body?.phone || "").trim();
    const bookingDate = String(body?.bookingDate || "").trim();
    const preferredCinema = String(body?.preferredCinema || "").trim();
    const quantity = Number(body?.quantity);

    if (!churchName || !pastorName || !churchAddress || !email || !phone || !bookingDate || !preferredCinema) {
      return Response.json({ error: "All bulk booking fields are required." }, { status: 400 });
    }

    if (!Number.isInteger(quantity) || quantity < 100) {
      return Response.json({ error: "Bulk bookings require at least 100 seats." }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json({ error: "Enter a valid email address." }, { status: 400 });
    }

    await connectDB();
    await Submission.create({
      formType: "bulk_booking",
      name: churchName,
      churchName,
      churchAddress,
      pastorName,
      email,
      phone,
      quantity,
      bookingDate,
      preferredCinema,
      source: "bulk_booking_form",
      status: "submitted",
    });

    return Response.json(
      { success: true, message: "Your request has been received. Our team will contact you soon." },
      { status: 201 }
    );
  } catch (error) {
    return Response.json(
      { error: error.message || "Something went wrong while saving the bulk booking request." },
      { status: 500 }
    );
  }
}