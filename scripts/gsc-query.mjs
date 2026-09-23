/**
 * Google Search Console reader — `npm run gsc -- <command> [days]`.
 *
 * Zero dependencies: signs a service-account JWT with node:crypto, exchanges
 * it for an access token, and queries the Search Analytics API for the
 * property sc-domain:skinconsidered.com.
 *
 * Credential (never committed): either the file docs-internal/gsc-service-account.json
 * or the env var GSC_SERVICE_ACCOUNT_JSON_B64 (base64 of that JSON), which is
 * how the cloud routine and Vercel hold it.
 *
 * Commands:
 *   sites               verify the service account can see the property
 *   queries [days=28]   top queries with clicks, impressions, CTR, position
 *   pages [days=28]     top pages
 *   flywheel [days=28]  queries ranking 8–20: the highest-leverage content targets
 *   dates [days=28]     daily clicks, impressions, CTR, position trend
 *   entry [days=28]     top pages by impressions with CTR, to spot title/description work
 *   totals [days=28]    source-provided property totals (not a sum of page rows)
 *   devices [days=28]   device mix
 *   inspect <url>       URL Inspection API result for one page (index status, canonical)
 * Report options: --end YYYY-MM-DD, --page <exact URL or path>, --json.
 * Dates are inclusive Pacific calendar dates; finalized web-search data only.
 *
 * Search Console data lags about two days and is empty for the first weeks of
 * a new property. Report "no rows yet" honestly; never invent a baseline.
 */
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { collectRows, reportWindow } from "./gsc-reporting.mjs";

const ROOT = path.join(import.meta.dirname, "..");
const PROPERTY = process.env.GSC_PROPERTY ?? "sc-domain:skinconsidered.com";
const SITE_ORIGIN = "https://skinconsidered.com";

function loadCredentials() {
  if (process.env.GSC_SERVICE_ACCOUNT_JSON_B64) {
    return JSON.parse(Buffer.from(process.env.GSC_SERVICE_ACCOUNT_JSON_B64, "base64").toString("utf8"));
  }
  const file = path.join(ROOT, "docs-internal", "gsc-service-account.json");
  if (fs.existsSync(file)) return JSON.parse(fs.readFileSync(file, "utf8"));
  console.error("No Search Console credential: set GSC_SERVICE_ACCOUNT_JSON_B64 or add docs-internal/gsc-service-account.json.");
  process.exit(2);
}

const CREDS = loadCredentials();
const b64url = (input) => Buffer.from(input).toString("base64url");

async function getAccessToken(scope) {
  const now = Math.floor(Date.now() / 1000);
  const header = b64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claims = b64url(JSON.stringify({ iss: CREDS.client_email, scope, aud: "https://oauth2.googleapis.com/token", iat: now, exp: now + 3600 }));
  const signature = crypto.sign("RSA-SHA256", Buffer.from(`${header}.${claims}`), CREDS.private_key).toString("base64url");
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion: `${header}.${claims}.${signature}` }),
  });
  const data = await res.json();
  if (!data.access_token) throw new Error(`token exchange failed: ${JSON.stringify(data)}`);
  return data.access_token;
}

async function api(token, url, body) {
  const res = await fetch(url, {
    method: body ? "POST" : "GET",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(`Search Console API ${res.status}: ${JSON.stringify(data)}`);
  return data;
}

const pct = (value) => `${(value * 100).toFixed(1)}%`;

function printRows(rows, label) {
  if (!rows?.length) {
    console.log(`No ${label} rows yet for ${PROPERTY} in this window. Search Console lags about two days and a new property starts empty.`);
    return;
  }
  console.log(`${label.padEnd(60)} clicks  impr   ctr    pos`);
  for (const row of rows) {
    console.log(`${String((row.keys ?? ["Property total"]).join(" | ")).padEnd(60)} ${String(row.clicks).padStart(6)} ${String(row.impressions).padStart(6)} ${pct(row.ctr).padStart(6)} ${row.position.toFixed(1).padStart(6)}`);
  }
}

const args = process.argv.slice(2);
const [cmd = "sites", arg] = args;
const option = (name) => {
  const index = args.indexOf(name);
  if (index === -1) return undefined;
  if (!args[index + 1] || args[index + 1].startsWith("--")) throw new Error(`${name} requires a value`);
  return args[index + 1];
};
const days = !arg || arg.startsWith("--") ? 28 : Number(arg);
if (!["sites", "inspect", "queries", "pages", "entry", "dates", "flywheel", "totals", "devices"].includes(cmd)) throw new Error("Unknown report. Use sites, inspect, queries, pages, entry, dates, flywheel, totals or devices.");

if (cmd === "sites") {
  const token = await getAccessToken("https://www.googleapis.com/auth/webmasters.readonly");
  const data = await api(token, "https://www.googleapis.com/webmasters/v3/sites");
  const entries = data.siteEntry ?? [];
  console.log(JSON.stringify(entries, null, 2));
  const mine = entries.find((entry) => entry.siteUrl === PROPERTY);
  console.log(mine ? `\nAccess to ${PROPERTY}: ${mine.permissionLevel}` : `\nThe service account is not yet a user on ${PROPERTY}. Add ${CREDS.client_email} under Settings → Users and permissions.`);
} else if (cmd === "inspect") {
  if (!arg) {
    console.error("Usage: npm run gsc -- inspect <url>");
    process.exit(2);
  }
  const token = await getAccessToken("https://www.googleapis.com/auth/webmasters");
  const url = arg.startsWith("http") ? arg : `${SITE_ORIGIN}${arg}`;
  const data = await api(token, "https://searchconsole.googleapis.com/v1/urlInspection/index:inspect", { inspectionUrl: url, siteUrl: PROPERTY });
  const result = data.inspectionResult?.indexStatusResult ?? {};
  console.log(JSON.stringify({ url, verdict: result.verdict, coverageState: result.coverageState, indexingState: result.indexingState, lastCrawlTime: result.lastCrawlTime, googleCanonical: result.googleCanonical, userCanonical: result.userCanonical, robotsTxtState: result.robotsTxtState }, null, 2));
} else {
  const token = await getAccessToken("https://www.googleapis.com/auth/webmasters.readonly");
  const dimension = cmd === "dates" ? "date" : cmd === "devices" ? "device" : cmd === "pages" || cmd === "entry" ? "page" : "query";
  const body = { ...reportWindow(days, option("--end")), dimensions: cmd === "totals" ? [] : [dimension], type: "web", dataState: "final" };
  if (cmd === "flywheel") body.dimensions = ["query", "page"];
  const page = option("--page");
  if (page) body.dimensionFilterGroups = [{ groupType: "and", filters: [{ dimension: "page", operator: "equals", expression: page.startsWith("/") ? SITE_ORIGIN + page : page }] }];
  const data = await collectRows((request) => api(token, `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(PROPERTY)}/searchAnalytics/query`, request), body);
  let rows = data.rows ?? [];
  if (cmd === "flywheel") rows = rows.filter((row) => row.position >= 8 && row.position <= 20 && row.impressions >= 5).sort((a, b) => b.impressions - a.impressions);
  if (cmd === "entry") rows = rows.sort((a, b) => b.impressions - a.impressions);
  if (cmd === "dates") rows = rows.sort((a, b) => a.keys[0].localeCompare(b.keys[0]));
  const report = { property: PROPERTY, fetchedAt: new Date().toISOString(), timezone: "America/Los_Angeles", request: body, responseAggregationType: data.responseAggregationType, returnedRows: data.rows.length, caveat: "Final web-search data only; unavailable days are not zeros. Query rows may omit anonymized queries and the API may internally limit results. Page and property aggregation differ.", rows };
  if (args.includes("--json")) console.log(JSON.stringify(report, null, 2));
  else {
    console.log(`${PROPERTY} | ${body.startDate} through ${body.endDate} inclusive (${days} days, Pacific time) | finalized web search | ${data.responseAggregationType ?? "auto"} | ${data.rows.length} API rows`);
    printRows(rows, cmd);
    console.log(report.caveat);
  }
}
