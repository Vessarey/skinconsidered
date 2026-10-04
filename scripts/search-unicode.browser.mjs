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
    for (const query of ["敏感肌", "???", "✨", "retinol 敏感肌"]) {
      await page.goto(base + "/search?q=" + encodeURIComponent(query));
      await page.locator(".empty-state").waitFor();
      assert.equal(await page.locator(".search-results article").count(), 0);
      assert.match(await page.locator(".result-count").innerText(), /Showing 0 of 0/);
      assert.equal(await page.locator(".search-more").count(), 0);
      await page.reload();
      await page.locator(".empty-state").waitFor();
      if (query === "敏感肌" && process.env.SCREENSHOT_DIR) await page.screenshot({ path: `${process.env.SCREENSHOT_DIR}/search-unicode-${width}.png` });
      await page.getByRole("button", { name: "Clear search", exact: true }).click();
      await page.waitForURL("**/search");
      await page.waitForFunction(() => document.querySelectorAll(".search-results article").length === 10);
      await page.goBack();
      await page.locator(".empty-state").waitFor();
      assert.equal(await page.getByRole("searchbox").inputValue(), query);
    }
    await page.getByRole("searchbox").fill("ＲＥＴＩＮＯＬ");
    await page.getByRole("button", { name: "Search", exact: true }).click();
    await page.waitForURL((url) => url.searchParams.get("q") === "ＲＥＴＩＮＯＬ");
    const result = page.locator(".search-results h2 a").first();
    await result.waitFor();
    assert.match(await result.textContent(), /Retinol/i);
    const target = await result.getAttribute("href");
    await result.click();
    await page.waitForURL(base + target);
    assert.equal(await page.locator("h1").count(), 1);
    await page.goBack();
    await page.getByRole("searchbox").waitFor();
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
    console.log(`PASS ${width}px: honest empty states, reload, clear/Back, full-width Latin matching and article navigation`);
  }
  assert.deepEqual(errors, []);
  assert.deepEqual(analytics, []);
} finally { await browser.close(); }
