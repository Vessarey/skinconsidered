import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EditorialArticle } from "@/components/EditorialArticle";
import { deskLabel, getStory, lastUpdated, readingTime, resolveRelated, siteUrl, stories } from "@/lib/content";
import { breadcrumbs, canonical, metaDescription } from "@/lib/seo";

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
    description: metaDescription(story.dek),
    alternates: canonical(`/dispatches/${story.slug}`),
    openGraph: {
      type: "article",
      title: story.headline,
      description: story.dek,
      publishedTime: story.date,
      modifiedTime: lastUpdated(story),
      section: story.category,
      tags: [story.region, story.location, deskLabel(story.kind), story.category],
    },
  };
}

export default async function DispatchPage({ params }: { params: Params }) {
  const { slug } = await params;
  const story = getStory(slug);
  if (!story) notFound();

  const base = siteUrl();
  const reading = readingTime(story.sections, story.dek);
  const modified = lastUpdated(story);

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      headline: story.headline,
      description: story.dek,
      datePublished: story.date,
      dateModified: modified,
      articleSection: story.category,
      mainEntityOfPage: `${base}/dispatches/${story.slug}`,
      author: { "@type": "Organization", name: "Skin Considered editorial desk" },
      publisher: { "@type": "Organization", name: "Skin Considered", url: base },
      citation: story.sources.map((source) => source.url),
      isAccessibleForFree: true,
    },
    breadcrumbs(base, [
      { name: "Skin Considered", path: "/" },
      { name: "Today", path: "/today" },
      { name: story.headline, path: `/dispatches/${story.slug}` },
    ]),
  ];

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
        ledger={{ signal: story.signal, whyItMatters: story.whyItMatters, limitations: story.limitations }}
        limitation={story.limitations}
        meta={[
          "Skin Considered desk",
          story.dateLabel,
          ...(story.updates?.length ? [`Updated ${story.updates[story.updates.length - 1].dateLabel}`] : []),
          `${reading.label} read`,
        ]}
        quickRead={[
          { label: "Bottom line", text: story.dek },
          { label: "Why it matters", text: story.whyItMatters },
          { label: "What we don't know", text: story.limitations },
        ]}
        related={resolveRelated(story.related)}
        sections={story.sections}
        sources={story.sources}
        title={story.headline}
        updates={story.updates}
        showVisual={false}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  );
}
