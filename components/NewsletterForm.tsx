"use client";

import Link from "next/link";
import { FormEvent, useId, useState } from "react";
import { NEWSLETTER, siteUrl } from "@/content/site";
import { track } from "./PostHogProvider";

type FormState = "idle" | "submitting" | "success" | "error" | "preview";

export function NewsletterForm({ source = "site", configured = false, previewHref = "/newsletter" }: { source?: string; configured?: boolean; previewHref?: string }) {
  const [status, setStatus] = useState<FormState>("idle");
  const [message, setMessage] = useState("");
  const id = useId();

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;
    const formElement = event.currentTarget;
    setStatus("submitting");
    setMessage("");
    const form = new FormData(formElement);

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: String(form.get("email") ?? "").trim(), source, website: String(form.get("website") ?? "") }),
        signal: AbortSignal.timeout(15000),
      });
      const result = (await response.json()) as { message?: string; preview?: boolean };
      if (result.preview) {
        setStatus("preview");
        setMessage("Email subscriptions are not available yet. Your address has not been saved.");
        track("newsletter_submit", { source, outcome: "preview" });
        return;
      }
      if (!response.ok) {
        setStatus("error");
        setMessage(result.message ?? "We couldn’t complete your signup. Please try again.");
        track("newsletter_submit", { source, outcome: "error" });
        return;
      }
      setStatus("success");
      setMessage(result.message ?? "Check your inbox for your confirmation email.");
      track("newsletter_submit", { source, outcome: "success" });
      formElement.reset();
    } catch {
      setStatus("error");
      setMessage("We couldn’t reach the newsletter service. Your address is still here so you can try again.");
      track("newsletter_submit", { source, outcome: "error" });
    }
  }

  if (!configured || status === "preview") {
    return (
      <div className="newsletter-preview" data-source={source}>
        <p><b>Keep reading.</b> Follow new stories in your feed reader, or explore a sample briefing. Email subscriptions are not available yet.</p>
        {message && <p role="status">{message}</p>}
        <div className="newsletter-preview-actions">
          <Link className="primary-action" href={previewHref}>Read the preview <span aria-hidden="true">→</span></Link>
          <a href="/rss.xml">Get the RSS feed <span aria-hidden="true">↗</span></a>
        </div>
        <details className="feed-follow">
          <summary>Follow new stories in a feed reader</summary>
          <p>Already use a feed reader? Add this address to receive new stories there.</p>
          <label htmlFor={id + "-feed"}>Feed address</label>
          <input id={id + "-feed"} readOnly value={siteUrl() + "/rss.xml"} onFocus={(event) => event.target.select()} />
        </details>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="newsletter-success" role="status">
        <h3>One more step: check your inbox.</h3>
        <p>{message}</p>
        <p>If you&apos;re already subscribed, you&apos;re all set. Otherwise, follow the confirmation link to start receiving the briefing.</p>
        <Link href={previewHref}>Read an issue while you wait <span aria-hidden="true">→</span></Link>
        <button type="button" onClick={() => { setStatus("idle"); setMessage(""); }}>Use a different address</button>
      </div>
    );
  }

  return (
    <form className="newsletter-form" data-source={source} onSubmit={submit} aria-busy={status === "submitting"}>
      <label htmlFor={id + "-email"}>Email address</label>
      <div>
        <input id={id + "-email"} name="email" type="email" inputMode="email" autoComplete="email" placeholder="you@example.com"
          aria-describedby={id + "-message"} required maxLength={254} readOnly={status === "submitting"} />
        <button disabled={status === "submitting"} type="submit">{status === "submitting" ? "Sending…" : "Subscribe free"}</button>
      </div>
      <div className="hp" aria-hidden="true">
        <label htmlFor={id + "-website"}>Leave this field empty</label>
        <input id={id + "-website"} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <p className={"form-message " + status} id={id + "-message"} aria-live="polite">
        {message || <>{NEWSLETTER.cadence}. Free. Unsubscribe any time. <Link href="/privacy#newsletter">Privacy</Link>.</>}
      </p>
      <Link className="newsletter-sample-link" href={previewHref}>Read an issue first <span aria-hidden="true">↗</span></Link>
    </form>
  );
}
