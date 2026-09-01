import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy", description: "Skin Considered privacy posture for the preview edition." };

export default function PrivacyPage() {
  return (
    <main id="main-content" className="policy-page">
      <header><span>Privacy / preview edition</span><h1>Collect less. Explain the rest.</h1></header>
      <div className="policy-layout">
        <aside><p>No advertising pixels or third-party analytics are included in this local build.</p></aside>
        <article>
          <h2>Newsletter</h2>
          <p>The newsletter form remains in preview mode unless a configured subscriber webhook is present. When connected, the email address and signup source will be sent to that provider. A production policy must name the provider, purpose, retention, and deletion process before launch.</p>
          <h2>Analytics</h2>
          <p>This build does not install analytics. A privacy-respecting measurement plan should define page views, source attribution, newsletter conversion, and returning-reader metrics without collecting sensitive skincare concerns by default.</p>
          <h2>Advertising and affiliates</h2>
          <p>None are active. If introduced, commercial relationships must be labeled at the placement and must not influence evidence grades, corrections, or editorial inclusion.</p>
        </article>
      </div>
    </main>
  );
}
