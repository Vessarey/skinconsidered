"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import type { CostBand, DowntimeBand, EvidenceGrade, ProcedureCategory, ProcedureConcern, ProcedureKind, ProcedureSetting } from "@/lib/content";
import { EvidenceBadge } from "./EvidenceBadge";

/** Serializable subset of a profile: everything the comparison needs, nothing it does not. */
export type ExplorerProfile = {
  slug: string;
  name: string;
  kind: ProcedureKind;
  category: ProcedureCategory;
  purpose: string;
  summary: string;
  goals: string[];
  concerns: ProcedureConcern[];
  aliases: string[];
  evidenceGrade: EvidenceGrade;
  evidence: string;
  cost: string;
  /** Advertised range from the price survey, when the profile has one. */
  advertised?: string;
  costBand: CostBand;
  costBasis: string;
  sessions: string;
  downtime: string;
  downtimeBand: DowntimeBand;
  results: string;
  duration: string;
  setting: ProcedureSetting;
  benefits: string[];
  tradeoffs: string[];
  majorRisks: string[];
  pauseIf: string;
};

type Filters = {
  concern: string;
  downtime: string;
  cost: string;
  setting: string;
  grade: string;
  q: string;
};

const ALL = "All";
const DOWNTIME_OPTIONS: DowntimeBand[] = ["None", "1–3 days", "4–7 days", "1–3 weeks", "3+ weeks"];
const COST_OPTIONS: CostBand[] = ["Under $250", "$250–$750", "$750–$2,000", "Over $2,000", "No reliable estimate"];
const SETTING_OPTIONS: ProcedureSetting[] = ["Spa or esthetician", "Medical office", "Physician-performed"];
const GRADE_OPTIONS: { value: EvidenceGrade; label: string }[] = [
  { value: "A", label: "A · strong" },
  { value: "B", label: "B · useful" },
  { value: "C", label: "C · early" },
  { value: "Context", label: "CTX · context" },
];

const KIND_LABEL: Record<ProcedureKind, string | null> = { family: null, branded: "Brand", technique: "Technique" };

function readFilters(params: URLSearchParams, concerns: string[]): Filters {
  const pick = (key: string, options: string[]) => {
    const value = params.get(key) ?? ALL;
    return options.includes(value) ? value : ALL;
  };
  return {
    concern: pick("concern", concerns),
    downtime: pick("downtime", DOWNTIME_OPTIONS),
    cost: pick("cost", COST_OPTIONS),
    setting: pick("setting", SETTING_OPTIONS),
    grade: pick("grade", GRADE_OPTIONS.map((option) => option.value)),
    q: params.get("q")?.slice(0, 80) ?? "",
  };
}

function writeFilters(filters: Filters) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(filters)) {
    if (value && value !== ALL) params.set(key, value);
  }
  const query = params.toString();
  window.history.replaceState(null, "", query ? `/procedures?${query}#compare` : "/procedures#compare");
}

function matchesQuery(profile: ExplorerProfile, words: string[]) {
  if (!words.length) return true;
  const haystack = [profile.name, profile.purpose, profile.summary, profile.category, ...profile.goals, ...profile.concerns, ...profile.aliases].join(" ").toLowerCase();
  return words.every((word) => haystack.includes(word));
}

export function ProcedureExplorer({ profiles, categories, concerns }: { profiles: ExplorerProfile[]; categories: ProcedureCategory[]; concerns: ProcedureConcern[] }) {
  const params = useSearchParams();
  const [filters, setFilters] = useState<Filters>(() => readFilters(params, concerns));

  // Deep links such as /procedures#rf-microneedling open the matching file. The
  // <details> elements stay uncontrolled, so this only touches the DOM.
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (!hash || !profiles.some((profile) => profile.slug === hash)) return;
    const element = document.getElementById(hash);
    if (element instanceof HTMLDetailsElement) {
      element.open = true;
      requestAnimationFrame(() => element.scrollIntoView({ block: "start" }));
    }
  }, [profiles]);

  const words = filters.q.toLowerCase().trim().split(/\s+/).filter(Boolean);

  const visible = useMemo(
    () =>
      profiles.filter(
        (profile) =>
          (filters.concern === ALL || profile.concerns.includes(filters.concern as ProcedureConcern)) &&
          (filters.downtime === ALL || profile.downtimeBand === filters.downtime) &&
          (filters.cost === ALL || profile.costBand === filters.cost) &&
          (filters.setting === ALL || profile.setting === filters.setting) &&
          (filters.grade === ALL || profile.evidenceGrade === filters.grade) &&
          matchesQuery(profile, words),
      ),
    // words is derived from filters.q, which is already a dependency.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [filters, profiles],
  );

  const active = Object.entries(filters).filter(([, value]) => value && value !== ALL).length;

  function update(next: Partial<Filters>) {
    const merged = { ...filters, ...next };
    setFilters(merged);
    writeFilters(merged);
  }

  function reset() {
    const cleared: Filters = { concern: ALL, downtime: ALL, cost: ALL, setting: ALL, grade: ALL, q: "" };
    setFilters(cleared);
    writeFilters(cleared);
  }

  const chipGroup = (label: string, key: keyof Filters, options: { value: string; label: string }[]) => (
    <div className="filter-group" role="group" aria-label={`Filter procedures by ${label.toLowerCase()}`}>
      <span className="filter-label">{label}</span>
      {[{ value: ALL, label: ALL }, ...options].map((option) => (
        <button
          aria-pressed={filters[key] === option.value}
          className={filters[key] === option.value ? "active" : ""}
          key={option.value}
          onClick={() => update({ [key]: option.value })}
          type="button"
        >
          {option.label}
        </button>
      ))}
    </div>
  );

  return (
    <div className="procedure-explorer" id="compare">
      <div className="procedure-explorer-search">
        <label htmlFor="procedure-search">Search procedures, brands, or concerns</label>
        <input
          id="procedure-search"
          onChange={(event) => update({ q: event.target.value })}
          placeholder="TRY: HYDRAFACIAL, MELASMA, JOWLS, PEEL…"
          type="search"
          value={filters.q}
        />
      </div>
      <div className="filter-bar">
        {chipGroup("Concern", "concern", concerns.map((concern) => ({ value: concern, label: concern })))}
        {chipGroup("Downtime", "downtime", DOWNTIME_OPTIONS.map((option) => ({ value: option, label: option })))}
        {chipGroup("Cost band", "cost", COST_OPTIONS.map((option) => ({ value: option, label: option })))}
        {chipGroup("Who performs it", "setting", SETTING_OPTIONS.map((option) => ({ value: option, label: option })))}
        {chipGroup("Evidence", "grade", GRADE_OPTIONS)}
      </div>
      <div className="procedure-explorer-status">
        <p className="result-count" aria-live="polite">
          {visible.length} of {profiles.length} procedure files{active ? ` · ${active} ${active === 1 ? "filter" : "filters"} on` : ""}
        </p>
        {active > 0 && (
          <button className="empty-state-reset" onClick={reset} type="button">
            Clear filters
          </button>
        )}
      </div>

      <div className="procedure-scan-key" aria-hidden="true">
        <span>Procedure</span>
        <span>Evidence</span>
        <span>Cost (U.S.)</span>
        <span>Downtime</span>
        <span>Sessions</span>
        <span>Lasts</span>
      </div>

      {categories.map((category) => {
        const group = visible.filter((profile) => profile.category === category);
        if (!group.length) return null;
        return (
          <section className="procedure-category" aria-labelledby={`category-${category.replace(/[^a-z]+/gi, "-").toLowerCase()}`} key={category}>
            <div className="procedure-category-heading">
              <h3 id={`category-${category.replace(/[^a-z]+/gi, "-").toLowerCase()}`}>{category}</h3>
              <span>
                {group.length} {group.length === 1 ? "file" : "files"}
              </span>
            </div>
            <div className="procedure-profile-list">
              {group.map((profile) => (
                <details className="procedure-profile" id={profile.slug} key={profile.slug}>
                  <summary>
                    <div className="procedure-profile-heading">
                      <span>
                        {KIND_LABEL[profile.kind] && <b className="procedure-kind">{KIND_LABEL[profile.kind]}</b>}
                        {profile.goals.slice(0, 3).join(" · ")}
                      </span>
                      <h4>{profile.name}</h4>
                      <p>{profile.purpose}</p>
                    </div>
                    <dl className="procedure-profile-scan">
                      <div>
                        <dt>Evidence</dt>
                        <dd>
                          <EvidenceBadge compact grade={profile.evidenceGrade} />
                        </dd>
                      </div>
                      <div>
                        <dt>Cost (U.S.)</dt>
                        <dd>
                          {profile.advertised ? (
                            <>
                              <span className="procedure-price-tag">Advertised</span> {profile.advertised}
                              {profile.costBand !== "No reliable estimate" && /\$\d/.test(profile.cost) && (
                                <small>
                                  <span className="procedure-price-tag">Avg</span> {profile.cost}
                                </small>
                              )}
                            </>
                          ) : (
                            profile.cost
                          )}
                        </dd>
                      </div>
                      <div>
                        <dt>Downtime</dt>
                        <dd>{profile.downtime}</dd>
                      </div>
                      <div>
                        <dt>Sessions</dt>
                        <dd>{profile.sessions}</dd>
                      </div>
                      <div>
                        <dt>Lasts</dt>
                        <dd>{profile.duration}</dd>
                      </div>
                    </dl>
                    <span className="procedure-profile-toggle" aria-hidden="true">
                      +
                    </span>
                  </summary>

                  <div className="procedure-profile-body">
                    <p className="procedure-profile-summary">{profile.summary}</p>
                    <div className="procedure-explain">
                      <section>
                        <h5>What the evidence supports</h5>
                        <p>{profile.evidence}</p>
                      </section>
                      <section>
                        <h5>What the cost figure means</h5>
                        <p>{profile.costBasis}</p>
                      </section>
                    </div>
                    <dl className="procedure-facts">
                      <div>
                        <dt>Results appear</dt>
                        <dd>{profile.results}</dd>
                      </div>
                      <div>
                        <dt>Who performs it</dt>
                        <dd>{profile.setting}</dd>
                      </div>
                      <div>
                        <dt>Best for</dt>
                        <dd>{profile.concerns.join(" · ")}</dd>
                      </div>
                    </dl>
                    <div className="procedure-pro-con">
                      <section>
                        <h5>Realistic benefits</h5>
                        <ul>{profile.benefits.map((item) => <li key={item}>{item}</li>)}</ul>
                      </section>
                      <section>
                        <h5>Limitations</h5>
                        <ul>{profile.tradeoffs.map((item) => <li key={item}>{item}</li>)}</ul>
                      </section>
                      <section>
                        <h5>Serious risks</h5>
                        <ul>{profile.majorRisks.map((item) => <li key={item}>{item}</li>)}</ul>
                      </section>
                    </div>
                    <div className="procedure-pause">
                      <b>Pause before booking if</b>
                      <p>{profile.pauseIf}</p>
                    </div>
                    <div className="procedure-profile-more">
                      <Link href={`/procedures/${profile.slug}`}>
                        Open the full file: healing timeline, candidacy, regulatory status, questions, sources <span aria-hidden="true">→</span>
                      </Link>
                    </div>
                  </div>
                </details>
              ))}
            </div>
          </section>
        );
      })}

      {!visible.length && (
        <div className="empty-state">
          <span aria-hidden="true">*</span>
          <h2>No file matches that combination.</h2>
          <p>Widen a filter, or search a brand name; branded treatments are filed under their generic family.</p>
          <button className="empty-state-reset" onClick={reset} type="button">
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
