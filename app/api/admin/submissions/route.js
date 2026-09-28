import { cookies } from "next/headers";
import { connectDB } from "@/lib/db";
import { Submission } from "@/lib/models";

function getExpectedSessionToken() {
  const adminEmail = process.env.ADMIN_EMAIL || "";
  const adminPassword = process.env.ADMIN_PASSWORD || "";
  return Buffer.from(`${adminEmail}:${adminPassword}`).toString("base64");
}

async function requireAdmin() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("admin_session")?.value;
  return sessionCookie === getExpectedSessionToken();
}

export async function GET() {
  try {
    if (!(await requireAdmin())) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!process.env.MONGO_URI) {
      return Response.json(
        {
          error: "MongoDB is not configured. Add MONGO_URI to your .env.local file before opening the admin dashboard.",
        },
        { status: 503 }
      );
    }

    await connectDB();
    const submissions = await Submission.find({}).sort({ createdAt: -1 }).lean();

    return Response.json({ submissions: submissions.map((item) => ({
      ...item,
      _id: String(item._id),
      createdAt: item.createdAt ? new Date(item.createdAt).toISOString() : null,
      updatedAt: item.updatedAt ? new Date(item.updatedAt).toISOString() : null,
    })) });
  } catch (error) {
    const message = String(error?.message || "");
    const lowerMessage = message.toLowerCase();

    if (
      lowerMessage.includes("bad auth") ||
      lowerMessage.includes("authentication failed") ||
      lowerMessage.includes("authentication failed.") ||
      lowerMessage.includes("invalid username") ||
      lowerMessage.includes("bad credentials") ||
      lowerMessage.includes("failed to connect to mongodb")
    ) {
      return Response.json(
        {
          error: "MongoDB authentication failed. Check your MONGO_URI in .env.local and replace the placeholder username/password with your actual Atlas credentials.",
        },
        { status: 503 }
      );
    }

    return Response.json({ error: message || "Unable to fetch submissions." }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    if (!(await requireAdmin())) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const submissionId = body?.id;

    if (!submissionId) {
      return Response.json({ error: "Submission ID is required." }, { status: 400 });
    }

    await connectDB();
    await Submission.findByIdAndDelete(submissionId);

    return Response.json({ success: true, message: "Submission deleted successfully." });
  } catch (error) {
    return Response.json({ error: error.message || "Unable to delete submission." }, { status: 500 });
  }
}
