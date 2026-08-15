import { Service } from "@/lib/content/types";

export const designServices: Service[] = [
  {
    family: "design",
    slug: "website-ui-ux-design",
    title: "Website UI/UX Design",
    description: "UI/UX design that connects your brand to how users actually behave — wireframes and prototypes that get tested for usability before a single line of code is written, then handed to developers in a format they can build from directly.",
    seo: { 
      title: "Website UI & UX Design Services | HA Web Studio", 
      description: "UI/UX design services — wireframing, high-fidelity design, and prototyping, aligned to your brand and handed off in a developer-ready format." 
    },
    audience: "SaaS companies, B2B agencies, and established brands needing high-end visual design and prototyping before committing to expensive development cycles.",
    outcomes: [
      "A modern visual identity, consistently applied across every page and screen size.",
      "Frictionless user journeys designed specifically to increase conversion rates.",
      "Comprehensive, component-based design systems for scalable development.",
      "Interactive prototypes for stakeholder approval and user testing."
    ],
    scope: "End-to-end design phase including wireframing, high-fidelity UI design in Figma, interactive prototyping, and an organized developer handoff. Does not include actual code development.",
    complexity: "Medium",
    availability: "Live",
    core: [
      "UX Research & Wireframing",
      "High-Fidelity Interface Design",
      "Interactive Prototyping (Figma)",
      "Design System & UI Kit Creation",
      "Responsive Layout Definition (Desktop, Tablet, Mobile)",
      "Developer Handoff Documentation"
    ],
    addOns: [
      "Custom Iconography & Illustration",
      "Advanced Micro-interaction Design",
      "Accessibility (WCAG) Compliance Review",
      "User Testing Sessions"
    ],
    recommendations: ["business-website-development", "website-planning-strategy", "conversion-rate-optimization"],
    businessProblems: [
      "A beautiful website that confuses users and fails to convert.",
      "Inconsistent brand application across different digital touchpoints.",
      "Developers struggling to interpret messy design files, leading to poor implementation.",
      "High bounce rates due to clunky navigation and lack of visual hierarchy."
    ],
    process: [
      { title: "Discovery & Wireframing", description: "We translate your strategic goals into low-fidelity structural blueprints, focusing entirely on layout, hierarchy, and user flow without the distraction of color." },
      { title: "Visual Exploration", description: "We present distinct design directions (moodboards) to establish the visual language—colors, typography, and imagery—that best represents your brand." },
      { title: "High-Fidelity Design", description: "We build the final screens in Figma, creating a reusable design system (components, variables) as we go so new pages stay consistent." },
      { title: "Prototyping & Review", description: "We link the screens together into a clickable prototype, allowing you to 'feel' the website before a single line of code is written." },
      { title: "Developer Handoff", description: "We organize the Figma file, export assets, and provide documentation to ensure your development team can implement the design flawlessly." }
    ],
    useCases: [
      { title: "SaaS Dashboard Redesign", description: "Transforming a complex, feature-heavy web application interface into a clean, intuitive user experience." },
      { title: "Marketing Site Overhaul", description: "Designing a high-end corporate website intended to position the company as a premium market leader." },
      { title: "Investor Pitch Deck to Web", description: "Translating a startup's vision and pitch materials into a professional, trust-building digital presence." }
    ],
    exclusions: [
      "Logo design or core brand identity creation (we work with your existing brand).",
      "Writing the front-end code (this is a pure design service).",
      "Print or packaging design."
    ],
    recommendedTechnologies: ["Figma", "Framer", "Adobe Creative Cloud"],
    pricing: "Pricing depends on the number of unique page templates, whether a full design system is needed, and how many rounds of revisions are included. This is often scoped together with development, but can be priced as a standalone deliverable if you have your own development team.",
    timeline: "Design typically takes 2–5 weeks depending on page count and how quickly feedback comes back during review rounds.",
    faqs: [
      { question: "Do you build the website too, or just design it?", answer: "Both, if you'd like — design is available standalone or bundled with development. If you have an in-house dev team, we hand off production-ready Figma files." },
      { question: "How many revision rounds are included?", answer: "This is agreed upfront per project. We build in enough structured feedback rounds to get to a design you're confident in without open-ended scope creep." }
    ],
    cta: { label: "Start Designing", href: "/contact?intent=design" }
  }
];
