import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EditorialArticle } from "@/components/EditorialArticle";
import { getStory, stories } from "@/lib/content";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return stories.map((story) => ({ slug: story.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const story = getStory(slug);
  if (!story) return {};

  return {
    title: story.headline,
    description: story.dek,
    alternates: { canonical: `/dispatches/${story.slug}` },
    openGraph: {
      type: "article",
      title: story.headline,
      description: story.dek,
      publishedTime: story.date,
      section: story.category,
    },
  };
}

export default async function DispatchPage({ params }: { params: Params }) {
  const { slug } = await params;
  const story = getStory(slug);
  if (!story) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: story.headline,
    description: story.dek,
    datePublished: story.date,
    dateModified: story.date,
    articleSection: story.category,
    author: { "@type": "Organization", name: "Skin Considered editorial desk" },
    publisher: { "@type": "Organization", name: "Skin Considered" },
    citation: story.sources.map((source) => source.url),
  };

  return (
    <>
      <EditorialArticle
        backHref="/today"
        backLabel="The global wire"
        color={story.color}
        dek={story.dek}
        eyebrow={`${story.location} / ${story.category}`}
        grade={story.grade}
        gradeLabel={story.signal}
        limitation={story.limitations}
        meta={["Skin Considered desk", story.dateLabel, story.readTime]}
        sections={story.sections}
        sources={story.sources}
        title={story.headline}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  );
}
