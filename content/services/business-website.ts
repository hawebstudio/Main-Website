import { Service } from "@/lib/content/types";

export const businessWebsite: Service = {
  slug: "business-website-development",
  title: "Business Website Development",
  description:
    "Custom business websites designed for performance, scalability, and lead generation.",
  icon: "MonitorPlay",
  audience:
    "Professional services, local businesses, and B2B companies looking to establish a strong digital presence.",
  businessProblems: [
    "My website looks outdated compared to competitors",
    "Visitors are not converting into leads",
    "The website is slow and hard to update",
    "My business lacks professional credibility online",
  ],
  deliverables: [
    "Custom web design & development",
    "Responsive, mobile-first implementation",
    "Content Management System (CMS) integration",
    "Technical SEO foundations",
    "Performance optimization (Core Web Vitals)",
    "Conversion-focused layouts",
  ],
  process: [
    {
      title: "Discover",
      description:
        "We analyze your business, target audience, and competitors to define a clear strategy.",
    },
    {
      title: "Plan",
      description:
        "Information architecture, wireframes, and design system preparation.",
    },
    {
      title: "Build",
      description:
        "Development using modern frameworks (Next.js/React) for optimal performance.",
    },
    {
      title: "Launch",
      description: "Quality assurance, SEO checks, and deployment.",
    },
    {
      title: "Improve",
      description: "Post-launch monitoring and continuous optimization.",
    },
  ],
  recommendedTechnologies: ["Next.js", "React", "Tailwind CSS", "Sanity CMS"],
  relatedServices: [
    "website-redesign",
    "local-seo-foundations",
    "website-performance-optimization",
  ],
  faqs: [
    {
      question: "How long does a business website take to build?",
      answer:
        "Most business website projects run 4 to 8 weeks from discovery through launch, depending on the number of pages, content readiness, and integration requirements.",
    },
    {
      question: "Do you use templates?",
      answer:
        "No — every website is custom-designed and built around your brand, audience, and business goals rather than adapted from a pre-built theme.",
    },
    {
      question: "Will I be able to update the content myself?",
      answer:
        "Yes. A CMS (such as Sanity or WordPress, depending on the project) is integrated so pages, text, and images can be updated without touching code.",
    },
    {
      question: "Is technical SEO included, or is it a separate service?",
      answer:
        "A new build ships with SEO-ready foundations by default — clean URLs, metadata, and site structure. Deeper technical SEO, structured data, and AI search visibility work are available as dedicated follow-on services once the site is live.",
    },
    {
      question: "What is the difference between this and a website redesign?",
      answer:
        "This service is for businesses without a professional website yet. If a website already exists but underperforms — outdated design, poor conversion, weak messaging — Website Redesign is the closer fit.",
    },
  ],
  cta: {
    label: "Start a Project",
    href: "/contact",
  },
};
