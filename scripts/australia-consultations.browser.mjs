import assert from "node:assert/strict";
import { stories } from "../content/stories.ts";
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || "playwright");
const base = process.env.SITE_URL || "http://127.0.0.1:3000";
const story = stories.find((item) => item.slug === "australia-sunscreen-testing-consultation");
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
    for (const phrase of ["March 26, 2026", "September 15, 2026", "October 12 is the closing date", "Two private applicants", "full raw data"]) assert.ok(text.includes(phrase), phrase);
    for (const source of story.sources) assert.ok(await page.locator(`a[href="${source.url}"]`).count(), source.label);
    const schema = await page.locator('script[type="application/ld+json"]').allTextContents();
    const article = schema.map((value) => JSON.parse(value)).flat().find((value) => value["@type"] === "NewsArticle");
    assert.ok(article.datePublished.startsWith("2026-03-26"));
    assert.ok(article.dateModified.startsWith("2026-09-15"));
    assert.equal(article.citation.length, 5);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
    if (process.env.SCREENSHOT_DIR) await page.screenshot({ path: `${process.env.SCREENSHOT_DIR}/article-${width}.png`, fullPage: true });
    await page.goto(`${base}/corrections`);
    assert.ok((await page.locator("body").innerText()).includes(story.updates.at(-1).note));
    await page.goto(`${base}/today?region=Oceania`);
    const link = page.locator(`.dispatch-row h2 a[href="${path}"]`);
    assert.equal(await link.count(), 1);
    await link.click();
    await page.waitForURL(`${base}${path}`);
    console.log(`PASS ${width}px: dated update, five sources, schema, corrections and filtered-wire navigation; no overflow`);
  }
  const rss = await (await fetch(`${base}/rss.xml`)).text();
  assert.ok(rss.includes("Clarified the distinction between the earlier SPF-testing consultation"));
  assert.deepEqual(errors, []);
  console.log("PASS RSS includes clarification; no uncaught browser errors");
} finally { await browser.close(); }
