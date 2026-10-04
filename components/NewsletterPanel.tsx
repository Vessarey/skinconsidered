import { NEWSLETTER } from "@/content/site";
import { issuePath, issues, newsletterConfigured } from "@/lib/newsletter";
import { NewsletterForm } from "./NewsletterForm";

export function NewsletterPanel({ compact = false, source, headingLevel = 2 }: { compact?: boolean; source?: string; headingLevel?: 1 | 2 }) {
  const placement = source ?? (compact ? "article" : "homepage");
  const headingId = "newsletter-title-" + placement;
  const configured = newsletterConfigured();
  const Heading = headingLevel === 1 ? "h1" : "h2";

  return (
    <section className={"newsletter-panel" + (compact ? " compact" : "")} aria-labelledby={headingId} data-source={placement}>
      <div>
        <span>{NEWSLETTER.name}</span>
        <Heading id={headingId}>{compact ? "Make sense of the next skincare headline." : "Less noise. More perspective."}</Heading>
        <p>A short briefing on skincare news, research, and procedures. What matters, why it matters, and the sources behind it.</p>
      </div>
      <NewsletterForm configured={configured} source={placement} previewHref={issues[0] ? issuePath(issues[0]) : "/today"} />
    </section>
  );
}
