import assert from "node:assert/strict";
import { test } from "node:test";
import { trends } from "../content/trends.ts";
import { reviewHasDatedRecord } from "../lib/review-date.ts";

const trend = trends.find((item) => item.slug === "microcurrent-devices");

test("later file reviews require a matching dated record without advancing the edition", () => {
  assert.equal(reviewHasDatedRecord("2026-09-01", "2026-09-05"), true);
  assert.equal(reviewHasDatedRecord("2026-09-21", "2026-09-05"), false);
  assert.equal(reviewHasDatedRecord("2026-09-21", "2026-09-05", [{ date: "2026-09-20" }]), false);
  assert.equal(reviewHasDatedRecord("2026-09-21", "2026-09-05", [{ date: "2026-09-21" }]), true);
});

test("microcurrent verdict and correction do not promise universal safety", () => {
  assert.equal(trend.verdict, "Needs care");
  assert.equal(trend.grade, "C");
  assert.equal(trend.reviewed, "2026-09-21");
  assert.doesNotMatch(trend.tryInstead, /harmless/i);
  assert.match(trend.whoShouldSkip, /contraindication/);
  assert.match(trend.whoShouldSkip, /broader device category, not a measured injury rate/);
  assert.ok(trend.sources.some((source) => source.url === "https://www.fda.gov/medical-devices/consumer-products/electronic-muscle-stimulators"));
  assert.equal(trend.updates[0].kind, "correction");
  assert.equal(trend.updates[0].date, trend.reviewed);
});

test("microcurrent evidence keeps population, combined modalities, and commercial disclosures", () => {
  for (const phrase of ["36 healthy Korean women", "eight weeks", "microcurrent, light, radiofrequency, and ultrasound", "cannot isolate microcurrent", "Yonsei University grant", "LG Electronics supplied devices", "no competing interests", "long-term safety"]) {
    assert.ok(trend.evidence.includes(phrase), phrase);
  }
  assert.equal(trend.sources.length, 3);
});
