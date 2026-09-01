import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const contentPath = join(here, "..", "lib", "content.ts");
const content = await readFile(contentPath, "utf8");

const forbiddenPrototypeClaims = [
  "FDA clears first OTC retinaldehyde",
  "Dr. Lena Okafor",
  "41,000 readers",
  "NAD+ precursors reverse photoaging",
  "Polynucleotide injectables match biostimulators",
];

const failures = [];

for (const claim of forbiddenPrototypeClaims) {
  if (content.toLowerCase().includes(claim.toLowerCase())) {
    failures.push(`Fictional prototype claim found: ${claim}`);
  }
}

const urls = [...content.matchAll(/url:\s*"([^"]+)"/g)].map((match) => match[1]);
for (const url of urls) {
  if (!url.startsWith("https://")) failures.push(`Source URL is not HTTPS: ${url}`);
}

const storyCount = (content.match(/slug:\s*"[^"]+",\s*\n\s*kind:\s*"(?:news|research|procedure|safety)"/g) ?? []).length;
const limitationCount = (content.match(/limitations:\s*"/g) ?? []).length;

if (storyCount === 0) failures.push("No editorial stories found.");
if (storyCount !== limitationCount) {
  failures.push(`Each story needs a limitation: ${storyCount} stories, ${limitationCount} limitations.`);
}

if (urls.length < storyCount) failures.push("Some stories appear to have no source URL.");

if (failures.length) {
  console.error("Content audit failed:\n" + failures.map((failure) => `- ${failure}`).join("\n"));
  process.exit(1);
}

console.log(`Content audit passed: ${storyCount} stories, ${urls.length} source links, no prototype claims.`);
