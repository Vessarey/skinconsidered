import { stories } from "@/lib/content";

function escapeXml(value: string) {
  return value.replace(/[<>&'\"]/g, (character) => ({
    "<": "&lt;",
    ">": "&gt;",
    "&": "&amp;",
    "'": "&apos;",
    "\"": "&quot;",
  })[character] ?? character);
}

export function GET() {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const items = stories.map((story) => `
    <item>
      <title>${escapeXml(story.headline)}</title>
      <link>${base}/dispatches/${story.slug}</link>
      <guid>${base}/dispatches/${story.slug}</guid>
      <pubDate>${new Date(`${story.date}T12:00:00Z`).toUTCString()}</pubDate>
      <description>${escapeXml(story.dek)}</description>
      <category>${escapeXml(story.category)}</category>
    </item>`).join("");

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
      <title>Skin Considered</title>
      <link>${base}</link>
      <description>Global skincare news, weighed before publication.</description>
      <language>en-us</language>
      <lastBuildDate>${new Date("2026-09-01T12:00:00Z").toUTCString()}</lastBuildDate>
      ${items}
    </channel>
  </rss>`;

  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
