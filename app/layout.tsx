import type { Metadata } from "next";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import "@fontsource/archivo/400.css";
import "@fontsource/archivo/600.css";
import "@fontsource/archivo/700.css";
import "@fontsource/archivo-black/400.css";
import "@fontsource/space-mono/400.css";
import "@fontsource/space-mono/700.css";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Skin Considered — Global skincare news, weighed",
    template: "%s — Skin Considered",
  },
  description:
    "Independent global skincare reporting, evidence-graded research, procedure updates, practical guides, and cultural beauty history.",
  applicationName: "Skin Considered",
  keywords: [
    "skincare news",
    "skin care research",
    "dermatology news",
    "cosmetic regulation",
    "skincare guides",
    "beauty history",
  ],
  authors: [{ name: "Skin Considered editorial desk" }],
  creator: "Skin Considered",
  publisher: "Skin Considered",
  alternates: {
    canonical: "/",
    types: { "application/rss+xml": "/rss.xml" },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Skin Considered",
    title: "Skin Considered — Global skincare news, weighed",
    description: "News, research, procedures, guides, and cultural history—with sources and limitations in view.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Skin Considered",
    description: "Global skincare news, weighed before publication.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "NewsMediaOrganization",
    name: "Skin Considered",
    url: siteUrl,
    description: metadata.description,
    ethicsPolicy: `${siteUrl}/methodology`,
    correctionsPolicy: `${siteUrl}/corrections`,
  };

  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </body>
    </html>
  );
}
