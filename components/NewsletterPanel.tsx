import { NewsletterForm } from "./NewsletterForm";

export function NewsletterPanel({ compact = false }: { compact?: boolean }) {
  return (
    <section className={`newsletter-panel ${compact ? "compact" : ""}`} aria-labelledby="newsletter-title">
      <div>
        <span>The Sunday Considered</span>
        <h2 id="newsletter-title">Every study that mattered, weighed in one email.<sup>*</sup></h2>
      </div>
      <div>
        <p>Global regulation, procedures, ingredient evidence, and one enduring guide—without launch-day hype.</p>
        <NewsletterForm source={compact ? "article" : "homepage"} />
      </div>
    </section>
  );
}
