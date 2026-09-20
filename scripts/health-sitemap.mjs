/** Deliberately supports this project's flat urlset, not recursive sitemap indexes. */
export function sitemapPaths(xml, origin) {
  if (!/<urlset(?:\s|>)/.test(xml) || !/<\/urlset>/.test(xml)) throw new Error("Expected a flat XML urlset sitemap.");
  const base = new URL(origin).origin;
  const paths = [...xml.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/g)].map((match) => {
    const value = match[1].replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
    const url = new URL(value);
    if (!["http:", "https:"].includes(url.protocol) || url.origin !== base || url.username || url.password || url.hash) throw new Error(`Unexpected sitemap URL: ${value}`);
    return url.pathname + url.search;
  });
  if (!paths.length) throw new Error("Sitemap contains no page URLs; refusing a vacuous pass.");
  return [...new Set(paths)];
}

export function compareSitemaps(actual, expected) {
  const present = new Set(actual);
  return expected.filter((path) => !present.has(path));
}

export function canonicalMatches(canonical, page) {
  try { return new URL(canonical).href === new URL(page).href; }
  catch { return false; }
}
