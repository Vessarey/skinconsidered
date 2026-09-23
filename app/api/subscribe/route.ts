const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Payload = { email?: unknown; source?: unknown; website?: unknown };

export async function POST(request: Request) {
  let value: unknown;

  try {
    value = await request.json();
  } catch {
    return Response.json({ message: "Invalid request." }, { status: 400 });
  }

  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return Response.json({ message: "Invalid request." }, { status: 400 });
  }
  const payload = value as Payload;

  const email = typeof payload.email === "string" ? payload.email.trim().toLowerCase() : "";
  const source = typeof payload.source === "string" ? payload.source.replace(/[^a-z0-9-]/gi, "").slice(0, 64) || "site" : "site";
  const honeypot = typeof payload.website === "string" ? payload.website.trim() : "";

  if (!emailPattern.test(email) || email.length > 254) {
    return Response.json({ message: "Enter a valid email address." }, { status: 400 });
  }

  // A filled honeypot means an automated submission. Acknowledge without forwarding.
  if (honeypot) {
    return Response.json({ message: "Request received." });
  }

  const webhook = process.env.NEWSLETTER_WEBHOOK_URL?.trim();
  const buttondown = process.env.BUTTONDOWN_API_KEY?.trim();

  if (!webhook && !buttondown) {
    return Response.json({
      preview: true,
      message: "Email subscriptions are not available yet. Your address has not been saved. You can read the preview online.",
    });
  }

  try {
    // Preserve double opt-in on new and returning subscriptions. Source metadata
    // avoids requiring a paid plan's tag-creation feature just to subscribe.
    const response = buttondown
      ? await fetch("https://api.buttondown.com/v1/subscribers", {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Token ${buttondown}`, "X-Buttondown-Collision-Behavior": "add" },
          body: JSON.stringify({ email_address: email, metadata: { signup_source: source }, type: "unactivated" }),
          cache: "no-store",
          signal: AbortSignal.timeout(10000),
        })
      : await fetch(webhook as string, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, source }),
          cache: "no-store",
          signal: AbortSignal.timeout(10000),
        });

    if (!response.ok) {
      const message = response.status === 429
        ? "Signups are busy right now. Please try again in a little while."
        : "We couldn’t complete your signup. Please check your address and try again.";
      return Response.json({ message }, { status: response.status === 429 ? 429 : 502 });
    }

    return Response.json({ message: "Request received. If confirmation is needed, look for an email from The Daily Considered and follow the link inside." });
  } catch {
    return Response.json({ message: "The newsletter service is unavailable. Please try again." }, { status: 502 });
  }
}
