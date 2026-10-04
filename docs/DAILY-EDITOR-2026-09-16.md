# Daily editor — September 16, 2026

## Scan and decision

Added one source-led dispatch: **European Commission backs SPF testing without induced sunburn**. The September 15 DG GROW announcement is newly dated since the prior run; the underlying testing, report and standard are older and explicitly dated separately. CTX grades the policy/testing context, not sunscreen efficacy.

The bounded multi-region scan also checked FDA sunscreen/cosmetics material, HSA announcements, Health Canada recalls, MHRA device alerts, Anvisa news, TGA updates, PubMed and accountable museum/history sources. No other newly dated skincare item was selected. HSA's September 15 levodopa/vitamin B6 notice, Canada's food/climbing-equipment notices, MHRA's September 16 hoist/slings alert and Anvisa's food-hexane material were outside this desk's scope. TGA's September 11 development and FDA's final sunscreen order were already covered. Literature searches surfaced issue-date matches, not a verified new relevant human result. This is not a claim of exhaustive worldwide coverage.

## Claim ledger

- **Announcement:** [DG GROW news](https://single-market-economy.ec.europa.eu/news/eu-moves-more-ethical-sunscreen-testing-2026-09-15_en), September 15, 2026. Recommends prioritising tests that avoid harming volunteers; does not announce a prohibition on human SPF testing. Commission-funded campaign; no brand recommendation.
- **Underlying report:** [JACOP 2025 cosmetics/sunscreens report record](https://op.europa.eu/en/publication-detail/-/publication/d11996e2-8c85-11f1-9262-01aa75ed71a1/language-en), DOI 10.2873/9592618. Written by EY for the Commission in June 2026; record says released July 30. Testing ran October 2025–March 2026. Retrieved the 20-page English PDF through the official download handler after the search interface returned errors; read its full extracted text. The PDF skill prompted visual checks of pages 9–10, including the performance chart, correlation and exclusions footnote.
- **Population/comparator:** 74 sunscreen/SPF day-cream products selected by authorities in 11 EU countries, predominantly high/very-high SPF. In vivo SPF versus in vitro SPF; two stick/lip-balm products could not undergo the latter (page 9). The product count is not the paired-comparison or volunteer count. UVA used a separate test standard. HDRS was not evaluated.
- **Result and ceiling:** report page 10 gives r = 0.855, with in vitro values generally slightly lower. Correlation is not interchangeable numerical results. Page 9 reports 33/74 (45%) non-conforming for SPF and/or UVA; risk-targeted plus non-targeted sampling is not representative of the market. No market-wide failure rate or all-products-pass claim.
- **Action timing:** page 11 describes national withdrawals, recalls and other actions reported by May 29; this is not a new blanket recall on September 15. Page 6 distinguishes non-conformity with a nonbinding recommendation from non-compliance with binding regulations. The story uses the former term for the 33/74 statistic.
- **Scope:** [ISO 23675:2024 public abstract](https://www.iso.org/standard/76616.html), December 2024: emulsions and alcoholic single-phase formulations; excludes sticks/powders; static SPF, not water resistance. Only the public abstract was reviewed, not the paid standard. Individual laboratory files and a full conflict audit were not reviewed.
- **Consumer implication:** retain sunscreen alongside other sun protection; no named bottle can be cleared or rejected from this overview alone. Sources checked September 16, not a site-wide refreshed verification date.

## Change and verification

Added the dispatch to `content/stories.ts`, two source-registry entries, three unit tests and a browser regression. Added no images, redesign, new medical directions or product rankings.

- Content audit: 15 dispatches, 424 source links, 28 registry sources, two existing logged updates; passed.
- Lint, typecheck and production build passed; 266 generated static pages/assets.
- All 31 Node tests passed. Fixed an initial new-test assertion to recognise `www.iso.org` as a subdomain of `iso.org`, matching existing registry semantics; no production matching code changed.
- New article at 1280px and 375px: one H1, three primary links, correct publication schema, explicit dates/statistical limits, filtered Europe-wire navigation, coverage entries, RSS and sitemap discovery; no horizontal overflow or uncaught browser errors. Full-page screenshots visually inspected.
- Feed regression passed at 320, 375, 640, 641, 760, 761 and 1280px, covering all 15 dispatches, filter/reset/reload and keyboard navigation. Sitemap/listing regression passed at desktop/mobile widths; U.S. and policy dates remain independent.
- Local health crawl: 136 sitemap URLs OK. First health invocation ignored `SITE_URL` and checked production read-only instead (127 URLs OK); subsequent explicit local-origin checks verified the rebuilt local preview. Neither result means this draft was deployed.
- Stopped only the verified project-owned preview PID 18523 before building; restarted loopback preview as PID 11722. Existing routines remain available.

## Scope and next action

Current checkout: `/Users/vanessa/code/seosites/skinconsidered`; legacy scheduled path is still absent. Preserve all pre-existing reader, routines, artwork, newsletter and sitemap changes. Stage only the new registry hunk, not the two pending routine/Vogue lines.

No push, deployment, public publishing, analytics refresh, provider connection, newsletter delivery, spending or external contact. The newsletter remains preview-only. The seven source endpoints unverified in the September 13 audit remain a pre-release manual-review item; this run does not clear them.

Next: owner review of the local article and pending publication/routine preview before any public rollout. Continue the scheduled daily source scan; do not treat older report dates or recommendations as newly enacted law.
