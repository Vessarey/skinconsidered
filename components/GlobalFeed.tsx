"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Story } from "@/lib/content";

const regions = ["All", "North America", "Latin America", "Europe", "Asia", "Oceania", "Global"];

export function GlobalFeed({ stories }: { stories: Story[] }) {
  const [region, setRegion] = useState("All");

  const visible = useMemo(
    () => stories.filter((story) => region === "All" || story.region === region),
    [region, stories],
  );

  return (
    <div className="global-feed">
      <div className="filter-bar" role="group" aria-label="Filter updates by region">
        {regions.map((item) => (
          <button
            className={region === item ? "active" : ""}
            key={item}
            onClick={() => setRegion(item)}
            type="button"
          >
            {item}
          </button>
        ))}
      </div>
      <p className="result-count" aria-live="polite">
        {visible.length} verified {visible.length === 1 ? "dispatch" : "dispatches"}
      </p>
      <div className="dispatch-list">
        {visible.map((story, index) => (
          <article className="dispatch-row" key={story.slug}>
            <span className="dispatch-index">{String(index + 1).padStart(2, "0")}</span>
            <div>
              <div className="dispatch-meta">
                <span>{story.location}</span>
                <span>{story.category}</span>
                <span>{story.dateLabel}</span>
              </div>
              <h2>
                <Link href={`/dispatches/${story.slug}`}>{story.headline}</Link>
              </h2>
              <p>{story.dek}</p>
            </div>
            <div className="dispatch-signal">
              <b>{story.grade === "Context" ? "CTX" : `Grade ${story.grade}`}</b>
              <span>{story.signal}</span>
              <Link aria-label={`Read ${story.headline}`} href={`/dispatches/${story.slug}`}>
                ↗
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
