import { newsletterIssues } from "@/content/newsletter";
import { getIssue } from "@/lib/newsletter";
import { renderIssueEmail } from "@/lib/newsletter-email";

// Issues are static content; render each once at build time.
export const dynamic = "force-static";

export function generateStaticParams() {
  return newsletterIssues.map((issue) => ({ edition: issue.date }));
}

/**
 * The email-safe HTML for an issue, ready to paste into or send through a
 * provider; the plain-text alternative lives at ./email/text. Not indexed:
 * the web version at /newsletter/[edition] is the canonical page.
 */
export async function GET(_request: Request, { params }: { params: Promise<{ edition: string }> }) {
  const { edition } = await params;
  const issue = getIssue(edition);
  if (!issue) return new Response("Not found", { status: 404 });

  return new Response(renderIssueEmail(issue), {
    headers: { "Content-Type": "text/html; charset=utf-8", "X-Robots-Tag": "noindex" },
  });
}
