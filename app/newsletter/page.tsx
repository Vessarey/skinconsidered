import type { Metadata } from "next";
import Link from "next/link";
import { NewsletterPanel } from "@/components/NewsletterPanel";
import { NEWSLETTER } from "@/content/site";
import { issueNumber, issuePath, issues } from "@/lib/newsletter";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: `${NEWSLETTER.name} — the skincare newsletter, weighed`,
  description: "A clear skincare briefing on safety, research, ingredients, and procedures. Read The Daily Considered with sources and evidence limits in view.",
  alternates: canonical("/newsletter"),
};

export default function NewsletterPage() {
  return (
    <main id="main-content">
      <NewsletterPanel source="newsletter" headingLevel={1} />

      <section className="issue-archive" aria-labelledby="issue-archive-title">
        <p className="result-count" id="issue-archive-title">
          {issues.length} {issues.length === 1 ? "issue to explore" : "issues to explore"}
        </p>
        {issues.map((issue) => (
          <article className="dispatch-row" key={issue.date}>
            <span className="dispatch-index">{String(issueNumber(issue)).padStart(3, "0")}</span>
            <div>
              <p className="dispatch-meta">
                <time dateTime={issue.date}>{issue.dateLabel}</time>
              </p>
              <h2>
                <Link href={issuePath(issue)}>{issue.subject}</Link>
              </h2>
              <p>{issue.preheader}</p>
            </div>
            <div className="dispatch-signal">
              <span>
                {issue.sections.reduce((total, section) => total + section.items.length, 0)} items · {issue.sections.map((section) => section.heading).join(" / ")}
              </span>
              <Link href={issuePath(issue)} aria-label={`Read the ${issue.dateLabel} issue`}>
                →
              </Link>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
