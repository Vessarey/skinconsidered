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

## Quality gates

```bash
npm run audit:content
npm run lint
npm run typecheck
npm run build
```

## Newsletter setup

Copy `.env.example` to `.env.local` and configure `NEWSLETTER_WEBHOOK_URL` with an endpoint that accepts JSON shaped like:

```json
{ "email": "reader@example.com", "source": "homepage" }
```

Before enabling it publicly, update `/privacy` with the provider, retention policy, unsubscribe flow, and deletion contact. Without a webhook, the form explicitly says the address was not stored.

## Editorial operation

Read [docs/EDITORIAL_PLAYBOOK.md](docs/EDITORIAL_PLAYBOOK.md) before adding or promoting a story. The Claude prototype contained fictional layout copy; `npm run audit:content` blocks the known examples from returning.
