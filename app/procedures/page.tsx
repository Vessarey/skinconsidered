import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { EvidenceBadge } from "@/components/EvidenceBadge";
import { NewsletterPanel } from "@/components/NewsletterPanel";
import { ProcedureExplorer, type ExplorerProfile } from "@/components/ProcedureExplorer";
import { EDITION, procedureCategories, procedureConcerns, procedureProfiles, readingTime, siteUrl, storiesByDate } from "@/lib/content";
import { breadcrumbs, canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Compare skin procedures: facials, peels, injectables, lasers, tightening",
  description:
    "A decision center for U.S. skin procedures: cost context, sessions, downtime, healing, evidence grade, realistic benefits, serious risks, who performs it, and primary sources for every family.",
  alternates: canonical("/procedures"),
};

const goalLinks = [
  { label: "Lines & wrinkles", concern: "Lines & wrinkles" },
  { label: "Volume & contour", concern: "Volume & contour" },
  { label: "Scars", concern: "Scars" },
  { label: "Pigment & dark spots", concern: "Pigment & dark spots" },
  { label: "Redness & vessels", concern: "Redness & vessels" },
  { label: "Laxity & lifting", concern: "Laxity & lifting" },
  { label: "Acne & congestion", concern: "Acne & congestion" },
  { label: "Hair reduction", concern: "Hair reduction" },
  { label: "Fat & body contour", concern: "Fat & body contour" },
  { label: "Hair loss", concern: "Hair loss" },
  { label: "Excess skin & jowls", concern: "Excess skin & jowls" },
  { label: "Tattoos", concern: "Tattoos" },
];

/**
 * Verified from the ASPS 2025 report and the ISAPS 2024 press release. ASPS
 * stopped publishing minimally invasive counts in 2025; the shares below are
 * what it does publish. Both are surveys of plastic surgeons.
 */
const marketSignals = [
  { value: "≈50%", label: "Neuromodulators' share of minimally invasive treatments by ASPS members, 2025", source: "ASPS 2025" },
  { value: "30%", label: "Hyaluronic acid fillers' share of minimally invasive treatments, 2025", source: "ASPS 2025" },
  { value: "7.8M", label: "Botulinum toxin procedures by plastic surgeons worldwide, 2024", source: "ISAPS 2024" },
  { value: "6.3M", label: "Hyaluronic acid procedures worldwide, 2024 (+5.2%)", source: "ISAPS 2024" },
];

export default function ProceduresPage() {
  const procedureStories = storiesByDate.filter((story) => story.kind === "procedure" || story.category === "Procedure safety");
  const base = siteUrl();
  const branded = procedureProfiles.filter((profile) => profile.kind === "branded").length;
  const withFigure = procedureProfiles.filter((profile) => /\$\d/.test(profile.cost) || profile.advertised).length;

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
        </div>
        <p>
          {procedureProfiles.length} procedure files, from a spa facial to a facelift: cost context, recovery, result timing, evidence grade, serious risks, who
          performs it, and the questions that change a quote.
        </p>
      </header>

      <section className="procedure-snapshot" aria-label="Procedure guide scope">
        <div>
          <b>{procedureProfiles.length}</b>
          <span>Files across {procedureCategories.length} families, including {branded} branded treatment filed separately from its family</span>
        </div>
        <div>
          <b>{withFigure}</b>
          <span>Files with a published U.S. average or an advertised price range from named clinic menus; the rest say so</span>
        </div>
        <div>
          <b>{EDITION.label}</b>
          <span>Last editorial review of every file</span>
        </div>
        <div>
          <b>Not a quote</b>
          <span>Area, product, device, provider, and city change price</span>
        </div>
      </section>

      <section className="procedure-start" aria-labelledby="procedure-start-title">
        <div>
          <span>Start with the outcome</span>
          <h2 id="procedure-start-title">What are you trying to change?</h2>
          <p>
            Pick a concern to filter the comparison. A diagnosis, your skin tone, medical history, and tolerance for downtime can change the better option, so the
            comparison is a starting point, not a recommendation.
          </p>
        </div>
        <nav aria-label="Browse procedures by concern">
          {goalLinks.map((goal) => (
            <Link href={`/procedures?concern=${encodeURIComponent(goal.concern)}#compare`} key={goal.concern}>
              {goal.label} <span aria-hidden="true">↓</span>
            </Link>
          ))}
        </nav>
      </section>

      <section className="procedure-catalog" aria-labelledby="procedure-catalog-title">
        <div className="procedure-catalog-intro">
          <span>Compare / then expand</span>
          <h2 id="procedure-catalog-title">Every family, side by side.</h2>
          <p>
            The closed row shows the decision essentials. Open it for evidence, what the cost figure means, benefits, limitations, serious risks, and pause signs.
            The full file adds the healing timeline, candidacy, regulatory status, operator questions, and sources.
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

      <section className="procedure-market" aria-labelledby="procedure-market-title">
        <div className="section-heading">
          <div>
            <span>Use / survey estimates</span>
            <h2 id="procedure-market-title">Popular does not mean right for you.</h2>
          </div>
          <p>
            These figures show scale of use, not comparative effectiveness or safety. Both come from surveys of plastic surgeons, so spa and dermatology volume
            is not counted. ASPS stopped publishing minimally invasive procedure counts in its 2025 report and now reports shares.
          </p>
        </div>
        <div className="procedure-market-grid">
          {marketSignals.map((signal) => (
            <article key={signal.label}>
              <b>{signal.value}</b>
              <span>{signal.label}</span>
              <small>{signal.source}</small>
            </article>
          ))}
        </div>
        <div className="procedure-market-sources">
          <a href="https://www.plasticsurgery.org/documents/news/statistics/2025/plastic-surgery-statistics-report-2025.pdf" rel="noreferrer" target="_blank">
            ASPS 2025 procedural statistics report (PDF) ↗<span className="sr-only"> (opens in a new tab)</span>
          </a>
          <a href="https://www.isaps.org/discover/about-isaps/global-statistics/global-survey-2024-full-report-and-press-releases/" rel="noreferrer" target="_blank">
            ISAPS 2024 global survey ↗<span className="sr-only"> (opens in a new tab)</span>
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
