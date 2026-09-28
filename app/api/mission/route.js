import { connectDB } from "@/lib/db";
import { Submission } from "@/lib/models";

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      phone,
      localChurchNameAndAddress,
      pastorName,
      calling,
    } = body || {};

    if (!name || !email || !phone || !localChurchNameAndAddress || !pastorName || !calling) {
      return Response.json(
        {
          error: "All mission form fields are required.",
        },
        { status: 400 }
      );
    }

    await connectDB();

    await Submission.create({
      formType: "mission",
      name: String(name).trim(),
      email: String(email).trim(),
      phone: String(phone).trim(),
      localChurchNameAndAddress: String(localChurchNameAndAddress).trim(),
      pastorName: String(pastorName).trim(),
      calling: String(calling).trim(),
      source: "mission_form",
      status: "submitted",
    });

    return Response.json({ success: true, message: "Mission form submitted successfully." });
  } catch (error) {
    return Response.json(
      {
        error: error.message || "Something went wrong while saving the mission form.",
      },
      { status: 500 }
    );
  }
}
