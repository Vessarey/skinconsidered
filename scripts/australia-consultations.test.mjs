import assert from "node:assert/strict";
import { test } from "node:test";
import { stories } from "../content/stories.ts";
import { dispatchListingDates } from "../lib/sitemap-dates.ts";

const story = stories.find((item) => item.slug === "australia-sunscreen-testing-consultation");
const copy = story.sections.flatMap((section) => section.paragraphs).join(" ");

test("Australia clarification preserves the original date and labels its editorial update", () => {
  assert.equal(story.date, "2026-03-26");
  assert.equal(story.updates.at(-1).date, "2026-09-15");
  assert.equal(story.updates.at(-1).kind, "update");
  assert.match(story.updates.at(-1).note, /editorial update, not a new regulatory action/);
  assert.equal(story.grade, "Context");
  assert.equal(story.location, "Australia");
});

test("consultation timing, proposal origins and evidence limits stay explicit", () => {
  assert.match(copy, /September 11.*October 12, 2026/);
  assert.match(copy, /October 12 is the closing date/);
  assert.match(copy, /Two private applicants proposed a prohibition/);
  assert.match(copy, /competing proposals, not adopted restrictions/);
  assert.match(copy, /continue sunscreen use/);
  assert.match(copy, /not announce a product recall/);
  assert.match(story.limitations, /raw data.*independent corroboration/);
  assert.match(copy, /other consumer-product exposure, metabolites and impurities/);
  assert.equal(story.sources.length, 5);
  assert.ok(story.sources.every((source) => new URL(source.url).hostname.endsWith("tga.gov.au")));
});

test("Australian update refreshes the global wire, not the U.S. desk", () => {
  const dates = dispatchListingDates("2026-09-05", [story, { date: "2026-09-11", location: "United States" }]);
  assert.deepEqual(dates, { all: "2026-09-15", us: "2026-09-11" });
});
