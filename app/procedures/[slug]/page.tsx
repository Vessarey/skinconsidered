import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EvidenceBadge } from "@/components/EvidenceBadge";
import { NewsletterPanel } from "@/components/NewsletterPanel";
import { RelatedFiles } from "@/components/RelatedFiles";
import { TreatmentDepthFigure } from "@/components/TreatmentDepthFigure";
import {
  advertisedSources,
  formatLongDate,
  getProcedure,
  gradeDefinitions,
  lastUpdated,
  PRICE_SURVEY_DATE,
  procedureProfiles,
  procedureTargets,
  resolveRelated,
  siteUrl,
} from "@/lib/content";
import { breadcrumbs, canonical, metaDescription } from "@/lib/seo";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return procedureProfiles.map((profile) => ({ slug: profile.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const profile = getProcedure(slug);
  if (!profile) return {};

  return {
    title: `${profile.name}: cost, downtime, evidence, and risks`,
    description: metaDescription(`${profile.cost}. ${profile.purpose} Sessions, downtime, evidence grade, risks, and sources.`),
    alternates: canonical(`/procedures/${profile.slug}`),
    openGraph: {
      type: "article",
      title: `${profile.name} — what to know before you book`,
      description: profile.summary,
      modifiedTime: lastUpdated(profile),
      section: profile.category,
      tags: [profile.category, ...profile.concerns],
    },
  };
}

const KIND_LABEL = { family: "Procedure family", branded: "Branded treatment", technique: "Technique" } as const;

export default async function ProcedurePage({ params }: { params: Params }) {
  const { slug } = await params;
  const profile = getProcedure(slug);
  if (!profile) notFound();

  const base = siteUrl();
  const grade = gradeDefinitions[profile.evidenceGrade];
  const siblings = procedureProfiles.filter((item) => item.category === profile.category && item.slug !== profile.slug);
  const related = resolveRelated(profile.related);
  const reviewedLabel = formatLongDate(profile.reviewed);

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: `${profile.name}: cost, downtime, evidence, and risks`,
      description: profile.summary,
      dateModified: lastUpdated(profile),
      articleSection: "Procedures",
      mainEntityOfPage: `${base}/procedures/${profile.slug}`,
      image: [`${base}/procedures/${profile.slug}/opengraph-image`],
      author: { "@type": "Organization", name: "Skin Considered editorial desk", url: `${base}/about` },
      publisher: { "@type": "Organization", name: "Skin Considered", url: base, logo: { "@type": "ImageObject", url: `${base}/apple-icon` } },
      about: { "@type": "MedicalProcedure", name: profile.name, procedureType: "https://schema.org/NoninvasiveProcedure" },
      citation: profile.sources.map((source) => source.url),
      isAccessibleForFree: true,
    },
    breadcrumbs(base, [
      { name: "Skin Considered", path: "/" },
      { name: "Procedures", path: "/procedures" },
      { name: profile.name, path: `/procedures/${profile.slug}` },
    ]),
  ];

  return (
    <main id="main-content" className="procedure-file">
      <Link className="article-back" href="/procedures#compare">
        ← Compare all procedures
      </Link>

      <header className="procedure-file-header">
        <div className="article-kicker">
          <span>
            {profile.category} / {KIND_LABEL[profile.kind]}
          </span>
          <EvidenceBadge grade={profile.evidenceGrade} />
        </div>
        <h1>{profile.name}</h1>
        <p className="article-dek">{profile.purpose}</p>
        {profile.brandNote && (
          <p className="procedure-brand-note">
            <b>{profile.kind === "branded" ? "Brand, not family" : "Brands and names"}</b> {profile.brandNote}
          </p>
        )}
        <div className="article-trust" aria-label="File verification status">
          <span>
            <b aria-hidden="true">✓</b> Reviewed {reviewedLabel}
          </span>
          <span>
            {profile.sources.length} {profile.sources.length === 1 ? "source link" : "source links"} on file
          </span>
          <Link href="/methodology#grades">How grading works</Link>
          <Link href="/corrections">Report a correction</Link>
        </div>
      </header>

      <section className="procedure-essentials" aria-labelledby="essentials-title">
        <h2 id="essentials-title">Decision essentials</h2>
        <dl>
          <div>
            <dt>Published average (U.S.)</dt>
            <dd>{profile.cost}</dd>
          </div>
          <div>
            <dt>Advertised prices</dt>
            <dd>{profile.advertised ? profile.advertised.range : "None on file in the menus surveyed"}</dd>
          </div>
          <div>
            <dt>Sessions</dt>
            <dd>{profile.sessions}</dd>
          </div>
          <div>
            <dt>Appointment</dt>
            <dd>{profile.appointment}</dd>
          </div>
          <div>
            <dt>Downtime</dt>
            <dd>{profile.downtime}</dd>
          </div>
          <div>
            <dt>Results appear</dt>
            <dd>{profile.results}</dd>
          </div>
          <div>
            <dt>Lasts</dt>
            <dd>{profile.duration}</dd>
          </div>
          <div>
            <dt>Who performs it</dt>
            <dd>{profile.setting}</dd>
          </div>
          <div>
            <dt>Best for</dt>
            <dd>{profile.goals.join(" · ")}</dd>
          </div>
        </dl>
      </section>

      <section className="procedure-figure" aria-label="Where the treatment acts">
        <TreatmentDepthFigure targets={procedureTargets(profile)} title={`Where ${profile.name.toLowerCase()} acts in the skin`} />
      </section>

      <div className="procedure-file-layout">
        <aside className="article-aside">
          <div className="ledger-box">
            <h2>Evidence for this purpose</h2>
            <dl>
              <div>
                <dt>Grade</dt>
                <dd>
                  <b>{grade.code}</b> {grade.label}
                </dd>
              </div>
              <div>
                <dt>Why</dt>
                <dd>{profile.evidence}</dd>
              </div>
              <div>
                <dt>Important</dt>
                <dd>
                  The grade belongs to the stated purpose, not to every device, brand, setting, or skin tone.{" "}
                  <Link href={`/methodology#grade-${profile.evidenceGrade.toLowerCase()}`}>How grading works →</Link>
                </dd>
              </div>
            </dl>
          </div>
          <nav className="article-toc" aria-label="In this file">
            <h2>In this file</h2>
            <ol>
              <li><a href="#cost">What the cost figure means</a></li>
              <li><a href="#timeline">Healing and results timeline</a></li>
              <li><a href="#benefits">Benefits, limitations, and risks</a></li>
              <li><a href="#candidacy">Candidacy and pause signs</a></li>
              <li><a href="#operator">Operator, setting, and regulation</a></li>
              <li><a href="#ask">Questions to ask</a></li>
              {profile.metrics?.length ? <li><a href="#use">Use and market context</a></li> : null}
              <li><a href="#sources-title">Sources on file</a></li>
            </ol>
          </nav>
          <div className="medical-note">
            <b>Not medical advice</b>
            <p>This file is for asking better questions. Candidacy, diagnosis, and treatment plans need an appropriately qualified clinician who has examined you.</p>
          </div>
        </aside>

        <article className="article-body procedure-body">
          <section id="summary">
            <h2>The short version</h2>
            <p>{profile.summary}</p>
          </section>

          <section id="cost">
            <h2>What the cost figure means</h2>
            <p>
              <b>{profile.cost}.</b> {profile.costBasis}
            </p>
            {profile.advertised ? (
              <div className="procedure-advertised">
                <h3>Advertised prices on file</h3>
                <p className="procedure-advertised-range">
                  <b>{profile.advertised.range}</b>
                </p>
                <p>{profile.advertised.basis}</p>
                <p className="procedure-advertised-note">
                  Read from {profile.advertised.menus.length} published U.S. clinic {profile.advertised.menus.length === 1 ? "menu" : "menus"} on{" "}
                  {formatLongDate(PRICE_SURVEY_DATE)}. A convenience sample, not a national survey: prices vary by city and provider, packages are usually
                  cheaper per session, and menus change without notice.
                </p>
                <ul className="procedure-advertised-sources">
                  {advertisedSources(profile).map((source) => (
                    <li key={source.url}>
                      <a href={source.url} rel="noreferrer" target="_blank">
                        {source.label} <span aria-hidden="true">↗</span>
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="procedure-advertised-note">
                None of the published clinic menus in our survey listed a price for this procedure; quotes are given after consultation.
              </p>
            )}
            <p className="procedure-cost-math">
              Total course = per-session fee × planned sessions + consultation + product, cartridge, or serum + anesthesia or facility + prescriptions and aftercare + expected maintenance. Ask for the plan price in writing.
            </p>
          </section>

          <section id="timeline">
            <h2>Healing and results timeline</h2>
            <dl className="procedure-timeline">
              <div>
                <dt>Appointment</dt>
                <dd>{profile.appointment}</dd>
              </div>
              <div>
                <dt>Downtime</dt>
                <dd>{profile.downtime}</dd>
              </div>
              <div>
                <dt>Healing</dt>
                <dd>{profile.healing}</dd>
              </div>
              <div>
                <dt>Results appear</dt>
                <dd>{profile.results}</dd>
              </div>
              <div>
                <dt>Duration and maintenance</dt>
                <dd>{profile.duration}</dd>
              </div>
            </dl>
          </section>

          <section id="benefits">
            <h2>Benefits, limitations, and risks</h2>
            <div className="procedure-pro-con">
              <section>
                <h3>Realistic benefits</h3>
                <ul>{profile.benefits.map((item) => <li key={item}>{item}</li>)}</ul>
              </section>
              <section>
                <h3>Limitations</h3>
                <ul>{profile.tradeoffs.map((item) => <li key={item}>{item}</li>)}</ul>
              </section>
              <section>
                <h3>Common effects</h3>
                <ul>{profile.commonEffects.map((item) => <li key={item}>{item}</li>)}</ul>
              </section>
              <section className="procedure-serious">
                <h3>Serious risks</h3>
                <ul>{profile.majorRisks.map((item) => <li key={item}>{item}</li>)}</ul>
              </section>
            </div>
          </section>

          <section id="candidacy">
            <h2>Candidacy and pause signs</h2>
            <p>
              <b>Usually considered for:</b> {profile.candidacy}
            </p>
            <div className="procedure-pause">
              <b>Pause before booking if</b>
              <p>{profile.pauseIf}</p>
            </div>
          </section>

          <section id="operator">
            <h2>Operator, setting, and regulation</h2>
            <p>
              <b>Who performs it in the U.S.:</b> {profile.operator}
            </p>
            <p>
              <b>Regulatory status:</b> {profile.regulatory}
            </p>
            <p className="procedure-jurisdiction">
              Rules differ by state and by country. A product approved in one market may be unapproved in another, and the same device can be used within or outside its cleared indication.
            </p>
          </section>

          <section id="ask">
            <h2>Questions to ask before you pay a deposit</h2>
            <ol>{profile.ask.map((question) => <li key={question}>{question}</li>)}</ol>
            <p>
              <Link href="/guides/procedure-safety-checklist">Open the complete safety checklist →</Link>
            </p>
          </section>

          {profile.metrics?.length ? (
            <section id="use">
              <h2>Use and market context</h2>
              <p>Popularity measures use, not effectiveness or safety. Each figure carries its source and its main methodological limit.</p>
              <div className="procedure-metrics">
                {profile.metrics.map((metric) => (
                  <article key={metric.label}>
                    <b>{metric.value}</b>
                    <span>{metric.label}</span>
                    <small>
                      <em>{metric.source}.</em> {metric.caveat}
                    </small>
                  </article>
                ))}
              </div>
            </section>
          ) : null}

          {profile.updates?.length ? (
            <section className="update-log" aria-labelledby="updates-title">
              <h2 id="updates-title">Updates and corrections</h2>
              <ol>
                {profile.updates.map((update) => (
                  <li key={`${update.date}-${update.kind}`}>
                    <b>{update.kind === "correction" ? "Correction" : "Update"}</b>
                    <time dateTime={update.date}>{update.dateLabel}</time>
                    <p>{update.note}</p>
                  </li>
                ))}
              </ol>
            </section>
          ) : null}

          <section className="source-drawer" aria-labelledby="sources-title">
            <h2 id="sources-title">Sources on file</h2>
            <p>These links support the claims above. Reviewed {reviewedLabel}. Where a figure comes from a survey, the caveat is in the file, not in a footnote.</p>
            <ol>
              {profile.sources.map((source) => (
                <li key={source.url}>
                  <a href={source.url} rel="noreferrer" target="_blank">
                    {source.label} <span aria-hidden="true">↗</span>
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                  {source.published && <span>{source.published}</span>}
                </li>
              ))}
            </ol>
          </section>

          <p className="article-footer-note">
            Spot an error or a status change? <Link href="/corrections">Read how corrections and updates work →</Link>
          </p>
        </article>
      </div>

      {siblings.length > 0 && (
        <section className="procedure-siblings" aria-labelledby="siblings-title">
          <div>
            <span>Same family, different tradeoffs</span>
            <h2 id="siblings-title">Compare within {profile.category.toLowerCase()}</h2>
          </div>
          <ul>
            {siblings.map((item) => (
              <li key={item.slug}>
                <Link href={`/procedures/${item.slug}`}>
                  <span>{item.name}</span>
                  <small>
                    Grade {gradeDefinitions[item.evidenceGrade].code} · {item.cost} · {item.downtimeBand === "None" ? "No downtime" : `${item.downtimeBand} downtime`}
                  </small>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <RelatedFiles files={related} />
      <NewsletterPanel compact source="procedure" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </main>
  );
}
