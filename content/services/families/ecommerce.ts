import { Service } from "@/lib/content/types";

export const ecommerceServices: Service[] = [
  {
    family: "ecommerce",
    slug: "ecommerce-development",
    title: "Custom eCommerce Development",
    description: "For businesses that have outgrown template platforms, we build custom eCommerce platforms with the frontend decoupled from the backend (headless commerce) — built to handle large catalogs, high-traffic sales events, and fast page loads without the constraints of a standard theme.",
    seo: { 
      title: "Custom eCommerce Development Services | Headless & Scalable", 
      description: "Custom, headless eCommerce development built for large catalogs, high-traffic sales events, and fast page loads beyond what template platforms support." 
    },
    audience: "Established DTC brands, enterprise retailers, and B2B distributors who have outgrown standard Shopify/WooCommerce templates and need more speed and flexibility.",
    outcomes: [
      "Faster page loads, which typically reduces cart abandonment.",
      "A fully custom frontend design tailored to your brand rather than a modified theme.",
      "Backend architecture built to handle high-traffic sales events.",
      "Omnichannel readiness (sell across web, mobile app, and POS)."
    ],
    scope: "End-to-end architecture and development of a custom or headless eCommerce platform. Includes frontend build (Next.js), backend integration (Shopify Plus API, Stripe, Sanity), and production launch.",
    complexity: "Advanced",
    availability: "Live",
    core: [
      "Headless Frontend Architecture (Next.js)",
      "Custom Shopping Cart & Checkout Flow",
      "Dynamic Product Catalog Architecture",
      "Secure Payment Gateway Integration",
      "High-Performance Edge Caching",
      "ERP / PIM Synchronization Setup"
    ],
    addOns: [
      "Algolia Advanced Search Integration",
      "Complex Product Configurators (3D/AR)",
      "Multi-Currency & Internationalization",
      "Automated Product Migration from Legacy Systems"
    ],
    recommendations: ["ecommerce-specific-services", "conversion-rate-optimization", "analytics-tracking-setup"],
    businessProblems: [
      "Current eCommerce platform is too slow, causing high bounce rates on mobile.",
      "Unable to implement a unique, brand-specific design due to platform template restrictions.",
      "Struggling to manage complex product variants or B2B pricing tiers.",
      "High cart abandonment rates due to clunky, multi-step checkout processes."
    ],
    process: [
      { title: "Architecture & Data Modeling", description: "We map out your product catalog, pricing structures, and required third-party integrations to design a scalable data architecture." },
      { title: "Frontend Engineering", description: "We build a lightning-fast, custom React/Next.js frontend focused purely on user experience and conversion optimization." },
      { title: "Backend API Integration", description: "We connect the frontend to your chosen backend engine (e.g., Shopify Storefront API) and configure secure payment processing." },
      { title: "Load Testing & QA", description: "We rigorously test the platform under simulated heavy traffic to ensure it won't buckle during your biggest sales events." },
      { title: "Launch & Monitoring", description: "We execute a zero-downtime deployment and immediately monitor real-time analytics and server health." }
    ],
    useCases: [
      { title: "DTC Brand Scaling Up", description: "Moving a rapidly growing direct-to-consumer brand from a slow, app-heavy Shopify theme to a headless Next.js storefront." },
      { title: "B2B Wholesale Portal", description: "Creating a custom catalog with dynamic, account-based pricing and complex ordering logic that off-the-shelf platforms can't handle." },
      { title: "Multi-Brand Aggregator", description: "Building a single, unified shopping experience that pulls inventory and data from multiple disparate backend systems." }
    ],
    exclusions: [
      "Setting up basic dropshipping stores.",
      "Businesses without existing product validation or sales history.",
      "Quick-turnaround, low-budget template setups (see our standard Shopify service instead)."
    ],
    recommendedTechnologies: ["Next.js", "Sanity", "Shopify API", "Stripe"],
    pricing: "Custom headless ecommerce builds are priced based on catalog size and complexity, checkout/payment requirements, and any custom integrations (ERP, inventory, subscriptions). Because scope varies significantly, we provide a fixed quote after a short discovery call.",
    timeline: "Custom ecommerce builds typically take 8–14 weeks given the added complexity of catalog architecture, checkout flow, and payment integration testing.",
    faqs: [
      { question: "Why choose custom/headless over Shopify or WooCommerce?", answer: "Headless makes sense when you need performance, custom checkout flows, or integrations that off-the-shelf platforms can't accommodate. For most stores, our Shopify or WooCommerce services are faster and more cost-effective — we'll tell you honestly which fits." },
      { question: "Can you migrate our existing product catalog?", answer: "Yes, catalog and order-history migration is something we scope as part of the project." }
    ],
    cta: { label: "Discuss Custom eCommerce", href: "/contact?intent=ecommerce" }
  },
  {
    family: "ecommerce",
    slug: "shopify-development",
    title: "Shopify Store Development",
    description: "We build, configure, and customize Shopify stores — theme customization, app setup, payments, and catalog migration — so you can launch on a managed platform without handling the technical setup yourself.",
    seo: { 
      title: "Shopify Store Development & Setup Services | HA Web Studio", 
      description: "Shopify store development — theme customization, app configuration, payments, and catalog setup, built to scale your business." 
    },
    audience: "Retail brands, creators, and startups looking for a managed eCommerce platform that's easy to operate day-to-day.",
    outcomes: [
      "A fully functional, brand-aligned Shopify store ready for real-world transactions.",
      "Secure payment processing via Shopify Payments or third-party gateways.",
      "Your team able to manage inventory and fulfill orders without developer help.",
      "A technical foundation set up for SEO and mobile shopping."
    ],
    scope: "Complete Shopify store setup, premium theme customization (Liquid), essential app configuration, product catalog import, and pre-launch QA.",
    complexity: "Medium",
    availability: "Live",
    core: [
      "Shopify Environment & Domain Setup",
      "Premium Theme Selection & Customization",
      "Payment & Shipping Zone Configuration",
      "Initial Product Catalog Upload",
      "Essential App Integration (Reviews, Email)",
      "Pre-launch Testing & Training"
    ],
    addOns: [
      "Custom Liquid Component Development",
      "Migration from WooCommerce/Squarespace",
      "Subscription Billing Setup (Recharge/Skio)",
      "Klaviyo Email Marketing Integration"
    ],
    recommendations: ["ecommerce-specific-services", "analytics-tracking-setup", "seo-search-visibility"],
    businessProblems: [
      "Need to launch an online store quickly without worrying about servers or security.",
      "Current store looks cheap and damages brand credibility.",
      "Struggling to integrate necessary marketing or fulfillment apps.",
      "Inability to manage products or update the homepage without hiring a developer."
    ],
    process: [
      { title: "Strategy & Theme Selection", description: "We analyze your brand guidelines and product catalog to select and recommend the optimal Shopify theme architecture." },
      { title: "Customization & Build", description: "We customize the theme using Liquid and CSS to match your exact brand identity and configure the necessary page templates." },
      { title: "Configuration & Integration", description: "We set up your payment gateways, shipping rules, tax settings, and install carefully vetted third-party apps." },
      { title: "Data Migration", description: "We import your products, collections, and customer data (if migrating from another platform)." },
      { title: "Handoff & Launch", description: "We provide comprehensive training on the Shopify admin dashboard and handle the final domain switch to go live." }
    ],
    useCases: [
      { title: "New Brand Launch", description: "Setting up a clean, conversion-focused digital storefront for a newly funded consumer product brand." },
      { title: "Platform Migration", description: "Moving a frustrated merchant from a clunky WooCommerce setup to the streamlined Shopify ecosystem." },
      { title: "Merch Store for Creators", description: "Building an automated, dropship-integrated store for a high-profile influencer or podcast." }
    ],
    exclusions: [
      "Developing completely custom, private Shopify Apps from scratch.",
      "Managing your daily product inventory or customer service.",
      "Headless Shopify builds (see Custom eCommerce Development)."
    ],
    recommendedTechnologies: ["Shopify", "Liquid", "Klaviyo"],
    pricing: "Shopify builds are priced based on whether we're customizing a premium theme or building fully custom sections, how many products need to be set up, and which apps/integrations are required. This is generally more cost-effective than a fully custom build.",
    timeline: "Shopify store setup typically takes 3–6 weeks depending on theme customization depth and catalog size.",
    faqs: [
      { question: "Do you set up payments and shipping too?", answer: "Yes — payment and shipping zone configuration is part of the standard scope." },
      { question: "Can you help upload our product catalog?", answer: "Yes, initial product catalog upload is included; ongoing catalog management can be arranged separately if needed." }
    ],
    cta: { label: "Build on Shopify", href: "/contact?intent=ecommerce" }
  },
  {
    family: "ecommerce",
    slug: "woocommerce-development",
    title: "WooCommerce Development",
    description: "We build custom WooCommerce stores on WordPress for businesses that need deep platform control, specific plugin integrations, and content and commerce living on the same site.",
    seo: { 
      title: "WooCommerce Development Services | Custom WordPress Stores", 
      description: "WooCommerce development on WordPress — flexible, content-rich eCommerce stores tailored to your business logic and catalog." 
    },
    audience: "Businesses that already rely heavily on WordPress, or those requiring specific, customized eCommerce logic that hosted platforms don't allow.",
    outcomes: [
      "A fully customized, open-source store where you own your data.",
      "An eCommerce engine integrated directly into a content-heavy website.",
      "Support for specific business logic (e.g., complex shipping, custom bookings).",
      "Lower ongoing platform fees than typical hosted platforms."
    ],
    scope: "WordPress and WooCommerce installation, theme customization, complex plugin configuration, product setup, and performance optimization.",
    complexity: "Medium",
    availability: "Live",
    core: [
      "WordPress & WooCommerce Core Setup",
      "Custom Theme Implementation",
      "Complex Plugin Configuration",
      "Payment & Gateway Integration",
      "Product Catalog Architecture",
      "Security Hardening & Performance Tuning"
    ],
    addOns: [
      "Complex Shipping Rules & Logistics API Integration",
      "Membership & Subscription Setup (WooCommerce Subscriptions)",
      "Custom Product Configurators & Add-ons",
      "Migration from other platforms"
    ],
    recommendations: ["website-maintenance-support", "website-performance-optimization", "technical-seo-setup"],
    businessProblems: [
      "SaaS platforms (like Shopify) prohibit the sale of certain highly regulated products.",
      "Need a unified platform where the company blog/content is just as important as the store.",
      "Business logic requires a combination of wholesale, retail, and subscription pricing simultaneously.",
      "Desire for complete ownership of data without recurring platform fees."
    ],
    process: [
      { title: "Requirements Gathering", description: "We define the exact plugins, themes, and custom logic required to meet your specific business needs." },
      { title: "Environment Setup", description: "We configure a staging environment optimized specifically for WooCommerce performance (which requires more resources than standard WordPress)." },
      { title: "Development & Configuration", description: "We customize the theme, configure WooCommerce settings, and integrate all required third-party plugins." },
      { title: "Performance Optimization", description: "We implement advanced caching strategies specifically designed to speed up WooCommerce without breaking the cart functionality." },
      { title: "Testing & Launch", description: "We run end-to-end test transactions, harden security, and push the store to a live production environment." }
    ],
    useCases: [
      { title: "High-Risk Merchant Stores", description: "Building a secure store for industries (like CBD or certain supplements) that are often banned from hosted platforms." },
      { title: "Content-First Commerce", description: "Integrating a store directly into a massive, high-traffic editorial WordPress site to monetize existing readers." },
      { title: "Complex B2B Wholesale", description: "A portal where logged-in distributors see different catalogs, tax rules, and pricing than retail customers." }
    ],
    exclusions: [
      "Cheap shared hosting environments (WooCommerce requires dedicated/VPS resources to run well).",
      "Blindly installing dozens of random plugins (we strictly curate for performance).",
      "Projects looking for 'zero maintenance' (WordPress requires active upkeep)."
    ],
    recommendedTechnologies: ["WordPress", "WooCommerce", "PHP"],
    pricing: "WooCommerce builds are priced based on theme customization needs, the number and complexity of plugins required, and payment gateway setup. This tends to suit stores that want to stay on WordPress.",
    timeline: "WooCommerce setup typically takes 3–6 weeks depending on plugin complexity and catalog size.",
    faqs: [
      { question: "Do you work with our existing WordPress site?", answer: "Yes — we regularly build WooCommerce on top of an existing WordPress installation, or set one up from scratch." },
      { question: "Which payment gateways do you support?", answer: "We configure whichever gateways are relevant to your market as part of the setup — let us know your requirements during scoping." }
    ],
    cta: { label: "Build with WooCommerce", href: "/contact?intent=ecommerce" }
  },
  {
    family: "ecommerce",
    slug: "ecommerce-specific-services",
    title: "eCommerce Feature Enhancements",
    description: "Don't rebuild your entire store just to fix a few conversion killers. We implement targeted, high-impact feature upgrades—like lightning-fast search, dynamic filtering, and social proof integrations—to dramatically improve the shopping experience of your existing eCommerce platform.",
    seo: { 
      title: "eCommerce Feature Enhancements & Optimizations | HA Web Studio", 
      description: "Upgrade your existing store with targeted eCommerce features. We integrate advanced search, dynamic filtering, reviews, and feeds to boost conversions." 
    },
    audience: "Existing eCommerce merchants who are generally happy with their platform but need to solve specific UX bottlenecks to increase conversion rates.",
    outcomes: [
      "Drastically improved product discovery, leading to higher average order values.",
      "Increased buyer trust and conversion rates through integrated social proof.",
      "Streamlined navigation for stores with large, complex catalogs.",
      "Automated product syndication to external sales channels (Google, Meta)."
    ],
    scope: "Targeted implementation of specific eCommerce modules (e.g., Algolia Search, Yotpo Reviews, complex faceted filtering) into an existing codebase.",
    complexity: "Medium",
    availability: "Live",
    core: [
      "Technical Feasibility & Integration Scoping",
      "API Connection & Configuration",
      "Frontend UI Component Integration",
      "Styling to Match Existing Brand",
      "Cross-browser Testing & Rollout"
    ],
    addOns: [
      "Algolia / Meilisearch Advanced Implementation",
      "Complex Faceted Product Filtering",
      "Review & Loyalty Platform Integration (Yotpo, Okendo)",
      "Google Merchant Center Feed Automation",
      "Advanced Product Schema Markup"
    ],
    recommendations: ["conversion-rate-optimization", "analytics-tracking-setup"],
    businessProblems: [
      "Customers can't find what they are looking for because the native store search is terrible.",
      "Conversion rates are low due to a lack of visible, verified customer reviews.",
      "Users get overwhelmed browsing large catalogs without the ability to filter by size, color, or price.",
      "Manually updating product data on Google Shopping is wasting hundreds of hours."
    ],
    process: [
      { title: "Audit & Scoping", description: "We analyze your current platform's architecture to determine the best method for integrating the new feature." },
      { title: "Configuration", description: "We set up the third-party service (e.g., configuring Algolia indexes or Yotpo widgets) and connect the APIs." },
      { title: "Frontend Implementation", description: "We integrate the new feature into your existing theme to match your branding." },
      { title: "Quality Assurance", description: "We test the new functionality across devices to ensure it hasn't introduced bugs or slowed down the site." }
    ],
    useCases: [
      { title: "Search Rescue", description: "Replacing a slow, inaccurate native search bar with a typo-tolerant, instant-results search engine." },
      { title: "Trust Building", description: "Integrating a comprehensive review platform that collects photo reviews and displays them dynamically on product pages." },
      { title: "Faceted Navigation Overhaul", description: "Building a complex sidebar filter that allows users to instantly sort products by highly specific technical attributes." }
    ],
    exclusions: [
      "Full store redesigns or replatforming.",
      "Fixing core backend database issues on legacy platforms.",
      "Ongoing management of the third-party platforms post-launch."
    ],
    recommendedTechnologies: ["Algolia", "Yotpo", "GMC"],
    pricing: "Pricing depends on the specific feature or integration you need — this service covers everything from a single new integration to a set of store enhancements. We'll give you a fixed quote once we understand the technical scope.",
    timeline: "Individual enhancements typically take 1–3 weeks; larger multi-feature engagements take longer.",
    faqs: [
      { question: "Can you improve an existing store rather than rebuild it?", answer: "Yes — this service exists specifically for targeted improvements to a store you already have, without a full rebuild." }
    ],
    cta: { label: "Enhance Your Store", href: "/contact?intent=ecommerce" }
  }
];
