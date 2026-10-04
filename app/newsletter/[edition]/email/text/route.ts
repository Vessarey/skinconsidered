import { newsletterIssues } from "@/content/newsletter";
import { getIssue } from "@/lib/newsletter";
import { renderIssueText } from "@/lib/newsletter-email";

export const dynamic = "force-static";

export function generateStaticParams() {
  return newsletterIssues.map((issue) => ({ edition: issue.date }));
}

/** Plain-text alternative of the issue email, for providers that ask for one. */
export async function GET(_request: Request, { params }: { params: Promise<{ edition: string }> }) {
  const { edition } = await params;
  const issue = getIssue(edition);
  if (!issue) return new Response("Not found", { status: 404 });
  return new Response(renderIssueText(issue), { headers: { "Content-Type": "text/plain; charset=utf-8", "X-Robots-Tag": "noindex" } });
}
