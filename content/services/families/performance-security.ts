import { Service } from "@/lib/content/types";

export const performanceSecurityServices: Service[] = [
  {
    family: "performance-security",
    slug: "website-performance-optimization",
    title: "Website Performance & Speed Optimization",
    description: "Slow websites kill conversions. Every second of delay causes a massive drop in revenue. We tear down your website's architecture and rebuild the critical rendering path to achieve sub-second load times and perfect Google Core Web Vitals scores.",
    seo: { 
      title: "Website Speed & Performance Optimization Services | HA Web Studio", 
      description: "Stop losing customers to slow load times. We optimize your website architecture, caching, and assets to achieve sub-second load times and pass Core Web Vitals." 
    },
    audience: "eCommerce stores, media publishers, and enterprise SaaS companies losing revenue or SEO rankings due to sluggish, bloated websites.",
    outcomes: [
      "Lightning-fast, sub-second perceived load times across all devices.",
      "Green scores on Google's Core Web Vitals (LCP, FID, CLS), boosting SEO.",
      "Lower bounce rates and drastically higher conversion rates.",
      "Reduced server load and hosting costs due to efficient caching."
    ],
    scope: "Deep technical audit of the frontend and backend, followed by code-level implementation of caching, asset compression, lazy loading, and edge network distribution.",
    complexity: "High",
    availability: "Live",
    core: [
      "Core Web Vitals Audit & Diagnosis",
      "Critical Rendering Path Optimization",
      "Image & Video Asset Compression (WebP/AVIF)",
      "JavaScript Payload Reduction & Deferral",
      "Database Query Optimization",
      "Edge Caching / CDN Configuration"
    ],
    addOns: [
      "Headless Architecture Migration (Next.js)",
      "Third-Party Script Tag Management (GTM Cleanup)",
      "Server-Side Rendering (SSR) Implementation",
      "Ongoing Performance Monitoring"
    ],
    recommendations: ["technical-seo-setup", "conversion-rate-optimization", "website-audit-technical-fixes"],
    businessProblems: [
      "The website takes 5+ seconds to load on mobile devices, causing users to abandon the site instantly.",
      "Google Search Console is warning you that your URLs are failing Core Web Vitals.",
      "Your eCommerce store crashes or slows down to a halt during major traffic spikes (Black Friday).",
      "Marketing added 15 different tracking scripts that are choking the browser thread."
    ],
    process: [
      { title: "Diagnostic Profiling", description: "We run deep waterfall analysis using Lighthouse and WebPageTest to isolate exactly which scripts, images, or server requests are causing delays." },
      { title: "Asset Optimization", description: "We automatically convert and compress images, implement lazy loading for off-screen assets, and serve them via a global CDN." },
      { title: "Code Minification", description: "We restructure, defer, or completely remove bloated JavaScript and CSS that is blocking the page from rendering." },
      { title: "Server & Caching Strategy", description: "We configure advanced edge caching (e.g., Cloudflare) so your site is served directly from the node closest to the user." },
      { title: "Verification", description: "We re-run the diagnostics to prove the speed gains and monitor real-world user metrics (RUM) post-launch." }
    ],
    useCases: [
      { title: "eCommerce Speed Rescue", description: "Taking a bloated WooCommerce site from a 6-second load time down to 1.2 seconds by removing unused plugins, optimizing images, and reducing server response time." },
      { title: "SaaS Marketing Site Overhaul", description: "Cleaning up a Next.js site where massive unoptimized hero videos were destroying the Largest Contentful Paint (LCP) score." },
      { title: "Media Publisher Optimization", description: "Restructuring how ads and third-party trackers load on a high-traffic blog to prevent layout shifts (CLS)." }
    ],
    exclusions: [
      "We cannot optimize terrible, ultra-cheap shared hosting servers (we will advise you to upgrade).",
      "Quick-fix caching plugins (we fix the actual code, we don't just put a band-aid over it).",
      "Content creation or design changes."
    ],
    recommendedTechnologies: ["Next.js", "Cloudflare", "Lighthouse", "Vercel"],
    pricing: "Pricing depends on how deep the underlying issues are — straightforward image/asset optimization is more affordable than deeper architectural rendering fixes. We run a diagnostic first so pricing reflects the actual work required, not guesswork.",
    timeline: "A typical performance optimization engagement takes 2–4 weeks, including diagnosis, implementation, and re-testing.",
    faqs: [
      { question: "Will this actually move my Core Web Vitals scores?", answer: "That's the specific goal — we diagnose against Core Web Vitals first, then optimize the rendering path, assets, and JavaScript payload that are actually causing the slowdown, rather than generic tweaks." },
      { question: "Do you work on sites you didn't build?", answer: "Yes, this is commonly requested for existing sites; we start with a technical audit before recommending changes." }
    ],
    cta: { label: "Speed Up My Site", href: "/contact?intent=performance-security" }
  },
  {
    family: "performance-security",
    slug: "website-security-protection",
    title: "Enterprise Security & Protection",
    description: "Don't wait for a data breach to take security seriously. We harden your digital infrastructure against DDoS attacks, SQL injections, brute-force hacking, and malicious spam, ensuring your business stays online and your customer data remains locked down.",
    seo: { 
      title: "Website Security, WAF & Spam Protection Services | HA Web Studio", 
      description: "Secure your digital assets. We implement enterprise-grade firewalls, DDoS protection, and automated backups to keep your website safe from hackers and spam." 
    },
    audience: "Medical practices (HIPAA compliance concerns), financial institutions, eCommerce stores handling credit cards, and high-profile brands targeted by bad actors.",
    outcomes: [
      "Peace of mind knowing your site is protected by enterprise-grade firewalls.",
      "Zero downtime from malicious DDoS attacks or botnets.",
      "Complete elimination of form spam (without annoying users with standard captchas).",
      "Automated, secure backups ensuring you can restore the site instantly if disaster strikes."
    ],
    scope: "Security vulnerability audit, Web Application Firewall (WAF) configuration, malware scanning/removal, backend hardening, and automated backup scheduling.",
    complexity: "Medium",
    availability: "Live",
    core: [
      "Vulnerability & Penetration Scanning",
      "Web Application Firewall (WAF) Setup",
      "DDoS Mitigation & Bot Management",
      "HTTP Security Headers Implementation",
      "Malware Detection & Cleanup",
      "Automated Off-site Backup Configuration"
    ],
    addOns: [
      "Invisible Spam Protection (Cloudflare Turnstile)",
      "Strict Content Security Policy (CSP) Setup",
      "Two-Factor Authentication (2FA) Enforcement",
      "HIPAA/GDPR Compliance Technical Audit"
    ],
    recommendations: ["website-maintenance-support", "website-audit-technical-fixes"],
    businessProblems: [
      "Your inbox is flooded with hundreds of spam form submissions every single day.",
      "The website was previously hacked, defaced, or injected with malicious redirect links.",
      "Your site keeps going offline during random traffic spikes caused by malicious bots.",
      "You have no idea if your customer database is actually secure."
    ],
    process: [
      { title: "Vulnerability Audit", description: "We scan the codebase, server configuration, and third-party plugins for known exploits and weaknesses." },
      { title: "Perimeter Defense", description: "We route your traffic through Cloudflare, configuring strict firewall rules to block malicious IP ranges and known attack vectors." },
      { title: "Application Hardening", description: "We lock down the backend, disable vulnerable file execution, enforce strong passwords, and implement security headers." },
      { title: "Spam Mitigation", description: "We replace frustrating captchas with invisible, behavioral anti-spam tools like Turnstile." },
      { title: "Disaster Recovery", description: "We set up automated, encrypted backups that are stored on a separate physical server for absolute redundancy." }
    ],
    useCases: [
      { title: "Post-Hack Recovery", description: "Cleaning a WordPress site that was injected with malware, removing the backdoor, and hardening the server to prevent future breaches." },
      { title: "DDoS Mitigation", description: "Moving a high-profile media site behind Cloudflare's enterprise network to absorb and deflect a massive, targeted botnet attack." },
      { title: "Form Spam Eradication", description: "Implementing Turnstile on a B2B SaaS site, instantly dropping their spam leads from 50/day down to zero." }
    ],
    exclusions: [
      "Legal compliance consulting (we handle the tech, you need a lawyer for the policy).",
      "Physical server security (we secure the application layer).",
      "Guarantees against zero-day exploits (no system is 100% impenetrable)."
    ],
    recommendedTechnologies: ["Cloudflare", "Turnstile", "AWS Shield"],
    pricing: "Pricing depends on your current risk exposure and which protections are already in place. A vulnerability scan upfront helps us quote accurately rather than applying a one-size-fits-all package.",
    timeline: "Initial hardening typically takes 1–2 weeks; ongoing protection (WAF, monitoring) continues afterward.",
    faqs: [
      { question: "Is this a one-time fix or ongoing protection?", answer: "Both are available — initial hardening (WAF setup, security headers, vulnerability scanning) is a project, and ongoing DDoS mitigation and monitoring can continue as a retainer." }
    ],
    cta: { label: "Secure Your Website", href: "/contact?intent=performance-security" }
  },
  {
    family: "performance-security",
    slug: "website-audit-technical-fixes",
    title: "Technical Audit & Rescue",
    description: "Inherited a broken website from another developer? We perform forensic technical audits to uncover hidden bugs, architectural flaws, and performance bottlenecks—and then we actually go in and fix them.",
    seo: { 
      title: "Technical Website Audit & Bug Fix Services | HA Web Studio", 
      description: "Stop dealing with a broken website. We perform deep technical audits to find the root cause of your bugs, and deploy our senior developers to fix them permanently." 
    },
    audience: "Businesses frustrated with their current website's instability, or teams that have recently taken over a legacy codebase and need to know what they are dealing with.",
    outcomes: [
      "A complete map of your website's 'technical debt'.",
      "Resolution of persistent, annoying bugs that previous developers couldn't fix.",
      "A stable, reliable foundation that you can actually build new features on top of.",
      "Objective, third-party code review before acquiring a digital asset."
    ],
    scope: "Comprehensive forensic audit of the frontend code, backend logic, database, and server infrastructure, followed by a prioritized sprint of development work to execute fixes.",
    complexity: "High",
    availability: "Live",
    core: [
      "Codebase Quality & Architecture Review",
      "Database Structure Analysis",
      "Third-party Dependency Audit",
      "Security & Performance Profiling",
      "Prioritized 'Fix-It' Roadmap",
      "Execution of Critical Patches"
    ],
    addOns: [
      "SEO Impact Audit",
      "Accessibility (WCAG) Audit",
      "Automated Testing (E2E) Setup",
      "Infrastructure Migration Planning"
    ],
    recommendations: ["website-maintenance-support", "website-performance-optimization", "technical-seo-setup"],
    businessProblems: [
      "The website breaks randomly and the current developer doesn't know why.",
      "You are afraid to update content because the CMS is incredibly fragile.",
      "You are about to buy a business and need to know if their custom software is actually built well.",
      "The site relies on outdated plugins or deprecated frameworks that pose a security risk."
    ],
    process: [
      { title: "Forensic Discovery", description: "We gain access to the codebase and server, running automated tools and manual senior-developer reviews to map the architecture." },
      { title: "Issue Triage", description: "We categorize every bug, flaw, or vulnerability by severity (Critical, High, Medium, Low) and business impact." },
      { title: "Strategic Roadmap", description: "We present a clear report explaining what is wrong in plain English, and provide a roadmap for fixing it." },
      { title: "Execution Sprints", description: "We assign our engineers to start tackling the critical issues immediately, stabilizing the platform." },
      { title: "Handoff or Maintenance", description: "We hand the clean codebase back to your internal team, or transition you to our ongoing maintenance SLA." }
    ],
    useCases: [
      { title: "Legacy Code Rescue", description: "Taking over a massive 5-year-old React application, updating all deprecated dependencies, and fixing memory leaks causing server crashes." },
      { title: "M&A Technical Due Diligence", description: "Auditing a custom SaaS platform for a Private Equity firm prior to acquisition to ensure the tech stack was scalable." },
      { title: "E-Commerce Stabilization", description: "Fixing a broken WooCommerce checkout flow that was silently failing on a subset of transactions due to a conflicting plugin." }
    ],
    exclusions: [
      "We will not audit platforms we don't support (e.g., Magento or Drupal).",
      "We do not provide free audits as a sales tactic (this is deep, paid forensic engineering).",
      "We cannot instantly fix fundamentally broken architectures (sometimes a rebuild is required)."
    ],
    recommendedTechnologies: ["Lighthouse", "Checkly", "Sentry", "SonarQube"],
    pricing: "Pricing depends on the size of the codebase and how deep the audit needs to go — a focused review is more affordable than a full architecture and database analysis. We quote after an initial scoping call.",
    timeline: "A technical audit typically takes 1–3 weeks depending on codebase size; implementing the resulting fixes is scoped separately once findings are clear.",
    faqs: [
      { question: "Do you fix the issues you find, or just report them?", answer: "Both are available. We can hand off a prioritized findings report, or implement the fixes directly — whichever suits your team." },
      { question: "We inherited this codebase from another developer — can you take over?", answer: "Yes, this is a common starting point for this service — the audit gives us (and you) a clear picture before any ongoing work begins." }
    ],
    cta: { label: "Audit Your Codebase", href: "/contact?intent=performance-security" }
  }
];
