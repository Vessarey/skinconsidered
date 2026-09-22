# Daily editor — September 22, 2026

## Selected development and claim ledger

Added one local dispatch, `/dispatches/taiwan-medicube-cream-advisory-2026`, from a newly identified September 21 Taiwan FDA notice. The prior run's microcurrent correction remains intact. This item is dated to the notice, not today's build.

| Primary source | Exact editorial use | Boundary |
| --- | --- | --- |
| [Taiwan FDA, September 21](https://www.fda.gov.tw/TC/csmnewsContent.aspx?id=8040&mid=271) | New consumer purchase advice, summarized from Traditional Chinese | Overseas-alert notice, not evidence of domestic testing or recall |
| [HSA recall notice, August 28](https://www.hsa.gov.sg/announcements/medicube-pdrn-pink-collagen-capsule-cream--/) | Earlier Singapore action, date and two batch identifiers | Recall began August 26; supplier-level instructions remain distinct from consumer advice |
| [HSA testing update, August 28](https://www.hsa.gov.sg/announcements/hsa-tests-product-samples-of-medicube-pdrn-pink-collagen-capsule-cream-for-presence-of-sudan-red-dyes/) | Product-testing context and dated consumer directions | Unaffected samples/batches and local pre-supply testing matter; no worldwide or present-day adverse-event count inferred |

Grade A applies to documented official actions, not efficacy or a numerical risk estimate. These are regulator notices rather than sponsored trials. The article explicitly identifies its strongest limitation, source-review date and translation context. It does not generalize a finding to the whole brand, confuse the two jurisdictions, or invent a Taiwanese batch count.

## Wider bounded scan

- [HSA announcements](https://www.hsa.gov.sg/announcements/) added September 22 vaporiser-trafficking news; its latest NU SKIN cosmetic recall was already covered.
- [TGA sunscreen hub](https://www.tga.gov.au/resources/explore-topic/sunscreens) still surfaced the September 11 4-MBC proposal. [Health Canada alerts](https://recalls-rappels.canada.ca/en) and [MHRA device alerts](https://www.gov.uk/drug-device-alerts) were checked; no newer directly relevant aesthetic-procedure item displaced the selected notice. MHRA still led with fetal-monitoring RF safety, not aesthetic RF.
- FDA's [September 21 non-animal-testing announcement](https://www.fda.gov/news-events/press-announcements/fda-updates-regulations-advance-innovative-alternatives-animal-testing) is a broader human-drug-development rule announcement. It was not recast as a cosmetic-testing ban or a skincare treatment result; the selected consumer notice is more directly actionable for this desk.
- PubMed surfaced [TRPV4 and low-humidity responses](https://pubmed.ncbi.nlm.nih.gov/42748142/): September 22 issue date, September 16 online date, skin-model research rather than a new human product trial. Other results included unrelated urinary-device surgery and older online analytical chemistry papers; none were promoted as fresh skincare efficacy findings.
- Museum/academic-history searches surfaced the [Smithsonian September calendar](https://americanhistory.si.edu/press/releases/September-2026-calendar), not a new skincare-history finding. This scan is bounded, not a claim of comprehensive global surveillance.

## Implementation and scope

- Added the source-linked dispatch to `content/stories.ts`; existing components provide the article, Asia feed, RSS, sitemap and social metadata without a template change.
- Added Taiwan FDA to the source registry before citation. Existing HSA coverage is reused. The two pre-existing routine/Vogue edits in `content/coverage.ts` are excluded from this commit.
- Added three content tests and a local-only browser check for dates, jurisdiction, evidence grade, limitations, batch scope, sources/schema, navigation and registry state.
- Updated the older Singapore browser assertion to derive its HSA citation count from the dispatch collection rather than freeze the registry at one link.
- No unrelated article dates, review dates, edition dates, design, newsletter configuration or analytics settings changed. Active checkout is `/Users/vanessa/code/seosites/skinconsidered`; the legacy automation path remains absent.

## Validation

- `npm run audit:content`, `npm run lint`, `npm run typecheck` and `npm run build` passed. Content audit: 18 dispatches, 30 registry sources, 430 source links and three existing logged updates; no prototype claims. Build generated 272 pages/assets.
- All 54 Node tests passed after rebuilding/restarting the loopback preview. Stopped only verified project-owned preview PID 22207.
- Browser checks passed at 375px and 1280px: new article, original Singapore article, Asia-filter navigation, source/schema dates, Taiwan registry state, and global/U.S. listing navigation. The first new test used an overly exact accessible heading name that included the external-link marker; matching the registry heading text resolved that test-only timeout. No application change was needed.
- Article screenshots were visually inspected at both widths; no horizontal overflow or uncaught errors. RSS and sitemap include the new path. Global listing dates advance from actual content while U.S./policy dates stay appropriate to their own records.
- Local health crawl passed: 139 sitemap URLs and 11 other internal links. No new production-parity check was made.
- The three cited source pages were read directly. No full external-link audit was repeated; the September 19 automated-access blocks remain a separate release-review item, not verified-broken links.

## Audience limits and next action

No fresh analytics query or connection this run. September 21's report recorded 2,136 Google impressions and zero clicks for August 23–September 19; those are historical search metrics, not current visitor counts. PostHog's reauthentication failure was last verified yesterday, not retested today. Newsletter remains preview-only. No indexing, readership or conversion improvement is claimed from an unpublished article.

Commit only the dispatch, Taiwan registry addition, tests and this report. No push, deployment, public publication, spend, contact or external-service connection. Next best action: owner review/approval of the coherent pending release after outstanding source checks, then verify all expected pages and the canonical-host redirect live. Reauthenticate PostHog separately for visitor and click analysis.
