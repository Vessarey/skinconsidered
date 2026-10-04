# Search refresh — September 22, 2026

## Outcome and scope

Fresh search data and live-page checks still favor reviewing and releasing the existing fixes over another speculative rewrite. The public microcurrent verdict remains older than the committed safety correction, www still serves a duplicate HTTP 200, and 12 locally prepared pages are absent publicly. This review adds only this report; it does not edit site source, deploy, push, publish, connect a service, or authorize the existing dirty checkout for release.

Repository: `/Users/vanessa/code/seosites/skinconsidered`; HEAD at review: `50f054d`. Earlier today's editorial work added the Taiwan advisory; do not repeat it. Existing reader, routine, newsletter and instrumentation changes are preserved.

## Comparable baseline

Read September 22 around 23:41–23:42 UTC using the existing project Search Console reader. Property `sc-domain:skinconsidered.com`; web search; final data; inclusive Pacific dates (`America/Los_Angeles`); all countries/devices. A daily request through September 21 returned September 20 as its latest row. September 21 is unavailable, not zero.

| Window | Clicks | Impressions | CTR | Source average position |
| --- | ---: | ---: | ---: | ---: |
| August 24–September 20, 28 days | 0 | 2,158 | 0% | 59.8804 |
| July 27–August 23, preceding 28 days | unavailable | unavailable | unavailable | unavailable |
| September 14–20, seven days | 0 | 253 | 0% | 57.5850 |
| September 7–13, preceding seven days | 0 | 788 | 0% | 58.8934 |

The preceding 28-day request returned no rows. Weekly impressions declined 67.9%; this is descriptive, not evidence of a cause. Property totals use by-property aggregation and must not be reconstructed by summing page rows. Device impressions: desktop 1,672 (position 56.7584), mobile 472 (70.6102), tablet 14 (71); all zero clicks.

PostHog project 589734 could not be read. Its required learning request returned `UNAUTHORIZED` / `oauth_token_invalid_grant`, requiring reauthentication. No credential workaround or service connection was attempted. Visitors, sessions, landing-page behavior and meaningful on-site click rates remain unavailable, not zero. Search impressions are not viewers, and Google search clicks are not total acquisition. Newsletter-preview interactions are not active subscriptions. Human/bot distinctions cannot be established from this evidence.

## Ranked candidates

Page metrics below cover August 24–September 20, with seven-day comparisons September 14–20 versus September 7–13. The fully paginated page reports returned 84, 40 and 65 rows respectively; console display limits were not API row caps. All listed page CTRs are 0%.

| Priority / URL | Clicks / impressions / position | Comparison | Evidence and confidence | Prepared action / scope |
| --- | --- | --- | --- | --- |
| 1. `www.skinconsidered.com/trends/microcurrent-devices` | 0 / 296 / 80.3682 | 73 vs 144 weekly impressions | High confidence: live verdict still says “Harmless, low value”; committed local correction says “Needs care”. Indexed Google canonical remains www despite apex user canonical. Effect on traffic unknown. | Review and release the existing page-specific evidence correction (`e88a890`) and existing sitewide www-to-apex redirect; verify both separately. No new rewrite. |
| 2. `/routines` plus 11 prepared paths | Unavailable | Unavailable | High confidence: every listed path is absent from the public sitemap and returns 404; routines is unknown to Google. No search demand inferred. | Review a coherent pending release, including dependencies and source-access caveats. No blanket approval of dirty files. |
| 3. `/dispatches/uk-simple-micellar-water-recall` | 0 / 84 / 10.5714 | Five current-week impressions | Visible branded recall intent; only 29 visible query impressions. Medium confidence in recognition benefit, insufficient evidence of CTR effect. | Release existing page-specific Simple headline; preserve recall facts and dates. |
| 4. `/procedures` | 0 / 73 / 5.8219 | 26 vs 27 weekly impressions | Stable small sample, on-site behavior unavailable; one visible query impression cannot explain the page total. | Preserve current title; verify prepared discovery and reader-click paths after release. Hub scope. |
| 5. `/dispatches/us-rf-microneedling-safety-communication` | 0 / 117 / 7.2137 | No fresh query-level diagnosis this review | Position and zero clicks alone do not establish a snippet defect. | Preserve accurate safety framing; assess after release and recrawl. No new copy change. |

Microcurrent's 43 visible query rows account for 280 of 296 page impressions, including “microcurrent” 62, “microcurrent facial” 44, “microcurrent facial side effects” 34, “microcurrent facial treatment” 22, and “does microcurrent work” 14. Its existing efficacy title is relevant; weak positions do not establish a title-only problem. Safety-query exposure supports prioritizing the already prepared correction, not claiming it will increase clicks.

Simple recall has four visible query rows / 29 impressions: “micellar water recall” 17, “simple micellar water recall” seven, “simple micellar water product recall” four, and a spelling variant one. Procedures has one visible row / one impression involving an unrelated commercial-domain legitimacy phrase; it is not a defensible optimization target. Sparse or unusual queries do not prove AI or bot traffic.

## Existing before/after awaiting delivery

No new content text was changed by this review. Direct HTML comparisons confirm:

| Target | Live | Local prepared version | Reader-value hypothesis |
| --- | --- | --- | --- |
| Microcurrent verdict, also used at start of meta description | `Verdict: Harmless, low value.` | `Verdict: Needs care.` | Removes an unsupported blanket safety reassurance; this is an accuracy correction, not a CTR promise. |
| Simple recall title | `A U.K. micellar-water recall now covers three bottle sizes — Skin Considered` | `Simple micellar water recall covers three U.K. bottle sizes — Skin Considered` | Names the affected brand for recognizable recall intent; actual search title display and benefit are unproven. |
| www microcurrent response | HTTP 200, no Location header | Existing configuration intends path-preserving 308 to apex | Consolidates host handling once actually delivered; not proof of Google's eventual canonical choice. |

Microcurrent title remains `Microcurrent facial devices: does it work? — Skin Considered`. Its description is generated by `app/trends/[slug]/page.tsx` from the verdict/content in `content/trends.ts`; this is not a new shared-template edit. The local correction also qualifies the evidence and safety scope as recorded in the September 21 correction commit. Simple's title comes from `content/stories.ts` through the dispatch template. Its description is unchanged: `The affected batches may be microbiologically contaminated and could cause eye inflammation. The official notice lists the exact bottle sizes and batch…`.

Procedures' title and description match live/local. All three inspected live pages return 200, specify apex canonicals and have no noindex directive. Local preview canonicals use localhost by configuration; that is not a production canonical failure.

## Fresh discovery and delivery checks

Production parity check: 139 local expected sitemap URLs versus 127 public sitemap URLs. All 127 existing public sitemap pages and three additional internal links pass. These 12 expected pages are absent from the sitemap and return 404 (24 findings are two observations per missing page, not 24 missing pages):

- `/routines`
- `/routines/hailey-bieber`
- `/routines/dua-lipa`
- `/routines/issa-rae`
- `/newsletter`
- `/newsletter/2026-09-04`
- `/dispatches/taiwan-medicube-cream-advisory-2026`
- `/dispatches/canada-counterfeit-soprano-laser-advisory-2026`
- `/dispatches/singapore-nu-skin-dermatic-effects-recall-2026`
- `/dispatches/eu-sunscreen-in-vitro-testing-2026`
- `/dispatches/fda-paba-trolamine-sunscreen-final-order-2026`
- `/dispatches/canada-kohl-lead-recall-2026`

Fresh URL Inspection: www microcurrent is submitted/indexed, indexing and robots allowed, last crawl September 3 at 01:56:05 UTC. Google-selected canonical is www; user canonical is apex. `/routines` is unknown to Google. Inspection is Google's stored state, not a new crawl. The direct www GET still returns HTTP 200 with no redirect.

## Validation and follow-up

- This review: fresh finalized Search Console totals/pages/devices/query-by-page data, two URL inspections, public/local metadata comparisons and public parity crawl. The parity check correctly fails on the 12 undelivered paths.
- Fresh local browser checks at 375px and 1280px: microcurrent, Simple recall and procedures each rendered one H1, the expected title and lead, no horizontal overflow and no uncaught page errors. Microcurrent shows the September 21 review date and corrected qualified evidence text. These are rendered DOM/layout checks, not new interaction-flow or visual-screenshot review.
- Report-only change: no new source/template build is required. Earlier September 22's editorial run passed content audit, lint, typecheck, production build (272 pages/assets), 54 Node tests, desktop/mobile article/listing checks and local health crawl (139 sitemap URLs plus 11 internal links). These are explicitly earlier same-day results, not rerun or production validation. See `DAILY-EDITOR-2026-09-22.md`.
- No new medical claim or full external-source audit in this SEO review. September 19's automated source-access blocks still require release review and do not by themselves prove broken sources.
- Existing fixed-label reader-click instrumentation is locally prepared; PostHog ingestion and conversion denominators cannot currently be verified.

Next best action: owner review and explicit approval for the coherent pending release, prioritizing the safety correction, plus separate PostHog reauthentication. Do not deploy from this report alone. After approval, verify all expected URLs, redirect path preservation, metadata/canonicals and production event ingestion without search-text/email capture. Subscriber sending remains separately gated.

Compare matched search periods two to four weeks after verified release/recrawl; set dates only when delivery occurs. Evaluate impressions, position, query/device mix, clicks and meaningful actions together. Low volume may require a longer window, and an ordinary before/after comparison is not causal evidence. No new automation was created.

Reproduce baseline: `npm run gsc -- totals 28 --end 2026-09-20 --json`, `npm run gsc -- pages 28 --end 2026-09-20 --json`, `npm run gsc -- queries 28 --end 2026-09-20 --page /dispatches/uk-simple-micellar-water-recall --json`. Reproduce release comparison: `npm run site:health -- https://skinconsidered.com --expected-sitemap http://localhost:3000/sitemap.xml`.
