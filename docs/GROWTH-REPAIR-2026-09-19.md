# Audience and reader-journey repair — September 19, 2026

## Outcome and release boundary

Applied focused local measurement and discovery fixes, preserving the existing design and pending reader/routine/newsletter work. No push, deployment, provider connection, email sending, analytics-dashboard mutation or paid service. Changes remain uncommitted alongside the pre-existing preview work; do not treat the full dirty diff as this task's changes.

The largest verified obstacle is delivery: the public homepage still shows September 1, while `/routines` and `/newsletter` return HTTP 404. Public `www` returns 200. The existing local canonical-host redirect returns 308 to the apex with the path preserved; it was not rewritten. Google URL Inspection for `https://www.skinconsidered.com/trends/microcurrent-devices` reports indexed, last crawled September 3, Google canonical on `www`, user canonical on the apex. `/routines` is unknown to Google. These checks establish a release/discovery gap, not the cause of every lost impression.

## Fresh baseline

Read September 19 around 15:30–15:32 UTC through the local Search Console service-account reader. Property: `sc-domain:skinconsidered.com`. Search type: web. Data state: finalized. Dates: inclusive Pacific calendar dates. Latest returned daily row: September 16; later unavailable dates are not counted as zero.

| Window | Clicks | Impressions | CTR | Source average position |
| --- | ---: | ---: | ---: | ---: |
| August 20–September 16 (28 days) | 0 | 2,035 | 0% | 59.9966 |
| July 23–August 19 (preceding 28 days) | unavailable | unavailable | unavailable | unavailable |
| September 10–16 | 0 | 400 | 0% | 57.8875 |
| September 3–9 | 0 | 1,624 | 0% | 60.7833 |

Totals are returned by Google's property aggregation, not sums or averages of page rows. The preceding 28-day request returned no rows. The latest seven-day impressions are down 75.4%, but this young site's sparse history and unknown query mix do not establish a causal explanation. Device impressions: desktop 1,583; mobile 438; tablet 14. All have zero clicks. These are search exposures, not visitors or on-site clicks.

The corrected page report returned 84 rows. Selected candidates:

| URL/path | Clicks / impressions | CTR / position | Decision and confidence |
| --- | --- | --- | --- |
| `www.skinconsidered.com/trends/microcurrent-devices` | 0 / 269 | 0% / 79.4 | Verified canonical mismatch; release existing redirect before changing copy. High confidence in technical observation, not ranking uplift. |
| `/ingredients/ruxolitinib-cream` | 0 / 202 | 0% / 75.5 | Low search visibility; no evidence for a broad title rewrite. |
| `/dispatches/us-rf-microneedling-safety-communication` | 0 / 117 | 0% / 7.2 | Visible query rows account for only 14 impressions. Preserve the accurate safety headline; no causal CTR claim. |
| `/dispatches/uk-simple-micellar-water-recall` | 0 / 82 | 0% / 10.6 | Four visible query rows account for 29 impressions, including “micellar water recall.” Existing title already addresses intent; preserve it. |
| `/procedures` | 0 / 70 | 0% / 5.8 | Only one visible query impression, irrelevant to the page. Fix verified discovery coverage rather than optimize to that query. |

Page rows use Google's page aggregation and are not expected to sum to property impressions. Anonymized queries and internal API limits remain even after pagination. Unusual query strings do not establish that traffic is human, bot, or AI-generated. No cross-period page deltas are inferred from the empty pre-launch comparison.

PostHog project 589734 could not be read: the connector returned `UNAUTHORIZED`, requiring reauthentication. Asked the owner to reconnect. Current visitors, referrers, returning readers, on-site click rates and conversions remain unavailable—not zero. No alternate credential was sought and no analytics settings were changed. Newsletter remains preview-only, not an active subscriber acquisition system.

## Applied changes and rationale

1. **Correct the search reporting tool.** Previously `dates 28` requested 29 inclusive days using UTC dates, cut URLs at 60 characters, and sorted only the first 100 click-ranked rows for the entry report. It now uses exact Pacific windows, complete URLs, pagination, explicit finalized/web filters, source aggregation, property totals, device reports, exact-page query filters, `--end` comparisons and timestamped `--json` output. Added tests for dates, invalid inputs and pagination. This makes future decisions reproducible; it does not create new traffic.
2. **Close click-measurement gaps.** CSS-module routine cards/context links and search results were outside the existing delegated CTA selector. Added explicit `data-reader-cta` markers and a fixed-label allowlist, reusing `cta_click` with its existing `label` and source `path` fields. No search text, destination query strings, email addresses, new automatic capture, recording or new SDK settings. Updated privacy copy. Unit and rendered-target checks establish local coverage; production ingestion still requires deployment and PostHog access.
3. **Include relevant safety reporting in procedure discovery.** The comparison page previously selected only `kind=procedure` or category `Procedure safety`, excluding device advisories explicitly linked to procedure files. It now also includes stories with related procedures. Today's Canadian counterfeit-laser advisory is reachable from that page. No medical claims, dates or visual layout changed.
4. **Audit routine sources too.** `audit:links` previously omitted the routine collection and its independent AAD context link. Added them to the same deduplicated audit. The complete run checked 296 unique URLs: 263 reachable, 33 blocked automated access, zero unreachable and zero confirmed broken. HTTP 403/412/429 blocks still require manual review; a successful status is not verification of every source's claims.

## Verification

- Content audit: 17 dispatches, 427 source links, 29 registry entries; lint and typecheck passed.
- Production build passed with 270 generated pages/assets. Stopped only verified project preview PID 92273; rebuilt and restarted on loopback as PID 15772.
- 44 Node tests passed before and after the build, including four new reporting/click-label tests. Final lint and `git diff --check` passed.
- Browser checks passed at 375px and 1280px: five hubs, search results and Back recovery, routine/context/newsletter-preview navigation, consent-based player fixture, persistent procedure search/reset, and the newly exposed safety advisory. One H1 per hub, no horizontal overflow, uncaught errors or local analytics requests. The first test incorrectly expected one HydraFacial result; inspection found three legitimate matching profiles, so the test now checks the named match and a narrowed result set rather than an invented count.
- Local health crawl: 138 sitemap URLs plus 11 other internal links OK. Desktop/mobile routine screenshots saved at `/tmp/routines-1280.png` and `/tmp/routines-375.png` for visual review.
- Public health crawl: 127 sitemap URLs and three other internal links OK. A sitemap-only crawl misses not-yet-deployed routes, so `/routines` and `/newsletter` were checked independently and both returned 404.
- Local canonical-host request returns HTTP 308 to `https://skinconsidered.com/trends/microcurrent-devices`; the same public `www` path still needs release verification.
- Player testing uses an intercepted local fixture after the consent click, not a real playback/availability assertion. Local analytics requests must remain absent.

## Next decisions

Review and authorize a coherent release of the pending local preview, not just today's patch: routine routes, artwork, newsletter preview, source and privacy changes depend on that work. Reconnect PostHog. Before public rollout, manually resolve the 33 automated source-access blocks and verify the intended content set. Do not activate newsletter delivery without the separate provider/double-opt-in gate.

After release, check the changed routes and `www` redirect live, then inspect Google's canonical/indexing status. Review matched 28-day search windows two to four weeks after confirmed release/recrawl (earliest October 3 if released September 19), alongside production-only on-site second-page/CTA counts once available. Keep preview clicks separate from confirmed subscriptions. No scheduled follow-up was created.

Reproduce: `npm run gsc -- totals 28 --end 2026-09-16 --json`; `npm run gsc -- entry 28 --end 2026-09-16`; `npm run gsc -- queries 28 --end 2026-09-16 --page /procedures --json`. API contract: [Google Search Analytics query reference](https://developers.google.com/webmaster-tools/v1/searchanalytics/query).
