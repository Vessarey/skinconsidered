/**
 * Push one issue of The Daily Considered to Buttondown.
 *
 *   npm run newsletter -- 2026-09-04            # create a DRAFT in Buttondown (default)
 *   npm run newsletter -- 2026-09-04 --send     # create and send to all subscribers
 *   npm run newsletter -- 2026-09-04 --out x.html   # write the HTML locally instead
 *
 * Reads the rendered email from the site (SITE_URL, default https://skinconsidered.com),
 * so what gets sent is exactly what the deployed route produces. Needs
 * BUTTONDOWN_API_KEY in the environment unless --out is used. Never sends
 * without --send; the default is a draft you can read in the Buttondown UI.
 */
import { writeFile } from "node:fs/promises";

const args = process.argv.slice(2);
const date = args.find((arg) => /^\d{4}-\d{2}-\d{2}$/.test(arg));
const send = args.includes("--send");
const outIndex = args.indexOf("--out");
const out = outIndex >= 0 ? args[outIndex + 1] : null;
const site = (process.env.SITE_URL ?? "https://skinconsidered.com").replace(/\/$/, "");

if (!date) {
  console.error("Usage: npm run newsletter -- YYYY-MM-DD [--send] [--out file.html]");
  process.exit(1);
}

const htmlResponse = await fetch(`${site}/newsletter/${date}/email`);
if (!htmlResponse.ok) {
  console.error(`No issue at ${site}/newsletter/${date}/email (HTTP ${htmlResponse.status}). Is it in content/newsletter.ts and deployed?`);
  process.exit(1);
}
const html = await htmlResponse.text();
const subject = /<title>([^<]*)<\/title>/.exec(html)?.[1]?.replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, "&") ?? `The Daily Considered — ${date}`;

if (out) {
  await writeFile(out, html);
  console.log(`Wrote ${out} (${html.length} bytes). Subject: ${subject}`);
  process.exit(0);
}

const key = process.env.BUTTONDOWN_API_KEY;
if (!key) {
  console.error("BUTTONDOWN_API_KEY is not set. Use --out to export the HTML instead.");
  process.exit(1);
}

const response = await fetch("https://api.buttondown.com/v1/emails", {
  method: "POST",
  headers: { "Content-Type": "application/json", Authorization: `Token ${key}` },
  body: JSON.stringify({
    subject,
    body: html,
    status: send ? "about_to_send" : "draft",
    email_type: "public",
    canonical_url: `${site}/newsletter/${date}`,
    slug: date,
  }),
});

const result = await response.json().catch(() => ({}));
if (!response.ok) {
  console.error(`Buttondown rejected the email (HTTP ${response.status}):`, JSON.stringify(result, null, 2));
  process.exit(1);
}

console.log(`${send ? "Sending" : "Draft created"}: "${subject}" (id ${result.id ?? "?"}). ${send ? "" : "Open Buttondown to review and send."}`);
