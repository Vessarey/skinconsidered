import type { Story } from "../content/types";

/** Listing freshness follows dated content, never the time a build happens. */
export function dispatchListingDates(edition: string, stories: Pick<Story, "date" | "location" | "updates">[]) {
  let all = edition;
  let us = edition;
  for (const story of stories) {
    const latest = [story.date, ...(story.updates ?? []).map((update) => update.date)]
      .reduce((a, b) => a > b ? a : b);
    if (latest > all) all = latest;
    if (story.location === "United States" && latest > us) us = latest;
  }
  return { all, us };
}
