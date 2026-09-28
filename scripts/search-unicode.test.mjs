import assert from "node:assert/strict";
import { test } from "node:test";
import { searchArchive } from "../lib/search.ts";

const entry = (title, terms = "") => ({ title, terms, description: "", type: "Guide" });
const archive = [entry("Retinol"), entry("敏感肌"), entry("肌のケア", "日本"), entry("피부 관리"), entry("Crème hydratante"), entry("はだ"), entry("ばだ"), entry("त्वचा")];

test("non-Latin search terms are retained rather than converted to browse-all", () => {
  for (const title of ["敏感肌", "肌のケア", "피부 관리", "त्वचा"]) {
    assert.deepEqual(searchArchive(archive, title).map((item) => item.title), [title]);
  }
  assert.deepEqual(searchArchive(archive, "日本").map((item) => item.title), ["肌のケア"]);
  assert.deepEqual(searchArchive(archive, "несуществующий"), []);
  assert.deepEqual(searchArchive(archive, "retinol 敏感肌"), [], "Neither part of a mixed-script query may be silently discarded");
});

test("Japanese combining marks remain significant while existing Latin accent folding works", () => {
  assert.deepEqual(searchArchive(archive, "はだ").map((item) => item.title), ["はだ"]);
  assert.deepEqual(searchArchive(archive, "ばだ").map((item) => item.title), ["ばだ"]);
  assert.deepEqual(searchArchive(archive, "は\u3099だ").map((item) => item.title), ["ばだ"]);
  assert.equal(searchArchive(archive, "creme")[0].title, "Crème hydratante");
  assert.equal(searchArchive(archive, "ＲＥＴＩＮＯＬ")[0].title, "Retinol");
});

test("only an empty or whitespace query browses all entries", () => {
  for (const query of ["", " \t\n", "\u3000"]) assert.deepEqual(searchArchive(archive, query), archive);
  for (const query of ["???", "—", "✨", "() !"]) assert.deepEqual(searchArchive(archive, query), []);
  assert.equal(searchArchive(archive, "retinol!")[0].title, "Retinol");
});
