import type { Metadata } from "next";
import Link from "next/link";
import { Artwork } from "@/components/Artwork";
import { Suspense } from "react";
import { EvidenceBadge } from "@/components/EvidenceBadge";
import { NewsletterPanel } from "@/components/NewsletterPanel";
import { ProcedureExplorer, type ExplorerProfile } from "@/components/ProcedureExplorer";
import { procedureCategories, procedureConcerns, procedureProfiles, readingTime, siteUrl, storiesByDate } from "@/lib/content";
import { breadcrumbs, canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Compare skin procedures: facials, peels, injectables, lasers, tightening",
  description:
    "A decision center for U.S. skin procedures: cost, downtime, evidence grade, benefits, risks, who performs it, and primary sources for every family.",
  alternates: canonical("/procedures"),
};

export default function ProceduresPage() {
  const procedureStories = storiesByDate.filter((story) => story.kind === "procedure" || story.category === "Procedure safety" || Boolean(story.related?.procedures?.length));
  const base = siteUrl();

  const explorerProfiles: ExplorerProfile[] = procedureProfiles.map((profile) => ({
    slug: profile.slug,
    name: profile.name,
    kind: profile.kind,
    category: profile.category,
    purpose: profile.purpose,
    summary: profile.summary,
    goals: profile.goals,
    concerns: profile.concerns,
    aliases: profile.aliases ?? [],
    evidenceGrade: profile.evidenceGrade,
    evidence: profile.evidence,
    cost: profile.cost,
    advertised: profile.advertised?.range,
    costBand: profile.costBand,
    costBasis: profile.costBasis,
    sessions: profile.sessions,
    downtime: profile.downtime,
    downtimeBand: profile.downtimeBand,
    results: profile.results,
    duration: profile.duration,
    setting: profile.setting,
    benefits: profile.benefits,
    tradeoffs: profile.tradeoffs,
    majorRisks: profile.majorRisks,
    pauseIf: profile.pauseIf,
  }));

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Skin procedure decision files",
      numberOfItems: procedureProfiles.length,
      itemListElement: procedureProfiles.map((profile, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: profile.name,
        url: `${base}/procedures/${profile.slug}`,
      })),
    },
    breadcrumbs(base, [
      { name: "Skin Considered", path: "/" },
      { name: "Procedures", path: "/procedures" },
    ]),
  ];

  return (
    <main id="main-content">
      <header className="page-hero procedure-hero">
        <div>
          <span>Procedure decision center / United States</span>
          <h1>
            Know the tradeoff before you book.<sup>*</sup>
          </h1>
        <p>
          Explore {procedureProfiles.length} procedures by cost, recovery time, and evidence. Find realistic outcomes, important risks, and better questions for your consultation.
        </p>
        <a className="primary-action" href="#compare">Find a procedure <span aria-hidden="true">↓</span></a>
        </div>
        <Artwork name="desk-procedures" priority />
      </header>

      <section className="procedure-catalog" aria-labelledby="procedure-catalog-title">
        <div className="procedure-catalog-intro">
          <h2 id="procedure-catalog-title">Find a procedure.</h2>
          <p>
            Search by name or narrow the list below. Select any procedure to compare the details, then open its full guide for sources and questions to ask.
          </p>
        </div>
        <Suspense fallback={<p className="search-loading">Opening the comparison…</p>}>
          <ProcedureExplorer categories={procedureCategories} concerns={procedureConcerns} profiles={explorerProfiles} />
        </Suspense>
      </section>

      <section className="safety-alert procedure-safety-first" aria-labelledby="safety-alert-title">
        <span>Current safety signal / FDA</span>
        <h2 id="safety-alert-title">Radiofrequency microneedling is a medical procedure, not a facial.</h2>
        <p>
          FDA is evaluating reports of burns, scarring, fat loss, disfigurement, and nerve damage associated with certain uses. Ask for the exact device,
          settings, operator qualifications, and complication plan before booking.
        </p>
        <div className="safety-alert-links">
          <Link href="/procedures/rf-microneedling">Open the RF microneedling file →</Link>
          <a
            href="https://www.fda.gov/medical-devices/safety-communications/potential-risks-certain-uses-radiofrequency-rf-microneedling-fda-safety-communication"
            rel="noreferrer"
            target="_blank"
          >
            Read the FDA safety communication ↗<span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
      </section>

      <section className="procedure-total-cost" aria-labelledby="procedure-cost-title">
        <div>
          <span>Price the plan, not the ad</span>
          <h2 id="procedure-cost-title">What will the full result actually cost?</h2>
        </div>
        <div>
          <p>
            <b>Total course</b> = per-session fee × planned sessions + consultation + product, cartridge, or serum + anesthesia or facility + prescriptions and
            aftercare + expected maintenance.
          </p>
          <p>
            Most cosmetic procedures are self-pay. The published averages on this page are physician fees from ASPS cost pages, labeled as its latest statistics
            without a stated survey year. Ask for a written quote and the refund, touch-up, and complication policies before paying a deposit.
          </p>
          <a href="https://www.plasticsurgery.org/cosmetic-procedures/skin-rejuvenation-and-resurfacing/cost" rel="noreferrer" target="_blank">
            See how ASPS presents its averages ↗<span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
      </section>

      <section className="procedure-checklist" aria-labelledby="checklist-title">
        <div>
          <span>Universal safety check</span>
          <h2 id="checklist-title">Six questions worth more than a trend.</h2>
          <Link href="/guides/procedure-safety-checklist">Open the complete safety guide →</Link>
        </div>
        <ol>
          <li>
            <b>Who</b>
            <span>Who performs it, under whose license, and what procedure-specific training do they have?</span>
          </li>
          <li>
            <b>What</b>
            <span>What exact device, product, depth, energy, concentration, and dose are planned?</span>
          </li>
          <li>
            <b>For whom</b>
            <span>Was it studied in people with your skin tone, condition, and risk factors?</span>
          </li>
          <li>
            <b>Alternatives</b>
            <span>How does it compare with doing less, another option, or no procedure?</span>
          </li>
          <li>
            <b>Recovery</b>
            <span>What is normal downtime, and which symptoms need same-day care?</span>
          </li>
          <li>
            <b>Plan B</b>
            <span>Who treats complications, and what happens if the result disappoints?</span>
          </li>
        </ol>
      </section>

      {procedureStories.length > 0 && (
        <section className="procedure-research" aria-labelledby="procedure-research-title">
          <div className="section-heading">
            <div>
              <span>Recent procedure reporting / {String(procedureStories.length).padStart(2, "0")}</span>
              <h2 id="procedure-research-title">What changed in the evidence.</h2>
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
              <Link href={`/dispatches/${story.slug}`}>Read the file ↗</Link>
            </article>
          ))}
        </section>
      )}

      <NewsletterPanel source="procedures" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </main>
  );
}
