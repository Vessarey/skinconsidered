import assert from "node:assert/strict";
import { test } from "node:test";
import { PRODUCTION_ORIGIN, resolveOrigin, seoTitle, TITLE_LIMIT } from "../lib/seo.ts";
import { procedureProfiles } from "../content/procedures.ts";

const SUFFIX = " — Skin Considered";

test("short titles keep the brand suffix from the layout template", () => {
  const base = "Thread lift: cost and risks";
  assert.equal(seoTitle(base), base);
  assert.ok(base.length + SUFFIX.length <= TITLE_LIMIT);
});

test("long titles drop the suffix so the matched words stay visible", () => {
  const base = "Neuromodulators (botulinum toxin): cost, downtime, evidence, and risks";
  assert.deepEqual(seoTitle(base), { absolute: base });
});

test("the boundary is inclusive at the visible limit", () => {
  const fits = "x".repeat(TITLE_LIMIT - SUFFIX.length);
  assert.equal(seoTitle(fits), fits);
  assert.deepEqual(seoTitle(`${fits}y`), { absolute: `${fits}y` });
});

test("procedures without a national figure exist, so the snippet lead matters", () => {
  // The procedure metadata opens with the purpose, not the missing-figure notice, for these files.
  const missing = procedureProfiles.filter((profile) => profile.cost.startsWith("No reliable"));
  assert.ok(missing.length > 0);
  for (const profile of missing) assert.ok(profile.purpose.trim().length > 40, profile.slug);
});

test("production builds never fall back to a localhost origin", () => {
  assert.equal(resolveOrigin(undefined, "production"), PRODUCTION_ORIGIN);
  assert.equal(resolveOrigin("", "production"), PRODUCTION_ORIGIN);
  assert.equal(resolveOrigin(undefined, "preview"), "http://localhost:3000");
  assert.equal(resolveOrigin("https://example.test/", "production"), "https://example.test");
});
