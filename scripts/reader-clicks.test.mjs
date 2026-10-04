import assert from "node:assert/strict";
import { test } from "node:test";
import { readerClickLabel } from "../lib/reader-clicks.ts";

test("reader click labels cover routine and search journeys without collecting free text", () => {
  for (const label of ["routine_open", "routine_index", "routine_context", "search_result"]) assert.equal(readerClickLabel(label), label);
  for (const label of [null, "", "my health concern", "reader@example.test", "/search?q=private", "arbitrary_new_label"]) assert.equal(readerClickLabel(label), null);
});
