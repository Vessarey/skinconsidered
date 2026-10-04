import type { Metadata } from "next";
import Link from "next/link";
import { Artwork } from "@/components/Artwork";
import { NewsletterPanel } from "@/components/NewsletterPanel";
import { cultureStories, readingTime } from "@/lib/content";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Beauty rituals: culture & history",
  description: "The history and cultural context of beauty and skincare practices around the world, without flattening tradition into a trend.",
  alternates: canonical("/culture"),
};

export default function CulturePage() {
  return (
    <main id="main-content">
      <header className="page-hero culture-hero">
        <div>
          <span>Culture &amp; history</span>
          <h1>
            The stories behind the ritual.
          </h1>
        <p>
          We trace practices through museum objects, scholarship, architecture, and living context—then separate historical use from modern efficacy
          claims.
        </p>
        </div>
        <Artwork name="desk-culture" priority />
      </header>

      <section className="culture-index" aria-label="Cultural history stories">
        {cultureStories.map((story) => (
          <article className={`culture-index-card culture-${story.color}`} key={story.slug}>
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
