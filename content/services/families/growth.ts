import { Service } from "@/lib/content/types";

export const growthServices: Service[] = [
  {
    family: "growth",
    slug: "customer-acquisition",
    title: "Customer Acquisition Systems",
    description: "Stop relying on unpredictable referrals. We build scalable, data-driven customer acquisition systems that consistently drive qualified traffic to your business and convert them into high-value leads. We don't just run ads; we architect complete conversion funnels.",
    seo: { 
      title: "B2B Customer Acquisition & Lead Generation Systems | HA Web Studio", 
      description: "Scalable customer acquisition services. We build complete, data-driven funnels and ad campaigns designed to generate high-quality B2B leads consistently." 
    },
    audience: "B2B service providers, agencies, and high-ticket consultants who need a predictable, scalable method for generating qualified sales appointments.",
    outcomes: [
      "A predictable, measurable flow of qualified inbound leads.",
      "Lowered Customer Acquisition Cost (CAC) through aggressive conversion optimization.",
      "Clear attribution modeling (knowing exactly which ads drive the most revenue).",
      "A scalable system you can dial up when you have capacity."
    ],
    scope: "End-to-end design and implementation of a paid acquisition funnel. Includes landing page design/build, ad account setup, initial campaign structure, and CRM integration.",
    complexity: "High",
    availability: "Live",
    core: [
      "Target Audience & Offer Strategy",
      "High-Converting Landing Page Architecture",
      "Paid Search (Google Ads) Campaign Setup",
      "Paid Social (Meta/LinkedIn) Campaign Setup",
      "Conversion Tracking & Analytics Implementation",
      "CRM & Lead Routing Integration"
    ],
    addOns: [
      "Ongoing Campaign Management & Optimization",
      "Ad Creative & Copywriting Strategy",
      "Lead Magnet (Ebook/Webinar) Funnel Creation",
      "Retargeting Campaign Setup"
    ],
    recommendations: ["lead-capture-communication-setup", "analytics-tracking-setup", "conversion-rate-optimization"],
    businessProblems: [
      "Traffic is coming in, but nobody is filling out the contact form.",
      "Wasting thousands of dollars on Google Ads with no clear return on investment.",
      "Relying entirely on word-of-mouth, which makes revenue unpredictable.",
      "Getting leads, but they are incredibly low quality and waste the sales team's time."
    ],
    process: [
      { title: "Offer & Audience Strategy", description: "We define exactly who we are targeting and craft a compelling offer (the 'hook') that commands their attention." },
      { title: "Landing Page Engineering", description: "We build a dedicated, distraction-free landing page designed for one purpose: converting traffic into leads." },
      { title: "Campaign Construction", description: "We structure your ad accounts, define targeting parameters, and write the initial ad copy." },
      { title: "Tracking Verification", description: "We implement advanced tracking pixels and server-side tagging to ensure every conversion is accurately recorded." },
      { title: "Launch & Iterate", description: "We push campaigns live, monitor the initial data closely, and aggressively optimize to lower your cost-per-lead." }
    ],
    useCases: [
      { title: "B2B Lead Generation", description: "Setting up a LinkedIn Ads funnel driving enterprise decision-makers to download an industry whitepaper, followed by a sales sequence." },
      { title: "Local Service Dominance", description: "Building a hyper-local Google Ads campaign to capture high-intent search traffic for emergency plumbing services." },
      { title: "SaaS Demo Bookings", description: "Creating a retargeting loop that brings website visitors back to a specialized landing page to book a software demo." }
    ],
    exclusions: [
      "Organic social media management (we focus on paid, predictable growth).",
      "Cold email outreach or buying lead lists.",
      "Running campaigns with micro-budgets (under $1k/mo in ad spend)."
    ],
    recommendedTechnologies: ["Google Ads", "Meta Ads", "LinkedIn Ads", "Unbounce"],
    pricing: "Pricing covers our setup and management work — landing page architecture, campaign build, and tracking — and is separate from your ad spend budget. Cost depends on how many channels (Google, Meta, LinkedIn) you want to run and how much landing page work is needed.",
    timeline: "Initial setup — landing pages, campaign structure, and tracking — typically takes 2–4 weeks before campaigns go live.",
    faqs: [
      { question: "Is my ad spend included in your price?", answer: "No — our fee covers strategy, setup, and management. Ad spend goes directly to Google/Meta/LinkedIn and is set by your budget." },
      { question: "Do you manage campaigns ongoing, or just set them up?", answer: "Both options are available — a one-time setup, or ongoing management and optimization. We'll scope whichever fits your needs." }
    ],
    cta: { label: "Scale Your Acquisition", href: "/contact?intent=growth" }
  },
  {
    family: "growth",
    slug: "lead-capture-communication-setup",
    title: "Lead Capture & Automation",
    description: "Never let a hot lead go cold. We implement intelligent lead capture mechanisms and automated communication routing that instantly engage prospects and deliver their data directly to your sales team's fingertips.",
    seo: { 
      title: "Lead Capture & Automation Setup Services | HA Web Studio", 
      description: "Stop missing leads. We implement advanced forms, intelligent chatbots, and automated CRM routing to instantly capture and engage your prospects." 
    },
    audience: "Busy service businesses, medical practices, and B2B teams whose sales process suffers from delayed response times or disorganized lead data.",
    outcomes: [
      "Higher conversion rates by engaging users exactly when their intent is highest.",
      "Zero missed leads; every inquiry is instantly logged and routed.",
      "Faster speed-to-lead, drastically increasing the chance of closing the sale.",
      "Clean, organized data automatically synced to your CRM."
    ],
    scope: "Implementation of advanced forms, chatbots, or booking widgets, coupled with backend automation (Zapier/Make) to route data to Slack, Email, CRM, or SMS.",
    complexity: "Medium",
    availability: "Live",
    core: [
      "Multi-step, High-conversion Form Build",
      "Conditional Logic & Lead Qualification",
      "Automated Email Auto-responders",
      "Internal Team Notification Routing (Slack/Email)",
      "CRM / Spreadsheet Data Sync"
    ],
    addOns: [
      "AI-Powered Chatbot Implementation",
      "WhatsApp Business API Integration",
      "Automated SMS Follow-ups",
      "Round-robin Lead Assignment Logic"
    ],
    recommendations: ["whatsapp-business-systems", "booking-appointment-systems", "customer-acquisition"],
    businessProblems: [
      "Leads are getting lost in a messy general inbox (info@company.com).",
      "Sales reps take 24+ hours to respond, by which time the prospect has chosen a competitor.",
      "Unqualified leads are wasting the team's time because forms don't filter them.",
      "Prospects abandon standard contact forms because they are too long or boring."
    ],
    process: [
      { title: "Process Mapping", description: "We map out the ideal journey of a lead from the moment they click 'Submit' to the moment a sales rep reaches out." },
      { title: "Capture Implementation", description: "We build intuitive, conversational forms (like Typeform) that feel less like a test and more like a dialogue." },
      { title: "Automation Routing", description: "We use tools like Make or Zapier to connect the form to your CRM, Slack channels, and email marketing software." },
      { title: "Auto-Responder Setup", description: "We configure instant, personalized email or SMS replies so the prospect knows they are being taken care of immediately." },
      { title: "End-to-End Testing", description: "We run dummy leads through the system to ensure notifications fire instantly and data maps correctly." }
    ],
    useCases: [
      { title: "Instant Sales Alerts", description: "Routing high-value enterprise leads directly to a Slack channel with a button to instantly claim the lead." },
      { title: "Automated Qualification", description: "A multi-step form that automatically rejects leads under a certain budget, redirecting them to a DIY resource instead of a sales call." },
      { title: "After-Hours Chatbot", description: "An intelligent bot that answers common pricing questions and books calendar appointments while your team is asleep." }
    ],
    exclusions: [
      "We build the system; your team must handle the actual human sales calls.",
      "Complex, custom-coded CRM development from scratch.",
      "Writing the massive email nurture sequences (we handle the technical setup and initial auto-responder)."
    ],
    recommendedTechnologies: ["Typeform", "Make", "Zapier", "HubSpot"],
    pricing: "Pricing depends on the complexity of the form logic, how many notification/routing destinations are needed (CRM, Slack, email), and whether automated email sequences are included.",
    timeline: "Most lead-capture setups take 1–3 weeks depending on how many integrations are involved.",
    faqs: [
      { question: "Can this connect to our existing CRM?", answer: "Yes — internal team notification routing to your CRM, Slack, or email is part of the standard scope." },
      { question: "Do you write the automated email copy?", answer: "We set up the automated auto-responder infrastructure; providing final marketing copy can be included or handled by your team, depending on scope." }
    ],
    cta: { label: "Automate Lead Capture", href: "/contact?intent=growth" }
  },
  {
    family: "growth",
    slug: "conversion-rate-optimization",
    title: "Conversion Rate Optimization (CRO)",
    description: "Don't spend more money on ads until your website is built to convert. We use data, user psychology, and rigorous A/B testing to identify friction points and systematically increase the percentage of your traffic that turns into paying customers.",
    seo: { 
      title: "Data-Driven Conversion Rate Optimization (CRO) | HA Web Studio", 
      description: "Turn more traffic into revenue. Our CRO services use heatmap analysis, user testing, and A/B testing to systematically improve your website's conversion rates." 
    },
    audience: "eCommerce stores and SaaS companies that already have steady traffic (10k+ visitors/mo) but suffer from low conversion rates or high cart abandonment.",
    outcomes: [
      "More revenue or leads generated from the exact same amount of traffic.",
      "Lower Customer Acquisition Cost (CAC) on paid campaigns.",
      "Deep insights into why users are abandoning your site.",
      "A culture of data-driven decision making rather than guessing."
    ],
    scope: "Comprehensive UX audit, installation of behavioral tracking, hypothesis generation, wireframing of improvements, and implementation of A/B tests.",
    complexity: "Medium",
    availability: "Live",
    core: [
      "Quantitative Data Analysis (Google Analytics)",
      "Qualitative Behavioral Analysis (Heatmaps/Session Recordings)",
      "Conversion Funnel Bottleneck Identification",
      "Hypothesis Generation & Prioritization",
      "UI/UX Redesign of Friction Points",
      "Implementation of Tracking & Testing"
    ],
    addOns: [
      "Rigorous A/B & Multivariate Testing",
      "Copywriting Tweaks for Better Persuasion",
      "Checkout Flow Simplification",
      "Post-Purchase Upsell Implementation"
    ],
    recommendations: ["analytics-tracking-setup", "ecommerce-specific-services"],
    businessProblems: [
      "Spending heavily on Google Ads but users are bouncing off the landing page immediately.",
      "High add-to-cart rates, but massive drop-off during the checkout process.",
      "The website looks great, but nobody is clicking the primary Call to Action.",
      "Debating website changes based on opinions rather than actual user data."
    ],
    process: [
      { title: "Data Collection & Audit", description: "We analyze your GA4 data and install heatmap tools like Clarity to see exactly where users are getting stuck." },
      { title: "Hypothesis Generation", description: "Based on the data, we create a prioritized list of theories (e.g., 'Moving the price above the fold will increase add-to-carts')." },
      { title: "Design & Implementation", description: "We redesign the problematic sections and implement the changes (either permanently or as part of a test)." },
      { title: "A/B Testing (Optional)", description: "For high-traffic sites, we split traffic between the old and new designs to statistically prove which performs better." },
      { title: "Review & Iterate", description: "We review the results, permanently implement the winners, and move on to the next hypothesis." }
    ],
    useCases: [
      { title: "Checkout Friction Removal", description: "Simplifying a clunky 4-step eCommerce checkout into a single-page flow, reducing the steps between cart and purchase." },
      { title: "Landing Page Persuasion", description: "Rewriting headlines and restructuring the layout of a B2B SaaS landing page to drastically increase demo bookings." },
      { title: "Mobile Navigation Fix", description: "Identifying via heatmaps that mobile users couldn't find the menu, and redesigning the header to fix the bounce rate." }
    ],
    exclusions: [
      "CRO is not effective for websites with very low traffic (you need data for statistical significance).",
      "Brand redesigns (CRO focuses purely on performance and UX, not aesthetics).",
      "SEO optimization (CRO focuses on users, SEO focuses on search engines)."
    ],
    recommendedTechnologies: ["Microsoft Clarity", "VWO", "Optimizely"],
    pricing: "Pricing depends on how much analysis is involved — heatmaps, session recordings, and funnel analysis — and how many pages/tests are in scope. This is typically run as a focused audit, or as an ongoing testing program.",
    timeline: "An initial CRO audit and set of recommendations typically takes 2–3 weeks; ongoing testing programs run continuously.",
    faqs: [
      { question: "Do you implement the changes, or just recommend them?", answer: "Both are available — we can hand off a prioritized list of recommendations, or implement and test the changes directly." },
      { question: "Do I need a lot of existing traffic for this to work?", answer: "Meaningful A/B testing needs sufficient traffic to reach statistical significance; for lower-traffic sites we focus more on qualitative analysis (heatmaps, session recordings) and best-practice fixes." }
    ],
    cta: { label: "Optimize Conversions", href: "/contact?intent=growth" }
  },
  {
    family: "growth",
    slug: "google-business-maps-visibility",
    title: "Local Maps & Profile Optimization",
    description: "If you run a local business, Google Maps is your most important digital asset. We optimize your Google Business Profile to dominate local search results, ensuring that when customers nearby search for your services, you are the first business they see and trust.",
    seo: { 
      title: "Google Business Profile & Maps Optimization Services | HA Web Studio", 
      description: "Dominate the 'Local Pack'. We optimize your Google Business Profile to increase visibility in Maps, generate more reviews, and drive foot traffic or local calls." 
    },
    audience: "Local service businesses (plumbers, lawyers, dentists), restaurants, and retail stores whose primary customer base is within a specific geographic radius.",
    outcomes: [
      "Higher ranking in the highly coveted 'Google Local Pack' (the top 3 map results).",
      "Increased volume of direct phone calls and direction requests from Google.",
      "A highly professional, trust-building profile enriched with photos and accurate data.",
      "A systematic approach to generating 5-star customer reviews."
    ],
    scope: "Complete audit, setup, verification, and deep optimization of a Google Business Profile (GBP). Includes category selection, product/service uploads, and review strategy.",
    complexity: "Low",
    availability: "Live",
    core: [
      "Profile Claiming & Verification Assistance",
      "Primary & Secondary Category Optimization",
      "Business Information & NAP (Name, Address, Phone) Consistency",
      "Services & Products Menu Integration",
      "Q&A Seeding and Optimization",
      "Review Generation Strategy Plan"
    ],
    addOns: [
      "Ongoing Monthly Profile Management (Posts, Updates)",
      "Automated Review Request System Integration",
      "Local Citation Audit & Cleanup",
      "Multi-Location Profile Architecture Setup"
    ],
    recommendations: ["local-seo-foundations", "lead-capture-communication-setup"],
    businessProblems: [
      "Competitors with worse service are getting all the calls because they rank higher on Maps.",
      "Customers are frustrated because the hours or location on Google are incorrect.",
      "The business has a 3.2-star rating because only angry customers leave reviews.",
      "The profile exists, but it's completely unoptimized and lacking photos or service details."
    ],
    process: [
      { title: "Audit & Verification", description: "We claim ownership of your profile, ensure it is verified, and audit it against your top local competitors." },
      { title: "Deep Optimization", description: "We fill out every available field, select the optimal categories, and upload high-quality assets." },
      { title: "Content Seeding", description: "We populate the Q&A section with common customer questions and upload your specific services or products." },
      { title: "Review Strategy Implementation", description: "We help you implement a system (often automated via SMS/Email) to request reviews from happy customers." },
      { title: "Ongoing Monitoring", description: "We monitor the profile for unauthorized edits (which anyone can suggest on Google) and respond to new reviews." }
    ],
    useCases: [
      { title: "Dental Practice Dominance", description: "Taking a local dentist from page 3 of Maps to the top 3 by optimizing categories and implementing a review system." },
      { title: "Multi-Location Consistency", description: "Cleaning up confusing, duplicate profiles for a restaurant chain with 5 locations, ensuring NAP consistency across the web." },
      { title: "Emergency Service Ranking", description: "Optimizing a towing company's profile specifically to capture high-intent, immediate mobile searches." }
    ],
    exclusions: [
      "We cannot guarantee a specific rank (Google's algorithm considers physical proximity heavily).",
      "Buying fake reviews (this violates Google's terms and will get your profile suspended).",
      "Organic website SEO (this service focuses strictly on the Google Business Profile)."
    ],
    recommendedTechnologies: ["Google Business Profile", "BrightLocal"],
    pricing: "This is one of our more accessible services, since it's focused on optimizing an existing free listing rather than building new infrastructure. Pricing depends on how many locations are involved and how much cleanup the existing profile needs.",
    timeline: "Profile optimization typically takes 1‒2 weeks; ranking improvements from local search follow over the following weeks as Google re-indexes the changes.",
    faqs: [
      { question: "Do you handle multiple business locations?", answer: "Yes — pricing scales with the number of locations/profiles that need to be set up or optimized." }
    ],
    cta: { label: "Rank Higher Locally", href: "/contact?intent=growth" }
  },
  {
    family: "growth",
    slug: "local-seo-foundations",
    title: "Local SEO Foundations",
    description: "Don't let your website hold back your local growth. We structure your website's technical foundation, content, and schema markup specifically to signal your geographic relevance to search engines, ensuring you dominate local search queries.",
    seo: { 
      title: "Local SEO Foundations & On-Page Optimization | HA Web Studio", 
      description: "Build the website foundation for local dominance. We implement location pages, local schema markup, and geographic keyword targeting to boost your local rankings." 
    },
    audience: "Regional service businesses and multi-location companies that need their actual website pages (not just their Google Maps profile) to rank for 'Service + City' keywords.",
    outcomes: [
      "High organic rankings for geographic keywords (e.g., 'Commercial Roofing Chicago').",
      "Clear technical signals to Google about exactly where you operate.",
      "Dedicated, high-converting landing pages for each city or region you serve.",
      "Increased organic traffic from users within your specific service area."
    ],
    scope: "On-page optimization for local search intent. Includes creation of location-specific pages, implementation of LocalBusiness Schema, and geo-specific keyword integration.",
    complexity: "Medium",
    availability: "Live",
    core: [
      "Local Keyword Research & Mapping",
      "Dedicated Location/City Page Architecture",
      "On-Page Geo-Optimization (Titles, Headers, Meta)",
      "LocalBusiness JSON-LD Schema Implementation",
      "NAP (Name, Address, Phone) Footer Integration",
      "Internal Linking Strategy for Local Relevance"
    ],
    addOns: [
      "Massive Multi-Location Page Rollouts (Programmatic)",
      "Local Content Strategy (Local Case Studies/Projects)",
      "Google Maps API Integration on Website",
      "Citation Building Strategy"
    ],
    recommendations: ["google-business-maps-visibility", "technical-seo-setup", "customer-acquisition"],
    businessProblems: [
      "The business serves 5 different cities, but the website only mentions the headquarters.",
      "Ranking well on Maps, but completely absent from the standard organic website search results.",
      "Competitors are outranking you for specific neighborhood or regional searches.",
      "Google is confused about where you actually operate due to a lack of technical signals."
    ],
    process: [
      { title: "Geographic Audit", description: "We analyze your target service areas and research the specific search volume for those regions." },
      { title: "Architecture Planning", description: "We design a URL structure and navigation system that logically houses your different location pages." },
      { title: "Content & Optimization", description: "We write localized content and optimize the meta tags, headers, and body text for geographic relevance." },
      { title: "Schema Implementation", description: "We write and inject highly specific LocalBusiness Schema markup into your code so search engines understand your coordinates and service radius." },
      { title: "Indexing & Monitoring", description: "We submit the new local pages to Google Search Console and monitor their climb in the local SERPs." }
    ],
    useCases: [
      { title: "Service Area Expansion", description: "Creating 10 unique, non-duplicate city pages for an HVAC company expanding into neighboring counties." },
      { title: "Multi-Clinic Architecture", description: "Structuring a medical website so each of their 4 physical clinics has its own optimized hub page with specific schema." },
      { title: "Franchise Localization", description: "Taking a national franchise website and creating localized, highly specific sub-pages for regional franchisees." }
    ],
    exclusions: [
      "Off-page SEO (backlink building).",
      "Creating hundreds of spammy 'doorway' pages with duplicate content (we build quality location pages).",
      "Google Business Profile setup (that is a separate, complementary service)."
    ],
    recommendedTechnologies: ["Schema.org", "Google Search Console"],
    pricing: "Pricing depends on how many locations or service-area pages need to be built, and how much on-page and schema work is required. We do not create large numbers of thin location pages purely for search volume — pages are only built where they genuinely serve real customers.",
    timeline: "Local SEO foundations typically take 2–4 weeks to implement; visible ranking movement in local search results usually follows over the following weeks to months as it's an ongoing, cumulative discipline rather than a one-time fix.",
    faqs: [
      { question: "Will you create dozens of fake location pages?", answer: "No. We only build location or service-area pages that reflect where you genuinely operate — accuracy matters more to us than a large page count." },
      { question: "How long until I see ranking improvements?", answer: "Local SEO is cumulative rather than instant — most clients see meaningful movement over a few months, not days." }
    ],
    cta: { label: "Strengthen Local SEO", href: "/contact?intent=growth" }
  }
];
