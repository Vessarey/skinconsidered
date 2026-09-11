import assert from "node:assert/strict";
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || "playwright");
const base = process.env.SITE_URL || "http://127.0.0.1:3000";
const slug = "fda-paba-trolamine-sunscreen-final-order-2026";
for (const route of ["/rss.xml", "/sitemap.xml"]) {
  const response = await fetch(`${base}${route}`);
  assert.equal(response.status, 200);
  assert.ok((await response.text()).includes(slug), `New dispatch missing from ${route}`);
}
const browser = await chromium.launch({ headless: true, ...(process.env.BROWSER_CHANNEL ? { channel: process.env.BROWSER_CHANNEL } : {}) });
try {
  for (const width of [1280, 375]) {
    const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion: "reduce" });
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto(`${base}/dispatches/${slug}`);
    assert.equal(await page.locator("h1").count(), 1);
    assert.match(await page.locator("h1").innerText(), /2027 effective date/);
    assert.match(await page.locator("main").innerText(), /Sources checked September 11, 2026/);
    assert.doesNotMatch(await page.locator("main").innerText(), /Sources rechecked September 5|We rechecked them on/);
    assert.equal(await page.locator('.source-drawer a[href^="https://"]').count(), 3);
    assert.equal(await page.locator('meta[property="article:published_time"]').getAttribute("content"), "2026-09-11T00:00:00+00:00");
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
    if (process.env.SCREENSHOT_DIR) await page.screenshot({ path: `${process.env.SCREENSHOT_DIR}/sunscreen-${width}.png`, fullPage: true });
    if (width < 600) await page.locator(".mobile-nav summary").click();
    await page.getByRole("navigation", { name: width < 600 ? "Mobile navigation" : "Primary navigation", exact: true }).getByRole("link", { name: "Latest", exact: true }).click();
    await page.waitForURL("**/today");
    await page.locator(`a[href="/dispatches/${slug}"]`).first().click();
    await page.waitForURL(`**/dispatches/${slug}`);
    assert.deepEqual(errors, []);
    console.log(`PASS ${width}px: article, sources, issue date, overflow, navigation and runtime errors`);
    await page.close();
  }
} finally { await browser.close(); }
