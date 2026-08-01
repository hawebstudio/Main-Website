import { SiteHeader } from "@/components/navigation/site-header";
import { SiteFooter } from "@/components/navigation/site-footer";
import { SpeedInsights } from "@vercel/speed-insights/next";

/**
 * Marketing layout — wraps all public-facing pages with the global
 * header, footer, and main content landmark. Route groups like
 * `/services`, `/work`, `/about`, etc. all inherit this shell.
 */
export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SiteHeader />
      <SpeedInsights />
      <main id="main-content" className="flex-1 pt-18">
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
