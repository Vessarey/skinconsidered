import assert from "node:assert/strict";
import { test } from "node:test";
import { countSourceCitations } from "../lib/source-coverage.ts";
import { sourceRegistry } from "../content/coverage.ts";
import { stories } from "../content/stories.ts";

test("DG GROW citations do not inflate Safety Gate's parent-domain count", () => {
  const result = countSourceCitations(sourceRegistry, stories.flatMap((story) => story.sources.map((source) => source.url)));
  assert.equal(result.find((entry) => entry.id === "eu-dg-grow").cited, 2);
  assert.equal(result.find((entry) => entry.id === "eu-safety-gate").cited, 1);
  assert.equal(result.find((entry) => entry.id === "iso").cited, 1);
});

test("most-specific domain wins regardless of registry order", () => {
  const registry = [{ id: "parent", domains: ["example.org"] }, { id: "child", domains: ["science.example.org"] }];
  const urls = ["https://www.science.example.org/paper", "https://EXAMPLE.ORG/report"];
  for (const entries of [registry, [...registry].reverse()]) {
    const result = countSourceCitations(entries, urls);
    assert.equal(result.find((entry) => entry.id === "child").cited, 1);
    assert.equal(result.find((entry) => entry.id === "parent").cited, 1);
    assert.ok(result.every((entry) => entry.status === "In use"));
  }
});

test("invalid and lookalike hosts do not claim coverage; repeated citations remain counted", () => {
  const registry = [{ domains: ["example.org", "www.example.org"] }, { domains: ["unused.org"] }];
  const result = countSourceCitations(registry, ["invalid", "https://notexample.org/a", "https://example.org.evil.test/a", "mailto:editor@example.org", "https://www.example.org/a", "https://www.example.org/a"]);
  assert.deepEqual(result.map(({ cited, status }) => ({ cited, status })), [{ cited: 2, status: "In use" }, { cited: 0, status: "Watchlist" }]);
  assert.deepEqual(registry, [{ domains: ["example.org", "www.example.org"] }, { domains: ["unused.org"] }]);
  assert.deepEqual(countSourceCitations([], ["https://example.org"]), []);
});
