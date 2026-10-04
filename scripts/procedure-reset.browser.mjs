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
    await page.goto(base + "/procedures");
    const total = await page.locator(".procedure-profile").count();
    assert.ok(total > 0);
    for (const query of ["HydraFacial", "zzzz-nomatch"]) {
      for (const activation of ["Enter", "Space", "pointer"]) {
        await page.goto(base + "/procedures?q=" + query + "&grade=A");
        const clear = page.getByRole("button", { name: "Clear filters", exact: true });
        await clear.waitFor();
        if (activation === "pointer") await clear.click();
        else { await clear.focus(); await page.keyboard.press(activation); }
        await page.waitForURL("**/procedures#compare");
        await page.waitForFunction(() => document.activeElement?.id === "procedure-search");
        assert.equal(await clear.count(), 0);
        assert.equal(await page.locator(".procedure-profile").count(), total);
        assert.equal(await page.locator("#procedure-search").inputValue(), "");
        assert.ok((await page.locator(".procedure-filter select").evaluateAll((selects) => selects.map((select) => select.value))).every((value) => value === "All"));
        await page.keyboard.type("melasma");
        await page.waitForURL("**/procedures?q=melasma#compare");
        assert.equal(await page.locator("#procedure-search").inputValue(), "melasma");
        await page.goBack();
        await page.waitForURL("**/procedures?q=" + query + "&grade=A");
        assert.equal(await page.locator("#procedure-search").inputValue(), query);
        assert.equal(await page.locator(".procedure-more-filters select").nth(1).inputValue(), "A");
      }
    }
    // Exercise the populated reset branch separately, without a restrictive grade.
    await page.goto(base + "/procedures?q=HydraFacial");
    assert.ok(await page.locator(".procedure-profile").count());
    const clear = page.getByRole("button", { name: "Clear filters", exact: true });
    await clear.focus();
    await page.keyboard.press("Enter");
    await page.waitForURL("**/procedures#compare");
    await page.waitForFunction(() => document.activeElement?.id === "procedure-search");
    await page.keyboard.press("Tab");
    assert.equal(await page.evaluate(() => document.activeElement === document.querySelector(".procedure-filter select")), true);
    await page.locator("#procedure-search").focus();
    await page.locator("#procedure-search").scrollIntoViewIfNeeded();
    assert.equal(await page.locator("h1").count(), 1);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
    if (process.env.SCREENSHOT_DIR) await page.screenshot({ path: `${process.env.SCREENSHOT_DIR}/procedure-reset-${width}.png` });
    console.log(`PASS ${width}px: reset focus, all filters cleared, immediate typing, Back, populated/empty results, Enter/Space/pointer, next Tab`);
  }
  assert.deepEqual(errors, []);
  assert.deepEqual(analytics, []);
} finally { await browser.close(); }
