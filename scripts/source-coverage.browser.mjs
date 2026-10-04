import assert from "node:assert/strict";
import { taxonomy } from "../content/coverage.ts";
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || "playwright");
const base = process.env.SITE_URL || "http://127.0.0.1:3000";
const browser = await chromium.launch({ headless: true, ...(process.env.BROWSER_CHANNEL ? { channel: process.env.BROWSER_CHANNEL } : {}) });
try {
  const page = await browser.newPage();
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  for (const width of [1280, 375]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(`${base}/coverage`);
    await page.evaluate(() => document.fonts.ready);
    assert.equal(await page.locator("h1").count(), 1);
    assert.equal(await page.locator("#taxonomy-title").textContent(), `${taxonomy.length} desks. One filing system.`);
    assert.equal(await page.locator(".coverage-taxonomy article").count(), taxonomy.length);
    for (const [name, count] of [["European Commission DG GROW", 2], ["European Commission Safety Gate", 1], ["International Organization for Standardization", 1]]) {
      const entry = page.locator(".coverage-registry > li").filter({ has: page.locator("h4", { hasText: name }) });
      assert.equal(await entry.count(), 1);
      assert.match(await entry.locator(".coverage-registry-foot").textContent(), new RegExp(`Cited: ${count} link`));
      assert.equal(await entry.locator(".coverage-status").textContent(), "In use");
      assert.equal(await entry.locator("h4 a").getAttribute("target"), "_blank");
    }
    assert.ok((await page.locator("body").innerText()).includes("most specific registered domain"));
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
    if (process.env.SCREENSHOT_DIR) {
      await page.screenshot({ path: `${process.env.SCREENSHOT_DIR}/coverage-${width}.png` });
      await page.locator(".coverage-registry > li").filter({ has: page.locator("h4", { hasText: "European Commission DG GROW" }) }).screenshot({ path: `${process.env.SCREENSHOT_DIR}/source-${width}.png` });
    }
    await page.locator('.coverage-taxonomy a[href="/today?desk=Regulation"]').click();
    await page.waitForURL("**/today?desk=Regulation");
    assert.equal(await page.locator("h1").count(), 1);
    console.log(`PASS ${width}px: derived desk count, accurate registry citations, explanation, links and navigation; no overflow`);
  }
  assert.deepEqual(errors, []);
} finally { await browser.close(); }
