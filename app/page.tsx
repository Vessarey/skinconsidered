import type { Metadata } from "next";
import Link from "next/link";
import { Artwork } from "@/components/Artwork";
import { EvidenceBadge } from "@/components/EvidenceBadge";
import { NewsletterPanel } from "@/components/NewsletterPanel";
import { RoutineFeature } from "@/components/RoutineCards";
import { deskLabel, lastUpdated, readingTime, storiesByDate } from "@/lib/content";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: "Skincare news & ingredient evidence — Skin Considered" },
  description: "Understand the skincare news that matters. Read global safety updates, ingredient evidence, and clear guides to procedure costs, risks, and recovery.",
  alternates: canonical("/"),
};

const explore = [
  { title: "Build a better routine", copy: "Start with the essentials, from sunscreen to your skin barrier.", href: "/guides", art: "explore-learn", label: "Practical guides" },
  { title: "Understand an ingredient", copy: "What it does, the evidence behind it, and where to be careful.", href: "/ingredients", art: "explore-decode", label: "Ingredient library" },
  { title: "Look beyond the hype", copy: "A closer look at the claims behind skincare trends.", href: "/trends", art: "explore-weigh", label: "Trend reviews" },
  { title: "Meet the history", copy: "The people, places, and traditions behind beauty practices.", href: "/culture", art: "explore-lookback", label: "Culture & history" },
] as const;

export default function Home() {
  const latest = storiesByDate.slice(0, 3);

  return (
    <main id="main-content" className="reader-home">
      <section className="reader-intro" aria-labelledby="home-title">
        <div>
          <p className="eyebrow">Independent skincare journalism</p>
          <h1 id="home-title">A little clarity.<br /><em>Better skin decisions.</em></h1>
          <p className="reader-intro-dek">What changed, what the evidence says, and what matters to you. Skincare news and practical guidance, with the sources in view.</p>
          <div className="home-now-actions reader-actions">
            <Link className="primary-action" href="/today">Explore the latest <span aria-hidden="true">→</span></Link>
            <Link href="/newsletter">Read the newsletter</Link>
          </div>
        </div>
        <Artwork name="home-hero" priority />
      </section>

      <nav className="topic-shortcuts" aria-label="Explore by topic">
        <span>On your mind</span>
        <Link href="/search?q=sunscreen">Sunscreen</Link>
        <Link href="/search?q=retinoids">Retinoids</Link>
        <Link href="/search?q=skin%20barrier">Skin barrier</Link>
        <Link href="/procedures">Procedures</Link>
        <Link href="/search">Find something else <span aria-hidden="true">↗</span></Link>
      </nav>

      <RoutineFeature />

      <section className="reader-latest" aria-labelledby="latest-title">
        <div className="reader-section-heading">
          <h2 id="latest-title">Worth your attention.</h2>
          <Link href="/today">All updates <span aria-hidden="true">→</span></Link>
        </div>
        <div className="reader-stories">
          {latest.map((story, index) => (
            <article className={index === 0 ? "reader-story reader-story-lead" : "reader-story"} key={story.slug}>
              <div className="reader-story-meta">
                <span>{deskLabel(story.kind)} · {story.location}</span>
                <time dateTime={lastUpdated(story)}>{story.updates?.at(-1)?.dateLabel ?? story.dateLabel}</time>
              </div>
              <h3><Link href={"/dispatches/" + story.slug}>{story.shortHeadline}</Link></h3>
              <p>{story.dek}</p>
              <div className="reader-story-footer">
                <Link href={"/dispatches/" + story.slug}>{readingTime(story.sections, story.dek).label} read <span aria-hidden="true">→</span></Link>
                <EvidenceBadge grade={story.grade} />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="reader-procedures home-procedure-entry" aria-labelledby="procedures-title">
        <Artwork name="desk-procedures" />
        <div>
          <p className="eyebrow">Before you book</p>
          <h2 id="procedures-title">Know what you&apos;re<br />signing up for.</h2>
          <p>Compare procedures by cost, downtime, and what they can realistically do. Find the risks and the questions worth asking before your consultation.</p>
          <Link className="primary-action" href="/procedures">Compare procedures <span aria-hidden="true">→</span></Link>
        </div>
      </section>

      <NewsletterPanel source="homepage" />

      <section className="reader-explore home-explore" aria-labelledby="explore-title">
        <div className="reader-section-heading">
          <h2 id="explore-title">Follow your curiosity.</h2>
          <Link href="/search">Search everything <span aria-hidden="true">↗</span></Link>
        </div>
        <nav aria-label="Explore Skin Considered">
          {explore.map((item) => (
            <Link href={item.href} key={item.href}>
              <Artwork name={item.art} />
              <small>{item.label}</small>
              <h3>{item.title} <span aria-hidden="true">↗</span></h3>
              <p>{item.copy}</p>
            </Link>
          ))}
        </nav>
      </section>
    </main>
  );
}
