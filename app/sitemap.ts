import type { MetadataRoute } from "next";
import { cultureStories, guides, stories } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const staticRoutes = ["", "/today", "/guides", "/ingredients", "/procedures", "/culture", "/about", "/methodology", "/corrections", "/privacy"];
  return [
    ...staticRoutes.map((route) => ({ url: `${base}${route}`, lastModified: new Date("2026-09-01") })),
    ...stories.map((story) => ({ url: `${base}/dispatches/${story.slug}`, lastModified: new Date(story.date) })),
    ...guides.map((guide) => ({ url: `${base}/guides/${guide.slug}`, lastModified: new Date("2026-09-01") })),
    ...cultureStories.map((story) => ({ url: `${base}/culture/${story.slug}`, lastModified: new Date("2026-09-01") })),
  ];
}
