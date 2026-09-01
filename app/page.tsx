import Link from "next/link";
import { EvidenceBadge } from "@/components/EvidenceBadge";
import { NewsletterPanel } from "@/components/NewsletterPanel";
import { NewsTicker } from "@/components/NewsTicker";
import { SectionHeading } from "@/components/SectionHeading";
import { SignalVisual } from "@/components/SignalVisual";
import { cultureStories, guides, stories } from "@/lib/content";

export default function Home() {
  const lead = stories[0];
  const briefing = stories.slice(1, 5);
  const research = stories.slice(5, 8);

  return (
    <main id="main-content">
      <NewsTicker />

      <section className="lead-grid" aria-labelledby="lead-title">
        <Link className="lead-visual-link" href={`/dispatches/${lead.slug}`} aria-label={`Read ${lead.headline}`}>
          <SignalVisual color={lead.color} label={`Abstract editorial artwork for ${lead.headline}`} />
          <span>Global signal / 001</span>
        </Link>
        <article className="lead-story">
          <div className="lead-meta">
            <span>{lead.category}</span>
            <EvidenceBadge grade={lead.grade} />
          </div>
          <h1 id="lead-title">
            <Link href={`/dispatches/${lead.slug}`}>{lead.headline}</Link>
          </h1>
          <p>{lead.dek}</p>
          <div className="lead-byline">
            <span>Skin Considered desk</span>
            <span>{lead.readTime}</span>
            <span>Updated {lead.dateLabel}</span>
          </div>
          <Link className="text-link" href={`/dispatches/${lead.slug}`}>
            Read the full consideration <span aria-hidden="true">→</span>
          </Link>
        </article>

        <aside className="briefing" aria-labelledby="briefing-title">
          <h2 id="briefing-title">The briefing</h2>
          {briefing.map((story) => (
            <article key={story.slug}>
              <div>
                <span>{story.category}</span>
                <small>{story.dateLabel}</small>
              </div>
              <h3>
                <Link href={`/dispatches/${story.slug}`}>{story.shortHeadline}</Link>
              </h3>
              <Link aria-label={`Read ${story.headline}`} href={`/dispatches/${story.slug}`}>
                ↗
              </Link>
            </article>
          ))}
        </aside>
      </section>

      <section className="homepage-section">
        <SectionHeading
          eyebrow="Research desk"
          href="/today"
          linkLabel="Open the global wire"
          note="*The claim is never stronger than the study design."
          title="The week, considered"
        />
        <div className="research-grid">
          {research.map((story) => (
            <article key={story.slug}>
              <div className="research-card-top">
                <span>{story.signal}</span>
                <EvidenceBadge grade={story.grade} compact />
              </div>
              <h3>
                <Link href={`/dispatches/${story.slug}`}>{story.shortHeadline}</Link>
              </h3>
              <p>{story.whyItMatters}</p>
              <div className="research-card-limit">
                <b>The limit</b>
                <span>{story.limitations}</span>
              </div>
              <Link className="card-link" href={`/dispatches/${story.slug}`}>
                Read the evidence file <span aria-hidden="true">↗</span>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="world-strip" aria-labelledby="world-title">
        <div className="world-intro">
          <span>Six regions · one standard</span>
          <h2 id="world-title">Skincare has no single center.<sup>*</sup></h2>
          <p>Follow regulation, clinical research, safety signals, procedures, and practices where they actually happen.</p>
          <Link href="/today">Explore the global wire →</Link>
        </div>
        <div className="world-orbit" aria-hidden="true">
          <span className="world-ring ring-one" />
          <span className="world-ring ring-two" />
          <span className="world-ring ring-three" />
          {[
            ["North America", "filter access"],
            ["Europe", "safety alerts"],
            ["Asia", "procedure research"],
            ["Oceania", "SPF oversight"],
            ["Latin America", "recall watch"],
          ].map(([region, topic], index) => (
            <span className={`world-point point-${index + 1}`} key={region}>
              <b>{region}</b>
              <small>{topic}</small>
            </span>
          ))}
        </div>
      </section>

      <section className="homepage-section guide-preview">
        <SectionHeading
          eyebrow="Learn the field"
          href="/guides"
          linkLabel="All guides"
          note="Guides for people who want the why, not just the routine."
          title="Start with a better mental model"
        />
        <div className="guide-list">
          {guides.slice(0, 3).map((guide) => (
            <Link href={`/guides/${guide.slug}`} key={guide.slug}>
              <span>{guide.number}</span>
              <div>
                <small>{guide.level}</small>
                <h3>{guide.title}</h3>
              </div>
              <p>{guide.description}</p>
              <b>{guide.readTime} ↗</b>
            </Link>
          ))}
        </div>
      </section>

      <section className="culture-preview">
        <SectionHeading
          eyebrow="The practice archive"
          href="/culture"
          linkLabel="Enter the archive"
          note="Beauty methods in their cultural, material, and historical context."
          title="Before the product category"
        />
        <div className="culture-grid">
          {cultureStories.slice(0, 3).map((story, index) => (
            <article className={`culture-card culture-${story.color}`} key={story.slug}>
              <div className="culture-card-number">0{index + 1}</div>
              <div className="culture-card-art" aria-hidden="true"><span /></div>
              <small>{story.place} · {story.era}</small>
              <h3>
                <Link href={`/culture/${story.slug}`}>{story.title}</Link>
              </h3>
              <p>{story.description}</p>
              <Link href={`/culture/${story.slug}`}>Read the history ↗</Link>
            </article>
          ))}
        </div>
      </section>

      <NewsletterPanel />
    </main>
  );
}
