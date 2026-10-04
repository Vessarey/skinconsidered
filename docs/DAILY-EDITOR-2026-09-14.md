# Daily editor — September 14, 2026

## Evidence reviewed and decision

No publication-worthy skincare development dated since the September 13 run was verified in this bounded scan. No article, medical claim, source-review date or edition date was changed. Search/indexing lag remains a limitation, not evidence that nothing happened globally.

- [FDA sunscreen Q&A](https://www.fda.gov/drugs/understanding-over-counter-medicines/questions-and-answers-fdas-regulatory-actions-over-counter-sunscreen) and date-targeted FDA searches returned the September 10 announcement already covered by the formal-order dispatch, plus the September 9 cosmetic-registration clarification. Neither was relabeled as today's news.
- [HSA announcements](https://www.hsa.gov.sg/announcements/) still showed September 10 vaporiser enforcement as the latest entry; [Health Canada](https://recalls-rappels.canada.ca/en) showed September 11 food/power-station recalls. A page-level September 14 modification date is not a new skincare recall.
- [MHRA's September 7–11 field-safety collection](https://www.gov.uk/drug-device-alerts/field-safety-notices-7-september-to-11-september-2026) was published September 14. Its listed products concern orthopaedics, diagnostics, a heart valve and imaging, not a relevant skincare/aesthetic-procedure development. Collection publication, issue-period and individual manufacturer notice dates differ.
- [TGA's 4-MBC announcement](https://www.tga.gov.au/news/media-releases/tga-consult-additional-controls-active-sunscreen-ingredient) is dated September 11 and is a useful newly identified editorial follow-up, although it predates this run's delta window. It describes proposed controls, not a ban or recall. Before drafting, read the full safety review and reconcile the announcement's consultation timing with the later date shown on the linked consultation listing. Do not claim a final rule or active consultation from the listing alone.
- PubMed-targeted September 13/14 searches yielded no verified new relevant human skincare result. One [September 13 issue-date match](https://pubmed.ncbi.nlm.nih.gov/42361860/) concerned cognition, not skincare, and had a June electronic-publication date.
- Anvisa searches surfaced August cosmetic-administration material and a secondary lead about adverse-event reporting; the linked primary announcement could not be retrieved, so no numerical claim was adopted.
- Met searches returned older publications. The [Beauty Studies in the Premodern World seminar notice](https://arthist.net/archive/53546/lang=en_US) concerns a series beginning September 7, not a new efficacy result or a September 14 historical discovery.

## One reader-experience improvement

Fixed the narrow mobile dispatch column recorded yesterday. At 375px, the first headline had only 108.94px of width despite 335px of available content space. The inherited evidence-panel `grid-column: 2` created an implicit second column when the reader layout requested a single column.

Added an eight-line scoped mobile override in `app/globals.css`: below/equal to 760px, the global feed has one flexible column, the decorative index is hidden, and the evidence panel uses column one below the copy. Desktop rules, typography, palette and editorial content are unchanged. The previously pending reader stylesheet was not edited or committed.

## Validation

- The new browser regression failed against the old preview at 375px (`108.9375/335` content width), then passed after the fix. The headline now uses 335px at 375px and 280px at 320px.
- Verified all 14 feed rows at 320, 375, 640, 641, 760, 761 and 1280px: full mobile copy column, evidence below the copy on mobile, side-by-side evidence above the breakpoint, one H1 and no horizontal overflow.
- At every width, tested region filtering, URL persistence after reload, filter reset and keyboard article navigation; no uncaught browser errors. Visually inspected 375px and 1280px screenshots. The intentional 28ch headline cap remains on wider screens.
- `npm run audit:content`, `npm run lint`, `npm run typecheck` and `npm run build` passed: 14 dispatches, 417 source links, 26 registry sources and 264 generated static pages/assets.
- All 25 existing Node tests passed against the rebuilt preview. An initial run during the stopped-preview build window had connection-refused failures; rerunning after startup passed. The new browser regression is additional to those 25 tests.
- Local health crawl: 135 sitemap pages OK plus 11 non-sitemap internal links checked.
- Stopped only the verified project-owned preview PID 23716 before rebuilding. Relaunched on loopback port 3000 as PID 13883; pending routine preview remains available.

## Scope, limits and next action

Read governance, recent commits and dirty status in the verified current checkout `/Users/vanessa/code/seosites/skinconsidered`; the scheduled legacy path remains absent. Commit scope is only the eight CSS lines, the new browser regression and this report. All unrelated artwork, reader, routine, newsletter and sitemap work remains pending and preserved.

Nothing pushed, deployed or published publicly. No analytics refresh, external-provider connection, email delivery or contact occurred. Newsletter remains preview-only; this layout repair establishes no audience-growth or conversion outcome. Yesterday's seven unverified source endpoints remain a pre-release manual-check task, not a freshly rechecked result.

Next best editorial action: fully verify the September 11 TGA 4-MBC review/consultation and assess an accurately dated explanatory dispatch. Public rollout still requires owner review and approval of the pending publication/routine preview.
