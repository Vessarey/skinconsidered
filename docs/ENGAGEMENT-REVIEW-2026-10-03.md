# Reader engagement and quality review — October 3, 2026

## Outcome and release boundary

Implemented and verified local improvements to image delivery, routine-to-guide discovery, repeat-reading options, mobile archive readability, and dependency security. The publication's palette, editorial identity, source claims, privacy settings and consent-based player behavior are preserved. No deployment, push, provider connection, email sending, spending or new analytics configuration occurred.

The strongest growth blocker is delivery, not another headline rewrite: a fresh production comparison found **14 reviewed local routes missing from the live sitemap and returning 404**. Local has 141 sitemap routes; production has 127. The live `www` homepage still returns HTTP 200 rather than redirecting to the apex. These local improvements cannot benefit production readers until an owner-approved release.

Checked October 3 evening America/New_York (October 4 UTC). Active checkout: `/Users/vanessa/code/seosites/skinconsidered`, branch `release/2026-09-22`, clean starting revision `aade0f0`. Earlier no-publication/provider-connection approval boundaries remain in force.

## Measured baseline and selected changes

Resource measurements used fresh local Chrome contexts at 375px and 1280px, before scrolling. Encoded image-body bytes are not total page weight, load time, field Core Web Vitals or proof of improved conversion.

| Finding | Before | After / implementation | Reader-value hypothesis and scope |
| --- | --- | --- | --- |
| Oversized mobile homepage art | 465,631-byte original JPEG for a 335px-wide illustration | 10,048-byte responsive optimized image, 97.8% less image payload; 23,488 bytes at desktop width | Less unnecessary transfer. Shared owned `Artwork` component; original dimensions, alt text and source assets retained. Retina selection and decoding verified. |
| Non-home pages fetched homepage art | Brand-link prefetch downloaded the same 465,631-byte hero on Routines, Search and Procedures | Header/footer home links have prefetch disabled; no homepage artwork downloaded on any of eight checked non-home hubs | Avoid an unrelated download. Home navigation remains available and existing journey checks pass. |
| Hidden mobile procedure illustration downloaded | 339,287-byte JPEG fetched despite being CSS-hidden | Decorative illustration is lazy, not priority; zero artwork requests on the mobile Procedures hub. Desktop receives a 7,940-byte optimized image | Avoid fetching an illustration readers cannot see. No procedure content or filtering behavior changed. |
| Routines index ended without a contextual educational next step | Profile cards followed by a disclaimer and newsletter invitation | Added “Build your own routine from the basics” and “Understand your skin barrier” links beside the context statement | Turn curiosity into useful, source-linked reading without encouraging readers to copy celebrity purchases. Index only; existing fixed `routine_context` click label reused, no new event. |
| Email preview suggested an unsupported launch date | “Email subscriptions are opening soon” | “Email subscriptions are not available yet,” plus a visible “Get the RSS feed” link alongside the sample issue | Offer a working repeat-reading path without collecting addresses or implying a provider is ready. Shared preview state only; configured subscription behavior unchanged. |
| Mobile newsletter headline crushed into an implicit grid column | At 375px the issue headline occupied only 109px; overflow checks alone passed | Reset the archive's signal placement to column 1 below the copy at phone widths | Readable issue discovery. Scoped archive rule; 320, 375, 640, 641, 760, 768 and 1280px regression checks. |

The RSS feed returns XML and includes the latest locally prepared Greenwich recall item. Browser request/CTA checks establish local functionality, not production analytics ingestion or repeat readership.

### Security maintenance

Updated Next.js and matching ESLint configuration from 16.3.4 to 16.3.8, DOMPurify from 3.4.14 to 3.4.16, and compatible brace-expansion lockfile entries from 1.1.18/5.0.9 to 1.1.21/5.0.12. No forced major upgrade or overrides.

The installed Next version was covered by the [Node-runtime OG-image SVG advisory](https://github.com/advisories/GHSA-vcvr-r3jv-pc5j). The site's fixed editorial OG inputs do not establish attacker-controlled exploitation; patching removes the installed-version finding rather than proving an exploit occurred. Root, dispatch, guide and procedure OG images were fetched and decoded at 1200 × 630 after the update.

`npm audit --omit=dev --json`: **0 findings**. Full audit still reports **5 high-severity package findings from one development-only braces → micromatch → fast-glob → Next ESLint chain**, not five independent runtime vulnerabilities. `npm view braces version` still returns 3.0.3, the affected version. The suggested automatic fix downgrades ESLint configuration to Next 14.2.35; it was not applied. Track the [braces advisory](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm) for a compatible patch. No blanket security-clear claim.

## Fresh search evidence and deferred changes

Search Console property `sc-domain:skinconsidered.com`, finalized `web` search, Google Pacific calendar, all devices/countries. Requested September 4–October 1 versus August 7–September 3. The latest returned date was September 29: September 30–October 1 are **unavailable, not zero**. Thus the newer requested window is incomplete; these are descriptive snapshots, not a matched causal comparison.

- Newer window, returned data: 1 click / 2,431 impressions, aggregate CTR 0.0411%, source average position 54.93.
- Prior window: 0 clicks / 183 impressions, CTR 0%, average position 60.18.
- Latest complete seven-day window, September 23–29: 1 click / 415 impressions, CTR 0.241%, average position 32.48.

Page-grouped and property totals differ; visible query rows do not cover all impressions. CTR below is clicks divided by page impressions. All candidate rows use the newer requested window; positions are source page averages, not a single keyword rank.

| Candidate URL | Clicks / impressions / CTR / position | Prior window | Suspected issue, confidence and decision | Affected scope |
| --- | --- | --- | --- | --- |
| `www.skinconsidered.com/trends/microcurrent-devices` | 0 / 371 / 0% / 79.3 | 0 / 10 / 78.0 | Deep rank and duplicate-host exposure; strong evidence of live `www` HTTP 200, weak evidence of a title problem. Release the prepared host fix after approval; defer speculative headline rewrite. | Host routing; trend file unchanged |
| `skinconsidered.com/ingredients/minoxidil-topical` | 0 / 169 / 0% / 70.7 | 0 / 8 / 80.8 | Low visibility position; impressions alone do not support a conversion-copy change. Defer pending release and recrawl. | Ingredient file unchanged |
| `skinconsidered.com/ingredients/ruxolitinib-cream` | 0 / 151 / 0% / 74.0 | 0 / 53 / 77.0 | Same limitation; no justified new clinical claim or title rewrite. | Ingredient file unchanged |
| `/dispatches/us-rf-microneedling-safety-communication` | 0 / 118 / 0% / 7.2 | No returned prior row | Indexed PASS, correct Google-selected canonical, last crawl September 3. Only 14 impressions across ten visible query rows, too little intent coverage to explain the page total. Protect the useful safety framing. | Dispatch unchanged |
| `/procedures` | 0 / 78 / 0% / 5.9 | 0 / 13 / 4.5 | No returned query-by-page rows; onsite journey checks work. No evidence-backed snippet rewrite selected. Image waste fixed independently of conversion data. | Hub artwork only |

URL Inspection returned unknown/NEUTRAL for `/routines`, consistent with its demonstrated live 404 but not proof that local internal links will cause indexing. The new routine links were selected for an observed reader-path gap, not an inferred high-bounce funnel.

PostHog project 589734 could not be read: connector returned UNAUTHORIZED/reauthentication required. No fresh landing-page, returning-reader, scroll-depth, search-to-second-page, subscriber or signup-success figures are available. These are **unknown**, not zero. The existing analytics configuration was not changed or reconnected. The analytics-led SEO workflow informed the small contextual-link changes and the decision not to rewrite low-CTR pages without adequate query evidence.

## Live missing routes

Each is absent from the target sitemap and returned HTTP 404 in the fresh expected-route comparison:

- `/routines` and `/routines/{hailey-bieber,dua-lipa,issa-rae}`
- `/newsletter` and `/newsletter/2026-09-04`
- `/dispatches/us-greenwich-glutathione-recall-2026`
- `/dispatches/singapore-unapproved-peptide-injections-warning-2026`
- `/dispatches/taiwan-medicube-cream-advisory-2026`
- `/dispatches/canada-counterfeit-soprano-laser-advisory-2026`
- `/dispatches/singapore-nu-skin-dermatic-effects-recall-2026`
- `/dispatches/eu-sunscreen-in-vitro-testing-2026`
- `/dispatches/fda-paba-trolamine-sunscreen-final-order-2026`
- `/dispatches/canada-kohl-lead-recall-2026`

The live audit fails with 28 diagnostics: 14 missing-sitemap entries plus their 14 404s. The 127 existing sitemap pages pass. This is not 28 separate broken pages.

## Verification and limitations

- Content audit: 20 dispatches, 4 guides, 4 culture files, 29 topical files, 45 procedures, 20 trends, 1 issue, 30 registry sources, 433 source links; no prototype claims. No new medical/editorial claims or publication dates introduced.
- ESLint, TypeScript and Next 16.3.8 production build pass; 276 generated assets/routes. All 68 existing Node tests pass. There is no `npm test` script; tests were run directly with `node --disable-warning=MODULE_TYPELESS_PACKAGE_JSON --test scripts/*.test.mjs`.
- Local expected-route health: all 141 sitemap pages plus four non-sitemap internal links pass. This establishes local route/metadata/link health, not content freshness or indexing.
- New `reader-quality.browser.mjs`: nine hubs × phone/desktop, responsive resource assertions, one H1, route canonicals, no horizontal overflow, both new guide links, newsletter preview/RSS, seven archive widths, retina and scrolled lazy-artwork decoding. Fixed the retina test's initial incorrect use of density-corrected `naturalWidth`; it now checks the selected source asset width against CSS width × DPR.
- Existing growth journeys and mobile menu focus checks pass. All three routine players pass Enter/Space/pointer, repeated load/close, keyboard exit and delayed-load focus checks at 375/1280px. One initial timing failure was eliminated by waiting for the local fixture's load/focus handler before tabbing; no product player code was changed. Fixtures do not establish live YouTube playback.
- Root and three representative dynamic OG image paths return decodable 1200 × 630 PNGs.
- Source-link audit: 304 unique URLs, 297 reachable, 7 checker-blocked, zero checker-classified unreachable/broken. Three blocked ISO/Met pages opened manually; remaining blocked sources are unverified, not certified clean. No source replacements or content edits were needed.
- Inspected mobile/desktop screenshots of Home, Routines, Procedures and Newsletter. Lazy artwork is scrolled into view and decoded before final screenshots. Screenshots are local temporary evidence at `/tmp/skin-review-20261003.aUiKDp/`; no full accessibility certification, field speed or engagement uplift claimed.
- `git diff --check` passes. The local production preview is open at `http://localhost:3000`.

## Next measured gates

1. Obtain explicit owner release approval; review and ship the existing release branch plus this verified local change. No automatic production merge or push in this review.
2. Immediately compare production against the reviewed 141-route sitemap; require all intended routes to return 200, confirm `www` redirects to apex, correct production canonicals, responsive image delivery and working RSS. Keep unavailable email signup honestly disabled unless the owner separately approves provider setup.
3. Owner reauthenticates the existing PostHog connection. Then inspect production-host-filtered landing paths and fixed CTA events without treating local browser checks as ingested events.
4. Recheck indexing after release and compare search and meaningful onward reading 2–4 weeks later, extending the window if traffic remains sparse. Use matched available date windows and query/device mix. If released October 3–4, an initial review around October 24–31 is reasonable; no recurring automation was created. Before/after changes remain directional evidence, not a controlled causal experiment.
