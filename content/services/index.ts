import type { Service, ServiceFamily } from "@/lib/content/types";


export const serviceFamilies: ServiceFamily[] = [
  {
    slug: "website-development",
    title: "Website Development",
    description: "Modern corporate flagships, marketing websites, and dynamic headless CMS platforms engineered for speed, reliability, and clean editorial workflows.",
    overview: "For businesses starting fresh or rebuilding an outdated site with modern web architecture.",
    services: [
      "Business Website Development",
      "Website Redesign & Modernization",
      "High-Conversion Landing Pages",
      "Website UI/UX Design",
      "Headless CMS & Dynamic Content",
      "Website Planning & Strategy",
      "Website Launch & Infrastructure Setup"
    ],
    whatYouGet: [
      "Custom Next.js architecture",
      "Fast, accessible, and responsive user experience",
      "Structured SEO and metadata foundation",
      "Maintainable, headless CMS workflows"
    ],
    problems: [
      "Slow, outdated, or hard-to-maintain website",
      "Poor mobile performance and user experience",
      "Marketing teams blocked by engineering dependencies"
    ],
    cta: { label: "Build a Better Website", href: "/contact?intent=website-development" },
  },
  {
    slug: "ecommerce",
    title: "eCommerce Development",
    description: "Online store architectures, custom storefronts, and checkout engineering focused on reliability, performance, and frictionless buying experiences.",
    overview: "For growing brands and high-volume merchants seeking performant, reliable eCommerce platforms.",
    services: [
      "Custom eCommerce Development",
      "Shopify Store Development",
      "WooCommerce Development",
      "eCommerce Store Optimization & Features"
    ],
    whatYouGet: [
      "Fast, resilient product and collection pages",
      "Secure payment gateway and checkout integrations",
      "Optimized cart and inventory workflows",
      "Custom storefront architecture and third-party app connections"
    ],
    problems: [
      "Checkout and mobile cart drop-offs",
      "Slow store load times under high catalog volume",
      "Template bloat and platform limitations"
    ],
    cta: { label: "Grow My Online Store", href: "/contact?intent=ecommerce" },
  },
  {
    slug: "search-discoverability",
    title: "Search & Discoverability",
    description: "Technical SEO, structured data, local maps optimization, and AI Answer Engine Optimization (AEO) to ensure your business is accurately crawled, indexed, and cited.",
    seo: {
      title: "Search & Discoverability Services | Technical SEO & AEO",
      description: "Technical SEO audits, structured JSON-LD schema, local search visibility, and AI answer engine readiness to build long-term organic search equity.",
    },
    overview: "For businesses that need stronger crawlability, structured data, local map rankings, and visibility across search engines and AI answer engines.",
    services: [
      "Technical SEO Optimization",
      "Search Visibility Strategy",
      "Structured Data & Schema Setup",
      "AI Search Visibility (AEO)",
      "Local SEO Foundations",
      "Local Maps & Profile Optimization"
    ],
    whatYouGet: [
      "Comprehensive technical crawlability and indexing fixes",
      "Rich snippet readiness via JSON-LD schema markup",
      "Local map presence and verified business citations",
      "Factual citation readiness for AI answer engines"
    ],
    problems: [
      "Zero search engine indexing or visibility",
      "Competitors outranking on local search and maps",
      "Lack of structured schema and AI search citations"
    ],
    cta: { label: "Strengthen Discoverability", href: "/contact?intent=seo" },
  },
  {
    slug: "automation-integrations",
    title: "Automation & Integrations",
    description: "Connecting websites, CRMs, booking software, messaging channels, and APIs to automate operations and eliminate manual data entry.",
    overview: "For service businesses and teams needing reliable automated workflows, lead capture, and third-party data synchronization.",
    services: [
      "Third-Party & API Integrations",
      "Automated Booking & Appointment Systems",
      "WhatsApp Business API & Automation",
      "Lead Capture & Automation",
      "Inbound Acquisition & Growth Systems",
      "Advanced Analytics & Tracking Setup"
    ],
    whatYouGet: [
      "Custom API endpoints and webhook automation",
      "Real-time calendar booking and payment processing",
      "Instant multi-channel lead routing (Slack, CRM, Email)",
      "Conversational WhatsApp Business integration"
    ],
    problems: [
      "Siloed tools and hours wasted on manual data entry",
      "Missed sales leads due to slow response times",
      "Disconnected scheduling and payment workflows"
    ],
    cta: { label: "Streamline Operations", href: "/contact?intent=business-systems" },
  },
  {
    slug: "custom-web-applications",
    title: "Custom Web Applications",
    description: "Purpose-built web applications, customer portals, internal tooling, and modern frontend interfaces built with React, Next.js, and robust relational backends.",
    overview: "For founders, product teams, and businesses outgrowing spreadsheets or generic SaaS tools.",
    services: [
      "Custom Web Application Development",
      "Advanced Frontend Engineering"
    ],
    whatYouGet: [
      "Tailored full-stack application architecture",
      "Secure user authentication and relational database modeling",
      "Accessible, high-performance UI engineering",
      "Scalable cloud deployment on Vercel and AWS"
    ],
    problems: [
      "Clunky off-the-shelf software that doesn't fit your workflow",
      "Manual spreadsheets causing operational bottlenecks",
      "Slow, fragile legacy web applications"
    ],
    cta: { label: "Build a Custom Application", href: "/contact?intent=development" },
  },
  {
    slug: "website-optimization-care",
    title: "Website Optimization & Care",
    description: "Sub-second speed optimization, enterprise security, technical rescue audits, ongoing retainer support, and platform migrations.",
    overview: "For established websites that need continuous technical care, sub-second load times, and hardened digital security.",
    services: [
      "Website Performance & Speed Optimization",
      "Enterprise Security & Protection",
      "Technical Audit & Rescue",
      "Premium Maintenance & Ongoing Support",
      "Website Migration & Replatforming",
      "Conversion Rate Optimization (CRO)"
    ],
    whatYouGet: [
      "Sub-second load times and passing Core Web Vitals (LCP, INP, CLS)",
      "Continuous software updates, automated backups, and uptime monitoring",
      "Enterprise security hardening, Cloudflare WAF, and spam protection",
      "Zero-downtime platform and domain migrations"
    ],
    problems: [
      "Slow page speeds driving visitors away",
      "Maintenance gaps and fear of updates breaking the site",
      "Security vulnerabilities and bot spam attacks"
    ],
    cta: { label: "Protect & Optimize My Site", href: "/contact?intent=maintenance" },
  }
];

import { websitesServices } from "./families/websites";
import { designServices } from "./families/design";
import { ecommerceServices } from "./families/ecommerce";
import { growthServices } from "./families/growth";
import { seoSearchServices } from "./families/seo-search";
import { businessSystemsServices } from "./families/business-systems";
import { integrationsServices } from "./families/integrations";
import { analyticsServices } from "./families/analytics";
import { performanceSecurityServices } from "./families/performance-security";
import { developmentServices } from "./families/development";
import { maintenanceServices } from "./families/maintenance";

export const services: Service[] = [
  ...websitesServices,
  ...designServices,
  ...ecommerceServices,
  ...growthServices,
  ...seoSearchServices,
  ...businessSystemsServices,
  ...integrationsServices,
  ...analyticsServices,
  ...performanceSecurityServices,
  ...developmentServices,
  ...maintenanceServices,
];

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}

export function getFamilyBySlug(slug: string) {
  return serviceFamilies.find((family) => family.slug === slug);
}

export function getServicesByFamily(slug: string) {
  return services.filter((service) => service.family === slug);
}

export function getAllServiceSlugs() {
  return services.map((service) => service.slug);
}

export function getAllFamilySlugs() {
  return serviceFamilies.map((family) => family.slug);
}
