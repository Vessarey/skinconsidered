# Skin Considered

An independent, evidence-aware skincare news and education publication built from the Claude Design project **“Minimal skincare news platform”**.

The founding edition includes:

- a global wire for regulation, safety, research, and procedures;
- evidence grades that travel with the specific claim;
- source-linked dispatches and explicit limitations;
- practical guides, ingredient files, and a cultural practice archive;
- unified search, RSS, structured metadata, sitemap, and responsive layouts;
- a provider-ready newsletter endpoint with a truthful preview state until configured.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Where the content lives

Editorial data is plain TypeScript, one file per desk, so an editor can add a file without touching layout code:

| File | Holds |
| --- | --- |
| `content/stories.ts` | Dispatches for the global wire (the first entry is the homepage lead; everything else is ordered by date automatically) |
| `content/guides.ts` | Practical guides |
| `content/culture.ts` | Practice-archive files |
| `content/ingredients.ts` | Topical files (prescription, OTC drug, cosmetic): status, forms, evidence graded per use, how to use, side effects, cautions, access, regulatory status (see below) |
| `content/trends.ts` | Trend files: what it is, the claim, the evidence, a grade, an editorial verdict, and who should skip it (see below) |
| `content/procedures.ts` | Procedure decision files: one per family, branded treatment, or technique (see below) |
| `content/coverage.ts` | The coverage taxonomy and the source registry (watchlist) behind `/coverage` |
| `content/site.ts` | Edition number and date, desks, regions, grade definitions, newsletter promise, primary navigation |
| `content/types.ts` | The shapes above, including `related` cross links and dated `updates` |

Reading times are computed from the text. Cross links in `related` are validated by the audit. Anything placed in `updates` appears on the file itself and on `/corrections` automatically, so a status change never has to be a silent rewrite.

### Procedure files

Each entry in `content/procedures.ts` renders on the comparison at `/procedures` and as its own page at `/procedures/<slug>`. The shape forces the honest answer for every field:

- `kind` separates a generic `family` (hydradermabrasion) from a `branded` treatment (HydraFacial) or a manual `technique` (extractions); a branded file must carry a `brandNote` pointing at its family.
- `concerns` is the normalized filter vocabulary; `goals` is free text for display.
- `evidenceGrade` grades the stated `purpose`, not the device or brand. `evidence` explains why.
- `cost` and `costBand` must agree: a dollar figure needs a band, and “No reliable estimate” cannot carry a figure. `costBasis` says what the figure includes, excludes, and where it comes from.
- `downtime`/`downtimeBand`, `healing`, `results`, and `duration` give the timeline; `commonEffects` and `majorRisks` are separate lists.
- `setting` and `operator` say who performs it in the U.S.; `regulatory` gives U.S. status and flags where other jurisdictions differ.
- `metrics` carry use or market figures only with a `source` and a `caveat`.
- `reviewed` is the ISO review date shown on the page and used in the sitemap.

### Prices, illustrations, and photos

- `content/price-survey.ts` lists the public clinic menus the desk read, with location and retrieval date; `content/procedure-prices.ts` maps procedure slugs to an advertised range, its basis, and the menu ids it came from. The audit fails on an unknown slug or menu id, a range without a dollar figure, or a "No reliable estimate" band. Pages label these as advertised prices from named menus, never as averages; ASPS averages stay in `cost`.
- Every procedure and topical page carries an original schematic of where the treatment acts (`components/TreatmentDepthFigure.tsx`). Targets default by category or family in `lib/content.ts` and can be overridden per file with `targets`.
- Photos are supported through the optional `image` field on procedure and topical files. The audit requires `src`, `alt`, `credit`, and `license` before one renders, so nothing unlicensed ships. No photos are included yet.
- `content/concerns.ts` is the by-concern topicals guide rendered at the top of `/ingredients`; every ingredient it names must be a topical file.

### Topical files

Each entry in `content/ingredients.ts` renders on `/ingredients` and at `/ingredients/<slug>`:

- `status` is the U.S. market status (prescription, OTC drug, cosmetic, or a mix); `regulatory` explains it and flags where other jurisdictions differ.
- `forms` lists strengths and vehicles as sold, marked Rx, OTC, or cosmetic.
- `uses` grades each indication separately. The audit fails if the headline `evidence` grade exceeds the best per-use grade, so an acne A can never decorate a wrinkle claim.
- `howToUse`, `sideEffects`, `cautions` (pregnancy, interactions), and `access` (generic availability, what drives price) are required; `trendNote` links the ingredient to the trends desk.
- Drug labels cite DailyMed searches so the current label is always one click away.

### Trend files

Each entry in `content/trends.ts` renders on `/trends` and at `/trends/<slug>`: `whatItIs`, `claim`, `evidence`, a `grade` on that evidence, an editorial `verdict` (Reasonable, Harmless low value, Needs care, Avoid), `whoShouldSkip`, and optional `tryInstead`. "Avoid" is reserved for documented harm.

### Coverage and source registry

`content/coverage.ts` lists every source the desk intends to check (jurisdiction, what it covers, intended cadence, domains). Whether a source is “In use” or on the “Watchlist” is computed from the domains actually cited in current files, never declared by hand, so `/coverage` cannot overstate what is covered. Jurisdiction coverage is computed from dispatches the same way.

## Quality gates

```bash
npm run audit:content
npm run lint
npm run typecheck
npm run build
npm run audit:links   # on demand; needs network
```

`npm run build` runs the content audit first and fails if it fails. The audit checks for fictional prototype copy, hype language, non-HTTPS sources, missing limitations or sources, broken cross links, non-ISO or future dates, mismatched date labels, duplicate slugs, and every procedure and registry field listed above. `npm run audit:links` requests every source URL on file and reports broken links; publishers that block scripted requests (Cochrane, CDC, BLS) are listed as blocked for manual confirmation rather than failing the run.

## Newsletter setup

The site promises **The Daily Considered** (one weekday email plus a Sunday synthesis). Until a provider is connected, every form shows a preview note and the button reads “Test signup”, so nobody is told an address was saved when it was not.

Copy `.env.example` to `.env.local` and configure `NEWSLETTER_WEBHOOK_URL` with an endpoint that accepts JSON shaped like:

```json
{ "email": "reader@example.com", "source": "homepage" }
```

Before enabling it publicly, update `/privacy` with the provider, retention policy, unsubscribe flow, and deletion contact, and confirm the provider runs double opt-in. Without a webhook, the form explicitly says the address was not stored. The form carries a hidden honeypot field; submissions that fill it are acknowledged but never forwarded.

## Metadata and feeds

Open Graph images, the favicon, and the Apple touch icon are generated at build time from the design tokens (`lib/og.tsx`, `app/icon.tsx`, `app/apple-icon.tsx`). `/rss.xml`, `/sitemap.xml`, `/robots.txt`, and `/manifest.webmanifest` are derived from the content files. Set `NEXT_PUBLIC_SITE_URL` to the production origin before deploying so canonical URLs, feeds, and structured data point at the right host.

## Editorial operation

Read [docs/EDITORIAL_PLAYBOOK.md](docs/EDITORIAL_PLAYBOOK.md) before adding or promoting a story. The Claude prototype contained fictional layout copy; `npm run audit:content` blocks the known examples from returning.
