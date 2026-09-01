import type { Metadata } from "next";
import Link from "next/link";
import { NewsletterPanel } from "@/components/NewsletterPanel";
import { cultureStories, readingTime } from "@/lib/content";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "The practice archive",
  description: "The history and cultural context of beauty and skincare practices around the world, without flattening tradition into a trend.",
  alternates: canonical("/culture"),
};

export default function CulturePage() {
  return (
    <main id="main-content">
      <header className="page-hero culture-hero">
        <div>
          <span>The practice archive / culture before content</span>
          <h1>
            Beauty methods carry memory, labor, climate, and power.<sup>*</sup>
          </h1>
        </div>
        <p>
          We trace practices through museum objects, scholarship, architecture, and living context—then separate historical use from modern efficacy
          claims.
        </p>
      </header>

      <section className="culture-manifesto" aria-label="Archive commitments">
        <p>We will not call a culture a “hack.”</p>
        <p>We will not turn historical materials into unsafe DIY instructions.</p>
        <p>We will name variation, uncertainty, and the people or institutions carrying the record.</p>
      </section>

      <section className="culture-index" aria-label="Cultural history stories">
        {cultureStories.map((story, index) => (
          <article className={`culture-index-card culture-${story.color}`} key={story.slug}>
            <div className="culture-index-art" aria-hidden="true">
              <span>{String(index + 1).padStart(2, "0")}</span>
            </div>
            <div className="culture-index-copy">
              <span>{story.place}</span>
              <small>
                {story.era} · {readingTime(story.sections, story.description).label} read
              </small>
              <h2>
                <Link href={`/culture/${story.slug}`}>{story.title}</Link>
              </h2>
              <p>{story.description}</p>
              <div>
                <b>Archive caution</b>
                <span>{story.note}</span>
              </div>
              <Link href={`/culture/${story.slug}`}>Open the record ↗</Link>
            </div>
          </article>
        ))}
      </section>
      <NewsletterPanel source="culture" />
    </main>
  );
}
