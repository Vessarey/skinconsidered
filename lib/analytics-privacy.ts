/** Keep page and campaign attribution without transmitting search text or fragments. */
export function analyticsUrl(value: string, keepCampaign = true): string {
  try {
    const url = new URL(value);
    const safe = new URL(url.origin + url.pathname);
    if (keepCampaign) {
      for (const key of ["utm_source", "utm_medium", "utm_campaign"]) {
        const campaign = url.searchParams.get(key);
        if (campaign) safe.searchParams.set(key, campaign);
      }
    }
    return safe.toString();
  } catch {
    return value.split(/[?#]/)[0];
  }
}

export function redactAnalyticsProperties(properties: Record<string, unknown>): Record<string, unknown> {
  return Object.fromEntries(Object.entries(properties).filter(([key]) => !/^(q|query|search_query|search_keyword|\$search_keyword|\$initial_search_keyword)$/i.test(key)).map(([key, value]) => {
    if (typeof value === "string" && /url|referrer|pathname/i.test(key)) return [key, analyticsUrl(value, !/referrer/i.test(key))];
    if (value && typeof value === "object" && !Array.isArray(value)) return [key, redactAnalyticsProperties(value as Record<string, unknown>)];
    return [key, value];
  }));
}
