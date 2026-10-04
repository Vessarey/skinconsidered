import assert from "node:assert/strict";
import { test } from "node:test";
import { stories } from "../content/stories.ts";
import { sourceRegistry } from "../content/coverage.ts";
import { dispatchListingDates } from "../lib/sitemap-dates.ts";
const story = stories.find((item) => item.slug === "taiwan-medicube-cream-advisory-2026");
const copy = story.sections.flatMap((section) => section.paragraphs).join(" ");

test("Taiwan's advisory retains its own date and does not become a domestic recall", () => {
  assert.equal(story.date, "2026-09-21");
  assert.equal(story.location, "Taiwan");
  assert.equal(story.region, "Asia");
  assert.equal(story.grade, "A");
  assert.match(story.limitations, /does not establish local contamination or a domestic recall/);
  assert.match(copy, /Traditional Chinese/);
  assert.ok(sourceRegistry.find((entry) => entry.id === "tfda").domains.includes("fda.gov.tw"));
});

test("Singapore scope, batch identifiers and dated consumer advice remain explicit", () => {
  for (const phrase of ["August 26", "August 28", "2E122I.2E117I", "2E191G.2E193G", "Venus Beauty", "unaffected batches", "not a current worldwide safety count", "not sponsored product studies"]) assert.ok(copy.includes(phrase), phrase);
  assert.equal(story.sources.length, 3);
  assert.equal(story.sources.filter((source) => new URL(source.url).hostname === "www.hsa.gov.sg").length, 2);
  assert.ok(story.related.trends.includes("salmon-dna-pdrn"));
});

test("new Asian advice advances the global wire without redating the U.S. desk", () => {
  assert.deepEqual(dispatchListingDates("2026-09-05", [story, { date: "2026-09-11", location: "United States" }]), { all: "2026-09-21", us: "2026-09-11" });
});
