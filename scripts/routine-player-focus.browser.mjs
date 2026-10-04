import assert from "node:assert/strict";
import { routines } from "../content/routines.ts";
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || "playwright");
const base = process.env.SITE_URL || "http://localhost:3000";
if (!["localhost", "127.0.0.1"].includes(new URL(base).hostname)) throw new Error("Local-only interaction check.");
const browser = await chromium.launch({ headless: true, ...(process.env.BROWSER_CHANNEL ? { channel: process.env.BROWSER_CHANNEL } : {}) });
try {
  const page = await browser.newPage();
  const errors = [];
  const analytics = [];
  let playerRequests = 0;
  let holdNextPlayer = false;
  let releasePlayer;
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("request", (request) => { if (/posthog\.com|\/va\/|vercel-insights/.test(request.url())) analytics.push(request.url()); });
  // A local fixture verifies the consent and focus lifecycle, not YouTube playback.
  await page.route("https://www.youtube-nocookie.com/**", async (route) => {
    playerRequests += 1;
    if (holdNextPlayer) {
      holdNextPlayer = false;
      await new Promise((resolve) => { releasePlayer = resolve; });
    }
    await route.fulfill({ contentType: "text/html", body: "<!doctype html><title>Local player fixture</title><button>Play fixture</button>" });
  });
  for (const width of [375, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    for (const profile of routines) {
      const requestsBefore = playerRequests;
      await page.goto(`${base}/routines/${profile.slug}`);
      const load = page.getByRole("button", { name: `Load ${profile.name}’s original Vogue video`, exact: true });
      await load.waitFor();
      assert.equal(await page.locator("iframe").count(), 0);
      assert.equal(playerRequests, requestsBefore, "No player request before consent");
      assert.equal(await load.evaluate((el) => el === document.activeElement), false, "No automatic focus on arrival");
      for (const activation of ["Enter", "Space", "pointer"]) {
        await load.focus();
        if (activation === "pointer") await load.click();
        else await load.press(activation);
        await page.waitForFunction(() => document.activeElement?.tagName === "IFRAME");
        const frame = page.locator("iframe");
        assert.equal(await frame.getAttribute("src"), `https://www.youtube-nocookie.com/embed/${profile.videoId}?rel=0`);
        assert.equal(await frame.getAttribute("title"), `${profile.name} · Vogue Beauty Secrets`);
        const play = page.frameLocator("iframe").getByRole("button", { name: "Play fixture" });
        await play.waitFor();
        // Visibility can precede the frame's load/focus handler; test the ready player.
        await play.evaluate(() => document.readyState === "complete" ? Promise.resolve() : new Promise((resolve) => window.addEventListener("load", resolve, { once: true })));
        await page.evaluate(() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))));
        // The next Tab reaches a player control; later Tabs leave the player normally.
        await page.keyboard.press("Tab");
        assert.equal(await play.evaluate((el) => el === document.activeElement), true);
        await page.keyboard.press("Tab");
        const watch = page.getByRole("link", { name: "Watch on YouTube ↗" });
        assert.equal(await watch.evaluate((el) => el === document.activeElement), true);
        await page.keyboard.press("Tab");
        const close = page.getByRole("button", { name: "Close player", exact: true });
        assert.equal(await close.evaluate((el) => el === document.activeElement), true);
        if (activation === "pointer") await close.click();
        else await close.press(activation);
        await page.waitForFunction(() => document.activeElement?.getAttribute("aria-label")?.startsWith("Load "));
        assert.equal(await load.evaluate((el) => el === document.activeElement), true);
        assert.equal(await frame.count(), 0, "Closing removes the player");
        if (activation === "Enter" && profile.slug === "hailey-bieber" && process.env.SCREENSHOT_DIR) {
          await page.screenshot({ path: `${process.env.SCREENSHOT_DIR}/routine-player-${width}.png` });
        }
        await page.keyboard.press("Tab");
        assert.equal(await watch.evaluate((el) => el === document.activeElement), true);
      }
      assert.equal(await page.locator("h1").count(), 1);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
    }
    // A delayed response must not steal focus after the reader moves to Close.
    await page.goto(base + "/routines/hailey-bieber");
    holdNextPlayer = true;
    releasePlayer = undefined;
    await page.getByRole("button", { name: /Load Hailey/ }).press("Enter");
    await page.waitForFunction(() => document.activeElement?.tagName === "IFRAME");
    const close = page.getByRole("button", { name: "Close player", exact: true });
    await close.focus();
    // Playwright's request event precedes the route callback; wait for the held request.
    for (let attempt = 0; !releasePlayer && attempt < 500; attempt += 1) await new Promise((resolve) => setTimeout(resolve, 10));
    assert.equal(typeof releasePlayer, "function", "The delayed player request must reach the local fixture");
    releasePlayer();
    await page.frameLocator("iframe").getByRole("button", { name: "Play fixture" }).waitFor();
    await page.frameLocator("iframe").getByRole("button", { name: "Play fixture" }).evaluate(() => document.readyState === "complete" ? Promise.resolve() : new Promise((resolve) => window.addEventListener("load", resolve, { once: true })));
    await page.evaluate(() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))));
    assert.equal(await close.evaluate((el) => el === document.activeElement), true);
    await close.press("Enter");
    await page.waitForFunction(() => document.activeElement?.getAttribute("aria-label")?.startsWith("Load "));
    console.log(`PASS ${width}px: all three routines, consent, Enter/Space/pointer, player and close focus, keyboard exit, repeated toggles`);
  }
  assert.deepEqual(errors, []);
  assert.deepEqual(analytics, []);
} finally { await browser.close(); }
