import type { LucideIcon } from 'lucide-react'
import { Compass, Gauge, Layers3 } from 'lucide-react'

export const heroPrinciples = [
  {
    eyebrow: 'Strategy',
    title: 'Positioning before pixels.',
    description: 'We define the message and the conversion path before any layout decision, so the design has something clear to carry.',
  },
  {
    eyebrow: 'Engineering',
    title: 'Built on Next.js and React.',
    description: 'A modern, maintainable stack means new pages, redesigns, and integrations don\u2019t require starting over.',
  },
  {
    eyebrow: 'Visibility',
    title: 'Found by search and AI.',
    description: 'Technical SEO and structured data are part of every build, so your site is ready for both Google and AI answer engines.',
  },
] as const

export const heroBadges = ['Next.js & React', 'Technical SEO', 'AI Search Ready'] as const

/**
 * Above-the-fold trust signals. Keep these honest and specific — swap in
 * real, current numbers (delivery count, review score, years active)
 * before launch rather than leaving placeholders live.
 */
export interface TrustStat {
  value: string
  label: string
  icon: 'gauge' | 'sparkles' | 'clock' | 'award'
}

export const trustStats: TrustStat[] = [
  {
    value: '95+',
    label: 'Average Lighthouse performance score',
    icon: 'gauge',
  },
  {
    value: '100%',
    label: 'Projects shipped with technical SEO & AI-search readiness',
    icon: 'sparkles',
  },
  {
    value: '3\u20136 wks',
    label: 'Typical time from kickoff to launch',
    icon: 'clock',
  },
  {
    value: '3+ yrs',
    label: 'Combined experience in design & engineering',
    icon: 'award',
  },
]

export const builtForItems = [
  'Small and local businesses',
  'Startups and founders',
  'Ecommerce brands',
  'Agencies and professional services',
] as const

export const problemTags = ['Conversion leakage', 'Slow experiences', 'Content chaos', 'Weak search visibility'] as const

export interface ProblemHighlight {
  title: string
  description: string
  highlight: string
  Icon: LucideIcon
}

export const problemHighlights: ProblemHighlight[] = [
  {
    title: 'Traffic arrives. Revenue doesn\u2019t.',
    description: 'Visitors land on the page but the story, layout, and calls to action aren\u2019t doing the job of turning interest into a conversation.',
    highlight: 'Problem 01 \u2014 Conversion',
    Icon: Compass,
  },
  {
    title: 'A beautiful site that feels slow.',
    description: 'Heavy client bundles and unstructured pages quietly cost you visitors, rankings, and the premium impression the brand is paying for.',
    highlight: 'Problem 02 \u2014 Performance',
    Icon: Gauge,
  },
  {
    title: 'Invisible to search and AI.',
    description: 'Without clean information architecture and structured data, you\u2019re harder for Google to rank \u2014 and harder for AI answer engines to cite at all.',
    highlight: 'Problem 03 \u2014 Visibility',
    Icon: Layers3,
  },
]

export const capabilityExtras = [
  {
    title: 'AI & search visibility',
    description: 'Structured data, clean information architecture, and technical SEO help you get found by Google and cited by AI answer engines like ChatGPT and Perplexity.',
    icon: 'sparkles',
  },
  {
    title: 'Delivery systems',
    description: 'Clean routes, predictable layouts, and reusable content primitives mean new pages ship in days, not a fresh rebuild every time.',
    icon: 'workflow',
  },
] as const

/**
 * Consulting-style process, condensed into four stages so it fits the
 * existing 2-column step grid without losing the "what actually happens"
 * detail that makes it feel like a real methodology rather than a
 * generic four-step graphic.
 */
export const processSteps = [
  {
    title: 'Discover & Position',
    description: 'We start with your business, not a template: goals, audience, competitors, and the message that should own the page. Nothing gets designed until the positioning is right.',
  },
  {
    title: 'Architect & Design',
    description: 'Information architecture, conversion paths, and content model come first. Visual design is applied to a structure that already makes business sense.',
  },
  {
    title: 'Build & Optimize',
    description: 'We implement against a performance budget from day one \u2014 semantic markup, structured data, and Core Web Vitals are checked continuously, not patched in at the end.',
  },
  {
    title: 'Launch & Scale',
    description: 'We ship with search and QA checks in place, then monitor real performance and conversion data so the site keeps improving after launch.',
  },
] as const

export interface Testimonial {
  quote: string
  name: string
  role: string
  company: string
}

/**
 * Placeholder testimonials -- replace with real client quotes (with
 * permission) before this goes live. Fabricated or unverifiable
 * testimonials are a trust and compliance risk, not just a copy detail.
 */
export const testimonials: Testimonial[] = [
  {
    quote:
      'They didn\u2019t just redesign our site \u2014 they made us articulate what we actually do better than we had in years. The new site converts noticeably better.',
    name: 'Founder',
    role: 'Client',
    company: 'Ecommerce brand',
  },
  {
    quote:
      'The process felt more like working with a product team than an agency. Every decision was tied back to a business reason.',
    name: 'Marketing Lead',
    role: 'Client',
    company: 'B2B services company',
  },
  {
    quote:
      'Our load times and search visibility improved almost immediately after launch. It felt engineered, not just designed.',
    name: 'Operations Manager',
    role: 'Client',
    company: 'Professional services firm',
  },
]
