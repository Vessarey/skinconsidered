/**
 * Live-site health check — `npm run site:health -- [origin] [--expected-sitemap URL]`.
 * Compare a target with a separately reviewed preview sitemap to detect missing
 * deployment routes. This is opt-in: a local draft is not automatically approved.
 *
 * Crawls the sitemap of a deployed origin (default https://skinconsidered.com)
 * and reports, per URL: status, title, canonical, meta description length,
 * H1 count, JSON-LD presence, image alt gaps, and internal links that 404.
 * Exit code 1 for any health or parity problem. Network access is required; nothing is
 * written. Used by the daily routine and safe to run by hand.
 */
import { canonicalMatches, compareSitemaps, sitemapPaths } from "./health-sitemap.mjs";

const args = process.argv.slice(2);
const origin = (args[0] && !args[0].startsWith("--") ? args.shift() : process.env.SITE_ORIGIN ?? "https://skinconsidered.com").replace(/\/$/, "");
if (new URL(origin).origin !== origin) throw new Error("Target must be an HTTP(S) origin without a path or credentials.");
if (!/^https?:\/\//.test(origin)) throw new Error("Target must use HTTP(S).");
let expectedSitemap;
if (args.length) {
  if (args.length !== 2 || args[0] !== "--expected-sitemap") throw new Error("Usage: site:health [origin] [--expected-sitemap URL]");
  expectedSitemap = new URL(args[1]);
  if (!["http:", "https:"].includes(expectedSitemap.protocol) || expectedSitemap.username || expectedSitemap.password) throw new Error("Expected sitemap must be an HTTP(S) URL without credentials.");
}
const USER_AGENT = "Mozilla/5.0 (compatible; SkinConsideredHealth/1.0)";
const CONCURRENCY = 6;

/** Decode the entities Next emits in metadata before measuring reader-visible length. */
function decodeHtml(text) {
  const named = { amp: "&", quot: '"', apos: "'", lt: "<", gt: ">" };
  return text
    .replace(/&#x([0-9a-f]+);/gi, (_, value) => String.fromCodePoint(Number.parseInt(value, 16)))
    .replace(/&#(\d+);/g, (_, value) => String.fromCodePoint(Number.parseInt(value, 10)))
    .replace(/&([a-z]+);/gi, (entity, name) => named[name.toLowerCase()] ?? entity);
}

async function get(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 25_000);
  try {
    const response = await fetch(url, { redirect: "follow", signal: controller.signal, headers: { "user-agent": USER_AGENT } });
    const text = await response.text();
    return { status: response.status, text, finalUrl: response.url };
  } catch (error) {
    return { status: 0, text: "", finalUrl: url, error: error instanceof Error ? error.message : String(error) };
  } finally {
    clearTimeout(timer);
  }
}

const sitemap = await get(`${origin}/sitemap.xml`);
if (sitemap.status !== 200) {
  console.error(`Sitemap unreachable: ${sitemap.status} ${origin}/sitemap.xml`);
  process.exit(1);
}
const actualPaths = sitemapPaths(sitemap.text, origin);
let missingPaths = [];
if (expectedSitemap) {
  const expected = await get(expectedSitemap.href);
  if (expected.status !== 200) throw new Error(`Expected sitemap unreachable: ${expected.status} ${expectedSitemap.href}`);
  const expectedPaths = sitemapPaths(expected.text, expectedSitemap.origin);
  missingPaths = compareSitemaps(actualPaths, expectedPaths);
  console.log(`Release parity: ${expectedPaths.length} expected routes; ${missingPaths.length} absent from target sitemap.`);
} else console.log("Sitemap-only audit: this does not establish parity with the intended release. Use --expected-sitemap to compare reviewed routes.");
// Never crawl the reference host's pages; probe missing paths on the TARGET.
const urls = [...new Set([...actualPaths, ...missingPaths])].map((path) => `${origin}${path}`);
console.log(`Checking ${actualPaths.length} sitemap URLs and ${missingPaths.length} missing expected routes on ${origin}`);

const pages = [];
const queue = [...urls];
await Promise.all(
  Array.from({ length: CONCURRENCY }, async () => {
    while (queue.length) {
      const url = queue.shift();
      const page = await get(url);
      const html = page.text;
      const title = html.match(/<title>([^<]*)<\/title>/)?.[1] ?? "";
      const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1] ?? "";
      const description = decodeHtml(html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? "");
      const h1s = (html.match(/<h1[\s>]/g) ?? []).length;
      const jsonLd = /application\/ld\+json/.test(html);
      const imgsMissingAlt = (html.match(/<img(?![^>]*\balt=)[^>]*>/g) ?? []).length;
      const links = [...new Set([...html.matchAll(/href="(\/[^"#?]*)"/g)].map((match) => match[1]))].filter((href) => !href.startsWith("/_next"));
      pages.push({ url, status: page.status, title, canonical, description, h1s, jsonLd, imgsMissingAlt, links, error: page.error });
    }
  }),
);

const problems = missingPaths.map((path) => `missing from target sitemap ${path}`);
for (const page of pages) {
  const path = page.url.replace(origin, "") || "/";
  if (page.status !== 200) {
    problems.push(`${page.status} ${path}${page.error ? ` — ${page.error}` : ""}`);
    continue;
  }
  if (!page.title) problems.push(`missing <title> ${path}`);
  if (!page.canonical) problems.push(`missing canonical ${path}`);
  else if (!canonicalMatches(decodeHtml(page.canonical), page.url)) problems.push(`canonical mismatch ${path} → ${page.canonical}`);
  if (!page.description) problems.push(`missing meta description ${path}`);
  else if (page.description.length > 165) problems.push(`long meta description (${page.description.length}) ${path}`);
  if (page.h1s !== 1) problems.push(`${page.h1s} <h1> elements ${path}`);
  if (page.imgsMissingAlt) problems.push(`${page.imgsMissingAlt} <img> without alt ${path}`);
}

// Internal links that point nowhere.
const known = new Set(pages.map((page) => page.url.replace(origin, "") || "/"));
const candidates = [...new Set(pages.flatMap((page) => page.links))].filter((href) => !known.has(href));
const linkQueue = [...candidates];
const brokenLinks = [];
await Promise.all(
  Array.from({ length: CONCURRENCY }, async () => {
    while (linkQueue.length) {
      const href = linkQueue.shift();
      const response = await get(`${origin}${href}`);
      if (response.status !== 200) brokenLinks.push(`${response.status} ${href}`);
    }
  }),
);
for (const broken of brokenLinks) problems.push(`internal link ${broken}`);

const noSchema = pages.filter((page) => !page.jsonLd).map((page) => page.url.replace(origin, "") || "/");

console.log(`\n${pages.length} pages fetched, ${pages.filter((page) => page.status === 200).length} OK, ${candidates.length} non-sitemap internal links checked.`);
if (noSchema.length) console.log(`No JSON-LD on ${noSchema.length} pages: ${noSchema.slice(0, 12).join(", ")}${noSchema.length > 12 ? "…" : ""}`);
if (problems.length) {
  console.error(`\n${problems.length} problems:\n${problems.map((problem) => `- ${problem}`).join("\n")}`);
  process.exit(1);
}
console.log(expectedSitemap ? "Health and expected-route parity passed (not proof of content freshness or search indexing)." : "No problems found among sitemap-listed pages and their internal links; release parity not checked.");
