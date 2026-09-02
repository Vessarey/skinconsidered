import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EvidenceBadge } from "@/components/EvidenceBadge";
import { NewsletterPanel } from "@/components/NewsletterPanel";
import { RelatedFiles } from "@/components/RelatedFiles";
import { TreatmentDepthFigure } from "@/components/TreatmentDepthFigure";
import {
  concernGuides,
  formatLongDate,
  getGuide,
  getIngredient,
  gradeDefinitions,
  ingredientMentions,
  ingredientTargets,
  ingredients,
  lastUpdated,
  resolveRelated,
  siteUrl,
} from "@/lib/content";
import { breadcrumbs, canonical, metaDescription, schemaDate } from "@/lib/seo";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return ingredients.map((ingredient) => ({ slug: ingredient.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const ingredient = getIngredient(slug);
  if (!ingredient) return {};
  return {
    title: `${ingredient.name}: uses, strength, evidence, and side effects`,
    description: metaDescription(`${ingredient.status}. ${ingredient.summary}`),
    alternates: canonical(`/ingredients/${ingredient.slug}`),
    openGraph: { type: "article", title: `${ingredient.name} — the topical file`, description: ingredient.summary, modifiedTime: schemaDate(lastUpdated(ingredient)), section: "Topicals" },
  };
}

export default async function IngredientPage({ params }: { params: Params }) {
  const { slug } = await params;
  const ingredient = getIngredient(slug);
  if (!ingredient) notFound();

  const base = siteUrl();
  const reviewedLabel = formatLongDate(ingredient.reviewed);
  const guide = ingredient.guideSlug ? getGuide(ingredient.guideSlug) : undefined;
  const mentions = ingredientMentions(ingredient);
  const related = resolveRelated(ingredient.related);
  const siblings = ingredients.filter((item) => item.family === ingredient.family && item.slug !== ingredient.slug);

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: `${ingredient.name}: uses, strength, evidence, and side effects`,
      description: ingredient.summary,
      dateModified: schemaDate(lastUpdated(ingredient)),
      articleSection: "Topicals",
      mainEntityOfPage: `${base}/ingredients/${ingredient.slug}`,
      image: [`${base}/ingredients/${ingredient.slug}/opengraph-image`],
      author: { "@type": "Organization", name: "Skin Considered editorial desk", url: `${base}/about` },
      publisher: { "@type": "Organization", name: "Skin Considered", url: base, logo: { "@type": "ImageObject", url: `${base}/apple-icon` } },
      citation: ingredient.sources.map((source) => source.url),
      isAccessibleForFree: true,
    },
    breadcrumbs(base, [
      { name: "Skin Considered", path: "/" },
      { name: "Topicals", path: "/ingredients" },
      { name: ingredient.name, path: `/ingredients/${ingredient.slug}` },
    ]),
  ];

  return (
    <main id="main-content" className="topical-file">
      <Link className="article-back" href="/ingredients">
        ← All topicals
      </Link>
      <header className="topical-file-header">
        <div className="article-kicker">
          <span>
            {ingredient.family} / {ingredient.status}
          </span>
          <EvidenceBadge grade={ingredient.evidence} />
        </div>
        <h1>{ingredient.name}</h1>
        <p className="article-dek">{ingredient.summary}</p>
        <div className="article-trust" aria-label="File verification status">
          <span>
            <b aria-hidden="true">✓</b> Reviewed {reviewedLabel}
          </span>
          <span>
            {ingredient.sources.length} {ingredient.sources.length === 1 ? "source link" : "source links"} on file
          </span>
          <Link href="/methodology#grades">How grading works</Link>
          <Link href="/corrections">Report a correction</Link>
        </div>
      </header>

      <section className="topical-essentials" aria-labelledby="topical-essentials-title">
        <h2 id="topical-essentials-title">At a glance</h2>
        <dl>
          <div>
            <dt>U.S. status</dt>
            <dd>{ingredient.status}</dd>
          </div>
          <div>
            <dt>Jobs</dt>
            <dd>{ingredient.jobs.join(" · ")}</dd>
          </div>
          <div>
            <dt>Watch for</dt>
            <dd>{ingredient.watchFor}</dd>
          </div>
          <div>
            <dt>Access</dt>
            <dd>{ingredient.access}</dd>
          </div>
        </dl>
      </section>

      <section className="procedure-figure" aria-label="Where the ingredient acts">
        <TreatmentDepthFigure targets={ingredientTargets(ingredient)} title={`Where ${ingredient.name.toLowerCase()} acts in the skin`} />
        {concernGuides.some((guide) => [...guide.firstLine, ...guide.alsoUseful].some((item) => item.ingredient === ingredient.slug)) && (
          <div className="topical-concerns">
            <span>Listed for</span>
            <ul>
              {concernGuides
                .filter((guide) => [...guide.firstLine, ...guide.alsoUseful].some((item) => item.ingredient === ingredient.slug))
                .map((guide) => (
                  <li key={guide.slug}>
                    <Link href={`/ingredients#concern-${guide.slug}`}>
                      {guide.name}
                      {guide.firstLine.some((item) => item.ingredient === ingredient.slug) ? " · first line" : ""}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        )}
      </section>

      <div className="topical-file-layout">
        <aside className="article-aside">
          <div className="ledger-box">
            <h2>Evidence by use</h2>
            <dl className="topical-uses">
              {ingredient.uses.map((use) => (
                <div key={use.use}>
                  <dt>
                    <b>{gradeDefinitions[use.grade].code}</b> {use.use}
                  </dt>
                  <dd>{use.note}</dd>
                </div>
              ))}
            </dl>
            <p>
              <Link href="/methodology#grades">How grading works →</Link>
            </p>
          </div>
          <nav className="article-toc" aria-label="In this file">
            <h2>In this file</h2>
            <ol>
              <li><a href="#forms">Forms and strengths</a></li>
              <li><a href="#how">How to use it</a></li>
              <li><a href="#effects">Side effects and cautions</a></li>
              <li><a href="#regulatory">Regulatory status</a></li>
              {ingredient.trendNote && <li><a href="#trend">In the trends</a></li>}
              <li><a href="#sources-title">Sources on file</a></li>
            </ol>
          </nav>
          <div className="medical-note">
            <b>Not medical advice</b>
            <p>Prescription topicals need a prescriber who knows your history; pregnancy, other medications, and diagnosed conditions change what is safe.</p>
          </div>
        </aside>

        <article className="article-body topical-body">
          <section id="forms">
            <h2>Forms and strengths</h2>
            <ul>{ingredient.forms.map((form) => <li key={form}>{form}</li>)}</ul>
          </section>
          <section id="how">
            <h2>How to use it</h2>
            <p>{ingredient.howToUse}</p>
          </section>
          <section id="effects">
            <h2>Side effects and cautions</h2>
            <ul>{ingredient.sideEffects.map((effect) => <li key={effect}>{effect}</li>)}</ul>
            <div className="procedure-pause">
              <b>Get advice first if</b>
              <p>{ingredient.cautions}</p>
            </div>
          </section>
          <section id="regulatory">
            <h2>Regulatory status</h2>
            <p>{ingredient.regulatory}</p>
          </section>
          {ingredient.trendNote && (
            <section id="trend">
              <h2>In the trends</h2>
              <p>{ingredient.trendNote}</p>
            </section>
          )}
          {(guide || mentions.guides.length > 0 || mentions.dispatches.length > 0) && (
            <section id="in-our-files">
              <h2>In our files</h2>
              <ul>
                {guide && (
                  <li>
                    <Link href={`/guides/${guide.slug}`}>Guide {guide.number}: {guide.title}</Link>
                  </li>
                )}
                {mentions.guides.map((item) => (
                  <li key={item.slug}>
                    <Link href={`/guides/${item.slug}`}>Guide {item.number}: {item.title}</Link>
                  </li>
                ))}
                {mentions.dispatches.map((item) => (
                  <li key={item.slug}>
                    <Link href={`/dispatches/${item.slug}`}>{item.location}: {item.shortHeadline}</Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
          {ingredient.updates?.length ? (
            <section className="update-log" aria-labelledby="updates-title">
              <h2 id="updates-title">Updates and corrections</h2>
              <ol>
                {ingredient.updates.map((update) => (
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
            <p>These links support the claims above. Reviewed {reviewedLabel}. Drug labels link to DailyMed searches so the current label is always one click away.</p>
            <ol>
              {ingredient.sources.map((source) => (
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
      </div>

      {siblings.length > 0 && (
        <section className="procedure-siblings" aria-labelledby="siblings-title">
          <div>
            <span>Same family</span>
            <h2 id="siblings-title">Other {ingredient.family.toLowerCase()}</h2>
          </div>
          <ul>
            {siblings.map((item) => (
              <li key={item.slug}>
                <Link href={`/ingredients/${item.slug}`}>
                  <span>{item.name}</span>
                  <small>
                    Grade {gradeDefinitions[item.evidence].code} · {item.status}
                  </small>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <RelatedFiles files={related} />
      <NewsletterPanel compact source="topical" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </main>
  );
}
