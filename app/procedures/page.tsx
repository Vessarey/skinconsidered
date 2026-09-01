import type { Metadata } from "next";
import Link from "next/link";
import { EvidenceBadge } from "@/components/EvidenceBadge";
import { NewsletterPanel } from "@/components/NewsletterPanel";
import { stories } from "@/lib/content";

export const metadata: Metadata = {
  title: "Procedure desk",
  description: "Evidence, regulation, safety, and better questions for lasers, microneedling, peels, injectables, and other skin procedures.",
};

export default function ProceduresPage() {
  const procedureStories = stories.filter((story) => story.kind === "procedure");

  return (
    <main id="main-content">
      <header className="page-hero procedure-hero">
        <div>
          <span>Procedure desk / risk stays visible</span>
          <h1>Before-and-after is not a study design.<sup>*</sup></h1>
        </div>
        <p>Device, operator, settings, skin tone, aftercare, comparator, and follow-up all change the result. We keep them in the frame.</p>
      </header>

      <section className="procedure-checklist">
        <div>
          <span>Before you book</span>
          <h2>Six questions worth more than a treatment trend</h2>
          <Link href="/guides/procedure-safety-checklist">Open the complete safety guide →</Link>
        </div>
        <ol>
          <li><b>Who</b><span>Who performs it, and what procedure-specific training do they have?</span></li>
          <li><b>What</b><span>What exact device, product, depth, energy, or concentration is planned?</span></li>
          <li><b>For whom</b><span>Was it studied in people with your skin tone, condition, and risk factors?</span></li>
          <li><b>Compared with</b><span>How does it compare with doing less, another option, or no procedure?</span></li>
          <li><b>Recovery</b><span>What is normal downtime, and what is a warning sign?</span></li>
          <li><b>Plan B</b><span>Who treats complications, and what happens if the result disappoints?</span></li>
        </ol>
      </section>

      <section className="procedure-research">
        <div className="section-heading">
          <div><span>Recent file</span><h2>What the evidence can support today</h2></div>
        </div>
        {procedureStories.map((story) => (
          <article key={story.slug}>
            <div><span>{story.location}</span><EvidenceBadge grade={story.grade} /></div>
            <h2><Link href={`/dispatches/${story.slug}`}>{story.headline}</Link></h2>
            <p>{story.dek}</p>
            <div><b>The limit</b><span>{story.limitations}</span></div>
            <Link href={`/dispatches/${story.slug}`}>Read the procedure file ↗</Link>
          </article>
        ))}
      </section>

      <section className="safety-alert">
        <span>Safety signal / FDA</span>
        <h2>Radiofrequency microneedling is a medical procedure—not a home treatment.</h2>
        <p>The FDA has reported serious complications with certain uses, including burns, scarring, fat loss, disfigurement, and nerve damage.</p>
        <a href="https://www.fda.gov/medical-devices/safety-communications/potential-risks-certain-uses-radiofrequency-rf-microneedling-fda-safety-communication" rel="noreferrer" target="_blank">Read the FDA safety communication ↗</a>
      </section>
      <NewsletterPanel />
    </main>
  );
}
