import assert from "node:assert/strict";

// Use an installed Playwright package, or point PLAYWRIGHT_MODULE at a shared one.
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || "playwright");
const base = process.env.SITE_URL || "http://127.0.0.1:3000";
const browser = await chromium.launch({ headless: true, ...(process.env.BROWSER_CHANNEL ? { channel: process.env.BROWSER_CHANNEL } : {}) });
try {
  for (const viewport of [{ width: 1280, height: 900 }, { width: 375, height: 812 }]) {
    const page = await browser.newPage({ viewport, reducedMotion: "reduce" });
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto(`${base}/dispatches/canada-kohl-lead-recall-2026`);
    await page.locator(".reading-progress span").waitFor({ state: "attached" });
    await page.waitForFunction(() => document.querySelector(".reading-progress span").style.transform !== "");
    await page.evaluate(() => window.scrollTo({ top: 600, behavior: "instant" }));
    const accurate = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const expected = max <= 0 ? 0 : Math.max(0, Math.min(1, window.scrollY / max));
      const actual = Number(document.querySelector(".reading-progress span").style.transform.match(/scaleX\(([^)]+)\)/)?.[1]);
      return Math.abs(actual - expected) < 0.00001;
    };
    await page.waitForFunction(accurate);
    // Model late-loading content without a scroll or viewport-resize event.
    await page.evaluate(() => {
      const extra = document.createElement("div");
      extra.id = "test-late-content";
      extra.style.height = "2000px";
      document.body.append(extra);
    });
    await page.waitForFunction(accurate, undefined, { timeout: 3000 });
    await page.evaluate(() => document.getElementById("test-late-content").remove());
    await page.waitForFunction(accurate);
    await page.evaluate(() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "instant" }));
    await page.waitForFunction(accurate);
    assert.equal(await page.locator("h1").count(), 1);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), true);
    assert.deepEqual(errors, []);
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await page.waitForFunction(accurate);
    if (process.env.SCREENSHOT_DIR) {
      await page.screenshot({ path: `${process.env.SCREENSHOT_DIR}/reading-progress-${viewport.width}.png` });
    }
    if (viewport.width < 600) await page.locator(".mobile-nav summary").click();
    await page.getByRole("navigation", { name: viewport.width < 600 ? "Mobile navigation" : "Primary navigation", exact: true }).getByRole("link", { name: "Routines", exact: true }).click();
    await page.waitForURL("**/routines");
    await page.goBack();
    await page.waitForFunction(accurate);
    assert.deepEqual(errors, []);
    console.log(`PASS ${viewport.width}px: scroll, content growth/removal, page end, heading, overflow, navigation/back, runtime errors`);
    await page.close();
  }
} finally {
  await browser.close();
}
