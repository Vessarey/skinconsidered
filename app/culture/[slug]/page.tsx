import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EditorialArticle } from "@/components/EditorialArticle";
import { cultureStories, getCultureStory } from "@/lib/content";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return cultureStories.map((story) => ({ slug: story.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const story = getCultureStory(slug);
  if (!story) return {};
  return { title: story.title, description: story.description, alternates: { canonical: `/culture/${story.slug}` } };
}

export default async function CultureStoryPage({ params }: { params: Params }) {
  const { slug } = await params;
  const story = getCultureStory(slug);
  if (!story) notFound();

  return (
    <EditorialArticle
      backHref="/culture"
      backLabel="The practice archive"
      color={story.color}
      dek={story.description}
      eyebrow={`${story.place} / ${story.era}`}
      gradeLabel="Cultural history file"
      meta={["Skin Considered archive", story.readTime, "Reviewed Sep 1, 2026"]}
      note={story.note}
      sections={story.sections}
      sources={story.sources}
      title={story.title}
    />
  );
}
