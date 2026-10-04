# Daily editor — September 19, 2026

## Evidence reviewed and decision

Added one short, source-linked Canadian device-safety dispatch based on [Health Canada's September 18 advisory RA-82651](https://recalls-rappels.canada.ca/en/alert-recall/counterfeit-laser-hair-removal-and-therapy-devices-found-some-clinics-and-may-pose). Read the complete advisory and its linked [Medical Devices Active Licence Listing guidance](https://www.canada.ca/en/health-canada/services/drugs-health-products/medical-devices/licences/medical-devices-active-licence-listing.html). The story retains September 18 as its publication date and separately records the September 19 source check.

Claim ledger:

- The advisory identifies counterfeit Soprano-labelled laser hair-removal and therapy devices labelled Beijing Perfectlaser Technology Co., Ltd., distinguishing them from genuine Alma Lasers equipment. This is not a recall of genuine Soprano systems.
- A falsified licence is reported. Clinics are directed to compare permanent-label manufacturer, device and model identifiers with MDALL, consult the manufacturer if uncertain, and stop using and safely dispose of counterfeits. Patient advice is kept separate: consult a licensed healthcare professional about health concerns following treatment.
- MDALL supports licence, company, device-name and identifier searches for licensed Class II–IV devices. Its guidance excludes Class I, investigational and special-access devices. Neither a database listing nor this article authenticates an individual machine.
- The advisory supplies no affected-clinic list, serial numbers, device count or injury rate. Manufacturer confirmation is identified as coming from a commercially interested party. Grade A applies to the documented official advisory, not treatment efficacy; these sources are not clinical trials and provide no trial funding assessment.

The bounded wider scan included FDA, HSA, Health Canada, MHRA, TGA, Anvisa, PubMed and Smithsonian/Met history searches. HSA's September 18 cosmetic recall was already covered. Other results included food and MRI notices in Canada, unrelated medicine alerts in the UK, Australian vaping and ingredient-scheduling material, Brazilian administrative records, older research publication-date matches and museum programmes. No additional new human efficacy or skincare-history finding was verified for selection. This is a bounded editorial scan, not comprehensive global surveillance.

## Changes and validation

Added `canada-counterfeit-soprano-laser-advisory-2026` to `content/stories.ts`, linked to the existing laser-hair-removal procedure and safety checklist. The existing Health Canada registry entry covers both sources; no registry change was needed. Added three unit tests and a dedicated desktop/mobile browser regression. No unrelated copy, design or site-wide review date changed.

- Content audit, lint, typecheck and production build passed: 17 dispatches, 427 source links, 29 registry entries, two existing logged updates and 270 generated static pages/assets.
- All 40 Node tests passed, including advisory scope, date and source boundaries, commercial-interest disclosure and independent U.S. listing freshness.
- At 1280px and 375px: one H1, visible source dates and limitations, two correct source links, article schema, related-procedure navigation, North America/Safety feed filtering, RSS and sitemap inclusion, no horizontal overflow or uncaught browser errors. Full-page article screenshots visually inspected.
- Existing sitemap/listing browser regression passed at desktop/mobile widths for all three listings and their content-derived dates.
- Local health crawl: 138 sitemap URLs OK; 11 additional internal links checked using explicit `http://localhost:3000`. This is not a production check.
- Stopped only the verified project-owned preview PID 34845 before building; restarted the loopback preview as PID 92273. The pending routine preview remains available.

## Limits and next action

Current checkout: `/Users/vanessa/code/seosites/skinconsidered`; the scheduled legacy path remains absent. Existing reader, routine, artwork, newsletter, registry and sitemap work was preserved. The commit is limited to today's story, two new regression scripts and this report.

No push, deployment, public publication, spending, external contact, provider connection, analytics refresh or newsletter delivery. Newsletter remains preview-only; no audience-growth outcome is established. Seven source endpoints unverified in the September 13 audit still require manual pre-release review; today's targeted source checks do not clear them.

Next: owner review of this local safety dispatch and the pending publication preview; resolve the outstanding source checks before any separately authorised public rollout. Continue the daily primary-source scan.
