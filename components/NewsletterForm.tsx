"use client";

import Link from "next/link";
import { FormEvent, useId, useState } from "react";

type FormState = "idle" | "submitting" | "success" | "error" | "preview";

export function NewsletterForm({ source = "site" }: { source?: string }) {
  const [status, setStatus] = useState<FormState>("idle");
  const [message, setMessage] = useState("");
  const id = useId();

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    setStatus("submitting");
    setMessage("");

    const form = new FormData(formElement);
    const email = String(form.get("email") ?? "").trim();
    const website = String(form.get("website") ?? "");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source, website }),
      });
      const result = (await response.json()) as { message?: string; preview?: boolean };

      if (result.preview) {
        setStatus("preview");
        setMessage(result.message ?? "Signup is in preview mode.");
        return;
      }

      if (!response.ok) throw new Error(result.message ?? "Please try again.");
      setStatus("success");
      setMessage(result.message ?? "Request received.");
      formElement.reset();
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Please try again.");
    }
  }

  return (
    <form className="newsletter-form" onSubmit={submit} noValidate={false}>
      <label htmlFor={`${id}-email`}>Email address</label>
      <div>
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="YOUR@EMAIL.COM"
          aria-describedby={`${id}-message`}
          required
        />
        <button disabled={status === "submitting"} type="submit">
          {status === "submitting" ? "Sending…" : "Subscribe"}
        </button>
      </div>
      {/* Honeypot: hidden from people, filled by bots, rejected by the API. */}
      <div className="hp" aria-hidden="true">
        <label htmlFor={`${id}-website`}>Leave this field empty</label>
        <input id={`${id}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <p className={`form-message ${status}`} id={`${id}-message`} aria-live="polite">
        {message || (
          <>
            One considered briefing each Sunday. Free. Unsubscribe anytime. <Link href="/privacy#newsletter">How we handle your address</Link>.
          </>
        )}
      </p>
    </form>
  );
}
