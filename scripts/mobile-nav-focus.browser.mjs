import assert from "node:assert/strict";
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || "playwright");
const base = process.env.SITE_URL || "http://localhost:3000";
if (!["localhost", "127.0.0.1"].includes(new URL(base).hostname)) throw new Error("Local-only check.");
const browser = await chromium.launch({ headless: true, ...(process.env.BROWSER_CHANNEL ? { channel: process.env.BROWSER_CHANNEL } : {}) });
try {
  const page = await browser.newPage();
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  const menu = page.locator(".mobile-nav");
  const summary = menu.locator("summary");
  for (const width of [375, 768]) {
    await page.setViewportSize({ width, height: 900 });
    for (const path of ["/today", "/routines", "/us", "/guides", "/ingredients", "/procedures", "/trends", "/culture", "/search"]) {
      await page.goto(base + path);
      await summary.press("Enter");
      await menu.locator(`a[href="${path}"]`).press("Enter");
      assert.equal(await menu.evaluate((element) => element.open), false);
      assert.equal(await summary.evaluate((element) => element === document.activeElement), true, path);
      await summary.press("Space");
      assert.equal(await menu.evaluate((element) => element.open), true);
      await menu.locator("a").first().press("Escape");
      assert.equal(await menu.evaluate((element) => element.open), false);
      assert.equal(await summary.evaluate((element) => element === document.activeElement), true);
    }
    await page.goto(base + "/routines");
    await summary.click();
    await menu.locator('a[href="/routines"]').click();
    assert.equal(await summary.evaluate((element) => element === document.activeElement), true);
    await summary.press("Enter");
    if (process.env.SCREENSHOT_DIR) await page.screenshot({ path: `${process.env.SCREENSHOT_DIR}/mobile-menu-${width}.png`, fullPage: false });
    await menu.locator('a[href="/guides"]').click({ modifiers: ["ControlOrMeta"] });
    // Headless Chrome may suppress the new tab; only certify the original page.
    for (const other of page.context().pages()) if (other !== page) await other.close();
    assert.equal(await menu.evaluate((element) => element.open), true, "Modified click leaves menu open");
    assert.equal(new URL(page.url()).pathname, "/routines");
    await menu.locator('a[href="/guides"]').press("Enter");
    await page.waitForURL(base + "/guides");
    assert.equal(await menu.evaluate((element) => element.open), false, "New route closes menu");
    assert.equal(await page.evaluate(() => document.activeElement.closest(".mobile-nav nav") === null), true);
    assert.equal(await page.locator("h1").count(), 1);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
    await page.goto(base + "/search?q=retinoids");
    await summary.click();
    await menu.locator('a[href="/search"]').press("Enter");
    await page.waitForURL(base + "/search");
    assert.equal(await menu.evaluate((element) => element.open), false, "Query-only navigation closes menu");
    assert.equal(await summary.evaluate((element) => element === document.activeElement), true);
    console.log(`PASS ${width}px: same-page keyboard/pointer focus, Escape/reopen, modified click, new route and query-only navigation`);
  }
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto(base + "/routines");
  assert.equal(await menu.isVisible(), false);
  const desktop = page.getByRole("navigation", { name: "Primary navigation", exact: true });
  assert.equal(await desktop.isVisible(), true);
  await desktop.getByRole("link", { name: "Guides", exact: true }).click();
  await page.waitForURL(base + "/guides");
  assert.equal(await page.locator("h1").count(), 1);
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
  if (process.env.SCREENSHOT_DIR) await page.screenshot({ path: `${process.env.SCREENSHOT_DIR}/desktop-nav-1280.png`, fullPage: false });
  assert.deepEqual(errors, []);
  console.log("PASS 1280px: desktop navigation unchanged; no uncaught browser errors");
} finally { await browser.close(); }
