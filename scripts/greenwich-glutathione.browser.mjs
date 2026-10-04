import assert from "node:assert/strict";
import { stories } from "../content/stories.ts";
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || "playwright");
const base = process.env.SITE_URL || "http://localhost:3000";
if (!["localhost", "127.0.0.1"].includes(new URL(base).hostname)) throw new Error("Local-only check.");
const story = stories.find((item) => item.slug === "us-greenwich-glutathione-recall-2026");
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
    for (const phrase of ["October 1, 2026", "United States", "risk denominator", "subcutaneous", "commercial interest", "not confirmed causation", "do not combine their patient counts"]) assert.ok(copy.toLowerCase().includes(phrase.toLowerCase()), phrase);
    for (const source of story.sources) assert.ok(await page.locator(`a[href="${source.url}"]`).count());
    const schemas = (await page.locator('script[type="application/ld+json"]').allTextContents()).flatMap((text) => JSON.parse(text));
    const article = schemas.find((value) => value["@type"] === "NewsArticle");
    assert.ok(article.datePublished.startsWith(story.date));
    assert.equal(article.citation.length, 2);
    if (process.env.SCREENSHOT_DIR) await page.screenshot({ path: `${process.env.SCREENSHOT_DIR}/greenwich-glutathione-${width}.png`, fullPage: true });
    await page.locator('a[href="/guides/procedure-safety-checklist"]').first().click();
    await page.waitForURL("**/guides/procedure-safety-checklist");
    for (const listing of ["/today", "/us", "/search?q=Greenwich"]) {
      await page.goto(base + listing);
      await page.locator(`a[href="${path}"]`).first().click();
      await page.waitForURL(base + path);
    }
    console.log(`PASS ${width}px: recall scope, sources/schema, guide and global/US/search discovery, layout`);
  }
  for (const endpoint of ["/rss.xml", "/sitemap.xml"]) assert.ok((await (await fetch(base + endpoint)).text()).includes(path));
  assert.deepEqual(errors, []);
  assert.deepEqual(analytics, []);
} finally { await browser.close(); }
