import assert from "node:assert/strict";
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || "playwright");
const base = process.env.SITE_URL || "http://localhost:3000";
if (!["localhost", "127.0.0.1"].includes(new URL(base).hostname)) throw new Error("This browser check is local-only.");
const browser = await chromium.launch({ headless: true, ...(process.env.BROWSER_CHANNEL ? { channel: process.env.BROWSER_CHANNEL } : {}) });
try {
  const page = await browser.newPage();
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  for (const width of [375, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    const response = await page.goto(`${base}/trends/microcurrent-devices`);
    assert.equal(response.status(), 200);
    await page.evaluate(() => document.fonts.ready);
    assert.equal(await page.locator("h1").count(), 1);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
    assert.equal(await page.locator(".trend-verdict-banner > b").textContent(), "Needs care");
    assert.match(await page.locator('meta[name="description"]').getAttribute("content"), /^Verdict: Needs care\./);
    assert.match(await page.locator("#evidence").innerText(), /cannot isolate microcurrent/);
    assert.match(await page.locator("#skip").innerText(), /not a measured injury rate/);
    assert.equal(await page.locator('.update-log time').getAttribute("datetime"), "2026-09-21");
    assert.equal(await page.locator('.source-drawer a[href="https://www.fda.gov/medical-devices/consumer-products/electronic-muscle-stimulators"]').count(), 1);
    const schemas = (await page.locator('script[type="application/ld+json"]').allTextContents()).flatMap((text) => JSON.parse(text));
    assert.equal(schemas.find((schema) => schema["@type"] === "Article").dateModified.slice(0, 10), "2026-09-21");
    if (process.env.SCREENSHOT_DIR) await page.screenshot({ path: `${process.env.SCREENSHOT_DIR}/microcurrent-${width}.png`, fullPage: true });
    await page.getByRole("link", { name: "Report a correction" }).click();
    await page.waitForURL("**/corrections");
    const entry = page.locator(".corrections-log li").filter({ has: page.getByRole("link", { name: "Microcurrent facial devices", exact: true }) });
    assert.match(await entry.innerText(), /Removed the blanket 'harmless' verdict/);
    await entry.getByRole("link", { name: "Microcurrent facial devices", exact: true }).click();
    await page.waitForURL("**/trends/microcurrent-devices");
    await page.getByRole("link", { name: "← All trends" }).click();
    await page.waitForURL("**/trends");
    const card = page.locator("li").filter({ has: page.getByRole("link", { name: "Microcurrent facial devices", exact: true }) }).first();
    assert.match(await card.innerText(), /Needs care/i);
    console.log(`PASS ${width}px: corrected verdict, evidence, metadata/date, FDA source, correction round-trip and trends card`);
  }
  assert.deepEqual(errors, []);
} finally { await browser.close(); }
