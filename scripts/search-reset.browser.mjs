import assert from "node:assert/strict";
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || "playwright");
const base = process.env.SITE_URL || "http://localhost:3000";
if (!["localhost", "127.0.0.1"].includes(new URL(base).hostname)) throw new Error("Local-only interaction check.");
const browser = await chromium.launch({ headless: true, ...(process.env.BROWSER_CHANNEL ? { channel: process.env.BROWSER_CHANNEL } : {}) });
try {
  const page = await browser.newPage();
  const errors = [];
  const analytics = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("request", (request) => { if (/posthog\.com|\/va\/|vercel-insights/.test(request.url())) analytics.push(request.url()); });
  for (const width of [375, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    for (const saved of [true, false]) {
      for (const activation of ["Enter", "Space", "pointer"]) {
        await page.goto(base + (saved ? "/search?q=zzzz-nomatch" : "/search"));
        const input = page.getByRole("searchbox");
        if (!saved) await input.fill("zzzz-nomatch");
        const reset = page.getByRole("button", { name: "Clear search", exact: true });
        await reset.focus();
        if (activation === "pointer") await reset.click();
        else await reset.press(activation);
        await page.waitForFunction(() => document.activeElement?.id === "site-search");
        assert.equal(new URL(page.url()).search, "");
        assert.equal(await input.inputValue(), "");
        assert.equal(await page.locator(".search-results article").count(), 10);
        if (saved && activation === "Enter" && process.env.SCREENSHOT_DIR) {
          await page.screenshot({ path: `${process.env.SCREENSHOT_DIR}/search-reset-${width}.png` });
        }
        // Typing works without refocusing; Tab continues to the submit button.
        await page.keyboard.type("retinol");
        assert.equal(await input.inputValue(), "retinol");
        await page.keyboard.press("Tab");
        assert.equal(await page.getByRole("button", { name: "Search", exact: true }).evaluate((el) => el === document.activeElement), true);
        if (saved) {
          await page.goBack();
          await page.locator(".empty-state").waitFor();
          assert.equal(await input.inputValue(), "zzzz-nomatch");
          await page.goForward();
          await page.waitForFunction(() => document.querySelectorAll(".search-results article").length === 10);
          assert.equal(await input.inputValue(), "");
        }
        assert.equal(await page.locator("h1").count(), 1);
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
      }
    }
    console.log(`PASS ${width}px: saved/draft reset, Enter/Space/pointer, focus, typing, Tab, Back/Forward, no overflow`);
  }
  assert.deepEqual(errors, []);
  assert.deepEqual(analytics, []);
} finally { await browser.close(); }
