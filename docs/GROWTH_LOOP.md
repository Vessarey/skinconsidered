# Growth loop: the daily routine

A cloud agent runs this loop once a day against the repository and the live site. It exists to grow clicks, readers, and subscribers, and to make the site ready to monetize, without ever trading trust for reach. Everything it changes goes through a pull request; it never pushes to `main`, never deploys, and never invents a fact, a number, or a source.

## Inputs

| Input | Where | Notes |
| --- | --- | --- |
| Repository | `main` checkout | Content, code, this playbook, `docs/EDITORIAL_PLAYBOOK.md` |
| Live site | https://skinconsidered.com | `npm run site:health` crawls the sitemap |
| Source links | `npm run audit:links` | Link rot across 270+ sources and price menus |
| Analytics | Vercel Web Analytics | Cookieless page views and referrers. Read via the Vercel API when `VERCEL_TOKEN` (and optionally `VERCEL_TEAM_ID`, `VERCEL_PROJECT_ID`) are set in the routine's environment; otherwise the agent says so and skips data-driven steps rather than guessing |
| Primary sources | FDA, PubMed, ASPS, AAD, and the registry in `content/coverage.ts` | For new dispatches and updates |
| Search demand | Titles, descriptions, and internal search terms already on file | No external keyword tool is connected; the agent may not fabricate volumes |

## The loop

1. **Health.** Run `npm ci`, `npm run audit:content`, `npm run lint`, `npm run typecheck`, `npm run build`, `npm run audit:links`, and `npm run site:health`. Fix what is fixable (broken internal links, dead sources replaced with a verified equivalent, metadata gaps, overflow, accessibility). A dead source is replaced only with a live primary or authoritative source the agent has actually fetched.
2. **Freshness.** Check the registry sources for developments since the newest dispatch: FDA recalls and safety communications, FDA cosmetics and sunscreen news, PubMed for tracked topics, ASPS and AAD releases. Draft at most two new dispatches per run following the editorial playbook: primary source linked, grade on the exact claim, limitations stated, dates ISO and labeled, `related` links set. Add a dated `updates` entry to any file whose status changed. Set `EDITION.date` and `label` in `content/site.ts` to the run date when content is added or changed.
3. **Data.** When analytics are available, pull the last 7 and 28 days: top pages, top referrers, entry pages, and pages with high views but no onward click. Turn findings into concrete edits: stronger titles and descriptions on high-impression pages, internal links from popular files to related ones, a newsletter placement on a page that gets traffic but no signups, a new file for a topic readers search for internally. Record each decision and the number behind it in the PR description. No analytics means no data claims.
4. **Conversion.** Review the newsletter placements, copy, and preview state. Keep the honest preview until `NEWSLETTER_WEBHOOK_URL` is set in Vercel. Never add popups, fake counts, urgency, or pre-checked boxes.
5. **Monetization readiness.** Keep `/about` commercial rules current. Propose, never enable, reader membership tooling, labeled sponsorship slots, or a jobs/directory product only when returning-reader evidence supports it, and only as a PR the owner can read.
6. **Ship.** Run all gates again. Commit to a branch named `routine/YYYY-MM-DD`, push, and open one PR titled `Daily improvements — YYYY-MM-DD` with a short report: what was checked, what changed, what data drove it, and blockers the owner must resolve (provider keys, licensed photos, domains, budgets). If nothing needs changing, open no PR and leave a one-paragraph note in the run log.

## Hard rules

- Truth over growth: no fabricated statistics, prices, citations, subscriber counts, or clinical conclusions. Every number in content carries a linked source and its caveat.
- Medical boundary: educational, jurisdiction-aware, explicit about uncertainty and when a clinician is needed.
- Sources first: FDA, NIH/PubMed, professional societies, regulators, peer-reviewed literature, official recalls. Press coverage can locate a story; it does not replace the record.
- No dark patterns, no affiliate links, no sponsored grades, no sensational headlines.
- The audit must pass. If `npm run audit:content` fails, fix the content; do not weaken the audit.
- Never commit secrets, never touch `.env*`, never run `vercel`, never push to `main`.

## Metrics the loop reports

Returning-reader rate, entry pages, search-to-second-page rate, newsletter view-to-submit (once a provider exists), organic referrers by topic cluster, corrections per 100 files, and time from source event to published dispatch.
