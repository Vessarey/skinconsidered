/** A file-level review may follow the site edition when its change is logged.
 * Date format, update kind/content and future dates are audited separately.
 */
export function reviewHasDatedRecord(reviewed: string, edition: string, updates: { date: string }[] = []) {
  return reviewed <= edition || updates.some((update) => update.date === reviewed);
}
