import assert from "node:assert/strict";
import { test } from "node:test";
import { stories } from "../content/stories.ts";
import { sourceRegistry } from "../content/coverage.ts";
import { dispatchListingDates } from "../lib/sitemap-dates.ts";
const story = stories.find((item) => item.slug === "singapore-nu-skin-dermatic-effects-recall-2026");
const copy = story.sections.flatMap((section) => section.paragraphs).join(" ");

test("Singapore recall distinguishes the action from its publication date", () => {
  assert.equal(story.date, "2026-09-18");
  assert.equal(story.location, "Singapore");
  assert.equal(story.region, "Asia");
  assert.equal(story.grade, "A");
  assert.match(copy, /recall began September 17, 2026; HSA published its notice September 18/);
  assert.match(copy, /CCPN2106638/);
  assert.match(copy, /NU SKIN ENTERPRISES SINGAPORE PTE LTD/);
});

test("retail action stays product-specific and does not invent exposure or consumer directions", () => {
  assert.match(story.dek, /theophylline.*all batches.*Singapore/);
  assert.match(story.whyItMatters, /Retail and wholesale suppliers/);
  assert.match(story.limitations, /no concentration or exposure estimate/);
  assert.match(story.limitations, /not a consumer-level recall/);
  assert.match(copy, /Class 2/);
  assert.match(copy, /do not establish a consumer refund programme/);
  assert.match(copy, /not a sponsored product trial/);
  assert.equal(new URL(story.sources[0].url).hostname, "www.hsa.gov.sg");
  assert.ok(sourceRegistry.find((entry) => entry.id === "hsa").domains.includes("hsa.gov.sg"));
});

test("Singapore news advances the global listing without redating the U.S. desk", () => {
  assert.deepEqual(dispatchListingDates("2026-09-05", [story, { date: "2026-09-11", location: "United States" }]), { all: "2026-09-18", us: "2026-09-11" });
});
