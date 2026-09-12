import type { Story } from "../content/types";

/** Escape once for each layer: HTML fragments here, then XML in the route. */
export function escapeMarkup(value: string) {
  return value.replace(/[<>&'"]/g, (character) => ({
    "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;",
  })[character] ?? character);
}

export function rssDescription(story: Pick<Story, "dek" | "signal" | "limitations" | "sources" | "updates">) {
  const updates = [...(story.updates ?? [])]
    .sort((a, b) => b.date.localeCompare(a.date))
    .map((update) => `<li><strong>${update.kind === "correction" ? "Correction" : "Update"} — ${escapeMarkup(update.dateLabel)}:</strong> ${escapeMarkup(update.note)}</li>`)
    .join("");
  const sources = story.sources.map((source) => {
    // Never turn an unexpected non-HTTPS scheme into an active feed-reader link.
    const safe = URL.canParse(source.url) && new URL(source.url).protocol === "https:";
    const label = escapeMarkup(source.label);
    const link = safe ? `<a href="${escapeMarkup(source.url)}">${label}</a>` : label;
    return `<li>${link}${source.published ? ` — ${escapeMarkup(source.published)}` : ""}</li>`;
  }).join("");
  return `<p>${escapeMarkup(story.dek)}</p>`
    + `<p><strong>Evidence:</strong> ${escapeMarkup(story.signal)}</p>`
    + `<p><strong>The limit:</strong> ${escapeMarkup(story.limitations)}</p>`
    + (updates ? `<h3>Updates and corrections</h3><ul>${updates}</ul>` : "")
    + `<h3>Primary sources</h3><ul>${sources}</ul>`;
}
