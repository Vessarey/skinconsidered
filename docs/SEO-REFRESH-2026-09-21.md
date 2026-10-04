# Search refresh — September 21, 2026

## Outcome and scope

Refreshed Search Console evidence and verified the existing local improvements against production. No additional site-copy or template rewrite is justified before the prepared release reaches readers. This report is the only new file from this review; existing dirty reader, routine, newsletter and measurement work is preserved. Nothing was pushed, deployed, sent or connected. There is no claim of audience growth from unpublished changes.

The most actionable findings are a release gap and a canonical-host discrepancy, not proof that every zero-click page needs a new headline. The previously prepared Simple recall headline already matches the observed branded recall queries more clearly. Do not repeat that edit.

## Baseline

Read September 21 around 12:50–12:52 UTC using the existing project Search Console reader. Property `sc-domain:skinconsidered.com`; web search; finalized data; inclusive dates in America/Los_Angeles; all countries and devices. Latest returned daily row: September 19. No preliminary or later unavailable days counted as zero.

| Window | Clicks | Impressions | CTR | Source average position |
| --- | ---: | ---: | ---: | ---: |
| August 23–September 19, 28 days | 0 | 2,136 | 0% | 59.8521 |
| July 26–August 22, preceding 28 days | unavailable | unavailable | unavailable | unavailable |
| September 13–19 | 0 | 276 | 0% | 59.2174 |
| September 6–12 | 0 | 996 | 0% | 58.7882 |

The preceding 28-day request returned no rows. Weekly impressions fell 72.3%; this is descriptive, not evidence of a particular cause. Source property totals are not sums of page rows. Device impressions: desktop 1,660 (position 56.7928), mobile 462 (70.5065), tablet 14 (71); all zero clicks. These are Google search exposures and clicks, not site visitors or on-site interactions.

PostHog project 589734 remains inaccessible: the connector's required learning request returned unauthorized and requires reauthentication. Visitor counts, landing-page behavior, returning-reader rates and conversion denominators are unavailable, not zero. No alternative credentials were sought. Newsletter preview interactions are not confirmed subscriptions.

## Ranked opportunities

All page metrics below cover August 23–September 19. Weekly comparison is September 13–19 versus September 6–12. The page report returned 84 rows; page aggregation differs from property aggregation.

| URL (apex unless specified) | Clicks / impressions / CTR / position | Weekly impressions | Observation and confidence | Action and scope |
| --- | --- | --- | --- | --- |
| `www.skinconsidered.com/trends/microcurrent-devices` | 0 / 285 / 0% / 79.9965 | 76 vs 155 | Public www serves HTTP 200; Google-selected canonical is www despite apex user canonical. High confidence in discrepancy; impact unknown. | Release and verify existing path-preserving www→apex 308 redirect. Configuration is sitewide, not a new change today. |
| `/routines` and ten other prepared paths | No reported metrics; unavailable | unavailable | All 11 absent from live sitemap and return 404; routines is unknown to Google. High confidence in release gap. | Review and authorize the coherent pending release. No claimed search demand or uplift for these new URLs. |
| `/dispatches/uk-simple-micellar-water-recall` | 0 / 84 / 0% / 10.5714 | 5 vs 20 | Branded recall intent; 29 visible query impressions out of 84. Medium confidence in title clarity benefit; insufficient evidence of CTR effect. | Ship existing page-specific headline below; leave medical facts and dates unchanged. |
| `/procedures` | 0 / 73 / 0% / 5.8219 | 27 vs 27 | Stable weekly impressions; on-site behavior unavailable. | Preserve title; release existing relevant safety-story discovery and verify the reader journey. Hub scope only. |
| `/dispatches/us-rf-microneedling-safety-communication` | 0 / 117 / 0% / 7.2137 | 1 vs 92 | Only 14 visible query impressions across ten rows. Low confidence in any snippet diagnosis. | Preserve accurate FDA safety headline. Monitor after release/recrawl, do not optimize to sparse query fragments. |

Microcurrent has 269 visible query impressions across 43 rows, including “microcurrent” (56), “microcurrent facial” (42), “microcurrent facial side effects” (34), and “does microcurrent work” (13). Its existing title already addresses efficacy. Positions are generally weak; no evidence establishes a title-only CTR problem. A future evidence-and-safety review could be useful, but no new medical claims or unsupported safety language were added in this SEO review. Ruxolitinib has 203 impressions at position 75.1182; one recent-week impression cannot justify interpreting its weekly position as a meaningful improvement.

Visible query coverage is incomplete and must not be generalized to full page impressions. Missing or unusual queries do not prove AI or bot traffic. No human-traffic classification is available here.

## Exact existing title change awaiting release

Target: `/dispatches/uk-simple-micellar-water-recall`, generated from `content/stories.ts` by the dispatch page template.

- Live title/H1: “A U.K. micellar-water recall now covers three bottle sizes”.
- Local title/H1: “Simple micellar water recall covers three U.K. bottle sizes”.
- Both HTML titles append “— Skin Considered”.
- Description unchanged: “The affected batches may be microbiologically contaminated and could cause eye inflammation. The official notice lists the exact bottle sizes and batch…”.
- Hypothesis: naming Simple helps readers recognize whether the recall concerns their product. No promised CTR uplift; Google can generate a different title link. [Google title-link guidance](https://developers.google.com/search/docs/appearance/title-link).

The public article remains source-linked and factually specific; this is a recognition improvement, not a new recall development. [Current public article](https://skinconsidered.com/dispatches/uk-simple-micellar-water-recall).

## Discovery and release evidence

Fresh production parity check: 127 live sitemap URLs versus 138 local expected URLs. Existing public sitemap pages and three additional internal links pass the health check. The following 11 expected paths are missing from the sitemap and return HTTP 404 (22 findings represent two checks per missing page, not 22 missing pages):

- `/routines`
- `/routines/hailey-bieber`
- `/routines/dua-lipa`
- `/routines/issa-rae`
- `/newsletter`
- `/newsletter/2026-09-04`
- `/dispatches/canada-counterfeit-soprano-laser-advisory-2026`
- `/dispatches/singapore-nu-skin-dermatic-effects-recall-2026`
- `/dispatches/eu-sunscreen-in-vitro-testing-2026`
- `/dispatches/fda-paba-trolamine-sunscreen-final-order-2026`
- `/dispatches/canada-kohl-lead-recall-2026`

URL Inspection: www microcurrent submitted/indexed, last crawled September 3 at 01:56:05 UTC, Google canonical www and user canonical apex. Simple recall submitted/indexed, last crawled September 2 at 06:33:07 UTC, matching apex canonicals. Both allow indexing and robots access. Routines is unknown to Google. Inspection describes Google's stored state, not a fresh crawl guarantee.

## Validation and follow-up

- September 21: content audit, lint, typecheck and production build passed; build generated 270 pages/assets. Audit covers 17 dispatches and 427 source links and checks for prototype claims.
- Local route health passed: 138 sitemap URLs plus 11 non-sitemap internal links. This is local readiness, not production parity.
- Browser checks passed at 375px and 1280px: Simple recall, RF safety and microcurrent each returned 200 with one H1, expected title/description, origin-relative canonical and no horizontal overflow or uncaught errors. Local canonical origins are intentionally localhost; public target canonicals were checked separately. Recall screenshots were captured for visual review.
- Existing growth-journey suite passed at both widths: five hubs, search/results/Back recovery, routine/context/newsletter-preview navigation, consent-based player fixture, persistent procedure filters/reset and safety-story discovery. No local analytics requests occurred; fixed event labels are locally verified, not proof of production ingestion. External video playback was intercepted with a local fixture and is not an availability claim.
- No full external-source audit rerun today. The September 19 audit's 33 automated-access blocks remain a manual review item; its historical result is not a fresh factual verification.

Next best action: owner review and approval for a coherent release of the pending work, plus PostHog reauthentication. Review the pending content/source-access caveats before publishing; do not treat this report as authorization or blanket approval of all dirty files. Newsletter sending remains separately gated.

After an approved release, verify each expected path returns 200, confirm www redirects with path preserved, inspect metadata and canonical selection, and verify production CTA ingestion without email/search-text capture. Then compare matched search periods two to four weeks after confirmed release/recrawl (October 5–19 only if release occurs September 21; otherwise shift the window). Evaluate queries, device mix, positions and meaningful reader actions alongside CTR. With low volume, extend observation rather than claiming causal uplift. No follow-up automation was created.

Reproduce search baseline: `npm run gsc -- totals 28 --end 2026-09-19 --json`, `npm run gsc -- entry 28 --end 2026-09-19`, and `npm run gsc -- queries 28 --end 2026-09-19 --page /dispatches/uk-simple-micellar-water-recall --json`.
