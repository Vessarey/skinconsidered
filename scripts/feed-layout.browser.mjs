import assert from "node:assert/strict";

const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || "playwright");
const base = process.env.SITE_URL || "http://127.0.0.1:3000";
const browser = await chromium.launch({ headless: true, ...(process.env.BROWSER_CHANNEL ? { channel: process.env.BROWSER_CHANNEL } : {}) });
try {
  const page = await browser.newPage();
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  for (const width of [375, 320, 640, 641, 760, 761, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(`${base}/today`);
    await page.evaluate(() => document.fonts.ready);
    assert.equal(await page.locator("h1").count(), 1);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
    const rows = await page.locator(".dispatch-row").evaluateAll((items) => items.map((row) => {
      const style = getComputedStyle(row);
      const content = row.querySelector("h2").parentElement.getBoundingClientRect();
      const signal = row.querySelector(".dispatch-signal").getBoundingClientRect();
      return {
        available: row.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight),
        contentWidth: content.width, contentBottom: content.bottom,
        contentRight: content.right, signalTop: signal.top, signalLeft: signal.left,
        headlineWidth: row.querySelector("h2").getBoundingClientRect().width,
      };
    }));
    assert.ok(rows.length > 0);
    for (const row of rows) {
      if (width <= 760) {
        assert.ok(row.contentWidth >= row.available - 1, `${width}px: copy must use the mobile column, got ${row.contentWidth}/${row.available}`);
        assert.ok(row.signalTop >= row.contentBottom - 1, `${width}px: evidence must sit below the copy`);
        // The existing 28ch headline cap intentionally leaves whitespace on wider tablets.
        assert.ok(row.headlineWidth >= Math.min(row.available * .8, 300), `${width}px: headline must remain readable`);
      } else assert.ok(row.signalLeft >= row.contentRight - 1, `${width}px: preserve desktop evidence column`);
    }
    console.log(`PASS ${width}px: ${rows.length} readable rows, no overflow; first headline ${Math.round(rows[0].headlineWidth)}px`);
    if ([375, 1280].includes(width) && process.env.SCREENSHOT_DIR) {
      await page.locator(".dispatch-row").first().scrollIntoViewIfNeeded();
      await page.screenshot({ path: `${process.env.SCREENSHOT_DIR}/feed-${width}.png` });
    }
    const region = page.getByRole("group", { name: "Filter dispatches by region" });
    await region.getByRole("button", { name: "North America", exact: true }).click();
    await page.waitForURL("**/today?region=North+America");
    assert.equal(await region.getByRole("button", { name: "North America", exact: true }).getAttribute("aria-pressed"), "true");
    assert.match(await page.locator(".result-count").innerText(), /North America/);
    await page.reload();
    assert.equal(await region.getByRole("button", { name: "North America", exact: true }).getAttribute("aria-pressed"), "true");
    await region.getByRole("button", { name: "All", exact: true }).click();
    await page.waitForURL(`${base}/today`);
    const link = page.locator(".dispatch-row h2 a").first();
    const href = await link.getAttribute("href");
    await link.focus();
    await page.keyboard.press("Enter");
    await page.waitForURL(`${base}${href}`);
    assert.equal(await page.locator("h1").count(), 1);
  }
  assert.deepEqual(errors, []);
  console.log("PASS filtering, reload persistence, reset and keyboard article navigation at every width; no uncaught browser errors");
} finally { await browser.close(); }
