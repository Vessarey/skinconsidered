import { cultureStories as cultureRecords } from "@/content/culture";
import { guides as guideRecords } from "@/content/guides";
import { ingredients } from "@/content/ingredients";
import {
  DESKS,
  EDITION,
  gradeDefinitions,
  LAST_REVIEWED,
  REGION_ORDER,
} from "@/content/site";
import { stories as storyRecords } from "@/content/stories";
import type {
  CultureStory as CultureRecord,
  Guide as GuideRecord,
  Related,
  Story as StoryRecord,
} from "@/content/types";

export type {
  AccentColor,
  CultureStory as CultureStoryRecord,
  EvidenceGrade,
  FileUpdate,
  Guide as GuideRecord,
  Ingredient,
  Related,
  Source,
  Story as StoryRecord,
  StoryKind,
  StorySection,
} from "@/content/types";

export { gradeDefinitions, ingredients, LAST_REVIEWED };
export { EDITION };
export const LAST_REVIEWED_ISO = EDITION.date;

type WithReadTime<T> = T & { readTime: string };
export type Story = WithReadTime<StoryRecord>;
export type Guide = WithReadTime<GuideRecord>;
export type CultureStory = WithReadTime<CultureRecord>;

function wordsIn(value: unknown) {
  return JSON.stringify(value)
    .replace(/[{}[\]",:]/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

function readTimeFor(value: unknown) {
  const minutes = Math.max(4, Math.ceil(wordsIn(value) / 190));
  return `${minutes} min`;
}

export function readingTime(sections: { heading: string; paragraphs: string[]; bullets?: string[] }[], introduction = "") {
  const wordCount = wordsIn({ introduction, sections });
  const minutes = Math.max(2, Math.ceil(wordCount / 190));
  return { minutes, wordCount, label: `${minutes} min` };
}

export const stories: Story[] = storyRecords.map((story) => ({ ...story, readTime: readTimeFor(story) }));
export const guides: Guide[] = guideRecords.map((guide) => ({ ...guide, readTime: readTimeFor(guide) }));
export const cultureStories: CultureStory[] = cultureRecords.map((story) => ({ ...story, readTime: readTimeFor(story) }));

export function getStory(slug: string) {
  return stories.find((story) => story.slug === slug);
}

export function getGuide(slug: string) {
  return guides.find((guide) => guide.slug === slug);
}

export function getCultureStory(slug: string) {
  return cultureStories.find((story) => story.slug === slug);
}

export function getIngredient(slug: string) {
  return ingredients.find((ingredient) => ingredient.slug === slug);
}

export function slugify(value: string) {
  return value
    .normalize("NFKD")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function formatEditionDate(date: string) {
  const [year, month, day] = date.split("-").map(Number);
  const value = new Date(Date.UTC(year, month - 1, day, 12));
  const part = (options: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat("en-US", { ...options, timeZone: "UTC" }).format(value);
  // "MON 01 SEP 2026": en-US month abbreviations are three letters (en-GB gives "Sept").
  return `${part({ weekday: "short" })} ${part({ day: "2-digit" })} ${part({ month: "short" })} ${part({ year: "numeric" })}`.toUpperCase();
}

export function siteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");
}

function latestUpdate<T extends { date: string; dateLabel: string }>(updates?: T[]) {
  return updates?.slice().sort((a, b) => b.date.localeCompare(a.date))[0];
}

function effectiveDate(item: StoryRecord) {
  return latestUpdate(item.updates)?.date ?? item.date;
}

export function lastUpdated(item: { date?: string; updates?: { date: string }[] }) {
  return item.updates?.slice().sort((a, b) => b.date.localeCompare(a.date))[0]?.date ?? item.date ?? EDITION.date;
}

export function deskLabel(kind: StoryRecord["kind"]) {
  return DESKS[kind].label;
}

export function gradeCode(grade: StoryRecord["grade"]) {
  return gradeDefinitions[grade].code;
}

export type WireItem = {
  slug: string;
  location: string;
  region: string;
  desk: string;
  dateLabel: string;
  updatedLabel?: string;
  headline: string;
  dek: string;
  gradeCode: string;
  signal: string;
};

export const wireItems: WireItem[] = stories
  .slice()
  .sort((a, b) => effectiveDate(b).localeCompare(effectiveDate(a)))
  .map((story) => ({
    slug: story.slug,
    location: story.location,
    region: story.region,
    desk: DESKS[story.kind].label,
    dateLabel: story.dateLabel,
    updatedLabel: latestUpdate(story.updates)?.dateLabel,
    headline: story.headline,
    dek: story.dek,
    gradeCode: gradeDefinitions[story.grade].code,
    signal: story.signal,
  }));

export const regions = REGION_ORDER.filter((region) => stories.some((story) => story.region === region));
export const desks = (Object.keys(DESKS) as StoryRecord["kind"][]).filter((kind) => stories.some((story) => story.kind === kind));

export const storiesByDate = stories.slice().sort((a, b) => effectiveDate(b).localeCompare(effectiveDate(a)));

export const tickerItems = stories
  .slice()
  .sort((a, b) => effectiveDate(b).localeCompare(effectiveDate(a)))
  .slice(0, 5)
  .map(({ slug, shortHeadline }) => ({ slug, shortHeadline }));

export type RelatedFile = {
  kind: string;
  title: string;
  href: string;
  meta: string;
};

export function getRelatedFiles(related?: Related): RelatedFile[] {
  if (!related) return [];

  const files: RelatedFile[] = [];
  for (const slug of related.dispatches ?? []) {
    const item = getStory(slug);
    if (item) files.push({ kind: "Dispatch", title: item.headline, href: `/dispatches/${slug}`, meta: `${item.location} · ${item.category}` });
  }
  for (const slug of related.guides ?? []) {
    const item = getGuide(slug);
    if (item) files.push({ kind: "Guide", title: item.title, href: `/guides/${slug}`, meta: `${item.level} · Guide ${item.number}` });
  }
  for (const slug of related.culture ?? []) {
    const item = getCultureStory(slug);
    if (item) files.push({ kind: "Culture", title: item.title, href: `/culture/${slug}`, meta: `${item.place} · ${item.era}` });
  }
  for (const slug of related.ingredients ?? []) {
    const item = getIngredient(slug);
    if (item) files.push({ kind: "Ingredient", title: item.name, href: `/ingredients#${slug}`, meta: item.family });
  }
  return files;
}

export const resolveRelated = getRelatedFiles;

export type UpdateEntry = {
  kind: "correction" | "update";
  date: string;
  dateLabel: string;
  note: string;
  desk: string;
  title: string;
  href: string;
};

export function allUpdates(): UpdateEntry[] {
  const entries: UpdateEntry[] = [];
  for (const story of stories) {
    for (const update of story.updates ?? []) {
      entries.push({ ...update, desk: deskLabel(story.kind), title: story.headline, href: `/dispatches/${story.slug}` });
    }
  }
  for (const guide of guides) {
    for (const update of guide.updates ?? []) {
      entries.push({ ...update, desk: "Education", title: guide.title, href: `/guides/${guide.slug}` });
    }
  }
  for (const story of cultureStories) {
    for (const update of story.updates ?? []) {
      entries.push({ ...update, desk: "Practice archive", title: story.title, href: `/culture/${story.slug}` });
    }
  }
  return entries.sort((a, b) => b.date.localeCompare(a.date));
}

function escapeRegExp(text: string) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Prose only (title, dek, sections) so slugs, URLs, and cross-link keys cannot create false mentions. */
function proseOf(item: { sections: { heading: string; paragraphs: string[]; bullets?: string[] }[] }, ...extra: string[]) {
  return [...extra, ...item.sections.flatMap((section) => [section.heading, ...section.paragraphs, ...(section.bullets ?? [])])]
    .join(" ")
    .toLowerCase();
}

/** Files that actually mention an ingredient (whole-word, singular or plural) or that editors linked to it. */
export function ingredientMentions(ingredient: (typeof ingredients)[number]) {
  const patterns = [ingredient.name, ...(ingredient.aliases ?? [])].map(
    (name) => new RegExp(`\\b${escapeRegExp(name.toLowerCase())}(?:s|es)?\\b`),
  );
  const mentions = (text: string) => patterns.some((pattern) => pattern.test(text));

  return {
    dispatches: storiesByDate.filter(
      (story) => story.related?.ingredients?.includes(ingredient.slug) || mentions(proseOf(story, story.headline, story.dek)),
    ),
    guides: guides.filter(
      (guide) =>
        guide.slug !== ingredient.guideSlug &&
        (guide.related?.ingredients?.includes(ingredient.slug) || mentions(proseOf(guide, guide.title, guide.description))),
    ),
  };
}

export function regionSummaries() {
  return regions.map((region) => {
    const regionStories = stories.filter((story) => story.region === region);
    const counts = regionStories.reduce<Record<string, number>>((accumulator, story) => {
      const desk = deskLabel(story.kind);
      accumulator[desk] = (accumulator[desk] ?? 0) + 1;
      return accumulator;
    }, {});
    const desk = Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "On file";
    return { region, count: regionStories.length, desk };
  });
}

export type SearchItem = {
  href: string;
  type: string;
  title: string;
  description: string;
  terms: string;
};

export const searchableItems = [
  ...storiesByDate.map((item) => ({
    href: `/dispatches/${item.slug}`,
    type: `${deskLabel(item.kind)} · ${item.category}`,
    title: item.headline,
    description: item.dek,
    terms: [item.region, item.location, item.kind, item.signal, item.whyItMatters, ...item.sections.map((section) => section.heading)].join(" "),
  })),
  ...guides.map((item) => ({
    href: `/guides/${item.slug}`,
    type: `Guide · ${item.level}`,
    title: item.title,
    description: item.description,
    terms: [...item.takeaways, ...item.sections.map((section) => section.heading)].join(" "),
  })),
  ...cultureStories.map((item) => ({
    href: `/culture/${item.slug}`,
    type: "Practice archive",
    title: item.title,
    description: item.description,
    terms: `${item.place} ${item.era} culture history`,
  })),
  ...ingredients.map((item) => ({
    href: `/ingredients#${item.slug}`,
    type: "Ingredient file",
    title: item.name,
    description: item.summary,
    terms: `${item.family} ${item.jobs.join(" ")} ${(item.aliases ?? []).join(" ")}`,
  })),
] satisfies SearchItem[];

export const searchSuggestions = ["sunscreen", "routine", "retinoids", "procedures", "Japan"];
