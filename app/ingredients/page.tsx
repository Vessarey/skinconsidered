import type { Metadata } from "next";
import Link from "next/link";
import { EvidenceBadge } from "@/components/EvidenceBadge";
import { NewsletterPanel } from "@/components/NewsletterPanel";
import { concernGuideEntries, gradeDefinitions, ingredientFamilies, ingredients, resolveRelated, type EvidenceGrade } from "@/lib/content";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Topicals: prescription, OTC, and cosmetic skincare ingredients",
  description:
    "Tretinoin, azelaic acid, benzoyl peroxide, hydroquinone, niacinamide, and more: U.S. status, strengths, evidence by use, side effects, and access.",
  alternates: canonical("/ingredients"),
};

const grades = Object.keys(gradeDefinitions) as EvidenceGrade[];

const statusShort: Record<string, string> = {
  "Prescription (U.S.)": "Rx",
  "OTC drug (U.S.)": "OTC drug",
  "OTC drug or prescription (U.S.)": "OTC / Rx",
  "Cosmetic ingredient": "Cosmetic",
  "Prescription or cosmetic (U.S.)": "Rx / cosmetic",
};

export default function IngredientsPage() {
  const rx = ingredients.filter((item) => item.status.startsWith("Prescription")).length;
  const otc = ingredients.filter((item) => item.status.startsWith("OTC")).length;
  const cosmetic = ingredients.filter((item) => item.status === "Cosmetic ingredient").length;

  return (
    <main id="main-content">
      <header className="page-hero ingredient-hero">
        <div>
          <span>Topicals / {String(ingredients.length).padStart(2, "0")} files</span>
          <h1>
            The name on the front is only the beginning.<sup>*</sup>
          </h1>
        </div>
        <p>
          Prescription, over-the-counter, and cosmetic ingredients people are actually using, each with its U.S. status, the strengths sold, evidence graded per use,
          how to use it, side effects, cautions, and what drives the price.
        </p>
      </header>

      <section className="topical-snapshot" aria-label="Topicals snapshot">
        <div>
          <b>{rx}</b>
          <span>Prescription or prescription-strength files</span>
        </div>
        <div>
          <b>{otc}</b>
          <span>OTC drug files (FDA monograph or approved switch)</span>
        </div>
        <div>
          <b>{cosmetic}</b>
          <span>Cosmetic ingredient files, no premarket review</span>
        </div>
        <div>
          <b>Per use</b>
          <span>Every grade belongs to a claim, not to the ingredient</span>
        </div>
      </section>

      <section className="concern-guide" aria-labelledby="concern-guide-title">
        <div className="concern-guide-intro">
          <span>Start with your concern</span>
          <h2 id="concern-guide-title">The best topicals for each concern, by name.</h2>
          <p>
            First-line means the ingredients with the strongest evidence for that concern; also useful means supporting actives or prescription step-ups. Each name
            opens the full file with status, strengths, and sources.
          </p>
        </div>
        <div className="concern-grid">
          {concernGuideEntries().map((guide) => {
            const related = resolveRelated(guide.related);
            return (
              <article id={`concern-${guide.slug}`} key={guide.slug}>
                <h3>{guide.name}</h3>
                <p>{guide.summary}</p>
                <div className="concern-block">
                  <span>First line</span>
                  <ul>
                    {guide.firstLine.map((item) => (
                      <li key={item.ingredient}>
                        <Link href={`/ingredients/${item.ingredient}`}>
                          <b>{item.file?.name}</b>
                          <small>{statusShort[item.file?.status ?? ""] ?? item.file?.status}</small>
                        </Link>
                        <p>{item.why}</p>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="concern-block">
                  <span>Also useful</span>
                  <ul>
                    {guide.alsoUseful.map((item) => (
                      <li key={item.ingredient}>
                        <Link href={`/ingredients/${item.ingredient}`}>
                          <b>{item.file?.name}</b>
                          <small>{statusShort[item.file?.status ?? ""] ?? item.file?.status}</small>
                        </Link>
                        <p>{item.why}</p>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="concern-block concern-skip">
                  <span>Skip</span>
                  <ul>
                    {guide.skip.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <p className="concern-clinician">
                  <b>See a clinician if</b> {guide.seeClinician}
                </p>
                {related.length > 0 && (
                  <p className="concern-related">
                    {related.map((file, index) => (
                      <span key={file.href}>
                        {index > 0 && " · "}
                        <Link href={file.href}>
                          {file.kind}: {file.title}
                        </Link>
                      </span>
                    ))}
                  </p>
                )}
              </article>
            );
          })}
        </div>
      </section>

      <section className="grade-key" aria-labelledby="grade-key-title">
        <div>
          <span>Reading key</span>
          <h2 id="grade-key-title">Our grades travel with the claim, not the ingredient.</h2>
        </div>
        <div>
          {grades.map((grade) => (
            <article key={grade}>
              <EvidenceBadge grade={grade} compact />
              <h3>{gradeDefinitions[grade].label}</h3>
              <p>{gradeDefinitions[grade].description}</p>
            </article>
          ))}
        </div>
      </section>

      {ingredientFamilies.map((family) => {
        const group = ingredients.filter((item) => item.family === family);
        return (
          <section className="topical-family" aria-labelledby={`family-${family.replace(/[^a-z]+/gi, "-").toLowerCase()}`} key={family}>
            <div className="topical-family-heading">
              <h2 id={`family-${family.replace(/[^a-z]+/gi, "-").toLowerCase()}`}>{family}</h2>
              <span>
                {group.length} {group.length === 1 ? "file" : "files"}
              </span>
            </div>
            <ul className="topical-list">
              {group.map((ingredient) => (
                <li key={ingredient.slug} id={ingredient.slug}>
                  <div className="topical-card-top">
                    <span className="topical-status">{statusShort[ingredient.status] ?? ingredient.status}</span>
                    <EvidenceBadge compact grade={ingredient.evidence} />
                  </div>
                  <h3>
                    <Link href={`/ingredients/${ingredient.slug}`}>{ingredient.name}</Link>
                  </h3>
                  <p>{ingredient.summary}</p>
                  <dl className="topical-scan">
                    <div>
                      <dt>Best for</dt>
                      <dd>{ingredient.jobs.slice(0, 3).join(" · ")}</dd>
                    </div>
                    <div>
                      <dt>Watch for</dt>
                      <dd>{ingredient.watchFor}</dd>
                    </div>
                  </dl>
                  <ul className="topical-use-grades" aria-label="Evidence by use">
                    {ingredient.uses.slice(0, 3).map((use) => (
                      <li key={use.use}>
                        <b>{gradeDefinitions[use.grade].code}</b> {use.use}
                      </li>
                    ))}
                  </ul>
                  <Link className="topical-open" href={`/ingredients/${ingredient.slug}`}>
                    Open the file: forms, how to use, side effects, access, sources →
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        );
      })}

      <NewsletterPanel source="ingredients" />
    </main>
  );
}
