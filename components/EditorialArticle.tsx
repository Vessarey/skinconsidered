import Link from "next/link";
import { EvidenceBadge } from "./EvidenceBadge";
import { NewsletterPanel } from "./NewsletterPanel";
import { ReadingProgress } from "./ReadingProgress";
import { SignalVisual } from "./SignalVisual";
import type { EvidenceGrade, Source, StorySection } from "@/lib/content";

type EditorialArticleProps = {
  eyebrow: string;
  title: string;
  dek: string;
  meta: string[];
  grade?: EvidenceGrade;
  gradeLabel?: string;
  color?: "raspberry" | "cobalt" | "green" | "violet";
  sections: StorySection[];
  sources: Source[];
  limitation?: string;
  note?: string;
  backHref: string;
  backLabel: string;
  takeaways?: string[];
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
}: EditorialArticleProps) {
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
          {meta.map((item) => <span key={item}>{item}</span>)}
        </div>
      </header>

      <div className="article-lead-visual">
        <SignalVisual color={color} label={`Abstract editorial artwork for ${title}`} />
        <div>
          <span>{gradeLabel ?? "The considered signal"}</span>
          <p>{limitation ?? note ?? "Read the source, scope, and limitations before carrying the claim forward."}</p>
        </div>
      </div>

      <div className="article-layout">
        <aside className="article-aside">
          {takeaways ? (
            <div className="takeaway-box">
              <h2>Keep these</h2>
              <ol>
                {takeaways.map((takeaway) => <li key={takeaway}>{takeaway}</li>)}
              </ol>
            </div>
          ) : (
            <div className="disclosure-box">
              <h2>How to read this</h2>
              <p>We separate the event, the evidence, and our interpretation. Source links are primary or authoritative wherever available.</p>
            </div>
          )}
          <div className="medical-note">
            <b>Not medical advice</b>
            <p>Use this reporting to ask better questions. Diagnosis and treatment decisions need an appropriately qualified clinician.</p>
          </div>
        </aside>

        <article className="article-body">
          {sections.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.bullets && (
                <ul>
                  {section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                </ul>
              )}
            </section>
          ))}

          {note && <p className="article-note"><b>Archive note:</b> {note}</p>}

          <section className="source-drawer" aria-labelledby="sources-title">
            <h2 id="sources-title">Sources on file</h2>
            <ol>
              {sources.map((source) => (
                <li key={source.url}>
                  <a href={source.url} rel="noreferrer" target="_blank">
                    {source.label} <span aria-hidden="true">↗</span>
                  </a>
                  {source.published && <span>{source.published}</span>}
                </li>
              ))}
            </ol>
          </section>
        </article>
      </div>

      <NewsletterPanel compact />
    </main>
  );
}
