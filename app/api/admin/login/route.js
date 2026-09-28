import { cookies } from "next/headers";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

export async function POST(request) {
  try {
    const body = await request.json();
    const email = String(body?.email || "").trim();
    const password = String(body?.password || "");

    if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
      return Response.json(
        {
          error: "Admin credentials have not been configured in the environment.",
        },
        { status: 500 }
      );
    }

    if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      return Response.json(
        {
          error: "Invalid email or password.",
        },
        { status: 401 }
      );
    }

    const token = Buffer.from(`${ADMIN_EMAIL}:${ADMIN_PASSWORD}`).toString("base64");
    const cookieStore = await cookies();

    cookieStore.set("admin_session", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 8,
    });

    return Response.json({ success: true, message: "Admin session started." });
  } catch (error) {
    return Response.json(
      {
        error: error.message || "Unable to authenticate admin.",
      },
      { status: 500 }
    );
  }
}
