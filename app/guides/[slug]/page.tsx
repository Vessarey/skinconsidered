import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EditorialArticle } from "@/components/EditorialArticle";
import { getGuide, guides } from "@/lib/content";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};
  return { title: guide.title, description: guide.description, alternates: { canonical: `/guides/${guide.slug}` } };
}

export default async function GuidePage({ params }: { params: Params }) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  return (
    <EditorialArticle
      backHref="/guides"
      backLabel="All guides"
      color={guide.level === "Procedures" ? "violet" : guide.level === "Ingredients" ? "cobalt" : "green"}
      dek={guide.description}
      eyebrow={`${guide.level} / Guide ${guide.number}`}
      gradeLabel="Practical guide"
      meta={["Skin Considered education desk", guide.readTime, "Reviewed Sep 1, 2026"]}
      sections={guide.sections}
      sources={guide.sources}
      takeaways={guide.takeaways}
      title={guide.title}
    />
  );
}
