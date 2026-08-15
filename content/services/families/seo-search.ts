import { Service } from "@/lib/content/types";

export const seoSearchServices: Service[] = [
  {
    family: "seo-search",
    slug: "technical-seo-setup",
    title: "Technical SEO Optimization",
    description: "Great content is useless if search engines can't crawl, understand, or index it. We rebuild your website's technical foundation to eliminate crawl errors, optimize site architecture, and ensure maximum visibility in Google Search.",
    seo: { 
      title: "Technical SEO Setup & Optimization Services | HA Web Studio", 
      description: "Fix crawl errors and indexing issues. Our technical SEO services ensure your website's architecture is perfectly optimized for Google and other search engines." 
    },
    audience: "Large websites, enterprise platforms, and e-commerce stores suffering from indexing issues, slow load times, or sudden drops in organic traffic.",
    outcomes: [
      "Your valuable pages properly crawled and indexed by Google.",
      "Faster crawl rates, so new content is discovered sooner.",
      "Critical Search Console errors identified and fixed.",
      "A solid, future-proof technical foundation for all your marketing efforts."
    ],
    scope: "Comprehensive technical audit, followed by direct implementation of fixes to the codebase, server configuration, and site architecture.",
    complexity: "Medium",
    availability: "Live",
    core: [
      "In-depth Technical SEO Audit",
      "Crawl Budget Optimization",
      "Robots.txt & XML Sitemap Configuration",
      "Canonical Tag & Pagination Setup",
      "404 Error Resolution & 301 Redirect Mapping",
      "Core Web Vitals Diagnosis"
    ],
    addOns: [
      "Website Migration Support (Domain/Platform Change)",
      "Log File Analysis",
      "International SEO Setup (Hreflang Tags)",
      "JavaScript SEO (Dynamic Rendering Fixes)"
    ],
    recommendations: ["search-visibility-setup", "structured-data-schema-setup", "website-performance-optimization"],
    businessProblems: [
      "Google Search Console is throwing hundreds of 'Discovered - currently not indexed' errors.",
      "You recently redesigned your website and lost half of your organic traffic.",
      "Your site relies heavily on React/JavaScript, and Google is struggling to render the content.",
      "Duplicate content issues are cannibalizing your search rankings."
    ],
    process: [
      { title: "Technical Crawl", description: "We run enterprise-grade crawlers across your site to identify broken links, redirect loops, and structural flaws." },
      { title: "Audit & Prioritization", description: "We analyze the crawl data and prioritize fixes based on their potential impact on your organic traffic." },
      { title: "Code Implementation", description: "Unlike pure consulting agencies, our developers actually go into your codebase and fix the technical issues." },
      { title: "GSC Validation", description: "We submit the fixes to Google Search Console for validation and monitor the indexation progress." },
      { title: "Post-Implementation Monitoring", description: "We monitor the site for 30 days to ensure the technical changes yield positive indexing results." }
    ],
    useCases: [
      { title: "Platform Migration Recovery", description: "Fixing a botched migration from Magento to Shopify by implementing 2,000+ proper 301 redirects to recover lost traffic." },
      { title: "Enterprise Indexing Fix", description: "Optimizing the crawl budget for a 50,000-page news site so Google prioritizes the newest articles instantly." },
      { title: "Faceted Navigation Cleanup", description: "Resolving massive duplicate content issues on an eCommerce site by implementing proper canonicals on product filters." }
    ],
    exclusions: [
      "Writing new blog content or building backlinks.",
      "Fixing underlying server hardware issues (you may need to upgrade your hosting).",
      "Guarantees of #1 rankings (technical SEO is a prerequisite for ranking, not a guarantee)."
    ],
    recommendedTechnologies: ["Google Search Console", "Screaming Frog", "Next.js"],
    pricing: "Pricing depends on the size of the site and how many technical issues the initial audit uncovers. We quote after the audit rather than guessing upfront.",
    timeline: "Technical SEO setup typically takes 2–4 weeks depending on site size and the number of issues found.",
    faqs: [
      { question: "How is this different from content/keyword SEO?", answer: "This service focuses on the technical foundation — crawlability, sitemaps, canonical tags, and site architecture — rather than content strategy. See our Search Visibility Strategy service for keyword and content-focused work." }
    ],
    cta: { label: "Fix Technical SEO", href: "/contact?intent=seo" }
  },
  {
    family: "seo-search",
    slug: "search-visibility-setup",
    title: "Search Visibility Strategy",
    description: "Stop guessing what your customers are searching for. We develop data-backed, high-intent search visibility strategies that align your website's content directly with the problems your target audience is trying to solve.",
    seo: { 
      title: "On-Page SEO & Search Visibility Strategy | HA Web Studio", 
      description: "Data-driven SEO strategies that drive revenue, not just vanity metrics. We optimize your page structure and content to capture high-intent organic traffic." 
    },
    audience: "B2B service providers, SaaS companies, and specialized consultants who need to rank for highly specific, lucrative search terms rather than broad, low-converting keywords.",
    outcomes: [
      "Top-page rankings for keywords that actually drive revenue.",
      "A logical, user-friendly site architecture that passes SEO authority efficiently.",
      "Content that satisfies search intent, reducing bounce rates.",
      "A clear roadmap for future content creation."
    ],
    scope: "Extensive keyword research, competitor analysis, mapping target terms to existing pages, and rewriting on-page elements (titles, headers, meta descriptions) for optimal visibility.",
    complexity: "Medium",
    availability: "Live",
    core: [
      "High-Intent Keyword Research",
      "Competitor Gap Analysis",
      "URL & Site Architecture Strategy",
      "Keyword-to-Page Mapping",
      "On-Page Optimization (Titles, H1/H2s, Meta)",
      "Internal Linking Strategy"
    ],
    addOns: [
      "Content Brief Creation for Writers",
      "Topic Cluster & Pillar Page Strategy",
      "Existing Content Pruning & Consolidation",
      "Featured Snippet Optimization"
    ],
    recommendations: ["technical-seo-setup", "ai-search-visibility-answer-engine-optimization"],
    businessProblems: [
      "You rank #1 for your brand name, but you're invisible for the actual services you provide.",
      "You write a lot of blog posts, but none of them generate any organic traffic.",
      "Competitors with inferior products are outranking you for your most important keywords.",
      "Your website structure is confusing, and Google doesn't know which page is the most important."
    ],
    process: [
      { title: "Discovery & Intent Analysis", description: "We learn your business model to understand which keywords indicate a readiness to buy versus simple research." },
      { title: "Keyword Mapping", description: "We assign specific primary and secondary keywords to individual pages to prevent keyword cannibalization." },
      { title: "On-Page Optimization", description: "We rewrite your meta titles, descriptions, and header tags to perfectly align with the target search queries." },
      { title: "Internal Linking", description: "We restructure how your pages link to one another, ensuring your most important 'money pages' receive the most authority." },
      { title: "Reporting & Handoff", description: "We provide a comprehensive report of the changes made and a roadmap for new content you need to create." }
    ],
    useCases: [
      { title: "Service Page Overhaul", description: "Transforming a generic 'Our Services' page into a siloed architecture with dedicated, highly optimized pages for each specific service." },
      { title: "B2B SaaS Content Strategy", description: "Identifying low-difficulty, high-intent long-tail keywords that competitors are ignoring, and mapping them to specific feature pages." },
      { title: "Content Consolidation", description: "Merging 5 weak, underperforming blog posts into one authoritative 'Pillar Page' that successfully ranks for a highly competitive term." }
    ],
    exclusions: [
      "Ongoing monthly content writing (we provide the strategy and optimization).",
      "Black-hat link building.",
      "Promising overnight results (SEO is a long-term investment)."
    ],
    recommendedTechnologies: ["Ahrefs", "Semrush", "Google Search Console"],
    pricing: "Pricing depends on how many keyword themes and pages are in scope, and the depth of competitor analysis required.",
    timeline: "Initial keyword research and mapping typically takes 2–3 weeks; visible ranking movement is a longer, ongoing process rather than an instant result.",
    faqs: [
      { question: "How long until we rank higher?", answer: "SEO is cumulative — most sites see meaningful movement over a few months of consistent execution, not days or weeks." },
      { question: "Do you write the content too?", answer: "This service covers keyword-to-page mapping and strategy; content production can be scoped separately depending on your needs." }
    ],
    cta: { label: "Improve Organic Visibility", href: "/contact?intent=seo" }
  },
  {
    family: "seo-search",
    slug: "structured-data-schema-setup",
    title: "Structured Data & Schema Setup",
    description: "Speak the language of machines. We implement advanced JSON-LD Schema Markup to explicitly tell search engines what your content is about, enabling Rich Snippets that drastically increase click-through rates.",
    seo: { 
      title: "Structured Data & Schema Markup Implementation | HA Web Studio", 
      description: "Unlock Rich Snippets in Google Search. We implement advanced JSON-LD Schema markup to help search engines perfectly understand and highlight your content." 
    },
    audience: "eCommerce stores, event organizers, recipe publishers, and service businesses who want to stand out in the search results with stars, prices, and FAQs directly in Google.",
    outcomes: [
      "Eligibility for Google Rich Results (stars, product prices, event dates).",
      "Significantly higher Click-Through Rates (CTR) from the search results page.",
      "Clear, unambiguous entity definitions for search engines.",
      "A competitive edge over rivals who only rely on standard HTML."
    ],
    scope: "Audit of current schema, strategy development, and technical implementation of custom JSON-LD scripts across the website templates.",
    complexity: "Low",
    availability: "Live",
    core: [
      "Schema Opportunity Audit",
      "Organization & LocalBusiness Schema",
      "Product & Review/Rating Schema",
      "FAQ & How-To Schema",
      "Article & Author Schema",
      "Validation via Google Rich Results Test"
    ],
    addOns: [
      "Custom Knowledge Graph Entity Mapping",
      "Event Schema Setup",
      "Video Object Schema Implementation",
      "Dynamic Schema Generation (CMS Integration)"
    ],
    recommendations: ["technical-seo-setup", "ecommerce-specific-services"],
    businessProblems: [
      "Competitors have 5-star ratings showing directly in Google search results, but you don't.",
      "Google is pulling the wrong image or description for your products in search.",
      "You have an extensive FAQ section, but it's not being utilized to dominate search real estate.",
      "Search engines are confusing your brand name with a generic dictionary term."
    ],
    process: [
      { title: "Opportunity Mapping", description: "We analyze your website content to identify which types of Schema markup (Products, FAQs, Articles) are applicable." },
      { title: "JSON-LD Scripting", description: "We write clean, error-free JSON-LD scripts tailored specifically to your business data." },
      { title: "Dynamic Integration", description: "For sites like eCommerce or blogs, we integrate the schema dynamically into your templates so it updates automatically when content changes." },
      { title: "Testing & Validation", description: "We run all pages through Google's Rich Results Testing Tool to check for errors or warnings before launch." },
      { title: "Monitoring", description: "We monitor Google Search Console's 'Enhancements' reports to verify that Google is successfully reading the markup." }
    ],
    useCases: [
      { title: "eCommerce Rich Results", description: "Implementing dynamic Product and AggregateRating schema to display prices, availability, and review stars directly in the search results." },
      { title: "Event Visibility", description: "Adding Event schema to a venue's website so their upcoming concerts appear in the special Google Events carousel." },
      { title: "Corporate Entity Definition", description: "Using complex Organization and SameAs schema to firmly establish a company's Knowledge Graph panel and link it to their social profiles." }
    ],
    exclusions: [
      "Schema markup cannot guarantee Rich Results (Google ultimately decides what to display).",
      "Implementing schema for content that doesn't actually exist on the page (this violates Google guidelines).",
      "Legacy Microdata implementation (we strictly use modern JSON-LD)."
    ],
    recommendedTechnologies: ["JSON-LD", "Schema.org", "Google Rich Results Test"],
    pricing: "This is one of our more affordable SEO services since it's implementation-focused rather than ongoing strategy work. Pricing depends on how many schema types (Organization, Product, FAQ, Review) are relevant to your site.",
    timeline: "Structured data implementation typically takes 1‒2 weeks.",
    faqs: [
      { question: "What does this actually do for us?", answer: "It helps search engines and AI systems understand your content more precisely, which can improve how your pages are displayed in search results (rich results, FAQ snippets, etc.)." }
    ],
    cta: { label: "Implement Schema Markup", href: "/contact?intent=seo" }
  },
  {
    family: "seo-search",
    slug: "ai-search-visibility-answer-engine-optimization",
    title: "AI Search Visibility (AEO)",
    description: "The future of search is conversational. We optimize your website's content and structure to ensure your business is accurately retrieved, understood, and cited by AI Answer Engines like ChatGPT, Perplexity, and Google's AI Overviews.",
    seo: { 
      title: "Answer Engine Optimization (AEO) & AI Search Visibility | HA Web Studio", 
      description: "Prepare for the AI revolution. We optimize your website structure and content to be accurately cited by ChatGPT, Perplexity, and Google AI Overviews." 
    },
    audience: "Forward-thinking B2B companies, tech startups, and thought leaders who realize that their customers are asking ChatGPT for recommendations instead of Googling.",
    outcomes: [
      "Your brand is accurately recommended when users ask AI tools for solutions in your industry.",
      "Prevention of 'AI Hallucinations' (incorrect information generated about your company).",
      "Clear, machine-readable documentation of your products, pricing, and features.",
      "Future-proofing your digital presence against the shift away from traditional search engines."
    ],
    scope: "Entity optimization, conversational content structuring, implementation of llms.txt, and strict semantic HTML architecture designed specifically for AI crawlers.",
    complexity: "Medium",
    availability: "Live",
    core: [
      "AI Retrieval Audit (Testing how LLMs currently view you)",
      "Entity & Knowledge Graph Reinforcement",
      "Conversational Content Restructuring (Q&A formatting)",
      "llms.txt File Creation & Implementation",
      "Strict Semantic HTML Enforcement",
      "Information Density Optimization"
    ],
    addOns: [
      "Executive/Founder Entity Mapping",
      "Deep Technical Documentation Structuring",
      "Brand Reputation AI Monitoring",
      "PR & Digital PR Strategy for Citations"
    ],
    recommendations: ["structured-data-schema-setup", "search-visibility-setup"],
    businessProblems: [
      "When you ask ChatGPT for the 'Best [Your Industry] Software', your competitors are listed but you are not.",
      "AI tools are generating outdated pricing or feature information about your product.",
      "Your website is built entirely on flashy visuals and videos, giving AI bots zero actual text to read and understand.",
      "You lack a centralized 'source of truth' that LLMs can easily parse."
    ],
    process: [
      { title: "LLM Diagnostic", description: "We query major AI models (GPT-4, Claude, Perplexity) to see what they currently 'know' about your brand and identify inaccuracies." },
      { title: "Entity Definition", description: "We strengthen your digital footprint by defining your company as a clear entity, linked to authoritative external sources (Crunchbase, Wikipedia, PR)." },
      { title: "Content Restructuring", description: "We reformat key pages to be highly dense in factual information, using direct Q&A formats that AI models prefer to use as citations." },
      { title: "Technical AEO Implementation", description: "We implement specialized files like llms.txt and ensure your HTML structure is impeccably clean and semantic for AI crawlers." },
      { title: "Continuous Monitoring", description: "We periodically test the models to ensure the optimization has taken effect and your brand is being cited correctly." }
    ],
    useCases: [
      { title: "SaaS AI Positioning", description: "Restructuring a B2B software company's feature pages so Perplexity accurately cites them as the top solution for a specific niche workflow." },
      { title: "Hallucination Correction", description: "Fixing an issue where ChatGPT consistently associated a brand with a defunct product line by updating entity schema and creating a clear llms.txt file." },
      { title: "Founder Authority", description: "Establishing a CEO as a recognized entity in their field so AI engines recommend their thought leadership alongside major industry figures." }
    ],
    exclusions: [
      "We cannot force an LLM to recommend you (we provide the correct signals, but the model's training data dictates the output).",
      "Writing Wikipedia pages (that requires independent notability).",
      "Standard keyword stuffing (AEO is about entities and concepts, not exact-match keywords)."
    ],
    recommendedTechnologies: ["Schema.org", "llms.txt", "Semantic HTML"],
    pricing: "Pricing depends on how much content restructuring is needed and the depth of the initial AI retrieval audit. This is a newer discipline, so scope is assessed project by project.",
    timeline: "An initial audit and first round of implementation typically takes 2–4 weeks; like traditional SEO, visibility improvements in AI-generated answers build over time.",
    faqs: [
      { question: "What is Answer Engine Optimization?", answer: "It's the practice of structuring content so AI systems (like ChatGPT, Perplexity, and AI-powered search) can accurately find, understand, and cite your business — alongside traditional search engine optimization, not instead of it." },
      { question: "Is this a replacement for traditional SEO?", answer: "No — it complements it. Strong technical and on-page SEO foundations make AEO more effective, not less necessary." }
    ],
    cta: { label: "Optimize for AI Search", href: "/contact?intent=seo" }
  }
];
