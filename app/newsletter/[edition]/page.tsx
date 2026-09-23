import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EvidenceBadge } from "@/components/EvidenceBadge";
import { NewsletterPanel } from "@/components/NewsletterPanel";
import { newsletterIssues } from "@/content/newsletter";
import { NEWSLETTER } from "@/content/site";
import { siteUrl } from "@/lib/content";
import { getIssue, issueNumber, issuePath, issues, issueTitle } from "@/lib/newsletter";
import { breadcrumbs, canonical, metaDescription, schemaDate } from "@/lib/seo";

type Params = Promise<{ edition: string }>;

export function generateStaticParams() {
  return newsletterIssues.map((issue) => ({ edition: issue.date }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { edition } = await params;
  const issue = getIssue(edition);
  if (!issue) return {};
  return {
    title: issueTitle(issue),
    description: metaDescription(issue.preheader),
    alternates: canonical(issuePath(issue)),
    openGraph: { type: "article", title: issue.subject, description: issue.preheader, publishedTime: schemaDate(issue.date) },
  };
}

export default async function NewsletterIssuePage({ params }: { params: Params }) {
  const { edition } = await params;
  const issue = getIssue(edition);
  if (!issue) notFound();

  const base = siteUrl();
  const index = issues.indexOf(issue);
  const newer = issues[index - 1];
  const older = issues[index + 1];
  const schema = breadcrumbs(base, [
    { name: "Skin Considered", path: "/" },
    { name: NEWSLETTER.name, path: "/newsletter" },
    { name: issue.dateLabel, path: issuePath(issue) },
  ]);

  return (
    <main id="main-content" className="article-shell issue-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Link className="article-back" href="/newsletter">
        ← All issues of {NEWSLETTER.name}
      </Link>
      <header className="article-header issue-header">
        <p className="article-kicker">
          Issue {String(issueNumber(issue)).padStart(3, "0")} · <time dateTime={issue.date}>{issue.dateLabel}</time>
        </p>
        <h1>{issue.subject}</h1>
        <p className="article-dek">{issue.preheader}</p>
      </header>

      <div className="issue-body">
        {issue.intro.map((paragraph) => (
          <p className="issue-intro" key={paragraph}>
            {paragraph}
          </p>
        ))}

        {issue.sections.map((section) => (
          <section className="issue-section" key={section.heading} aria-labelledby={`issue-${section.heading.replace(/\W+/g, "-").toLowerCase()}`}>
            <h2 id={`issue-${section.heading.replace(/\W+/g, "-").toLowerCase()}`}>
              <span aria-hidden="true">{section.emoji}</span> {section.heading}
            </h2>
            {section.items.map((item) => (
              <article className="issue-item" key={item.href}>
                <h3>
                  {item.href.startsWith("/") ? <Link href={item.href}>{item.title}</Link> : <a href={item.href}>{item.title}</a>}{" "}
                  <span>({item.label})</span>
                </h3>
                {item.grade && <EvidenceBadge grade={item.grade} />}
                <p>{item.summary}</p>
              </article>
            ))}
          </section>
        ))}

        {issue.outro && <p className="issue-outro">{issue.outro}</p>}

        <nav className="issue-nav" aria-label="Other issues">
          {older ? <Link href={issuePath(older)}>← {older.dateLabel}</Link> : <span />}
          <a href={`${issuePath(issue)}/email`} rel="nofollow">
            Email version
          </a>
          {newer ? <Link href={issuePath(newer)}>{newer.dateLabel} →</Link> : <span />}
        </nav>
      </div>

      <NewsletterPanel compact source="issue" />
    </main>
  );
}
