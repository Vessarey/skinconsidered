import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Skin Considered",
    short_name: "considered*",
    description: "Global skincare news, weighed before publication.",
    start_url: "/",
    display: "standalone",
    background_color: "#f5e9e8",
    theme_color: "#123c2d",
  };
}
