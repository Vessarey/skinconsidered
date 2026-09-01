/**
 * Content audit — runs before every build.
 *
 * Imports the editorial data directly (Node strips the TypeScript types) and
 * checks the things a reader would be harmed by if they drifted: fictional
 * prototype copy, hype language, non-HTTPS sources, missing limitations,
 * broken cross links, mismatched dates, and duplicate slugs.
 */
import { cultureStories } from "../content/culture.ts";
import { guides } from "../content/guides.ts";
import { ingredients } from "../content/ingredients.ts";
import { DESKS, EDITION, REGION_ORDER, gradeDefinitions } from "../content/site.ts";
import { stories } from "../content/stories.ts";

const failures = [];
const fail = (message) => failures.push(message);

const forbiddenPrototypeClaims = [
  "FDA clears first OTC retinaldehyde",
  "Dr. Lena Okafor",
  "41,000 readers",
  "NAD+ precursors reverse photoaging",
  "Polynucleotide injectables match biostimulators",
];

const hypePhrases = ["ancient secret", "beauty hack", "miracle", "clinically proven", "dermatologist-approved", "guaranteed results", "cures "];

const everything = JSON.stringify({ stories, guides, cultureStories, ingredients }).toLowerCase();

for (const claim of forbiddenPrototypeClaims) {
  if (everything.includes(claim.toLowerCase())) fail(`Fictional prototype claim found: ${claim}`);
}
for (const phrase of hypePhrases) {
  if (everything.includes(phrase)) fail(`Hype language found: "${phrase.trim()}"`);
}

const isoDate = /^\d{4}-\d{2}-\d{2}$/;
const formatDate = (iso) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });

if (!isoDate.test(EDITION.date)) fail(`Edition date is not ISO: ${EDITION.date}`);
if (formatDate(EDITION.date) !== EDITION.label) fail(`Edition label "${EDITION.label}" does not match ${EDITION.date}`);

const slugs = {
  dispatches: new Set(stories.map((story) => story.slug)),
  guides: new Set(guides.map((guide) => guide.slug)),
  culture: new Set(cultureStories.map((story) => story.slug)),
  ingredients: new Set(ingredients.map((ingredient) => ingredient.slug)),
};

function checkUnique(label, list) {
  const seen = new Set();
  for (const item of list) {
    if (seen.has(item.slug)) fail(`Duplicate ${label} slug: ${item.slug}`);
    seen.add(item.slug);
    if (!/^[a-z0-9-]+$/.test(item.slug)) fail(`${label} slug is not URL-safe: ${item.slug}`);
  }
}

function checkSources(label, item) {
  if (!item.sources?.length) fail(`${label} "${item.slug}" has no sources on file.`);
  for (const source of item.sources ?? []) {
    if (!source.url?.startsWith("https://")) fail(`${label} "${item.slug}" source URL is not HTTPS: ${source.url}`);
    if (!source.label) fail(`${label} "${item.slug}" has a source without a label.`);
  }
}

function checkRelated(label, item) {
  for (const [group, list] of Object.entries(item.related ?? {})) {
    if (!slugs[group]) fail(`${label} "${item.slug}" links an unknown related group: ${group}`);
    for (const slug of list) {
      if (slugs[group] && !slugs[group].has(slug)) fail(`${label} "${item.slug}" links a missing ${group} slug: ${slug}`);
      if (slug === item.slug) fail(`${label} "${item.slug}" links to itself.`);
    }
  }
}

function checkUpdates(label, item) {
  for (const update of item.updates ?? []) {
    if (!["correction", "update"].includes(update.kind)) fail(`${label} "${item.slug}" has an update with kind "${update.kind}".`);
    if (!isoDate.test(update.date)) fail(`${label} "${item.slug}" has an update with a non-ISO date: ${update.date}`);
    if (formatDate(update.date) !== update.dateLabel) fail(`${label} "${item.slug}" update label "${update.dateLabel}" does not match ${update.date}`);
    if (!update.note) fail(`${label} "${item.slug}" has an update without a note.`);
    if (update.date > EDITION.date) fail(`${label} "${item.slug}" has an update dated after the edition.`);
  }
}

function checkSections(label, item) {
  if (!item.sections?.length) fail(`${label} "${item.slug}" has no body sections.`);
  const headings = new Set();
  for (const section of item.sections ?? []) {
    if (headings.has(section.heading)) fail(`${label} "${item.slug}" repeats the heading "${section.heading}".`);
    headings.add(section.heading);
    if (!section.paragraphs?.length) fail(`${label} "${item.slug}" section "${section.heading}" has no paragraphs.`);
  }
  if ("readTime" in item) fail(`${label} "${item.slug}" hardcodes readTime; reading time is computed from the text.`);
}

checkUnique("dispatch", stories);
for (const story of stories) {
  const label = "Dispatch";
  if (!DESKS[story.kind]) fail(`${label} "${story.slug}" has an unknown desk: ${story.kind}`);
  if (!REGION_ORDER.includes(story.region)) fail(`${label} "${story.slug}" has an unknown region: ${story.region}`);
  if (!gradeDefinitions[story.grade]) fail(`${label} "${story.slug}" has an unknown grade: ${story.grade}`);
  if (!isoDate.test(story.date)) fail(`${label} "${story.slug}" date is not ISO: ${story.date}`);
  else {
    if (formatDate(story.date) !== story.dateLabel) fail(`${label} "${story.slug}" dateLabel "${story.dateLabel}" does not match ${story.date}`);
    if (story.date > EDITION.date) fail(`${label} "${story.slug}" is dated after the edition.`);
  }
  for (const field of ["headline", "shortHeadline", "dek", "signal", "whyItMatters", "limitations", "location"]) {
    if (!story[field]?.trim()) fail(`${label} "${story.slug}" is missing ${field}.`);
  }
  checkSources(label, story);
  checkSections(label, story);
  checkRelated(label, story);
  checkUpdates(label, story);
}

checkUnique("guide", guides);
for (const guide of guides) {
  if (!guide.takeaways?.length) fail(`Guide "${guide.slug}" has no takeaways.`);
  if (!guide.number || !guide.level || !guide.title || !guide.description) fail(`Guide "${guide.slug}" is missing a required field.`);
  checkSources("Guide", guide);
  checkSections("Guide", guide);
  checkRelated("Guide", guide);
  checkUpdates("Guide", guide);
}

checkUnique("culture", cultureStories);
for (const story of cultureStories) {
  if (!story.note?.trim()) fail(`Culture file "${story.slug}" needs an archive caution note.`);
  if (!story.place || !story.era || !story.title || !story.description) fail(`Culture file "${story.slug}" is missing a required field.`);
  checkSources("Culture file", story);
  checkSections("Culture file", story);
  checkRelated("Culture file", story);
  checkUpdates("Culture file", story);
}

checkUnique("ingredient", ingredients);
for (const ingredient of ingredients) {
  if (!gradeDefinitions[ingredient.evidence]) fail(`Ingredient "${ingredient.slug}" has an unknown grade: ${ingredient.evidence}`);
  if (!ingredient.jobs?.length) fail(`Ingredient "${ingredient.slug}" lists no jobs.`);
  if (!ingredient.watchFor?.trim() || !ingredient.summary?.trim()) fail(`Ingredient "${ingredient.slug}" is missing watchFor or summary.`);
  if (ingredient.guideSlug && !slugs.guides.has(ingredient.guideSlug)) fail(`Ingredient "${ingredient.slug}" points to a missing guide: ${ingredient.guideSlug}`);
}

if (!stories.length) fail("No editorial stories found.");

if (failures.length) {
  console.error(`Content audit failed:\n${failures.map((failure) => `- ${failure}`).join("\n")}`);
  process.exit(1);
}

const sourceCount = [...stories, ...guides, ...cultureStories].reduce((total, item) => total + item.sources.length, 0);
const updateCount = [...stories, ...guides, ...cultureStories].reduce((total, item) => total + (item.updates?.length ?? 0), 0);
console.log(
  `Content audit passed: ${stories.length} dispatches, ${guides.length} guides, ${cultureStories.length} culture files, ${ingredients.length} ingredient files, ${sourceCount} source links, ${updateCount} logged updates, no prototype claims.`,
);
