import assert from "node:assert/strict";
import { stories } from "../content/stories.ts";
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || "playwright");
const base = process.env.SITE_URL || "http://localhost:3000";
if (!["localhost", "127.0.0.1"].includes(new URL(base).hostname)) throw new Error("Local-only check.");
const story = stories.find((item) => item.slug === "singapore-unapproved-peptide-injections-warning-2026");
const path = `/dispatches/${story.slug}`;
const browser = await chromium.launch({ headless: true, ...(process.env.BROWSER_CHANNEL ? { channel: process.env.BROWSER_CHANNEL } : {}) });
try {
  const page = await browser.newPage();
  const errors = [];
  const analytics = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("request", (request) => { if (/posthog\.com|\/va\/|vercel-insights/.test(request.url())) analytics.push(request.url()); });
  for (const width of [375, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    assert.equal((await page.goto(base + path)).status(), 200);
    await page.evaluate(() => document.fonts.ready);
    assert.equal(await page.locator("h1").count(), 1);
    assert.equal(await page.locator("h1").textContent(), story.headline);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
    const copy = await page.locator("main").innerText();
    for (const phrase of ["September 25, 2026", "Singapore", "no case counts", "topical peptide skincare", "not a recall", "not peptide efficacy", "stop prescribed treatment"]) assert.ok(copy.includes(phrase), phrase);
    assert.ok(await page.locator(`a[href="${story.sources[0].url}"]`).count());
    assert.ok(await page.locator('a[href="/ingredients/peptides"]').count());
    const schemas = (await page.locator('script[type="application/ld+json"]').allTextContents()).flatMap((text) => JSON.parse(text));
    const article = schemas.find((value) => value["@type"] === "NewsArticle");
    assert.ok(article.datePublished.startsWith(story.date));
    assert.equal(article.citation.length, 1);
    if (process.env.SCREENSHOT_DIR) await page.screenshot({ path: `${process.env.SCREENSHOT_DIR}/singapore-peptides-${width}.png`, fullPage: true });
    await page.goto(base + "/today?region=Asia");
    await page.locator(`.dispatch-row h2 a[href="${path}"]`).click();
    await page.waitForURL(base + path);
    await page.getByRole("link", { name: /Peptides \(signal/ }).click();
    await page.waitForURL("**/ingredients/peptides");
    assert.equal(await page.locator("h1").count(), 1);
    console.log(`PASS ${width}px: advisory date/scope, source/schema, Asia discovery, topical context and layout`);
  }
  for (const endpoint of ["/rss.xml", "/sitemap.xml"]) assert.ok((await (await fetch(base + endpoint)).text()).includes(path));
  assert.deepEqual(errors, []);
  assert.deepEqual(analytics, []);
} finally { await browser.close(); }
