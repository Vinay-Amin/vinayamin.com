import { NextRequest, NextResponse } from "next/server";

type ContactPayload = {
  fullName: string;
  email: string;
  phone?: string;
  organization?: string;
  message: string;
};

const RATE_LIMIT_WINDOW_MS = Number(process.env.CONTACT_RATE_LIMIT_WINDOW_MS ?? 60_000);
const RATE_LIMIT_MAX = Number(process.env.CONTACT_RATE_LIMIT_MAX ?? 5);

const rateLimitStore = new Map<string, { hits: number; expiresAt: number }>();

const emailRegex = /^(?:[a-zA-Z0-9_'^&+{}=?!#$%\-]+(?:\.[a-zA-Z0-9_'^&+{}=?!#$%\-]+)*|".+")@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;

function sanitize(value: unknown) {
  if (typeof value !== "string") return "";
  return value.trim();
}

function validatePayload(payload: Partial<ContactPayload>) {
  const errors: Record<string, string> = {};
  const fullName = sanitize(payload.fullName);
  const email = sanitize(payload.email);
  const message = sanitize(payload.message);

  if (!fullName) {
    errors.fullName = "Full name is required.";
  }

  if (!email) {
    errors.email = "Email is required.";
  } else if (!emailRegex.test(email)) {
    errors.email = "Invalid email address.";
  }

  if (!message) {
    errors.message = "Message is required.";
  }

  if (Object.keys(errors).length > 0) {
    return { errors } as const;
  }

  return {
    data: {
      fullName,
      email,
      phone: sanitize(payload.phone),
      organization: sanitize(payload.organization),
      message,
    },
  } as const;
}

function checkRateLimit(key: string) {
  const now = Date.now();
  const entry = rateLimitStore.get(key);

  if (!entry || entry.expiresAt < now) {
    rateLimitStore.set(key, { hits: 1, expiresAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (entry.hits >= RATE_LIMIT_MAX) {
    return false;
  }

  entry.hits += 1;
  return true;
}

async function sendMail(payload: ContactPayload) {
  const apiKey = process.env.RESEND_API_KEY ?? process.env.SENDGRID_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !from || !to) {
    throw new Error("Missing email delivery environment configuration.");
  }

  const subject = `New contact from ${payload.fullName}`;
  const html = `
    <h1>New contact submission</h1>
    <p><strong>Name:</strong> ${payload.fullName}</p>
    <p><strong>Email:</strong> ${payload.email}</p>
    <p><strong>Phone:</strong> ${payload.phone || "—"}</p>
    <p><strong>Organisation:</strong> ${payload.organization || "—"}</p>
    <p><strong>Message:</strong></p>
    <p>${payload.message.replace(/\n/g, "<br />")}</p>
  `;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (process.env.RESEND_API_KEY) {
    headers.Authorization = `Bearer ${apiKey}`;
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers,
      body: JSON.stringify({
        from,
        to: [to],
        subject,
        html,
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`Resend error: ${response.status} ${errorBody}`);
    }

    return;
  }

  // Fallback to SendGrid REST API if RESEND_API_KEY is not present.
  headers.Authorization = `Bearer ${apiKey}`;
  const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
    method: "POST",
    headers,
    body: JSON.stringify({
      personalizations: [
        {
          to: [{ email: to }],
          subject,
        },
      ],
      from: { email: from },
      content: [{ type: "text/html", value: html }],
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`SendGrid error: ${response.status} ${errorBody}`);
  }
}

async function logToNotion(payload: ContactPayload) {
  const apiKey = process.env.NOTION_API_KEY;
  const databaseId = process.env.NOTION_DATABASE_ID;

  if (!apiKey || !databaseId) {
    throw new Error("Missing Notion logging configuration.");
  }

  const response = await fetch("https://api.notion.com/v1/pages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
      "Notion-Version": "2022-06-28",
    },
    body: JSON.stringify({
      parent: { database_id: databaseId },
      properties: {
        Name: {
          title: [
            {
              text: { content: payload.fullName },
            },
          ],
        },
        Email: {
          email: payload.email,
        },
        Phone: payload.phone
          ? {
              rich_text: [
                {
                  text: { content: payload.phone },
                },
              ],
            }
          : undefined,
        Organisation: payload.organization
          ? {
              rich_text: [
                {
                  text: { content: payload.organization },
                },
              ],
            }
          : undefined,
        Message: {
          rich_text: [
            {
              text: { content: payload.message },
            },
          ],
        },
        Status: {
          status: { name: "New" },
        },
        "Submitted At": {
          date: { start: new Date().toISOString() },
        },
      },
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Notion logging failed: ${response.status} ${errorBody}`);
  }
}

export async function POST(request: NextRequest) {
  if (request.headers.get("content-type")?.includes("application/json") !== true) {
    return NextResponse.json({ message: "Unsupported content type" }, { status: 415 });
  }

  let payload: Partial<ContactPayload>;

  try {
    payload = await request.json();
  } catch (error) {
    return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 });
  }

  const validation = validatePayload(payload);

  if ("errors" in validation) {
    return NextResponse.json(
      { message: "Validation failed", errors: validation.errors },
      { status: 422 }
    );
  }

  const clientIdentifier =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("cf-connecting-ip") ??
    request.ip ??
    "anonymous";

  if (!checkRateLimit(clientIdentifier)) {
    return NextResponse.json({ message: "Too many requests" }, { status: 429 });
  }

  try {
    await Promise.all([sendMail(validation.data), logToNotion(validation.data)]);
  } catch (error) {
    console.error("Contact submission failed", error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Unable to process submission" },
      { status: 500 }
    );
  }

  return NextResponse.json({ message: "Thanks for reaching out!" }, { status: 200 });
}
