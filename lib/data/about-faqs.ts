import type { Faq } from '@/lib/content/types'

/**
 * Answer these the way you'd want an AI answer engine (ChatGPT, Google AI
 * Overviews, Perplexity) or a search snippet to actually quote you: a
 * direct answer in the first sentence, then supporting detail. Keep this
 * array in sync with anything written in the FAQ section copy — the
 * FAQPage schema is generated straight from this file.
 */
export const aboutFaqs: Faq[] = [
  {
    question: 'What does HA Web Studio do?',
    answer:
      'HA Web Studio designs and builds fast, modern, conversion-focused websites and web applications for small businesses, startups, and ecommerce brands. Services include website design and development, Next.js and React development, ecommerce builds on Shopify and WooCommerce, technical and local SEO, performance optimization, and AI search visibility.',
  },
  {
    question: 'What technologies does HA Web Studio use?',
    answer:
      'The core stack is React, Next.js, TypeScript, and Tailwind CSS on the frontend, with Node.js and Express on the backend, MongoDB or PostgreSQL for data, and Shopify, WooCommerce, or Sanity CMS depending on the project. Every technology choice is made for the specific project rather than defaulted to.',
  },
  {
    question: 'How is AI search optimization different from traditional SEO?',
    answer:
      'Traditional SEO focuses on ranking a page on a search results list. AI search optimization focuses on making a website easy for AI systems like ChatGPT, Google AI Overviews, and Perplexity to understand and cite when generating an answer. It relies on the same technical foundation as good SEO, plus structured data, clear content architecture, and demonstrated expertise.',
  },
  {
    question: 'Does HA Web Studio build custom websites or use templates?',
    answer:
      'Every website is custom-built around the client\u2019s brand and goals rather than adapted from a generic template. Design work happens first in Figma and is approved before development begins, so the final site matches what was reviewed.',
  },
  {
    question: 'How long does a typical website project take?',
    answer:
      'Timelines depend on scope, a marketing website typically takes a few weeks, while a full ecommerce build or custom web application takes longer. A firm timeline is provided as part of every project proposal after scope is defined.',
  },
  {
    question: 'What industries does HA Web Studio work with?',
    answer:
      'HA Web Studio works with small and local businesses, startups, agencies, ecommerce brands, and professionals across industries including healthcare, restaurants, real estate, manufacturing, education, travel, fashion, and home services.',
  },
]
