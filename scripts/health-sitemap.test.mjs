import assert from "node:assert/strict";
import { test } from "node:test";
import { createServer } from "node:http";
import { spawn } from "node:child_process";
import { canonicalMatches, sitemapPaths, compareSitemaps } from "./health-sitemap.mjs";

const xml = (urls) => `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map((url) => `<url><loc>${url}</loc></url>`).join("")}</urlset>`;

test("sitemap parsing decodes queries, deduplicates paths and compares across reviewed origins", () => {
  assert.deepEqual(sitemapPaths(xml(["https://example.test/a?x=1&amp;y=2", "https://example.test/a?x=1&amp;y=2"]), "https://example.test"), ["/a?x=1&y=2"]);
  assert.deepEqual(compareSitemaps(["/"], ["/", "/routines", "/newsletter"]), ["/routines", "/newsletter"]);
});

test("empty, malformed, unsupported and off-origin sitemaps cannot pass", () => {
  for (const input of ["<html>ok</html>", "<urlset></urlset>", "<sitemapindex></sitemapindex>", xml(["https://other.test/a"]), xml(["https://example.test/a#fragment"]), xml(["https://user:pass@example.test/a"])]) assert.throws(() => sitemapPaths(input, "https://example.test"));
});

test("canonical comparison normalizes bare origins without hiding path or host mismatches", () => {
  assert.equal(canonicalMatches("https://example.test", "https://example.test/"), true);
  assert.equal(canonicalMatches("https://www.example.test/a", "https://example.test/a"), false);
  assert.equal(canonicalMatches("https://example.test/a/", "https://example.test/a"), false);
  assert.equal(canonicalMatches("not a URL", "https://example.test/"), false);
});

test("CLI detects missing deployment routes and fails metadata problems without crawling reference pages", async () => {
  const requests = [];
  let target, reference;
  let missing = true;
  let noCanonical = false;
  const page = (url) => `<html><head><title>Test</title><meta name="description" content="A useful test page."/>${noCanonical ? "" : `<link rel="canonical" href="${url}"/>`}</head><body><h1>Test</h1><script type="application/ld+json">{}</script></body></html>`;
  const serve = (handler) => new Promise((resolve) => {
    const server = createServer(handler).listen(0, "127.0.0.1", () => resolve(server));
  });
  const a = await serve((req, res) => {
    requests.push(`target:${req.url}`);
    if (req.url === "/sitemap.xml") return res.end(xml([target + "/", ...(missing ? [] : [target + "/routines"])]));
    if (req.url === "/routines" && missing) { res.statusCode = 404; return res.end("Missing"); }
    res.end(page(target + req.url));
  });
  target = `http://127.0.0.1:${a.address().port}`;
  const b = await serve((req, res) => { requests.push(`reference:${req.url}`); res.end(xml([reference + "/", reference + "/routines"])); });
  reference = `http://127.0.0.1:${b.address().port}`;
  const run = (compare = true) => new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [new URL("./site-health.mjs", import.meta.url).pathname, target, ...(compare ? ["--expected-sitemap", reference + "/sitemap.xml"] : [])]);
    let output = "";
    child.stdout.on("data", (data) => { output += data; });
    child.stderr.on("data", (data) => { output += data; });
    child.on("error", reject);
    child.on("close", (code) => resolve({ code, output }));
  });
  try {
    const listedOnly = await run(false);
    assert.equal(listedOnly.code, 0);
    assert.match(listedOnly.output, /release parity not checked/);
    const absent = await run();
    assert.equal(absent.code, 1);
    assert.match(absent.output, /missing from target sitemap \/routines/);
    assert.match(absent.output, /404 \/routines/);
    assert.ok(requests.includes("target:/routines"));
    assert.ok(!requests.includes("reference:/routines"));
    missing = false;
    const pass = await run();
    assert.equal(pass.code, 0, pass.output);
    noCanonical = true;
    const invalid = await run();
    assert.equal(invalid.code, 1);
    assert.match(invalid.output, /missing canonical/);
  } finally {
    a.closeAllConnections(); b.closeAllConnections();
    await Promise.all([new Promise((resolve) => a.close(resolve)), new Promise((resolve) => b.close(resolve))]);
  }
});
