import { NEWSLETTER } from "@/content/site";
import { newsletterConfigured } from "@/lib/newsletter";
import { NewsletterForm } from "./NewsletterForm";

export function NewsletterPanel({ compact = false, source }: { compact?: boolean; source?: string }) {
  const headingId = `newsletter-title-${source ?? (compact ? "compact" : "panel")}`;
  const configured = newsletterConfigured();

  return (
    <section className={`newsletter-panel ${compact ? "compact" : ""}`} aria-labelledby={headingId}>
      <div>
        <span>{NEWSLETTER.name}</span>
        <h2 id={headingId}>
          {compact ? "Get the next one weighed, not hyped." : "What changed, how much to trust it, and what to do."}
          <sup>*</sup>
        </h2>
        {!compact && (
          <ul className="newsletter-bullets">
            {NEWSLETTER.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        )}
      </div>
      <div>
        <p>{compact ? `${NEWSLETTER.cadence}. ${NEWSLETTER.promise}` : NEWSLETTER.promise}</p>
        <NewsletterForm configured={configured} source={source ?? (compact ? "article" : "homepage")} />
      </div>
    </section>
  );
}
