"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import type { WireItem } from "@/lib/content";

type Filters = { region: string; desk: string };

const ALL = "All";

function readFilters(params: URLSearchParams, regions: string[], desks: string[]): Filters {
  const region = params.get("region") ?? ALL;
  const desk = params.get("desk") ?? ALL;
  return {
    region: regions.includes(region) ? region : ALL,
    desk: desks.includes(desk) ? desk : ALL,
  };
}

function writeFilters(filters: Filters) {
  const params = new URLSearchParams();
  if (filters.region !== ALL) params.set("region", filters.region);
  if (filters.desk !== ALL) params.set("desk", filters.desk);
  const query = params.toString();
  window.history.replaceState(null, "", query ? `/today?${query}` : "/today");
}

export function GlobalFeed({ stories, regions, desks }: { stories: WireItem[]; regions: string[]; desks: string[] }) {
  const params = useSearchParams();
  const [filters, setFilters] = useState<Filters>(() => readFilters(params, regions, desks));

  const visible = useMemo(
    () =>
      stories.filter(
        (story) => (filters.region === ALL || story.region === filters.region) && (filters.desk === ALL || story.desk === filters.desk),
      ),
    [filters, stories],
  );

  function update(next: Partial<Filters>) {
    const merged = { ...filters, ...next };
    setFilters(merged);
    writeFilters(merged);
  }

  const filterGroup = (label: string, key: keyof Filters, options: string[]) => (
    <div className="filter-group" role="group" aria-label={`Filter dispatches by ${label.toLowerCase()}`}>
      <span className="filter-label">{label}</span>
      {[ALL, ...options].map((option) => (
        <button
          aria-pressed={filters[key] === option}
          className={filters[key] === option ? "active" : ""}
          key={option}
          onClick={() => update({ [key]: option })}
          type="button"
        >
          {option}
        </button>
      ))}
    </div>
  );

  return (
    <div className="global-feed">
      <div className="filter-bar">
        {filterGroup("Region", "region", regions)}
        {filterGroup("Desk", "desk", desks)}
      </div>
      <p className="result-count" aria-live="polite">
        {visible.length} source-linked {visible.length === 1 ? "dispatch" : "dispatches"}
        {filters.region !== ALL && ` · ${filters.region}`}
        {filters.desk !== ALL && ` · ${filters.desk}`}
      </p>
      <div className="dispatch-list">
        {visible.map((story, index) => (
          <article className="dispatch-row" key={story.slug}>
            <span className="dispatch-index" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <div className="dispatch-meta">
                <span>{story.location}</span>
                <span>{story.desk}</span>
                <span>{story.updatedLabel ? `Updated ${story.updatedLabel}` : story.dateLabel}</span>
              </div>
              <h2>
                <Link href={`/dispatches/${story.slug}`}>{story.headline}</Link>
              </h2>
              <p>{story.dek}</p>
            </div>
            <div className="dispatch-signal">
              <b>{story.gradeCode === "CTX" ? "CTX" : `Grade ${story.gradeCode}`}</b>
              <span>{story.signal}</span>
              <Link aria-label={`Read ${story.headline}`} href={`/dispatches/${story.slug}`}>
                ↗
              </Link>
            </div>
          </article>
        ))}
        {!visible.length && (
          <div className="empty-state">
            <span aria-hidden="true">*</span>
            <h2>Nothing on file for that combination yet.</h2>
            <p>The wire grows with each reviewed edition. Widen the filters or search the archive.</p>
            <button className="empty-state-reset" onClick={() => update({ region: ALL, desk: ALL })} type="button">
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
