import Link from "next/link";
import type { AccentColor, EvidenceGrade, FileUpdate, Source, StorySection } from "@/content/types";
import { gradeDefinitions } from "@/content/site";
import { LAST_REVIEWED, slugify, type RelatedFile } from "@/lib/content";
import { EvidenceBadge } from "./EvidenceBadge";
import { NewsletterPanel } from "./NewsletterPanel";
import { ReadingProgress } from "./ReadingProgress";
import { RelatedFiles } from "./RelatedFiles";
import { SignalVisual } from "./SignalVisual";

type Ledger = {
  signal: string;
  whyItMatters: string;
  limitations: string;
};

type QuickReadItem = {
  label: string;
  text: string;
};

type EditorialArticleProps = {
  eyebrow: string;
  title: string;
  dek: string;
  meta: string[];
  grade?: EvidenceGrade;
  gradeLabel?: string;
  color?: AccentColor;
  sections: StorySection[];
  sources: Source[];
  limitation?: string;
  note?: string;
  backHref: string;
  backLabel: string;
  takeaways?: string[];
  ledger?: Ledger;
  related?: RelatedFile[];
  updates?: FileUpdate[];
  quickRead?: QuickReadItem[];
};

export function EditorialArticle({
  eyebrow,
  title,
  dek,
  meta,
  grade,
  gradeLabel,
  color = "raspberry",
  sections,
  sources,
  limitation,
  note,
  backHref,
  backLabel,
  takeaways,
  ledger,
  related = [],
  updates = [],
  quickRead,
}: EditorialArticleProps) {
  const headings = sections.map((section) => ({ id: slugify(section.heading), label: section.heading }));

  return (
    <main id="main-content" className="article-shell">
      <ReadingProgress />
      <Link className="article-back" href={backHref}>
        ← {backLabel}
      </Link>
      <header className="article-header">
        <div className="article-kicker">
          <span>{eyebrow}</span>
          {grade && <EvidenceBadge grade={grade} />}
        </div>
        <h1>{title}</h1>
        <p className="article-dek">{dek}</p>
        <div className="article-meta">
          {meta.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
        <div className="article-trust" aria-label="Article verification status">
          <span><b aria-hidden="true">✓</b> Sources rechecked {LAST_REVIEWED}</span>
          <span>{sources.length} {sources.length === 1 ? "source link" : "source links"} on file</span>
          <Link href="/methodology">How source strength works</Link>
          <Link href="/corrections">Report a correction</Link>
        </div>
      </header>

      {quickRead && quickRead.length > 0 && (
        <section className="article-quick-read" aria-labelledby="quick-read-title">
          <div>
            <span>New here?</span>
            <h2 id="quick-read-title">The 60-second version</h2>
          </div>
          <div className="quick-read-grid">
            {quickRead.map((item, index) => (
              <article key={item.label}>
                <span>0{index + 1}</span>
                <h3>{item.label}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>
      )}

      <div className="article-lead-visual">
        <SignalVisual color={color} label={`Abstract editorial artwork for ${title}`} />
        <div>
          <span>{gradeLabel ?? "The considered signal"}</span>
          <p>{limitation ?? note ?? "Read the source, scope, and limitations before carrying the claim forward."}</p>
        </div>
      </div>

      <div className="article-layout">
        <aside className="article-aside">
          {ledger && grade ? (
            <div className="ledger-box">
              <h2>The evidence grade</h2>
              <dl>
                <div>
                  <dt>This claim</dt>
                  <dd>
                    <b>{gradeDefinitions[grade].code}</b> {gradeDefinitions[grade].label}. {ledger.signal}.
                  </dd>
                </div>
                <div>
                  <dt>What the grade means</dt>
                  <dd>{gradeDefinitions[grade].description}</dd>
                </div>
                <div>
                  <dt>What it does not mean</dt>
                  <dd>
                    A verdict on the ingredient, brand, country, or category. Grades travel with the exact claim.{" "}
                    <Link href={`/methodology#grade-${grade.toLowerCase()}`}>How grading works →</Link>
                  </dd>
                </div>
              </dl>
            </div>
          ) : takeaways ? (
            <div className="takeaway-box">
              <h2>Keep these</h2>
              <ol>
                {takeaways.map((takeaway) => (
                  <li key={takeaway}>{takeaway}</li>
                ))}
              </ol>
            </div>
          ) : (
            <div className="disclosure-box">
              <h2>How to read this</h2>
              <p>We separate the event, the evidence, and our interpretation. Source links are primary or authoritative wherever available.</p>
            </div>
          )}

          {headings.length > 1 && (
            <nav className="article-toc" aria-label="In this file">
              <h2>In this file</h2>
              <ol>
                {headings.map((heading) => (
                  <li key={heading.id}>
                    <a href={`#${heading.id}`}>{heading.label}</a>
                  </li>
                ))}
                <li>
                  <a href="#sources-title">Sources on file</a>
                </li>
              </ol>
            </nav>
          )}

          <div className="medical-note">
            <b>Not medical advice</b>
            <p>Use this reporting to ask better questions. Diagnosis and treatment decisions need an appropriately qualified clinician.</p>
          </div>
        </aside>

        <article className="article-body">
          {sections.map((section) => (
            <section key={section.heading} id={slugify(section.heading)}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.bullets && (
                <ul>
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          {note && (
            <p className="article-note">
              <b>Archive note:</b> {note}
            </p>
          )}

          {updates.length > 0 && (
            <section className="update-log" aria-labelledby="updates-title">
              <h2 id="updates-title">Updates and corrections</h2>
              <ol>
                {updates.map((update) => (
                  <li key={`${update.date}-${update.kind}`}>
                    <b>{update.kind === "correction" ? "Correction" : "Update"}</b>
                    <time dateTime={update.date}>{update.dateLabel}</time>
                    <p>{update.note}</p>
                  </li>
                ))}
              </ol>
            </section>
          )}

          <section className="source-drawer" aria-labelledby="sources-title">
            <h2 id="sources-title">Open the source file</h2>
            <p>These links support the claims above. We rechecked them on {LAST_REVIEWED}; disclosures and limits are summarized in the article.</p>
            <ol>
              {sources.map((source) => (
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

      <RelatedFiles files={related} />

      <NewsletterPanel compact />
    </main>
  );
}
