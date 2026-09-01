"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";

type SearchItem = {
  href: string;
  type: string;
  title: string;
  description: string;
  terms: string;
};

export function SearchExperience({ items }: { items: SearchItem[] }) {
  const params = useSearchParams();
  const [query, setQuery] = useState(params.get("q") ?? "");
  const [submitted, setSubmitted] = useState(query);

  const results = useMemo(() => {
    const words = submitted.toLowerCase().trim().split(/\s+/).filter(Boolean);
    if (!words.length) return items;
    return items.filter((item) => {
      const haystack = `${item.title} ${item.description} ${item.type} ${item.terms}`.toLowerCase();
      return words.every((word) => haystack.includes(word));
    });
  }, [items, submitted]);

  function search(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(query);
    window.history.replaceState(null, "", query ? `/search?q=${encodeURIComponent(query)}` : "/search");
  }

  return (
    <div className="search-experience">
      <form onSubmit={search}>
        <label htmlFor="site-search">Search articles, guides, ingredients, or places</label>
        <div>
          <input
            autoFocus
            id="site-search"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="TRY: SUNSCREEN, JAPAN, RETINOIDS…"
            type="search"
            value={query}
          />
          <button type="submit">Search</button>
        </div>
      </form>
      <p className="result-count" aria-live="polite">
        {results.length} {results.length === 1 ? "result" : "results"}
        {submitted ? ` for “${submitted}”` : " across the archive"}
      </p>
      <div className="search-results">
        {results.map((item, index) => (
          <article key={`${item.href}-${item.title}`}>
            <span>{String(index + 1).padStart(2, "0")}</span>
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
