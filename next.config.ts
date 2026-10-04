import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  async redirects() {
    return [
      // Search Console has observed both hosts. Force one canonical origin so
      // ranking signals and audience measurement are not split across them.
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.skinconsidered.com" }],
        destination: "https://skinconsidered.com/:path*",
        permanent: true,
      },
      // There is no dispatches index page; the wire lives at /today.
      { source: "/dispatches", destination: "/today", permanent: true },
    ];
  },
};

export default nextConfig;
