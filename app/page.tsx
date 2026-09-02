import type { Metadata } from "next";
import Link from "next/link";
import { EvidenceBadge } from "@/components/EvidenceBadge";
import { NewsletterPanel } from "@/components/NewsletterPanel";
import { EDITION, getStory, procedureCategories, procedureProfiles, readingTime, sourceCoverage, stories } from "@/lib/content";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: canonical("/"),
};

const digestSlugs = [
  "us-skin-lightening-mercury-warning-2026",
  "bemotrizinol-us-sunscreen-filter",
  "uk-simple-micellar-water-recall",
];

const digestLabels = ["Safety alert / U.S.", "Regulation / U.S.", "Recall / U.K."];

const explore = [
  { number: "01", title: "Learn", copy: "Short guides for barrier basics, retinoids, acne, sunscreen, and safer decisions.", href: "/guides" },
  { number: "02", title: "Decode", copy: "Topical files: tretinoin to tallow, with U.S. status, strengths, evidence by use, and side effects.", href: "/ingredients" },
  { number: "03", title: "Weigh", copy: "Trend files: what the feed claims, what the evidence supports, and who should skip it.", href: "/trends" },
  { number: "04", title: "Look back", copy: "Beauty practices in their cultural, material, and historical context.", href: "/culture" },
];

export default function Home() {
  const digest = digestSlugs.map((slug) => getStory(slug)).filter((story) => story !== undefined);
  const usCount = stories.filter((story) => story.location === "United States").length;
  const sourcesInUse = sourceCoverage().filter((entry) => entry.status === "In use").length;

  return (
    <main id="main-content" className="home-simple">
      <section className="home-now" aria-labelledby="home-now-title">
        <div className="home-now-copy">
          <span>Checked daily / source-linked</span>
          <h1 id="home-now-title">What&apos;s new in skincare.</h1>
          <p>Verified safety alerts, regulatory changes, research, and procedure updates from the United States and around the world—without the hype.</p>
          <div className="home-now-trust" aria-label="Editorial status">
            <span><b>Rechecked</b> {EDITION.label}</span>
            <span><b>{stories.length}</b> current dispatches</span>
            <span><b>{sourcesInUse}</b> primary sources in use</span>
          </div>
          <div className="home-now-actions">
            <Link href="/today">See today&apos;s global updates <span aria-hidden="true">→</span></Link>
            <Link href="/coverage">What we cover</Link>
            <Link href="/methodology">How we check claims</Link>
          </div>
        </div>

        <aside className="home-procedure-entry" aria-labelledby="home-procedure-title">
          <span>Before you book</span>
          <h2 id="home-procedure-title">I&apos;m considering a procedure.</h2>
          <p>
            {procedureProfiles.length} files across {procedureCategories.length} families, from a spa facial to a facelift, with the details that change a
            real decision.
          </p>
          <ul>
            <li>U.S. cost context, or an honest “no reliable estimate”</li>
            <li>Sessions, downtime, healing timeline, and how long it lasts</li>
            <li>Evidence grade, serious risks, who performs it, and what to ask</li>
          </ul>
          <Link href="/procedures">Compare procedures <span aria-hidden="true">→</span></Link>
        </aside>
      </section>

      <section className="home-digest" aria-labelledby="home-digest-title">
        <div className="home-section-intro">
          <span>What&apos;s new today / three-minute scan</span>
          <h2 id="home-digest-title">Three updates worth knowing.</h2>
          <p>Start with the short answer. Every item opens to the date, jurisdiction, primary sources, evidence, and limits.</p>
          <Link href="/today">Open the full global wire →</Link>
        </div>
        <div className="home-digest-grid">
          {digest.map((story, index) => (
            <article key={story.slug}>
              <div>
                <span>{digestLabels[index]}</span>
                <EvidenceBadge compact grade={story.grade} />
              </div>
              <h3><Link href={`/dispatches/${story.slug}`}>{story.shortHeadline}</Link></h3>
              <p>{story.dek}</p>
              <div className="home-card-limit"><b>Keep in mind</b><span>{story.limitations}</span></div>
              <Link href={`/dispatches/${story.slug}`}>{readingTime(story.sections, story.dek).label} read →</Link>
            </article>
          ))}
        </div>
      </section>

      <NewsletterPanel source="homepage" />

      <section className="home-us" aria-labelledby="home-us-title">
        <div>
          <span>United States essentials</span>
          <h2 id="home-us-title">FDA changes, alerts, and rules—translated.</h2>
          <p>See what needs action, what is simply context, and what an FDA term actually means before it becomes a marketing claim.</p>
        </div>
        <div className="home-us-facts">
          <span><b>{String(usCount).padStart(2, "0")}</b> current U.S. files</span>
          <span><b>FDA</b> primary sources</span>
          <span><b>Plain</b> next steps</span>
        </div>
        <Link href="/us">Open the U.S. essentials desk <span aria-hidden="true">→</span></Link>
      </section>

      <section className="home-explore" aria-labelledby="home-explore-title">
        <div className="home-section-intro">
          <span>Go deeper when you want to</span>
          <h2 id="home-explore-title">Four clear ways to explore.</h2>
        </div>
        <nav aria-label="Explore Skin Considered">
          {explore.map((item) => (
            <Link href={item.href} key={item.title}>
              <span>{item.number}</span>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
              <b aria-hidden="true">↗</b>
            </Link>
          ))}
        </nav>
      </section>
    </main>
  );
}
