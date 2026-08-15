import { Service } from "@/lib/content/types";

export const integrationsServices: Service[] = [
  {
    family: "integrations",
    slug: "third-party-api-integrations",
    title: "Third-Party & API Integrations",
    description: "Stop wasting time doing manual data entry. We connect your website, web applications, and backend tools using APIs and custom webhooks, so data moves automatically between systems instead of being re-entered by hand.",
    seo: { 
      title: "Third-Party API & Custom Software Integration Services | HA Web Studio", 
      description: "Connect your disjointed software tools. We build secure, reliable API integrations connecting your website to CRMs, ERPs, and payment gateways." 
    },
    audience: "Scaling businesses and enterprises suffering from 'software bloat'—using dozens of disconnected SaaS tools that require manual data transfer.",
    outcomes: [
      "Elimination of manual, error-prone data entry across departments.",
      "A single source of truth for customer and operational data.",
      "Drastically improved team efficiency through automated workflows.",
      "Scalable infrastructure that easily accommodates new software tools."
    ],
    scope: "Technical scoping, architecture, and development of custom API connections (REST/GraphQL) or middleware (Make/Zapier) between your web properties and external services.",
    complexity: "High",
    availability: "Live",
    core: [
      "Technical Feasibility & API Scoping",
      "OAuth & Secure Authentication Setup",
      "Custom REST/GraphQL Endpoint Development",
      "Webhook Configuration & Payload Mapping",
      "Middleware Architecture (Node.js/Next.js API Routes)",
      "Error Handling & Retry Logic Implementation"
    ],
    addOns: [
      "Legacy SOAP API to Modern REST Conversion",
      "Two-way Data Synchronization",
      "Custom Zapier App Development",
      "Database / Data Lake Integration"
    ],
    recommendations: ["custom-web-application-development", "analytics-tracking-setup", "ecommerce-specific-services"],
    businessProblems: [
      "Sales reps spend 2 hours a day manually copying leads from the website into Salesforce.",
      "Inventory on the eCommerce site isn't syncing with the warehouse ERP, leading to overselling.",
      "A critical business tool doesn't have a native integration with your website platform.",
      "Data silos are preventing leadership from seeing the full customer journey."
    ],
    process: [
      { title: "API Auditing", description: "We review the API documentation for both endpoints to determine technical limits, rate limits, and data formats." },
      { title: "Data Mapping", description: "We map exactly how data fields from System A (e.g., 'First Name') translate to System B." },
      { title: "Middleware Development", description: "If a direct connection isn't possible, we build secure middleware scripts to translate and route the data." },
      { title: "Security & Error Handling", description: "We implement security protocols and build 'retry logic' so data isn't lost if an API goes down temporarily." },
      { title: "Load Testing", description: "We run massive batches of test data through the integration to ensure it holds up under pressure." }
    ],
    useCases: [
      { title: "Custom ERP to Shopify", description: "Building a two-way sync that pushes real-time inventory from an obscure legacy ERP up to a headless Shopify storefront." },
      { title: "Automated Onboarding Flow", description: "Connecting Stripe, Webflow, and HubSpot so that when a client pays an invoice, a project is automatically created in Asana." },
      { title: "Aggregated Dashboarding", description: "Pulling data via API from 5 different marketing platforms into a single, custom React dashboard for executive reporting." }
    ],
    exclusions: [
      "We cannot integrate systems that completely lack an API or export mechanism.",
      "Fixing bugs inside the third-party software itself (we only control the connection).",
      "Providing legal compliance consulting for data transfer (e.g., cross-border GDPR)."
    ],
    recommendedTechnologies: ["REST APIs", "GraphQL", "Webhooks", "Node.js", "Zapier"],
    pricing: "Pricing depends heavily on the specific API involved, its documentation quality, and whether authentication (OAuth) or webhook handling adds complexity. We assess technical feasibility first and provide a fixed quote once the scope is clear.",
    timeline: "Straightforward integrations typically take 1–3 weeks; integrations with limited documentation or complex data mapping can take longer.",
    faqs: [
      { question: "What if the tool we want to integrate doesn't have great documentation?", answer: "We factor that into scoping — a technical feasibility review happens before we commit to a fixed price or timeline." },
      { question: "Can you integrate multiple tools at once?", answer: "Yes, though we recommend scoping and testing integrations individually to keep debugging manageable." }
    ],
    cta: { label: "Request Custom Integration", href: "/contact?intent=integrations" }
  }
];
