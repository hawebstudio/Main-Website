import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
import dynamic from "next/dynamic";
import { siteConfig } from "@/config/site";
import { FloatingWhatsAppButton } from "@/components/primitives/floating-whatsapp-button";
import { localBusinessJsonLd, organizationJsonLd, websiteJsonLd } from "@/lib/seo/json-ld";
import { dynamicOgImageUrl } from "@/lib/seo/images";
import { AnalyticsProvider } from "@/components/analytics/analytics-provider";
import { JsonLd } from "@/components/seo/json-ld";
import { getActivePromotion } from "@/lib/content/source";
import "./globals.css";

// None of these render anything for the first paint (web-vitals/error
// reporting bootstrap, a banner gated on "have we already seen a consent
// choice?", and a popup that only appears after a multi-second delay), so
// they're loaded as separate chunks after hydration instead of being part
// of the JS every route has to parse up front. They stay client-only
// (`ssr: false`) since they already render nothing on the server (mount
// checks / localStorage reads gate everything).
const MonitoringBootstrap = dynamic(
  () => import("@/components/monitoring/monitoring-bootstrap").then((m) => m.MonitoringBootstrap),
  { ssr: false },
);
const CookieConsentBanner = dynamic(
  () => import("@/components/consent/cookie-consent-banner").then((m) => m.CookieConsentBanner),
  { ssr: false },
);
const PromotionPopup = dynamic(
  () => import("@/components/promotions/promotion-popup").then((m) => m.PromotionPopup),
  { ssr: false },
);

const homepageOgImage = dynamicOgImageUrl({
  title: siteConfig.name,
  description: siteConfig.description,
});

// Nonce-based CSP requires a fresh per-request render: the nonce read from
// `headers()` below only exists on the incoming request, so any route that
// gets statically generated (build time, no request) bakes in no nonce at
// all — and every inline <script> this layout renders (JsonLd, consent
// mode, GTM, GA4, Next's own hydration payload script) then permanently
// fails CSP for that route, since the CSP header itself is regenerated
// fresh on every request but the HTML serving it isn't.
// `headers()` is supposed to implicitly force dynamic rendering, but that
// opt-in can silently fail to propagate (e.g. static optimization passes,
// route-level `dynamic` exports elsewhere, caching layers). Setting this
// explicitly removes the ambiguity.
export const dynamic = "force-dynamic";

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
  verification: {
  other: {
    "norton-safeweb-site-verification": process.env.NORTON_SITE_VERIFICATION ?? "",
  },
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
  // Reads content/promotion/ — null when that folder has no currently
  // active promotion, in which case the popup below renders nothing.
  const promotion = await getActivePromotion();

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
        <MonitoringBootstrap />
        <AnalyticsProvider
          gaId={siteConfig.analytics.gaId}
          gtmId={siteConfig.analytics.gtmId}
          clarityId={siteConfig.analytics.clarityId}
          nonce={nonce}
        />
        <CookieConsentBanner />
        <PromotionPopup promotion={promotion} />
        <FloatingWhatsAppButton />
        {process.env.NODE_ENV === "production" && <Analytics />}
        {process.env.NODE_ENV === "production" && <SpeedInsights />}
      </body>
    </html>
  );
}
