import assert from "node:assert/strict";
import { test } from "node:test";
import { stories } from "../content/stories.ts";
import { sourceRegistry } from "../content/coverage.ts";
import { dispatchListingDates } from "../lib/sitemap-dates.ts";

const story = stories.find((item) => item.slug === "us-greenwich-glutathione-recall-2026");
const copy = story.sections.flatMap((section) => section.paragraphs).join(" ");

test("Greenwich recall keeps its announcement date, US jurisdiction and primary sources", () => {
  assert.equal(story.date, "2026-10-01");
  assert.equal(story.location, "United States");
  assert.equal(story.grade, "A");
  assert.equal(story.sources.length, 2);
  assert.ok(story.sources.every((source) => new URL(source.url).hostname === "www.fda.gov"));
  assert.ok(sourceRegistry.find((entry) => entry.id === "fda").domains.includes("fda.gov"));
});

test("recall distinguishes company reports, route, commercial interest and separate background", () => {
  for (const phrase of ["risk denominator", "measured endotoxin", "cosmetic use", "oral or topical", "efficacy"]) assert.ok(story.limitations.includes(phrase), phrase);
  for (const phrase of ["voluntary US recall", "200 mg/mL", "10 mL", "subcutaneous", "Greenwich Rx reports two", "intravenous", "not formulated for that route", "affected-lot", "commercial interest", "without endorsement", "not confirmed causation", "Reviewed October 2, 2026", "August 27", "Neither source establishes a connection", "do not combine their patient counts"]) assert.ok(copy.includes(phrase), phrase);
  assert.ok(story.related.guides.includes("procedure-safety-checklist"));
});

test("US recall advances both discovery desks using event date, not review date", () => {
  assert.deepEqual(dispatchListingDates("2026-09-05", [story, { date: "2026-09-25", location: "Singapore" }]), { all: "2026-10-01", us: "2026-10-01" });
});
