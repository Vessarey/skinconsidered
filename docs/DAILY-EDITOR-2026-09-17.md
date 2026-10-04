# Daily editor — September 17, 2026

## Evidence reviewed and decision

No newly dated, publication-worthy skincare development since the prior run was verified in this bounded scan. No story was manufactured or older source relabelled. Selected one editorial-transparency improvement: correct how the coverage page credits citations to registry sources and keep its desk count derived from the actual taxonomy.

- [FDA device news](https://www.fda.gov/medical-devices/medical-devices-news-and-events/cdrh-new-news-and-updates): September 16 entries concern development-tool education and radiology software; the hyperhidrosis skin-patch item surfaced by search is under June 29, not September 16. Cosmetics/sunscreen searches did not establish a new relevant action.
- [HSA announcements](https://www.hsa.gov.sg/announcements/): September 17 partnerships announcement; latest visible cosmetic recall remains August 28. No newly dated cosmetic safety action selected.
- [Health Canada recalls](https://recalls-rappels.canada.ca/en): September 16 multivitamin B6-label recall and September 15 food, vehicle, supplement and cannabis notices; not a new skincare item.
- [MHRA alerts](https://www.gov.uk/drug-device-alerts): September 16 hoist/slings alert remains the latest; no new cosmetic-procedure alert found. [TGA sunscreen consultation](https://www.tga.gov.au/news/media-releases/tga-consult-additional-controls-active-sunscreen-ingredient) remains September 11, already covered. Anvisa-targeted searches returned business-authorisation records rather than a verified new skincare restriction or safety notice.
- PubMed date searches surfaced [experimental gout microneedle research](https://pubmed.ncbi.nlm.nih.gov/42744308/), not a new human skincare result; other matches used issue dates or older publication dates. Smithsonian/Met searches returned existing [cosmetics collection material](https://americanhistory.si.edu/collections/object-groups/health-hygiene-and-beauty) and history explainers, not a verified new historical finding.
- Search indexing and retrieval limits mean this is not an exhaustive statement that nothing happened worldwide.

## What changed and why

Observed defect: `sourceCoverage()` credited every matching parent domain. Yesterday's `single-market-economy.ec.europa.eu` link was therefore counted under both DG GROW and Safety Gate's broader `ec.europa.eu` entry. This overstated Safety Gate's own citations (two instead of one).

- Added a pure citation-count helper that credits the most specific registered domain. Valid subdomains still match, lookalike hosts do not, invalid/non-web URLs are ignored, and repeated citations across files are intentionally retained.
- Wired it into the existing coverage calculation without taking ownership of pending routines/search changes in the same file.
- `/coverage` now explains the counting rule and distinguishes repeated citations from unique URLs. DG GROW has two citations, Safety Gate one and ISO one. This is domain attribution, not a claim of manual verification of every cited page.
- Replaced the hardcoded “Seven desks” with `taxonomy.length`: nine in the current preview, automatically following future taxonomy changes. No redesign, new evidence claims or edition-date refresh.

## Validation

- Content audit, lint, typecheck, production build and diff whitespace checks passed. Content totals unchanged: 15 dispatches, 424 source links, 28 registry entries, two logged updates; 266 generated static pages/assets.
- All 34 Node tests passed, including three new attribution/boundary tests. Existing article, RSS, sitemap, preview, search, privacy and newsletter-contract tests remain passing.
- New browser regression passed at 1280px and 375px: one H1, correct desk/card count, exact source counts, external-link target, explanatory copy, taxonomy navigation and no horizontal overflow or uncaught errors. Visually inspected desktop/mobile screenshots and the source card. Initial test used rendered uppercase text where it expected sentence case; switched the assertion to underlying text content without changing the design.
- Local health: 136 sitemap URLs OK; 11 additional internal links checked. Explicit `http://localhost:3000` origin used.
- Stopped only verified project-owned preview PID 11722 before building; relaunched loopback-only preview as PID 76848. Existing routine preview remains available.

## Limits and next best action

The current checkout is `/Users/vanessa/code/seosites/skinconsidered`; the legacy scheduled path is absent. Unrelated reader, routine, artwork, newsletter and sitemap changes remain untouched and unstaged. Only today's coverage changes, tests and report are committed.

No push, deployment, public publication, spending, external contact, subscriber/analytics connection or email delivery. Audience metrics were not refreshed; no growth result is established. Newsletter remains preview-only. The seven source endpoints unverified on September 13 remain a manual pre-release review item.

Next: owner review of the local article/coverage and pending publication preview, then resolve the outstanding source checks before any separately authorised public rollout. Continue the daily primary-source scan.
