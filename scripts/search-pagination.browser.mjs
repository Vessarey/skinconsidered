import assert from "node:assert/strict";
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || "playwright");
const base = process.env.SITE_URL || "http://localhost:3000";
if (!["localhost", "127.0.0.1"].includes(new URL(base).hostname)) throw new Error("This interaction test is local-only.");
const browser = await chromium.launch({ headless: true, ...(process.env.BROWSER_CHANNEL ? { channel: process.env.BROWSER_CHANNEL } : {}) });
try {
  const page = await browser.newPage();
  const errors = [];
  const analytics = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("request", (request) => { if (/posthog\.com|\/va\/|vercel-insights/.test(request.url())) analytics.push(request.url()); });
  for (const width of [375, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    assert.equal((await page.goto(base + "/search")).status(), 200);
    const links = page.locator(".search-results h2 a");
    const more = page.getByRole("button", { name: /Show more results/ });
    await more.waitFor();
    assert.equal(await links.count(), 10);
    const total = Number((await page.locator(".result-count").innerText()).match(/of (\d+)/)[1]);
    let shown = 10;
    while (shown < total) {
      await more.focus();
      await page.keyboard.press("Enter");
      await page.waitForFunction((index) => document.activeElement === document.querySelectorAll(".search-results h2 a")[index], shown);
      await page.waitForFunction(() => {
        const rect = document.activeElement.getBoundingClientRect();
        return rect.top >= 0 && rect.bottom <= innerHeight;
      });
      shown = Math.min(shown + 10, total);
      assert.equal(await links.count(), shown);
      assert.match(await page.locator(".result-count").innerText(), new RegExp(`Showing ${shown} of ${total}`));
      // Next Tab stays in the revealed story, not in the footer.
      await page.keyboard.press("Tab");
      assert.equal(await page.evaluate(() => Boolean(document.activeElement?.closest(".search-results article"))), true);
      if (shown === 20 && process.env.SCREENSHOT_DIR) {
        await links.nth(10).focus();
        await links.nth(10).scrollIntoViewIfNeeded();
        await page.screenshot({ path: `${process.env.SCREENSHOT_DIR}/search-pagination-${width}.png` });
      }
    }
    assert.equal(await more.count(), 0, "Final partial batch removes the button without losing focus");
    await page.getByRole("searchbox").fill("zzzz-nomatch");
    assert.equal(await links.count(), 0);
    await page.getByRole("button", { name: "Search", exact: true }).click();
    await page.waitForURL("**/search?q=zzzz-nomatch");
    await page.getByRole("button", { name: "Clear search" }).click();
    await page.waitForURL("**/search");
    await more.waitFor();
    assert.equal(await links.count(), 10, "Clear resets pagination");
    // Pointer activation follows the same accessible reading order.
    await more.click();
    await page.waitForFunction(() => document.activeElement === document.querySelectorAll(".search-results h2 a")[10]);
    await links.nth(10).press("Enter");
    await page.waitForURL((url) => url.pathname !== "/search");
    assert.equal(await page.locator("h1").count(), 1);
    await page.goBack();
    await page.waitForURL("**/search");
    await more.waitFor();
    assert.equal(await links.count(), 10);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
    console.log(`PASS ${width}px: all batches, final partial batch, keyboard/pointer focus, result counts, clear reset, article and Back`);
  }
  assert.deepEqual(errors, []);
  assert.deepEqual(analytics, [], "Local QA must not send analytics");
} finally { await browser.close(); }
