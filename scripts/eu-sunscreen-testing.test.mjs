import assert from "node:assert/strict";
import { test } from "node:test";
import { stories } from "../content/stories.ts";
import { sourceRegistry } from "../content/coverage.ts";

const story = stories.find((item) => item.slug === "eu-sunscreen-in-vitro-testing-2026");
const copy = story.sections.flatMap((section) => section.paragraphs).join(" ");

test("EU testing dispatch distinguishes announcement, report and standard dates", () => {
  assert.equal(story.date, "2026-09-15");
  assert.equal(story.grade, "Context");
  assert.equal(story.location, "European Union");
  for (const phrase of ["October 2025 to March 2026", "July 30", "December 2024", "Sources checked September 16, 2026"]) assert.ok(copy.includes(phrase));
  assert.match(story.whyItMatters, /does not announce a ban on human SPF testing/);
});

test("EU campaign statistics retain denominators and limits", () => {
  for (const phrase of ["r = 0.855", "Two stick/lip-balm products", "not the number of paired comparisons or human participants", "33 of the 74 products (45%)", "not a market-wide failure rate", "May 29 reporting cut-off", "HDRS method was not evaluated", "Commission-funded", "written by EY", "not the individual laboratory files"]) assert.ok(copy.includes(phrase), phrase);
  assert.match(story.limitations, /excludes sticks and powders.*does not measure water resistance/);
  assert.match(copy, /UVA protection was assessed using a separate standard/);
});

test("new primary sources have explicit watchlist coverage", () => {
  assert.equal(story.sources.length, 3);
  assert.ok(sourceRegistry.find((entry) => entry.id === "eu-dg-grow").domains.includes("op.europa.eu"));
  assert.ok(sourceRegistry.find((entry) => entry.id === "iso").domains.includes("iso.org"));
  assert.ok(story.sources.every((source) => {
    const host = new URL(source.url).hostname;
    return sourceRegistry.some((entry) => entry.domains.some((domain) => host === domain || host.endsWith(`.${domain}`)));
  }));
});
