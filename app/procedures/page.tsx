import type { Metadata } from "next";
import Link from "next/link";
import { EvidenceBadge } from "@/components/EvidenceBadge";
import { NewsletterPanel } from "@/components/NewsletterPanel";
import { readingTime, storiesByDate } from "@/lib/content";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Procedure desk",
  description: "Evidence, regulation, safety, and better questions for lasers, microneedling, peels, injectables, and other skin procedures.",
  alternates: canonical("/procedures"),
};

export default function ProceduresPage() {
  const procedureStories = storiesByDate.filter((story) => story.kind === "procedure");

  return (
    <main id="main-content">
      <header className="page-hero procedure-hero">
        <div>
          <span>Procedure desk / risk stays visible</span>
          <h1>
            Before-and-after is not a study design.<sup>*</sup>
          </h1>
        </div>
        <p>Device, operator, settings, skin tone, aftercare, comparator, and follow-up all change the result. We keep them in the frame.</p>
      </header>

      <section className="procedure-checklist" aria-labelledby="checklist-title">
        <div>
          <span>Before you book</span>
          <h2 id="checklist-title">Six questions worth more than a treatment trend</h2>
          <Link href="/guides/procedure-safety-checklist">Open the complete safety guide →</Link>
        </div>
        <ol>
          <li>
            <b>Who</b>
            <span>Who performs it, and what procedure-specific training do they have?</span>
          </li>
          <li>
            <b>What</b>
            <span>What exact device, product, depth, energy, or concentration is planned?</span>
          </li>
          <li>
            <b>For whom</b>
            <span>Was it studied in people with your skin tone, condition, and risk factors?</span>
          </li>
          <li>
            <b>Compared with</b>
            <span>How does it compare with doing less, another option, or no procedure?</span>
          </li>
          <li>
            <b>Recovery</b>
            <span>What is normal downtime, and what is a warning sign?</span>
          </li>
          <li>
            <b>Plan B</b>
            <span>Who treats complications, and what happens if the result disappoints?</span>
          </li>
        </ol>
      </section>

      <section className="procedure-research" aria-labelledby="procedure-research-title">
        <div className="section-heading">
          <div>
            <span>
              Recent {procedureStories.length === 1 ? "file" : "files"} / {String(procedureStories.length).padStart(2, "0")}
            </span>
            <h2 id="procedure-research-title">What the evidence can support today</h2>
          </div>
          <Link href="/today?desk=Procedures">All procedure dispatches →</Link>
        </div>
        {procedureStories.map((story) => (
          <article key={story.slug}>
            <div>
              <span>
                {story.location} · {story.dateLabel} · {readingTime(story.sections, story.dek).label} read
              </span>
              <EvidenceBadge grade={story.grade} />
            </div>
            <h2>
              <Link href={`/dispatches/${story.slug}`}>{story.headline}</Link>
            </h2>
            <p>{story.dek}</p>
            <div>
              <b>The limit</b>
              <span>{story.limitations}</span>
            </div>
            <Link href={`/dispatches/${story.slug}`}>Read the procedure file ↗</Link>
          </article>
        ))}
      </section>

      <section className="safety-alert" aria-labelledby="safety-alert-title">
        <span>Safety signal / FDA</span>
        <h2 id="safety-alert-title">Radiofrequency microneedling is a medical procedure—not a home treatment.</h2>
        <p>The FDA has reported serious complications with certain uses, including burns, scarring, fat loss, disfigurement, and nerve damage.</p>
        <a
          href="https://www.fda.gov/medical-devices/safety-communications/potential-risks-certain-uses-radiofrequency-rf-microneedling-fda-safety-communication"
          rel="noreferrer"
          target="_blank"
        >
          Read the FDA safety communication ↗<span className="sr-only"> (opens in a new tab)</span>
        </a>
      </section>
      <NewsletterPanel source="procedures" />
    </main>
  );
}
