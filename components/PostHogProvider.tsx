"use client";

import { usePathname } from "next/navigation";
import posthog from "posthog-js";
import { useEffect } from "react";

/**
 * Product analytics with the privacy posture documented on /privacy:
 * no cookies (local storage only), no session recording, no autocapture of
 * clicks or form contents, Do Not Track respected, and only the aggregate
 * events this site defines. Nothing here carries an email, a search query,
 * or free text a reader typed.
 *
 * Events (all documented on /privacy and in docs/GROWTH_LOOP.md):
 *   $pageview, $pageleave (with scroll depth), $web_vitals
 *   newsletter_view {source}            a signup panel scrolled into view
 *   newsletter_submit {source, outcome} form outcome, never the address
 *   outbound_click {domain, path}       a source or external link opened
 *   related_click {to_kind, path}       an internal related-file link opened
 *   cta_click {label, path}             a primary call-to-action button
 *   procedure_filter {group, value}     a comparison filter chip pressed
 *   procedure_expand {slug}             a procedure row opened
 *   site_search {results, zero}         archive search submitted; no query text
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
    capture_performance: { web_vitals: true, network_timing: false },
  });
  initialized = true;
}

type Props = Record<string, string | number | boolean>;

/** Fire an app event by name. Safe to call when analytics are off. */
export function track(event: string, properties?: Props) {
  if (!key) return;
  ensureInit();
  posthog.capture(event, properties);
}

const seenPanels = new WeakSet<Element>();

function watchNewsletterPanels() {
  if (!("IntersectionObserver" in window)) return () => {};
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting || seenPanels.has(entry.target)) continue;
        seenPanels.add(entry.target);
        const source = (entry.target.querySelector("form") as HTMLFormElement | null)?.dataset.source ?? entry.target.getAttribute("data-source") ?? "unknown";
        track("newsletter_view", { source, path: window.location.pathname });
        observer.unobserve(entry.target);
      }
    },
    { threshold: 0.5 },
  );
  document.querySelectorAll(".newsletter-panel, .footer-newsletter").forEach((panel) => observer.observe(panel));
  return () => observer.disconnect();
}

function onDocumentClick(event: MouseEvent) {
  const target = event.target as Element | null;
  if (!target) return;
  const path = window.location.pathname;

  const anchor = target.closest("a[href]") as HTMLAnchorElement | null;
  if (anchor) {
    let url: URL | null = null;
    try {
      url = new URL(anchor.href, window.location.origin);
    } catch {
      url = null;
    }
    if (url && url.origin !== window.location.origin) {
      track("outbound_click", { domain: url.hostname.replace(/^www\./, ""), path });
      return;
    }
    if (anchor.closest(".related-files")) {
      const kind = anchor.querySelector("small")?.textContent?.trim().toLowerCase() ?? "file";
      track("related_click", { to_kind: kind, path });
      return;
    }
    if (anchor.closest(".home-now-actions, .home-procedure-entry, .home-us, .home-explore nav, .procedure-start nav, .procedure-profile-more, .topical-open, .trend-card-bottom")) {
      track("cta_click", { label: (anchor.textContent ?? "").trim().slice(0, 60), path });
    }
    return;
  }

  const filterButton = target.closest(".procedure-explorer .filter-bar button") as HTMLButtonElement | null;
  if (filterButton) {
    const group = filterButton.closest(".filter-group")?.querySelector(".filter-label")?.textContent?.trim() ?? "filter";
    track("procedure_filter", { group, value: (filterButton.textContent ?? "").trim().slice(0, 40), path });
    return;
  }

  const summary = target.closest("details.procedure-profile > summary");
  if (summary) {
    const details = summary.parentElement as HTMLDetailsElement;
    if (!details.open) track("procedure_expand", { slug: details.id, path });
  }
}

export function PostHogProvider() {
  const pathname = usePathname();

  useEffect(() => {
    if (!key) return;
    ensureInit();
    posthog.capture("$pageview", { $current_url: window.location.href });
    const stopWatching = watchNewsletterPanels();
    return stopWatching;
  }, [pathname]);

  useEffect(() => {
    if (!key) return;
    document.addEventListener("click", onDocumentClick, { capture: true });
    return () => document.removeEventListener("click", onDocumentClick, { capture: true });
  }, []);

  return null;
}
