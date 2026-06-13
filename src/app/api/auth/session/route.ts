import { NextResponse } from "next/server";
import { getAdminAuth } from "@/lib/firebase-admin";

const SESSION_COOKIE = "__session";
const EXPIRES_MS = 60 * 60 * 24 * 5 * 1000; // 5 days

export async function POST(request: Request) {
  const adminAuth = getAdminAuth();
  if (!adminAuth) {
    return NextResponse.json(
      { error: "Server session not configured. Add FIREBASE_SERVICE_ACCOUNT to .env.local." },
      { status: 503 }
    );
  }

  const { idToken } = (await request.json()) as { idToken?: string };
  if (!idToken) {
    return NextResponse.json({ error: "Missing idToken" }, { status: 400 });
  }

  try {
    const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn: EXPIRES_MS });
    const response = NextResponse.json({ status: "ok" });
    response.cookies.set(SESSION_COOKIE, sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: EXPIRES_MS / 1000,
      path: "/",
      sameSite: "lax",
    });
    return response;
  } catch {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ status: "signed_out" });
  response.cookies.set(SESSION_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 0,
    path: "/",
  });
  return response;
}
