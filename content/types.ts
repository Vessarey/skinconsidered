export type EvidenceGrade = "A" | "B" | "C" | "Context";

export type AccentColor = "raspberry" | "cobalt" | "green" | "violet";

export type Source = {
  label: string;
  url: string;
  published?: string;
};

export type StorySection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

/**
 * A dated, visible change to a published file. Corrections say what was wrong
 * and what replaced it; updates record a new development without implying the
 * original report was incorrect. Both are listed on /corrections automatically.
 */
export type FileUpdate = {
  kind: "correction" | "update";
  date: string;
  dateLabel: string;
  note: string;
};

/** Editor-curated cross links. Every slug is validated by `npm run audit:content`. */
export type Related = {
  dispatches?: string[];
  guides?: string[];
  culture?: string[];
  ingredients?: string[];
};

export type StoryKind = "news" | "research" | "procedure" | "safety";

export type Story = {
  slug: string;
  kind: StoryKind;
  category: string;
  region: string;
  location: string;
  headline: string;
  shortHeadline: string;
  dek: string;
  /** ISO date of the underlying development or publication. */
  date: string;
  dateLabel: string;
  grade: EvidenceGrade;
  color: AccentColor;
  signal: string;
  whyItMatters: string;
  limitations: string;
  sources: Source[];
  sections: StorySection[];
  related?: Related;
  updates?: FileUpdate[];
};

export type GuideLevel = "Foundations" | "Routine" | "Ingredients" | "Procedures";

export type Guide = {
  slug: string;
  number: string;
  level: GuideLevel;
  title: string;
  description: string;
  takeaways: string[];
  sources: Source[];
  sections: StorySection[];
  related?: Related;
  updates?: FileUpdate[];
};

export type CultureStory = {
  slug: string;
  place: string;
  era: string;
  title: string;
  description: string;
  color: AccentColor;
  note: string;
  sources: Source[];
  sections: StorySection[];
  related?: Related;
  updates?: FileUpdate[];
};

export type Ingredient = {
  slug: string;
  name: string;
  family: string;
  evidence: EvidenceGrade;
  jobs: string[];
  watchFor: string;
  summary: string;
  guideSlug?: string;
  /** Extra search terms and mention-matching aliases, e.g. "retinol" for retinoids. */
  aliases?: string[];
};
