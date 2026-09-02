import type { Metadata } from "next";

/**
 * Nested metadata objects are replaced, not merged, by child segments. Every
 * page therefore sets its own canonical while keeping the RSS alternate.
 */
export function canonical(path: string): NonNullable<Metadata["alternates"]> {
  return {
    canonical: path,
    types: { "application/rss+xml": "/rss.xml" },
  };
}

/** Trim a description to search-snippet length on a word boundary; never cuts mid-word. */
export function metaDescription(text: string, limit = 155) {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= limit) return clean;
  const cut = clean.slice(0, limit - 1);
  return `${cut.slice(0, Math.max(cut.lastIndexOf(" "), 80))}…`;
}

export function breadcrumbs(base: string, trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${base}${item.path}`,
    })),
  };
}
