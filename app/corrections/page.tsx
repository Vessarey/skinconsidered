import type { Metadata } from "next";

export const metadata: Metadata = { title: "Corrections", description: "The Skin Considered corrections and update policy." };

export default function CorrectionsPage() {
  return (
    <main id="main-content" className="policy-page">
      <header><span>Corrections / the record stays visible</span><h1>Specific, dated, and attached to the work.</h1></header>
      <div className="policy-layout">
        <aside><p>No corrections are on file for the founding edition.</p></aside>
        <article>
          <h2>What we correct</h2>
          <p>Factual errors, material omissions, misleading framing, broken source attribution, dates, names, regulatory status, and evidence descriptions.</p>
          <h2>How updates differ</h2>
          <p>A developing story may gain a new result without the original report having been wrong. Material updates receive a dated note. Corrections say what was incorrect and what replaced it.</p>
          <h2>Send a correction</h2>
          <p>Until a public editorial inbox is connected, correction intake is not live. Launch requires a monitored address and a documented response workflow; the site will not pretend a dead form is accountable.</p>
        </article>
      </div>
    </main>
  );
}
