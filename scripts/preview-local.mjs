/** Start the already-built preview independently of the invoking terminal.
 * Local only: no deployment, launch agent, login item, or automatic restart.
 */
import { spawn } from "node:child_process";
import { closeSync, existsSync, mkdtempSync, openSync } from "node:fs";
import { createServer } from "node:net";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { setTimeout as delay } from "node:timers/promises";

const project = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const origin = "http://127.0.0.1:3000";
const preview = "http://localhost:3000/routines";

export async function portIsAvailable(port = 3000) {
  const probe = createServer();
  return new Promise((resolveProbe, reject) => {
    probe.once("error", (error) => error.code === "EADDRINUSE" ? resolveProbe(false) : reject(error));
    probe.listen(port, "127.0.0.1", () => probe.close(() => resolveProbe(true)));
  });
}

export async function isSkinConsidered(fetchPage = fetch) {
  try {
    const response = await fetchPage(`${origin}/routines`, { signal: AbortSignal.timeout(1500), redirect: "error" });
    return response.status === 200 && /Celebrity skincare routines, with sources \| In the Routine[^<]*Skin Considered/.test(await response.text());
  } catch { return false; }
}

export async function startPreview() {
  if (!await portIsAvailable()) {
    if (!await isSkinConsidered()) throw new Error("Port 3000 is already occupied by a different or unhealthy service. Nothing was stopped. Inspect that service before trying again.");
    console.log(`An existing Skin Considered preview is responding: ${preview}\nIt was not restarted; rebuild/restart explicitly if you changed source files.`);
    return;
  }
  if (!existsSync(join(project, ".next", "BUILD_ID"))) throw new Error("No production build found. Run npm run build first, then node scripts/preview-local.mjs.");
  const nextCli = join(project, "node_modules", "next", "dist", "bin", "next");
  if (!existsSync(nextCli)) throw new Error("Next.js is not installed in this checkout. Install the project dependencies before starting the preview.");
  const logDirectory = mkdtempSync(join(tmpdir(), "skin-considered-preview-"));
  const logPath = join(logDirectory, "server.log");
  const output = openSync(logPath, "a", 0o600);
  let child;
  try {
    child = spawn(process.execPath, [nextCli, "start", "--hostname", "127.0.0.1", "--port", "3000"], { cwd: project, detached: true, stdio: ["ignore", output, output] });
  } finally { closeSync(output); }
  let launchError;
  child.once("error", (error) => { launchError = error; });
  child.unref();
  for (let attempt = 0; attempt < 40; attempt += 1) {
    if (launchError || child.exitCode !== null || child.signalCode !== null) break;
    if (await isSkinConsidered()) {
      console.log(`Preview ready: ${preview}\nPID: ${child.pid}\nLog: ${logPath}\nBound to this Mac only. It can survive this terminal closing, but not a reboot or process termination.\nTo stop this instance: kill -TERM ${child.pid}\nAfter source changes, stop this instance, run npm run build, then run this command again.`);
      return;
    }
    await delay(250);
  }
  // Only terminate the child created by this invocation, never a process discovered by port.
  if (!launchError && child.exitCode === null && child.signalCode === null) child.kill("SIGTERM");
  throw new Error(`Preview did not become healthy; the new process was stopped if still running. Inspect ${logPath}${launchError ? ` (${launchError.message})` : ""}`);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  startPreview().catch((error) => { console.error(error.message); process.exitCode = 1; });
}
