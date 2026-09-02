import type { Metadata } from "next";
import Link from "next/link";
import { EvidenceBadge } from "@/components/EvidenceBadge";
import { EDITION, readingTime, storiesByDate } from "@/lib/content";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "United States skincare desk",
  description: "Plain-language U.S. skincare safety alerts, FDA changes, procedure guidance, and cosmetic regulation—linked to primary sources.",
  alternates: canonical("/us"),
};

const actionSlugs = new Set(["us-skin-lightening-mercury-warning-2026", "us-rf-microneedling-safety-communication"]);

export default function UnitedStatesPage() {
  const usStories = storiesByDate.filter((story) => story.location === "United States");
  const actionStories = usStories.filter((story) => actionSlugs.has(story.slug));
  const changeStories = usStories.filter((story) => !actionSlugs.has(story.slug));

  const storyList = (items: typeof usStories) => (
    <div className="us-file-list">
      {items.map((story) => (
        <article key={story.slug}>
          <div className="us-file-meta">
            <span>{story.category}</span>
            <EvidenceBadge compact grade={story.grade} />
            <time dateTime={story.date}>{story.dateLabel}</time>
          </div>
          <h3>
            <Link href={`/dispatches/${story.slug}`}>{story.headline}</Link>
          </h3>
          <p>{story.dek}</p>
          <div className="us-file-bottom">
            <span><b>Keep in mind:</b> {story.limitations}</span>
            <Link href={`/dispatches/${story.slug}`}>{readingTime(story.sections, story.dek).label} read →</Link>
          </div>
        </article>
      ))}
    </div>
  );

  return (
    <main id="main-content" className="us-page">
      <header className="page-hero us-hero">
        <div>
          <span>United States desk / FDA source-linked</span>
          <h1>U.S. skincare, without the fine-print fog.</h1>
        </div>
        <p>
          Start with what you may need to act on. Then see what changed in rules, products, and procedures. Every file separates an official action
          from what it does—and does not—mean for you.
        </p>
      </header>

      <section className="us-snapshot" aria-label="United States desk snapshot">
        <div><b>{usStories.length}</b><span>U.S. files on this edition</span></div>
        <div><b>1,298,361</b><span>active cosmetic product listings reported by FDA</span></div>
        <div><b>Primary</b><span>FDA records open with every claim</span></div>
        <div><b>{EDITION.label}</b><span>last editorial review</span></div>
      </section>

      <section className="us-section us-action" aria-labelledby="us-action-title">
        <div className="us-section-intro">
          <span>01 / Worth knowing now</span>
          <h2 id="us-action-title">Start here if safety brought you in.</h2>
          <p>These are current FDA communications with a practical next step. The alert scope stays visible so one product or report does not become a blanket claim.</p>
        </div>
        {storyList(actionStories)}
      </section>

      <section className="us-section" aria-labelledby="us-change-title">
        <div className="us-section-intro">
          <span>02 / What changed</span>
          <h2 id="us-change-title">Rules and options, translated.</h2>
          <p>Administrative data is not a safety grade, and permission is not shelf availability. These files explain the difference before the headline travels.</p>
        </div>
        {storyList(changeStories)}
      </section>

      <section className="us-primer" aria-labelledby="us-primer-title">
        <div>
          <span>03 / The U.S. primer</span>
          <h2 id="us-primer-title">Four distinctions that prevent a lot of confusion.</h2>
        </div>
        <ol>
          <li><b>Cosmetic listing is not approval.</b><span>Most cosmetics do not go through FDA premarket approval. Registration and product listing improve traceability but do not certify safety or effectiveness.</span></li>
          <li><b>Sunscreen is an over-the-counter drug.</b><span>Its active ingredients and finished labeling follow drug requirements, which is why adding a new U.S. sunscreen filter requires a regulatory order.</span></li>
          <li><b>A cleared device has a specific use.</b><span>FDA authorization is tied to a device and indication. It does not validate every treatment claim, setting, body area, or product used with it.</span></li>
          <li><b>A report is a signal, not an incidence rate.</b><span>Adverse-event reports can reveal serious problems, but they usually cannot tell you how often an event occurs or prove the cause on their own.</span></li>
        </ol>
      </section>

      <section className="us-check" aria-labelledby="us-check-title">
        <div>
          <span>Check it yourself</span>
          <h2 id="us-check-title">Official U.S. lookups worth bookmarking</h2>
          <p>Use these live FDA pages when a brand post, treatment pitch, or old screenshot needs a reality check.</p>
        </div>
        <ul>
          <li><a href="https://www.fda.gov/safety/recalls-market-withdrawals-safety-alerts" rel="noreferrer" target="_blank"><b>Recalls and safety alerts</b><span>Search recent FDA notices ↗</span></a></li>
          <li><a href="https://www.fda.gov/medical-devices/medical-device-safety/safety-communications" rel="noreferrer" target="_blank"><b>Medical-device safety</b><span>Read current device communications ↗</span></a></li>
          <li><a href="https://www.fda.gov/cosmetics/cosmetics-compliance-enforcement/how-report-cosmetic-related-complaint" rel="noreferrer" target="_blank"><b>Report a cosmetic problem</b><span>See what information FDA asks for ↗</span></a></li>
          <li><a href="https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfpmn/pmn.cfm" rel="noreferrer" target="_blank"><b>510(k) device database</b><span>Look up a device by name or number ↗</span></a></li>
        </ul>
      </section>
    </main>
  );
}
