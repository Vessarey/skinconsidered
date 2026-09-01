"use client";

import { FormEvent, useState } from "react";

type FormState = "idle" | "submitting" | "success" | "error" | "preview";

export function NewsletterForm({ source = "site" }: { source?: string }) {
  const [status, setStatus] = useState<FormState>("idle");
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");

    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "").trim();

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });
      const result = (await response.json()) as { message?: string; preview?: boolean };

      if (result.preview) {
        setStatus("preview");
        setMessage(result.message ?? "Signup is in preview mode.");
        return;
      }

      if (!response.ok) throw new Error(result.message ?? "Please try again.");
      setStatus("success");
      setMessage(result.message ?? "You’re on the list.");
      event.currentTarget.reset();
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Please try again.");
    }
  }

  return (
    <form className="newsletter-form" onSubmit={submit}>
      <label htmlFor={`newsletter-email-${source}`}>Email address</label>
      <div>
        <input
          id={`newsletter-email-${source}`}
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="YOUR@EMAIL.COM"
          required
        />
        <button disabled={status === "submitting"} type="submit">
          {status === "submitting" ? "Sending…" : "Subscribe"}
        </button>
      </div>
      <p className={`form-message ${status}`} aria-live="polite">
        {message || "One considered briefing each Sunday. Free. Unsubscribe anytime."}
      </p>
    </form>
  );
}
