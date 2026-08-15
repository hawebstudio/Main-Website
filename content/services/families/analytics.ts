import { Service } from "@/lib/content/types";

export const analyticsServices: Service[] = [
  {
    family: "analytics",
    slug: "analytics-tracking-setup",
    title: "Advanced Analytics & Tracking Setup",
    description: "Stop guessing what your website visitors are doing. We implement accurate analytics and event tracking using Google Tag Manager, GA4, and heatmapping tools, so you can see which marketing channels and pages are actually driving results.",
    seo: { 
      title: "Advanced Analytics & GA4 Tracking Setup Services | HA Web Studio", 
      description: "Get reliable marketing data. We configure Google Analytics 4, Tag Manager, server-side tracking, and conversion events to give you perfect visibility." 
    },
    audience: "Marketing teams, media buyers, and business owners who are flying blind because their current tracking is broken, duplicate, or inaccurate.",
    outcomes: [
      "Accurate, trustworthy traffic and conversion data instead of duplicate or broken tracking.",
      "Clear attribution showing exactly which marketing channels are driving revenue.",
      "Visual heatmaps (via Clarity or Hotjar) showing where users get stuck on your pages.",
      "A clean, organized Google Tag Manager container that won't slow down your site."
    ],
    scope: "Audit of current tracking, implementation of a clean Google Tag Manager architecture, configuration of GA4 properties, setup of specific conversion events (form fills, purchases), and integration of session recording tools.",
    complexity: "Medium",
    availability: "Live",
    core: [
      "Tracking Infrastructure Audit & Cleanup",
      "Google Tag Manager (GTM) Architecture Setup",
      "Google Analytics 4 (GA4) Configuration",
      "Custom Conversion Event Tracking (Forms, Clicks, Video Plays)",
      "Microsoft Clarity / Hotjar Implementation",
      "Cross-Domain Tracking Setup"
    ],
    addOns: [
      "Server-Side Tracking Configuration (Advanced)",
      "Facebook/Meta CAPI (Conversions API) Setup",
      "eCommerce Data Layer Implementation (Shopify/WooCommerce)",
      "Custom Looker Studio Reporting Dashboards"
    ],
    recommendations: ["conversion-rate-optimization", "google-business-maps-visibility", "third-party-api-integrations"],
    businessProblems: [
      "Your Google Analytics says you got 50 leads, but your CRM only shows 10.",
      "You are spending $10k/month on ads but have no idea which campaigns actually generate sales.",
      "Your website has 5 different Facebook Pixel snippets installed and data is completely messy.",
      "You migrated to GA4 but the default setup doesn't track your specific business KPIs."
    ],
    process: [
      { title: "Data Strategy", description: "We define exactly what constitutes a 'conversion' for your business (e.g., a booked call, a 30-second video view, a checkout)." },
      { title: "Infrastructure Cleanup", description: "We remove all hardcoded tracking scripts from your website's header and consolidate everything into Google Tag Manager." },
      { title: "Event Configuration", description: "We build custom triggers in GTM to fire tags precisely when a user completes a desired action, without relying on basic 'Thank You' page views." },
      { title: "QA & Debugging", description: "We use Tag Assistant to test every single event across multiple devices to ensure data is passing to GA4 correctly." },
      { title: "Dashboard Handoff", description: "We configure your GA4 dashboard to show you the metrics that actually matter to your bottom line." }
    ],
    useCases: [
      { title: "B2B Lead Attribution", description: "Setting up tracking to identify which specific LinkedIn Ad campaign resulted in a high-value enterprise form submission." },
      { title: "eCommerce Funnel Tracking", description: "Implementing a full Data Layer on WooCommerce to track drop-off between 'Add to Cart', 'Initiate Checkout', and 'Purchase' at each step." },
      { title: "UX Friction Heatmapping", description: "Deploying Microsoft Clarity on a SaaS landing page to surface exactly where mobile users were rage-clicking on elements that weren't actually clickable." }
    ],
    exclusions: [
      "We do not manage your actual ad spend or campaigns (we provide the tracking infrastructure).",
      "We cannot guarantee 100% accuracy due to iOS tracking prevention (ITP) and ad blockers, though server-side tracking mitigates this."
    ],
    recommendedTechnologies: ["Google Analytics 4", "Google Tag Manager", "Microsoft Clarity", "Looker Studio"],
    pricing: "Pricing depends on how many conversion events need to be tracked, whether existing tracking needs to be audited and cleaned up first, and how many tools (GA4, GTM, ad platforms) are involved.",
    timeline: "A typical tracking setup takes 1–2 weeks, including audit, configuration, and validation.",
    faqs: [
      { question: "Our current tracking feels broken or inconsistent — can you fix it?", answer: "Yes — a tracking infrastructure audit and cleanup is the first step in this service, before we configure anything new." },
      { question: "Will this tell us which marketing channels actually work?", answer: "That's the goal — accurate conversion event tracking across forms, clicks, and key actions is what makes channel performance measurable." }
    ],
    cta: { label: "Fix My Tracking", href: "/contact?intent=analytics" }
  }
];
