import type { Metadata } from "next";
import { Suspense } from "react";
import { SearchExperience } from "@/components/SearchExperience";
import { searchableItems, searchSuggestions } from "@/lib/content";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Search the archive",
  description: "Search Skin Considered news, procedure comparisons, guides, ingredient files, and cultural history.",
  alternates: canonical("/search"),
  // Query pages should not compete with the files they point to.
  robots: { index: false, follow: true },
};

export default function SearchPage() {
  return (
    <main id="main-content">
      <header className="page-hero search-hero">
        <div>
          <span>Archive search / {searchableItems.length} files</span>
          <h1>
            Find the question behind the product.<sup>*</sup>
          </h1>
        </div>
        <p>Search by ingredient, concern, procedure, place, or evidence type. Results link directly to the source-aware file.</p>
      </header>
      <Suspense fallback={<p className="search-loading">Opening the archive…</p>}>
        <SearchExperience items={searchableItems} suggestions={searchSuggestions} />
      </Suspense>
    </main>
  );
}
