import { Service } from "@/lib/content/types";

export const maintenanceServices: Service[] = [
  {
    family: "maintenance",
    slug: "website-maintenance-support",
    title: "Premium Maintenance & Ongoing Support",
    description: "A website needs upkeep after launch, not just at launch. We provide ongoing maintenance and technical support to keep your site secure, fast, and running correctly — dependency updates, backups, monitoring, and a direct line for fixes when something breaks.",
    seo: { 
      title: "Website Maintenance, Support & Retainer Services | HA Web Studio", 
      description: "Secure your digital assets. We handle ongoing website maintenance, dependency updates, uptime monitoring, backups, and security so you can focus on your business." 
    },
    audience: "Business owners, marketing directors, and non-technical founders who want peace of mind knowing their website is being actively managed by professionals.",
    outcomes: [
      "A monitored site — issues get caught and flagged instead of sitting unnoticed for months.",
      "Protection against hacking and malware via regular security patching.",
      "Consistent performance speeds, preventing the 'slowdown creep' common in older sites.",
      "A dedicated technical partner you can rely on for content updates."
    ],
    scope: "Retainer-based ongoing technical support covering daily uptime monitoring, weekly security/plugin updates, monthly performance reporting, and dedicated developer hours for new feature requests.",
    complexity: "Low",
    availability: "Live",
    core: [
      "24/7 Uptime & Performance Monitoring",
      "Proactive Dependency & Plugin Updates",
      "Automated Daily Off-site Backups",
      "Continuous Security & Malware Scanning",
      "Dedicated Technical Support Desk",
      "Monthly KPI & Health Reporting"
    ],
    addOns: [
      "Retainer Hours for Design & Content Updates",
      "Ongoing Core Web Vitals Optimization",
      "Priority SLA (Service Level Agreement) Response Times",
      "Staging Environment Syncing"
    ],
    recommendations: ["website-audit-technical-fixes", "website-performance-optimization", "website-security-protection"],
    businessProblems: [
      "You launched a beautiful site 2 years ago, but now it's broken because nobody updated the plugins.",
      "Your marketing team is terrified of breaking the site every time they need to publish a blog post.",
      "You don't have an internal IT team to handle urgent website issues.",
      "You are tired of dealing with slow, unresponsive freelance developers when you need a quick fix."
    ],
    process: [
      { title: "Onboarding & Audit", description: "We run a complete backup and audit of your current tech stack to ensure it is stable before we take over." },
      { title: "Monitoring Setup", description: "We deploy our monitoring scripts to track uptime, broken links, and security vulnerabilities 24/7." },
      { title: "Proactive Updates", description: "We carefully test all software updates on a staging server before pushing them to your live site, preventing downtime." },
      { title: "Ongoing Support", description: "You gain access to our priority ticketing system. Just email us a request, and our developers handle it." },
      { title: "Monthly Reporting", description: "We send you a transparent, non-technical report showing exactly what was updated, backed up, and optimized." }
    ],
    useCases: [
      { title: "eCommerce Protection", description: "Providing a WooCommerce store with daily backups and immediate patch application to ensure no orders are ever lost." },
      { title: "Corporate Site Management", description: "Acting as the outsourced web team for a law firm, handling all partner bio updates and security patches." },
      { title: "SaaS Marketing Support", description: "Managing the Next.js frontend for a SaaS company, allowing their internal engineers to focus strictly on the core product." }
    ],
    exclusions: [
      "Building entirely new websites under a maintenance retainer (that requires a separate project scope).",
      "Providing 24/7 phone support (we operate via a prioritized ticketing system).",
      "Fixing fundamentally broken legacy code without a prior technical audit."
    ],
    recommendedTechnologies: ["GitHub", "Vercel", "Cloudflare", "Checkly"],
    pricing: "This runs as an ongoing monthly retainer rather than a one-time project fee. Pricing depends on your site's complexity and the level of support/response time required.",
    timeline: "Onboarding is quick — typically live within a few days once we have access — and then runs continuously as a monthly retainer.",
    faqs: [
      { question: "What's included?", answer: "Uptime and performance monitoring, proactive dependency and plugin updates, automated daily backups, and continuous security scanning." },
      { question: "What happens if something breaks?", answer: "That's exactly what the retainer covers — monitoring is designed to catch issues early, and we handle fixes as part of the plan." },
      { question: "Do you support sites you didn't originally build?", answer: "Yes, we take on maintenance for existing sites after an initial technical audit to understand what we're working with." }
    ],
    cta: { label: "Protect Your Website", href: "/contact?intent=maintenance" }
  },
  {
    family: "maintenance",
    slug: "website-migration-replatforming",
    title: "Website Migration & Replatforming",
    description: "Moving a website is like moving a house — if you don't pack carefully, things get broken. We plan platform migrations carefully to transfer your data accurately, preserve your existing SEO equity as much as possible, and keep the switch as smooth as possible for your customers.",
    seo: { 
      title: "Website Migration & Replatforming Services | HA Web Studio", 
      description: "Migrate your website safely. We handle complex platform migrations (e.g., WordPress to Next.js) with careful redirect mapping to protect your existing SEO rankings and data." 
    },
    audience: "Established businesses outgrowing their current platform (e.g., moving from WooCommerce to Shopify, or WordPress to a custom Headless architecture) and terrified of losing their Google rankings.",
    outcomes: [
      "Redirect mapping and SEO auditing built to protect your existing search rankings (Google can still take time to re-crawl and re-rank the new URLs).",
      "Complete, accurate transfer of complex databases (users, orders, content).",
      "A carefully planned switchover designed to minimize downtime for your customers.",
      "A faster, more scalable platform that actually supports your business growth."
    ],
    scope: "End-to-end strategic planning, data extraction, 301 redirect mapping, staging environment testing, and live deployment of a platform migration.",
    complexity: "High",
    availability: "Live",
    core: [
      "Pre-Migration SEO & Traffic Audit",
      "Comprehensive 1-to-1 URL Redirect Mapping (301s)",
      "Database Extraction & Transformation (ETL)",
      "Staging Environment Setup & QA Testing",
      "Zero-Downtime DNS Switchover",
      "Post-Launch SEO & Error Monitoring"
    ],
    addOns: [
      "Content Cleanup & Consolidation Strategy",
      "Custom Script Writing for Data Formatting",
      "Legacy Link Reclamation",
      "Team Training on the New Platform"
    ],
    recommendations: ["technical-seo-setup", "website-audit-technical-fixes", "analytics-tracking-setup"],
    businessProblems: [
      "Your current eCommerce platform is too slow, but you are afraid moving to a new one will destroy your sales.",
      "A previous developer botched a migration, and you lost 50% of your organic traffic overnight.",
      "You have 5,000 blog posts on a legacy CMS and no way to easily move them to modern architecture.",
      "You are consolidating multiple regional websites into one global domain and need to handle the redirects."
    ],
    process: [
      { title: "Risk Assessment", description: "We catalog every URL, image, and data point on the current site to ensure nothing gets left behind." },
      { title: "Data Migration", description: "We securely extract your users, orders, and content, transforming the data to fit the architecture of the new platform." },
      { title: "The Redirect Map", description: "The most critical step: we build an exhaustive spreadsheet mapping every old URL to its corresponding new URL, ensuring Google doesn't drop your rankings." },
      { title: "Dry Run (Staging)", description: "We perform a complete test migration on a hidden staging server, allowing you to click through and verify the data." },
      { title: "Go-Live & Monitor", description: "We flip the switch during off-peak hours, immediately monitoring Google Search Console for any 404 errors." }
    ],
    useCases: [
      { title: "Headless Migration", description: "Moving a high-traffic media publisher from a slow WordPress monolith to a fast Next.js frontend." },
      { title: "eCommerce Replatforming", description: "Migrating a complex B2B store from Magento to Shopify Plus, preserving customer accounts and order history." },
      { title: "Domain Consolidation", description: "Merging three acquired competitor websites into one master brand domain, carefully preserving the SEO equity of all three." }
    ],
    exclusions: [
      "We cannot force Google to index the new site instantly (crawling takes time).",
      "Migrating highly encrypted legacy passwords (users usually have to reset their passwords on a new platform).",
      "We will not execute a migration without a proper staging phase."
    ],
    recommendedTechnologies: ["DNS", "Cloudflare", "Screaming Frog", "Next.js"],
    pricing: "Pricing depends on the size of the existing site, how much custom redirect mapping is required, and the complexity of the data migration (content, products, users). Because getting this wrong risks SEO and data loss, we scope it carefully rather than quoting a flat rate upfront.",
    timeline: "Migrations typically take 4–8 weeks, including a staging environment and thorough QA before the live cutover, to minimize downtime and risk.",
    faqs: [
      { question: "Will we lose our search rankings during migration?", answer: "That's the primary risk we manage — a pre-migration SEO/traffic audit and comprehensive 1-to-1 redirect mapping are core parts of this service specifically to protect existing rankings." },
      { question: "What platforms can you migrate from and to?", answer: "We handle migrations between most major CMS and ecommerce platforms — tell us your current and target setup and we'll confirm feasibility." }
    ],
    cta: { label: "Plan Your Migration safely", href: "/contact?intent=maintenance" }
  }
];
