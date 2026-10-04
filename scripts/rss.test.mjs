import assert from "node:assert/strict";
import { test } from "node:test";
import { escapeMarkup, rssDescription } from "../lib/rss.ts";
import { stories } from "../content/stories.ts";

test("every feed summary retains evidence, limitation and linked source labels", () => {
  for (const story of stories) {
    const html = rssDescription(story);
    assert.ok(html.includes(escapeMarkup(story.dek)));
    assert.ok(html.includes(escapeMarkup(story.signal)));
    assert.ok(html.includes(escapeMarkup(story.limitations)));
    for (const source of story.sources) {
      assert.ok(html.includes(`href="${escapeMarkup(source.url)}"`));
      assert.ok(html.includes(escapeMarkup(source.label)));
    }
  }
});

test("dated updates and corrections are visible newest-first without mutating content", () => {
  const updates = [
    { kind: "update", date: "2026-09-01", dateLabel: "September 1, 2026", note: "Expanded scope." },
    { kind: "correction", date: "2026-09-02", dateLabel: "September 2, 2026", note: "Corrected batch." },
  ];
  const html = rssDescription({ ...stories[0], updates });
  assert.ok(html.indexOf("Correction — September 2") < html.indexOf("Update — September 1"));
  assert.equal(updates[0].kind, "update");
  assert.match(html, /Corrected batch/);
  assert.doesNotMatch(rssDescription({ ...stories[0], updates: [] }), /Updates and corrections/);
});

test("markup and URL query strings survive distinct HTML and XML escaping", () => {
  const html = rssDescription({ ...stories[0], dek: '<script>alert("x")</script> & text', sources: [
    { label: 'Study <A> & "B"', url: "https://example.org/?a=1&b=2", published: "Date <unknown>" },
    { label: "Unsafe URL", url: "javascript:alert(1)" },
  ] });
  assert.doesNotMatch(html, /<script>|href="javascript:/);
  assert.match(html, /href="https:\/\/example.org\/\?a=1&amp;b=2"/);
  assert.match(escapeMarkup(html), /&amp;lt;script&amp;gt;/);
  assert.match(escapeMarkup(html), /a=1&amp;amp;b=2/);
});
