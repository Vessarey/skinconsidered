import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EditorialArticle } from "@/components/EditorialArticle";
import { EDITION, getGuide, guides, lastUpdated, readingTime, resolveRelated, siteUrl } from "@/lib/content";
import { breadcrumbs, canonical, metaDescription } from "@/lib/seo";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};
  return {
    title: guide.title,
    description: metaDescription(guide.description),
    alternates: canonical(`/guides/${guide.slug}`),
    openGraph: { type: "article", title: guide.title, description: guide.description, modifiedTime: lastUpdated(guide), section: guide.level },
  };
}

export default async function GuidePage({ params }: { params: Params }) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const base = siteUrl();
  const reading = readingTime(guide.sections, guide.description);

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: guide.title,
      description: guide.description,
      dateModified: lastUpdated(guide),
      articleSection: guide.level,
      mainEntityOfPage: `${base}/guides/${guide.slug}`,
      image: [`${base}/guides/${guide.slug}/opengraph-image`],
      author: { "@type": "Organization", name: "Skin Considered education desk" },
      publisher: { "@type": "Organization", name: "Skin Considered", url: base, logo: { "@type": "ImageObject", url: `${base}/apple-icon` } },
      citation: guide.sources.map((source) => source.url),
      isAccessibleForFree: true,
    },
    breadcrumbs(base, [
      { name: "Skin Considered", path: "/" },
      { name: "Guides", path: "/guides" },
      { name: guide.title, path: `/guides/${guide.slug}` },
    ]),
  ];

  return (
    <>
      <EditorialArticle
        backHref="/guides"
        backLabel="All guides"
        color={guide.level === "Procedures" ? "violet" : guide.level === "Ingredients" ? "cobalt" : "green"}
        dek={guide.description}
        eyebrow={`${guide.level} / Guide ${guide.number}`}
        gradeLabel="Practical guide"
        meta={["Skin Considered education desk", `${reading.label} read`, `Reviewed ${EDITION.label}`]}
        quickRead={[
          { label: "Start here", text: guide.takeaways[0] },
          { label: "Then do this", text: guide.takeaways[1] },
          { label: "Know the boundary", text: guide.takeaways[2] },
        ]}
        related={resolveRelated(guide.related)}
        sections={guide.sections}
        sources={guide.sources}
        takeaways={guide.takeaways}
        title={guide.title}
        updates={guide.updates}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  );
}
