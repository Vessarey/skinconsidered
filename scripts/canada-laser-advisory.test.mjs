import assert from "node:assert/strict";
import { test } from "node:test";
import { stories } from "../content/stories.ts";
import { dispatchListingDates } from "../lib/sitemap-dates.ts";
const story = stories.find((item) => item.slug === "canada-counterfeit-soprano-laser-advisory-2026");
const copy = story.sections.flatMap((section) => section.paragraphs).join(" ");

test("Canadian advisory retains its original date, jurisdiction and manufacturer distinction", () => {
  assert.equal(story.date, "2026-09-18");
  assert.equal(story.location, "Canada");
  assert.equal(story.grade, "A");
  assert.match(story.dek, /Beijing Perfectlaser Technology Co., Ltd.*genuine Alma Lasers/);
  assert.match(story.signal, /public advisory/);
  assert.match(story.limitations, /not a recall of genuine Soprano systems/);
  assert.match(story.limitations, /no affected clinics, serial numbers, device counts or injury rate/);
});

test("clinic verification, patient advice and evidence boundaries remain distinct", () => {
  for (const phrase of ["permanent-label", "falsified medical-device licence", "safely dispose of counterfeits", "Class II–IV", "Class I devices", "does not authenticate any individual machine", "licensed healthcare professional", "commercial interest", "not treatment efficacy", "September 19, 2026"]) assert.ok(copy.includes(phrase), phrase);
  assert.equal(story.sources.length, 2);
  assert.ok(story.sources.every((source) => new URL(source.url).hostname.endsWith(".canada.ca")));
  assert.ok(story.related.procedures.includes("laser-hair-removal"));
  assert.ok(story.related.guides.includes("procedure-safety-checklist"));
});

test("Canadian news does not change the United States listing date", () => {
  assert.deepEqual(dispatchListingDates("2026-09-05", [story, { date: "2026-09-11", location: "United States" }]), { all: "2026-09-18", us: "2026-09-11" });
});
