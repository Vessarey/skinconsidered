# Backlog

Ranked by expected value. Each item names the evidence that justifies it and the gate that must open first. Move an item to `docs/JOURNAL.md` when it is done. Do not add an item without a number or an observed fact behind it.

## Owner gates (the routine cannot do these)

1. **Ship `main`.** Five commits are unpushed since 2026-09-02 and the live site is on the September 1 edition. Decide what to do with the uncommitted newsletter archive and artwork, then push or open a PR. Evidence: journal 2026-09-07.
2. **Set `BUTTONDOWN_API_KEY` in Vercel** once the provider's double opt-in is confirmed. Until then `newsletter_submit` can only report `preview`.
3. **Confirm the cloud routine is running.** Zero PRs, zero workflow runs, and no journal entries before 2026-09-07.

## Ready when traffic supports it

4. **Consolidate the `www` host.** Deploys with the unpushed redirect; then use `npm run gsc -- inspect` on one `www` URL to confirm Google sees the 308. Evidence: seven `www` URLs with impressions in Search Console on 2026-09-05.
5. **Title and description pass on early entry pages** (`/ingredients/clascoterone`, `/procedures/buccal-fat-removal`, `/procedures/neuromodulators`). Wait for at least one week of clicks in `gsc -- entry`; at 0 clicks there is nothing to compare.
6. **Newsletter placement on the top-traffic non-home page.** `/procedures/hydrafacial` led non-home views (5 in 7 days). Revisit when a page reaches a sample the playbook accepts.
7. **First flywheel targets.** Rerun `npm run gsc -- flywheel 28` weekly; it was empty on 2026-09-07.

## Hygiene

8. **`npm run audit:links`** was not run on 2026-09-07; run it on the next pass and replace dead sources per the editorial playbook.
9. **FDA recall feed URL.** The RSS paths tried on 2026-09-07 all 404; the HTML listing at `/safety/recalls-market-withdrawals-safety-alerts` works. Record a working feed in `content/coverage.ts` notes or the playbook so the freshness check is reproducible.
