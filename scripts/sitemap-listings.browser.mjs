import assert from "node:assert/strict";
import { stories } from "../content/stories.ts";
import { EDITION } from "../content/site.ts";
import { dispatchListingDates } from "../lib/sitemap-dates.ts";
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || "playwright");
const base = process.env.SITE_URL || "http://127.0.0.1:3000";
const browser = await chromium.launch({ headless: true, ...(process.env.BROWSER_CHANNEL ? { channel: process.env.BROWSER_CHANNEL } : {}) });
try {
  const page = await browser.newPage();
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  const xml = await (await fetch(`${base}/sitemap.xml`)).text();
  const records = await page.evaluate((source) => {
    const doc = new DOMParser().parseFromString(source, "application/xml");
    if (doc.querySelector("parsererror")) throw new Error("Invalid sitemap XML");
    return Object.fromEntries([...doc.querySelectorAll("url")].map((item) => [new URL(item.querySelector("loc").textContent).pathname, item.querySelector("lastmod").textContent.slice(0, 10)]));
  }, xml);
  const expected = dispatchListingDates(EDITION.date, stories);
  assert.equal(records["/"], expected.all);
  assert.equal(records["/today"], expected.all);
  assert.equal(records["/us"], expected.us);
  assert.equal(records["/privacy"], EDITION.date);
  const effectiveDate = (story) => [story.date, ...(story.updates ?? []).map((update) => update.date)].sort().at(-1);
  const byDate = [...stories].sort((a, b) => effectiveDate(b).localeCompare(effectiveDate(a)));
  for (const width of [1280, 375]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of ["/", "/today", "/us"]) {
      const newest = route === "/us" ? byDate.find((story) => story.location === "United States") : byDate[0];
      assert.ok(newest);
      await page.goto(`${base}${route}`);
      assert.equal(await page.locator("h1").count(), 1);
      assert.ok(await page.locator(`a[href="/dispatches/${newest.slug}"]`).count());
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
      if (route === "/today" && process.env.SCREENSHOT_DIR) await page.screenshot({ path: `${process.env.SCREENSHOT_DIR}/latest-${width}.png` });
      await page.locator(`a[href="/dispatches/${newest.slug}"]`).first().click();
      await page.waitForURL(`**/dispatches/${newest.slug}`);
    }
    assert.deepEqual(errors, []);
    console.log(`PASS ${width}px: three listings, one H1, no overflow/errors, article navigation`);
  }
  console.log("PASS sitemap: content-derived global/U.S. dates, unchanged policy date");
} finally { await browser.close(); }
