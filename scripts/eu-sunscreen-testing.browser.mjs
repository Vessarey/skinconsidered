import assert from "node:assert/strict";
import { stories } from "../content/stories.ts";
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || "playwright");
const base = process.env.SITE_URL || "http://127.0.0.1:3000";
const story = stories.find((item) => item.slug === "eu-sunscreen-in-vitro-testing-2026");
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
    for (const phrase of ["September 15, 2026", "July 30", "r = 0.855", "33 of the 74 products", "not a market-wide failure rate", "not the individual laboratory files"]) assert.ok(text.includes(phrase), phrase);
    for (const source of story.sources) assert.ok(await page.locator(`a[href="${source.url}"]`).count(), source.label);
    const schema = await page.locator('script[type="application/ld+json"]').allTextContents();
    const article = schema.map((value) => JSON.parse(value)).flat().find((value) => value["@type"] === "NewsArticle");
    assert.ok(article.datePublished.startsWith(story.date));
    assert.equal(article.citation.length, 3);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
    if (process.env.SCREENSHOT_DIR) await page.screenshot({ path: `${process.env.SCREENSHOT_DIR}/article-${width}.png`, fullPage: true });
    await page.goto(`${base}/today?region=Europe`);
    const link = page.locator(`.dispatch-row h2 a[href="${path}"]`);
    assert.equal(await link.count(), 1);
    await link.click();
    await page.waitForURL(`${base}${path}`);
    await page.goto(`${base}/coverage`);
    const coverage = await page.locator("body").innerText();
    assert.ok(coverage.includes("European Commission DG GROW"));
    assert.ok(coverage.includes("International Organization for Standardization"));
    console.log(`PASS ${width}px: dated article, primary links, schema, filtered-wire navigation, coverage and no overflow`);
  }
  for (const endpoint of ["/rss.xml", "/sitemap.xml"]) assert.ok((await (await fetch(`${base}${endpoint}`)).text()).includes(path), endpoint);
  assert.deepEqual(errors, []);
  console.log("PASS RSS and sitemap discovery; no uncaught browser errors");
} finally { await browser.close(); }
