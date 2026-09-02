"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import type { SearchItem } from "@/lib/content";

function matches(item: SearchItem, words: string[]) {
  const haystack = `${item.title} ${item.description} ${item.type} ${item.terms}`.toLowerCase();
  return words.every((word) => haystack.includes(word));
}

export function SearchExperience({ items, suggestions }: { items: SearchItem[]; suggestions: string[] }) {
  const params = useSearchParams();
  const initial = params.get("q") ?? "";
  const [query, setQuery] = useState(initial);

  const words = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  const results = words.length ? items.filter((item) => matches(item, words)) : items;

  function syncUrl(value: string) {
    window.history.replaceState(null, "", value ? `/search?q=${encodeURIComponent(value)}` : "/search");
  }

  function search(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    syncUrl(query.trim());
  }

  return (
    <div className="search-experience">
      <form action="/search" method="get" onSubmit={search} role="search">
        <label htmlFor="site-search">Search news, procedures, guides, ingredients, or places</label>
        <div>
          <input
            autoFocus
            id="site-search"
            name="q"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="TRY: SUNSCREEN, JAPAN, RETINOIDS…"
            type="search"
            value={query}
          />
          <button type="submit">Search</button>
        </div>
        <div className="search-suggestions" aria-label="Suggested searches">
          <span>Try</span>
          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => {
                setQuery(suggestion);
                syncUrl(suggestion);
              }}
              type="button"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </form>
      <p className="result-count" aria-live="polite">
        {results.length} {results.length === 1 ? "result" : "results"}
        {words.length ? ` for “${query.trim()}”` : " across the archive"}
      </p>
      <div className="search-results">
        {results.map((item, index) => (
          <article key={`${item.href}-${item.title}`}>
            <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            <div>
              <small>{item.type}</small>
              <h2>
                <Link href={item.href}>{item.title}</Link>
              </h2>
              <p>{item.description}</p>
            </div>
            <Link aria-label={`Open ${item.title}`} href={item.href}>
              ↗
            </Link>
          </article>
        ))}
        {!results.length && (
          <div className="empty-state">
            <span aria-hidden="true">*</span>
            <h2>No close match yet.</h2>
            <p>Try an ingredient, procedure, country, or broader concern. The archive grows with each reviewed edition.</p>
          </div>
        )}
      </div>
    </div>
  );
}
