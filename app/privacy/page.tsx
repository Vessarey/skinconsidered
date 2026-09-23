import type { Metadata } from "next";
import Link from "next/link";
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
            While The Daily Considered is in preview, signup placements link to a sample issue and do not ask for your address. When email subscriptions
            become available, the email address and
            the signup source (for example “homepage”, “procedures”, or “footer”) are sent to that provider, which runs double opt-in: nothing is sent until
            you confirm from your inbox. The supported provider is Buttondown (buttondown.com), used to store your address, signup source, and delivery
            records, and to send the newsletter; the address is deleted from it when you unsubscribe. Links in each email carry a campaign tag so we can
            count which issue sent a reader to a file; we do not track opens per person. Sending cadence is one weekday email plus a Sunday synthesis;
            unsubscribe is one click. Past issues are public at <Link href="/newsletter">/newsletter</Link>.
          </p>
          <p>
            The form also contains a hidden anti-spam field that people never see. Submissions that fill it are discarded without being forwarded.
          </p>
          <h2>Analytics</h2>
          <p>
            The site uses two measurement tools, both configured to collect as little as possible. Vercel Web Analytics counts page views and referrers with
            no cookies and no stored IP addresses. PostHog records the following aggregate events: page views and page exits with scroll depth, browser
            performance timings (Core Web Vitals), whether a newsletter panel was shown and whether a submission succeeded (never the address typed), clicks
            on source links (the destination domain only), clicks on related-file links and main buttons, including routine cards, routine context links, and search results (fixed interface labels, not search text), which comparison filters were used on the procedures
            page, which procedure rows were opened, and whether an archive search returned results (the number of results only, never the words you typed).
            It is configured without cookies (a random identifier is kept in your browser&apos;s local storage), without session recording, without automatic
            click or form capture, and it honors your browser&apos;s Do Not Track setting. We use these counts to see which files readers open, where they
            arrive from, which pages lead to a signup, and whether sources get read. We do not collect skincare concerns or health information.
          </p>
          <h2>Source videos and preview images</h2>
          <p>Celebrity routine pages show Vogue video previews served directly from YouTube’s image host, which receives your connection information when an image loads. The video player loads only after you choose “Load original video.” It uses YouTube’s privacy-enhanced domain, but this is still an external service with its own data practices, not a tracking-free guarantee. You can instead follow the original source link. Third-party media may include advertising or commercial content controlled by its publisher.</p>
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
