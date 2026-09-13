# Daily editor — September 13, 2026

## Evidence reviewed and decision

No new publication-worthy skincare development since yesterday was verified in this bounded scan. No article, medical claim, source-review date or edition date was changed.

- [Health Canada](https://recalls-rappels.canada.ca/en): latest visible listings remained September 11 food/power-station notices, not new skincare actions.
- [HSA](https://www.hsa.gov.sg/announcements/): latest announcement remained September 10 vaporiser enforcement; older cosmetic notices were not relabeled as new.
- [MHRA](https://www.gov.uk/drug-device-alerts) and [TGA sunscreen guidance](https://www.tga.gov.au/resources/explore-topic/sunscreens): no later relevant procedure/sunscreen action was established in the pages reviewed.
- FDA and Anvisa date-targeted searches yielded no verified new relevant action. PubMed September 12 searches returned unrelated research and issue-date matches rather than a verified new human skincare result.
- [Met exhibition/history searches](https://www.metmuseum.org/de/exhibitions/chasing-clouds) surfaced art exhibitions, not a new skincare-history finding. An exhibition opening is not an efficacy claim or a reason to manufacture a beauty story.

This is not an exhaustive negative finding; indexing lag and retrieval limitations remain.

## Source-link hygiene

Ran `npm run audit:links`: 275 unique URLs checked, 268 reachable, five blocked scripted access, two unreachable, zero confirmed broken links. The blocked group comprised three Met pages, Cochrane and NMPA. The two unreachable endpoints were the INSA history PDF and CDSCO registry homepage. Do not interpret blocked/unreachable as proof that a source is gone. No source was replaced or labeled freshly reviewed on that basis; these seven need manual confirmation before release.

## One search-visibility improvement

Observed a mismatch in the local generated sitemap: `/`, `/today` and `/us` all reported September 5 while their rendered listings contained the September 11 FDA dispatch. Search itself already had `noindex` and was excluded from the sitemap, so no change was needed there.

Added content-derived listing dates. The homepage and global wire use the latest dated dispatch/update, with the existing edition as a floor. The U.S. desk uses only United States dispatches. Foreign news therefore cannot falsely refresh the U.S. listing. Dates do not advance merely because a build runs. Individual article dates, policy pages, the site edition and source-review claims remain unchanged.

This follows [Google's sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap): modification dates should reflect significant changes to page content or links. It is an accuracy improvement, not a promise of crawling, indexing or ranking gains.

## Validation

- Required content audit, lint, typecheck and production build passed: 14 dispatches, 417 source links, 26 registry sources, 264 generated static pages/assets.
- 25 Node tests passed. New cases cover empty/older content, independent global/U.S. dates, out-of-order updates and non-mutation.
- Browser parsed the generated sitemap: the three changed listings now report September 11; policy date remains September 5.
- At 1280×900 and 375×900, inspected the three listing pages for one H1, the new dispatch link, no horizontal overflow or uncaught errors, and working article navigation. Latest-page screenshots inspected; no visual redesign.
- Visual follow-up: at 375px, the first dispatch headline on `/today` occupies an unnecessarily narrow column. This run changed no layout or styling; the existing reader-preview layout needs a separate mobile correction. Passing overflow/navigation checks does not mean the visual layout is fully clean.
- Local health crawl: 135 sitemap URLs OK, plus 11 internal links checked.
- Stopped only the verified project-owned preview before the build; relaunched loopback preview on port 3000, PID 23716. The pending `/routines` preview remains available.

## Scope, limits and next action

Verified the current checkout at `/Users/vanessa/code/seosites/skinconsidered`; the scheduled legacy path remains absent. Read governance and recent commits first. Only this run's sitemap hunks, new date helper, two tests and this report are committed. Unrelated pending sitemap additions and all reader/routine/newsletter changes are preserved.

No deployment, push, analytics refresh, email delivery, provider connection or external contact. Newsletter remains preview-only and no audience-growth result is established.

Next best action: correct and recheck the narrow mobile dispatch headline in the pending reader preview, then obtain owner review of the publication/routine preview and approval of a public rollout. Before release, manually confirm the seven source endpoints that the automated link check could not verify. No new owner decision is required for this local metadata fix.
