import assert from "node:assert/strict";
import { createServer } from "node:net";
import test from "node:test";
import { isSkinConsidered, portIsAvailable } from "./preview-local.mjs";

test("port check does not interfere with an occupied service", async () => {
  const server = createServer();
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const { port } = server.address();
  try { assert.equal(await portIsAvailable(port), false); assert.equal(server.listening, true); }
  finally { await new Promise((resolve) => server.close(resolve)); }
  assert.equal(await portIsAvailable(port), true);
});

test("health detection requires the correct successful page", async () => {
  assert.equal(await isSkinConsidered(async () => new Response("<title>Celebrity skincare routines, with sources | In the Routine — Skin Considered</title>")), true);
  for (const response of [new Response("Different application"), new Response("Skin Considered", { status: 500 }), new Response("Unavailable", { status: 404 })]) {
    assert.equal(await isSkinConsidered(async () => response), false);
  }
  assert.equal(await isSkinConsidered(async () => { throw new Error("offline"); }), false);
});
