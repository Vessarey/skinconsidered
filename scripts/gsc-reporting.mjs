export function dateOffset(date, days) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !Number.isFinite(Date.parse(date)) || new Date(date).toISOString().slice(0, 10) !== date) throw new Error("Use a valid YYYY-MM-DD date.");
  return new Date(Date.parse(date) + days * 86400000).toISOString().slice(0, 10);
}

export function reportWindow(days = 28, end, now = new Date()) {
  if (!Number.isInteger(days) || days < 1 || days > 486) throw new Error("Days must be an integer between 1 and 486.");
  const today = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Los_Angeles", year: "numeric", month: "2-digit", day: "2-digit" }).format(now);
  const endDate = end ? dateOffset(end, 0) : dateOffset(today, -2);
  return { startDate: dateOffset(endDate, -(days - 1)), endDate };
}

/** Fetch all rows the API exposes, not just the first click-sorted page.
 * Google still omits anonymized queries and may internally limit returned rows.
 */
export async function collectRows(query, body, pageSize = 25000) {
  const rows = [];
  let aggregation;
  for (let startRow = 0; ; startRow += pageSize) {
    const data = await query({ ...body, rowLimit: pageSize, startRow });
    aggregation ??= data.responseAggregationType;
    const batch = data.rows ?? [];
    rows.push(...batch);
    if (batch.length < pageSize) return { rows, responseAggregationType: aggregation };
  }
}
