"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";
import type { SearchItem } from "@/lib/content";
import { searchArchive } from "@/lib/search";
import { track } from "./PostHogProvider";

type Props = { items: SearchItem[]; suggestions: string[] };

export function SearchExperience(props: Props) {
  const params = useSearchParams();
  const initial = params.get("q") ?? "";
  // Remount the draft when the URL changes, including browser Back and Forward.
  return <SearchResults key={initial} {...props} initial={initial} />;
}

function SearchResults({ items, suggestions, initial }: Props & { initial: string }) {
  const [query, setQuery] = useState(initial);
  const [limit, setLimit] = useState(10);
  const resultsContainer = useRef<HTMLDivElement>(null);
  const firstNewResult = useRef<number | null>(null);
  const results = searchArchive(items, query);

  useEffect(() => {
    if (firstNewResult.current === null) return;
    // Continue reading at the newly revealed batch, even when the button disappears.
    resultsContainer.current?.querySelectorAll<HTMLAnchorElement>("h2 a")[firstNewResult.current]?.focus();
    firstNewResult.current = null;
  }, [limit]);

  function showMore() {
    firstNewResult.current = limit;
    setLimit((current) => current + 10);
  }

  function navigateSearch(value: string) {
    const trimmed = value.trim();
    const href = trimmed ? "/search?q=" + encodeURIComponent(trimmed) : "/search";
    setQuery(trimmed);
    setLimit(10);
    if (window.location.pathname + window.location.search !== href) window.history.pushState(null, "", href);
    if (trimmed) {
      const count = searchArchive(items, trimmed).length;
      track("site_search", { results: count, zero: count === 0 });
    }
  }

  function search(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    navigateSearch(query);
  }

  return (
    <div className="search-experience">
      <form action="/search" method="get" onSubmit={search} role="search">
        <label htmlFor="site-search">Search by ingredient, concern, procedure, or place</label>
        <div>
          <input id="site-search" name="q" onChange={(event) => { setQuery(event.target.value); setLimit(10); }}
            placeholder="Try sunscreen, Botox, or skin barrier" type="search" value={query} maxLength={200} />
          <button type="submit">Search</button>
        </div>
        <div className="search-suggestions" aria-label="Suggested searches">
          <span>Try</span>
          {suggestions.map((suggestion) => (
            <button key={suggestion} onClick={() => navigateSearch(suggestion)} type="button">{suggestion}</button>
          ))}
        </div>
      </form>
      <p className="result-count" role="status" aria-atomic="true">
        {query.trim() ? "Showing " + Math.min(limit, results.length) + " of " + results.length + (results.length === 1 ? " result" : " results") + " for “" + query.trim() + "”" : "Showing " + Math.min(limit, results.length) + " of " + items.length + " stories and guides"}
      </p>
      <div className="search-results" id="search-results" ref={resultsContainer}>
        {results.slice(0, limit).map((item) => (
          <article key={item.href} data-reader-cta="search_result">
            <div>
              <small>{item.type}</small>
              <h2><Link href={item.href}>{item.title}</Link></h2>
              <p>{item.description}</p>
            </div>
            <Link aria-label={"Read " + item.title} href={item.href}>↗</Link>
          </article>
        ))}
        {!results.length && (
          <div className="empty-state">
            <h2>No match for that search yet.</h2>
            <p>Try a shorter phrase or a different spelling. You can also explore our guides or compare procedures.</p>
            <div className="empty-state-actions">
              <button className="search-reset" onClick={() => navigateSearch("")} type="button">Clear search</button>
              <Link href="/guides">Browse guides</Link>
              <Link href="/procedures">Compare procedures</Link>
            </div>
          </div>
        )}
      </div>
      {results.length > limit && (
        <button className="search-more" aria-controls="search-results" onClick={showMore} type="button">Show more results ({results.length - limit} remaining)</button>
      )}
    </div>
  );
}
