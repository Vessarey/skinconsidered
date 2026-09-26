import assert from "node:assert/strict";
import { test } from "node:test";
import { stories } from "../content/stories.ts";
import { sourceRegistry } from "../content/coverage.ts";
import { dispatchListingDates } from "../lib/sitemap-dates.ts";
const story = stories.find((item) => item.slug === "singapore-unapproved-peptide-injections-warning-2026");
const copy = story.sections.flatMap((section) => section.paragraphs).join(" ");

test("Singapore peptide advisory retains the source date and jurisdiction", () => {
  assert.equal(story.date, "2026-09-25");
  assert.equal(story.location, "Singapore");
  assert.equal(story.region, "Asia");
  assert.equal(story.grade, "A");
  assert.equal(story.sources.length, 1);
  assert.equal(new URL(story.sources[0].url).hostname, "www.hsa.gov.sg");
  assert.ok(sourceRegistry.find((entry) => entry.id === "hsa").domains.includes("hsa.gov.sg"));
});

test("injectable warning does not become a topical verdict or prescription-stop instruction", () => {
  for (const phrase of ["no case counts", "risk denominator", "not a recall", "topical peptide skincare"]) assert.ok(story.limitations.includes(phrase), phrase);
  for (const phrase of ["distinguishes prescription GLP-1", "retatrutide and cagrilintide", "dated warning", "Do not read this as advice to stop prescribed treatment", "not peptide efficacy", "not a commercially sponsored treatment trial", "September 26, 2026"]) assert.ok(copy.includes(phrase), phrase);
  assert.ok(story.related.ingredients.includes("peptides"));
});

test("Singapore news updates global listings without redating the United States desk", () => {
  assert.deepEqual(dispatchListingDates("2026-09-05", [story, { date: "2026-09-11", location: "United States" }]), { all: "2026-09-25", us: "2026-09-11" });
});
