import type { Service, ServiceFamily } from "@/lib/content/types";

const standardProcess = [
  {
    title: "Discover",
    description:
      "Understand business goals, constraints, and opportunity areas.",
  },
  {
    title: "Plan",
    description: "Define scope, architecture, and delivery priorities.",
  },
  {
    title: "Build",
    description:
      "Implement with performance, quality, and maintainability in mind.",
  },
  {
    title: "Launch",
    description: "Deploy safely with QA, tracking, and search checks in place.",
  },
  {
    title: "Support",
    description: "Monitor outcomes and improve after launch.",
  },
];

export const serviceFamilies: ServiceFamily[] = [
  {
    slug: "business-websites",
    title: "Business Websites",
    description:
      "Professional websites built to strengthen positioning, trust, and lead generation.",
    overview:
      "For businesses launching a new presence, modernizing an outdated site, or creating focused conversion pages.",
    services: [
      "Business Website Development",
      "Website Redesign",
      "Landing Page Development",
    ],
    whatYouGet: [
      "A professionally designed business website",
      "Modern, responsive design for all devices",
      "Fast loading and optimized performance",
      "Clear content structure and navigation",
      "SEO-ready website architecture",
      "Contact forms and lead generation features",
      "Security and best-practice implementation",
      "Easy-to-manage website foundation",
      "Future-ready scalable architecture",
    ],
    problems: [
      "Outdated website",
      "Poor conversions",
      "Weak credibility",
      "Hard-to-manage content",
    ],
    cta: { label: "Start a Website Project", href: "/contact" },
    faqs: [
      {
        question: "What is included in the Business Websites family?",
        answer:
          "It covers new business website builds, redesigns of existing sites, and focused landing pages for campaigns — each scoped as its own service depending on whether you need a new site, a refresh, or a single conversion-focused page.",
      },
      {
        question: "Do I need a full website or just a landing page?",
        answer:
          "If customers need to understand your full range of services, choose a business website. If you are promoting one offer or campaign, a landing page is faster to launch and easier to test.",
      },
      {
        question: "How long does a typical business website project take?",
        answer:
          "Most business website and redesign projects run from discovery through launch in a focused, milestone-based delivery plan, with scope and timeline confirmed after the initial discovery step.",
      },
    ],
  },
  {
    slug: "ecommerce",
    title: "eCommerce",
    description:
      "Online store services focused on conversion, checkout quality, and scalable growth.",
    overview:
      "For teams launching or improving online stores across Shopify and WooCommerce.",
    services: [
      "eCommerce Development",
      "Shopify Development",
      "WooCommerce Development",
    ],
    whatYouGet: [
      "Complete online store setup",
      "Product catalog implementation",
      "Secure checkout experience",
      "Payment gateway integration",
      "Shipping and tax configuration",
      "Inventory management foundation",
      "Mobile-optimized shopping experience",
      "Performance-optimized storefront",
      "Scalable ecommerce architecture",
    ],
    problems: [
      "Cart abandonment",
      "Slow mobile checkout",
      "Platform limitations",
      "Weak product journeys",
    ],
    cta: { label: "Grow My Ecommerce Store", href: "/contact" },
    faqs: [
      {
        question: "Should I choose Shopify, WooCommerce, or a custom build?",
        answer:
          "Shopify suits brands that want a fast launch on a managed platform. WooCommerce fits businesses that need deeper customization inside WordPress. A custom or headless build suits stores with unusual catalog, pricing, or integration requirements.",
      },
      {
        question: "Can you migrate an existing online store?",
        answer:
          "Yes. We audit the existing catalog, orders, and integrations first, then plan a migration that preserves product data, SEO, and payment configuration before switching platforms.",
      },
      {
        question: "Do you handle payment gateway setup?",
        answer:
          "Yes, payment gateway integration — including region-specific providers — is part of the ecommerce build, alongside shipping, tax, and inventory configuration.",
      },
    ],
  },
  {
    slug: "website-performance",
    title: "Website Performance",
    description:
      "Optimization services that improve speed, experience, and conversion opportunity.",
    overview:
      "For existing websites that need measurable improvements without a full rebuild.",
    services: [
      "Website Performance Optimization",
      "Conversion Rate Optimization",
    ],
    whatYouGet: [
      "Faster page load times",
      "Improved Core Web Vitals",
      "Better user experience",
      "Higher conversion opportunities",
      "Performance bottleneck analysis",
      "Speed optimization recommendations",
      "Improved mobile performance",
      "Ongoing optimization strategy",
    ],
    problems: [
      "Slow loading",
      "Low conversions",
      "Poor UX",
      "Drop-offs on mobile",
    ],
    cta: { label: "Improve My Website", href: "/contact" },
    faqs: [
      {
        question: "Does performance work require rebuilding the website?",
        answer:
          "No. Most performance and conversion improvements are made to the existing website — image optimization, caching, code splitting, and CTA or journey changes — without a full rebuild.",
      },
      {
        question: "How is performance measured before and after?",
        answer:
          "We baseline Core Web Vitals and Lighthouse scores, then track the same metrics after each round of optimization so improvements are measurable rather than anecdotal.",
      },
    ],
  },
  {
    slug: "seo-search-visibility",
    title: "SEO & Search Visibility",
    description:
      "Search-focused services for discoverability across search engines and AI retrieval systems.",
    overview:
      "For businesses that need stronger crawlability, indexing, schema, and long-term organic discoverability.",
    services: [
      "Technical SEO Setup",
      "Search Visibility Setup",
      "Local SEO Foundations",
      "Structured Data & Schema Setup",
      "AI Search Visibility & Answer Engine Optimization",
    ],
    whatYouGet: [
      "Search-engine-ready website",
      "Proper indexing setup",
      "Optimized website structure",
      "Enhanced local search visibility",
      "Structured data implementation",
      "AI search readiness",
      "Better crawlability",
      "Improved discoverability",
      "Long-term organic growth foundation",
    ],
    problems: [
      "No search visibility",
      "Weak local presence",
      "Poor crawlability",
      "No schema strategy",
    ],
    cta: { label: "Discuss SEO", href: "/contact" },
    faqs: [
      {
        question: "What is the difference between SEO and AEO?",
        answer:
          "Technical SEO focuses on how search engines like Google crawl, index, and rank pages. AEO (Answer Engine Optimization) focuses on how AI assistants and answer engines retrieve and cite content directly, which relies more on clear structure, schema, and self-contained answers.",
      },
      {
        question: "Do I need all five SEO services or just one?",
        answer:
          "Most websites start with a technical SEO audit to find the highest-impact gaps, then add local SEO, structured data, or AI search visibility work depending on whether the priority is local customers, richer search results, or AI-assisted discovery.",
      },
      {
        question: "How long does it take to see SEO results?",
        answer:
          "Technical fixes like indexing and crawlability issues can show impact within weeks, while competitive ranking improvements and AI search visibility typically build over a longer, ongoing period.",
      },
    ],
  },
  {
    slug: "google-business",
    title: "Google Business",
    description:
      "Google Business Profile and Maps visibility support for stronger local discovery.",
    overview:
      "For location-based businesses that rely on local search and trust signals.",
    services: ["Google Business & Maps Visibility"],
    whatYouGet: [
      "Optimized Google Business Profile",
      "Google Maps visibility improvements",
      "Accurate business information",
      "Local search optimization",
      "Category and profile optimization",
      "Customer trust improvements",
      "Better local discoverability",
    ],
    problems: [
      "Weak map visibility",
      "Inconsistent business profile",
      "Low local trust",
    ],
    cta: { label: "Improve Local Visibility", href: "/contact" },
    faqs: [
      {
        question: "Is Google Business Profile optimization enough on its own?",
        answer:
          "It is the fastest way to improve map and local search visibility, but it works best alongside Local SEO Foundations on the website itself — profile and website signals reinforce each other.",
      },
      {
        question: "Do you handle profile verification?",
        answer:
          "We support the setup and optimization process, including category selection, business information accuracy, and readiness for verification, which Google itself administers.",
      },
    ],
  },
  {
    slug: "analytics",
    title: "Analytics",
    description:
      "Measurement and tracking services for clearer insights and better decisions.",
    overview:
      "For teams that need dependable conversion data and performance visibility.",
    services: ["Analytics & Tracking Setup"],
    whatYouGet: [
      "Website traffic tracking",
      "Visitor behavior insights",
      "Conversion tracking",
      "Performance dashboards",
      "Event tracking setup",
      "Marketing measurement foundation",
      "Data-driven decision support",
    ],
    problems: [
      "No reliable data",
      "Unclear conversion attribution",
      "Inconsistent reporting",
    ],
    cta: { label: "Set Up Better Tracking", href: "/contact" },
    faqs: [
      {
        question: "What gets tracked in a standard analytics setup?",
        answer:
          "Form submissions, phone and email clicks, purchases or bookings, and traffic sources are typically configured as measurable events, alongside standard page and session tracking.",
      },
      {
        question: "Do you set up Google Analytics 4 specifically?",
        answer:
          "Yes — GA4, Google Search Console, and event-level conversion tracking are the default foundation, with tools like Microsoft Clarity added when session-level behavior insight is useful.",
      },
    ],
  },
  {
    slug: "custom-web-applications",
    title: "Custom Web Applications",
    description:
      "Custom functionality and integration work for business-specific digital workflows.",
    overview:
      "For teams that need advanced interactions, integrations, and bespoke product behavior.",
    services: [
      "Custom Web Application Development",
      "Frontend Development",
      "Third-Party & API Integrations",
    ],
    whatYouGet: [
      "Custom business functionality",
      "Interactive web applications",
      "Modern user interfaces",
      "Business workflow automation",
      "External system integrations",
      "Scalable application architecture",
      "Secure and maintainable codebase",
    ],
    problems: [
      "Manual workflows",
      "Disconnected systems",
      "Missing custom functionality",
    ],
    cta: { label: "Request Technical Consultation", href: "/contact" },
    faqs: [
      {
        question: "How is this different from a regular website?",
        answer:
          "A custom web application is built around specific business logic, user roles, and workflows — dashboards, portals, or automation tools — rather than presenting content to visitors like a marketing website.",
      },
      {
        question: "Do you build the frontend, backend, or both?",
        answer:
          "Both, depending on scope. Frontend Development covers interface and interaction work; Custom Web Application Development covers full-stack build including data models and integrations.",
      },
    ],
  },
  {
    slug: "website-management",
    title: "Website Management",
    description:
      "Maintenance, migration, and technical support for long-term website stability.",
    overview:
      "For businesses that need reliable technical care and safer platform transitions.",
    services: [
      "Website Maintenance & Support",
      "Website Migration & Replatforming",
      "Website Audit & Technical Fixes",
    ],
    whatYouGet: [
      "Regular website maintenance",
      "Security updates",
      "Technical issue resolution",
      "Website health monitoring",
      "Safe website migration",
      "Platform upgrades",
      "Performance monitoring",
      "Long-term technical support",
    ],
    problems: [
      "Maintenance gaps",
      "Migration risk",
      "Recurring technical issues",
    ],
    cta: { label: "Request Technical Consultation", href: "/contact" },
    faqs: [
      {
        question: "Do I need an ongoing maintenance plan or a one-time audit?",
        answer:
          "A one-time audit is the right starting point if you need to diagnose specific issues. An ongoing maintenance plan is better if you want proactive monitoring, updates, and security handled continuously.",
      },
      {
        question: "What happens during a website migration?",
        answer:
          "We audit the existing content, URLs, integrations, and SEO signals first, then plan and execute the move to preserve rankings, redirects, and functionality with minimal downtime.",
      },
    ],
  },
];

export const services: Service[] = [
  {
    family: "business-websites",
    slug: "business-website-development",
    title: "Business Website Development",
    description:
      "Professional business websites built for trust, clarity, and lead generation.",
    seo: { title: "Professional Business Website Development", description: "We design and build professional business websites that establish trust, communicate clearly, and turn visitors into qualified leads for your business." },
    audience:
      "Service businesses, B2B teams, and organizations building a stronger digital presence.",
    businessProblems: ["Outdated website", "Low trust", "Weak lead flow"],
    deliverables: [
      "Website strategy",
      "Design and development",
      "CMS-ready structure",
      "Conversion-focused pages",
    ],
    process: standardProcess,
    recommendedTechnologies: ["Next.js", "React", "Tailwind CSS"],
    faqs: [
      {
        question: "How do we decide if we need a new website or a redesign?",
        answer:
          "If you have never had a professional website, this is Business Website Development. If a website already exists but underperforms, Website Redesign is the more accurate fit.",
      },
      {
        question: "What is included in a business website project?",
        answer:
          "Strategy and content planning, responsive design and development, a CMS-ready structure for future updates, and conversion-focused pages built around your services and goals.",
      },
      {
        question: "Is technical SEO included in a new website build?",
        answer:
          "A new site is built on an SEO-ready architecture by default — clean URLs, metadata, and site structure — with deeper technical SEO work available as a dedicated service if needed.",
      },
    ],
    relatedServices: ["website-redesign", "landing-page-development"],
    cta: { label: "Start a Website Project", href: "/contact" },
  },
  {
    family: "business-websites",
    slug: "website-redesign",
    title: "Website Redesign",
    description:
      "Modern redesigns that improve clarity, performance, and business outcomes.",
    seo: { title: "Website Redesign Services for Better Performance", description: "We redesign underperforming websites to improve clarity, speed, and conversions, while preserving your existing SEO rankings and content wherever possible." },
    audience:
      "Teams with existing websites that feel dated or underperforming.",
    businessProblems: ["Outdated UX", "Poor conversion flow", "Weak messaging"],
    deliverables: [
      "UX and UI redesign",
      "Content structure refresh",
      "Performance and SEO improvements",
    ],
    process: standardProcess,
    recommendedTechnologies: ["Next.js", "Tailwind CSS"],
    faqs: [
      {
        question: "Will a redesign keep our existing content and SEO rankings?",
        answer:
          "Yes — a redesign is planned around preserving URLs, metadata, and indexed content wherever possible, while improving the design, structure, and performance around it.",
      },
      {
        question:
          "Do we need to redesign the entire site, or just parts of it?",
        answer:
          "Not always. Some redesigns are scoped to specific problem areas such as navigation, key landing pages, or conversion paths, rather than a full rebuild.",
      },
    ],
    relatedServices: [
      "business-website-development",
      "landing-page-development",
    ],
    cta: { label: "Start a Website Redesign", href: "/contact" },
  },
  {
    family: "business-websites",
    slug: "landing-page-development",
    title: "Landing Page Development",
    description:
      "Focused landing pages designed for campaigns, offers, and conversion.",
    seo: { title: "Landing Page Development for Campaigns & Offers", description: "We build focused, fast-loading landing pages designed around a single offer or campaign, with conversion tracking built in from day one." },
    audience:
      "Marketing teams and businesses running campaigns or launch offers.",
    businessProblems: ["Low campaign conversion", "Unclear offer messaging"],
    deliverables: [
      "Offer-focused page design",
      "Fast build and launch",
      "Conversion tracking setup",
    ],
    process: standardProcess,
    recommendedTechnologies: ["Next.js", "Tailwind CSS"],
    faqs: [
      {
        question: "How quickly can a landing page be built and launched?",
        answer:
          "Landing pages are scoped to a single offer or campaign, so they are typically the fastest page type to design, build, and launch compared to a full website.",
      },
      {
        question: "Is conversion tracking included?",
        answer:
          "Yes — event and conversion tracking are set up as part of the build so campaign performance can be measured from day one.",
      },
    ],
    relatedServices: [
      "business-website-development",
      "conversion-rate-optimization",
    ],
    cta: { label: "Build a Landing Page", href: "/contact" },
  },
  {
    family: "ecommerce",
    slug: "ecommerce-development",
    title: "eCommerce Development",
    description:
      "End-to-end ecommerce builds optimized for conversion and growth.",
    seo: { title: "End-to-End Ecommerce Website Development", description: "We build complete ecommerce stores optimized for conversion, checkout quality, and long-term growth, from product catalogue to secure payment flow." },
    audience: "Retailers and DTC brands launching or improving online stores.",
    businessProblems: [
      "Cart abandonment",
      "Slow storefront",
      "Checkout friction",
    ],
    deliverables: [
      "Store setup",
      "Checkout flow",
      "Product architecture",
      "Growth-ready foundation",
    ],
    process: standardProcess,
    recommendedTechnologies: ["Next.js", "Sanity CMS", "Payment Gateway APIs"],
    faqs: [
      {
        question:
          "Is eCommerce Development a custom build or a platform like Shopify?",
        answer:
          "This is a custom, headless ecommerce build for stores that need product architecture, checkout, and integrations tailored to specific business requirements beyond what a template platform supports.",
      },
      {
        question: "What payment options can be integrated?",
        answer:
          "Payment gateway integration is scoped to the markets you sell in, including region-specific providers, alongside standard shipping and tax configuration.",
      },
    ],
    relatedServices: ["shopify-development", "woocommerce-development"],
    cta: { label: "Grow My Ecommerce Store", href: "/contact" },
  },
  {
    family: "ecommerce",
    slug: "shopify-development",
    title: "Shopify Development",
    description:
      "Shopify implementation for businesses that need speed and managed infrastructure.",
    seo: { title: "Shopify Store Development & Setup Services", description: "We build and configure Shopify stores for businesses that want speed, reliability, and managed infrastructure without sacrificing customization." },
    audience: "Brands prioritizing fast launch and easy store management.",
    businessProblems: ["Need a reliable platform", "Need faster launch"],
    deliverables: [
      "Shopify setup",
      "Theme implementation",
      "Payment and shipping integration",
    ],
    process: standardProcess,
    recommendedTechnologies: ["Shopify", "Liquid"],
    faqs: [
      {
        question: "Why choose Shopify over a custom ecommerce build?",
        answer:
          "Shopify is the faster path to launch for most product-based businesses, with managed hosting, security, and payments handled by the platform — a good fit when speed and simplicity matter more than deep customization.",
      },
      {
        question:
          "Can an existing Shopify store be improved instead of rebuilt?",
        answer:
          "Yes. Many Shopify projects are theme, performance, or checkout improvements to an existing store rather than a full rebuild.",
      },
    ],
    relatedServices: ["ecommerce-development", "woocommerce-development"],
    cta: { label: "Discuss Shopify", href: "/contact" },
  },
  {
    family: "ecommerce",
    slug: "woocommerce-development",
    title: "WooCommerce Development",
    description:
      "WooCommerce implementation for stores that need flexibility and deeper customization.",
    seo: { title: "WooCommerce Development for Flexible Stores", description: "We build WooCommerce stores for businesses that need deep customization and flexibility, with a setup built to scale as your catalogue grows." },
    audience: "Teams needing custom store logic and content flexibility.",
    businessProblems: ["Platform constraints", "Complex catalog needs"],
    deliverables: [
      "WooCommerce setup",
      "Custom store components",
      "Plugin and workflow integration",
    ],
    process: standardProcess,
    recommendedTechnologies: ["WordPress", "WooCommerce"],
    faqs: [
      {
        question: "When does WooCommerce make more sense than Shopify?",
        answer:
          "WooCommerce fits businesses that need deep customization, unusual catalog structures, or want full control within a WordPress environment they may already be using for content.",
      },
      {
        question: "Does WooCommerce require more ongoing maintenance?",
        answer:
          "Generally yes, since it runs on self-managed WordPress infrastructure — Website Maintenance & Support is worth pairing with a WooCommerce build to keep plugins and security current.",
      },
    ],
    relatedServices: ["ecommerce-development", "shopify-development"],
    cta: { label: "Discuss WooCommerce", href: "/contact" },
  },
  {
    family: "website-performance",
    slug: "website-performance-optimization",
    title: "Website Performance Optimization",
    description:
      "Speed and UX optimization for stronger retention and conversion performance.",
    seo: { title: "Website Performance & Speed Optimization", description: "We optimize website speed and Core Web Vitals to improve user experience, search rankings, and conversion rates across every device." },
    audience: "Businesses with existing websites that feel heavy or slow.",
    businessProblems: [
      "Slow pages",
      "Weak mobile UX",
      "Drop-off before conversion",
    ],
    deliverables: [
      "Performance audit",
      "Optimization implementation",
      "Measurement and follow-up",
    ],
    process: standardProcess,
    recommendedTechnologies: ["Next.js", "Cloudflare"],
    faqs: [
      {
        question: "What does a performance audit actually check?",
        answer:
          "Core Web Vitals, image and asset sizes, JavaScript execution, render-blocking resources, caching configuration, and third-party scripts are reviewed to find the highest-impact fixes.",
      },
      {
        question: "Will performance optimization affect our SEO?",
        answer:
          "Yes, positively — Core Web Vitals are a ranking factor, and faster pages also tend to reduce bounce rate and improve conversion, so performance work supports SEO and CRO together.",
      },
    ],
    relatedServices: [
      "conversion-rate-optimization",
      "website-audit-technical-fixes",
    ],
    cta: { label: "Improve My Website", href: "/contact" },
  },
  {
    family: "website-performance",
    slug: "conversion-rate-optimization",
    title: "Conversion Rate Optimization",
    description:
      "Conversion-focused improvements to increase the value of existing traffic.",
    seo: { title: "Conversion Rate Optimization Services", description: "We identify and fix the friction points costing you conversions, turning more of your existing traffic into enquiries, bookings, and sales." },
    audience: "Teams with traffic but weak conversion outcomes.",
    businessProblems: [
      "Low conversion rate",
      "Weak page clarity",
      "Form drop-off",
    ],
    deliverables: [
      "Journey analysis",
      "Conversion hypothesis plan",
      "Implementation and test-ready updates",
    ],
    process: standardProcess,
    recommendedTechnologies: ["Google Analytics 4", "Microsoft Clarity"],
    faqs: [
      {
        question: "Do we need more traffic or better conversion first?",
        answer:
          "If existing traffic already reflects your target audience, improving conversion is usually the faster and cheaper win before spending more on acquiring additional traffic.",
      },
      {
        question: "How do you know what to change on the page?",
        answer:
          "We start from analytics and session data to see where visitors actually drop off, rather than redesigning based on visual preference alone.",
      },
    ],
    relatedServices: [
      "website-performance-optimization",
      "landing-page-development",
    ],
    cta: { label: "Improve Conversions", href: "/contact" },
  },
  {
    family: "seo-search-visibility",
    slug: "technical-seo-setup",
    title: "Technical SEO Setup",
    description:
      "Technical foundations for crawlability, indexing, and search visibility.",
    seo: { title: "Technical SEO Setup & Implementation", description: "We set up the technical SEO foundations, crawlability, indexing, site structure, and speed, that your content needs to actually rank in search." },
    audience:
      "Businesses with indexing issues or weak technical search foundations.",
    businessProblems: [
      "Crawl issues",
      "Indexing gaps",
      "Weak metadata structure",
    ],
    deliverables: [
      "Technical SEO audit",
      "Metadata structure",
      "Indexing and crawl fixes",
    ],
    process: standardProcess,
    recommendedTechnologies: ["Google Search Console", "XML Sitemaps"],
    faqs: [
      {
        question: 'What counts as "technical" SEO versus content SEO?',
        answer:
          "Technical SEO covers crawlability, indexing, site structure, metadata, sitemaps, and Core Web Vitals — the foundation that determines whether search engines can find and understand your pages at all, separate from the quality of the written content itself.",
      },
      {
        question: "How do I know if my site has technical SEO issues?",
        answer:
          "Google Search Console will show indexing errors, coverage issues, and crawl problems directly — a technical SEO audit reviews these alongside site structure and metadata to find the root causes.",
      },
    ],
    relatedServices: [
      "search-visibility-setup",
      "structured-data-schema-setup",
    ],
    cta: { label: "Discuss SEO", href: "/contact" },
  },
  {
    family: "seo-search-visibility",
    slug: "search-visibility-setup",
    title: "Search Visibility Setup",
    description:
      "Search visibility strategy and implementation built around business growth.",
    seo: { title: "Search Visibility Strategy & Setup", description: "We build a search visibility strategy and implementation plan tailored to how your business actually grows, not a generic SEO checklist." },
    audience:
      "Teams that need discoverability growth across key service or product pages.",
    businessProblems: [
      "Low organic visibility",
      "Weak content discoverability",
    ],
    deliverables: [
      "Visibility strategy",
      "Search-focused page structure",
      "Technical and on-page setup",
    ],
    process: standardProcess,
    recommendedTechnologies: ["Google Search Console", "Schema.org"],
    faqs: [
      {
        question: "How is this different from Technical SEO Setup?",
        answer:
          "Technical SEO Setup fixes the foundation (crawlability, indexing, structure). Search Visibility Setup builds on that foundation with page-level strategy — targeting the right service and product pages for the searches your customers actually run.",
      },
      {
        question: "Does this include keyword research?",
        answer:
          "Yes, keyword and intent research for your key services or products is part of building the search-focused page structure.",
      },
    ],
    relatedServices: ["technical-seo-setup", "local-seo-foundations"],
    cta: { label: "Improve Search Visibility", href: "/contact" },
  },
  {
    family: "seo-search-visibility",
    slug: "local-seo-foundations",
    title: "Local SEO Foundations",
    description:
      "Local-focused search setup for location-based business discovery.",
    seo: { title: "Local SEO Foundations for Nearby Customers", description: "We set up the local search foundations, Google Business Profile, citations, and location-based content, that help nearby customers find you first." },
    audience:
      "Local and regional businesses dependent on map and local intent searches.",
    businessProblems: ["Low local ranking", "Weak local discovery"],
    deliverables: [
      "Local SEO setup",
      "Location page optimization",
      "Local visibility checks",
    ],
    process: standardProcess,
    recommendedTechnologies: [
      "Google Business Profile",
      "Local Business Schema",
    ],
    faqs: [
      {
        question: "Do I need this if I already have a Google Business Profile?",
        answer:
          "A Google Business Profile helps with Maps visibility specifically. Local SEO Foundations works on the website itself — location pages, Local Business schema, and consistent business information — which reinforces the profile in regular search results too.",
      },
      {
        question: "Does local SEO help if I serve multiple locations?",
        answer:
          "Yes — multi-location businesses typically need a dedicated, well-structured location page per service area rather than a single generic page trying to rank everywhere.",
      },
    ],
    relatedServices: ["google-business-maps-visibility", "technical-seo-setup"],
    cta: { label: "Improve Local SEO", href: "/contact" },
  },
  {
    family: "seo-search-visibility",
    slug: "structured-data-schema-setup",
    title: "Structured Data & Schema Setup",
    description:
      "Schema implementation that improves content understanding by search systems.",
    seo: { title: "Structured Data & Schema Markup Setup", description: "We implement schema markup that helps search engines and AI systems understand your content correctly, improving how your pages appear in results." },
    audience:
      "Teams wanting richer search visibility and better machine-readable content.",
    businessProblems: ["No schema coverage", "Weak search result context"],
    deliverables: [
      "Schema strategy",
      "Schema implementation",
      "Validation and rollout",
    ],
    process: standardProcess,
    recommendedTechnologies: ["JSON-LD", "Schema.org"],
    faqs: [
      {
        question: "What is structured data actually used for?",
        answer:
          "Structured data (JSON-LD schema) gives search engines and AI systems explicit, machine-readable facts about your content — organization details, FAQs, services, articles — which improves rich results and how accurately answer engines can cite your pages.",
      },
      {
        question: "Which schema types matter most for a business website?",
        answer:
          "Organization, Service, FAQPage, and BreadcrumbList schema typically matter most, with additional types like LocalBusiness or Product added depending on the business.",
      },
    ],
    relatedServices: [
      "technical-seo-setup",
      "ai-search-visibility-answer-engine-optimization",
    ],
    cta: { label: "Set Up Structured Data", href: "/contact" },
  },
  {
    family: "seo-search-visibility",
    slug: "ai-search-visibility-answer-engine-optimization",
    title: "AI Search Visibility & Answer Engine Optimization",
    description:
      "Content and structure optimization for AI retrieval and answer engine visibility.",
    seo: { title: "AI Search Visibility & Answer Engine Optimization", description: "We optimize your content and site structure so AI assistants and answer engines can find, understand, and cite your business accurately." },
    audience:
      "Businesses that want content to be accurately retrieved in AI-assisted search.",
    businessProblems: [
      "Content not retrieved by AI tools",
      "Weak answer readiness",
    ],
    deliverables: [
      "Retrieval-oriented content structure",
      "Entity and schema refinement",
      "Answer-ready page structure",
    ],
    process: standardProcess,
    recommendedTechnologies: ["Schema.org", "llms.txt"],
    faqs: [
      {
        question: "What is Answer Engine Optimization (AEO)?",
        answer:
          "AEO is the practice of structuring website content — clear headings, direct answers, FAQ schema, and entity-consistent information — so AI assistants and answer engines like ChatGPT, Perplexity, and Google AI Overviews can accurately retrieve and cite it.",
      },
      {
        question: "Is AEO a replacement for traditional SEO?",
        answer:
          "No — AEO builds on the same technical SEO foundation (crawlability, indexing, schema) but adds retrieval-specific structure, since AI systems extract and summarize content differently than traditional search ranking does.",
      },
      {
        question: "How do I know if AI tools can already find my content?",
        answer:
          "Checking whether AI assistants can answer questions about your business accurately, and whether your `llms.txt` and structured data give a clear, unambiguous summary of who you are, is a practical starting point.",
      },
    ],
    relatedServices: ["technical-seo-setup", "structured-data-schema-setup"],
    cta: { label: "Discuss AI Search", href: "/contact" },
  },
  {
    family: "google-business",
    slug: "google-business-maps-visibility",
    title: "Google Business & Maps Visibility",
    description:
      "Google Business Profile optimization for stronger map and local search presence.",
    seo: { title: "Google Business Profile & Maps Visibility Setup", description: "We optimize your Google Business Profile so your business shows up correctly and prominently in Maps and local search results." },
    audience: "Local businesses that rely on map searches and trust signals.",
    businessProblems: ["Low map ranking", "Inaccurate profile setup"],
    deliverables: [
      "Profile optimization",
      "Category and listing setup",
      "Visibility improvement plan",
    ],
    process: standardProcess,
    recommendedTechnologies: ["Google Business Profile", "Google Workspace"],
    faqs: [
      {
        question: "Can you set up a new Google Business Profile from scratch?",
        answer:
          "Yes — profile creation, category selection, business information setup, and verification readiness are all part of this service for businesses without an existing profile.",
      },
      {
        question: "Do reviews affect map ranking?",
        answer:
          "Yes, review volume and recency are one of several ranking factors alongside profile completeness, category accuracy, and proximity — which is why review strategy is often reviewed alongside profile optimization.",
      },
    ],
    relatedServices: ["local-seo-foundations"],
    cta: { label: "Improve Local Visibility", href: "/contact" },
  },
  {
    family: "analytics",
    slug: "analytics-tracking-setup",
    title: "Analytics & Tracking Setup",
    description:
      "Tracking implementation for traffic, behavior, and conversion measurement.",
    seo: { title: "Analytics & Tracking Setup: GA4, GTM & Clarity", description: "We implement GA4, Google Tag Manager, and session analytics so you get reliable data on traffic, behavior, and conversions from day one." },
    audience: "Teams lacking reliable analytics or actionable conversion data.",
    businessProblems: [
      "No dependable reporting",
      "Unclear channel performance",
    ],
    deliverables: [
      "Analytics implementation",
      "Event tracking",
      "Dashboard and reporting foundation",
    ],
    process: standardProcess,
    recommendedTechnologies: [
      "Google Analytics 4",
      "Google Search Console",
      "Microsoft Clarity",
    ],
    faqs: [
      {
        question:
          "What is the minimum analytics setup a business website needs?",
        answer:
          "Google Analytics 4 connected to Search Console, with contact form submissions and any purchase or booking actions tracked as conversion events, covers the essentials most businesses need to make decisions.",
      },
      {
        question:
          "Can you set up tracking on an existing website without breaking anything?",
        answer:
          "Yes — tracking implementation is scoped to avoid disrupting the live site, with testing before events go live in production reporting.",
      },
    ],
    relatedServices: ["conversion-rate-optimization"],
    cta: { label: "Set Up Better Tracking", href: "/contact" },
  },
  {
    family: "custom-web-applications",
    slug: "custom-web-application-development",
    title: "Custom Web Application Development",
    description:
      "Custom web applications for business workflows and specialized functionality.",
    seo: { title: "Custom Web Application Development Services", description: "We design and build custom web applications tailored to your specific workflows, replacing spreadsheets and off-the-shelf software that no longer fit." },
    audience:
      "Businesses with process complexity that cannot be solved by standard websites alone.",
    businessProblems: [
      "Manual workflows",
      "Feature gaps",
      "Disconnected systems",
    ],
    deliverables: [
      "Custom application planning",
      "Feature implementation",
      "Scalable architecture",
    ],
    process: standardProcess,
    recommendedTechnologies: ["Next.js", "React", "Node.js"],
    faqs: [
      {
        question: "What kinds of problems justify a custom web application?",
        answer:
          "Manual spreadsheet-based workflows, disconnected business tools, or processes that off-the-shelf software cannot support are the clearest signals — the application is designed around your actual workflow rather than forcing you to adapt to generic software.",
      },
      {
        question:
          "Do you build internal tools as well as customer-facing applications?",
        answer:
          "Yes — internal dashboards, customer portals, and workflow automation tools are all common outcomes of this service, depending on who the end users are.",
      },
    ],
    relatedServices: ["frontend-development", "third-party-api-integrations"],
    cta: { label: "Request Technical Consultation", href: "/contact" },
  },
  {
    family: "custom-web-applications",
    slug: "frontend-development",
    title: "Frontend Development",
    description:
      "Modern frontend engineering for high-quality interfaces and interactions.",
    seo: { title: "Frontend Development for Modern Web Interfaces", description: "We build fast, accessible, and maintainable frontend interfaces using modern frameworks, focused on both user experience and long-term code quality." },
    audience: "Teams needing complex UI delivery or frontend modernization.",
    businessProblems: ["Inconsistent UI quality", "Poor interaction design"],
    deliverables: [
      "Component architecture",
      "Responsive frontend implementation",
      "Performance-first UI",
    ],
    process: standardProcess,
    recommendedTechnologies: ["React", "Next.js", "Tailwind CSS"],
    faqs: [
      {
        question: "Do you work with an existing backend or API?",
        answer:
          "Yes — frontend engagements commonly connect to an existing backend, CMS, or API, with the scope focused on interface, interaction, and component architecture rather than backend logic.",
      },
      {
        question: "Is this separate from a full custom web application build?",
        answer:
          "It can be standalone when the backend already exists, or combined with Custom Web Application Development when both layers need to be built together.",
      },
    ],
    relatedServices: ["custom-web-application-development"],
    cta: { label: "Discuss Frontend Scope", href: "/contact" },
  },
  {
    family: "custom-web-applications",
    slug: "third-party-api-integrations",
    title: "Third-Party & API Integrations",
    description:
      "Integration services connecting websites and apps to external systems.",
    seo: { title: "Third-Party & API Integration Services", description: "We connect your website or app to payment gateways, CRMs, booking systems, and other business tools through reliable, well-tested integrations." },
    audience:
      "Businesses that need data or workflow integration across platforms.",
    businessProblems: [
      "Siloed tools",
      "Manual data transfer",
      "Workflow friction",
    ],
    deliverables: [
      "API integration plan",
      "Integration implementation",
      "Reliability and monitoring checks",
    ],
    process: standardProcess,
    recommendedTechnologies: ["REST APIs", "Webhooks", "Node.js"],
    faqs: [
      {
        question: "What kinds of systems can be integrated?",
        answer:
          "CRMs, payment gateways, email marketing platforms, booking systems, ERPs, and other business software with an available API or webhook are common integration targets.",
      },
      {
        question:
          "What happens if a third-party integration fails after launch?",
        answer:
          "Integrations are built with error handling and monitoring in mind, and ongoing reliability checks can be covered under Website Maintenance & Support.",
      },
    ],
    relatedServices: [
      "custom-web-application-development",
      "website-migration-replatforming",
    ],
    cta: { label: "Request Integration Support", href: "/contact" },
  },
  {
    family: "website-management",
    slug: "website-maintenance-support",
    title: "Website Maintenance & Support",
    description:
      "Ongoing maintenance and technical support to keep websites healthy and secure.",
    seo: { title: "Website Maintenance & Ongoing Support Services", description: "We handle ongoing website maintenance, updates, monitoring, backups, and security, so your site stays reliable without becoming your responsibility." },
    audience:
      "Teams needing reliable long-term technical support after launch.",
    businessProblems: ["Recurring technical issues", "Security update gaps"],
    deliverables: [
      "Maintenance workflow",
      "Issue resolution",
      "Security and health checks",
    ],
    process: standardProcess,
    recommendedTechnologies: ["Cloudflare", "DNS"],
    faqs: [
      {
        question: "What does an ongoing maintenance plan actually cover?",
        answer:
          "Software and dependency updates, security monitoring, backup verification, uptime and performance checks, and technical issue resolution are the core recurring tasks.",
      },
      {
        question: "How is this different from a one-time technical audit?",
        answer:
          "An audit is a point-in-time diagnosis. Maintenance is the ongoing process that prevents the same issues from recurring, including regular monitoring rather than periodic reviews.",
      },
    ],
    relatedServices: ["website-audit-technical-fixes"],
    cta: { label: "Request Website Support", href: "/contact" },
  },
  {
    family: "website-management",
    slug: "website-migration-replatforming",
    title: "Website Migration & Replatforming",
    description:
      "Safe migration planning and execution for platform changes and replatforming.",
    seo: { title: "Website Migration & Replatforming Services", description: "We plan and execute website migrations and platform changes carefully, preserving performance, SEO rankings, and continuity throughout the move." },
    audience: "Businesses moving from legacy stacks or consolidating systems.",
    businessProblems: ["Migration risk", "Platform limitations"],
    deliverables: [
      "Migration roadmap",
      "Content and URL mapping",
      "Launch and post-launch validation",
    ],
    process: standardProcess,
    recommendedTechnologies: ["DNS", "Cloudflare"],
    faqs: [
      {
        question: "Will a migration cause our search rankings to drop?",
        answer:
          "Rankings are not guaranteed to transfer automatically, but a structured migration — preserving URLs, redirects, and metadata — is specifically designed to minimize ranking disruption rather than accepting it as inevitable.",
      },
      {
        question: "How much downtime should we expect during migration?",
        answer:
          "A well-planned migration targets minimal to no visitor-facing downtime, using staged deployment and DNS cutover rather than taking the live site offline during the transition.",
      },
    ],
    relatedServices: [
      "website-audit-technical-fixes",
      "third-party-api-integrations",
    ],
    cta: { label: "Plan a Migration", href: "/contact" },
  },
  {
    family: "website-management",
    slug: "website-audit-technical-fixes",
    title: "Website Audit & Technical Fixes",
    description:
      "Technical audits and implementation fixes for quality, stability, and performance.",
    seo: { title: "Website Audit & Technical Fixes Service", description: "We audit your website for technical, performance, and quality issues, then implement the fixes needed to bring it up to a reliable standard." },
    audience:
      "Teams needing clear diagnosis and corrective implementation work.",
    businessProblems: [
      "Unclear technical debt",
      "Persistent performance issues",
    ],
    deliverables: [
      "Technical audit report",
      "Prioritized fix plan",
      "Implementation support",
    ],
    process: standardProcess,
    recommendedTechnologies: ["Google Search Console", "Core Web Vitals"],
    faqs: [
      {
        question: "What does a technical audit report actually include?",
        answer:
          "A prioritized list of issues covering performance, SEO, security, accessibility, and code quality, ranked by business impact rather than a raw list of every possible finding.",
      },
      {
        question: "Do you also implement the fixes, or just report on them?",
        answer:
          "Both — the audit produces a prioritized fix plan, and implementation support is included to actually resolve the highest-impact issues rather than leaving that work to your internal team.",
      },
    ],
    relatedServices: [
      "website-maintenance-support",
      "website-performance-optimization",
    ],
    cta: { label: "Request Technical Audit", href: "/contact" },
  },
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
