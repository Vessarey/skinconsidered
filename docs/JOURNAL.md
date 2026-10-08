# Operator journal

Newest entry first. One entry per run of the daily loop in `docs/GROWTH_LOOP.md`. Record what was checked, the numbers behind each decision, what changed, and what the owner must resolve. Never write a number here that was not read from a tool in the same run.

## 2026-10-08 — Published-source dependency-only security patch

The production dependency audit flagged sharp 0.35.4 (librsvg advisory
GHSA-wq5f-xc86-pv6w) and source-map-js 1.2.1 (GHSA-68fv-2mgg-jv7q).
Update their compatible lockfile families to 0.35.5 / 1.2.2. Audit now reports
zero production findings; this is dependency hardening, not an observed exploit.
Next 16.3.8, React, all clinical/editorial sources and application code stay
unchanged. The owner checkout remains clean at routine/2026-10-07 `77fa723`,
with four unpublished commits; the patch starts from published main `41ceb1e`
and includes none of that work.

Lint, typecheck, content audit and builds passed. All 68 published-main tests
passed against this checkout's own port-3102 preview with the tests' expected
localhost canonical origin; that preview was then stopped. The production
build explicitly used https://skinconsidered.com. All 141 page titles,
descriptions, canonicals, visible content, reader/social metadata and JSON-LD
match the live baseline (only Next's compiler font-adjust hint excluded from
local/deployed comparison). All 123 built OG images are 1200x630 and pixel
identical to the preceding verified release. Source-link audit: 304 URLs,
296 reachable, seven scripted-access blocks, one temporarily unreachable,
zero broken; blocked/unreachable sources need manual follow-up, not invented
corrections. Focused live RSS, routines, newsletter previews, ultrasound and
microcurrent pages and www redirects passed before the patch.

Use the existing GitHub/Vercel workflow, require ready status and live 141-page
parity before reporting publication, and retain a normal dependency-only revert
as rollback. No newsletter provider, real submission, credential, account,
schedule, tracking or access change. Browser-control tools were absent, so
interactive desktop/mobile, player and screen-reader QA remain unverified.

## 2026-10-06 — isolated homepage title and social-image branding repair

Published-main branding scope only: homepage title explicitly includes Skin
Considered within 53 characters, and the shared 1200×630 OG image header
uses bounded 560px/440px text columns. The long homepage eyebrow wraps
instead of overlapping “Considered before published.” Copy, visual tokens,
footer/edition dates, clinical content and sources remain unchanged.

Reviewed pending routine commits a6e52e7 (search-focus handoff), 85aeb90
(Guardian calamine status article) and 38a7869 (article source jumps). The
routine checkout remained clean at 38a7869, but no authoritative active-
writer signal was available. Used a separate branch/worktree from published
main 85bef91; none of those three commits is included in this release.
Their source/interaction review and publication remain a separate task.
No files in the routine checkout were modified or processes stopped.

Fresh lint, typecheck, content audit and build passed; all 68 published-main
Node tests passed against this checkout's own port-3011 preview. The tests'
localhost-3000 canonical expectations were retained; the operator's port-
3000 preview was not restarted. Read-only source audit checked 304 URLs:
296 reachable, seven scripted-access blocks, one temporarily unreachable,
zero broken links. Rendered pixel checks across all 123 generated OG PNGs
confirm 1200×630 size and at least 80px separation between top text columns;
homepage and culture images visually inspected. Homepage rendered title
and existing viewport/mobile-nav/skip-link source checked. No app CSS,
page body, navigation, provider or dependency changes. Live mobile/browser
interaction could not be rerun because Mac browser controls were absent;
no Core Web Vitals, Google display or conversion-lift claim.

Use the existing GitHub/Vercel publication workflow, then require successful
Vercel status and production sitemap parity/metadata/image verification.
Rollback is a normal revert of this scoped commit, preserving later work.
Vanessa's standing tested-publication authority applies; no spending,
credentials, permissions, OAuth, tracking or external-agent contact.

## 2026-10-04 — prepared release published and production parity restored

Vanessa explicitly authorized ongoing improvements and publication without routine review on October 4; spending still requires approval. Updated the existing release PR #1 with the already-prepared work through `dc7911a`, waited for its Vercel preview to pass, and merged it at 04:42:05 UTC as `b179d8a5a1a778ffb4f8b4f93a75033d95c4e52e`. Production Vercel status succeeded: https://vercel.com/vessareys-projects/skinconsidered/6S7Lm9jNXT78e3zyQP9QxDSGPpNN.

Fresh validation: content audit, lint, typecheck, production build, all 68 Node tests, local 141-route health, and installed Mac Chrome reader checks at 375/1280px across nine hubs pass. Seven newsletter widths, mobile retina image decoding, routine-to-guide links and RSS pass. The first test attempt lacked the default-port server; rerunning with the documented preview fixed the harness failures, with no product test weakened.

Fresh production audit compares against the reviewed local sitemap: 141/141 intended pages return 200, zero expected routes missing, four additional internal links pass, and canonical/title/description/H1 checks pass. `www` now returns 308 to the apex. Newsletter and Routines are live. The email provider remains unavailable; no subscriber data, credentials, analytics or provider settings changed. No fresh audience uplift is claimed. Historical reviews retain their real dates: this follow-up changes the footer label from “Sources last reviewed” to “Edition date” rather than implying a new review of old claims.

Rollback baseline: `b26424320d6be4cea25f8dec55ef9f2a007b760f` (previous main). Revert the merge with `git revert -m 1 b179d8a5a1a778ffb4f8b4f93a75033d95c4e52e` in a clean checkout and publish through the same workflow, or promote the prior Vercel production deployment. No reset, force-push or content deletion. Local main is clean at the merged release before this documentation follow-up.

Next: daily operators use the actual checkout `/Users/vanessa/code/seosites/skinconsidered` and the updated publication authority. Parent task owns automation configuration. Reconnect PostHog, verify production-host event ingestion, then evaluate the released work on matched settled search windows after recrawl. Newsletter provider setup remains a separate access/spending decision.

## 2026-10-03 — requested engagement and quality review (local, Codex)

Fresh production comparison: 127 live sitemap routes versus 141 reviewed local routes; all 14 missing routes return 404, including Routines and Newsletter. Live `www` still returns 200. Search Console's requested September 4–October 1 window returned through September 29 only: 1 click / 2,431 impressions (0.0411% CTR); missing dates are not zeros. PostHog requires reauthentication, so engagement is unavailable, not proven improved.

Responsive owned artwork cuts the mobile homepage hero from 465,631 to 10,048 encoded bytes (97.8% less image payload). Disabled home-brand prefetch, removed hidden mobile procedure-art downloads, added routine-to-guide links and a visible RSS option with honest email-unavailable copy, and repaired the newsletter archive's squeezed phone headline. Next and matching lint config patched to 16.3.8; DOMPurify/brace-expansion lockfile patches applied. Production npm audit: zero findings; five development-only findings remain in one unpatched braces dependency chain.

Content audit, lint, typecheck, build, 68 Node tests, reader-quality and existing growth/player/navigation browser checks, OG decoding and all 141 local sitemap routes pass. Source audit has seven blocked URLs, not seven established broken links. Screenshots inspected. Local only: no push, deployment or provider/analytics connection. Full baselines, candidate decisions, test caveats and release gates: `ENGAGEMENT-REVIEW-2026-10-03.md`. Next: explicit release approval, production parity, then sufficient post-release data.

## 2026-10-03 — mobile menu focus recovery (local, Codex)

No new publication-worthy development established in the bounded regulator, PubMed and museum scan; retrieval/date limits are recorded in `DAILY-EDITOR-2026-10-03.md`. Reproduced selecting the current mobile destination leaving focus on its hidden link. Closing now restores summary focus when focus was inside the menu; modified clicks preserve the original menu.

Content audit, lint, typecheck, build, 68 Node tests, new mobile/tablet/desktop navigation regressions and existing growth journeys pass. Local health: 141 sitemap pages plus 11 links. Screenshots inspected. Native new-tab creation is not certified by the headless checks. No fresh analytics or public release; owner review and release approval remain next.

## 2026-10-02 — source-linked US recall dispatch (local, Codex)

Added one new company-recall item from an FDA-hosted source, with event/review dates separated, evidence scope and commercial interest disclosed, and older background kept distinct. Global regulator, PubMed and museum triage is recorded in `DAILY-EDITOR-2026-10-02.md`. Existing routine-video and discovery fixes are preserved.

Content audit, lint, typecheck, build, 68 Node tests, new 375px/1280px article/discovery regressions and existing growth journeys pass. Local health: 141 sitemap URLs plus 11 links. Screenshots inspected. No fresh audience query or public release; owner review and explicit release approval are next.

## 2026-10-01 — routine video keyboard lifecycle (local, Codex)

No new publication-worthy skincare development established in the bounded regulator, PubMed and museum scan; direct retrieval of one PubMed candidate was blocked. Reproduced video load and close both losing focus to the body. Explicit loading now hands focus to the ready player, closing returns it to the load control, and delayed loads cannot reclaim focus after the reader moves away. Added a visible media focus outline; consent and privacy settings remain unchanged.

Content audit, lint, typecheck, build, 65 Node tests, all-three-profile 375px/1280px player regressions and existing growth journeys pass. Local health: 140 sitemap URLs plus 11 links. Screenshots inspected. Video checks used fixtures, not live playback. No fresh analytics or public release. See `DAILY-EDITOR-2026-10-01.md`; owner-reviewed release approval remains the next best action.

## 2026-09-30 — global news filter recovery (local, Codex)

Reviewed new HSA industry notices and MHRA safety compilations, plus regulator, PubMed and museum sources; no material new skincare item selected. Reproduced the global wire's empty-filter reset losing focus to the page body. It now focuses the persistent Region “All” control while resetting both filters. Previous search and procedure repairs remain intact.

Content audit, lint, typecheck, build, 65 Node tests, new 375px/1280px reset checks, seven-width feed layout and existing growth journeys pass. Local health: 140 sitemap URLs plus 11 links. Screenshots inspected. No fresh audience query or publication. See `DAILY-EDITOR-2026-09-30.md` for source triage and validation limits. Owner-reviewed release approval remains the next best action.

## 2026-09-29 — search reset keyboard recovery (local, Codex)

No new publication-worthy development established in the bounded source scan; museum retrieval was limited. Reproduced “Clear search” leaving focus on the document body. Reset now waits for the URL-driven input remount and returns focus to the current search field, including unsent drafts. Yesterday's Unicode matching is preserved.

Content audit, lint, typecheck, build, 65 Node tests, new 375px/1280px reset checks and existing Unicode, pagination and growth journeys pass. Local health: 140 sitemap URLs plus 11 other internal links. Screenshots inspected. No fresh audience query or publication. See `DAILY-EDITOR-2026-09-29.md` for sources, the caught initial focus-timing failure, validation limits and the owner-reviewed release gate.

## 2026-09-28 — honest archive search matching (local, Codex)

No new publication-worthy development established in the bounded source scan. Reproduced non-Latin and punctuation-only queries returning the full archive as supposed matches. Search now preserves Unicode letters and combining marks and treats nonempty, unsearchable queries as no match. Blank browsing, existing aliases and Latin accent folding are preserved; this does not add translation.

Content audit, lint, typecheck, build, 65 Node tests, new desktop/mobile Unicode checks, existing pagination and growth journeys pass. Local health: 140 sitemap URLs plus 11 other internal links. Screenshots inspected. No fresh audience query or publication. See `DAILY-EDITOR-2026-09-28.md` for source triage, validation boundaries and the owner-reviewed release gate.

## 2026-09-27 — procedure filter reset focus (local, Codex)

No new publication-worthy development established in the bounded source scan. Reproduced keyboard focus falling to the document body when either procedure reset button disappears. Reset now returns focus to search, allowing immediate typing and normal Tab navigation; existing filter history remains intact.

Content audit, lint, typecheck, build, 62 Node tests, new mobile/desktop reset checks and existing growth journeys pass. Local health: 140 sitemap pages plus 11 other internal links. Screenshots inspected. No fresh audience query or publication. See `DAILY-EDITOR-2026-09-27.md` for sources, validation limits and next release gate.

## 2026-09-26 — Singapore injectable-peptide advisory (local, Codex)

Added one dated, source-linked item from HSA's September 25 warning. Kept injectable and topical evidence separate, distinguished experimental products from approved prescription medicines, and made the missing case counts/risk denominator explicit. Grade A applies to the documented advisory, not efficacy. Prior release and search work preserved.

Content audit, lint, typecheck, build, 62 Node tests, 375px/1280px article/listing checks and local health (140 sitemap URLs plus 11 links) passed. Screenshots reviewed. No fresh analytics query, public deployment, push or provider connection. Full claim boundaries, research triage and release gates: `DAILY-EDITOR-2026-09-26.md`. Next: owner-reviewed release and public verification after explicit approval.

## 2026-09-23 — search pagination keyboard repair (local, Codex)

No new publication-worthy skincare item established in the bounded regulator, PubMed and museum scan. Reproduced an archive navigation failure: after expanding 10 results to 20, Tab skipped the newly revealed batch and reached the footer. Focus now moves to the first revealed story and visible/total counts update accessibly, including the final partial batch. Existing release preparation was preserved.

Content audit, lint, typecheck, build, 59 Node tests, new 375px/1280px pagination regression, existing growth journeys and local health (139 sitemap pages plus 11 internal links) pass. Screenshots visually reviewed. No fresh audience query, public deployment, push, provider connection or newsletter sending. See `DAILY-EDITOR-2026-09-23.md` for source triage, test scope and the preview-port correction. Next: owner-reviewed release and public verification, not additional speculative rewrites.

## 2026-09-22 — release preparation and search snippet fix (local, Claude)

**Finding.** Nothing has deployed since 2026-09-02. `origin/main` is at `b264243`; 21 committed changes plus uncommitted newsletter, routines, artwork, and analytics work sat locally. Live still serves the September 1 edition, `www` still answers 200, and 12 prepared routes return 404 (see `SEO-REFRESH-2026-09-22.md`).

**Search Console (browser and API, through 2026-09-20).** 0 clicks, 2,158 impressions over 28 days; weekly impressions fell from 788 to 253. 87 of 160 known URLs indexed, 53 "Discovered, currently not indexed", 12 `www` alternates. Best positions: RF microneedling dispatch 7.2, `/procedures` 5.8, neuromodulators 4.4, thread lift 5.4, all 0 clicks.

**Changed.**
1. Committed the pending reader work as one commit on `release/2026-09-22`, after gates passed on the full tree.
2. `seoTitle()` in `lib/seo.ts` drops the brand suffix when a title would exceed 60 characters. Applied to procedure, topical, trend, dispatch, guide, culture, and routine pages.
3. Procedure descriptions no longer open with "No reliable national estimate." (28 of 45 files); they lead with the purpose.
4. Production builds now fall back to `https://skinconsidered.com` if `NEXT_PUBLIC_SITE_URL` is missing; the Vercel preview showed localhost canonicals because the variable is production-only.
5. Pushed the branch and opened PR #1 to `main`. Not merged; merging deploys production and is the owner's call. Vercel preview built and was checked in a signed-in browser: `/newsletter`, `/routines/dua-lipa`, and `/procedures/thread-lift` render with one H1 and no horizontal overflow.

**Validation.** Committed HEAD alone: lint, typecheck, build, 35 tests pass in a clean worktree. Full release: content audit, lint, typecheck, build, 59 tests, and a local crawl of 139 sitemap URLs plus 11 internal links all pass. Rendered titles and descriptions checked on seven pages.

**Blockers for the owner.** Merge the PR. Set `BUTTONDOWN_API_KEY` in Vercel so signups become real. Reauthenticate PostHog for agents.

**Next action.** After merge: `npm run site:health -- https://skinconsidered.com --expected-sitemap http://localhost:3000/sitemap.xml`, confirm `www` returns 308, then request indexing in Search Console for the `www` microcurrent URL and a handful of discovered-not-indexed apex files. Compare search on matched windows 2 to 4 weeks after deploy.

## 2026-09-07 — review run (local, Claude)

**Scope.** Health, freshness, data, and conversion review. One change: this journal and `docs/BACKLOG.md` created. No content, code, or analytics configuration was touched. The uncommitted newsletter archive and artwork work already in the tree (modified 2026-09-04) was left exactly as found.

**Repository state.**
- `main` is 5 commits ahead of `origin/main` (Sep 2 edition bump, site-health entity fix, recall headline, Canada kohl lead recall dispatch, www→apex redirect). Nothing has been pushed since 2026-09-02 04:34 UTC.
- Working tree carries 17 modified and 3 untracked paths: `/newsletter` archive pages, `content/newsletter.ts` (one issue), `components/Artwork.tsx` plus 12 images in `public/art/`, Buttondown support in `app/api/subscribe/route.ts`, privacy copy naming Buttondown, sitemap entries for issues.
- No GitHub Actions workflows, no open or closed pull requests, no open issues. The cloud routine has never opened a PR against this repository.

**Gates on the working tree (all pass).** `audit:content` (13 dispatches, 4 guides, 4 culture, 29 topical, 45 procedure, 20 trend files, 1 newsletter issue, 407 source links), `lint`, `typecheck`, `build` (exit 0). `audit:links` not run this pass.

**Live site.** https://skinconsidered.com serves the **September 1** edition; local `content/site.ts` says September 5. `npm run site:health`: 127 sitemap URLs, 127 OK, no problems. `/newsletter` is 404 live (unshipped). `www.skinconsidered.com` still returns 200 rather than redirecting; the redirect commit is unpushed. Vercel cache age on the homepage was about 5.4 days.

**Search Console (property `sc-domain:skinconsidered.com`, 28 days).**

| Date | Clicks | Impressions | Avg position |
| --- | --- | --- | --- |
| 2026-09-02 | 0 | 11 | 20.5 |
| 2026-09-03 | 0 | 172 | 62.7 |
| 2026-09-04 | 0 | 305 | 59.5 |
| 2026-09-05 | 0 | 376 | 63.3 |

Zero clicks so far. Impressions are climbing daily. Entry pages with the most impressions: `/ingredients/clascoterone`, `/procedures/buccal-fat-removal`, `/procedures/neuromodulators` (position 3.5), a `www.` copy of `/dispatches/basic-skincare-veh…` (position 10.5). Seven `www.skinconsidered.com` URLs are collecting impressions separately from the apex, which the unpushed redirect would consolidate. No flywheel (position 8–20) rows yet.

**PostHog (project 589734, filtered to hosts `skinconsidered.com` and `www.skinconsidered.com`, since 2026-09-02).**

| Metric | 7 days | Note |
| --- | --- | --- |
| `$pageview` | 37 | 33 unique persons |
| Referrer | 100% `$direct` | No organic or social referral recorded yet |
| Top path | `/` 30 views | Then `/procedures/hydrafacial` 5 |
| `newsletter_view` | 8 | |
| `newsletter_submit` | 0 | Instrumented in `components/NewsletterForm.tsx`, never fired: zero observed, not missing instrumentation |
| `outbound_click` | 1 | |
| `related_click`, `cta_click` | 0 | Instrumented in `components/PostHogProvider.tsx`, never fired |

Volume is too low for any conversion or title decision; documented sample floors are not close to being met. Traffic is consistent with owner and agent visits rather than readers.

**Freshness.** Newest dispatch is dated 2026-09-04 (Canada kohl recall, unpushed). FDA recalls listing checked for 2026-09-01 through 2026-09-07: no cosmetic, sunscreen, or topical-drug entry. openFDA drug enforcement lags (latest report date 2026-08-19, no topical products in the 08-15 to 09-07 window). No new dispatch drafted. `EDITION` left at September 5 because no content changed.

**Time bombs.**
1. Six days of local work unshipped, and the tree mixes committed and uncommitted work, so a plain push would ship the September 5 edition but not the newsletter archive. Owner decision.
2. `www` host indexed separately in Search Console until the redirect deploys.
3. `docs-internal/gsc-service-account.json` is gitignored and present locally; confirm it is not in any backup that syncs publicly.

**Blockers for the owner.**
- Decide whether to commit the newsletter and artwork work, then push `main` (or open a PR) so Vercel deploys. The routine is forbidden from pushing to `main`.
- `BUTTONDOWN_API_KEY` is not set in Vercel; the form stays in preview and no `newsletter_submit` outcome can be `success`.
- The cloud routine has produced no PRs; check its schedule and credentials if a daily PR was expected.

**Next action.** After the deploy, re-run `npm run site:health` (confirm `/newsletter` is 200 and `www` redirects 308), then watch `npm run gsc -- dates 28` for the first clicks before touching any title or description.
