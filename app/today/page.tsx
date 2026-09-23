import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { GlobalFeed } from "@/components/GlobalFeed";
import { deskLabel, desks, regions, wireItems } from "@/lib/content";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Today — the global skincare wire",
  description: "Source-linked skincare regulation, research, procedures, and safety updates from around the world, filterable by region and desk.",
  alternates: canonical("/today"),
};

export default function TodayPage() {
  return (
    <main id="main-content">
      <header className="page-hero global-hero">
        <div>
          <span>Global skincare news</span>
          <h1>
            The latest, in perspective.
          </h1>
        </div>
        <p>
          Follow safety alerts, research, and regulatory changes from around the world. Filter by region or topic to find what matters to you.
        </p>
      </header>
      <div className="today-us-link">
        <span>Looking for U.S. information?</span>
        <p>Start with FDA alerts, current cosmetic rules, and plain-language next steps.</p>
        <Link href="/us">Open the U.S. essentials desk →</Link>
      </div>
      <Suspense fallback={<p className="search-loading">Opening the wire…</p>}>
        <GlobalFeed desks={desks.map(deskLabel)} regions={[...regions]} stories={wireItems} />
      </Suspense>
    </main>
  );
}
