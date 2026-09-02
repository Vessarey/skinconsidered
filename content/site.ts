import type { EvidenceGrade, StoryKind } from "./types";

/** The dated edition shown in the utility bar, footer, and feeds. Update when a new edition ships. */
export const EDITION = {
  volume: "01",
  number: "001",
  date: "2026-09-01",
  label: "September 1, 2026",
};

export const LAST_REVIEWED = EDITION.label;

export const SITE_NAME = "Skin Considered";
export const SITE_TAGLINE = "Global skincare news, weighed";
export const SITE_DESCRIPTION =
  "Independent global skincare reporting, evidence-graded research, procedure updates, practical guides, and cultural beauty history.";

export function siteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");
}

/**
 * The newsletter as promised on the site. Sending only starts once a provider
 * is connected (see NEWSLETTER_WEBHOOK_URL); until then every form says so.
 */
export const NEWSLETTER = {
  name: "The Daily Considered",
  cadence: "One short email each weekday morning, plus a Sunday synthesis",
  promise: "What changed in skincare regulation, safety, research, and procedures—how much it deserves your trust—and what, if anything, to do about it.",
  bullets: ["Primary sources linked in every item", "Evidence grade on the exact claim, never the brand", "Corrections sent to the same inbox, not buried"],
  reassurance: "Free. No sponsors in the body of the email. Unsubscribe in one click.",
} as const;

/** Canonical region order for filters and the world strip. Regions with no dispatches are hidden automatically. */
export const REGION_ORDER = ["North America", "Latin America", "Europe", "Asia", "Oceania", "Global"] as const;

export const DESKS: Record<StoryKind, { label: string; description: string }> = {
  news: { label: "Regulation", description: "Rules, approvals, consultations, and market access." },
  safety: { label: "Safety", description: "Recalls, alerts, enforcement, and surveillance data." },
  research: { label: "Research", description: "Human studies, reviews, and what they can support." },
  procedure: { label: "Procedures", description: "Devices, injectables, peels, lasers, and aftercare evidence." },
};

export const gradeDefinitions: Record<EvidenceGrade, { code: string; label: string; description: string }> = {
  A: {
    code: "A",
    label: "Strong for this claim",
    description: "An official final action, official recall, systematic synthesis, or mature body of directly relevant evidence.",
  },
  B: {
    code: "B",
    label: "Useful human evidence",
    description: "Controlled human data or a strong review with meaningful limits on size, scope, or generalizability.",
  },
  C: {
    code: "C",
    label: "Early signal",
    description: "Small, exploratory, preclinical, or otherwise preliminary evidence that needs replication.",
  },
  Context: {
    code: "CTX",
    label: "Context only",
    description: "Policy process, market data, historical record, or another source that should not be read as a treatment grade.",
  },
};

export const primaryNav = [
  { label: "Today", href: "/today" },
  { label: "U.S.", href: "/us" },
  { label: "Guides", href: "/guides" },
  { label: "Topicals", href: "/ingredients" },
  { label: "Procedures", href: "/procedures" },
  { label: "Trends", href: "/trends" },
  { label: "Culture", href: "/culture" },
] as const;
