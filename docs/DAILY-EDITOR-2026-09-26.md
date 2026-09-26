# Daily editor — September 26, 2026

## Selected development

Prepared `/dispatches/singapore-unapproved-peptide-injections-warning-2026` from [HSA's September 25 consumer safety article](https://www.hsa.gov.sg/announcements/risks-of-obtaining-prescription-medicines-unauthorised-channels/). This is new since the last completed September 23 run. No September 24/25 completion was present in the journal or commits; this record does not claim those runs happened.

| Claim boundary | Editorial treatment |
| --- | --- |
| Official communication, not a new trial | Grade A applies to the advisory's documentation, not efficacy or quantified risk. |
| Singapore source, dated September 25 | Kept the original date; source review is September 26. No independently verified worldwide approval claim. |
| Prescription and experimental products differ | Kept the categories distinct; no instruction to stop prescribed treatment. |
| No denominator or case count supplied | Strongest limitation is visible near the top. Not presented as a recall or a topical-skincare assessment. |
| Commercial context | Identified a regulator communication rather than a commercially sponsored treatment trial. |

This belongs to the safety desk because readers may conflate topical peptide claims with injectable products. A contextual link leads to the separate topical-peptide file without transferring its evidence grade or recommendations to injectables. No dosage, sourcing recommendation for experimental products, or efficacy promise was added.

## Bounded wider scan

- [HSA announcements](https://www.hsa.gov.sg/announcements/) supplied the selected new item. Existing NU SKIN and Taiwan/Medicube coverage was not duplicated.
- [TGA sunscreen hub](https://www.tga.gov.au/resources/explore-topic/sunscreens) still surfaced the September 11 4-MBC review. [Taiwan FDA cosmetic alerts](https://www.fda.gov.tw/TC/csmLight.aspx?ntype=271) surfaced September 21 notices; no later new item selected. A maintenance date was not treated as a new event.
- [Health Canada alerts](https://recalls-rappels.canada.ca/en) surfaced September 24 health-product recalls, including a dose-display issue, rather than a new skincare notice selected for this desk.
- [MHRA alerts](https://www.gov.uk/drug-device-alerts) surfaced a meropenem leaflet defect and the already scanned field-safety roundup; no new aesthetic-procedure communication selected. FDA-targeted searches surfaced September 24 oncology approval news unrelated to skincare.
- PubMed date-targeted searches surfaced older-online papers and unrelated results. The [skin-fibrosis paper](https://pubmed.ncbi.nlm.nih.gov/42299858/) has a June 16 article date despite its September issue; the [hip-fracture disinfection paper](https://pubmed.ncbi.nlm.nih.gov/42764157/) concerns surgical-site infection, not evidence for a new consumer routine. Neither was repackaged as a fresh skincare result.
- Smithsonian/V&A searches surfaced exhibition listings and an object-care/AI display, not a newly established skincare-history development. A Smithsonian calendar URL redirected to its visitor page; this was not treated as verified calendar content.

This scan is bounded, not comprehensive global surveillance. The selected primary source was read directly. No full external-source audit was rerun.

## Implementation and validation

Started from clean `release/2026-09-22` at `56aa3b0`. Read AGENTS, the editorial playbook, recent commits/journal and prior run report. Active checkout is `/Users/vanessa/code/seosites/skinconsidered`; the automation's legacy path was not used. Preserved the existing search-pagination fix, release preparation, snippet work and canonical fallback.

- One new content record, three content tests, a local-only browser test, this report and a journal entry. HSA already exists in the source registry. No template, evidence policy, analytics, subscriber setup or unrelated article-date changes.
- Passed `npm run audit:content`, `npm run lint`, `npm run typecheck`, `npm run build`. Audit: 19 dispatches, 30 registry sources, 431 source links, three logged updates; no prototype claims. Build: 274 pages/assets.
- All 62 Node tests passed. New assertions cover date/jurisdiction, evidence limits, prescription/topical boundaries and separate global/U.S. listing dates.
- At 375px and 1280px: new article, source/schema dates, one H1, no overflow, Asia discovery and topical-context navigation passed. Article screenshots visually inspected; no uncaught errors or local analytics requests.
- Existing listing browser suite passed at both widths for homepage/global/U.S. navigation. RSS and sitemap include the new route; global dates advance from content while U.S./policy dates stay scoped.
- Local health passed: 140 sitemap URLs and 11 additional internal links. Started a loopback preview on an unoccupied port 3000; no existing process was stopped. No fresh production-parity check or live-publication claim.

## Audience limits and next action

No new analytics query or connection. The September 22 review's 2,158 Google impressions and zero clicks (August 24–September 20) are historical, not today's visitors. PostHog required reauthentication at that review; access was not retested. Local previews send no analytics, and the newsletter remains visibly preview-only. No audience or conversion uplift is claimed.

Commit only this verified local change. Next best action: owner review of the pending release and new advisory, then explicit deployment approval and public verification. Nothing was pushed, deployed, publicly published, purchased, sent to contacts, or connected to an external subscriber/analytics service.
