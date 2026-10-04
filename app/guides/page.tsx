import type { Metadata } from "next";
import Link from "next/link";
import { Artwork } from "@/components/Artwork";
import { NewsletterPanel } from "@/components/NewsletterPanel";
import { guides, readingTime } from "@/lib/content";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Skincare guides",
  description: "Evidence-aware skincare guides for routines, ingredients, procedures, and better questions.",
  alternates: canonical("/guides"),
};

export default function GuidesPage() {
  const total = String(guides.length).padStart(2, "0");

  return (
    <main id="main-content">
      <header className="page-hero guide-hero">
        <div>
          <span>Learn the field / {total} files</span>
          <h1>
            Skincare, made easier to understand.
          </h1>
        <p>Start a routine, understand your skin barrier, or prepare for a consultation. Clear guides with practical next steps and the evidence behind them.</p>
        </div>
        <Artwork name="desk-guides" priority />
      </header>
      <section className="guides-index" aria-label="All guides">
        {guides.map((guide) => (
          <article key={guide.slug}>
            <div className="guide-index-copy">
              <span>{guide.level}</span>
              <h2>
                <Link href={`/guides/${guide.slug}`}>{guide.title}</Link>
              </h2>
              <p>{guide.description}</p>
              <ul>
                {guide.takeaways.slice(0, 2).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="guide-index-meta">
              <span>{readingTime(guide.sections, guide.description).label} read</span>
              <Link href={`/guides/${guide.slug}`}>Open guide ↗</Link>
            </div>
          </article>
        ))}
      </section>
      <NewsletterPanel source="guides" />
    </main>
  );
}
