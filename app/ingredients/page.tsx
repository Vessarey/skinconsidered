import type { Metadata } from "next";
import Link from "next/link";
import { EvidenceBadge } from "@/components/EvidenceBadge";
import { NewsletterPanel } from "@/components/NewsletterPanel";
import { getGuide, gradeDefinitions, ingredientMentions, ingredients, type EvidenceGrade } from "@/lib/content";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Ingredient files",
  description: "What common skincare ingredients do, how strong the evidence is, what labels leave out, and where each one appears in our reporting.",
  alternates: canonical("/ingredients"),
};

const grades = Object.keys(gradeDefinitions) as EvidenceGrade[];

export default function IngredientsPage() {
  return (
    <main id="main-content">
      <header className="page-hero ingredient-hero">
        <div>
          <span>Ingredient files / {String(ingredients.length).padStart(2, "0")} on file</span>
          <h1>
            The name on the front is only the beginning.<sup>*</sup>
          </h1>
        </div>
        <p>We track the job, evidence, formulation variables, market rules, and tolerability questions behind the ingredient-of-the-week cycle.</p>
      </header>

      <section className="grade-key" aria-labelledby="grade-key-title">
        <div>
          <span>Reading key</span>
          <h2 id="grade-key-title">Our grades travel with the claim—not the ingredient.</h2>
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

      <section className="ingredient-index" aria-label="Ingredient files">
        {ingredients.map((ingredient, index) => {
          const guide = ingredient.guideSlug ? getGuide(ingredient.guideSlug) : undefined;
          const mentions = ingredientMentions(ingredient);
          const candidates = [
            ...(guide ? [{ href: `/guides/${guide.slug}`, label: `Guide ${guide.number}: ${guide.title}` }] : []),
            ...mentions.guides.map((item) => ({ href: `/guides/${item.slug}`, label: `Guide ${item.number}: ${item.title}` })),
            ...mentions.dispatches.map((item) => ({ href: `/dispatches/${item.slug}`, label: `${item.location}: ${item.shortHeadline}` })),
          ];
          const onFile = candidates.filter((item, position) => candidates.findIndex((other) => other.href === item.href) === position);

          return (
            <article id={ingredient.slug} key={ingredient.slug}>
              <div className="ingredient-number" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </div>
              <div className="ingredient-main">
                <div>
                  <span>{ingredient.family}</span>
                  <EvidenceBadge grade={ingredient.evidence} compact />
                </div>
                <h2>
                  <a href={`#${ingredient.slug}`}>{ingredient.name}</a>
                </h2>
                <p>{ingredient.summary}</p>
              </div>
              <div className="ingredient-jobs">
                <span>Jobs on file</span>
                <ul>
                  {ingredient.jobs.map((job) => (
                    <li key={job}>{job}</li>
                  ))}
                </ul>
              </div>
              <div className="ingredient-watch">
                <span>Watch for</span>
                <p>{ingredient.watchFor}</p>
                {onFile.length > 0 && (
                  <div className="ingredient-mentions">
                    <span>In our files</span>
                    <ul>
                      {onFile.map((item) => (
                        <li key={item.href}>
                          <Link href={item.href}>{item.label} ↗</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </section>
      <NewsletterPanel source="ingredients" />
    </main>
  );
}
