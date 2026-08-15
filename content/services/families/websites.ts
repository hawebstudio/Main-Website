import { Service } from "@/lib/content/types";

export const websitesServices: Service[] = [
  {
    family: "websites",
    slug: "website-planning-strategy",
    title: "Website Planning & Strategy",
    description: "Before writing a single line of code or designing a mockup, we establish the strategic foundation. This ensures your website is architected to meet specific business objectives, target the right audience, and provide a clear ROI, transforming it from a digital brochure into a growth engine.",
    seo: { 
      title: "Website Planning & Strategy Services | HA Web Studio", 
      description: "Strategic website planning, architecture, and requirements gathering to ensure your digital project aligns with business goals and delivers measurable ROI." 
    },
    audience: "B2B service providers, agencies, and enterprise teams preparing for a major website redesign, migration, or launch that cannot afford to fail.",
    outcomes: [
      "A comprehensive digital roadmap aligning business goals with technical solutions.",
      "Clear content architecture and user journey mapping to maximize conversions.",
      "Defined technical requirements to prevent scope creep during development.",
      "Competitive analysis highlighting market opportunities."
    ],
    scope: "A dedicated discovery phase involving stakeholder interviews, audience research, sitemap creation, wireframing, and technology stack selection. This engagement concludes with a comprehensive strategy document and actionable project brief.",
    complexity: "Medium",
    availability: "Live",
    core: [
      "Stakeholder Discovery Workshops",
      "Information Architecture & Sitemap Creation",
      "User Journey Mapping & Persona Development",
      "Content Strategy & Gap Analysis",
      "Technology Stack & CMS Selection",
      "Project Roadmap & Phased Delivery Plan"
    ],
    addOns: [
      "Comprehensive SEO Strategy & Keyword Mapping",
      "Deep-dive Competitor UX Analysis",
      "Brand Voice & Messaging Guidelines"
    ],
    recommendations: ["website-ui-ux-design", "business-website-development", "technical-seo-setup"],
    businessProblems: [
      "Investing heavily in websites that look good but fail to generate leads.",
      "Unclear website structure causing high bounce rates and user confusion.",
      "Development projects going over budget due to poor initial scoping.",
      "Lack of alignment between marketing, sales, and leadership on the website's purpose."
    ],
    process: [
      { title: "Discovery & Alignment", description: "We conduct deep-dive interviews with your key stakeholders to understand business objectives, target audiences, and historical pain points." },
      { title: "Research & Analysis", description: "We audit your existing digital assets, analyze direct competitors, and identify opportunities for differentiation and improvement." },
      { title: "Architecture & Mapping", description: "We develop a new sitemap, map out critical user journeys, and define the content hierarchy necessary to guide visitors toward conversion." },
      { title: "Strategic Roadmap Delivery", description: "We present a comprehensive strategy document detailing the recommended technology stack, project phases, and actionable next steps." }
    ],
    useCases: [
      { title: "Enterprise Redesign Preparation", description: "Laying the groundwork before investing six figures into a complex corporate website overhaul." },
      { title: "Post-Merger Digital Consolidation", description: "Strategizing how to combine multiple brand websites into a single, cohesive digital experience without losing SEO value." },
      { title: "Pivot in Business Model", description: "Re-architecting the digital presence to align with a new target market or service offering." }
    ],
    exclusions: [
      "Immediate design execution without research.",
      "Quick-fix coding or minor website updates.",
      "Projects with budgets under $5k looking for templates."
    ],
    recommendedTechnologies: ["Figma", "Miro", "Notion"],
    pricing: "This is usually run as a fixed-fee engagement priced separately from development, or bundled into the cost of a full build if you're moving straight into design and development afterward. The price depends on how many stakeholders are involved, how much existing research or content already exists, and how many pages or user journeys need to be mapped.",
    timeline: "A standalone strategy engagement typically takes 2–4 weeks, covering discovery workshops, research, and the final roadmap document.",
    faqs: [
      { question: "Do I need this if I already know what I want?", answer: "Not always. If your requirements are already clear and documented, we can skip straight to design or development. This engagement is most useful when stakeholders disagree on direction or the scope is genuinely complex." },
      { question: "Does this replace the design phase?", answer: "No. Strategy defines the roadmap, sitemap, and requirements; UI/UX design and development are separate, later phases." }
    ],
    cta: { label: "Schedule a Strategy Session", href: "/contact?intent=start-project" }
  },
  {
    family: "websites",
    slug: "business-website-development",
    title: "Business Website Development",
    description: "We engineer high-performance, professional business websites designed to establish immediate trust, articulate complex value propositions clearly, and convert anonymous visitors into qualified leads. Built on modern, scalable technologies.",
    seo: { 
      title: "Professional Business Website Development | HA Web Studio", 
      description: "Custom, high-performance business website development focused on B2B lead generation, speed, security, and a clear user experience." 
    },
    audience: "Professional service firms, B2B technology companies, and established organizations looking to modernize their digital presence and drive inbound leads.",
    outcomes: [
      "A lightning-fast, highly responsive digital experience across all devices.",
      "A scalable architecture ready to grow with your business.",
      "A conversion-optimized foundation designed to capture high-value leads.",
      "Enhanced brand perception through premium aesthetics and interactions."
    ],
    scope: "End-to-end frontend and backend development of a custom business website, including responsive implementation, CMS integration, basic SEO foundations, and production deployment.",
    complexity: "Medium",
    availability: "Live",
    core: [
      "Custom Responsive Frontend Development",
      "Headless CMS Integration (Sanity, Contentful)",
      "Dynamic Routing & Page Generation",
      "Lead Capture Forms & CRM Integration",
      "Technical SEO & Metadata Foundations",
      "Production Deployment & Quality Assurance"
    ],
    addOns: [
      "Advanced Animation & Micro-interactions",
      "Multi-language (Internationalization) Support",
      "WhatsApp Business Integration",
      "Custom Analytics & Event Tracking"
    ],
    recommendations: ["website-planning-strategy", "cms-dynamic-content-development", "website-maintenance-support"],
    businessProblems: [
      "Current website reflects poorly on the quality of services offered.",
      "Extremely slow load times affecting search rankings and user patience.",
      "Inability for the marketing team to update content without developer intervention.",
      "Low conversion rates due to confusing navigation and weak calls-to-action."
    ],
    process: [
      { title: "Technical Architecture", description: "Setting up the project repository, configuring the build tools (Next.js, Tailwind), and defining the data schemas." },
      { title: "Component Development", description: "Building out a reusable design system and custom UI components tailored to your brand." },
      { title: "CMS & Data Integration", description: "Connecting the frontend to a headless CMS, so dynamic content renders correctly and loads quickly." },
      { title: "Testing & QA", description: "Rigorous testing across modern browsers, devices, and network speeds to ensure flawless execution." },
      { title: "Launch & Handoff", description: "Deploying to a global CDN (Vercel), conducting final live tests, and training your team on content management." }
    ],
    useCases: [
      { title: "B2B Agency Portfolio", description: "A high-end showcase of case studies and services designed to attract enterprise clients." },
      { title: "SaaS Marketing Site", description: "A feature-rich website explaining complex software solutions, pricing, and integration capabilities." },
      { title: "Consulting Firm Presence", description: "A professional hub establishing thought leadership through insights, whitepapers, and partner profiles." }
    ],
    exclusions: [
      "Complex e-commerce storefronts with thousands of SKUs (see our E-commerce services).",
      "Custom web applications or SaaS platforms (see our Systems & Integrations).",
      "WordPress template customization."
    ],
    recommendedTechnologies: ["Next.js", "React", "Tailwind CSS", "Vercel"],
    pricing: "Business websites typically range from $3,000 to $25,000+ depending on the number of pages, the complexity of custom functionality, CMS requirements, and how much content and design work is needed. We scope every project individually and provide a fixed quote before work begins.",
    timeline: "Most business websites take roughly 4–8 weeks from kickoff to launch. Timelines depend on how quickly content and feedback come back to us, the number of page templates required, and whether third-party integrations are involved.",
    faqs: [
      { question: "What's included in the price?", answer: "Custom responsive frontend development, CMS setup, lead capture forms, basic technical SEO foundations, and deployment. Ongoing content entry and marketing copywriting are not included." },
      { question: "Do you work with an existing website or brand?", answer: "Yes. We regularly build on top of existing branding and content, and can also advise on what needs updating." },
      { question: "What do you need from me to get started?", answer: "Access to your current site (if any), any existing brand assets, and a clear point of contact for feedback rounds. We'll guide you through the rest during discovery." }
    ],
    cta: { label: "Start Your Website Build", href: "/contact?intent=start-project" }
  },
  {
    family: "websites",
    slug: "website-redesign",
    title: "Website Redesign & Modernization",
    description: "We revitalize aging digital assets. Our redesign process goes beyond fresh paint—we completely overhaul the user experience, underlying technology, and conversion pathways while strictly protecting your hard-earned SEO authority and historical data.",
    seo: { 
      title: "Website Redesign & Modernization Services | HA Web Studio", 
      description: "Transform your outdated website into a modern, high-converting digital asset. We improve UX/UI, speed, and messaging while preserving your SEO rankings." 
    },
    audience: "Established companies with legacy websites that are hindering sales, damaging brand perception, or suffering from mounting technical debt.",
    outcomes: [
      "A modernized visual identity that aligns with your current market position.",
      "Significantly improved Core Web Vitals and page load speeds.",
      "Protected and mapped SEO authority, preventing traffic drops post-launch.",
      "Streamlined user journeys that increase conversion rates."
    ],
    scope: "A comprehensive teardown and rebuild. Includes UX audit, visual redesign, complete front-end redevelopment, content migration strategy, and 301 redirect mapping to preserve existing SEO value.",
    complexity: "Medium",
    availability: "Live",
    core: [
      "Legacy System & UX Audit",
      "Modern Visual Redesign & Prototyping",
      "Front-end Redevelopment (Next.js/React)",
      "Content Migration & Structuring",
      "Meticulous 301 Redirect Mapping",
      "SEO Preservation Strategy"
    ],
    addOns: [
      "Content Rewrite & Refresh",
      "New Headless CMS Implementation",
      "Conversion Rate Optimization (CRO) Audit"
    ],
    recommendations: ["website-audit-technical-fixes", "analytics-tracking-setup", "seo-search-visibility"],
    businessProblems: [
      "Brand has evolved but the website still looks like it's from 2015.",
      "Competitors are winning deals because their digital presence implies higher quality.",
      "Fear of losing organic search traffic during a platform migration.",
      "Mobile experience is broken or frustrating for users."
    ],
    process: [
      { title: "Audit & Benchmarking", description: "We analyze your current site's performance, UX bottlenecks, and SEO profile to establish a baseline." },
      { title: "Redesign & Prototyping", description: "We create a modernized design system and interactive prototypes for approval, focusing on usability and brand alignment." },
      { title: "Migration Planning", description: "We map every existing URL to its new counterpart, ensuring no dead links and preserving search engine equity." },
      { title: "Development & Replatforming", description: "We build the new site on a modern stack, migrate the content, and implement the redirects." },
      { title: "Soft Launch & Monitoring", description: "We launch the site, immediately monitoring 404 errors, indexing status, and traffic stability." }
    ],
    useCases: [
      { title: "Rebranding Rollout", description: "Aligning a company's main digital touchpoint with a massive offline rebranding effort." },
      { title: "Platform Escape", description: "Moving away from a restrictive, slow legacy CMS (like older WordPress builds or proprietary platforms) to a modern headless architecture." },
      { title: "Performance Overhaul", description: "Rebuilding a bloated site specifically to pass Google's Core Web Vitals and improve ad quality scores." }
    ],
    exclusions: [
      "Partial redesigns of single pages on broken legacy codebases.",
      "Projects where content mapping and SEO preservation are ignored.",
      "Direct clones of competitor websites."
    ],
    recommendedTechnologies: ["Next.js", "Tailwind CSS", "Figma"],
    pricing: "A custom redesign typically starts around $5,000 and scales based on page volume, custom functionality, and complexity. We provide a detailed scope and fixed price before beginning any work.",
    timeline: "Redesigns generally take 4–8 weeks. More complex projects — large page counts, custom integrations, or a full content migration — can extend that to 10+ weeks.",
    faqs: [
      { question: "Can you migrate my current content and SEO value?", answer: "Yes — content migration and structuring is part of the process, and we map old URLs to new ones to preserve existing search rankings." },
      { question: "Do I need to be redesigning everything at once?", answer: "No. We can scope a redesign around specific pages or sections if a full rebuild isn't necessary yet." }
    ],
    cta: { label: "Plan Your Redesign", href: "/contact?intent=start-project" }
  },
  {
    family: "websites",
    slug: "landing-page-development",
    title: "High-Conversion Landing Pages",
    description: "We engineer hyper-focused, lightning-fast landing pages designed for a single purpose: conversion. Built for paid ad campaigns, product launches, or lead magnets, these pages eliminate distractions and maximize your return on ad spend (ROAS).",
    seo: { 
      title: "High-Conversion Landing Page Development | HA Web Studio", 
      description: "Custom landing pages engineered for paid campaigns and product launches. We focus on speed, persuasive UX, and integrated conversion tracking." 
    },
    audience: "Growth teams, performance marketers, and founders running expensive paid media campaigns or launching new products.",
    outcomes: [
      "Maximized conversion rates for specific campaigns.",
      "Sub-second load times that reduce bounce rates from paid clicks.",
      "Crystal-clear analytics and event tracking for ROAS measurement.",
      "Rapid deployment for time-sensitive campaigns."
    ],
    scope: "Design, copywriting assistance, development, and tracking integration for a single-purpose conversion page (and associated thank-you page).",
    complexity: "Low",
    availability: "Live",
    core: [
      "Persuasive UX & Visual Design",
      "Distraction-free Development",
      "Lead Capture / CRM Integration",
      "Thank You / Success Page Creation",
      "Pixel & Event Tracking Setup"
    ],
    addOns: [
      "A/B Testing Infrastructure Setup",
      "Copywriting & Messaging Optimization",
      "Dynamic Text Replacement (for Ads)"
    ],
    recommendations: ["conversion-rate-optimization", "analytics-tracking-setup"],
    businessProblems: [
      "High ad spend yielding low conversion rates due to generic homepage routing.",
      "Slow landing pages causing users to bounce before the offer loads.",
      "Inability to track which specific ads generated which specific leads.",
      "Marketing team blocked by slow development cycles for campaign launches."
    ],
    process: [
      { title: "Offer & Audience Analysis", description: "We align with your marketing team on the specific offer, the traffic source, and the target persona." },
      { title: "Wireframing & Copy Alignment", description: "We structure the page to guide the user naturally toward the call-to-action, ensuring copy and design work together." },
      { title: "Rapid Development", description: "We build the page using optimized, lightweight code to ensure near-instant load times." },
      { title: "Tracking Integration", description: "We connect your CRM and configure pixels (Meta, Google, LinkedIn) to ensure every conversion is attributed." }
    ],
    useCases: [
      { title: "Paid Search Campaigns", description: "A tightly relevant page matching a specific Google Ads search intent to maximize Quality Score." },
      { title: "Webinar Registration", description: "A high-urgency page designed to capture sign-ups for an upcoming live event." },
      { title: "Lead Magnet Download", description: "A frictionless gated content page offering a whitepaper in exchange for contact details." }
    ],
    exclusions: [
      "Multi-page website structures.",
      "Complex backend processing or user accounts.",
      "Ongoing ad management (we build the pages, you run the ads)."
    ],
    recommendedTechnologies: ["Next.js", "Tailwind CSS", "Framer Motion"],
    pricing: "Landing pages are typically our most affordable website build, since the scope is a single page rather than a full site. The exact price depends on the design complexity, whether it needs CRM/lead-capture integration, and how many variants you need for A/B testing.",
    timeline: "A single landing page usually takes 1–2 weeks from kickoff to launch.",
    faqs: [
      { question: "Can this connect to my CRM or ad campaigns?", answer: "Yes — lead capture and CRM integration, along with a dedicated thank-you/success page, are part of the standard scope." },
      { question: "Can I get multiple landing pages for different campaigns?", answer: "Yes, this is common for paid ad campaigns. Let us know your campaign structure and we'll scope accordingly." }
    ],
    cta: { label: "Build a Landing Page", href: "/contact?intent=start-project" }
  },
  {
    family: "websites",
    slug: "website-launch-infrastructure-setup",
    title: "Website Launch & Infrastructure Setup",
    description: "A well-designed website still needs to stay up under traffic. We configure hosting, global CDNs, custom domains, and CI/CD pipelines so your site stays available, loads quickly worldwide, and is protected against common attacks.",
    seo: { 
      title: "Website Infrastructure & Launch Setup | HA Web Studio", 
      description: "Enterprise-grade hosting configuration, DNS setup, CDN integration, and CI/CD pipelines for secure, high-performance website launches." 
    },
    audience: "Businesses migrating to modern web stacks (like Next.js) that need reliable, scalable, and secure deployment infrastructure.",
    outcomes: [
      "Global content delivery for millisecond latency worldwide.",
      "Automated deployment pipelines (push to live).",
      "Bank-grade SSL security and DDoS protection.",
      "Zero-downtime deployments and easy rollbacks."
    ],
    scope: "Configuration of Vercel/AWS/Cloudflare, DNS management, SSL provisioning, and setting up automated GitHub deployment actions.",
    complexity: "Medium",
    availability: "Live",
    core: [
      "Edge Hosting Configuration (Vercel/Netlify)",
      "DNS Management & Domain Routing",
      "Global CDN Setup & Caching Rules",
      "SSL Certificate Provisioning & HTTPS Enforcement",
      "CI/CD Pipeline Configuration (GitHub Actions)",
      "Environment Variable & Secret Management"
    ],
    addOns: [
      "Staging & Preview Environments Setup",
      "Web Application Firewall (WAF) Configuration",
      "Uptime Monitoring & Alerting Setup"
    ],
    recommendations: ["website-security-protection", "website-maintenance-support"],
    businessProblems: [
      "Website crashes during high-traffic marketing events or product launches.",
      "Manual, error-prone deployment processes causing downtime.",
      "Insecure (HTTP) warnings scaring away potential customers.",
      "Slow load times for international visitors due to poor server location."
    ],
    process: [
      { title: "Infrastructure Audit", description: "We review your current domain registrar, DNS records, and hosting requirements." },
      { title: "Pipeline Configuration", description: "We connect your code repository to a modern hosting provider and configure automated build steps." },
      { title: "Security & Edge Setup", description: "We provision SSL, configure the CDN for optimal caching, and secure your environment variables." },
      { title: "DNS Cutover", description: "We carefully update DNS records to point to the new infrastructure, to avoid downtime during the switch." }
    ],
    useCases: [
      { title: "Modern Stack Migration", description: "Moving a legacy PHP application to a decoupled, Edge-hosted Next.js architecture." },
      { title: "High-Traffic Event Preparation", description: "Hardening infrastructure to handle an expected surge from a television appearance or major PR push." },
      { title: "Multi-Environment Workflow", description: "Setting up isolated Development, Staging, and Production environments for a growing engineering team." }
    ],
    exclusions: [
      "Managing legacy on-premise hardware.",
      "Fixing fundamentally broken application code (this is infrastructure only).",
      "Cheap shared hosting configurations (e.g., cPanel/HostGator)."
    ],
    recommendedTechnologies: ["Vercel", "Cloudflare", "GitHub Actions", "AWS"],
    pricing: "This is usually scoped as part of a larger build, but can be handled standalone for an existing site. Cost depends on your hosting provider, DNS complexity, and whether a CDN and staging environment are required.",
    timeline: "Infrastructure setup on its own typically takes a few days to a week, assuming domain and DNS access is available from day one.",
    faqs: [
      { question: "Do you work with my existing hosting provider?", answer: "In most cases, yes. If your current setup can't reliably support performance and security best practices, we'll flag that and recommend alternatives." },
      { question: "What happens if something goes wrong at launch?", answer: "We test thoroughly in a staging environment before pointing DNS to production, and remain available immediately post-launch to resolve any issues." }
    ],
    cta: { label: "Secure Your Infrastructure", href: "/contact?intent=start-project" }
  },
  {
    family: "websites",
    slug: "cms-dynamic-content-development",
    title: "Headless CMS & Dynamic Content",
    description: "Let your marketing team publish and edit content without needing a developer. We implement headless Content Management Systems that separate your content from the code, so content changes don't require a code deploy.",
    seo: { 
      title: "Headless CMS Integration & Development | HA Web Studio", 
      description: "Headless CMS integration (Sanity, Contentful) so your team can edit content without a developer. Scalable content architecture for Next.js websites." 
    },
    audience: "Content-heavy organizations, media publishers, and marketing teams tired of relying on developers for basic website updates.",
    outcomes: [
      "Total marketing independence for publishing and updating content.",
      "A structured, reusable content architecture (create once, publish everywhere).",
      "Elimination of CMS-bloat that slows down traditional platforms like WordPress.",
      "Secure, API-driven content delivery."
    ],
    scope: "Selection, schema design, and integration of a headless CMS (e.g., Sanity.io). Includes building the editorial studio and wiring data to the Next.js frontend.",
    complexity: "Medium",
    availability: "Live",
    core: [
      "CMS Platform Selection & Setup",
      "Content Modeling & Schema Architecture",
      "Editorial Interface Customization",
      "Frontend API Integration (GraphQL/REST)",
      "Real-time Preview Setup",
      "Editor Training & Documentation"
    ],
    addOns: [
      "Automated Content Migration via Scripting",
      "Advanced Localization & Multi-language Routing",
      "Content Versioning & Approval Workflows"
    ],
    recommendations: ["business-website-development", "seo-search-visibility", "technical-seo-setup"],
    businessProblems: [
      "Marketing teams waiting weeks for developers to publish a simple blog post.",
      "Inconsistent design caused by WYSIWYG editors breaking site layouts.",
      "Content locked in a legacy system, making omnichannel distribution impossible.",
      "Security vulnerabilities associated with monolithic, plugin-heavy CMS platforms."
    ],
    process: [
      { title: "Content Modeling", description: "We map out your content types (Articles, Authors, Case Studies) and define their relationships and fields." },
      { title: "Studio Configuration", description: "We build and deploy the editor interface, customizing inputs to ensure data is clean and structured." },
      { title: "Frontend Wiring", description: "We connect your Next.js application to the CMS API, ensuring dynamic routes generate correctly and efficiently." },
      { title: "Workflow & Preview Setup", description: "We configure draft modes so your team can preview unpublished content live on the site before hitting publish." },
      { title: "Training", description: "We conduct a handover session teaching your editorial team how to use their new, custom-built studio." }
    ],
    useCases: [
      { title: "Resource Center Development", description: "Building a complex library of whitepapers, webinars, and articles with advanced filtering and taxonomy." },
      { title: "Multi-regional Corporate Site", description: "Implementing a system where regional managers can update content specific to their locales with fallback languages." },
      { title: "Dynamic Portfolio Management", description: "Allowing an agency to easily add new case studies, team members, and services without touching code." }
    ],
    exclusions: [
      "Traditional WordPress theme development.",
      "Data entry (we build the system, your team inputs the content).",
      "Writing the actual marketing copy."
    ],
    recommendedTechnologies: ["Sanity", "Contentful", "Next.js"],
    pricing: "Pricing depends on which CMS platform fits your needs, how many content types need to be modeled, and how customized the editorial interface needs to be for your team. This is often scoped alongside a new build or redesign rather than as a standalone line item.",
    timeline: "CMS setup and content modeling typically takes 2—4 weeks, run in parallel with the rest of a website build.",
    faqs: [
      { question: "Will my team be able to update content without a developer?", answer: "Yes — that's the point of the CMS setup. We configure an editorial interface your team can use directly." },
      { question: "Can you migrate content from our current CMS?", answer: "Yes, content migration between platforms is something we regularly handle as part of this scope." }
    ],
    cta: { label: "Implement a Headless CMS", href: "/contact?intent=start-project" }
  }
];
