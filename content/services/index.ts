import type { Service, ServiceFamily } from "@/lib/content/types";

export const serviceFamilies: ServiceFamily[] = [
  {
    slug: "websites",
    title: "Websites",
    description: "Professional websites and landing pages built to strengthen positioning and lead generation.",
    overview: "For businesses launching a new presence, modernizing an outdated site, or creating focused conversion pages.",
    services: [
      "Website Planning & Strategy",
      "Business Website Development",
      "Website Redesign",
      "Landing Page Development",
      "Website Launch & Infrastructure Setup",
      "CMS & Dynamic Content Development"
    ],
    whatYouGet: [
      "A professionally designed business website",
      "Modern, responsive design for all devices",
      "Fast loading and optimized performance",
      "SEO-ready website architecture",
      "Future-ready scalable architecture"
    ],
    problems: [
      "Outdated website",
      "Poor conversions",
      "Weak credibility",
      "Hard-to-manage content"
    ],
    cta: { label: "Start a Website Project", href: "/contact?intent=start-project" },
  },
  {
    slug: "design",
    title: "Design",
    description: "UI/UX design services focused on user experience, clarity, and conversion.",
    overview: "For teams needing high-quality design work before development begins.",
    services: [
      "Website UI/UX Design"
    ],
    whatYouGet: [
      "Strategic wireframing",
      "Interactive prototypes",
      "Conversion-focused UX",
      "Developer-ready handoff"
    ],
    problems: [
      "Poor user experience",
      "Low visual credibility",
      "Inconsistent brand application"
    ],
    cta: { label: "Discuss Design", href: "/contact?intent=design" },
  },
  {
    slug: "ecommerce",
    title: "eCommerce",
    description: "Online store services focused on conversion, checkout quality, and scalable growth.",
    overview: "For teams launching or improving online stores across multiple platforms.",
    services: [
      "eCommerce Development",
      "Shopify Development",
      "WooCommerce Development",
      "Ecommerce-Specific Services"
    ],
    whatYouGet: [
      "Complete online store setup",
      "Secure checkout experience",
      "Payment gateway integration",
      "Scalable ecommerce architecture"
    ],
    problems: [
      "Cart abandonment",
      "Slow mobile checkout",
      "Platform limitations"
    ],
    cta: { label: "Grow My Ecommerce Store", href: "/contact?intent=ecommerce" },
  },
  {
    slug: "growth",
    title: "Growth",
    description: "Customer acquisition and conversion services to increase business value.",
    overview: "For businesses aiming to capture leads and acquire more customers.",
    services: [
      "Customer Acquisition",
      "Lead Capture & Communication Setup",
      "Conversion Rate Optimization",
      "Google Business & Maps Visibility",
      "Local SEO Foundations"
    ],
    whatYouGet: [
      "Lead generation systems",
      "Higher conversion opportunities",
      "Local search optimization",
      "Better local discoverability"
    ],
    problems: [
      "Low lead volume",
      "Poor conversions",
      "Weak local presence"
    ],
    cta: { label: "Accelerate Growth", href: "/contact?intent=growth" },
  },
  {
    slug: "seo-search",
    title: "SEO & Search",
    description: "Search-focused services for discoverability across search engines and AI systems.",
    overview: "For businesses that need stronger crawlability, indexing, schema, and long-term organic discoverability.",
    services: [
      "Technical SEO Setup",
      "Search Visibility Setup",
      "Structured Data & Schema Setup",
      "AI Search Visibility & Answer Engine Optimization"
    ],
    whatYouGet: [
      "Proper indexing setup",
      "AI search readiness",
      "Better crawlability",
      "Long-term organic growth foundation"
    ],
    problems: [
      "No search visibility",
      "Poor crawlability",
      "No schema strategy"
    ],
    cta: { label: "Discuss SEO", href: "/contact?intent=seo" },
  },
  {
    slug: "business-systems",
    title: "Business Systems",
    description: "Booking, communication, and operational systems integrated into your website.",
    overview: "For service businesses needing automated bookings or WhatsApp communication.",
    services: [
      "Booking & Appointment Systems",
      "WhatsApp Business Systems"
    ],
    whatYouGet: [
      "Calendar integration",
      "Automated reminders",
      "WhatsApp ordering/chats",
      "Streamlined operations"
    ],
    problems: [
      "Manual bookings",
      "Missed leads",
      "Fragmented communication"
    ],
    cta: { label: "Streamline Operations", href: "/contact?intent=business-systems" },
  },
  {
    slug: "integrations",
    title: "Integrations",
    description: "Connecting websites and apps to external business systems and APIs.",
    overview: "For teams that need data or workflow integration across platforms.",
    services: [
      "Third-Party & API Integrations"
    ],
    whatYouGet: [
      "CRM connectivity",
      "Payment gateways",
      "Custom API integration",
      "Workflow automation"
    ],
    problems: [
      "Siloed tools",
      "Manual data transfer"
    ],
    cta: { label: "Request Integration", href: "/contact?intent=integrations" },
  },
  {
    slug: "analytics",
    title: "Analytics",
    description: "Measurement and tracking services for clearer insights and better decisions.",
    overview: "For teams that need dependable conversion data and performance visibility.",
    services: [
      "Analytics & Tracking Setup"
    ],
    whatYouGet: [
      "Website traffic tracking",
      "Conversion tracking",
      "Event tracking setup",
      "Data-driven decision support"
    ],
    problems: [
      "No reliable data",
      "Unclear conversion attribution"
    ],
    cta: { label: "Set Up Better Tracking", href: "/contact?intent=analytics" },
  },
  {
    slug: "performance-security",
    title: "Performance & Security",
    description: "Optimization and protection services that improve speed, experience, and safety.",
    overview: "For existing websites needing measurable improvements and robust protection.",
    services: [
      "Website Performance Optimization",
      "Website Security & Protection",
      "Website Audit & Technical Fixes"
    ],
    whatYouGet: [
      "Faster page load times",
      "Security hardening",
      "Performance bottleneck analysis",
      "Technical issue resolution"
    ],
    problems: [
      "Slow loading",
      "Security vulnerabilities",
      "Unclear technical debt"
    ],
    cta: { label: "Improve & Protect", href: "/contact?intent=performance-security" },
  },
  {
    slug: "development",
    title: "Development",
    description: "Custom frontend and web application engineering.",
    overview: "For teams that need advanced interactions, bespoke product behavior, or complex UI delivery.",
    services: [
      "Frontend Development",
      "Custom Web Application Development"
    ],
    whatYouGet: [
      "Custom business functionality",
      "Interactive web applications",
      "Modern user interfaces",
      "Scalable application architecture"
    ],
    problems: [
      "Manual workflows",
      "Missing custom functionality",
      "Inconsistent UI quality"
    ],
    cta: { label: "Request Technical Consultation", href: "/contact?intent=development" },
  },
  {
    slug: "maintenance",
    title: "Maintenance",
    description: "Ongoing technical support to keep websites healthy and secure.",
    overview: "For businesses that need reliable technical care over the long term.",
    services: [
      "Website Maintenance & Support"
    ],
    whatYouGet: [
      "Regular website maintenance",
      "Security updates",
      "Website health monitoring",
      "Long-term technical support"
    ],
    problems: [
      "Maintenance gaps",
      "Recurring technical issues"
    ],
    cta: { label: "Request Website Support", href: "/contact?intent=maintenance" },
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
