import assert from "node:assert/strict";
import { stories } from "../content/stories.ts";
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || "playwright");
const base = process.env.SITE_URL || "http://localhost:3000";
if (!["localhost", "127.0.0.1"].includes(new URL(base).hostname)) throw new Error("Local-only check.");
const story = stories.find((item) => item.slug === "taiwan-medicube-cream-advisory-2026");
const path = `/dispatches/${story.slug}`;
const browser = await chromium.launch({ headless: true, ...(process.env.BROWSER_CHANNEL ? { channel: process.env.BROWSER_CHANNEL } : {}) });
try {
  const page = await browser.newPage();
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  for (const width of [375, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    assert.equal((await page.goto(base + path)).status(), 200);
    await page.evaluate(() => document.fonts.ready);
    assert.equal(await page.locator("h1").count(), 1);
    assert.equal(await page.locator("h1").textContent(), story.headline);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
    const copy = await page.locator("main").innerText();
    for (const phrase of ["September 21, 2026", "August 26", "2E122I.2E117I", "2E191G.2E193G", "domestic recall", "unaffected batches", "Traditional Chinese"]) assert.ok(copy.includes(phrase), phrase);
    for (const source of story.sources) assert.ok(await page.locator(`a[href="${source.url}"]`).count());
    const schemas = (await page.locator('script[type="application/ld+json"]').allTextContents()).flatMap((text) => JSON.parse(text));
    const article = schemas.find((value) => value["@type"] === "NewsArticle");
    assert.ok(article.datePublished.startsWith(story.date));
    assert.equal(article.citation.length, 3);
    if (process.env.SCREENSHOT_DIR) await page.screenshot({ path: `${process.env.SCREENSHOT_DIR}/taiwan-advisory-${width}.png`, fullPage: true });
    await page.goto(base + "/today?region=Asia");
    await page.locator(`.dispatch-row h2 a[href="${path}"]`).click();
    await page.waitForURL(base + path);
    await page.goto(base + "/coverage");
    const entry = page.locator(".coverage-registry > li").filter({ has: page.locator("h4", { hasText: "Taiwan Food and Drug Administration" }) });
    assert.equal(await entry.locator(".coverage-status").textContent(), "In use");
    console.log(`PASS ${width}px: new advisory, dates, scope, sources/schema, Asia navigation and Taiwan registry`);
  }
  for (const endpoint of ["/rss.xml", "/sitemap.xml"]) assert.ok((await (await fetch(base + endpoint)).text()).includes(path));
  assert.deepEqual(errors, []);
} finally { await browser.close(); }
