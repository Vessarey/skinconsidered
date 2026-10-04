# In the Routine — local growth preview

Prepared September 8, 2026. Local preview only; no deployment, push, social publication, paid campaign, or email-provider connection performed.

## What changed

The homepage now introduces a source-linked celebrity skincare series. `/routines` leads to three profiles: Hailey Bieber, Dua Lipa, and Issa Rae. Each profile has an original Vogue video, selected products, the recording date, known brand relationships, independent routine context, ingredient-guide links, a newsletter placement, and related profiles. The category is included in navigation, site search, source coverage, and the sitemap. Profiles have canonical metadata and Article/Breadcrumb structured data without celebrity endorsement or product-rating markup.

The editorial distinction is intentional: the first-person source establishes what was said or shown; it does not establish effectiveness, causation, or today's routine. Product availability, formulas, prices, and private commercial arrangements are not asserted as verified-current. Unidentified sunscreen is labeled as such instead of guessed.

## Source ledger

| Profile | Primary identification source | Official Vogue video |
| --- | --- | --- |
| Hailey Bieber | https://www.vogue.com/video/watch/beauty-secrets-hailey-bieber-2025 | https://www.youtube.com/watch?v=9wdisivSWYU |
| Dua Lipa | https://www.vogue.com/video/watch/beauty-secrets-dua-lipa | https://www.youtube.com/watch?v=SE0D5XZQ6wk |
| Issa Rae | https://www.vogue.com/article/beauty-secrets-issa-rae | https://www.youtube.com/watch?v=e3pw82z0RMQ |

The displayed source date is the YouTube publication date, not the often-different Vogue webpage release date. Issa Rae's Sienna Naturals ownership is additionally documented in https://www.vogue.com/slideshow/issa-rae-shares-how-she-learned-to-love-her-hair-from-college-to-co-owning-sienna-naturals . Independent basic-routine context: https://www.aad.org/public/everyday-care/skin-care-basics/care/skin-care-budget .

Media provenance: all three thumbnail URLs and publisher attribution were returned by YouTube's official oEmbed endpoint. Thumbnails remain on `i.ytimg.com`; they are not copied into the repository or image-optimization cache. Videos use YouTube's privacy-enhanced embedded player, loaded only by an explicit button. No autoplay parameter, downloaded video, AI celebrity likeness, or endorsement implication. A source link is always available and a failed thumbnail has a text fallback. Third-party image requests occur before player activation and are disclosed in the privacy page. Embedding is not a claim to own or have a separate license for publisher imagery. Recheck media terms, source availability, and any necessary permissions before public release or promotional reuse.

## Growth hypotheses and next experiments

1. **Source-led celebrity discovery:** dated, name-specific pages may attract relevant search readers. Measure impressions and clicks to these pages, then their onward reading and newsletter engagement. No traffic lift is established by this preview.
2. **Start with what you own:** extend the basic-routine guide with a simple, non-diagnostic checklist that helps readers decide which steps are essentials versus optional. Do not start with a health-data collection quiz.
3. **One claim, checked:** test a recurring newsletter segment about one recognizable skincare claim, linking a short answer to a fuller evidence file. Publish original social excerpts only after approval; do not reuse celebrity footage as promotional creative without the relevant rights.

The largest conversion blocker is still email delivery: no working provider is connected in this preview. Existing placements correctly show the sample issue and RSS instead of collecting addresses that cannot be subscribed. After approval, connect the intended provider securely, verify double opt-in and unsubscribe with an authorized test address, and confirm production routes before making subscriber-growth claims.

## Verification

- Content audit extended to enforce routine sources, original video identity, thumbnail-to-video matching, source/review dates, disclosures, product fields, related routes, and unique slugs.
- Production build: 262 generated pages/assets; lint and TypeScript passed.
- Existing reader-journey regression suite: 10 passing tests.
- Added `scripts/routine-preview.test.mjs`: 5 local HTTP checks for homepage/category discovery, profiles, metadata, products, related pages, no initial iframe, sitemap inclusion, and real 404 behavior.
- Local health crawl: 134 sitemap pages returned OK, with 11 additional internal links checked.
- Browser: all three source thumbnails loaded; homepage/category/profile navigation and celebrity search were inspected. Click-to-load and close-player behavior worked; the Dua Lipa player exposed Pause with its video duration after Play. Full-duration playback, every browser, and every network policy are not certified.
- Mobile QA found and corrected an aspect-ratio/minimum-height interaction that pushed the video outside the 320px viewport. The media area now explicitly takes the available width while preserving YouTube's minimum player height.

Run locally:

```sh
npm run build
npm run start
npm run lint
npm run typecheck
node --test scripts/reader-journeys.test.mjs scripts/routine-preview.test.mjs
npm run site:health -- http://localhost:3000
```

Keep the health origin at port 3000, matching the locally generated sitemap. Keep unrelated existing reader-refinement changes intact. This preview is awaiting the owner's review, not approved for deployment.
