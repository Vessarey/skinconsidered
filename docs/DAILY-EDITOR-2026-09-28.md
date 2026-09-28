# Daily editor — September 28, 2026

## Outcome

Fixed a reproducible archive-search false positive: non-Latin and punctuation-only queries were treated as blank searches, returning the entire archive. No genuinely new publication-worthy development was established in the bounded scan below. No medical copy, article dates or edition dates changed.

Started from clean `release/2026-09-22` at `082e258`, reading AGENTS, the editorial playbook, recent commits and journal. Used the active checkout `/Users/vanessa/code/seosites/skinconsidered`, not the absent legacy path. Read installed Next.js accessibility guidance before editing. Existing release and procedure-focus work remain intact.

## Evidence reviewed

- [HSA announcements](https://www.hsa.gov.sg/announcements/): September 25 injectable-peptide warning remains the newest surfaced announcement and is already covered. The September 28 footer modification date is not a new advisory.
- [TGA sunscreen hub](https://www.tga.gov.au/resources/explore-topic/sunscreens): September 11 4-MBC review remains surfaced; no newer selected development.
- [Health Canada alerts](https://recalls-rappels.canada.ca/en): latest surfaced September 26 food recall and September 25 insulin, Sarclisa, cardiac-device and suture actions did not establish a new skincare item. Listing modification dates were not used as recall dates.
- [MHRA alerts](https://www.gov.uk/drug-device-alerts): latest surfaced meropenem leaflet defect is not a new aesthetic-procedure warning. FDA date-targeted search did not establish a relevant new cosmetic action.
- PubMed date-targeted searches surfaced a [September-issue alopecia follow-up](https://pubmed.ncbi.nlm.nih.gov/41917311/) without newly established publication timing since yesterday. September 28 issue dates also surfaced older, unrelated [pancreatic cancer](https://pubmed.ncbi.nlm.nih.gov/42303056/) and [lung cancer](https://pubmed.ncbi.nlm.nih.gov/42314966/) records. Issue and search crawl dates were not treated as new skincare findings.
- [Smithsonian skincare collection](https://www.si.edu/spotlight/health-hygiene-and-beauty/skin-care) remains useful historical context, not a newly dated finding. Targeted V&A search did not establish a new relevant history item.

This is a bounded scan, not comprehensive global surveillance or a full external-link audit.

## Reproduction and change

Before: `/search?q=敏感肌` and a punctuation-only query displayed “Showing 10 of 124 results.” ASCII-only normalization discarded every query character. Mixed-script searches could silently lose their non-Latin terms.

After: normalization retains Unicode letters, numbers and combining marks, including Japanese voicing marks. Nonempty queries that normalize to no searchable characters return no matches. Only truly empty or whitespace-only queries browse all entries. Existing Latin accent folding, full-width Latin normalization, aliases and spelling handling remain intact.

This is matching correctness, not translation or a claim of multilingual editorial coverage. An unsupported query now uses the existing honest empty state and recovery links. No new tracking, dependencies or external services were introduced.

## Verification

- Passed `npm run audit:content`: 19 dispatches, four guides, four culture files, 29 topicals, 45 procedures, 20 trends, one newsletter, 30 registry sources, 431 source links, three logged updates and no prototype claims.
- Passed lint, typecheck and production build (274 pages/assets). All 65 Node tests passed, including three new Unicode/empty-query regressions.
- New local browser checks passed at 375px and 1280px: honest empty states for nonmatching CJK, punctuation, emoji and mixed-script queries; reload; clear and Back recovery; full-width Latin matching and article navigation. No uncaught errors or local analytics requests.
- Existing search-pagination and growth-journey browser suites passed at both widths, including five hubs, procedure filters/reset, safety discovery and routine/newsletter-preview journeys. Video used the existing local fixture, not live playback.
- Visually inspected mobile and desktop screenshots: readable query, zero-result count, empty-state explanation and recovery actions; no horizontal overflow. Screenshots are local temporary artifacts under `/tmp/skin-search-20260928.n7BikH` and are not committed. This is not full screen-reader certification.
- Restarted only the verified project preview PID 6846 after the build. Local health passed: 140 sitemap URLs plus 11 additional internal links. `git diff --check` passed. No production-parity check this run.

## Audience limits and next step

No fresh audience query today. September 22's review recorded 2,158 search impressions and zero clicks for August 24–September 20, with PostHog requiring reauthentication. These are historical observations, not current visitor counts or a fresh access check. The reproducible search bug justified this change; no traffic, ranking or conversion improvement is claimed.

Next: include this repair in the owner-reviewed release and verify public search behavior after explicit deployment approval. Only the search helper, regression tests and run records are committed. No push, merge, deployment, subscriber/analytics connection, contact or spending.
