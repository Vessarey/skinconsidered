import type { Metadata, Viewport } from "next";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE, siteUrl } from "@/content/site";
import "@fontsource/archivo/400.css";
import "@fontsource/archivo/600.css";
import "@fontsource/archivo/700.css";
import "@fontsource/archivo-black/400.css";
import "@fontsource/space-mono/400.css";
import "@fontsource/space-mono/700.css";
import "./globals.css";

const base = siteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(base),
  title: {
    default: `${SITE_NAME} — ${SITE_TAGLINE}`,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: ["skincare news", "skin care research", "dermatology news", "cosmetic regulation", "skincare guides", "beauty history"],
  authors: [{ name: "Skin Considered editorial desk" }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: {
    types: { "application/rss+xml": "/rss.xml" },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: SITE_NAME,
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: "News, research, procedures, guides, and cultural history—with sources and limitations in view.",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: "Global skincare news, weighed before publication.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#182620",
  colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "NewsMediaOrganization",
        "@id": `${base}/#organization`,
        name: SITE_NAME,
        url: base,
        description: SITE_DESCRIPTION,
        ethicsPolicy: `${base}/methodology`,
        correctionsPolicy: `${base}/corrections`,
      },
      {
        "@type": "WebSite",
        "@id": `${base}/#website`,
        name: SITE_NAME,
        url: base,
        publisher: { "@id": `${base}/#organization` },
        potentialAction: {
          "@type": "SearchAction",
          target: { "@type": "EntryPoint", urlTemplate: `${base}/search?q={search_term_string}` },
          "query-input": "required name=search_term_string",
        },
      },
    ],
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
