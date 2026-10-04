# Daily editor — September 29, 2026

## Outcome

Repaired keyboard recovery from an empty archive search. No genuinely new publication-worthy skincare development was established in today's bounded source scan; no content or review dates changed.

Started from clean `release/2026-09-22` at `4f8ce3f` in the active checkout `/Users/vanessa/code/seosites/skinconsidered`. Read AGENTS, the editorial playbook, recent commits, journal and installed Next.js accessibility guidance. Yesterday's Unicode matching change is preserved.

## Evidence reviewed

- [HSA announcements](https://www.hsa.gov.sg/announcements/): latest surfaced September 25 injectable-peptide warning is already covered. No new selected announcement.
- [TGA sunscreen hub](https://www.tga.gov.au/resources/explore-topic/sunscreens): latest surfaced review is September 11 for 4-MBC. Future October consultation dates do not establish a final regulatory change today.
- [Health Canada alerts](https://recalls-rappels.canada.ca/en): September 28 entries include food allergens, fampridine, a cardiac-device lead and infusion equipment. None established a new skincare-specific item for this publication.
- [MHRA alerts](https://www.gov.uk/drug-device-alerts): September 23 meropenem leaflet defect and field-safety listing remain surfaced. [FDA device updates](https://www.fda.gov/medical-devices/medical-devices-news-and-events/cdrh-new-news-and-updates) show a September 28 companion-diagnostic listing update, not a new aesthetic-procedure warning. [FDA drug updates](https://www.fda.gov/drugs/news-events-human-drugs/whats-new-related-drugs) surfaced MCT8-deficiency treatment approval, outside this desk's scope.
- PubMed date search surfaced [PRMT1/OFIP epidermal-homeostasis research](https://pubmed.ncbi.nlm.nih.gov/42776747/) with September 29 issue date but September 23 article date; no newly published human skincare outcome since yesterday was established. The [topical atopic-dermatitis trial review](https://pubmed.ncbi.nlm.nih.gov/42446802/) has a July 14 article date. Issue dates were not treated as new findings. Direct retrieval of the first PubMed record was incomplete, so no clinical claim was drawn from it.
- Both attempted Smithsonian skincare collection URLs returned retrieval errors. Targeted Smithsonian/V&A searches did not establish a new skincare-history finding; [V&A's surfaced London history course](https://www.vam.ac.uk/event/vvOJ8zkPB9a/o26022-a-history-of-london-1066-1666-online) is not skincare evidence. Museum coverage is limited this run, not certified unchanged.

This is a bounded scan, not comprehensive global surveillance or a full source-link audit.

## Reproduction and repair

Before: open `/search?q=zzzz-nomatch`, focus “Clear search” and press Enter. Results return, but the active element becomes `BODY`, so immediate typing does not reach search. The URL update remounts the input, making a simple immediate focus call insufficient.

After: a pending reset intent survives the results remount and is consumed only when both the URL query and draft are empty. Focus returns to the actual current input. This also supports an unsent draft on `/search`, which clears without changing the URL. The flag is consumed once; ordinary history navigation does not request new focus. No search ranking, medical copy, tracking or dependencies changed.

The first implementation's browser test failed because focus ran before the URL-driven remount. The final implementation waits for the cleared input. Lint also required the passed mutable ref to use a `Ref` suffix; corrected before final validation.

## Verification

- Passed `npm run audit:content`: 19 dispatches, four guides, four culture files, 29 topicals, 45 procedures, 20 trends, one newsletter, 30 registry sources, 431 source links, three logged updates and no prototype claims.
- Passed `npm run lint`, `npm run typecheck`, `npm run build` (274 pages/assets) and all 65 existing Node tests on the final implementation.
- New browser regression passed at 375px and 1280px: saved search and unsent draft; Enter, Space and pointer reset; cleared query; first ten results restored; focus on the current input; immediate typing; Tab to Search; saved-query Back/Forward recovery; one H1 and no horizontal overflow.
- Existing Unicode, pagination and growth-journey browser suites passed at both widths. No uncaught errors or local analytics requests. Video checks used the existing local fixture, not live playback; event-label checks do not establish production ingestion.
- Mobile and desktop screenshots visually inspected: visible input focus outline, readable result count and cards, no horizontal overflow. Temporary screenshots: `/tmp/skin-search-reset-20260929.Zh5V68`. No full screen-reader or physical-phone certification.
- Local health passed: 140 sitemap URLs plus 11 additional internal links. Restarted only this run's verified project preview processes after builds. `git diff --check` passed. No production-parity check or deployment.

## Audience limits and next action

No fresh audience query today. The September 22 report recorded 2,158 search impressions and zero clicks for August 24–September 20; PostHog required reauthentication then. These remain dated observations, not current visitors or a fresh access check. This repair is justified by a reproduced reader failure, not an inferred conversion lift.

Next: include the repair in the owner-reviewed release, then verify public search recovery after explicit deployment approval. No push, merge, public deployment, subscriber/analytics connection, contact or spending.
