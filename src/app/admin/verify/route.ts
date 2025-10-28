import { NextRequest, NextResponse } from "next/server";

import { createSession, consumeMagicLinkToken } from "@/lib/auth/store";

const SESSION_COOKIE = "admin_session";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL?.toLowerCase();

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");
  const redirectUrl = new URL("/admin", request.url);

  if (!token) {
    redirectUrl.searchParams.set("error", "missing-token");
    return NextResponse.redirect(redirectUrl);
  }

  const record = await consumeMagicLinkToken(token);

  if (!record) {
    redirectUrl.searchParams.set("error", "invalid-or-expired-token");
    return NextResponse.redirect(redirectUrl);
  }

  if (ADMIN_EMAIL && record.email.toLowerCase() !== ADMIN_EMAIL) {
    redirectUrl.searchParams.set("error", "unauthorised-email");
    return NextResponse.redirect(redirectUrl);
  }

  const sessionId = await createSession(record.email);
  redirectUrl.searchParams.set("status", "authenticated");

  const response = NextResponse.redirect(redirectUrl);
  response.cookies.set(SESSION_COOKIE, sessionId, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24,
  });

  return response;
}
