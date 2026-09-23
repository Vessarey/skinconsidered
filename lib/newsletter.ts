import { newsletterIssues, type NewsletterIssue } from "@/content/newsletter";
import { NEWSLETTER } from "@/content/site";
import { siteUrl } from "@/lib/content";

/**
 * Server-side newsletter status. The form tells readers up front whether a
 * provider is connected, so nobody types an address into a form that discards it
 * without knowing. Either a generic webhook or a Buttondown API key counts.
 */
export function newsletterConfigured() {
  return Boolean(process.env.NEWSLETTER_WEBHOOK_URL?.trim() || process.env.BUTTONDOWN_API_KEY?.trim());
}

export const issues: NewsletterIssue[] = newsletterIssues.slice().sort((a, b) => b.date.localeCompare(a.date));

export function getIssue(date: string) {
  return issues.find((issue) => issue.date === date);
}

export function issueNumber(issue: NewsletterIssue) {
  return issues.length - issues.indexOf(issue);
}

/**
 * Links inside the email carry UTM parameters so PostHog page views and Search
 * Console can attribute traffic to a specific issue. Site paths become absolute;
 * external primary sources are left untouched.
 */
export function issueLink(issue: NewsletterIssue, href: string) {
  if (!href.startsWith("/")) return href;
  const url = new URL(href, siteUrl());
  url.searchParams.set("utm_source", "newsletter");
  url.searchParams.set("utm_medium", "email");
  url.searchParams.set("utm_campaign", issue.date);
  return url.toString();
}

export function issuePath(issue: NewsletterIssue) {
  return `/newsletter/${issue.date}`;
}

export function issueTitle(issue: NewsletterIssue) {
  return `${NEWSLETTER.name} — ${issue.dateLabel}`;
}
