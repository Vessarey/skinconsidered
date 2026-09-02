/**
 * Content audit — runs before every build.
 *
 * Imports the editorial data directly (Node strips the TypeScript types) and
 * checks the things a reader would be harmed by if they drifted: fictional
 * prototype copy, hype language, non-HTTPS sources, missing limitations,
 * broken cross links, mismatched dates, and duplicate slugs.
 */
import { sourceRegistry, taxonomy } from "../content/coverage.ts";
import { cultureStories } from "../content/culture.ts";
import { guides } from "../content/guides.ts";
import { ingredients } from "../content/ingredients.ts";
import { procedureProfiles } from "../content/procedures.ts";
import { DESKS, EDITION, REGION_ORDER, gradeDefinitions } from "../content/site.ts";
import { stories } from "../content/stories.ts";
import { trends } from "../content/trends.ts";
import { concernGuides } from "../content/concerns.ts";
import { priceMenus, PRICE_SURVEY_DATE } from "../content/price-survey.ts";
import { procedurePrices } from "../content/procedure-prices.ts";

const TOPICAL_STATUSES = ["Prescription (U.S.)", "OTC drug (U.S.)", "OTC drug or prescription (U.S.)", "Cosmetic ingredient", "Prescription or cosmetic (U.S.)"];
const TREND_CATEGORIES = ["Routine", "Ingredient", "Device", "Supplement", "Procedure", "Safety"];
const TREND_VERDICTS = ["Reasonable", "Harmless, low value", "Needs care", "Avoid"];

const PROCEDURE_CATEGORIES = [
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
const PROCEDURE_KINDS = ["family", "branded", "technique"];
const PROCEDURE_CONCERNS = [
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
const PROCEDURE_SETTINGS = ["Spa or esthetician", "Medical office", "Physician-performed"];
const DOWNTIME_BANDS = ["None", "1–3 days", "4–7 days", "1–3 weeks", "3+ weeks"];
const COST_BANDS = ["Under $250", "$250–$750", "$750–$2,000", "Over $2,000", "No reliable estimate"];
const SOURCE_TYPES = ["Regulator", "Public health agency", "Professional society", "Literature", "Statistics", "Archive"];
const SOURCE_REGIONS = ["United States", "Europe", "Asia", "Oceania", "Latin America", "Global"];

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

const everything = JSON.stringify({ stories, guides, cultureStories, ingredients, procedureProfiles }).toLowerCase();

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
  procedures: new Set(procedureProfiles.map((profile) => profile.slug)),
  trends: new Set(trends.map((trend) => trend.slug)),
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
  const label = "Topical";
  if (!gradeDefinitions[ingredient.evidence]) fail(`${label} "${ingredient.slug}" has an unknown grade: ${ingredient.evidence}`);
  if (!ingredient.jobs?.length) fail(`${label} "${ingredient.slug}" lists no jobs.`);
  for (const field of ["name", "family", "watchFor", "summary", "howToUse", "cautions", "access", "regulatory"]) {
    if (!ingredient[field]?.trim()) fail(`${label} "${ingredient.slug}" is missing ${field}.`);
  }
  for (const field of ["forms", "uses", "sideEffects"]) {
    if (!ingredient[field]?.length) fail(`${label} "${ingredient.slug}" has no ${field}.`);
  }
  if (!TOPICAL_STATUSES.includes(ingredient.status)) fail(`${label} "${ingredient.slug}" has an unknown status: ${ingredient.status}`);
  for (const use of ingredient.uses ?? []) {
    if (!use.use || !use.note) fail(`${label} "${ingredient.slug}" has a use without a name or note.`);
    if (!gradeDefinitions[use.grade]) fail(`${label} "${ingredient.slug}" use "${use.use}" has an unknown grade: ${use.grade}`);
  }
  // The headline grade must not exceed the best per-use grade; grades belong to claims.
  const rank = { A: 3, B: 2, C: 1, Context: 0 };
  const best = Math.max(...(ingredient.uses ?? []).map((use) => rank[use.grade] ?? 0));
  if ((rank[ingredient.evidence] ?? 0) > best) fail(`${label} "${ingredient.slug}" headline grade ${ingredient.evidence} exceeds its best per-use grade.`);
  if (ingredient.guideSlug && !slugs.guides.has(ingredient.guideSlug)) fail(`${label} "${ingredient.slug}" points to a missing guide: ${ingredient.guideSlug}`);
  if (!isoDate.test(ingredient.reviewed ?? "")) fail(`${label} "${ingredient.slug}" reviewed date is not ISO: ${ingredient.reviewed}`);
  else if (ingredient.reviewed > EDITION.date) fail(`${label} "${ingredient.slug}" is reviewed after the edition date.`);
  checkSources(label, ingredient);
  checkRelated(label, ingredient);
  checkUpdates(label, ingredient);
}

checkUnique("trend", trends);
for (const trend of trends) {
  const label = "Trend";
  for (const field of ["name", "whatItIs", "claim", "evidence", "whoShouldSkip"]) {
    if (!trend[field]?.trim()) fail(`${label} "${trend.slug}" is missing ${field}.`);
  }
  if (!TREND_CATEGORIES.includes(trend.category)) fail(`${label} "${trend.slug}" has an unknown category: ${trend.category}`);
  if (!TREND_VERDICTS.includes(trend.verdict)) fail(`${label} "${trend.slug}" has an unknown verdict: ${trend.verdict}`);
  if (!gradeDefinitions[trend.grade]) fail(`${label} "${trend.slug}" has an unknown grade: ${trend.grade}`);
  if (!isoDate.test(trend.reviewed ?? "")) fail(`${label} "${trend.slug}" reviewed date is not ISO: ${trend.reviewed}`);
  else if (trend.reviewed > EDITION.date) fail(`${label} "${trend.slug}" is reviewed after the edition date.`);
  checkSources(label, trend);
  checkRelated(label, trend);
  checkUpdates(label, trend);
}

checkUnique("procedure profile", procedureProfiles);
const dollarFigure = /\$\d/;
for (const profile of procedureProfiles) {
  const label = "Procedure profile";
  const textFields = [
    "name", "purpose", "summary", "evidence", "cost", "costBasis", "appointment", "sessions", "downtime", "healing", "results", "duration",
    "candidacy", "pauseIf", "operator", "regulatory",
  ];
  for (const field of textFields) {
    if (!profile[field]?.trim()) fail(`${label} "${profile.slug}" is missing ${field}.`);
  }
  for (const field of ["goals", "concerns", "benefits", "tradeoffs", "commonEffects", "majorRisks", "ask"]) {
    if (!profile[field]?.length) fail(`${label} "${profile.slug}" has no ${field}.`);
  }
  if (!PROCEDURE_CATEGORIES.includes(profile.category)) fail(`${label} "${profile.slug}" has an unknown category: ${profile.category}`);
  if (!PROCEDURE_KINDS.includes(profile.kind)) fail(`${label} "${profile.slug}" has an unknown kind: ${profile.kind}`);
  if (profile.kind === "branded" && !profile.brandNote) fail(`${label} "${profile.slug}" is branded but has no brandNote linking it to its family.`);
  for (const concern of profile.concerns ?? []) {
    if (!PROCEDURE_CONCERNS.includes(concern)) fail(`${label} "${profile.slug}" has an unknown concern: ${concern}`);
  }
  if (!PROCEDURE_SETTINGS.includes(profile.setting)) fail(`${label} "${profile.slug}" has an unknown setting: ${profile.setting}`);
  if (!DOWNTIME_BANDS.includes(profile.downtimeBand)) fail(`${label} "${profile.slug}" has an unknown downtimeBand: ${profile.downtimeBand}`);
  if (!COST_BANDS.includes(profile.costBand)) fail(`${label} "${profile.slug}" has an unknown costBand: ${profile.costBand}`);
  if (!gradeDefinitions[profile.evidenceGrade]) fail(`${label} "${profile.slug}" has an unknown evidence grade: ${profile.evidenceGrade}`);
  // A dollar figure in the headline cost must be explained, and "no estimate" must not carry a band that implies one.
  if (dollarFigure.test(profile.cost ?? "") && profile.costBand === "No reliable estimate") fail(`${label} "${profile.slug}" quotes a dollar figure but claims no reliable estimate.`);
  if (!dollarFigure.test(profile.cost ?? "") && profile.costBand !== "No reliable estimate") fail(`${label} "${profile.slug}" has a cost band without a published figure in cost.`);
  if (!isoDate.test(profile.reviewed ?? "")) fail(`${label} "${profile.slug}" reviewed date is not ISO: ${profile.reviewed}`);
  else if (profile.reviewed > EDITION.date) fail(`${label} "${profile.slug}" is reviewed after the edition date.`);
  for (const metric of profile.metrics ?? []) {
    if (!metric.value || !metric.label || !metric.source || !metric.caveat) fail(`${label} "${profile.slug}" has a metric without value, label, source, or caveat.`);
  }
  checkSources(label, profile);
  checkRelated(label, profile);
  checkUpdates(label, profile);
}

checkUnique("source registry entry", sourceRegistry.map((entry) => ({ slug: entry.id })));
for (const entry of sourceRegistry) {
  if (!entry.name || !entry.jurisdiction || !entry.cadence || !entry.covers?.length) fail(`Source registry "${entry.id}" is missing a required field.`);
  if (!SOURCE_TYPES.includes(entry.type)) fail(`Source registry "${entry.id}" has an unknown type: ${entry.type}`);
  if (!SOURCE_REGIONS.includes(entry.region)) fail(`Source registry "${entry.id}" has an unknown region: ${entry.region}`);
  if (!entry.url?.startsWith("https://")) fail(`Source registry "${entry.id}" URL is not HTTPS: ${entry.url}`);
  if (!Array.isArray(entry.domains)) fail(`Source registry "${entry.id}" has no domains array.`);
  if ("status" in entry) fail(`Source registry "${entry.id}" declares a status; status is computed from citations.`);
}
for (const topic of taxonomy) {
  if (!topic.desk || !topic.href || !topic.description || !topic.includes?.length) fail(`Taxonomy topic "${topic.desk}" is missing a required field.`);
}

// Advertised-price survey: every range must name real menus, carry a dollar figure, and match a real profile.
if (!isoDate.test(PRICE_SURVEY_DATE) || PRICE_SURVEY_DATE > EDITION.date) fail(`Price survey date is invalid: ${PRICE_SURVEY_DATE}`);
checkUnique("price menu", priceMenus.map((menu) => ({ slug: menu.id })));
for (const menu of priceMenus) {
  if (!menu.name || !menu.location || !menu.url?.startsWith("https://") || !isoDate.test(menu.retrieved ?? "")) fail(`Price menu "${menu.id}" is missing a field or has a non-HTTPS URL.`);
}
const menuIds = new Set(priceMenus.map((menu) => menu.id));
for (const [slug, price] of Object.entries(procedurePrices)) {
  if (!slugs.procedures.has(slug)) fail(`Procedure price entry "${slug}" has no matching procedure profile.`);
  if (!dollarFigure.test(price.range ?? "")) fail(`Procedure price "${slug}" has no dollar figure in its range.`);
  if (!price.basis?.trim()) fail(`Procedure price "${slug}" has no basis.`);
  if (!COST_BANDS.includes(price.band) || price.band === "No reliable estimate") fail(`Procedure price "${slug}" needs a real cost band.`);
  if (!price.menus?.length) fail(`Procedure price "${slug}" cites no menus.`);
  for (const id of price.menus ?? []) if (!menuIds.has(id)) fail(`Procedure price "${slug}" cites an unknown menu: ${id}`);
}

// By-concern guide: every ingredient must be a topical file.
checkUnique("concern guide", concernGuides);
for (const guide of concernGuides) {
  if (!guide.name || !guide.summary || !guide.seeClinician) fail(`Concern guide "${guide.slug}" is missing a required field.`);
  if (!guide.firstLine?.length) fail(`Concern guide "${guide.slug}" has no first-line ingredients.`);
  for (const item of [...(guide.firstLine ?? []), ...(guide.alsoUseful ?? [])]) {
    if (!slugs.ingredients.has(item.ingredient)) fail(`Concern guide "${guide.slug}" cites a missing topical: ${item.ingredient}`);
    if (!item.why) fail(`Concern guide "${guide.slug}" lists ${item.ingredient} without a reason.`);
  }
  checkRelated("Concern guide", guide);
}

// Images: nothing renders without alt text, a credit, and a license.
for (const item of [...procedureProfiles, ...ingredients]) {
  if (item.image && (!item.image.src || !item.image.alt || !item.image.credit || !item.image.license)) {
    fail(`"${item.slug}" has an image without src, alt, credit, or license.`);
  }
}

if (!stories.length) fail("No editorial stories found.");

if (failures.length) {
  console.error(`Content audit failed:\n${failures.map((failure) => `- ${failure}`).join("\n")}`);
  process.exit(1);
}

const everythingWithSources = [...stories, ...guides, ...cultureStories, ...procedureProfiles, ...ingredients, ...trends];
const sourceCount = everythingWithSources.reduce((total, item) => total + item.sources.length, 0);
const updateCount = everythingWithSources.reduce((total, item) => total + (item.updates?.length ?? 0), 0);
console.log(
  `Content audit passed: ${stories.length} dispatches, ${guides.length} guides, ${cultureStories.length} culture files, ${ingredients.length} topical files, ${procedureProfiles.length} procedure profiles, ${trends.length} trend files, ${sourceRegistry.length} registry sources, ${sourceCount} source links, ${updateCount} logged updates, no prototype claims.`,
);
