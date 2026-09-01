import Link from "next/link";
import { stories } from "@/lib/content";

export function NewsTicker() {
  const items = stories.slice(0, 5);

  return (
    <div className="ticker" aria-label="Latest headlines">
      <span className="ticker-label">Latest</span>
      <div className="ticker-window">
        <div className="ticker-track">
          {[...items, ...items].map((story, index) => (
            <Link href={`/dispatches/${story.slug}`} key={`${story.slug}-${index}`} aria-hidden={index >= items.length}>
              {story.shortHeadline} <b aria-hidden="true">*</b>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
