import crypto from "crypto";

import { storeMagicLinkToken } from "./store";

const DEFAULT_MAGIC_LINK_EXPIRY_MINUTES = 15;

function resolveBaseUrl(): string {
  if (process.env.APP_BASE_URL) {
    return process.env.APP_BASE_URL;
  }

  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL;
  }

  if (process.env.VERCEL_URL) {
    return process.env.VERCEL_URL.startsWith("http")
      ? process.env.VERCEL_URL
      : `https://${process.env.VERCEL_URL}`;
  }

  return "http://localhost:3000";
}

export async function dispatchMagicLink(email: string) {
  const token = crypto.randomUUID().replace(/-/g, "");
  const expiresAt = new Date(Date.now() + DEFAULT_MAGIC_LINK_EXPIRY_MINUTES * 60 * 1000);
  await storeMagicLinkToken(email, token, expiresAt);

  const baseUrl = resolveBaseUrl();
  const verificationUrl = `${baseUrl}/admin/verify?token=${token}`;

  const apiKey = process.env.RESEND_API_KEY;
  const fromAddress = process.env.MAGIC_LINK_FROM || "no-reply@vinayvp.com";

  if (apiKey) {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: fromAddress,
        to: email,
        subject: "Your Vinay VP admin login link",
        html: `<p>Here is your secure login link:</p><p><a href="${verificationUrl}">${verificationUrl}</a></p><p>This link expires in ${DEFAULT_MAGIC_LINK_EXPIRY_MINUTES} minutes.</p>`,
      }),
    });

    if (!response.ok) {
      console.error("Resend email API failed", await response.text());
    }
  } else {
    console.warn("RESEND_API_KEY is not configured. Magic link URL:", verificationUrl);
  }

  return { verificationUrl, expiresAt };
}
