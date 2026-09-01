import Link from "next/link";
import { Story } from "@/lib/content";
import { EvidenceBadge } from "./EvidenceBadge";
import { SignalVisual } from "./SignalVisual";

export function StoryCard({ story, featured = false }: { story: Story; featured?: boolean }) {
  return (
    <article className={`story-card ${featured ? "featured" : ""}`}>
      {featured && <SignalVisual color={story.color} label={`Abstract editorial artwork for ${story.headline}`} />}
      <div className="story-card-copy">
        <div className="card-meta">
          <span>{story.category}</span>
          <EvidenceBadge grade={story.grade} compact />
          <span>{story.location}</span>
        </div>
        <h3>
          <Link href={`/dispatches/${story.slug}`}>{story.headline}</Link>
        </h3>
        <p>{story.dek}</p>
        <div className="card-footer">
          <span>{story.dateLabel}</span>
          <span>{story.readTime}</span>
          <Link aria-label={`Read ${story.headline}`} href={`/dispatches/${story.slug}`}>
            Read <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
