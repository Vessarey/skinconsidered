# Skin Considered editorial and growth playbook

## North-star promise

Help a reader understand what changed, how much confidence it deserves, and what—if anything—it should change for them.

The publication wins through repeat trust, not maximum posting volume.

## Daily loop

1. **Scan primary sources.** Check regulators, trial registries, PubMed-indexed papers, professional safety communications, and accountable museum or academic sources. Search multiple regions; do not let U.S. product launches define the global desk.
2. **Triage the delta.** Prefer an actual change in regulatory status, a published human result, an actionable safety notice, or a durable explainer gap. A brand announcement alone is rarely the highest-value story.
3. **Make a claim ledger.** For every proposed headline, record the exact claim, source, source date, population or jurisdiction, comparator, important conflict, and limitation.
4. **Write to the evidence ceiling.** Proposal is not policy. Online publication is not replication. Product-specific data is not an ingredient-wide verdict. Historical use is not clinical proof.
5. **Publish only through the gates.** Run content audit, lint, typecheck, and production build. Check desktop and mobile navigation, source links, single-page heading structure, and horizontal overflow.
6. **Review the audience signal.** Once analytics are connected, log organic entry pages, returning readers, engaged reading, newsletter conversion, and unsubscribe rate. Improve one weak point—not the entire site—per cycle.

## Source registry and coverage

The registry in `content/coverage.ts` is the desk's watchlist: for each source, the jurisdiction, what it can establish, its domains, and the intended check cadence. The coverage page computes which sources are actually cited and which jurisdictions have files; it never claims completeness. When you add a new regulator, society, journal, or archive:

1. Add a registry entry with an HTTPS URL and its domains before citing it.
2. Cite it in a file; the coverage page flips it from “Watchlist” to “In use” automatically.
3. Run `npm run audit:links` before a release to catch link rot. Publishers that block scripted requests appear as “blocked”; open those by hand.

## Procedure files

A procedure file grades a stated purpose, not a device, brand, or clinic. Before publishing or updating one:

- File brands under their generic family (`kind: "branded"` with a `brandNote`), and keep popularity figures separate from effectiveness with a `caveat` on every metric.
- Quote a cost only from a published, linked figure and say what it includes and excludes; otherwise write “No reliable estimate” and explain how to get a real quote.
- Name the serious risks, the pause signs, who performs the treatment in the U.S. and where state rules vary, and the U.S. regulatory status of what is used.
- Set `reviewed` to the review date. A material change gets an entry in `updates`; the profile is never silently rewritten.

## Topical and trend files

- A topical file grades each use separately. Say the U.S. status (prescription, OTC drug, cosmetic) before the evidence, list the forms actually sold, and name pregnancy and interaction cautions. Cite drug labels through DailyMed, not a brand site.
- A trend file separates what the trend is, what it claims, and what the evidence supports. The grade rates the evidence; the verdict is ours and also weighs cost and harm. Reserve "Avoid" for documented harm (sunscreen contouring, DIY needling and injections, tanning peptides).
- When a trend and a topical overlap (slugging and petrolatum, bakuchiol and retinol), cross-link both ways with `related` so the reader lands on the evidence whichever door they used.

## Weekly editorial mix

- 2–3 timely global dispatches with primary sources.
- 1 research consideration that explains methods and limits.
- 1 evergreen guide update driven by reader questions or search intent.
- 1 cultural-history or material-practice story with credited context.
- The Daily Considered on weekdays (short: what changed, how much to trust it, what to do) and a Sunday synthesis that does not repeat the homepage. Sending starts only when a provider with double opt-in is connected; until then every form says “preview”.

## Evidence language

- **A — high confidence:** final regulatory action, systematic synthesis, or a mature directly relevant body of evidence.
- **B — useful human evidence:** controlled human data or a strong review with meaningful limits.
- **C — early signal:** small, exploratory, preclinical, or otherwise preliminary evidence.
- **CTX — context, not efficacy:** policy process, market data, historical record, or another source that should not be read as a treatment grade.

Grades belong to the exact claim. They are not permanent scores for an ingredient, treatment, culture, brand, or country.

## Trust gates

- Link the underlying source, preferably the regulator, paper, registry, museum, archive, or named expert record.
- Put the strongest limitation in the page, not in an internal note.
- Name commercial funding and conflicts when they bear on interpretation.
- Do not use invented medical bylines, subscriber counts, timestamps, volume numbers, or implied reviewers.
- Do not publish individualized medical directions.
- Keep culture stories out of “ancient secret” and “beauty hack” framing.
- Add a dated correction rather than silently rewriting a material error. In practice: add an entry to the file’s `updates` array in `content/` with `kind: "correction"` (what was wrong and what replaced it) or `kind: "update"` (a new development, original report not wrong). The entry renders on the file and on `/corrections` automatically.
- Link related files deliberately through the `related` field rather than relying on readers to find them; the audit fails on a slug that does not exist.

## Growth without trust debt

### Phase 1 — proof of return value

Measure readers who come back, finish a file, follow a second internal link, or ask to receive the Sunday briefing. Build topic clusters around genuine information needs: sunscreen rules by market, procedure safety, retinoid decisions, barrier care, claim interpretation, and global practice history.

### Phase 2 — newsletter and community

Connect double opt-in, a welcome sequence, and a correction-aware archive. Ask one useful question at signup—what desk they want more of—only after the basic form converts.

### Phase 3 — monetization

Test reader membership first: archive tools, saved files, member briefings, or live evidence walkthroughs. Clearly labeled sponsorships, events, or selected directories can follow once repeat readership is proven. Never sell evidence grades, editorial inclusion, correction handling, or ranking.

## Metrics that matter

- Returning-reader rate by 7- and 30-day window.
- Search-to-second-page rate.
- Engaged reading at 50% and 90% depth.
- Newsletter view-to-submit and confirmed-subscription rate.
- Unsubscribe and spam-complaint rate.
- Organic impressions and click-through by topic cluster.
- Corrections per 100 published files and time to resolve.

Raw page views matter, but they are not the product. The product is a reader choosing Skin Considered again when a skincare claim needs proportion.
