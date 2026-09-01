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
| `content/ingredients.ts` | Ingredient files, with `aliases` used for search and “In our files” mentions |
| `content/site.ts` | Edition number and date, desks, regions, grade definitions, primary navigation |
| `content/types.ts` | The shapes above, including `related` cross links and dated `updates` |

Reading times are computed from the text. Cross links in `related` are validated by the audit. Anything placed in `updates` appears on the file itself and on `/corrections` automatically, so a status change never has to be a silent rewrite.

## Quality gates

```bash
npm run audit:content
npm run lint
npm run typecheck
npm run build
```

`npm run build` runs the content audit first and fails if it fails. The audit checks for fictional prototype copy, hype language, non-HTTPS sources, missing limitations or sources, broken cross links, non-ISO or future dates, mismatched date labels, and duplicate slugs.

## Newsletter setup

Copy `.env.example` to `.env.local` and configure `NEWSLETTER_WEBHOOK_URL` with an endpoint that accepts JSON shaped like:

```json
{ "email": "reader@example.com", "source": "homepage" }
```

Before enabling it publicly, update `/privacy` with the provider, retention policy, unsubscribe flow, and deletion contact. Without a webhook, the form explicitly says the address was not stored. The form carries a hidden honeypot field; submissions that fill it are acknowledged but never forwarded.

## Metadata and feeds

Open Graph images, the favicon, and the Apple touch icon are generated at build time from the design tokens (`lib/og.tsx`, `app/icon.tsx`, `app/apple-icon.tsx`). `/rss.xml`, `/sitemap.xml`, `/robots.txt`, and `/manifest.webmanifest` are derived from the content files. Set `NEXT_PUBLIC_SITE_URL` to the production origin before deploying so canonical URLs, feeds, and structured data point at the right host.

## Editorial operation

Read [docs/EDITORIAL_PLAYBOOK.md](docs/EDITORIAL_PLAYBOOK.md) before adding or promoting a story. The Claude prototype contained fictional layout copy; `npm run audit:content` blocks the known examples from returning.
