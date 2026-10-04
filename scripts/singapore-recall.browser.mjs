import assert from "node:assert/strict";
import { stories } from "../content/stories.ts";
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || "playwright");
const base = process.env.SITE_URL || "http://127.0.0.1:3000";
const story = stories.find((item) => item.slug === "singapore-nu-skin-dermatic-effects-recall-2026");
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
    for (const phrase of ["September 18, 2026", "September 17, 2026", "CCPN2106638", "all batches", "not a consumer-level recall", "no concentration or exposure estimate"]) assert.ok(text.includes(phrase), phrase);
    assert.ok(await page.locator(`a[href="${story.sources[0].url}"]`).count());
    const schema = await page.locator('script[type="application/ld+json"]').allTextContents();
    const article = schema.map((value) => JSON.parse(value)).flat().find((value) => value["@type"] === "NewsArticle");
    assert.ok(article.datePublished.startsWith(story.date));
    assert.equal(article.citation.length, 1);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
    if (process.env.SCREENSHOT_DIR) await page.screenshot({ path: `${process.env.SCREENSHOT_DIR}/article-${width}.png`, fullPage: true });
    await page.goto(`${base}/today?region=Asia`);
    const link = page.locator(`.dispatch-row h2 a[href="${path}"]`);
    assert.equal(await link.count(), 1);
    await link.click();
    await page.waitForURL(`${base}${path}`);
    await page.goto(`${base}/coverage`);
    const entry = page.locator(".coverage-registry > li").filter({ has: page.locator("h4", { hasText: "Singapore Health Sciences Authority" }) });
    assert.equal(await entry.locator(".coverage-status").textContent(), "In use");
    const hsaCitations = stories.flatMap((item) => item.sources).filter((source) => new URL(source.url).hostname === "www.hsa.gov.sg").length;
    assert.match(await entry.locator(".coverage-registry-foot").textContent(), new RegExp(`Cited: ${hsaCitations} links?`));
    console.log(`PASS ${width}px: recall scope, dates, source/schema, Asia navigation, registry and no overflow`);
  }
  for (const endpoint of ["/rss.xml", "/sitemap.xml"]) assert.ok((await (await fetch(`${base}${endpoint}`)).text()).includes(path), endpoint);
  assert.deepEqual(errors, []);
  console.log("PASS RSS and sitemap discovery; no uncaught browser errors");
} finally { await browser.close(); }
