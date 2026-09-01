import { NewsletterForm } from "./NewsletterForm";

export function NewsletterPanel({ compact = false, source }: { compact?: boolean; source?: string }) {
  const headingId = compact ? "newsletter-title-compact" : "newsletter-title";

  return (
    <section className={`newsletter-panel ${compact ? "compact" : ""}`} aria-labelledby={headingId}>
      <div>
        <span>The Sunday Considered</span>
        <h2 id={headingId}>
          Every study that mattered, weighed in one email.<sup>*</sup>
        </h2>
      </div>
      <div>
        <p>Global regulation, procedures, ingredient evidence, and one enduring guide—without launch-day hype.</p>
        <NewsletterForm source={source ?? (compact ? "article" : "homepage")} />
      </div>
    </section>
  );
}
