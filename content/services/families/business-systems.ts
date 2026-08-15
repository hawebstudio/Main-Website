import { Service } from "@/lib/content/types";

export const businessSystemsServices: Service[] = [
  {
    family: "business-systems",
    slug: "booking-appointment-systems",
    title: "Automated Booking & Appointment Systems",
    description: "Eliminate the endless back-and-forth of scheduling. We integrate intelligent booking systems directly into your website that sync with your calendar, handle timezone conversions, and even collect payments upfront, allowing you to wake up to a full schedule of qualified appointments.",
    seo: { 
      title: "Automated Booking & Appointment System Setup | HA Web Studio", 
      description: "Stop the email ping-pong. We implement automated booking systems (Calendly, Cal.com) that sync with your calendar, send reminders, and collect payments." 
    },
    audience: "Consultants, medical clinics, law firms, and service agencies that rely on scheduled appointments and want to reduce administrative overhead.",
    outcomes: [
      "Zero time wasted on 'What time works for you?' email chains.",
      "Drastic reduction in no-shows via automated SMS and email reminders.",
      "Professional, branded booking experience that builds immediate trust.",
      "Instant revenue generation by requiring deposit payments upon booking."
    ],
    scope: "Configuration of a professional scheduling platform (like Cal.com or Calendly), integration into the website via direct embed or API, and setup of automated reminder workflows.",
    complexity: "Low",
    availability: "Live",
    core: [
      "Platform Selection & Account Setup",
      "Two-way Calendar Synchronization (Google/Outlook)",
      "Branded Booking Page Design",
      "Website Integration (Embed/Popup)",
      "Automated Email Confirmation & Reminders",
      "Custom Intake Questions / Lead Qualification"
    ],
    addOns: [
      "Stripe Integration for Paid Consultations",
      "Automated SMS Reminders via Twilio",
      "Round-Robin Team Routing (Assign to next available agent)",
      "Buffer Time & Custom Availability Rules"
    ],
    recommendations: ["lead-capture-communication-setup", "whatsapp-business-systems"],
    businessProblems: [
      "Losing hot leads because they couldn't immediately find a time to talk.",
      "Wasting 5+ hours a week manually managing your calendar and sending Zoom links.",
      "High no-show rates because clients forget about the appointment.",
      "Clients booking times when you are supposed to be off the clock."
    ],
    process: [
      { title: "Requirements Definition", description: "We define your availability rules, required intake questions, and whether payments are required upfront." },
      { title: "Platform Configuration", description: "We set up the software, connect your personal/team calendars, and configure the Zoom/Google Meet integrations." },
      { title: "Workflow Automation", description: "We build the logic that sends immediate confirmations and strategically timed reminders before the meeting." },
      { title: "Website Integration", description: "We embed the booking widget into your website so it matches your design instead of looking like a bolted-on iframe." }
    ],
    useCases: [
      { title: "High-Ticket Consulting", description: "A system that requires prospects to fill out a qualifying questionnaire and pay a $500 deposit before seeing the calendar." },
      { title: "Medical Clinic Routing", description: "A scheduling setup for 5 doctors, allowing patients to select a specific practitioner or the next available slot." },
      { title: "SaaS Demo Flow", description: "Replacing a static 'Contact Us' form with a direct booking widget that assigns the lead to the correct sales rep based on territory." }
    ],
    exclusions: [
      "Building a completely custom booking engine from scratch (we configure established third-party platforms).",
      "Managing your actual schedule or calendar conflicts."
    ],
    recommendedTechnologies: ["Calendly", "Cal.com", "Acuity"],
    pricing: "This is one of our more accessible services since it typically builds on an existing booking platform rather than custom software. Pricing depends on calendar sync complexity and how customized the booking page design needs to be.",
    timeline: "Booking system setup typically takes 1‒2 weeks.",
    faqs: [
      { question: "Will this sync with our existing calendars?", answer: "Yes — two-way calendar synchronization with Google or Outlook is part of the standard scope." },
      { question: "Can it embed directly on our website?", answer: "Yes, embed or popup integration on your existing website is included." }
    ],
    cta: { label: "Automate Your Bookings", href: "/contact?intent=business-systems" }
  },
  {
    family: "business-systems",
    slug: "whatsapp-business-systems",
    title: "WhatsApp Business API & Automation",
    description: "Meet your customers where they already are. We integrate WhatsApp Business deeply into your operations, transforming it from a simple chat app into a powerful engine for automated customer support, lead qualification, and direct sales.",
    seo: { 
      title: "WhatsApp Business API & Automation Setup | HA Web Studio", 
      description: "Turn WhatsApp into a sales engine. We integrate the WhatsApp Business API with your website, CRM, and chatbots for automated support and lead generation." 
    },
    audience: "eCommerce brands, real estate agencies, and local services in regions (like LATAM, EMEA, and APAC) where WhatsApp is the primary mode of business communication.",
    outcomes: [
      "Instant connection with high-intent prospects who prefer chat over email.",
      "Reduced customer support load via automated FAQ bots.",
      "Direct broadcasting capabilities to engaged customer lists.",
      "Higher open and response rates compared to traditional email marketing."
    ],
    scope: "Verification of WhatsApp Business API, configuration of automated flows, website widget integration, and connection to backend systems (CRM/Helpdesk).",
    complexity: "Medium",
    availability: "Live",
    core: [
      "WhatsApp Business API Setup & Verification",
      "Website 'Click-to-Chat' Widget Integration",
      "Automated Welcome & Away Messages",
      "Basic Keyword-Triggered Auto-Replies",
      "WhatsApp Catalog Integration (eCommerce)",
      "Agent Dashboard Setup (Shared Inbox)"
    ],
    addOns: [
      "AI-Powered Customer Support Chatbot",
      "Automated eCommerce Notifications (Order/Shipping Updates)",
      "CRM Integration (HubSpot/Salesforce Sync)",
      "Broadcast Campaign Strategy"
    ],
    recommendations: ["lead-capture-communication-setup", "ecommerce-specific-services"],
    businessProblems: [
      "Customers are emailing you, but you know they'd convert faster if they could just text you.",
      "Your team is using a single physical phone passed around the office to answer WhatsApp messages.",
      "You are losing leads because nobody replies to WhatsApp messages after 6 PM.",
      "You have a catalog of products but no easy way for customers to browse and order directly via chat."
    ],
    process: [
      { title: "Account Verification", description: "We navigate the complex Meta verification process to secure your official WhatsApp Business API access." },
      { title: "Flow Mapping", description: "We map out the automated conversation trees (e.g., 'Press 1 for Sales, 2 for Support')." },
      { title: "Bot & Inbox Setup", description: "We configure the automation logic and set up a shared inbox (like ManyChat or Intercom) so multiple agents can handle chats simultaneously." },
      { title: "Website Integration", description: "We implement dynamic WhatsApp buttons on your site, pre-filling messages based on the page the user is viewing." }
    ],
    useCases: [
      { title: "Real Estate Lead Gen", description: "A WhatsApp bot that asks prospects for their budget and preferred neighborhood before routing the chat to a live agent." },
      { title: "eCommerce Support Automation", description: "Integrating WhatsApp with Shopify so customers automatically receive their tracking numbers and can ask basic order questions to a bot." },
      { title: "B2B Shared Inbox", description: "Moving a sales team off individual phone numbers into a single, centralized WhatsApp Business account connected to HubSpot." }
    ],
    exclusions: [
      "Managing your daily customer service chats.",
      "Paying for Meta's per-conversation API fees (billed directly to you).",
      "Sending unauthorized spam (Meta strictly regulates broadcast templates)."
    ],
    recommendedTechnologies: ["WhatsApp Business API", "ManyChat", "Intercom"],
    pricing: "Pricing depends on how much automation is needed — basic click-to-chat setup is more affordable than building keyword-triggered auto-reply flows.",
    timeline: "Basic setup typically takes about 1 week; more involved automation flows can take 2–3 weeks.",
    faqs: [
      { question: "Do we need WhatsApp Business API access already?", answer: "No — API setup and verification is part of this service if you don't already have it configured." }
    ],
    cta: { label: "Integrate WhatsApp", href: "/contact?intent=business-systems" }
  }
];
