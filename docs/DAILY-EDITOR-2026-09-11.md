# Daily editor — September 11, 2026

## Decision

Added one local dispatch: `/dispatches/fda-paba-trolamine-sunscreen-final-order-2026`. This is a verified new regulatory development, not another maintenance-only day. It remains unpublished pending owner approval.

## Claim ledger and source checks

| Claim boundary | Primary verification |
| --- | --- |
| Formal issue date | [FDA order record](https://www.accessdata.fda.gov/scripts/cder/omuf/index.cfm?event=OrderDetail&orderid=OTC000008) and linked order cover: September 11, 2026. |
| Effective date differs from issue date | Order section VI provides the future effective date and disputed-order exception; both are retained in the dispatch. |
| Two actives, U.S. jurisdiction | Order sections I and IX; no extrapolation to all chemical filters or other markets. |
| Consumer significance | [FDA Q&A](https://www.fda.gov/drugs/understanding-over-counter-medicines/questions-and-answers-fdas-regulatory-actions-over-counter-sunscreen) and [consumer guidance](https://www.fda.gov/drugs/understanding-over-counter-medicines/sunscreen-how-help-protect-your-skin-sun): no consumer action requested; not a shelf-wide recall. |
| Date discrepancy | Consumer pages name September 10; formal order/registry name September 11. The article explicitly explains why it uses the latter. |
| Grade and conflicts | A grades the official action, not product efficacy. Sources are agency records, not a sponsored trial; no product endorsement. |

Read the formal PDF's relevant sections through web retrieval using the PDF skill. A separate direct command-line download returned 404, so local PDF rendering was unavailable. The article links the regulator's order-record page, which links the underlying document, rather than depending on a raw download URL. All three final source links independently returned HTTP 200. No access controls were bypassed. The web record and extracted formal document, not search-result publication labels alone, establish the report.

Other bounded scan results:

- [Health Canada](https://recalls-rappels.canada.ca/en): the new September 10–11 listings inspected concerned food, acetaminophen and other devices, not a verified new skincare action.
- [HSA](https://www.hsa.gov.sg/announcements/): newest listing concerned vaporiser enforcement. The older cosmetic recall was not relabeled as new.
- [MHRA notices](https://www.gov.uk/drug-device-alerts/field-safety-notices-31-august-to-4-september-2026) and [TGA sunscreens](https://www.tga.gov.au/resources/explore-topic/sunscreens): no stronger new relevant development established in this scan.
- PubMed results illustrated the issue-date trap: [cosmetic safety review](https://pubmed.ncbi.nlm.nih.gov/42549259/) was electronically published in July, and [topical collagen animal study](https://pubmed.ncbi.nlm.nih.gov/42603647/) has an August article date. September issue dates do not make them new human results.
- Museum/academic-history searches surfaced exhibition material without a verified new skincare-history finding. This was not an exhaustive search.

## Necessary editorial plumbing

The audit initially rejected the new story because it postdated the unchanged site edition. Updating that edition would also have implied fresh reviews of older files. Changed the dispatch/update date guard to reject future UTC dates instead, retaining ISO-date and label checks. A clock-controlled regression proves that tomorrow's new dispatch is still rejected.

Removed two automatic article claims that every source was checked on the global edition date. The header now labels that date as the site edition; the source drawer describes attribution without inventing a recheck. The new story states its own actual September 11 check. The edition and older source-review dates were not advanced.

Only these specific hunks from the already-dirty article component and audit script are included in the daily commit. Existing reader, routine, newsletter and navigation changes remain untouched and uncommitted.

## Validation

- `audit:content`, lint, typecheck and production build passed: 14 dispatches, 417 source links, 26 registry sources; 264 generated static pages/assets.
- 19 tests passed, including the two new regulatory/date-guard regressions.
- Headless Chrome: 1280×900 and 375×900, one H1, formal issue-date metadata, three source links, no obsolete source-check claim, no horizontal overflow or uncaught errors, desktop/mobile navigation to Latest and back into the story. Full-page screenshots inspected.
- New route present in RSS and sitemap. Local health crawl: 135 sitemap pages OK, plus 11 internal links checked.
- Built only after stopping the verified project-owned server; rebuilt preview is loopback-only on port 3000, PID 45429. `/routines` remains available for the pending owner review.

## Limits and next action

No traffic or conversion metrics were refreshed; this establishes no audience-growth result. Newsletter remains a preview, not verified email delivery. No provider connection, external messages, push or deployment occurred.

The current checkout remains `/Users/vanessa/code/seosites/skinconsidered`; the automation's legacy `/Users/vanessa/code/skinconsidered` path is absent. Verified the current checkout and recent history before work.

Next best action: review the new local regulatory dispatch alongside the pending reader/routine preview and decide whether to authorize public rollout. Before deployment, recheck the order record and effective-date status, especially if a dispute or revision appears.
