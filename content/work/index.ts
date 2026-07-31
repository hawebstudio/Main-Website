import type { Project } from "@/lib/content/types";

export const projects: Project[] = [
  {
    slug: "ha-web-studio-website",
    title: "HA Web Studio Website",
    description:
      "The studio platform that powers HA Web Studio marketing, services, solutions, and publishing workflows.",
    seo: {
      title: "Building the HA Web Studio Marketing Platform",
      description:
        "The connected marketing platform powering HA Web Studio's services, solutions, work, and publishing workflows in one structured Next.js system.",
    },
    category: "internal",
    lifecycle: "live",
    year: 2026,
    featured: true,
    whoFor:
      "HA Web Studio internal team and prospective clients evaluating capabilities.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "MDX"],
    url: "https://hawebstudio.com",
    publicLinks: [{ label: "Website", url: "https://hawebstudio.com" }],
    scope:
      "End-to-end website system covering services, solutions, work evidence, and content publishing.",
    goals: [
      "Create a premium, problem-first commercial website",
      "Unify services, solutions, and evidence hubs under one architecture",
      "Support SEO and AI retrieval with structured content",
    ],
    constraints: [
      "No fabricated metrics or outcomes",
      "Need to keep pages maintainable as content grows",
      "Strong performance and accessibility requirements",
    ],
    context:
      "The website was built as the core commercial platform for HA Web Studio, combining editorial design direction with a scalable content architecture.",
    challenge:
      "The main challenge was balancing premium design with maintainable content systems while connecting services, solutions, work, case studies, and insights.",
    responsibilities: [
      "Information architecture",
      "UX and UI system design",
      "Frontend implementation",
      "Content and SEO structure",
    ],
    architecture:
      "Implemented with Next.js App Router and a structured content model to keep domain pages reusable and easy to expand.",
    implementation:
      "Built modular sections for service discovery, solution mapping, and evidence-first project storytelling with route-based hubs.",
    keyFeatures: [
      "Services Hub with category and outcome mapping",
      "Solutions Hub with problem-first navigation",
      "Evidence-oriented Work Hub and project templates",
      "Structured metadata and JSON-LD support",
    ],
    technicalHighlights: [
      "Server Components by default",
      "Reusable content domain models",
      "Structured internal linking patterns",
      "Performance-aware section architecture",
    ],
    lessonsLearned:
      "Clear content relationships are as important as visual polish. Strong linking between domains improves both usability and retrieval quality.",
    relatedServiceSlugs: [
      "business-website-development",
      "website-redesign",
      "technical-seo-setup",
      "analytics-tracking-setup",
    ],
    relatedTechnologySlugs: ["nextjs"],
    relatedInsightSlugs: ["why-performance-matters"],
    relatedCaseStudySlugs: [
      "ha-web-studio-architecture",
      "analytics-tracking-implementation",
      "search-visibility-and-ai-search-foundation",
    ],
    relatedSolutionLinks: [
      { label: "Need a Website", href: "/problems#need-a-website" },
      { label: "Improve Conversions", href: "/problems#improve-conversions" },
    ],
  },
  {
    slug: "ha-ui-design-system",
    title: "HA UI Design System",
    description:
      "Internal design system project focused on reusable components, consistency, and accessibility.",
    seo: {
      title: "HA UI Design System: Reusable Component Library",
      description:
        "An internal design system project focused on reusable, accessible components that keep every HA Web Studio build consistent and fast to ship.",
    },
    category: "internal",
    lifecycle: "live",
    year: 2026,
    featured: false,
    whoFor:
      "HA Web Studio team and future project builds requiring repeatable UI quality.",
    technologies: ["React", "TypeScript", "Tailwind CSS"],
    url: "https://hawebstudio.com",
    publicLinks: [{ label: "Website", url: "https://hawebstudio.com" }],
    scope:
      "Reusable component foundation for faster and more consistent project delivery.",
    context:
      "Developed to reduce repeated UI implementation effort and improve consistency across studio projects.",
    challenge:
      "Balancing component flexibility with clear conventions and maintainability.",
    responsibilities: [
      "Component architecture",
      "Accessibility standards",
      "Developer documentation",
    ],
    architecture:
      "Component primitives and composition patterns separated to keep the system modular and evolvable.",
    implementation:
      "Established reusable UI patterns and naming conventions for faster implementation cycles.",
    keyFeatures: [
      "Reusable component primitives",
      "Design token alignment",
      "Accessibility-focused defaults",
    ],
    technicalHighlights: [
      "Typed component APIs",
      "Systematic variant handling",
      "Composable UI building blocks",
    ],
    lessonsLearned:
      "A system only scales when constraints are as clear as the available flexibility.",
    relatedServiceSlugs: [
      "frontend-development",
      "business-website-development",
    ],
    relatedTechnologySlugs: ["nextjs"],
    relatedCaseStudySlugs: ["ha-web-studio-architecture"],
    relatedSolutionLinks: [
      { label: "Need a Website", href: "/problems#need-a-website" },
    ],
  },
  {
    slug: "ms-signature-scents",
    title: "MS Signature Scents",
    description:
      "A full-stack ecommerce storefront for a fine attar fragrance brand, with a CMS-driven catalogue and Razorpay checkout.",
    seo: {
      title: "MS Signature Scents: Ecommerce Storefront Build",
      description:
        "A full-stack ecommerce storefront for a fine attar fragrance brand, featuring a CMS-driven catalogue, wishlist, and verified Razorpay checkout.",
    },
    category: "client",
    lifecycle: "live",
    year: 2026,
    cover: {
      src: "/images/ms-signature-scents/cover.png",
      alt: "",
    },
    gallery: [
      {
        src: "/images/ms-signature-scents/gallery1.png",
        alt: "",
      },
      {
        src: "/images/ms-signature-scents/gallery2.png",
        alt: "",
      },
      {
        src: "/images/ms-signature-scents/gallery3.png",
        alt: "",
      },
      {
        src: "/images/ms-signature-scents/gallery4.png",
        alt: "",
      },
    ],
    featured: true,
    whoFor:
      "A fragrance brand needing a fast, premium storefront with a checkout flow built for the Indian market.",
    url: "https://mssignaturescents.com",
    publicLinks: [
      { label: "Website", url: "https://mssignaturescents.com" },
      {
        label: "Instagram",
        url: "https://www.instagram.com/ms_signature_scents/",
      },
      { label: "Amazon", url: "https://www.amazon.in/s?k=MS+Signature+Scents" },
    ],
    technologies: [
      "Next.js",
      "TypeScript",
      "Prisma",
      "Sanity CMS",
      "Razorpay",
      "Tailwind CSS",
    ],
    scope:
      "End-to-end ecommerce platform covering catalogue management, cart and wishlist, checkout, and order fulfillment.",
    goals: [
      "Deliver fast, SEO-ready product and category pages",
      "Let the brand manage products and content without a redeploy",
      "Support a full Razorpay checkout with verified payments",
    ],
    constraints: [
      "Payment flow needed to be signature-verified before order confirmation",
      "Product catalogue needed to stay editable by non-technical staff",
    ],
    context:
      "Built as a production storefront for a fragrance brand specializing in alcohol-free attar oils, combining a premium editorial feel with real commerce infrastructure.",
    challenge:
      "Balancing an immersive, animation-driven storefront experience with server-rendered performance, SEO, and a secure checkout flow.",
    responsibilities: [
      "Full-stack architecture",
      "CMS and data modeling",
      "Payment integration",
      "UI and interaction design",
    ],
    architecture:
      "Next.js App Router with Server Components for product and category data, Prisma on Neon Postgres for orders, carts, and addresses, and Sanity CMS for catalogue and editorial content via GROQ with short-interval ISR.",
    implementation:
      "Implemented server-side Razorpay order creation with HMAC-SHA256 signature verification, persistent cart and wishlist state synced across tabs, automatic pincode-to-address lookup, and full shipping address management at checkout.",
    keyFeatures: [
      "CMS-managed product catalogue with ISR revalidation",
      "Razorpay checkout with signature-verified payments",
      "Persistent cart and wishlist across sessions",
      "Real-time pincode lookup for address entry",
      "Full shipping address CRUD with default-address handling",
    ],
    technicalHighlights: [
      "Server Components for product/category data-fetching",
      "Prisma-modeled orders, carts, reviews, and addresses on Neon Postgres",
      "HMAC-verified payment confirmation",
      "Framer Motion scroll-driven product storytelling",
    ],
    lessonsLearned:
      "A premium storefront feel and a maintainable content layer are not in tension when the CMS and commerce data are modeled separately from the start.",
    relatedServiceSlugs: [
      "ecommerce-development",
      "custom-web-application-development",
      "technical-seo-setup",
    ],
    relatedTechnologySlugs: ["nextjs"],
    relatedInsightSlugs: ["why-performance-matters"],
    relatedCaseStudySlugs: ["cms-integration", "payment-gateway-integration"],
    relatedSolutionLinks: [
      { label: "Need a Website", href: "/problems#need-a-website" },
      { label: "Improve Conversions", href: "/problems#improve-conversions" },
    ],
  },
  {
    slug: "cintegrate",
    title: "Cintegrate",
    description:
      "An AI-assisted video creation platform that turns a story idea into structured scenes, narration, and video output through one pipeline.",
    seo: {
      title: "Cintegrate: AI-Assisted Video Creation Platform",
      description:
        "An AI-assisted platform that turns a story idea into structured scenes, narration, and finished video output through one connected pipeline.",
    },
    category: "personal",
    lifecycle: "in-progress",
    year: 2026,
    featured: true,
    whoFor:
      "Creators who want to go from idea to structured video project without juggling separate scripting, scene, and voice tools.",
    cover: {
      src: "/images/cintegrate/cover.png",
      alt: "",
    },
    gallery: [
      {
        src: "/images/cintegrate/gallery1.png",
        alt: "",
      },
      {
        src: "/images/cintegrate/gallery2.png",
        alt: "",
      },
      {
        src: "/images/cintegrate/gallery3.png",
        alt: "",
      },
    ],
    url: "https://dev.cintegrate.site",
    publicLinks: [
      {
        label: "Website Beta",
        url: "https://dev.cintegrate.site",
      },
      {
        label: "Backend Source",
        url: "https://github.com/benazeem/Cintegrate-backend",
      },
    ],
    technologies: [
      "React",
      "TypeScript",
      "Redux Toolkit",
      "Node.js",
      "Express",
      "MongoDB",
    ],
    scope:
      "SaaS platform covering authenticated project management, a story-to-scene pipeline, narration data, and media asset handling, with AI generation providers and rendering in active development.",
    goals: [
      "Build a connected pipeline from idea to structured video project",
      "Design a modular backend that can plug in new AI providers without rework",
      "Support multi-project creator workflows with credits and plan infrastructure",
    ],
    constraints: [
      "Currently in beta: AI generation providers and the rendering pipeline are still in active development",
      "Needs typed, resilient contracts between frontend and backend as new pipeline stages are added",
    ],
    context:
      "Built to treat story writing, scene planning, narration, and asset generation as one connected pipeline rather than separate disconnected tools.",
    challenge:
      "Designing authenticated, multi-step project state that stays consistent across story, scene, and narration stages while leaving room for AI providers to plug into each stage later.",
    responsibilities: [
      "Frontend architecture",
      "Backend API and data modeling",
      "Authentication and session handling",
      "Media asset and narration data design",
    ],
    architecture:
      "React 19 and TypeScript frontend with Redux Toolkit and RTK Query for state and API caching, route-level auth guards, and typed domain models for projects, stories, scenes, and narration. Modular Node.js/Express backend on MongoDB, with JWT auth, CSRF protection, and AWS S3-compatible storage for media assets.",
    implementation:
      "Implemented centralized API integration with credentialed requests, CSRF header injection, and automatic session-refresh retry on the frontend, paired with a feature-sliced backend where each domain (auth, projects, stories, scenes, narration, assets) owns its own routes, validation, and business logic.",
    keyFeatures: [
      "Story → scene → narration pipeline with step-by-step progression",
      "Authenticated multi-project workspace",
      "Media asset upload and management",
      "Credits and plan infrastructure for tiered usage",
    ],
    technicalHighlights: [
      "RTK Query API layer with automatic 401 refresh-session retry",
      "Modular backend architecture built for new AI provider integrations",
      "JWT auth with HTTP-only cookies and CSRF protection",
      "Typed domain modeling across projects, stories, scenes, and narration",
    ],
    lessonsLearned:
      "Getting the data model and auth layer right before adding AI generation makes it possible to plug in new providers without re-architecting the product.",
    relatedServiceSlugs: [
      "custom-web-application-development",
      "third-party-api-integrations",
      "frontend-development",
    ],
    relatedTechnologySlugs: ["nodejs", "react"],
    relatedCaseStudySlugs: ["aws-infrastructure-setup-cintegrate"],
    relatedSolutionLinks: [
      { label: "Need AI Features", href: "/problems#need-ai-features" },
    ],
  },
  {
    slug: "omnivy-web-clipper",
    title: "Omnivy Web Clipper",
    description:
      "A browser-first web clipper that turns any page into clean, editable Markdown and saves it into Obsidian, Notion, or your cloud drive.",
    seo: {
      title: "Omnivy: Browser Web Clipper for Markdown Notes",
      description:
        "A browser-first web clipper that turns any page into clean, editable Markdown and saves it straight into Obsidian, Notion, or your cloud drive.",
    },
    category: "personal",
    lifecycle: "live",
    year: 2026,
    featured: true,
    whoFor:
      "People building a personal knowledge base in Obsidian or Notion who want clean, structured captures instead of raw HTML.",
    url: "https://omnivy.hawebstudio.com",

    cover: {
      src: "/images/omnivy-web-clipper/cover.png",
      alt: "",
    },
    gallery: [
      {
        src: "/images/omnivy-web-clipper/gallery1.png",
        alt: "",
      },
      {
        src: "/images/omnivy-web-clipper/gallery2.png",
        alt: "",
      },
      {
        src: "/images/omnivy-web-clipper/gallery3.png",
        alt: "",
      },
      {
        src: "/images/omnivy-web-clipper/gallery4.png",
        alt: "",
      },
    ],
    publicLinks: [
      {
        label: "Extension",
        url: "https://chromewebstore.google.com/detail/omnivy-web-clipper/nbeeifpffimepiobjmhpfihileadikdo",
      },
    ],
    technologies: [
      "React",
      "TypeScript",
      "Vite",
      "Redux Toolkit",
      "Next.js",
      "Chrome Extension APIs",
    ],
    scope:
      "Monorepo covering a Manifest V3 Chrome extension for capture and a Next.js web app for auth, provider connections, and clip history.",
    goals: [
      "Capture any page as clean, editable Markdown in one click",
      "Support save destinations across Obsidian, Notion, and major cloud drives",
      "Keep captured content structured enough to use immediately, not just archived",
    ],
    constraints: [
      "Extraction quality varies across very different site types (docs, forums, AI chats, code hosts)",
      "Provider tokens must be encrypted and refreshed safely across extension and web app boundaries",
    ],
    context:
      "Built to solve the gap between quick web clipping and a genuinely usable knowledge base entry, with extraction tuned per site type rather than one generic scraper.",
    challenge:
      "Coordinating extraction, editing, and multi-destination saving across an isolated browser extension context and a separate authenticated web app.",
    responsibilities: [
      "Extension architecture and content extraction",
      "Web app auth and provider integrations",
      "Cross-context state and token handling",
      "Site-aware extraction strategy design",
    ],
    architecture:
      "pnpm/Turbo monorepo with a Manifest V3 extension (React, TypeScript, Vite, Redux Toolkit) for in-browser extraction, and a Next.js 15 web app (NextAuth, Prisma, Postgres) for OAuth connections, encrypted provider tokens, and clip history, sharing a UI and config package.",
    implementation:
      "Built a knowledge pipeline that selects a site-aware extraction strategy per page, then either writes to Obsidian via local URI or sends the clip to the web app API, which refreshes provider tokens and uploads the Markdown to Google Drive, OneDrive, Dropbox, or Notion.",
    keyFeatures: [
      "Site-aware extraction for GitHub, Stack Overflow, forums, AI chats, Notion, docs, and articles",
      "Editable capture: title, source, author, tags, and custom properties before saving",
      "Multi-destination saving: Obsidian, Google Drive, OneDrive, Dropbox, Notion",
      "Popup, background auto-save, and context-menu capture options",
    ],
    technicalHighlights: [
      "Manifest V3 extension architecture with isolated content scripts and popup UI",
      "Encrypted provider token storage with short-lived extension token issuance",
      "Site-aware extraction pipeline instead of a single generic scraper",
      "Shared monorepo tooling across extension, web app, and UI packages",
    ],
    lessonsLearned:
      "Clipping tools are only as useful as what happens after the save — structuring the output well matters more than capturing faster.",
    relatedServiceSlugs: [
      "custom-web-application-development",
      "frontend-development",
      "third-party-api-integrations",
    ],
    relatedTechnologySlugs: ["chrome-extension-apis", "react"],
    relatedCaseStudySlugs: ["omnivy-browser-clipper-chrome-extension"],
    relatedSolutionLinks: [
      { label: "Need AI Features", href: "/problems#need-ai-features" },
    ],
  },
];
