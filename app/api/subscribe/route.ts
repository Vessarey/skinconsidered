import { NextResponse } from "next/server";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Payload = { email?: unknown; source?: unknown; website?: unknown };

export async function POST(request: Request) {
  let payload: Payload;

  try {
    payload = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ message: "Invalid request." }, { status: 400 });
  }

  const email = typeof payload.email === "string" ? payload.email.trim().toLowerCase() : "";
  const source = typeof payload.source === "string" ? payload.source.replace(/[^a-z0-9-]/gi, "").slice(0, 64) || "site" : "site";
  const honeypot = typeof payload.website === "string" ? payload.website.trim() : "";

  if (!emailPattern.test(email) || email.length > 254) {
    return NextResponse.json({ message: "Enter a valid email address." }, { status: 400 });
  }

  // A filled honeypot means an automated submission. Acknowledge without forwarding.
  if (honeypot) {
    return NextResponse.json({ message: "Request received." });
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

    return NextResponse.json({ message: "Request received. Watch your inbox for the confirmation step." });
  } catch {
    return NextResponse.json({ message: "The newsletter service is unavailable. Please try again." }, { status: 502 });
  }
}
