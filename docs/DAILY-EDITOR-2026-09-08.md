# Daily editor — September 8, 2026

## Decision and scope

No publication-worthy development since the September 7 run was verified in this scan. Made one reader-experience improvement: a recoverable page-error screen, without changing medical content, edition dates, or yesterday's uncommitted redesign.

The scheduled path `/Users/vanessa/code/skinconsidered` no longer exists. The repository, editorial playbook, expected commit history, and ongoing work were verified at `/Users/vanessa/code/seosites/skinconsidered`. The automation configuration was not changed.

## Evidence reviewed

- [Health Canada recalls](https://recalls-rappels.canada.ca/fr): the reviewed listing included the September 4 kohl recall already represented in the local publication. No later skincare item was verified.
- [UK cosmetics safety alerts](https://www.gov.uk/product-safety-alerts-reports-recalls?product_category=cosmetics): reviewed the cosmetics-filtered results, including the existing Simple micellar-water recall. No September 7–8 development was verified.
- [TGA sunscreen updates](https://www.tga.gov.au/resources/explore-topic/sunscreens): surfaced earlier recalls and regulatory communications, not a verified new event since the prior run.
- [European Commission cosmetics notification](https://technical-barriers-trade.ec.europa.eu/en/notification/39957): this is a July draft with a September 6 comment deadline, not evidence that a new prohibition took effect today. Not promoted into a news item.
- [FDA device updates](https://www.fda.gov/medical-devices/medical-devices-news-and-events/cdrh-new-news-and-updates) and AAD/procedure-safety searches: returned older or unrelated material; no new cosmetic-procedure safety communication was verified. The direct FDA safety-communications page could not be fetched in this run.
- [PubMed research lead](https://pubmed.ncbi.nlm.nih.gov/42493591/): the indexed picosecond-laser/skincare study was already on file. Date-restricted research searches did not yield a verified new candidate; the direct date-filtered PubMed query was inaccessible. This is not an exhaustive negative literature search.
- [Metropolitan Museum kohl-tube record](https://www.metmuseum.org/art/collection/search/569280): retrieved the accountable object record used by the cultural-history file. No newly dated historical finding was established, and no historical-use claim was converted into a modern safety or efficacy claim.

Search result crawl dates were not treated as event dates. Access limits and indexing lag mean this scan cannot establish that no relevant development occurred anywhere.

## Change

Added `app/error.tsx` and its scoped stylesheet. When a page or nested route fails during rendering, readers see a plain explanation, a working **Try again** button, and full-navigation links to Latest and Search. Keyboard focus moves to the error heading, controls are at least 44 pixels tall, and raw error details are not displayed in the page.

The implementation uses the installed Next.js 16.3.4 `retry()` API to re-fetch and re-render, as documented in its bundled error-handling reference. The boundary covers page/nested-route failures, not failures in the root layout or arbitrary event handlers. No error-reporting service was connected or added.

## Verification

- `npm run audit:content`: passed; 13 dispatches, 4 guides, 4 culture files, 29 topical files, 45 procedure profiles, 20 trend files, 1 newsletter issue, 407 source links.
- `npm run lint`, `npm run typecheck`, `npm run build`, and `git diff --check`: passed. Final build generated 258 static routes/assets.
- Existing reader-journey tests: 10 passed.
- Production-build fault injection through a temporary local route: the actual Next error boundary appeared; its heading received focus; Tab reached Try again; Enter successfully restored the test page. A second failure was recoverable too. Search and Latest exit links navigated successfully.
- Desktop 1280×900 and mobile 375×812 screenshots inspected. Narrow 320-pixel layout also checked. No horizontal overflow; one H1; 44-pixel-or-larger action targets. The injected error marker was absent from rendered page text.
- The temporary fault-injection route was removed before final validation and commit. A final request to `/reader-error-check` returned 404.
- Final local health crawl on port 3000: 130 sitemap pages OK, 11 additional internal links checked, no problems found.

Two test-harness issues were resolved before the final pass: rebuilding regenerated stale Next route types after removal of the fixture, and the health crawl was run against port 3000 to match the configured local sitemap origin. The temporary port-3004 server and browser test tab were closed. No remote writes, deployment, newsletter sends, or configuration changes occurred.

## Audience and release limits

Fresh Search Console read (`npm run gsc -- dates 28`) showed zero clicks through September 6. September 6 had 253 impressions at average position 60.5; the displayed daily series totaled 1,117 impressions. Reporting is delayed, and this sample does not establish a click-through or conversion lift.

Live requests on September 8 returned 404 for `/newsletter` on both apex and www hosts; the www request did not redirect to the apex. The local newsletter archive and host redirect therefore remain release priorities. Local signup is still shown as a preview. Production email configuration and deliverability were not verified, and PostHog metrics were not refreshed in this run.

## Next best action

Owner review and approval of the pending release, including the newsletter archive, reader refinements, and canonical-host redirect. Then verify public routes and the intended provider's confirmation/delivery flow before measuring confirmed subscriptions. This run is local-only; it does not authorize that release.
