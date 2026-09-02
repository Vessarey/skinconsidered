import { concernGuides } from "@/content/concerns";
import { sourceRegistry, taxonomy } from "@/content/coverage";
import { cultureStories as cultureRecords } from "@/content/culture";
import { aspsFees2022, PRICE_SURVEY_DATE, priceMenus, priceMenuSource } from "@/content/price-survey";
import { procedurePrices } from "@/content/procedure-prices";
import { guides as guideRecords } from "@/content/guides";
import { ingredients } from "@/content/ingredients";
import { procedureProfiles as procedureRecords } from "@/content/procedures";
import {
  DESKS,
  EDITION,
  gradeDefinitions,
  LAST_REVIEWED,
  REGION_ORDER,
} from "@/content/site";
import { stories as storyRecords } from "@/content/stories";
import { trends } from "@/content/trends";
import type {
  CultureStory as CultureRecord,
  DepthTarget,
  Guide as GuideRecord,
  Ingredient,
  ProcedureCategory,
  ProcedureConcern,
  ProcedureProfile,
  Related,
  SourceRegistryEntry,
  SourceStatus,
  Story as StoryRecord,
} from "@/content/types";

export type {
  AccentColor,
  AdvertisedPrice,
  ConcernGuide,
  DepthTarget,
  MediaImage,
  PriceMenu,
  CostBand,
  CultureStory as CultureStoryRecord,
  DowntimeBand,
  EvidenceGrade,
  FileUpdate,
  Guide as GuideRecord,
  Ingredient,
  ProcedureCategory,
  ProcedureConcern,
  ProcedureKind,
  ProcedureMetric,
  ProcedureProfile,
  ProcedureSetting,
  Related,
  Source,
  SourceRegistryEntry,
  SourceStatus,
  Story as StoryRecord,
  StoryKind,
  StorySection,
  TaxonomyTopic,
  TopicalStatus,
  TopicalUse,
  Trend,
  TrendCategory,
  TrendVerdict,
} from "@/content/types";

export { gradeDefinitions, ingredients, LAST_REVIEWED, taxonomy, trends };

export function getTrend(slug: string) {
  return trends.find((trend) => trend.slug === slug);
}

export const TREND_CATEGORY_ORDER = ["Routine", "Ingredient", "Device", "Supplement", "Procedure", "Safety"] as const;
export const TREND_VERDICT_ORDER = ["Reasonable", "Harmless, low value", "Needs care", "Avoid"] as const;

/** Ingredient families in display order, derived from the files. */
export const ingredientFamilies = [...new Set(ingredients.map((ingredient) => ingredient.family))];
export { EDITION };
export const LAST_REVIEWED_ISO = EDITION.date;

type WithReadTime<T> = T & { readTime: string };
export type Story = WithReadTime<StoryRecord>;
export type Guide = WithReadTime<GuideRecord>;
export type CultureStory = WithReadTime<CultureRecord>;

/** Canonical display order for procedure families. Categories with no profiles are hidden automatically. */
export const PROCEDURE_CATEGORY_ORDER: ProcedureCategory[] = [
  "Facials & spa treatments",
  "Peels & exfoliation",
  "Injectables",
  "Needling",
  "Lasers & light",
  "Tightening & lifting",
  "Body contouring",
  "Hair & scalp",
  "Intimate health",
  "Surgical (face)",
  "Adjuncts",
];

export const PROCEDURE_CONCERN_ORDER: ProcedureConcern[] = [
  "Lines & wrinkles",
  "Volume & contour",
  "Texture & pores",
  "Acne & congestion",
  "Scars",
  "Pigment & dark spots",
  "Redness & vessels",
  "Laxity & lifting",
  "Hair reduction",
  "Dullness & hydration",
  "Sun damage & precancerous spots",
  "Fat & body contour",
  "Hair loss",
  "Tattoos",
  "Excess skin & jowls",
  "Intimate health",
];

const categoryRank = (category: ProcedureCategory) => PROCEDURE_CATEGORY_ORDER.indexOf(category);

/**
 * Profiles with the advertised-price survey merged in. A profile whose
 * published cost is "No reliable estimate" takes its cost band from the
 * survey range, so the explorer's cost filter still works for it.
 */
export const procedureProfiles: ProcedureProfile[] = procedureRecords
  .slice()
  .sort((a, b) => categoryRank(a.category) - categoryRank(b.category) || procedureRecords.indexOf(a) - procedureRecords.indexOf(b))
  .map((profile) => {
    const price = procedurePrices[profile.slug];
    if (!price) return profile;
    const { band, ...advertised } = price;
    return { ...profile, advertised, costBand: profile.costBand === "No reliable estimate" ? band : profile.costBand };
  });

export { aspsFees2022, concernGuides, PRICE_SURVEY_DATE, priceMenus };

/** Sources for a profile's advertised range: the named menus it was read from. */
export function advertisedSources(profile: ProcedureProfile) {
  return (profile.advertised?.menus ?? []).map(priceMenuSource).filter((source): source is NonNullable<typeof source> => Boolean(source));
}

/** Default depth targets by category, overridable per profile with `targets`. */
const CATEGORY_TARGETS: Record<ProcedureCategory, DepthTarget[]> = {
  "Facials & spa treatments": ["surface"],
  "Peels & exfoliation": ["surface", "epidermis"],
  Injectables: ["dermis", "fat"],
  Needling: ["epidermis", "dermis"],
  "Lasers & light": ["epidermis", "dermis"],
  "Tightening & lifting": ["dermis", "smas"],
  "Body contouring": ["fat"],
  "Hair & scalp": ["follicle"],
  "Intimate health": ["epidermis", "dermis"],
  "Surgical (face)": ["smas", "fat"],
  Adjuncts: ["dermis"],
};

const PROCEDURE_TARGET_OVERRIDES: Record<string, DepthTarget[]> = {
  "led-light-therapy": ["epidermis", "dermis"],
  "photodynamic-therapy": ["epidermis", "dermis"],
  "deep-chemical-peel": ["epidermis", "dermis"],
  "medium-chemical-peel": ["epidermis", "dermis"],
  neuromodulators: ["muscle"],
  "deoxycholic-acid": ["fat"],
  "skin-boosters": ["dermis"],
  "ipl-photofacial": ["vessels", "epidermis"],
  "vascular-pigment-lasers": ["vessels"],
  "laser-tattoo-removal": ["dermis"],
  "laser-hair-removal": ["follicle"],
  electrolysis: ["follicle"],
  sclerotherapy: ["vessels"],
  "electromagnetic-muscle-stimulation": ["muscle"],
  "subdermal-rf-tightening": ["fat", "dermis"],
  "thread-lift": ["fat", "dermis"],
  "plla-buttock-augmentation": ["fat"],
  "prp-hair-loss": ["follicle"],
  "hair-transplant": ["follicle"],
  "hydrafacial-keravive": ["surface", "follicle"],
  blepharoplasty: ["fat", "surface"],
  "buccal-fat-removal": ["fat"],
  "facelift-neck-lift": ["smas", "surface"],
  "prp-adjunct": ["dermis"],
};

export function procedureTargets(profile: ProcedureProfile): DepthTarget[] {
  return profile.targets ?? PROCEDURE_TARGET_OVERRIDES[profile.slug] ?? CATEGORY_TARGETS[profile.category];
}

const FAMILY_TARGETS: Record<string, DepthTarget[]> = {
  "Vitamin A derivatives": ["epidermis", "dermis"],
  "Antimicrobial acne actives": ["surface", "follicle"],
  "Hydroxy acids": ["surface", "epidermis"],
  "Hormonal acne actives": ["follicle"],
  "Anti-inflammatory acne actives": ["epidermis"],
  "Dicarboxylic acid": ["epidermis", "follicle"],
  "Tyrosinase inhibitors": ["epidermis"],
  "Pigment modulators": ["epidermis"],
  Antioxidants: ["epidermis"],
  "Vitamin B3": ["epidermis"],
  "Rosacea prescriptions": ["epidermis", "follicle"],
  "Barrier lipids": ["surface"],
  Humectants: ["surface"],
  Occlusives: ["surface"],
  "Humectants and keratolytics": ["surface"],
  Osmolytes: ["surface"],
  "UV filters": ["surface"],
  "Cosmeceutical actives": ["surface", "epidermis"],
  "Topical JAK inhibitors": ["epidermis"],
  "Hair growth actives": ["follicle"],
};

export function ingredientTargets(ingredient: Ingredient): DepthTarget[] {
  return ingredient.targets ?? FAMILY_TARGETS[ingredient.family] ?? ["surface"];
}

/** A concern guide with its ingredient slugs resolved to files. */
export function concernGuideEntries() {
  return concernGuides.map((guide) => ({
    ...guide,
    firstLine: guide.firstLine.map((item) => ({ ...item, file: getIngredient(item.ingredient) })).filter((item) => item.file),
    alsoUseful: guide.alsoUseful.map((item) => ({ ...item, file: getIngredient(item.ingredient) })).filter((item) => item.file),
  }));
}

export const procedureCategories = PROCEDURE_CATEGORY_ORDER.filter((category) => procedureProfiles.some((profile) => profile.category === category));
export const procedureConcerns = PROCEDURE_CONCERN_ORDER.filter((concern) => procedureProfiles.some((profile) => profile.concerns.includes(concern)));

export function getProcedure(slug: string) {
  return procedureProfiles.find((profile) => profile.slug === slug);
}

/** ISO date → "September 1, 2026" in UTC, matching the audit's label check. */
export function formatLongDate(iso: string) {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
}

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

export function lastUpdated(item: { date?: string; reviewed?: string; updates?: { date: string }[] }) {
  return item.updates?.slice().sort((a, b) => b.date.localeCompare(a.date))[0]?.date ?? item.reviewed ?? item.date ?? EDITION.date;
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
    if (item) files.push({ kind: "Topical", title: item.name, href: `/ingredients/${slug}`, meta: `${item.family} · ${item.status}` });
  }
  for (const slug of related.procedures ?? []) {
    const item = getProcedure(slug);
    if (item) files.push({ kind: "Procedure", title: item.name, href: `/procedures/${slug}`, meta: `${item.category} · Grade ${gradeDefinitions[item.evidenceGrade].code}` });
  }
  for (const slug of related.trends ?? []) {
    const item = getTrend(slug);
    if (item) files.push({ kind: "Trend", title: item.name, href: `/trends/${slug}`, meta: `${item.category} · ${item.verdict}` });
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
  for (const profile of procedureProfiles) {
    for (const update of profile.updates ?? []) {
      entries.push({ ...update, desk: "Procedures", title: profile.name, href: `/procedures/${profile.slug}` });
    }
  }
  for (const ingredient of ingredients) {
    for (const update of ingredient.updates ?? []) {
      entries.push({ ...update, desk: "Topicals", title: ingredient.name, href: `/ingredients/${ingredient.slug}` });
    }
  }
  for (const trend of trends) {
    for (const update of trend.updates ?? []) {
      entries.push({ ...update, desk: "Trends", title: trend.name, href: `/trends/${trend.slug}` });
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
    href: `/ingredients/${item.slug}`,
    type: `Topical · ${item.status}`,
    title: item.name,
    description: item.summary,
    terms: [item.family, ...item.jobs, ...(item.aliases ?? []), ...item.forms, ...item.uses.map((use) => use.use), item.trendNote ?? ""].join(" "),
  })),
  ...trends.map((item) => ({
    href: `/trends/${item.slug}`,
    type: `Trend · ${item.category} · ${item.verdict}`,
    title: item.name,
    description: item.claim,
    terms: [...(item.aliases ?? []), item.whatItIs, item.evidence, item.verdict].join(" "),
  })),
  ...procedureProfiles.map((item) => ({
    href: `/procedures/${item.slug}`,
    type: `Procedure · ${item.category}${item.kind === "branded" ? " · Brand" : ""}`,
    title: item.name,
    description: item.summary,
    terms: [
      ...(item.aliases ?? []),
      ...item.goals,
      ...item.concerns,
      item.kind,
      item.setting,
      item.purpose,
      item.evidence,
      item.cost,
      item.sessions,
      item.downtime,
      item.results,
      item.duration,
      ...item.benefits,
      ...item.tradeoffs,
      ...item.majorRisks,
    ].join(" "),
  })),
] satisfies SearchItem[];

export const searchSuggestions = ["tazarotene", "azelaic acid", "slugging", "Botox", "HydraFacial", "melasma", "Japan"];

// ------------------------------------------------------------------
// Coverage: what the desk tracks, and which sources are actually cited.
// ------------------------------------------------------------------

export type SourceCoverage = SourceRegistryEntry & { cited: number; status: SourceStatus };

function hostOf(url: string) {
  try {
    return new URL(url).hostname.toLowerCase();
  } catch {
    return "";
  }
}

/** Every source URL on file across dispatches, guides, culture files, and procedure profiles. */
export function allSourceUrls() {
  return [...stories, ...guides, ...cultureStories, ...procedureProfiles, ...ingredients, ...trends].flatMap((item) => item.sources.map((source) => source.url));
}

/** Registry entries with a computed citation count. "In use" is never declared by hand. */
export function sourceCoverage(): SourceCoverage[] {
  const hosts = allSourceUrls().map(hostOf);
  return sourceRegistry.map((entry) => {
    const cited = hosts.filter((host) => entry.domains.some((domain) => host === domain || host.endsWith(`.${domain}`))).length;
    return { ...entry, cited, status: cited > 0 ? "In use" : "Watchlist" };
  });
}

export type JurisdictionCoverage = {
  location: string;
  region: string;
  count: number;
  desks: string[];
  latest: string;
  latestLabel: string;
};

/** Where current dispatches come from, computed from the files themselves. */
export function jurisdictionCoverage(): JurisdictionCoverage[] {
  const byLocation = new Map<string, JurisdictionCoverage>();
  for (const story of storiesByDate) {
    const existing = byLocation.get(story.location);
    const desk = deskLabel(story.kind);
    if (existing) {
      existing.count += 1;
      if (!existing.desks.includes(desk)) existing.desks.push(desk);
    } else {
      byLocation.set(story.location, {
        location: story.location,
        region: story.region,
        count: 1,
        desks: [desk],
        latest: effectiveDate(story),
        latestLabel: formatLongDate(effectiveDate(story)),
      });
    }
  }
  const regionRank = (region: string) => REGION_ORDER.indexOf(region as (typeof REGION_ORDER)[number]);
  return [...byLocation.values()].sort((a, b) => regionRank(a.region) - regionRank(b.region) || b.count - a.count);
}
