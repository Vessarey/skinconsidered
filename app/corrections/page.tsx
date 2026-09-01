import type { Metadata } from "next";
import Link from "next/link";
import { allUpdates } from "@/lib/content";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Corrections and updates",
  description: "The Skin Considered corrections policy and the dated log of every correction and material update on file.",
  alternates: canonical("/corrections"),
};

export default function CorrectionsPage() {
  const entries = allUpdates();
  const corrections = entries.filter((entry) => entry.kind === "correction");
  const updates = entries.filter((entry) => entry.kind === "update");

  return (
    <main id="main-content" className="policy-page">
      <header>
        <span>Corrections / the record stays visible</span>
        <h1>Specific, dated, and attached to the work.</h1>
      </header>
      <div className="policy-layout">
        <aside>
          <p>
            {corrections.length === 0 ? "No corrections are on file." : `${corrections.length} ${corrections.length === 1 ? "correction" : "corrections"} on file.`}{" "}
            {updates.length === 0 ? "No material updates are on file." : `${updates.length} material ${updates.length === 1 ? "update" : "updates"} logged.`} This
            log is generated from the files themselves.
          </p>
        </aside>
        <article>
          <h2>The log</h2>
          {entries.length === 0 ? (
            <p>Nothing has needed a correction or a material update in this edition. When something does, it will appear here with a date.</p>
          ) : (
            <ol className="corrections-log">
              {entries.map((entry) => (
                <li key={`${entry.href}-${entry.date}`}>
                  <div>
                    <b>{entry.kind === "correction" ? "Correction" : "Update"}</b>
                    <time dateTime={entry.date}>{entry.dateLabel}</time>
                    <span>{entry.desk}</span>
                  </div>
                  <Link href={entry.href}>{entry.title}</Link>
                  <p>{entry.note}</p>
                </li>
              ))}
            </ol>
          )}
          <h2>What we correct</h2>
          <p>Factual errors, material omissions, misleading framing, broken source attribution, dates, names, regulatory status, and evidence descriptions.</p>
          <h2>How updates differ</h2>
          <p>
            A developing story may gain a new result without the original report having been wrong. Material updates receive a dated note. Corrections say
            what was incorrect and what replaced it. Both appear on the file itself and in the log above.
          </p>
          <h2>Send a correction</h2>
          <p>
            Until a public editorial inbox is connected, correction intake is not live. Launch requires a monitored address and a documented response
            workflow; the site will not pretend a dead form is accountable.
          </p>
        </article>
      </div>
    </main>
  );
}
