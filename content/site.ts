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
  { label: "Guides", href: "/guides" },
  { label: "Ingredients", href: "/ingredients" },
  { label: "Procedures", href: "/procedures" },
  { label: "Culture", href: "/culture" },
] as const;
