import assert from "node:assert/strict";
import { test } from "node:test";
import { collectRows, reportWindow } from "./gsc-reporting.mjs";

test("28-day windows are inclusive and use Google's Pacific calendar", () => {
  assert.deepEqual(reportWindow(28, undefined, new Date("2026-09-19T01:00:00Z")), { startDate: "2026-08-20", endDate: "2026-09-16" });
  assert.deepEqual(reportWindow(28, "2026-09-16"), { startDate: "2026-08-20", endDate: "2026-09-16" });
  assert.deepEqual(reportWindow(28, "2026-08-19"), { startDate: "2026-07-23", endDate: "2026-08-19" });
  assert.deepEqual(reportWindow(1, "2026-09-16"), { startDate: "2026-09-16", endDate: "2026-09-16" });
});

test("invalid dates and windows fail instead of silently changing the report", () => {
  for (const value of [0, -1, 2.5, NaN, 487]) assert.throws(() => reportWindow(value));
  for (const value of ["2026-02-30", "yesterday", "2026-13-01"]) assert.throws(() => reportWindow(28, value));
});

test("pagination preserves full URLs, filters, and source aggregation", async () => {
  const calls = [];
  const url = "https://skinconsidered.com/dispatches/us-rf-microneedling-safety";
  const result = await collectRows(async (body) => {
    calls.push(body);
    return { responseAggregationType: "byPage", rows: body.startRow === 0 ? [{ keys: [url] }, { keys: [url + "-2"] }] : [{ keys: [url + "-3"] }] };
  }, { dataState: "final", dimensions: ["page"] }, 2);
  assert.equal(result.rows.length, 3);
  assert.equal(result.rows[0].keys[0], url);
  assert.equal(result.responseAggregationType, "byPage");
  assert.deepEqual(calls.map((call) => call.startRow), [0, 2]);
  assert.ok(calls.every((call) => call.dataState === "final"));
});
