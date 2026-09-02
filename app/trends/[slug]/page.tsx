import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EvidenceBadge } from "@/components/EvidenceBadge";
import { NewsletterPanel } from "@/components/NewsletterPanel";
import { RelatedFiles } from "@/components/RelatedFiles";
import { formatLongDate, getTrend, gradeDefinitions, lastUpdated, resolveRelated, siteUrl, trends } from "@/lib/content";
import { breadcrumbs, canonical, metaDescription } from "@/lib/seo";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return trends.map((trend) => ({ slug: trend.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const trend = getTrend(slug);
  if (!trend) return {};
  return {
    title: `${trend.name}: does it work?`,
    description: metaDescription(`Verdict: ${trend.verdict}. ${trend.whatItIs} The claim: ${trend.claim}`),
    alternates: canonical(`/trends/${trend.slug}`),
    openGraph: { type: "article", title: `${trend.name}: what the evidence says`, description: trend.claim, modifiedTime: lastUpdated(trend), section: "Trends" },
  };
}

export default async function TrendPage({ params }: { params: Params }) {
  const { slug } = await params;
  const trend = getTrend(slug);
  if (!trend) notFound();

  const base = siteUrl();
  const reviewedLabel = formatLongDate(trend.reviewed);
  const related = resolveRelated(trend.related);
  const siblings = trends.filter((item) => item.category === trend.category && item.slug !== trend.slug).slice(0, 4);
  const verdictClass = `verdict-${trend.verdict.toLowerCase().replace(/[^a-z]+/g, "-")}`;

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: `${trend.name}: does it work?`,
      description: trend.claim,
      dateModified: lastUpdated(trend),
      articleSection: "Trends",
      mainEntityOfPage: `${base}/trends/${trend.slug}`,
      author: { "@type": "Organization", name: "Skin Considered editorial desk" },
      publisher: { "@type": "Organization", name: "Skin Considered", url: base },
      citation: trend.sources.map((source) => source.url),
      isAccessibleForFree: true,
    },
    breadcrumbs(base, [
      { name: "Skin Considered", path: "/" },
      { name: "Trends", path: "/trends" },
      { name: trend.name, path: `/trends/${trend.slug}` },
    ]),
  ];

  return (
    <main id="main-content" className="trend-file">
      <Link className="article-back" href="/trends">
        ← All trends
      </Link>
      <header className="trend-file-header">
        <div className="article-kicker">
          <span>Trend / {trend.category}</span>
          <EvidenceBadge grade={trend.grade} />
        </div>
        <h1>{trend.name}</h1>
        <p className="article-dek">{trend.whatItIs}</p>
        <div className="article-trust" aria-label="File verification status">
          <span>
            <b aria-hidden="true">✓</b> Reviewed {reviewedLabel}
          </span>
          <span>
            {trend.sources.length} {trend.sources.length === 1 ? "source link" : "source links"} on file
          </span>
          <Link href="/methodology#grades">How grading works</Link>
          <Link href="/corrections">Report a correction</Link>
        </div>
      </header>

      <section className={`trend-verdict-banner ${verdictClass}`} aria-label="Verdict">
        <span>Our verdict</span>
        <b>{trend.verdict}</b>
        <p>
          Evidence grade {gradeDefinitions[trend.grade].code}: {gradeDefinitions[trend.grade].label.toLowerCase()}. The grade rates the evidence; the verdict also weighs cost and harm.
        </p>
      </section>

      <div className="trend-file-layout">
        <article className="article-body trend-body">
          <section id="claim">
            <h2>The claim</h2>
            <p>{trend.claim}</p>
          </section>
          <section id="evidence">
            <h2>What the evidence says</h2>
            <p>{trend.evidence}</p>
          </section>
          <section id="skip">
            <h2>Who should skip it</h2>
            <p>{trend.whoShouldSkip}</p>
          </section>
          {trend.tryInstead && (
            <section id="instead">
              <h2>What to do instead, or as well</h2>
              <p>{trend.tryInstead}</p>
            </section>
          )}
          {trend.updates?.length ? (
            <section className="update-log" aria-labelledby="updates-title">
              <h2 id="updates-title">Updates and corrections</h2>
              <ol>
                {trend.updates.map((update) => (
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
            <p>These links support the claims above. Reviewed {reviewedLabel}.</p>
            <ol>
              {trend.sources.map((source) => (
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
        </article>
        <aside className="article-aside">
          <div className="medical-note">
            <b>Not medical advice</b>
            <p>A trend verdict is general. Acne, rosacea, eczema, melasma, and pregnancy each change the answer; ask a clinician who has seen your skin.</p>
          </div>
          {siblings.length > 0 && (
            <nav className="article-toc" aria-label="More in this category">
              <h2>More {trend.category.toLowerCase()} trends</h2>
              <ol>
                {siblings.map((item) => (
                  <li key={item.slug}>
                    <Link href={`/trends/${item.slug}`}>{item.name}</Link>
                  </li>
                ))}
              </ol>
            </nav>
          )}
        </aside>
      </div>

      <RelatedFiles files={related} />
      <NewsletterPanel compact source="trend" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </main>
  );
}
