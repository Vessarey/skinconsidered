import type { Metadata } from "next";
import { Suspense } from "react";
import { SearchExperience } from "@/components/SearchExperience";
import { searchableItems, searchSuggestions } from "@/lib/content";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Search the archive",
  description: "Search Skin Considered news, celebrity skincare routines, procedure comparisons, guides, ingredient files, and cultural history.",
  alternates: canonical("/search"),
  // Query pages should not compete with the files they point to.
  robots: { index: false, follow: true },
};

export default function SearchPage() {
  return (
    <main id="main-content">
      <header className="page-hero search-hero">
        <div>
          <span>Search Skin Considered</span>
          <h1>
            What would you like to understand?
          </h1>
        </div>
        <p>Explore celebrity routines, ingredient evidence, skincare news, procedure comparisons, and practical guides.</p>
      </header>
      <Suspense fallback={<p className="search-loading">Opening the archive…</p>}>
        <SearchExperience items={searchableItems} suggestions={searchSuggestions} />
      </Suspense>
    </main>
  );
}
