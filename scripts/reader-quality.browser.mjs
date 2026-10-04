import assert from "node:assert/strict";
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || "playwright");
const base = process.env.SITE_URL || "http://localhost:3000";
if (!["localhost", "127.0.0.1"].includes(new URL(base).hostname)) throw new Error("Local preview only.");
const browser = await chromium.launch({ headless: true, ...(process.env.BROWSER_CHANNEL ? { channel: process.env.BROWSER_CHANNEL } : {}) });
try {
  for (const width of [375, 1280]) {
    for (const path of ["/", "/routines", "/procedures", "/guides", "/ingredients", "/trends", "/culture", "/newsletter", "/search"]) {
      const context = await browser.newContext({ viewport: { width, height: 900 } });
      const page = await context.newPage();
      const errors = [];
      const analytics = [];
      page.on("pageerror", (error) => errors.push(error.message));
      page.on("request", (request) => { if (/posthog\.com|\/va\/|vercel-insights/.test(request.url())) analytics.push(request.url()); });
      // The local server does not host Vercel's deployment-only loader.
      await page.route("**/_vercel/insights/script.js", (route) => route.fulfill({ contentType: "application/javascript", body: "" }));
      assert.equal((await page.goto(base + path)).status(), 200, path);
      await page.evaluate(() => document.fonts.ready);
      await page.waitForLoadState("networkidle");
      assert.equal(await page.locator("h1").count(), 1, path);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, path);
      const canonical = new URL(await page.locator('link[rel="canonical"]').getAttribute("href"));
      assert.ok([new URL(base).origin, "https://skinconsidered.com"].includes(canonical.origin));
      assert.equal(canonical.pathname, path);
      const images = await page.evaluate(() => performance.getEntriesByType("resource").flatMap((entry) => {
        const url = new URL(entry.name);
        const art = url.searchParams.get("url") ?? url.pathname;
        return url.origin === location.origin && art.startsWith("/art/") ? [{ art, bytes: entry.encodedBodySize, optimized: url.pathname === "/_next/image" }] : [];
      }));
      assert.ok(images.every((image) => image.optimized), "Owned artwork uses responsive optimization");
      if (path !== "/") assert.ok(images.every((image) => image.art !== "/art/home-hero.jpg"), "Brand links must not download the homepage illustration");
      if (path === "/" && width === 375) {
        const hero = images.find((image) => image.art === "/art/home-hero.jpg");
        assert.ok(hero && hero.bytes > 0 && hero.bytes < 100_000, "Mobile homepage artwork stays below 100 KB");
      }
      if (path === "/procedures" && width === 375) assert.equal(images.length, 0, "Hidden mobile illustration must not download");
      if (path === "/routines") {
        const nav = page.getByRole("navigation", { name: "Make the routine your own" });
        await nav.getByRole("link", { name: /Build your own/ }).click();
        await page.waitForURL("**/guides/routine-from-zero");
        assert.equal(await page.locator("h1").count(), 1);
        await page.goBack();
        await nav.getByRole("link", { name: /Understand your skin barrier/ }).click();
        await page.waitForURL("**/guides/skin-barrier-explained");
        await page.goBack();
      }
      if (await page.locator(".newsletter-preview").count()) {
        assert.ok((await page.locator(".newsletter-preview").first().innerText()).includes("not available yet"));
        const feed = page.locator('.newsletter-preview-actions a[href="/rss.xml"]').first();
        assert.equal(await feed.count(), 1);
        const response = await page.request.get(base + "/rss.xml");
        assert.equal(response.status(), 200);
        assert.match(response.headers()["content-type"], /xml/);
        const xml = await response.text();
        assert.ok(xml.includes("<rss") && xml.includes("us-greenwich-glutathione-recall-2026"));
      }
      if (process.env.SCREENSHOT_DIR && ["/", "/routines", "/procedures", "/newsletter"].includes(path)) {
        // Full-page screenshots do not bring lazy artwork into the viewport themselves.
        for (const artwork of await page.locator(".site-art img").all()) {
          if (await artwork.isVisible()) {
            await artwork.scrollIntoViewIfNeeded();
            await artwork.evaluate((element) => element.decode());
          }
        }
        await page.evaluate(() => { window.scrollTo({ top: 0, left: 0, behavior: "instant" }); return new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))); });
        await page.screenshot({ path: `${process.env.SCREENSHOT_DIR}/quality-${path === "/" ? "home" : path.slice(1)}-${width}.png`, fullPage: true });
        await page.screenshot({ path: `${process.env.SCREENSHOT_DIR}/quality-${path === "/" ? "home" : path.slice(1)}-${width}-viewport.png` });
      }
      assert.deepEqual(errors, [], path);
      assert.deepEqual(analytics, [], path);
      console.log(JSON.stringify({ width, path, artwork: images, status: "PASS" }));
      await context.close();
    }
  }
  // Overflow alone misses an implicit grid column that squeezes, but fits, the headline.
  const archivePage = await browser.newPage();
  for (const width of [320, 375, 640, 641, 760, 768, 1280]) {
    await archivePage.setViewportSize({ width, height: 900 });
    await archivePage.goto(base + "/newsletter");
    const row = archivePage.locator(".issue-archive .dispatch-row").first();
    if (width <= 640) {
      assert.ok(await row.evaluate((element) => {
        const copy = element.querySelector("h2");
        const signal = element.querySelector(".dispatch-signal");
        return copy.clientWidth >= Math.min(300, innerWidth - 40) && signal.getBoundingClientRect().top > copy.getBoundingClientRect().bottom;
      }), "Mobile issue headline has a full column and the signal follows below");
    }
    assert.equal(await archivePage.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
    console.log(`PASS newsletter archive layout ${width}px`);
  }
  // Check image decoding, not merely successful HTML delivery, at phone retina density.
  const page = await browser.newPage({ viewport: { width: 375, height: 900 }, deviceScaleFactor: 2 });
  await page.goto(base);
  const hero = page.locator(".reader-intro .site-art img");
  await hero.evaluate((element) => element.decode());
  // naturalWidth is density-corrected by srcset; inspect the selected asset width.
  assert.ok(await hero.evaluate((element) => Number(new URL(element.currentSrc).searchParams.get("w")) >= element.clientWidth * devicePixelRatio));
  console.log("PASS mobile retina image decoding and resolution");
} finally { await browser.close(); }
