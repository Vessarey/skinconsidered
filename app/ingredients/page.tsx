import type { Metadata } from "next";
import Link from "next/link";
import { EvidenceBadge } from "@/components/EvidenceBadge";
import { NewsletterPanel } from "@/components/NewsletterPanel";
import { gradeDefinitions, ingredients } from "@/lib/content";

export const metadata: Metadata = {
  title: "Ingredient files",
  description: "What common skincare ingredients do, how strong the evidence is, and what labels leave out.",
};

export default function IngredientsPage() {
  return (
    <main id="main-content">
      <header className="page-hero ingredient-hero">
        <div>
          <span>Ingredient files / living index</span>
          <h1>The name on the front is only the beginning.<sup>*</sup></h1>
        </div>
        <p>We track the job, evidence, formulation variables, market rules, and tolerability questions behind the ingredient-of-the-week cycle.</p>
      </header>

      <section className="grade-key" aria-labelledby="grade-key-title">
        <div>
          <span>Reading key</span>
          <h2 id="grade-key-title">Our grades travel with the claim—not the ingredient.</h2>
        </div>
        <div>
          {(Object.entries(gradeDefinitions) as [keyof typeof gradeDefinitions, (typeof gradeDefinitions)[keyof typeof gradeDefinitions]][]).map(([grade, definition]) => (
            <article key={grade}>
              <EvidenceBadge grade={grade} compact />
              <h3>{definition.label}</h3>
              <p>{definition.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="ingredient-index" aria-label="Ingredient files">
        {ingredients.map((ingredient, index) => (
          <article id={ingredient.slug} key={ingredient.slug}>
            <div className="ingredient-number">{String(index + 1).padStart(2, "0")}</div>
            <div className="ingredient-main">
              <div>
                <span>{ingredient.family}</span>
                <EvidenceBadge grade={ingredient.evidence} compact />
              </div>
              <h2>{ingredient.name}</h2>
              <p>{ingredient.summary}</p>
            </div>
            <div className="ingredient-jobs">
              <span>Jobs on file</span>
              <ul>{ingredient.jobs.map((job) => <li key={job}>{job}</li>)}</ul>
            </div>
            <div className="ingredient-watch">
              <span>Watch for</span>
              <p>{ingredient.watchFor}</p>
              {ingredient.guideSlug && <Link href={`/guides/${ingredient.guideSlug}`}>Open full guide ↗</Link>}
            </div>
          </article>
        ))}
      </section>
      <NewsletterPanel />
    </main>
  );
}
