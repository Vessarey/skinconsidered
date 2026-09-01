import { EDITION, lastUpdated, siteUrl, storiesByDate } from "@/lib/content";

// The feed is built from static content; render it once at build time.
export const dynamic = "force-static";

function escapeXml(value: string) {
  return value.replace(
    /[<>&'"]/g,
    (character) =>
      ({
        "<": "&lt;",
        ">": "&gt;",
        "&": "&amp;",
        "'": "&apos;",
        '"': "&quot;",
      })[character] ?? character,
  );
}

function rfc822(iso: string) {
  return new Date(`${iso}T12:00:00Z`).toUTCString();
}

export function GET() {
  const base = siteUrl();
  const newest = storiesByDate[0] ? lastUpdated(storiesByDate[0]) : EDITION.date;

  const items = storiesByDate
    .map(
      (story) => `
    <item>
      <title>${escapeXml(story.headline)}</title>
      <link>${base}/dispatches/${story.slug}</link>
      <guid isPermaLink="true">${base}/dispatches/${story.slug}</guid>
      <pubDate>${rfc822(story.date)}</pubDate>
      <description>${escapeXml(`${story.dek} Evidence: ${story.signal}. The limit: ${story.limitations}`)}</description>
      <category>${escapeXml(story.category)}</category>
      <category>${escapeXml(story.region)}</category>
    </item>`,
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Skin Considered</title>
    <link>${base}</link>
    <atom:link href="${base}/rss.xml" rel="self" type="application/rss+xml" />
    <description>Global skincare news, weighed before publication.</description>
    <language>en-us</language>
    <lastBuildDate>${rfc822(newest)}</lastBuildDate>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
