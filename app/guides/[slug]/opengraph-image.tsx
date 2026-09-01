import { getGuide, guides, readingTime } from "@/lib/content";
import { OG_SIZE, ogImage } from "@/lib/og";

export const alt = "Skin Considered guide";
export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = getGuide(slug);

  if (!guide) {
    return ogImage({ eyebrow: "No file on record", title: "This guide wandered off without its source.", footer: "Skin Considered" });
  }

  return ogImage({
    eyebrow: `Guide ${guide.number} / ${guide.level}`,
    title: guide.title,
    footer: `${readingTime(guide.sections, guide.description).label} read`,
    accent: guide.level === "Procedures" ? "violet" : guide.level === "Ingredients" ? "cobalt" : "green",
  });
}
