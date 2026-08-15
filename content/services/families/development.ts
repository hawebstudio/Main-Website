import { Service } from "@/lib/content/types";

export const developmentServices: Service[] = [
  {
    family: "development",
    slug: "frontend-development",
    title: "Advanced Frontend Engineering",
    description: "We turn approved designs into fast, accessible, maintainable interfaces using React and Next.js, matching the design closely and testing across real devices rather than just the browser we built it in.",
    seo: { 
      title: "Advanced Frontend Development Services (React & Next.js) | HA Web Studio", 
      description: "Frontend development with React and Next.js — component-based, accessible, and built for performance across devices." 
    },
    audience: "Agencies needing to outsource complex UI builds, startups building SaaS products, and enterprise teams migrating away from legacy frontend monoliths.",
    outcomes: [
      "Close, responsive translation of Figma designs into production code.",
      "A highly organized, component-based architecture (easy for your team to maintain).",
      "Sub-second rendering speeds via optimized React/Next.js implementation.",
      "Strict adherence to web accessibility standards (WCAG)."
    ],
    scope: "Frontend architecture and development. We take approved designs and turn them into a maintained codebase, integrating with your existing backend APIs or headless CMS.",
    complexity: "High",
    availability: "Live",
    core: [
      "Component-Based Architecture (React)",
      "Server-Side Rendering & Static Generation (Next.js)",
      "Responsive, Mobile-First CSS (Tailwind/CSS Modules)",
      "State Management (Zustand/Redux)",
      "API & Headless CMS Integration",
      "Web Accessibility (A11y) Implementation"
    ],
    addOns: [
      "Complex WebGL / Three.js 3D Rendering",
      "Advanced Framer Motion Micro-Animations",
      "Progressive Web App (PWA) Configuration",
      "Frontend Testing (Cypress/Playwright) Setup"
    ],
    recommendations: ["custom-web-application-development", "website-ui-ux-design", "website-performance-optimization"],
    businessProblems: [
      "You have beautiful Figma designs, but your current developers can't build them accurately.",
      "The current website is a tangled mess of jQuery and inline styles that takes months to update.",
      "The UI feels clunky and slow because state management is handled poorly.",
      "You need to decouple your frontend from a slow, monolithic backend (headless migration)."
    ],
    process: [
      { title: "Design Handoff & Audit", description: "We review the Figma files, identify any edge cases the designer missed, and define the global design tokens." },
      { title: "Component Architecture", description: "Before writing page code, we build a UI library of isolated, reusable components (buttons, cards, forms)." },
      { title: "Layout & Logic", description: "We construct the pages, implement complex state logic, and handle data fetching from your APIs." },
      { title: "Animation & Polish", description: "We add the premium micro-interactions, smooth page transitions, and loading states that make the app feel alive." },
      { title: "QA & Accessibility Testing", description: "We test across all major browsers and devices, ensuring screen readers can perfectly navigate the interface." }
    ],
    useCases: [
      { title: "SaaS Dashboard Build", description: "Building a data-heavy analytics dashboard in React with real-time charting and fast, responsive filtering." },
      { title: "Headless eCommerce Frontend", description: "Replacing a slow Shopify Liquid theme with a fast Next.js frontend connected via the Storefront API." },
      { title: "Marketing Site with WebGL", description: "Developing a highly interactive, award-winning promotional site using Three.js and complex scroll animations." }
    ],
    exclusions: [
      "Backend database architecture or server management.",
      "Creating the actual visual designs (we require finalized Figma/XD files before starting).",
      "Fixing legacy WordPress PHP templates."
    ],
    recommendedTechnologies: ["React", "Next.js", "Tailwind CSS", "Framer Motion"],
    pricing: "Frontend engineering is typically scoped as part of a larger build or as a dedicated engagement for an existing product. Price depends on the number of components/screens, state management complexity, and performance requirements.",
    timeline: "Timelines vary widely with scope — a focused frontend engagement typically runs 4–10 weeks.",
    faqs: [
      { question: "Can you work inside our existing codebase?", answer: "Yes — we regularly work within existing React/Next.js codebases rather than starting from scratch." },
      { question: "Do you handle backend/API work too?", answer: "Frontend engineering is the focus of this service; for full-stack builds, see our custom web application development service." }
    ],
    cta: { label: "Discuss Frontend Engineering", href: "/contact?intent=development" }
  },
  {
    family: "development",
    slug: "custom-web-application-development",
    title: "Custom Web Application Development",
    description: "Stop running your business on a tangled web of spreadsheets. We architect and develop custom, full-stack web applications tailored specifically to your unique operational workflows, allowing you to scale efficiently and securely.",
    seo: { 
      title: "Custom Web Application Development (Full-Stack) | HA Web Studio", 
      description: "Custom software development for complex businesses. We build secure, scalable full-stack web applications to automate workflows and replace spreadsheets." 
    },
    audience: "Established businesses with highly specific operational workflows that cannot be solved by off-the-shelf SaaS products.",
    outcomes: [
      "A centralized, secure digital platform that your entire team can operate from.",
      "Elimination of manual data entry errors and bottlenecked approval processes.",
      "Complete ownership of the intellectual property and codebase.",
      "A scalable architecture that can handle thousands of concurrent users."
    ],
    scope: "End-to-end software engineering including database design, backend API development, frontend user interface creation, authentication, and secure cloud deployment.",
    complexity: "Advanced",
    availability: "Live",
    core: [
      "System Architecture & Database Design (SQL/NoSQL)",
      "Secure User Authentication & Role-Based Access (RBAC)",
      "Custom REST or GraphQL API Development",
      "Full-Stack Implementation (Node.js/Next.js)",
      "Third-Party Integration (Payment/Stripe, Email/SendGrid)",
      "Secure Cloud Deployment (AWS/Vercel/GCP)"
    ],
    addOns: [
      "Multi-Tenant SaaS Architecture",
      "Real-time WebSockets (Chat/Live Updates)",
      "Complex PDF or Report Generation",
      "Mobile App Counterpart (React Native)"
    ],
    recommendations: ["frontend-development", "third-party-api-integrations"],
    businessProblems: [
      "Your core business process is managed in a massive Excel file that breaks if someone sorts it wrong.",
      "You are paying for 5 different SaaS tools but none of them do exactly what you need.",
      "You have an idea for a proprietary software tool that will give you a massive competitive advantage.",
      "Your current internal portal is so slow and ugly that employees refuse to use it properly."
    ],
    process: [
      { title: "Discovery & Requirements", description: "We conduct deep interviews to map every user role, permission level, and data flow required for the application." },
      { title: "Data Modeling", description: "We design a normalized database structure that can scale as your data grows." },
      { title: "Sprint Development", description: "We build the application in two-week agile sprints, providing you with working staging links to review progress continuously." },
      { title: "QA & Penetration Testing", description: "We run automated testing suites and manually attempt to break the application to ensure data security." },
      { title: "Deployment & Training", description: "We deploy the application to a production server environment and train your stakeholders on how to use it." }
    ],
    useCases: [
      { title: "Internal Logistics Portal", description: "A custom dashboard for a freight company to track driver locations, manage invoices, and calculate complex route pricing." },
      { title: "Client B2B Portal", description: "A secure login area where an agency's clients can view project progress, approve assets, and pay invoices via Stripe." },
      { title: "Proprietary SaaS MVP", description: "Building the initial, scalable version of a new software startup idea so the founders can secure Series A funding." }
    ],
    exclusions: [
      "Building the next Facebook for $5,000 (custom software requires realistic budgets).",
      "No-code/Low-code builds (we write actual, scalable code).",
      "We do not build hardware or firmware."
    ],
    recommendedTechnologies: ["Next.js", "Node.js", "PostgreSQL", "Prisma"],
    pricing: "Custom applications are the most variable service we offer in terms of price, since scope ranges from a simple internal tool to a multi-role production platform. We scope every project individually based on the required architecture, integrations, and user roles, and provide a fixed quote before work begins. Realistic custom software budgets typically start well above a basic website.",
    timeline: "Custom applications generally take 8–16+ weeks depending on the number of user roles, integrations, and how much of the system needs to be built from scratch versus using existing infrastructure.",
    faqs: [
      { question: "What's included?", answer: "System architecture and database design, secure authentication and role-based access, custom API development, and full-stack implementation. Ongoing feature development after launch is scoped separately." },
      { question: "Can this integrate with our existing tools?", answer: "Yes, third-party and API integrations are a core part of how we scope custom applications." },
      { question: "Can the application grow with our business?", answer: "Yes — we design the architecture with future features and scale in mind rather than a one-off build." }
    ],
    cta: { label: "Build Custom Software", href: "/contact?intent=development" }
  }
];
