# Daily editor — September 9, 2026

## Decision

No new, directly actionable skincare development since the previous run was verified in this bounded scan. Prioritized the concrete reader-review blocker Vanessa reported: the local preview was unavailable because port 3000 had no listener. No public content, medical claims, source review dates, or edition dates changed.

The scheduled `/Users/vanessa/code/skinconsidered` path is absent. Verified the current checkout, playbook, expected recent commits, and pending preview work at `/Users/vanessa/code/seosites/skinconsidered`. Preserved all existing uncommitted reader and celebrity-routine changes; they remain awaiting owner review and are not included in this daily commit.

## Evidence reviewed

- [Health Canada recall index](https://recalls-rappels.canada.ca/en): the September 8 entry reviewed was a food recall; the September 4 kohl recall is already on file. No later skincare recall was verified.
- [MHRA device and medicine alerts](https://www.gov.uk/drug-device-alerts): the newest visible listing was the September 3 field-safety compilation covering August 24–28. No new cosmetic-procedure safety alert since the last run was verified.
- [TGA sunscreen topic page](https://www.tga.gov.au/resources/explore-topic/sunscreens): ongoing SPF review and earlier recall information, not a verified new September 8–9 action.
- [HSA announcements](https://www.hsa.gov.sg/announcements/): the September 8 weight-loss product warning is outside this publication's skincare scope. The August 28 Medicube recall predates the previous run.
- [HSA September 9 administrative consolidation bill](https://www.hsa.gov.sg/announcements/health-sciences-authority--amendment--and-other-matters-bill-to-consolidate-health-regulatory-functions/): a new administrative development, but not evidence of a changed cosmetic ingredient rule, product safety decision, or clinical result; not promoted into a skincare action headline.
- [PubMed visible-light systematic review](https://pubmed.ncbi.nlm.nih.gov/42557920/): September issue designation does not establish a new result since yesterday. A mix of preclinical and clinical evidence is not a product endorsement. Kept as a research lead rather than asserting a new publication date.
- [PubMed postoperative water-exposure commentary](https://pubmed.ncbi.nlm.nih.gov/42242362/): September issue, June article date; not a new trial result today.
- FDA date-targeted searches and [Met exhibition searches](https://www.metmuseum.org/exhibitions) did not yield a verified new, relevant safety or cultural-history finding. This is not an exhaustive negative search; indexing lag and retrieval limitations remain.

## Improvement and operation

Added `scripts/preview-local.mjs`, a local-only launcher for the existing production build. Run from this checkout:

```sh
npm run build
node scripts/preview-local.mjs
```

The launcher detaches the Next server from the invoking terminal, binds only to `127.0.0.1:3000`, and verifies the expected routines page before reporting success. It prints the PID, a private temporary log path, and an exact stop command. It refuses to interfere with a different or unhealthy occupied service and does not rebuild implicitly. A second invocation reuses a healthy existing preview without claiming its build is fresh. On failed startup it stops only its own new child.

No system login item, launch agent, automatic restart policy, network tunnel, external hosting, or deployment was installed. The process can survive terminal exit, but this is not an uptime guarantee: reboot, explicit termination, sleep/network behavior, and host cleanup can still make a local URL unavailable. After edits, stop the printed instance, rebuild, and run the launcher again. Do not rebuild over an active production preview.

The new server was verified after the launching command exited; its parent PID was 1. A separate invocation found the same healthy preview, with no duplicate server. Port inspection confirmed loopback-only binding. The user-facing URL remains http://localhost:3000/routines .

## Validation

- Required content audit, lint, typecheck, and production build passed; 262 static pages/assets generated.
- Added two launcher tests covering non-interference with an occupied port and correct-page health detection, including non-200, wrong content, and network failure.
- Existing reader and routine checks plus launcher tests: 17 tests passed.
- Local health crawl: 134 sitemap pages OK and 11 additional internal links checked.
- Reloaded the existing routines preview in the in-app browser. Desktop 1280×900 and mobile 375×812 screenshots inspected; no horizontal overflow and no failed source thumbnails.
- One separate browser error tab could not be selected by the browser tooling because its internal error-document URL is blocked. No browser safety setting was bypassed; the normal preview tab and HTTP endpoint were independently verified. The user can reload the failed tab normally.

## Audience limits and next action

No audience-growth result is established by restoring a local preview. Search Console and PostHog counts were not refreshed in this run. The rendered newsletter still offers its sample issue rather than collecting emails; no provider was connected or mail sent. Nothing was deployed or pushed.

Next action: Vanessa can review the restored celebrity-routine preview and approve or revise it. Public rollout, media-release checks, and authorized email-provider confirmation/delivery testing remain separate approval gates.
