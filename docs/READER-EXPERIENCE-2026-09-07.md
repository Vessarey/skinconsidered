# Reader experience refinement — September 7, 2026

Status: implemented and verified locally in `/Users/vanessa/code/seosites/skinconsidered`. Not deployed; no real subscribers or emails were created during testing. Existing unrelated work was preserved.

## What changed

- A compact editorial homepage and header, with clearer latest-story, topic-search, procedure-comparison, and newsletter entry points. The blush, forest, raspberry, and original-illustration identity remains intact.
- Fewer repeated headings, statistics, decorative containers, and duplicated signup forms. Cleaner spacing and typography carry the hierarchy across articles and the guides, ingredient, culture, trend, and procedure indexes.
- The homepage selects the latest stories from publication dates and uses calculated reading times instead of hard-coded selections.
- Ranked search recognizes useful spelling and category variants, offers recovery from zero results, progressively reveals longer result sets, and restores the query through browser Back/Forward.
- Procedure filters are closer to the top of the page, support shareable URL state and browser history, expose less-used filters on demand, and offer clear recovery when no procedures match. Expanded summaries still link to full procedure files.
- News-feed filters also restore URL state and provide an actionable empty state. Mobile navigation closes after navigation and on Escape.
- Newsletter pages use one clear invitation. Without a configured provider, they offer an actual issue preview and expandable RSS instructions instead of collecting an address they cannot save.
- Configured signup includes validation, pending/disabled feedback, recoverable errors, preserved addresses after failure, retry, and confirmation instructions. Malformed API input is rejected; provider HTTP 400 is no longer treated as success. Buttondown uses source metadata and preserves confirmation for resubscriptions.
- Analytics strips search queries, fragments, and nested initial-URL search properties while retaining campaign attribution. Local previews do not send PostHog events. No remote analytics settings were changed.
- Evidence-ledger copy now makes clear that a grade applies to the exact claim, not an entire ingredient or brand. No new medical claims were introduced in this refinement.

## Verification

| Check | Result |
| --- | --- |
| Content audit | Passed: 13 dispatches, 4 guides, 4 culture files, 29 topical files, 45 procedure profiles, 20 trend files, 1 newsletter issue, 407 source links |
| Lint, TypeScript, production build, whitespace check | Passed; final build generated 258 static pages/assets |
| Reader regression tests | 10 passed; API validation, configuration, anti-spam, provider failures, opt-in, webhook contract, search, and analytics redaction |
| Local production health crawl | 130 sitemap pages returned OK; 11 additional internal links checked; no problems found |
| Responsive browser checks | Nine core pages at 320, 768, and 1280 pixels: no horizontal overflow, one H1, no broken loaded images |
| Final production browser check | Desktop and 375-pixel homepage verified; all six homepage images loaded; no console warnings/errors in the fresh production tab |
| Browser journeys | Search and filter history, zero-result recovery, more results, procedure expansion/full-file navigation, newsletter preview/RSS, and mobile menu/Escape passed |
| Configured signup browser test | Local mock only: invalid address, pending, provider failure, retained address, retry, confirmation, and use-a-different-address passed |

External source-link audit: 272 unique URLs checked; 266 reachable, five blocked automated access (three Met Museum pages, Cochrane, and NMPA), and one CDSCO registry root was unreachable. No definitive broken HTTP links were identified. The six unresolved checks are not proof of source availability and should be rechecked separately; authoritative citations were not replaced merely because scripted access failed.

Run the regression tests with:

```sh
node --disable-warning=MODULE_TYPELESS_PACKAGE_JSON --test scripts/reader-journeys.test.mjs
npm run site:health -- http://localhost:3000
```

## Remaining launch requirements

1. Connect the intended email provider through the deployment's secure environment settings and verify a real confirmation/delivery flow with an authorized test address. No production capture or deliverability claim is made here.
2. Review and deploy the intended changes, including the previously retained canonical-host redirect, then repeat public URL, analytics, and newsletter checks.
3. Measure post-release Search Console clicks, engaged reading, newsletter entry clicks, confirmed subscriptions, and return visits. This work improves discovery and reduces friction; it does not establish a measured growth lift.

The local production preview is running at `http://localhost:3000`. Temporary mock servers have been stopped.

## Implementation references

- [Buttondown subscriber creation](https://docs.buttondown.com/api-subscribers-create): source metadata, confirmation state, and collision behavior.
- [PostHog property redaction](https://posthog.com/tutorials/web-redact-properties): client-side event redaction before transmission; this guidance informed the analytics privacy changes.
