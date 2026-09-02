import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  async redirects() {
    // There is no dispatches index page; the wire lives at /today.
    return [{ source: "/dispatches", destination: "/today", permanent: true }];
  },
};

export default nextConfig;
