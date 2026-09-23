"use client";

import { Analytics } from "@vercel/analytics/next";
import { analyticsUrl } from "@/lib/analytics-privacy";

export function PageAnalytics() {
  return <Analytics beforeSend={(event) => {
    if (["localhost", "127.0.0.1", "[::1]"].includes(window.location.hostname)) return null;
    return { ...event, url: analyticsUrl(event.url) };
  }} />;
}
