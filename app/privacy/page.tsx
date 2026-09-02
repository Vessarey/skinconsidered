import type { Metadata } from "next";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Privacy",
  description: "Skin Considered privacy posture for the preview edition.",
  alternates: canonical("/privacy"),
};

export default function PrivacyPage() {
  return (
    <main id="main-content" className="policy-page">
      <header>
        <span>Privacy / preview edition</span>
        <h1>Collect less. Explain the rest.</h1>
      </header>
      <div className="policy-layout">
        <aside>
          <p>No advertising pixels. Page-view counts are collected without cookies or cross-site identifiers; details below.</p>
        </aside>
        <article>
          <h2 id="newsletter">Newsletter</h2>
          <p>
            The Daily Considered form stays in preview mode, and says so on every placement, unless a configured subscriber webhook is present. In preview
            mode the address you type is validated and then discarded; it is not written to any store. When a provider is connected, the email address and
            the signup source (for example “homepage”, “procedures”, or “footer”) will be sent to that provider, which must run double opt-in. A production
            policy must name the provider, purpose, retention, and deletion process before launch. Sending cadence is one weekday email plus a Sunday
            synthesis; unsubscribe is one click.
          </p>
          <p>
            The form also contains a hidden anti-spam field that people never see. Submissions that fill it are discarded without being forwarded.
          </p>
          <h2>Analytics</h2>
          <p>
            The site uses two measurement tools, both configured to collect as little as possible. Vercel Web Analytics counts page views and referrers with
            no cookies and no stored IP addresses. PostHog records the following aggregate events: page views and page exits with scroll depth, browser
            performance timings (Core Web Vitals), whether a newsletter panel was shown and whether a submission succeeded (never the address typed), clicks
            on source links (the destination domain only), clicks on related-file links and main buttons, which comparison filters were used on the procedures
            page, which procedure rows were opened, and whether an archive search returned results (the number of results only, never the words you typed).
            It is configured without cookies (a random identifier is kept in your browser&apos;s local storage), without session recording, without automatic
            click or form capture, and it honors your browser&apos;s Do Not Track setting. We use these counts to see which files readers open, where they
            arrive from, which pages lead to a signup, and whether sources get read. We do not collect skincare concerns or health information.
          </p>
          <h2>Advertising and affiliates</h2>
          <p>
            None are active. If introduced, commercial relationships must be labeled at the placement and must not influence evidence grades, corrections,
            or editorial inclusion.
          </p>
        </article>
      </div>
    </main>
  );
}
