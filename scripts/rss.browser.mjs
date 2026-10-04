import assert from "node:assert/strict";
import { stories } from "../content/stories.ts";
import { escapeMarkup } from "../lib/rss.ts";

const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || "playwright");
const base = process.env.SITE_URL || "http://127.0.0.1:3000";
const response = await fetch(`${base}/rss.xml`);
assert.equal(response.status, 200);
assert.match(response.headers.get("content-type"), /application\/rss\+xml/);
const xml = await response.text();
const browser = await chromium.launch({ headless: true, ...(process.env.BROWSER_CHANNEL ? { channel: process.env.BROWSER_CHANNEL } : {}) });
try {
  const page = await browser.newPage();
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  const feed = await page.evaluate((source) => {
    const doc = new DOMParser().parseFromString(source, "application/xml");
    if (doc.querySelector("parsererror")) throw new Error("Invalid RSS XML");
    return { base: doc.querySelector("channel > link").textContent, items: [...doc.querySelectorAll("item")].map((item) => ({
      title: item.querySelector("title").textContent,
      guid: item.querySelector("guid").textContent,
      date: item.querySelector("pubDate").textContent,
      html: item.querySelector("description").textContent,
    })) };
  }, xml);
  assert.equal(feed.items.length, stories.length);
  for (const story of stories) {
    const item = feed.items.find((entry) => entry.guid === `${feed.base}/dispatches/${story.slug}`);
    assert.ok(item, "Stable story permalink/GUID");
    assert.equal(item.date, new Date(`${story.date}T12:00:00Z`).toUTCString());
    await page.setContent(item.html);
    assert.deepEqual(await page.locator("a").evaluateAll((links) => links.map((link) => link.getAttribute("href"))), story.sources.map((source) => source.url));
    for (const update of story.updates ?? []) assert.ok((await page.locator("body").innerText()).includes(update.note));
    assert.equal(await page.locator("script, iframe, img").count(), 0);
  }
  // This harness checks the exact decoded feed HTML, not a third-party reader's UI.
  const updated = feed.items.find((item) => item.guid.endsWith("/uk-simple-micellar-water-recall"));
  for (const width of [1280, 375]) {
    await page.setViewportSize({ width, height: 900 });
    await page.setContent(`<!doctype html><html lang="en"><head><title>RSS content verification</title><style>body{font:18px/1.55 system-ui;margin:24px;max-width:720px;overflow-wrap:anywhere}h1{font-size:1.7em}li{margin-bottom:12px}</style></head><body><h1>${escapeMarkup(updated.title)}</h1>${updated.html}</body></html>`);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
    if (process.env.SCREENSHOT_DIR) await page.screenshot({ path: `${process.env.SCREENSHOT_DIR}/rss-content-${width}.png`, fullPage: true });
    await page.goto(`${base}/newsletter`);
    assert.equal(await page.locator("h1").count(), 1);
    assert.equal(new URL(await page.locator('head link[type="application/rss+xml"]').getAttribute("href"), base).pathname, "/rss.xml");
    await page.locator('footer a[href="/rss.xml"]').click();
    await page.waitForURL("**/rss.xml");
    console.log(`PASS ${width}px: decoded feed layout and newsletter-to-RSS navigation`);
  }
  assert.deepEqual(errors, []);
  console.log(`PASS ${feed.items.length} items: valid XML, source URLs, update notes, stable GUIDs/publication dates, no embedded scripts/media`);
  await page.close();
} finally { await browser.close(); }
