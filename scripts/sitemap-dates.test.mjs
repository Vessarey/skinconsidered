import assert from "node:assert/strict";
import { test } from "node:test";
import { dispatchListingDates } from "../lib/sitemap-dates.ts";

test("empty and older listings retain the edition date", () => {
  assert.deepEqual(dispatchListingDates("2026-09-05", []), { all: "2026-09-05", us: "2026-09-05" });
  assert.deepEqual(dispatchListingDates("2026-09-05", [{ date: "2026-09-01", location: "United States" }]), { all: "2026-09-05", us: "2026-09-05" });
});
test("new foreign stories do not advance the U.S. desk", () => {
  assert.deepEqual(dispatchListingDates("2026-09-05", [
    { date: "2026-09-11", location: "United States" },
    { date: "2026-09-12", location: "Canada" },
  ]), { all: "2026-09-12", us: "2026-09-11" });
});
test("updates advance listings without depending on order or mutating records", () => {
  const records = [{ date: "2026-09-06", location: "United States", updates: [{ date: "2026-09-12" }, { date: "2026-09-09" }] }];
  const original = JSON.stringify(records);
  assert.deepEqual(dispatchListingDates("2026-09-05", records), { all: "2026-09-12", us: "2026-09-12" });
  assert.equal(JSON.stringify(records), original);
});
