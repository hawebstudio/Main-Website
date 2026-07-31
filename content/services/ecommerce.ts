import { Service } from "@/lib/content/types";

export const ecommerce: Service = {
  slug: "ecommerce-development",
  title: "eCommerce Development",
  description:
    "High-converting online stores built on Shopify, WooCommerce, or custom tech stacks.",
  icon: "ShoppingCart",
  audience:
    "Retailers, DTC brands, and businesses looking to sell products online with maximum conversion rates.",
  businessProblems: [
    "My online store has a high cart abandonment rate",
    "The website is too slow and frustrating for mobile shoppers",
    "My current platform limits custom functionality",
    "Inventory and shipping management is disconnected",
  ],
  deliverables: [
    "Custom storefront design",
    "Shopify or WooCommerce setup",
    "Payment gateway integration",
    "Product and inventory data migration",
    "Ecommerce performance optimization",
    "Post-launch support and training",
  ],
  process: [
    {
      title: "Discover",
      description:
        "Analyze product catalog, target audience, and current bottlenecks.",
    },
    {
      title: "Plan",
      description:
        "Platform selection, feature mapping, and UI/UX wireframing.",
    },
    {
      title: "Build",
      description:
        "Storefront development, theme customization, and plugin integration.",
    },
    {
      title: "Launch",
      description: "Payment testing, migration of live data, and go-live.",
    },
    {
      title: "Improve",
      description:
        "Conversion rate optimization (CRO) and ongoing maintenance.",
    },
  ],
  recommendedTechnologies: [
    "Shopify",
    "WooCommerce",
    "Next.js",
    "Payment Gateway APIs",
  ],
  relatedServices: [
    "shopify-development",
    "woocommerce-development",
    "conversion-rate-optimization",
  ],
  faqs: [
    {
      question: "Should I use Shopify, WooCommerce, or a custom build?",
      answer:
        "Shopify suits brands that want a fast launch on a managed platform with hosting and security handled for you. WooCommerce fits businesses that need deeper customization inside WordPress. A custom build makes sense when your catalog, pricing logic, or integrations don\u2019t fit either platform cleanly.",
    },
    {
      question: "Do you help with migrating my existing products?",
      answer:
        "Yes — product data, customer records, and order history are migrated from your previous platform as part of the build, with validation before go-live.",
    },
    {
      question: "What payment gateways can be integrated?",
      answer:
        "Payment gateway integration is scoped to the markets you sell in, including region-specific providers, alongside shipping, tax, and inventory configuration.",
    },
    {
      question: "Will the store be optimized for mobile checkout?",
      answer:
        "Yes — mobile-first checkout performance is treated as a core requirement, not an afterthought, since mobile is typically the majority of ecommerce traffic and the most common source of cart abandonment.",
    },
    {
      question: "Do you offer support after the store launches?",
      answer:
        "Yes, post-launch support and training are included at handover, with ongoing performance optimization and Website Maintenance & Support available as ongoing services.",
    },
  ],
  cta: {
    label: "Talk About Ecommerce",
    href: "/contact",
  },
};
