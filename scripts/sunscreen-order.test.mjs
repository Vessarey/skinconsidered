import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { test } from "node:test";
import { stories } from "../content/stories.ts";

test("sunscreen order preserves formal issue date, delayed effect, scope and primary sources", () => {
  const story = stories.find((item) => item.slug === "fda-paba-trolamine-sunscreen-final-order-2026");
  assert.equal(story.date, "2026-09-11");
  assert.equal(story.grade, "A");
  assert.equal(story.location, "United States");
  assert.match(story.limitations, /September 11, 2027.*disputed/);
  assert.match(JSON.stringify(story.sections), /September 10.*September 11, 2026/);
  assert.match(story.whyItMatters, /not a recall/);
  assert.equal(story.sources.length, 3);
  assert.ok(story.sources.every((source) => new URL(source.url).hostname.endsWith("fda.gov")));
});

test("audit still rejects a story dated in the future, independently of the edition", () => {
  const result = spawnSync(process.execPath, ["--input-type=module", "--eval", `
    const OriginalDate = Date;
    globalThis.Date = class extends OriginalDate {
      constructor(...args) { super(...(args.length ? args : ['2026-09-10T12:00:00Z'])); }
    };
    await import('./scripts/content-audit.mjs');
  `], { cwd: new URL("..", import.meta.url), encoding: "utf8" });
  assert.equal(result.status, 1);
  assert.match(result.stderr, /fda-paba-trolamine-sunscreen-final-order-2026.*dated in the future/);
});
