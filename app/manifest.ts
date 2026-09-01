import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Skin Considered",
    short_name: "considered*",
    description: "Global skincare news, weighed before publication.",
    start_url: "/",
    display: "standalone",
    // Exact design tokens: --paper and --ink in globals.css
    background_color: "#f6eeea",
    theme_color: "#182620",
  };
}
