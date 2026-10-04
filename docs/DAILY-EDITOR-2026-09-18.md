# Daily editor — September 18, 2026

## Evidence reviewed and decision

Added one short, source-linked Singapore recall dispatch from the [new HSA notice](https://www.hsa.gov.sg/announcements/nu-skin-ageloc-dermatic-effects/). Read the complete recall table, supplier instructions and recall-level definitions. This is a documented regulatory action, not a clinical efficacy result; Grade A applies only to that action.

Claim ledger: the article preserves the exact product identifier and local company from the table, separates the notice date from the action date, and keeps the instruction's audience explicit. It does not invent a consumer refund scheme, quantified exposure, clinical harm rate, manufacturer-trial result or brand-wide finding. Regulator provenance is stated; the source supplies no trial funding/conflict statement to assess. The linked notice remains authoritative for changes.

The wider bounded scan included FDA cosmetics/device searches, [HSA announcements](https://www.hsa.gov.sg/announcements/), [Health Canada recalls](https://recalls-rappels.canada.ca/en), [MHRA alerts](https://www.gov.uk/drug-device-alerts), TGA, Anvisa, PubMed, and Smithsonian/Met history searches. HSA was the most directly relevant actionable cosmetic item selected.

- FDA results included meetings, food guidance and device notices outside the selected cosmetic story. Canada's September 17 notices included MRI equipment, toys, grills, sauna equipment and food.
- [TGA's current news](https://www.tga.gov.au/news) included vaping enforcement; its sunscreen review remained the already-covered September 11 item. A [scheduling-page update](https://www.tga.gov.au/products/regulations-all-products/ingredients-and-scheduling-medicines-and-chemicals/permissible-ingredients-determination/schedule-changes-permissible-ingredients-determination) is not itself a newly enacted sunscreen rule. Anvisa searches surfaced cargo-loss reporting and administrative material.
- [September 17 hydrogel research](https://pubmed.ncbi.nlm.nih.gov/42748342/) used an induced mouse dermatitis model, not a human trial. Direct-page retrieval failed, but the primary-source indexed abstract established that boundary; no efficacy article was written from it.
- Smithsonian/Met searches surfaced museum programmes and existing history material, not a verified new skincare-history finding. This is a bounded selection, not a claim of comprehensive global coverage.

## Changes and validation

Added `singapore-nu-skin-dermatic-effects-recall-2026` to `content/stories.ts`, an HSA source-registry entry, three unit tests and one desktop/mobile browser regression. No unrelated copy, medical directions, design or site-wide review date changed.

- Required content audit, lint, typecheck and production build passed: 16 dispatches, 425 source links, 29 registry entries, two existing logged updates and 268 generated static pages/assets.
- All 37 Node tests passed, including recall date/scope/source boundaries and independent U.S. listing freshness.
- At 1280px and 375px: one H1, visible dates and limitations, correct source link and article schema, Asia-filter navigation, HSA shown in use, RSS/sitemap inclusion, no horizontal overflow or uncaught browser errors. Full-page article screenshots visually inspected.
- Feed regression passed at 320, 375, 640, 641, 760, 761 and 1280px, including filters, reload, reset and keyboard navigation; mobile feed screenshot inspected.
- The prior sitemap browser test initially failed because it hardcoded the September 11 FDA story as a homepage fixture. That story legitimately moved outside the homepage's latest-three selection. Updated only the test to derive the latest global and U.S. fixtures independently, including dated updates. All three listing navigation checks and sitemap dates then passed at desktop/mobile widths.
- Local health crawl: 137 sitemap URLs OK; 11 additional internal links checked. Explicit local origin used; this is not a production check.
- Stopped only the verified project-owned preview PID 76848 before building; restarted loopback preview as PID 34845. The pending routine preview remains available.

## Limits and next action

Current checkout: `/Users/vanessa/code/seosites/skinconsidered`; the scheduled legacy path remains absent. Existing reader, routine, artwork, newsletter and sitemap work was preserved. Only the new HSA registry hunk is staged, excluding the two pre-existing routine/Vogue lines.

No push, deployment, public publication, spending, external contact, provider connection, analytics refresh or newsletter delivery. Newsletter remains preview-only; no audience-growth outcome is established. Seven source endpoints unverified in the September 13 audit still need manual pre-release review; today's targeted source check does not clear them.

Next: owner review of this local safety dispatch and the pending publication preview; resolve the outstanding source checks before any separately authorised public rollout. Continue the daily primary-source scan.
