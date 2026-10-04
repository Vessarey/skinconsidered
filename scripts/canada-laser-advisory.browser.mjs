import assert from "node:assert/strict";
import { stories } from "../content/stories.ts";
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || "playwright");
const base = process.env.SITE_URL || "http://127.0.0.1:3000";
const story = stories.find((item) => item.slug === "canada-counterfeit-soprano-laser-advisory-2026");
const path = `/dispatches/${story.slug}`;
const browser = await chromium.launch({ headless: true, ...(process.env.BROWSER_CHANNEL ? { channel: process.env.BROWSER_CHANNEL } : {}) });
try {
  const page = await browser.newPage();
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  for (const width of [1280, 375]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(`${base}${path}`);
    await page.evaluate(() => document.fonts.ready);
    assert.equal(await page.locator("h1").count(), 1);
    assert.equal(await page.locator("h1").innerText(), story.headline);
    const text = await page.locator("body").innerText();
    for (const phrase of ["September 18, 2026", "September 19, 2026", "Beijing Perfectlaser", "genuine Alma Lasers", "not a recall", "Class II–IV", "commercial interest"]) assert.ok(text.includes(phrase), phrase);
    for (const source of story.sources) assert.ok(await page.locator(`a[href="${source.url}"]`).count());
    const schema = await page.locator('script[type="application/ld+json"]').allTextContents();
    const article = schema.map((value) => JSON.parse(value)).flat().find((value) => value["@type"] === "NewsArticle");
    assert.ok(article.datePublished.startsWith(story.date));
    assert.equal(article.citation.length, 2);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
    if (process.env.SCREENSHOT_DIR) await page.screenshot({ path: `${process.env.SCREENSHOT_DIR}/article-${width}.png`, fullPage: true });
    await page.locator('a[href="/procedures/laser-hair-removal"]').first().click();
    await page.waitForURL("**/procedures/laser-hair-removal");
    await page.goto(`${base}/today?region=North+America&desk=Safety`);
    const link = page.locator(`.dispatch-row h2 a[href="${path}"]`);
    assert.equal(await link.count(), 1);
    await link.click();
    await page.waitForURL(`${base}${path}`);
    console.log(`PASS ${width}px: advisory scope, sources/schema, related procedure, filtered-wire navigation and no overflow`);
  }
  for (const endpoint of ["/rss.xml", "/sitemap.xml"]) assert.ok((await (await fetch(`${base}${endpoint}`)).text()).includes(path), endpoint);
  assert.deepEqual(errors, []);
  console.log("PASS RSS and sitemap discovery; no uncaught browser errors");
} finally { await browser.close(); }
