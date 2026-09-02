"use client";

import { usePathname } from "next/navigation";
import posthog from "posthog-js";
import { useEffect } from "react";

/**
 * Product analytics with the privacy posture documented on /privacy:
 * no cookies (local storage only), no session recording, no autocapture of
 * clicks or form contents, Do Not Track respected, and only the events this
 * site defines (page views and newsletter form outcomes without the address).
 *
 * Initialization is skipped entirely when NEXT_PUBLIC_POSTHOG_KEY is unset,
 * so local builds and forks send nothing.
 */
const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const host = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com";

let initialized = false;

function ensureInit() {
  if (initialized || !key || typeof window === "undefined") return;
  posthog.init(key, {
    api_host: host,
    persistence: "localStorage",
    capture_pageview: false,
    capture_pageleave: true,
    autocapture: false,
    disable_session_recording: true,
    respect_dnt: true,
    person_profiles: "identified_only",
    capture_dead_clicks: false,
    disable_surveys: true,
  });
  initialized = true;
}

/** Fire an app event by name. Safe to call when analytics are off. */
export function track(event: string, properties?: Record<string, string | number | boolean>) {
  if (!key) return;
  ensureInit();
  posthog.capture(event, properties);
}

export function PostHogProvider() {
  const pathname = usePathname();

  useEffect(() => {
    if (!key) return;
    ensureInit();
    posthog.capture("$pageview", { $current_url: window.location.href });
  }, [pathname]);

  return null;
}
