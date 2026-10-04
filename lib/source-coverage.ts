/** Credit a citation to its most specific registered domain, not every parent. */
export function countSourceCitations<T extends { domains: string[] }>(registry: T[], urls: string[]) {
  const counts = registry.map(() => 0);
  for (const url of urls) {
    let host: string;
    try {
      const parsed = new URL(url);
      if (!['https:', 'http:'].includes(parsed.protocol)) continue;
      host = parsed.hostname.toLowerCase();
    } catch { continue; }
    const specificity = registry.map((entry) => Math.max(0, ...entry.domains.map((domain) => {
      const normalized = domain.toLowerCase();
      return host === normalized || host.endsWith(`.${normalized}`) ? normalized.length : 0;
    })));
    const best = Math.max(0, ...specificity);
    if (best === 0) continue;
    specificity.forEach((score, index) => { if (score === best) counts[index] += 1; });
  }
  return registry.map((entry, index) => ({
    ...entry,
    cited: counts[index],
    status: counts[index] > 0 ? "In use" as const : "Watchlist" as const,
  }));
}
