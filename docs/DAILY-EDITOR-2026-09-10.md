# Daily editor — September 10, 2026

## Decision and source scan

No new skincare development since the previous run was verified to the publication's evidence threshold in this bounded scan. No story, medical claim, source-review date, or edition date changed.

- [Health Canada recall index](https://recalls-rappels.canada.ca/en): reviewed recent listings; the September 4 kohl recall is already on file. No later relevant action was verified.
- [MHRA alerts](https://www.gov.uk/drug-device-alerts) and [TGA sunscreen topic page](https://www.tga.gov.au/resources/explore-topic/sunscreens): no newly dated relevant action since yesterday was established from the pages reviewed.
- [HSA medical-device guidance](https://www.hsa.gov.sg/medical-devices/guidance-documents/): September guidance revision is not by itself evidence of a changed cosmetic safety rule. Did not create a consumer warning from administrative guidance.
- [NCBI MedGen research listing](https://www.ncbi.nlm.nih.gov/medgen/7521) surfaced a September 9 picosecond-laser paper (DOI 10.1002/lsm.70205). Direct paper details were not retrievable; the title/index alone cannot establish sample size, comparator, adverse events, funding, or conflicts. Held as an unverified research lead, not a publishable result.
- [PubMed vitiligo cohort record](https://pubmed.ncbi.nlm.nih.gov/42447511/) did not establish a newly published result since the last run in the retrievable evidence. Search indexing dates were not treated as publication dates.
- Date-targeted FDA and museum searches did not yield a verified new relevant development. This is not an exhaustive negative finding; indexing and retrieval limitations remain.

## One reader improvement

Fixed the reading-progress indicator becoming stale when content changes page height without a scroll or viewport resize. A browser regression test reproduced the defect in the previous build: appending content below the article caused the accuracy assertion to time out. This is a controlled reproduction of late-loading/expanded content, not a claim that a specific live image failed.

The component now observes document/body size changes, schedules its existing animation-frame update, and disconnects the observer on unmount. Progress is clamped to 0–1, including negative overscroll. It remains decorative and does not trigger React renders while scrolling. No visual redesign or editorial changes.

Added `scripts/reading-progress.browser.mjs`. It uses an installed Playwright package, optionally selected with `PLAYWRIGHT_MODULE`, and an optional `BROWSER_CHANNEL` (this run used Chrome). `SCREENSHOT_DIR` optionally saves viewport screenshots. The default target is the local preview; `SITE_URL` overrides it for testing. No dependencies were added.

## Verification

- Content audit, lint, typecheck, and production build passed; 262 static pages/assets generated.
- Existing launcher, reader, and routine tests: 17 passed.
- Browser regression passed at 1280×900 and 375×812: scrolling, page-height growth/removal without scrolling, page end, desktop/mobile navigation and back, one H1, no horizontal overflow, and no uncaught page errors.
- Desktop/mobile screenshots inspected; existing typography/layout preserved. Reduced-motion preference enabled for the regression run.
- Explicit local health crawl: 134 sitemap pages OK, plus 11 internal links checked. An initial default-target read-only health crawl also passed for 127 live sitemap pages; that does not establish deployment of this fix.
- Stopped only the verified project-owned preview before building. Relaunched the rebuilt production preview with `scripts/preview-local.mjs`; loopback listener verified on `127.0.0.1:3000`, PID 57501. Preview remains available at http://localhost:3000/routines .

## Scope and owner gates

Worked in the verified current checkout `/Users/vanessa/code/seosites/skinconsidered`; the legacy scheduled checkout path remains absent. Preserved all unrelated pending reader/routine/newsletter changes. The daily commit contains only the reading-progress component, its browser regression, and this report.

No deployment, push, provider connection, email delivery, or analytics-growth claim. Celebrity-routine approval and public rollout remain owner gates. No new owner action arose from this small local maintenance fix.
