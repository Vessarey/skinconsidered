import type { Metadata } from "next";
import Link from "next/link";
import { NewsletterPanel } from "@/components/NewsletterPanel";
import { guides } from "@/lib/content";

export const metadata: Metadata = {
  title: "Skincare guides",
  description: "Evidence-aware skincare guides for routines, ingredients, procedures, and better questions.",
};

export default function GuidesPage() {
  return (
    <main id="main-content">
      <header className="page-hero guide-hero">
        <div>
          <span>Learn the field / 04 files</span>
          <h1>Understand the system before you optimize it.<sup>*</sup></h1>
        </div>
        <p>Fewer product lists. Better mental models. Every guide separates practical defaults from moments that need individual medical care.</p>
      </header>
      <section className="guides-index" aria-label="All guides">
        {guides.map((guide, index) => (
          <article key={guide.slug}>
            <div className="guide-index-number">{guide.number}</div>
            <div className="guide-index-copy">
              <span>{guide.level}</span>
              <h2><Link href={`/guides/${guide.slug}`}>{guide.title}</Link></h2>
              <p>{guide.description}</p>
              <ul>
                {guide.takeaways.slice(0, 2).map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
            <div className="guide-index-meta">
              <span>{guide.readTime}</span>
              <span>File {String(index + 1).padStart(2, "0")} / {String(guides.length).padStart(2, "0")}</span>
              <Link href={`/guides/${guide.slug}`}>Open guide ↗</Link>
            </div>
          </article>
        ))}
      </section>
      <NewsletterPanel />
    </main>
  );
}
