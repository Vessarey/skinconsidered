/**
 * Source link check — run on demand (`npm run audit:links`), not during build.
 *
 * Requests every source URL on file and reports anything that does not answer
 * with a 2xx or 3xx. Some publishers block scripted requests (Cochrane answers
 * 412, CDC and BLS answer 403); those are listed as "blocked" rather than
 * broken so an editor can confirm them by hand. Network access is required.
 */
import { cultureStories } from "../content/culture.ts";
import { guides } from "../content/guides.ts";
import { procedureProfiles } from "../content/procedures.ts";
import { sourceRegistry } from "../content/coverage.ts";
import { ingredients } from "../content/ingredients.ts";
import { priceMenus } from "../content/price-survey.ts";
import { stories } from "../content/stories.ts";
import { trends } from "../content/trends.ts";

const USER_AGENT = "Mozilla/5.0 (compatible; SkinConsideredLinkCheck/1.0)";
const KNOWN_BLOCKERS = [403, 412, 429, 999];
const CONCURRENCY = 6;

const urls = new Map();
const add = (url, owner) => {
  if (!urls.has(url)) urls.set(url, new Set());
  urls.get(url).add(owner);
};

for (const item of stories) item.sources.forEach((source) => add(source.url, `dispatch:${item.slug}`));
for (const item of guides) item.sources.forEach((source) => add(source.url, `guide:${item.slug}`));
for (const item of cultureStories) item.sources.forEach((source) => add(source.url, `culture:${item.slug}`));
for (const item of procedureProfiles) item.sources.forEach((source) => add(source.url, `procedure:${item.slug}`));
for (const item of ingredients) item.sources.forEach((source) => add(source.url, `topical:${item.slug}`));
for (const item of trends) item.sources.forEach((source) => add(source.url, `trend:${item.slug}`));
for (const entry of sourceRegistry) add(entry.url, `registry:${entry.id}`);
for (const menu of priceMenus) add(menu.url, `price-menu:${menu.id}`);

async function check(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 25_000);
  try {
    let response = await fetch(url, { method: "HEAD", redirect: "follow", signal: controller.signal, headers: { "user-agent": USER_AGENT } });
    if (response.status >= 400) {
      // Some servers reject HEAD or answer it differently; confirm with GET before judging.
      response = await fetch(url, { method: "GET", redirect: "follow", signal: controller.signal, headers: { "user-agent": USER_AGENT } });
    }
    return { url, status: response.status };
  } catch (error) {
    return { url, status: 0, error: error instanceof Error ? error.message : String(error) };
  } finally {
    clearTimeout(timer);
  }
}

const queue = [...urls.keys()];
const results = [];
await Promise.all(
  Array.from({ length: CONCURRENCY }, async () => {
    while (queue.length) results.push(await check(queue.shift()));
  }),
);

// 4xx (other than known bot blockers) is link rot and fails the run. 5xx and network
// failures are usually transient; they are reported for a manual retry but do not fail.
const blocked = results.filter((result) => KNOWN_BLOCKERS.includes(result.status));
const broken = results.filter((result) => result.status >= 400 && result.status < 500 && !KNOWN_BLOCKERS.includes(result.status));
const unreachable = results.filter((result) => result.status === 0 || result.status >= 500);

const owners = (url) => [...urls.get(url)].join(", ");
for (const result of blocked) console.log(`blocked ${result.status} ${result.url}  (${owners(result.url)})`);
for (const result of unreachable) console.warn(`unreachable ${result.status} ${result.url}  (${owners(result.url)})${result.error ? ` — ${result.error}` : ""}`);
for (const result of broken) console.error(`BROKEN ${result.status} ${result.url}  (${owners(result.url)})`);

const reachable = results.length - broken.length - blocked.length - unreachable.length;
console.log(
  `\nChecked ${results.length} unique source URLs: ${reachable} reachable, ${blocked.length} blocked scripted access, ${unreachable.length} unreachable right now (retry by hand), ${broken.length} broken.`,
);
if (broken.length) process.exit(1);
