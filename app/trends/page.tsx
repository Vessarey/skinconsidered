import type { Metadata } from "next";
import Link from "next/link";
import { EvidenceBadge } from "@/components/EvidenceBadge";
import { NewsletterPanel } from "@/components/NewsletterPanel";
import { EDITION, TREND_CATEGORY_ORDER, TREND_VERDICT_ORDER, trends } from "@/lib/content";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Skincare trends, weighed",
  description: "Slugging, skin cycling, beef tallow, snail mucin, LED masks, collagen, exosomes, and more: what each trend claims, what the evidence supports, and who should skip it.",
  alternates: canonical("/trends"),
};

const verdictCopy: Record<(typeof TREND_VERDICT_ORDER)[number], string> = {
  Reasonable: "Consistent with good evidence or standard advice; fine for most people.",
  "Harmless, low value": "Unlikely to hurt, unlikely to do much; spend accordingly.",
  "Needs care": "Useful for some, with real conditions attached; read who should skip it.",
  Avoid: "Documented harm outweighs any benefit.",
};

export default function TrendsPage() {
  const counts = TREND_VERDICT_ORDER.map((verdict) => ({ verdict, count: trends.filter((trend) => trend.verdict === verdict).length }));

  return (
    <main id="main-content">
      <header className="page-hero trend-hero">
        <div>
          <span>Trends desk / {String(trends.length).padStart(2, "0")} files</span>
          <h1>
            What the feed says. What the evidence says.<sup>*</sup>
          </h1>
        </div>
        <p>
          Every trend gets the same treatment: what it is, what it claims, the strongest evidence for and against, a grade on that evidence, a plain verdict, and
          who should skip it. Verdicts are ours; sources are linked.
        </p>
      </header>

      <section className="trend-verdict-key" aria-label="Verdict key">
        {counts.map(({ verdict, count }) => (
          <div key={verdict} className={`verdict-${verdict.toLowerCase().replace(/[^a-z]+/g, "-")}`}>
            <b>{count}</b>
            <span>{verdict}</span>
            <small>{verdictCopy[verdict]}</small>
          </div>
        ))}
      </section>

      {TREND_CATEGORY_ORDER.map((category) => {
        const group = trends.filter((trend) => trend.category === category);
        if (!group.length) return null;
        return (
          <section className="trend-group" aria-labelledby={`trend-${category.toLowerCase()}`} key={category}>
            <div className="trend-group-heading">
              <h2 id={`trend-${category.toLowerCase()}`}>{category}</h2>
              <span>
                {group.length} {group.length === 1 ? "file" : "files"}
              </span>
            </div>
            <ul className="trend-list">
              {group.map((trend) => (
                <li key={trend.slug} id={trend.slug}>
                  <div className="trend-card-top">
                    <span className={`trend-verdict verdict-${trend.verdict.toLowerCase().replace(/[^a-z]+/g, "-")}`}>{trend.verdict}</span>
                    <EvidenceBadge compact grade={trend.grade} />
                  </div>
                  <h3>
                    <Link href={`/trends/${trend.slug}`}>{trend.name}</Link>
                  </h3>
                  <p className="trend-claim">
                    <b>The claim</b> {trend.claim}
                  </p>
                  <p className="trend-evidence">{trend.evidence}</p>
                  <div className="trend-card-bottom">
                    <span>
                      <b>Skip it if</b> {trend.whoShouldSkip}
                    </span>
                    <Link href={`/trends/${trend.slug}`}>Full file →</Link>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        );
      })}

      <section className="trend-method" aria-labelledby="trend-method-title">
        <div>
          <span>How verdicts are made</span>
          <h2 id="trend-method-title">A trend is graded on its best evidence, not its follower count.</h2>
        </div>
        <ul>
          <li>
            <b>The grade</b> follows the strongest relevant evidence for the specific claim, using the same A to CTX scale as every other desk.
          </li>
          <li>
            <b>The verdict</b> is an editorial call that also weighs cost, opportunity cost, and harm. A trend can be Context-grade and still Reasonable when it encodes standard advice.
          </li>
          <li>
            <b>Avoid</b> is reserved for documented harm: sunscreen contouring, DIY needling and injections, tanning peptides.
          </li>
          <li>
            <b>Reviewed</b> {EDITION.label}. A change in status gets a dated update on the file and on the corrections log.
          </li>
        </ul>
      </section>

      <NewsletterPanel source="trends" />
    </main>
  );
}
