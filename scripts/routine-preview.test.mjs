/** Run against the built local preview: node --test scripts/routine-preview.test.mjs */
import assert from "node:assert/strict";
import test from "node:test";
import { routines } from "../content/routines.ts";

const base = process.env.PREVIEW_ORIGIN ?? "http://localhost:3000";
if (!["localhost", "127.0.0.1"].includes(new URL(base).hostname)) throw new Error("Preview checks must target a local server.");

test("routine landing and homepage expose the three source-linked profiles", async () => {
  for (const route of ["/", "/routines"]) {
    const response = await fetch(base + route);
    assert.equal(response.status, 200);
    const html = await response.text();
    for (const profile of routines) {
      assert.ok(html.includes(`href="/routines/${profile.slug}"`));
      assert.ok(html.includes(profile.thumbnail));
    }
  }
});

for (const profile of routines) test(`${profile.name}: products, dates, metadata, sources, and consent-first media`, async () => {
  const response = await fetch(`${base}/routines/${profile.slug}`);
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.ok(html.includes(`<link rel="canonical" href="http://localhost:3000/routines/${profile.slug}"`));
  assert.ok(html.includes(`dateTime="${profile.sourceDate}"`));
  assert.ok(html.includes(profile.sourceUrl));
  assert.ok(html.includes(`https://www.youtube.com/watch?v=${profile.videoId}`));
  assert.ok(!html.includes("<iframe"), "no player before a reader loads it");
  for (const product of profile.products) assert.ok(html.includes(product.name));
  for (const related of profile.related) assert.equal((await fetch(base + related.href)).status, 200);
  assert.ok(html.includes("/newsletter/2026-09-04"));
});

test("new routes are in the sitemap and unknown routines are real 404s", async () => {
  const sitemap = await (await fetch(base + "/sitemap.xml")).text();
  for (const profile of routines) assert.ok(sitemap.includes(`/routines/${profile.slug}</loc>`));
  assert.equal((await fetch(base + "/routines/not-a-profile")).status, 404);
});
