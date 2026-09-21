# Daily editor — September 21, 2026

## Selection and evidence scan

No genuinely new publication-worthy development since the September 20 run was verified in this bounded scan. This is not exhaustive global surveillance. Today's earlier SEO baseline/report is already committed as `d8443fd`; this run does not repeat that work or claim another analytics refresh.

- [Health Canada recalls](https://recalls-rappels.canada.ca/en) and [HSA announcements](https://www.hsa.gov.sg/announcements/) still surfaced the September 18 counterfeit-laser advisory and NU SKIN recall already covered.
- [TGA sunscreen updates](https://www.tga.gov.au/resources/explore-topic/sunscreens) still led with the September 11 4-MBC proposal; future consultation dates were not treated as final decisions.
- [FDA cosmetics updates](https://www.fda.gov/cosmetics/cosmetics-news-events) led with the September 9 registration-certificate clarification. [FDA drug updates](https://www.fda.gov/drugs/news-events-human-drugs/whats-new-related-drugs) surfaced a September 15 Kybella labeling communication, predating this scan window; not repackaged as today's news.
- [MHRA safety alerts](https://www.gov.uk/drug-device-alerts) led with September 17 fetal-monitoring RF and clobazam notices, not a new aesthetic RF warning.
- PubMed searches for September 20–21 returned unrelated work and older online articles carrying September issue dates; no new directly relevant human skincare result was verified.
- Smithsonian/Met searches surfaced the [September museum calendar](https://americanhistory.si.edu/press/releases/September-2026-calendar), not a new skin-history finding. A direct Met perspective request failed; it was not treated as reviewed evidence.

## One improvement: correct the microcurrent evidence and safety framing

The existing `/trends/microcurrent-devices` file called devices “Harmless, low value,” repeated that reassurance in its buying advice, and asserted every lift was swelling fading within hours or days. Those statements exceeded the cited evidence and conflicted with the file's own precautions. This is an editorial correction, not a new clinical development or a speculative SEO title experiment.

| Evidence | What it supports | Limit and conflict |
| --- | --- | --- |
| [Choi et al., January 18, 2024](https://link.springer.com/article/10.1007/s10103-024-03982-8), also linked through [PubMed](https://pubmed.ncbi.nlm.nih.gov/38236440/) | Eight-week split-face study, 36 healthy Korean women; several measures improved; no adverse effects observed | Combined four energies: cannot isolate microcurrent or establish long-term safety. University funding and LG-supplied devices; reported no company study/manuscript role or competing interests. |
| [Cohen et al., online May 3, 2021; 2022 journal volume](https://link.springer.com/article/10.1007/s00403-021-02231-0) | Review of home dermatology devices identifies long-term evidence gaps | Broad device review, not proof of durable lifting or a uniform duration for standalone microcurrent; authors declare no conflicts. |
| [FDA electrical muscle stimulators](https://www.fda.gov/medical-devices/consumer-products/electronic-muscle-stimulators) | Reported harms and implanted-device interference warrant attention to model-specific warnings | Broader EMS category; cannot estimate risk for every facial device or be presented as a new recall. |

Changes in `content/trends.ts`:

- Verdict becomes “Needs care”; grade remains C for the microcurrent-alone claim.
- Replace categorical benefit/duration assertions with the actual study design, population, observation period, combined-modality limitation and commercial disclosures.
- Replace blanket reassurance with model-specific instructions and clinician advice when suitability is uncertain. General EMS reports are expressly distinguished from facial-device incidence estimates.
- Swap the generic FDA wellness-policy citation for the relevant FDA consumer safety page. Existing FDA/literature registry coverage suffices; no new regulator was added.
- Set the actual file review date to September 21 and add a dated correction that renders on the file and `/corrections`. No unrelated review dates, edition date, headline, URL or evidence grades changed. The verdict also flows into existing metadata and the trends card.

The content audit initially rejected a file review later than the September 5 edition. Added a narrow rule for trend files: later reviews must have a matching dated update/correction. Existing update validation still rejects future dates, invalid kinds, missing notes and mismatched date labels. This lets a real correction carry its honest date without falsely redating the whole publication.

## Validation

- Content audit, lint and typecheck passed. Audit: 17 dispatches, 427 source links, three logged updates, no prototype claims.
- Production build passed: 270 generated pages/assets. Stopped only verified project-owned preview PID 52557 before rebuilding and restarted the loopback preview.
- All 51 Node tests passed, including three new correction/date-record tests. The first test run included five HTTP-dependent routine checks while the server was stopped; they failed with connection refused, then passed after build/restart. No application fix was needed for those test-order failures.
- Dedicated browser checks passed at 375px and 1280px: verdict, metadata, Article modification date, population/evidence limitation, safety distinction, FDA source link, correction-log round trip and trends-card propagation. One H1, no horizontal overflow or uncaught errors; full-page screenshots visually reviewed at both widths. Initial test assumptions about CSS-capitalized text and JSON-LD ordering were corrected to inspect source text and select the Article object explicitly.
- Local health crawl passed: 138 sitemap URLs and 11 other internal links. This is not a fresh public release-parity check.
- No full external-link audit this run; the previously reported 33 automated source-access blocks remain a separate release-review item. PubMed's initial browser response was empty, so the cited records were verified using NCBI's public XML endpoint and the publisher's accessible abstract/disclosure sections; no paywall was bypassed.

Only this correction, its date-audit support, tests and report belong in the commit. All pre-existing pending work remains untouched and uncommitted. Active checkout is `/Users/vanessa/code/seosites/skinconsidered`, replacing the absent legacy automation path.

## Audience and next action

Today's earlier verified Search Console report covers August 23–September 19: 2,136 impressions, zero clicks; www microcurrent has 285 impressions at average position 79.9965. This supports prioritizing a reader-facing accuracy problem on an exposed page, not claiming improved ranking or clicks. PostHog remains blocked by the reauthentication failure observed earlier today; no visitor or conversion count is available. Newsletter remains a preview.

No push, deployment, public publication, spend, contact, email or service connection. Next: review this correction as part of the coherent pending release, resolve outstanding source-review caveats and obtain owner publication approval; then verify the live correction, missing routes and canonical redirect. Reauthenticate PostHog separately for audience analysis.
