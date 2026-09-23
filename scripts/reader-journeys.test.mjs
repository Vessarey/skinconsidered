import assert from "node:assert/strict";
import { afterEach, beforeEach, test } from "node:test";
import { POST } from "../app/api/subscribe/route.ts";
import { searchArchive } from "../lib/search.ts";
import { analyticsUrl, redactAnalyticsProperties } from "../lib/analytics-privacy.ts";

const originalFetch = globalThis.fetch;
const originalWebhook = process.env.NEWSLETTER_WEBHOOK_URL;
const originalKey = process.env.BUTTONDOWN_API_KEY;
let forwarded;

beforeEach(() => {
  delete process.env.NEWSLETTER_WEBHOOK_URL;
  delete process.env.BUTTONDOWN_API_KEY;
  forwarded = [];
  globalThis.fetch = async (...args) => {
    forwarded.push(args);
    return Response.json({ type: "unactivated" }, { status: 201 });
  };
});

afterEach(() => {
  globalThis.fetch = originalFetch;
  if (originalWebhook === undefined) delete process.env.NEWSLETTER_WEBHOOK_URL;
  else process.env.NEWSLETTER_WEBHOOK_URL = originalWebhook;
  if (originalKey === undefined) delete process.env.BUTTONDOWN_API_KEY;
  else process.env.BUTTONDOWN_API_KEY = originalKey;
});

const request = (payload) => new Request("http://localhost/api/subscribe", {
  method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload),
});

test("invalid JSON and non-object requests return a recoverable validation error", async () => {
  for (const body of ["{", "null", "[]", "42", '"email"']) {
    const response = await POST(new Request("http://localhost/api/subscribe", { method: "POST", body }));
    assert.equal(response.status, 400);
  }
  assert.equal(forwarded.length, 0);
});

test("invalid addresses never reach the provider", async () => {
  for (const email of ["", "bad-address", "a@b", "a".repeat(250) + "@example.test", null]) {
    assert.equal((await POST(request({ email }))).status, 400);
  }
  assert.equal(forwarded.length, 0);
});

test("unconfigured and whitespace-only configuration remains an honest preview", async () => {
  process.env.BUTTONDOWN_API_KEY = "  ";
  process.env.NEWSLETTER_WEBHOOK_URL = " ";
  const response = await POST(request({ email: "reader@example.test" }));
  assert.equal((await response.json()).preview, true);
  assert.equal(forwarded.length, 0);
});

test("the anti-spam field prevents forwarding", async () => {
  process.env.BUTTONDOWN_API_KEY = "local-test-only";
  const response = await POST(request({ email: "reader@example.test", website: "bot" }));
  assert.equal(response.status, 200);
  assert.equal(forwarded.length, 0);
});

test("Buttondown requests retain confirmation and use plan-independent source metadata", async () => {
  process.env.BUTTONDOWN_API_KEY = "local-test-only";
  const response = await POST(request({ email: " READER@EXAMPLE.TEST ", source: "home!page" }));
  assert.equal(response.status, 200);
  const [url, options] = forwarded[0];
  assert.equal(url, "https://api.buttondown.com/v1/subscribers");
  assert.deepEqual(JSON.parse(options.body), { email_address: "reader@example.test", metadata: { signup_source: "homepage" }, type: "unactivated" });
  assert.equal(options.headers["X-Buttondown-Collision-Behavior"], "add");
  assert.ok(options.signal instanceof AbortSignal);
});

test("provider rejection, including HTTP 400, is never reported as success", async () => {
  for (const provider of ["BUTTONDOWN_API_KEY", "NEWSLETTER_WEBHOOK_URL"]) {
    delete process.env.BUTTONDOWN_API_KEY;
    delete process.env.NEWSLETTER_WEBHOOK_URL;
    process.env[provider] = provider === "BUTTONDOWN_API_KEY" ? "local-test-only" : "http://localhost:3999/mock";
    for (const status of [400, 401, 403, 422, 500]) {
      globalThis.fetch = async () => Response.json({ detail: "provider rejection" }, { status });
      const response = await POST(request({ email: "reader@example.test" }));
      assert.equal(response.status, 502, provider + " rejected with " + status);
      assert.match((await response.json()).message, /couldn’t complete/);
    }
  }
});

test("rate limiting and network failure show actionable retry messages", async () => {
  process.env.NEWSLETTER_WEBHOOK_URL = "http://localhost:3999/mock";
  globalThis.fetch = async () => new Response(null, { status: 429 });
  assert.equal((await POST(request({ email: "reader@example.test" }))).status, 429);
  globalThis.fetch = async () => { throw new Error("timeout"); };
  const response = await POST(request({ email: "reader@example.test" }));
  assert.equal(response.status, 502);
  assert.match((await response.json()).message, /try again/);
});

test("a successful generic webhook preserves the subscriber contract", async () => {
  process.env.NEWSLETTER_WEBHOOK_URL = "http://localhost:3999/mock";
  const response = await POST(request({ email: "reader@example.test", source: "article" }));
  assert.equal(response.status, 200);
  assert.deepEqual(JSON.parse(forwarded[0][1].body), { email: "reader@example.test", source: "article" });
});

const archive = [
  { title: "An overview", description: "Retinol and other options.", type: "Guide", terms: "" },
  { title: "Retinol", description: "Ingredient guide.", type: "Ingredient", terms: "" },
  { title: "Tretinoin", description: "Prescription ingredient.", type: "Ingredient", terms: "retinoid" },
  { title: "Moisturizer basics", description: "Skin-barrier guidance.", type: "Guide", terms: "" },
];

test("search ranks direct titles first and handles useful category and spelling variants", () => {
  assert.equal(searchArchive(archive, "retinol")[0].title, "Retinol");
  assert.equal(searchArchive(archive, "retinoids").length, 3);
  assert.equal(searchArchive(archive, "moisturiser")[0].title, "Moisturizer basics");
  assert.equal(searchArchive(archive, "skin barrier").length, 1);
  assert.equal(searchArchive(archive, "zzzz").length, 0);
  assert.equal(searchArchive(archive, "   ").length, archive.length);
});

test("analytics excludes search text in current and nested initial URLs while retaining newsletter attribution", () => {
  const properties = redactAnalyticsProperties({
    token: "public-project-token",
    $current_url: "https://skinconsidered.com/search?q=private-text&utm_source=newsletter&utm_campaign=2026-09-04#details",
    $referrer: "https://example.test/search?q=private-text",
    $set_once: { $initial_current_url: "https://skinconsidered.com/procedures?q=private-text", $initial_search_keyword: "private-text" },
    results: 3,
    zero: false,
  });
  assert.equal(JSON.stringify(properties).includes("private-text"), false);
  assert.equal(properties.$current_url, "https://skinconsidered.com/search?utm_source=newsletter&utm_campaign=2026-09-04");
  assert.equal(properties.$referrer, "https://example.test/search");
  assert.equal(properties.token, "public-project-token");
  assert.equal(properties.results, 3);
  assert.equal(analyticsUrl("/search?q=private-text"), "/search");
});
