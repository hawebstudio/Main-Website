import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
import { siteConfig } from "@/config/site";
import { MonitoringBootstrap } from "@/components/monitoring/monitoring-bootstrap";
import { RouteTransitionCursor } from "@/components/navigation/route-transition-cursor";
import { FloatingWhatsAppButton } from "@/components/primitives/floating-whatsapp-button";
import { localBusinessJsonLd, organizationJsonLd, websiteJsonLd } from "@/lib/seo/json-ld";
import { dynamicOgImageUrl } from "@/lib/seo/images";
import { AnalyticsProvider } from "@/components/analytics/analytics-provider";
import { CookieConsentBanner } from "@/components/consent/cookie-consent-banner";
import { JsonLd } from "@/components/seo/json-ld";
import "./globals.css";

const homepageOgImage = dynamicOgImageUrl({
  title: siteConfig.name,
  description: siteConfig.description,
});

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  generator: "v0.app",
  category: "technology",
  alternates: {
    canonical: siteConfig.url,
    // Single-locale site today — self-referencing hreflang avoids ambiguity
    // for crawlers and is ready to extend if more locales are added later.
    languages: {
      "en-US": siteConfig.url,
      "x-default": siteConfig.url,
    },
    types: {
      "application/rss+xml": `${siteConfig.url}/rss.xml`,
      "application/atom+xml": `${siteConfig.url}/atom.xml`,
    },
  },
  formatDetection: {
    telephone: false,
    address: false,
    email: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [{ url: homepageOgImage, width: 1200, height: 630, alt: siteConfig.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    creator: siteConfig.twitter,
    images: [homepageOgImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/icon-light-32x32.png", media: "(prefers-color-scheme: light)" },
      { url: "/icon-dark-32x32.png", media: "(prefers-color-scheme: dark)" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.png",
  },
};

export const viewport: Viewport = {
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f7f8" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0c" },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const nonce = (await headers()).get("x-nonce") ?? undefined;

  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} bg-background`}
      suppressHydrationWarning
    >
      <body className="min-h-dvh font-sans antialiased">
        <JsonLd data={[organizationJsonLd(), websiteJsonLd(), localBusinessJsonLd()]} />
        <a
          href="#main-content"
          className="sr-only rounded-md bg-primary px-4 py-2 text-primary-foreground focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-100"
        >
          Skip to content
        </a>
        {children}
        <RouteTransitionCursor />
        <MonitoringBootstrap />
        <AnalyticsProvider
          gaId={siteConfig.analytics.gaId}
          gtmId={siteConfig.analytics.gtmId}
          clarityId={siteConfig.analytics.clarityId}
          nonce={nonce}
        />
        <CookieConsentBanner />
        <FloatingWhatsAppButton />
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
