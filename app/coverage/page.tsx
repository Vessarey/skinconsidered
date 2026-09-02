import type { Metadata } from "next";
import Link from "next/link";
import { EDITION, jurisdictionCoverage, procedureProfiles, sourceCoverage, stories, taxonomy } from "@/lib/content";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "What we cover and where it comes from",
  description: "The Skin Considered coverage taxonomy, the jurisdictions on file, the source registry with its in-use and watchlist status, and how a source becomes a published file.",
  alternates: canonical("/coverage"),
};

const REGION_GROUPS = ["United States", "Europe", "Asia", "Oceania", "Latin America", "Global"] as const;

const pipeline = [
  { step: "Registry", copy: "Every source we intend to check is listed below with its jurisdiction, what it can establish, and the intended check cadence." },
  { step: "Scan", copy: "Regulators and safety feeds first, then indexed literature and society guidance. Press coverage can point to a story but never replaces the record." },
  { step: "Claim ledger", copy: "Each proposed headline gets the exact claim, the source and its date, the population or jurisdiction, the comparator, conflicts, and the strongest limitation." },
  { step: "Draft to the ceiling", copy: "A proposal stays a proposal. A signal stays a signal. A product trial does not become an ingredient verdict. The grade travels with the claim." },
  { step: "Gates", copy: "The content audit blocks prototype copy, hype phrases, missing sources or limitations, broken cross links, and date mismatches before a build can succeed." },
  { step: "Review and update", copy: "Every file carries its review date. A status change becomes a dated update or correction on the file and on the corrections log, never a silent rewrite." },
];

export default function CoveragePage() {
  const registry = sourceCoverage();
  const jurisdictions = jurisdictionCoverage();
  const inUse = registry.filter((entry) => entry.status === "In use");
  const watchlist = registry.filter((entry) => entry.status === "Watchlist");

  return (
    <main id="main-content" className="coverage-page">
      <header className="page-hero coverage-hero">
        <div>
          <span>Coverage / a map, not a claim of completeness</span>
          <h1>
            What we track, and what we do not yet.<sup>*</sup>
          </h1>
        </div>
        <p>
          Skincare developments surface across dozens of regulators, journals, and societies. This page shows the taxonomy we file them under, the
          jurisdictions currently on file, and which sources are actually cited versus only watched.
        </p>
      </header>

      <section className="coverage-snapshot" aria-label="Coverage snapshot">
        <div>
          <b>{stories.length}</b>
          <span>dispatches on file</span>
        </div>
        <div>
          <b>{jurisdictions.length}</b>
          <span>jurisdictions with at least one file</span>
        </div>
        <div>
          <b>{procedureProfiles.length}</b>
          <span>procedure files</span>
        </div>
        <div>
          <b>
            {inUse.length}/{registry.length}
          </b>
          <span>registry sources cited in a current file</span>
        </div>
      </section>

      <section className="coverage-section" aria-labelledby="taxonomy-title">
        <div className="coverage-intro">
          <span>01 / Taxonomy</span>
          <h2 id="taxonomy-title">Seven desks. One filing system.</h2>
          <p>A development is filed by what it is, not by who announced it. The list under each desk is the scope we aim to cover; it is not a claim that every item in scope has been reported.</p>
        </div>
        <div className="coverage-taxonomy">
          {taxonomy.map((topic) => (
            <article key={topic.desk}>
              <h3>
                <Link href={topic.href}>{topic.desk}</Link>
              </h3>
              <p>{topic.description}</p>
              <ul>
                {topic.includes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="coverage-section" aria-labelledby="jurisdictions-title">
        <div className="coverage-intro">
          <span>02 / Jurisdictions on file</span>
          <h2 id="jurisdictions-title">Where current dispatches come from.</h2>
          <p>Computed from the files themselves. A jurisdiction that is absent here is not covered yet, whatever the registry below intends.</p>
        </div>
        <div className="coverage-table-wrap">
          <table className="coverage-table">
            <thead>
              <tr>
                <th scope="col">Jurisdiction</th>
                <th scope="col">Region</th>
                <th scope="col">Files</th>
                <th scope="col">Desks</th>
                <th scope="col">Latest</th>
              </tr>
            </thead>
            <tbody>
              {jurisdictions.map((item) => (
                <tr key={item.location}>
                  <th scope="row">{item.location}</th>
                  <td>
                    <Link href={`/today?region=${encodeURIComponent(item.region)}`}>{item.region}</Link>
                  </td>
                  <td>{item.count}</td>
                  <td>{item.desks.join(", ")}</td>
                  <td>
                    <time dateTime={item.latest}>{item.latestLabel}</time>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="coverage-section" aria-labelledby="registry-title">
        <div className="coverage-intro">
          <span>03 / Source registry</span>
          <h2 id="registry-title">
            {inUse.length} sources in use, {watchlist.length} on the watchlist.
          </h2>
          <p>
            “In use” is computed: at least one current file cites that source’s domain. “Watchlist” means we know where to look and have not yet published
            from it. Cadence is the intended check schedule for the editorial desk, not a log of checks completed.
          </p>
        </div>
        {REGION_GROUPS.map((region) => {
          const entries = registry.filter((entry) => entry.region === region);
          if (!entries.length) return null;
          return (
            <div className="coverage-registry-group" key={region}>
              <h3>{region === "United States" ? "United States and Canada" : region}</h3>
              <ul className="coverage-registry">
                {entries.map((entry) => (
                  <li key={entry.id} className={entry.status === "In use" ? "in-use" : "watchlist"}>
                    <div className="coverage-registry-head">
                      <span className="coverage-status">{entry.status}</span>
                      <span className="coverage-type">{entry.type}</span>
                      <span className="coverage-jurisdiction">{entry.jurisdiction}</span>
                    </div>
                    <h4>
                      <a href={entry.url} rel="noreferrer" target="_blank">
                        {entry.name} <span aria-hidden="true">↗</span>
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    </h4>
                    <ul>
                      {entry.covers.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                    <div className="coverage-registry-foot">
                      <span>
                        <b>Intended cadence:</b> {entry.cadence}
                      </span>
                      <span>
                        <b>Cited:</b> {entry.cited} {entry.cited === 1 ? "link" : "links"}
                      </span>
                    </div>
                    {entry.note && <p>{entry.note}</p>}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </section>

      <section className="coverage-pipeline" aria-labelledby="pipeline-title">
        <div>
          <span>04 / How a source becomes a file</span>
          <h2 id="pipeline-title">Six steps, no shortcuts.</h2>
          <p>
            The full workflow is in the <Link href="/methodology">methodology</Link>. The gates run on every build.
          </p>
        </div>
        <ol>
          {pipeline.map((item, index) => (
            <li key={item.step}>
              <b>
                0{index + 1} {item.step}
              </b>
              <span>{item.copy}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="coverage-limits" aria-labelledby="limits-title">
        <div>
          <span>Limitations</span>
          <h2 id="limits-title">What this page does not claim.</h2>
        </div>
        <ul>
          <li>
            <b>Not a complete database.</b> The registry is a watchlist. Only the jurisdictions in section 02 have published files as of {EDITION.label}.
          </li>
          <li>
            <b>No automated ingestion is connected.</b> Scanning is editorial work against the registry. Nothing on this site is generated from a live feed.
          </li>
          <li>
            <b>Adverse-event databases show signals, not rates.</b> A report can reveal a serious problem without saying how often it happens or proving cause.
          </li>
          <li>
            <b>Scope of practice is state by state.</b> Procedure files say when a rule varies rather than presenting one national answer.
          </li>
          <li>
            <b>Statistics come from surveys.</b> Procedure counts from ASPS and ISAPS are surveys of plastic surgeons and exclude most spa and dermatology volume.
          </li>
        </ul>
      </section>
    </main>
  );
}
