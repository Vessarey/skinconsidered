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
    await page.goto(base + "/today");
    const total = await page.locator(".dispatch-row").count();
    assert.ok(total > 0);
    const region = page.getByRole("group", { name: "Filter dispatches by region" });
    const desk = page.getByRole("group", { name: "Filter dispatches by desk" });
    const allRegions = region.getByRole("button", { name: "All", exact: true });
    for (const activation of ["Enter", "Space", "pointer"]) {
      await page.goto(base + "/today?region=Asia&desk=Research");
      const reset = page.getByRole("button", { name: "Clear filters", exact: true });
      await reset.waitFor();
      assert.equal(await page.locator(".dispatch-row").count(), 0);
      await reset.focus();
      if (activation === "pointer") await reset.click();
      else await reset.press(activation);
      await page.waitForURL(base + "/today");
      await page.waitForFunction(() => document.activeElement?.textContent === "All");
      assert.equal(await allRegions.evaluate((el) => el === document.activeElement), true);
      assert.equal(await allRegions.getAttribute("aria-pressed"), "true");
      assert.equal(await desk.getByRole("button", { name: "All", exact: true }).getAttribute("aria-pressed"), "true");
      assert.equal(await page.locator(".dispatch-row").count(), total);
      assert.equal(await page.locator(".empty-state").count(), 0);
      if (activation === "Enter" && process.env.SCREENSHOT_DIR) await page.screenshot({ path: `${process.env.SCREENSHOT_DIR}/feed-reset-${width}.png` });
      await page.keyboard.press("Tab");
      assert.equal(await region.getByRole("button", { name: "North America", exact: true }).evaluate((el) => el === document.activeElement), true);
      await page.goBack();
      await reset.waitFor();
      assert.equal(await region.getByRole("button", { name: "Asia", exact: true }).getAttribute("aria-pressed"), "true");
      assert.equal(await desk.getByRole("button", { name: "Research", exact: true }).getAttribute("aria-pressed"), "true");
      await page.goForward();
      await page.waitForFunction(() => !document.querySelector(".empty-state"));
      assert.equal(await page.locator(".dispatch-row").count(), total);
      await page.reload();
      assert.equal(await allRegions.getAttribute("aria-pressed"), "true");
      assert.equal(await page.locator("h1").count(), 1);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
    }
    console.log(`PASS ${width}px: empty-filter reset via Enter/Space/pointer, focus, Tab, ${total} restored stories, Back/Forward/reload`);
  }
  assert.deepEqual(errors, []);
  assert.deepEqual(analytics, []);
} finally { await browser.close(); }
