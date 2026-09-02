import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EditorialArticle } from "@/components/EditorialArticle";
import { cultureStories, EDITION, getCultureStory, lastUpdated, readingTime, resolveRelated, siteUrl } from "@/lib/content";
import { breadcrumbs, canonical, metaDescription } from "@/lib/seo";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return cultureStories.map((story) => ({ slug: story.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const story = getCultureStory(slug);
  if (!story) return {};
  return {
    title: story.title,
    description: metaDescription(story.description),
    alternates: canonical(`/culture/${story.slug}`),
    openGraph: { type: "article", title: story.title, description: story.description, modifiedTime: lastUpdated(story), section: "Practice archive" },
  };
}

export default async function CultureStoryPage({ params }: { params: Params }) {
  const { slug } = await params;
  const story = getCultureStory(slug);
  if (!story) notFound();

  const base = siteUrl();
  const reading = readingTime(story.sections, story.description);

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: story.title,
      description: story.description,
      dateModified: lastUpdated(story),
      articleSection: "Practice archive",
      about: story.place,
      mainEntityOfPage: `${base}/culture/${story.slug}`,
      image: [`${base}/culture/${story.slug}/opengraph-image`],
      author: { "@type": "Organization", name: "Skin Considered archive" },
      publisher: { "@type": "Organization", name: "Skin Considered", url: base, logo: { "@type": "ImageObject", url: `${base}/apple-icon` } },
      citation: story.sources.map((source) => source.url),
      isAccessibleForFree: true,
    },
    breadcrumbs(base, [
      { name: "Skin Considered", path: "/" },
      { name: "The practice archive", path: "/culture" },
      { name: story.title, path: `/culture/${story.slug}` },
    ]),
  ];

  return (
    <>
      <EditorialArticle
        backHref="/culture"
        backLabel="The practice archive"
        color={story.color}
        dek={story.description}
        eyebrow={`${story.place} / ${story.era}`}
        gradeLabel="Cultural history file"
        meta={["Skin Considered archive", `${reading.label} read`, `Reviewed ${EDITION.label}`]}
        note={story.note}
        quickRead={[
          { label: "The short version", text: story.description },
          { label: "Read with context", text: story.sections[0].paragraphs[1] },
          { label: "Do not copy blindly", text: story.note },
        ]}
        related={resolveRelated(story.related)}
        sections={story.sections}
        sources={story.sources}
        title={story.title}
        updates={story.updates}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  );
}
