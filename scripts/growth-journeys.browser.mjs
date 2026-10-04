import assert from "node:assert/strict";
import { readerClickLabel } from "../lib/reader-clicks.ts";
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
  // Check player consent/loading mechanics without sending playback requests.
  await page.route("https://www.youtube-nocookie.com/**", (route) => route.fulfill({ body: "<!doctype html><title>Local player fixture</title>" }));
  for (const width of [375, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    for (const path of ["/", "/routines", "/procedures", "/newsletter", "/search"]) {
      const response = await page.goto(base + path);
      assert.equal(response.status(), 200, path);
      await page.evaluate(() => document.fonts.ready);
      assert.equal(await page.locator("h1").count(), 1, path);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, path);
    }
    await page.getByRole("searchbox").fill("Hailey Bieber");
    await page.getByRole("button", { name: "Search", exact: true }).click();
    await page.waitForURL("**/search?q=Hailey%20Bieber");
    const result = page.locator('.search-results h2 a').first();
    await result.waitFor();
    assert.equal(await result.getAttribute("href"), "/routines/hailey-bieber");
    assert.equal(readerClickLabel(await result.evaluate((anchor) => anchor.closest("[data-reader-cta]")?.getAttribute("data-reader-cta"))), "search_result");
    await result.click();
    await page.waitForURL("**/routines/hailey-bieber");
    assert.equal(await page.locator("iframe").count(), 0);
    await page.getByRole("button", { name: /Load Hailey/ }).click();
    assert.equal(await page.locator("iframe").count(), 1);
    await page.getByRole("button", { name: "Close player" }).click();
    assert.equal(await page.locator("iframe").count(), 0);
    const context = page.getByRole("navigation", { name: "Understand the routine" });
    assert.equal(readerClickLabel(await context.getAttribute("data-reader-cta")), "routine_context");
    const target = await context.locator("a").first().getAttribute("href");
    await context.locator("a").first().click();
    await page.waitForURL(base + target);
    await page.goBack();
    await page.getByRole("link", { name: "← All celebrity routines" }).click();
    await page.waitForURL("**/routines");
    assert.equal(await page.locator('[data-reader-cta="routine_open"]').count(), 3);
    if (process.env.SCREENSHOT_DIR) await page.screenshot({ path: `${process.env.SCREENSHOT_DIR}/routines-${width}.png`, fullPage: true });
    await page.locator('.newsletter-panel a.primary-action').click();
    await page.waitForURL("**/newsletter/*");
    assert.equal(await page.locator("h1").count(), 1);

    await page.goto(base + "/search?q=retinoids");
    await page.getByRole("searchbox").waitFor();
    await page.getByRole("searchbox").fill("zzzz-nomatch");
    await page.getByRole("button", { name: "Search", exact: true }).click();
    await page.waitForURL("**/search?q=zzzz-nomatch");
    assert.match(await page.locator(".empty-state").innerText(), /No match/);
    await page.goBack();
    await page.waitForFunction(() => document.querySelector('input[name="q"]')?.value === "retinoids");
    assert.ok(await page.locator(".search-results h2 a").count());

    await page.goto(base + "/procedures");
    const totalProfiles = await page.locator("details.procedure-profile").count();
    await page.locator("#procedure-search").fill("HydraFacial");
    await page.waitForURL("**/procedures?q=HydraFacial#compare");
    await page.waitForFunction((total) => document.querySelectorAll("details.procedure-profile").length < total, totalProfiles);
    const filteredNames = await page.locator("details.procedure-profile h4").allTextContents();
    assert.ok(filteredNames.includes("HydraFacial"));
    await page.reload();
    assert.equal(await page.locator("#procedure-search").inputValue(), "HydraFacial");
    await page.getByRole("button", { name: "Clear filters", exact: true }).click();
    await page.waitForFunction((total) => document.querySelectorAll("details.procedure-profile").length === total, totalProfiles);
    const advisory = page.locator('.procedure-research h2 a[href="/dispatches/canada-counterfeit-soprano-laser-advisory-2026"]');
    await advisory.click();
    await page.waitForURL("**/dispatches/canada-counterfeit-soprano-laser-advisory-2026");
    console.log(`PASS ${width}px: five hubs, search/result/back recovery, routine/context/preview journey, consent-based player fixture, persistent procedure search/reset and safety discovery`);
  }
  assert.deepEqual(errors, []);
  assert.deepEqual(analytics, [], "Local QA must not send analytics");
  console.log("PASS no uncaught errors or local analytics requests; fixed click labels verified (not production ingestion)");
} finally { await browser.close(); }
