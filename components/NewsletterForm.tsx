"use client";

import Link from "next/link";
import { FormEvent, useId, useState } from "react";
import { NEWSLETTER } from "@/content/site";
import { track } from "./PostHogProvider";

type FormState = "idle" | "submitting" | "success" | "error" | "preview";

/**
 * `configured` is decided on the server from NEWSLETTER_WEBHOOK_URL. When it is
 * false the form says so before anyone types, and the API confirms it after.
 */
export function NewsletterForm({ source = "site", configured = false }: { source?: string; configured?: boolean }) {
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
        track("newsletter_submit", { source, outcome: "preview" });
        return;
      }

      if (!response.ok) throw new Error(result.message ?? "Please try again.");
      setStatus("success");
      setMessage(result.message ?? "Request received.");
      track("newsletter_submit", { source, outcome: "success" });
      formElement.reset();
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Please try again.");
      track("newsletter_submit", { source, outcome: "error" });
    }
  }

  return (
    <form className="newsletter-form" data-source={source} onSubmit={submit} noValidate={false}>
      {!configured && (
        <p className="newsletter-preview-note" role="status">
          <b>Preview.</b> The newsletter provider is not connected yet, so addresses are not stored. You can test the form; nothing is sent.
        </p>
      )}
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
          {status === "submitting" ? "Sending…" : configured ? "Subscribe" : "Test signup"}
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
            {NEWSLETTER.cadence}. {NEWSLETTER.reassurance} <Link href="/privacy#newsletter">How we handle your address</Link>.
          </>
        )}
      </p>
    </form>
  );
}
