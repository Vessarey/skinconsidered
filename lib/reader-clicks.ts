/** Explicit opt-in targets survive CSS module names and visual redesigns.
 * Only fixed interface labels are accepted, never query text or reader input.
 */
const labels = new Set(["routine_open", "routine_index", "routine_context", "search_result"]);

export function readerClickLabel(value: string | null): string | null {
  return value && labels.has(value) ? value : null;
}
