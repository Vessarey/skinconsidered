# Daily editor — September 20, 2026

## Evidence reviewed and selection

No genuinely new publication-worthy development was verified in today's bounded primary-source scan. No article or review date was advanced.

- [Health Canada recalls](https://recalls-rappels.canada.ca/en) still led with the September 18 counterfeit-laser advisory already covered yesterday; the adjacent notices concerned cheese, MRI equipment and vehicles. The listing's September 20 modification date is not a new advisory date.
- [HSA announcements](https://www.hsa.gov.sg/announcements/) still showed the September 18 NU SKIN recall already covered, alongside a drug-reaction bulletin and non-cosmetic notices.
- [MHRA alerts](https://www.gov.uk/drug-device-alerts) led with September 17 wireless fetal-monitoring RF safety and clobazam barcode notices, not a new aesthetic RF warning.
- [TGA news](https://www.tga.gov.au/news) showed September 18 vaping enforcement and the already-covered September 11 4-MBC review. Listed consultation dates were not treated as new final rules.
- FDA September 19 searches returned outage schedules and older records with expiry dates. Anvisa searches returned administrative/health reporting and older documents with scheduled review dates, not a verified new skincare action.
- PubMed date searches returned older online publications in September issues, including a June-published graft-versus-host-disease review and older papers with September 19 dates from other years. No new human skincare efficacy result was verified. Smithsonian/Met searches surfaced museum activities, including a September 19 collage workshop, not a new skin-history finding.

This is a bounded selection, not exhaustive global surveillance. No clinical, cultural or regulatory claims were added to the publication.

## One improvement: make release checks detect missing routes

Yesterday's growth review established that a live-sitemap-only crawl could pass while new reader routes were absent from production. Following the analytics-led SEO skill, prioritized this directly observed discovery gap over speculative title changes.

| Observation | Change | Limit |
| --- | --- | --- |
| The target's sitemap cannot reveal routes it omits | Added opt-in `--expected-sitemap URL` comparison and target-host probes for missing paths | Reference routes must be reviewed; a preview is not publication approval |
| Missing canonicals and other metadata problems could still return success | Health findings now exit nonzero; missing canonicals are explicit | No claim of Google indexing or improved rankings |
| Empty/unsupported sitemaps could produce a misleading pass | Reject empty, non-urlset and off-origin sitemap inputs; deduplicate and decode paths | Supports this project's flat sitemap, not recursive sitemap indexes |

Default sitemap-only mode explicitly says release parity was not checked. Comparison mode reports route membership only, not content freshness. Normalized bare-origin canonical URLs prevent a false mismatch between `https://host` and `https://host/`; real host/path mismatches remain failures. Reference page URLs are not used as the crawl target. Metadata checks are skipped for failed HTTP responses to avoid redundant error noise.

Read-only live comparison command:

```sh
npm run site:health -- https://skinconsidered.com --expected-sitemap http://localhost:3000/sitemap.xml
```

Result: 138 expected routes, 127 public sitemap routes, **11 missing routes, all confirmed HTTP 404**. The tool exited 1 as intended. Missing: `/routines` and its three profiles; `/newsletter` and `/newsletter/2026-09-04`; and the five dispatches for Canadian counterfeit lasers, Singapore NU SKIN, EU sunscreen testing, the FDA sunscreen final order, and Canadian kohl. The 22 output findings represent two observations per missing route (sitemap absence and HTTP 404), not 22 different broken pages.

## Validation

- `audit:content`, lint, typecheck and production build passed; unchanged 17 dispatches, 427 source links, 29 registry entries and 270 generated pages/assets.
- All 48 Node tests passed. Four new tests cover sitemap comparison, invalid/empty/off-origin input, canonical normalization, and a real local HTTP fixture with CLI exit codes. The fixture verifies default-mode limitations, missing routes, successful comparison, metadata failure and no crawl of reference pages.
- Local comparison passed: 138 expected routes, none missing, all 138 pages OK and 11 additional internal links OK.
- Existing reader-journey browser checks passed at 375px and 1280px: five hubs, search and Back recovery, routines/context/newsletter previews, procedure search/reset and safety discovery. One H1 per hub, no overflow or uncaught errors, no local analytics requests. Routine screenshots visually inspected at both widths. Video mechanics used the existing local fixture, not a real playback claim.
- Verified project-owned preview PID 15772, stopped only that process before the build, and restarted loopback preview as PID 52557.
- Final diff whitespace checks passed. Only the health-check script, its new helper and tests, and this report belong in today's commit. Yesterday's uncommitted growth and preview work remains preserved.

## Audience limits and next action

No analytics refresh or connection attempted today. Yesterday's Search Console snapshot was 2,035 impressions and zero clicks for August 20–September 16; it is not a fresh September 20 total. Yesterday's PostHog reauthentication blocker remains unverified today. Newsletter remains a preview; no subscription or audience-growth outcome is claimed. Yesterday's 33 source-access blocks were not re-audited in this run.

The configured legacy path `/Users/vanessa/code/skinconsidered` remains absent; the active checkout is `/Users/vanessa/code/seosites/skinconsidered`. No push, deployment, public publication, spend, contact or service connection. Next best action: owner approval of a coherent release after remaining source checks, then use the new comparison against the approved preview to verify the intended routes landed. Reconnect PostHog separately for visitor/click analysis.
