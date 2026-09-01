"use client";

import Link from "next/link";
import { useState } from "react";

type TickerItem = { slug: string; shortHeadline: string };

/**
 * Moving headlines need a real pause control (WCAG 2.2.2), not only hover.
 * The duplicated run keeps the loop seamless and is hidden from assistive tech.
 */
export function TickerMarquee({ items }: { items: TickerItem[] }) {
  const [paused, setPaused] = useState(false);

  return (
    <div className="ticker" role="region" aria-label="Latest headlines">
      <button
        className="ticker-label"
        type="button"
        onClick={() => setPaused((value) => !value)}
        aria-pressed={paused}
        aria-label={paused ? "Resume the headline ticker" : "Pause the headline ticker"}
      >
        <span>Latest</span>
        <span aria-hidden="true">{paused ? "▶" : "❚❚"}</span>
      </button>
      <div className="ticker-window">
        <div className={`ticker-track${paused ? " paused" : ""}`}>
          {[...items, ...items].map((story, index) => (
            <Link
              href={`/dispatches/${story.slug}`}
              key={`${story.slug}-${index}`}
              aria-hidden={index >= items.length ? "true" : undefined}
              tabIndex={index >= items.length ? -1 : undefined}
            >
              {story.shortHeadline} <b aria-hidden="true">*</b>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
