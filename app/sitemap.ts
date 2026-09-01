import type { MetadataRoute } from "next";
import { cultureStories, EDITION, guides, lastUpdated, siteUrl, stories } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  const edition = new Date(EDITION.date);
  const sections = ["/today", "/guides", "/ingredients", "/procedures", "/culture"];
  const policies = ["/about", "/methodology", "/corrections", "/privacy"];

  return [
    { url: base, lastModified: edition, changeFrequency: "daily", priority: 1 },
    ...sections.map((route) => ({ url: `${base}${route}`, lastModified: edition, changeFrequency: "weekly" as const, priority: 0.8 })),
    ...stories.map((story) => ({
      url: `${base}/dispatches/${story.slug}`,
      lastModified: new Date(lastUpdated(story)),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...guides.map((guide) => ({
      url: `${base}/guides/${guide.slug}`,
      lastModified: new Date(lastUpdated(guide)),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...cultureStories.map((story) => ({
      url: `${base}/culture/${story.slug}`,
      lastModified: new Date(lastUpdated(story)),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
    ...policies.map((route) => ({ url: `${base}${route}`, lastModified: edition, changeFrequency: "yearly" as const, priority: 0.3 })),
  ];
}
