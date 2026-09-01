import type { Metadata } from "next";
import { GlobalFeed } from "@/components/GlobalFeed";
import { NewsTicker } from "@/components/NewsTicker";
import { stories } from "@/lib/content";

export const metadata: Metadata = {
  title: "Today — the global skincare wire",
  description: "Verified skincare regulation, research, procedures, and safety updates from around the world.",
};

export default function TodayPage() {
  return (
    <main id="main-content">
      <NewsTicker />
      <header className="page-hero global-hero">
        <div>
          <span>Live desk / source-checked</span>
          <h1>Today, around the skin world.<sup>*</sup></h1>
        </div>
        <p>
          Regulation is not efficacy. A trial is not a trend. A recall is not a category verdict. Each dispatch names what happened,
          where, and how confident the evidence lets us be.
        </p>
      </header>
      <GlobalFeed stories={stories} />
    </main>
  );
}
