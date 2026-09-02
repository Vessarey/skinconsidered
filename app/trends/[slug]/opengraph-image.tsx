import { getTrend, gradeCode, trends } from "@/lib/content";
import { OG_SIZE, ogImage } from "@/lib/og";

export const alt = "Skin Considered trend file";
export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return trends.map((trend) => ({ slug: trend.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const trend = getTrend(slug);

  if (!trend) {
    return ogImage({ eyebrow: "No file on record", title: "This trend has no file yet.", footer: "Skin Considered" });
  }

  return ogImage({
    eyebrow: `Trend / ${trend.category} · Grade ${gradeCode(trend.grade)}`,
    title: `${trend.name}: ${trend.verdict.toLowerCase()}`,
    footer: "What the feed says. What the evidence says.",
    accent: trend.verdict === "Avoid" ? "raspberry" : trend.verdict === "Needs care" ? "violet" : "green",
  });
}
