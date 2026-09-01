import { NextResponse } from "next/server";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let payload: { email?: unknown; source?: unknown };

  try {
    payload = (await request.json()) as { email?: unknown; source?: unknown };
  } catch {
    return NextResponse.json({ message: "Invalid request." }, { status: 400 });
  }

  const email = typeof payload.email === "string" ? payload.email.trim().toLowerCase() : "";
  const source = typeof payload.source === "string" ? payload.source.slice(0, 64) : "site";

  if (!emailPattern.test(email) || email.length > 254) {
    return NextResponse.json({ message: "Enter a valid email address." }, { status: 400 });
  }

  const webhook = process.env.NEWSLETTER_WEBHOOK_URL;

  if (!webhook) {
    return NextResponse.json({
      preview: true,
      message: "Signup preview only—the newsletter provider is not connected yet, so your email was not stored.",
    });
  }

  try {
    const response = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, source }),
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json({ message: "The newsletter service is unavailable. Please try again." }, { status: 502 });
    }

    return NextResponse.json({ message: "You’re on the list. Check your inbox for confirmation." });
  } catch {
    return NextResponse.json({ message: "The newsletter service is unavailable. Please try again." }, { status: 502 });
  }
}
