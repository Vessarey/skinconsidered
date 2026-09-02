import Link from "next/link";
import { EDITION, LAST_REVIEWED, NEWSLETTER, primaryNav } from "@/content/site";
import { newsletterConfigured } from "@/lib/newsletter";
import { NewsletterForm } from "./NewsletterForm";

export function SiteFooter() {
  const configured = newsletterConfigured();

  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <Link className="footer-wordmark" href="/">
          skin considered<span aria-hidden="true">*</span>
        </Link>
        <p>Independent skincare reporting and education. Not medical advice. No affiliate links, no sponsored grades.</p>
      </div>

      <nav className="footer-nav" aria-label="Desks">
        <h2>Desks</h2>
        {primaryNav.map((item) => (
          <Link href={item.href} key={item.href}>
            {item.label}
          </Link>
        ))}
        <Link href="/search">Search</Link>
      </nav>

      <nav className="footer-nav" aria-label="About the publication">
        <h2>The publication</h2>
        <Link href="/about">About</Link>
        <Link href="/methodology">Methodology</Link>
        <Link href="/coverage">Coverage &amp; sources</Link>
        <Link href="/corrections">Corrections</Link>
        <Link href="/privacy">Privacy</Link>
        <a href="/rss.xml">RSS feed</a>
      </nav>

      <div className="footer-newsletter">
        <h2>{NEWSLETTER.name}</h2>
        <NewsletterForm configured={configured} source="footer" />
      </div>

      <div className="footer-meta">
        <span>
          Edition Vol.{EDITION.volume} / No.{EDITION.number} · Sources last reviewed {LAST_REVIEWED}
        </span>
        <span>© 2026 Skin Considered</span>
      </div>
    </footer>
  );
}
