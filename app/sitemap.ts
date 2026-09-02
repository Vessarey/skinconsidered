import type { MetadataRoute } from "next";
import { cultureStories, EDITION, guides, ingredients, lastUpdated, procedureProfiles, siteUrl, stories, trends } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  const edition = new Date(EDITION.date);
  const sections = ["/today", "/us", "/guides", "/ingredients", "/procedures", "/trends", "/culture"];
  const policies = ["/about", "/methodology", "/coverage", "/corrections", "/privacy"];

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
    ...procedureProfiles.map((profile) => ({
      url: `${base}/procedures/${profile.slug}`,
      lastModified: new Date(lastUpdated(profile)),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...ingredients.map((ingredient) => ({
      url: `${base}/ingredients/${ingredient.slug}`,
      lastModified: new Date(lastUpdated(ingredient)),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...trends.map((trend) => ({
      url: `${base}/trends/${trend.slug}`,
      lastModified: new Date(lastUpdated(trend)),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...policies.map((route) => ({ url: `${base}${route}`, lastModified: edition, changeFrequency: "yearly" as const, priority: 0.3 })),
  ];
}
