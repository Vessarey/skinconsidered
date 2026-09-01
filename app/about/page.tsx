import type { Metadata } from "next";
import Link from "next/link";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "About",
  description: "Why Skin Considered exists and how it intends to earn reader trust.",
  alternates: canonical("/about"),
};

export default function AboutPage() {
  return (
    <main id="main-content" className="policy-page">
      <header>
        <span>About / why this publication</span>
        <h1>Skincare moves globally. Good context rarely does.</h1>
      </header>
      <div className="policy-layout">
        <aside>
          <p>Skin Considered is an independent, evidence-aware publication in development.</p>
        </aside>
        <article>
          <h2>The gap</h2>
          <p>
            Regulatory decisions in one market, procedure research in another, and beauty practices with centuries of context often arrive in the same feed
            as product launches. The result is speed without proportion.
          </p>
          <h2>Our job</h2>
          <p>
            We report what changed, link the underlying source, grade the specific claim, name conflicts and limitations, and explain what the development
            can reasonably change for a reader.
          </p>
          <h2>Who it is for</h2>
          <p>
            Curious consumers, skincare professionals, clinicians who want a public-facing summary layer, historians of beauty and material culture, and
            anyone tired of being sold certainty.
          </p>
          <h2>The business we want</h2>
          <p>
            First: earn a repeat audience through useful work. Later: reader memberships, clearly labeled sponsorships, events, and selected tools may
            support the publication. Editorial ranking and evidence grades will never be sold.
          </p>
          <div className="policy-callout">
            <b>Current status</b>
            <p>
              This is the founding edition. Newsletter capture is provider-ready but remains visibly in preview until a subscriber platform and privacy
              workflow are connected. Correction intake is not yet live.
            </p>
          </div>
          <p>
            <Link href="/methodology">Read our methodology →</Link>
          </p>
        </article>
      </div>
    </main>
  );
}
