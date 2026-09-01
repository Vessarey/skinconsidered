import Link from "next/link";
import { regionSummaries } from "@/lib/content";

const numberWords = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];

export function WorldStrip() {
  const summaries = regionSummaries();
  const regionCount = numberWords[summaries.length] ?? String(summaries.length);

  return (
    <section className="world-strip" aria-labelledby="world-title">
      <div className="world-intro">
        <span>
          {regionCount} regions · one standard
        </span>
        <h2 id="world-title">
          Skincare has no single center.<sup>*</sup>
        </h2>
        <p>Follow regulation, clinical research, safety signals, procedures, and practices where they actually happen.</p>
        <Link href="/today">Explore the global wire →</Link>
      </div>
      <div className="world-orbit">
        <span className="world-ring ring-one" aria-hidden="true" />
        <span className="world-ring ring-two" aria-hidden="true" />
        <span className="world-ring ring-three" aria-hidden="true" />
        <ul className="world-points" aria-label="Dispatches by region">
          {summaries.map((summary, index) => (
            <li className={`world-point point-${index + 1}`} key={summary.region}>
              <Link href={`/today?region=${encodeURIComponent(summary.region)}`}>
                <b>{summary.region}</b>
                <small>
                  {summary.count} {summary.count === 1 ? "dispatch" : "dispatches"} · {summary.desk}
                </small>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
