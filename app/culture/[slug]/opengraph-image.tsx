import { cultureStories, getCultureStory } from "@/lib/content";
import { OG_SIZE, ogImage } from "@/lib/og";

export const alt = "Skin Considered practice archive";
export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return cultureStories.map((story) => ({ slug: story.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const story = getCultureStory(slug);

  if (!story) {
    return ogImage({ eyebrow: "No file on record", title: "This record wandered off without its source.", footer: "Skin Considered" });
  }

  return ogImage({
    eyebrow: `Practice archive / ${story.place}`,
    title: story.title,
    footer: story.era,
    accent: story.color,
  });
}
