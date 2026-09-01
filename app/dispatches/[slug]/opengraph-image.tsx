import { getStory, gradeCode, stories } from "@/lib/content";
import { OG_SIZE, ogImage } from "@/lib/og";

export const alt = "Skin Considered dispatch";
export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return stories.map((story) => ({ slug: story.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const story = getStory(slug);

  if (!story) {
    return ogImage({ eyebrow: "No file on record", title: "This claim wandered off without its source.", footer: "Skin Considered" });
  }

  return ogImage({
    eyebrow: `${story.location} / ${story.category} · Grade ${gradeCode(story.grade)}`,
    title: story.headline,
    footer: story.dateLabel,
    accent: story.color,
  });
}
