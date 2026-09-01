import type { Metadata } from "next";
import Link from "next/link";
import { EvidenceBadge } from "@/components/EvidenceBadge";
import { NewsletterPanel } from "@/components/NewsletterPanel";
import { NewsTicker } from "@/components/NewsTicker";
import { SectionHeading } from "@/components/SectionHeading";
import { SignalVisual } from "@/components/SignalVisual";
import { WorldStrip } from "@/components/WorldStrip";
import { cultureStories, EDITION, guides, ingredients, readingTime, stories, storiesByDate } from "@/lib/content";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: canonical("/"),
};

const startingPoints = [
  { eyebrow: "Catch me up", title: "What changed lately?", copy: "Open the global wire for the newest recalls, rules, research, and procedure signals.", href: "/today" },
  { eyebrow: "Make sense of a label", title: "Is this ingredient worth it?", copy: "See what an ingredient can reasonably do—and what the label still cannot tell you.", href: "/ingredients" },
  { eyebrow: "Make it simpler", title: "Help me build a routine", copy: "Start with three useful steps before adding another promising bottle.", href: "/guides/routine-from-zero" },
  { eyebrow: "Ask safer questions", title: "I'm considering a procedure", copy: "Bring a provider-and-device checklist, not just a saved before-and-after photo.", href: "/guides/procedure-safety-checklist" },
  { eyebrow: "Follow the longer story", title: "Take me somewhere unexpected", copy: "Explore beauty practices as culture, material history, and living knowledge.", href: "/culture" },
];

export default function Home() {
  // The first story in the content file is the editors' lead; everything else follows the calendar.
  const lead = stories[0];
  const briefing = storiesByDate.filter((story) => story.slug !== lead.slug).slice(0, 4);
  const research = storiesByDate.filter((story) => story.kind === "research" || story.kind === "procedure").slice(0, 3);
  const leadReading = readingTime(lead.sections, lead.dek);
  const leadUpdated = lead.updates?.at(-1);

  return (
    <main id="main-content">
      <NewsTicker />

      <section className="start-here" aria-labelledby="start-here-title">
        <div className="start-here-intro">
          <span>Welcome / choose your way in</span>
          <h2 id="start-here-title">What brought you here today?</h2>
          <p>No skincare vocabulary required. Pick a question and we&apos;ll take you to the most useful starting point.</p>
          <div className="start-here-trust">
            <b>✓ Rechecked {EDITION.label}</b>
            <span>{stories.length} current dispatches · every claim opens to its source file</span>
            <Link href="/methodology">See how we weigh evidence →</Link>
          </div>
        </div>
        <nav className="start-paths" aria-label="Choose a skincare starting point">
          {startingPoints.map((item, index) => (
            <Link href={item.href} key={item.title}>
              <span>0{index + 1} / {item.eyebrow}</span>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
              <b aria-hidden="true">↗</b>
            </Link>
          ))}
        </nav>
      </section>

      <section className="lead-grid" aria-labelledby="lead-title">
        <Link className="lead-visual-link" href={`/dispatches/${lead.slug}`} aria-label={`Read ${lead.headline}`}>
          <SignalVisual color={lead.color} label={`Abstract editorial artwork for ${lead.headline}`} />
          <span>Latest verified update</span>
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
            <span>{leadReading.label} read</span>
            <span>{leadUpdated ? `Updated ${leadUpdated.dateLabel}` : lead.dateLabel}</span>
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
          href="/today?desk=Research"
          linkLabel="Open the research wire"
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

      <WorldStrip />

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
              <b>{readingTime(guide.sections, guide.description).label} ↗</b>
            </Link>
          ))}
        </div>
      </section>

      <section className="homepage-section ingredient-strip" aria-labelledby="ingredient-strip-title">
        <SectionHeading
          eyebrow="Ingredient files"
          href="/ingredients"
          linkLabel="Open the index"
          note="Grades travel with the claim, not the ingredient."
          title="The name on the front"
        />
        <ul id="ingredient-strip-title" aria-label="Ingredient files">
          {ingredients.map((ingredient) => (
            <li key={ingredient.slug}>
              <Link href={`/ingredients#${ingredient.slug}`}>
                <span>{ingredient.name}</span>
                <small>{ingredient.family}</small>
              </Link>
              <EvidenceBadge grade={ingredient.evidence} compact />
            </li>
          ))}
        </ul>
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
              <div className="culture-card-art" aria-hidden="true">
                <span />
              </div>
              <small>
                {story.place} · {story.era}
              </small>
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
