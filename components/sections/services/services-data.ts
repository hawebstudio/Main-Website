import {
  BarChart3,
  Gauge,
  Globe2,
  Layers,
  Palette,
  Plug,
  Search,
  ShieldCheck,
  ShoppingBag,
  TrendingUp,
  Wrench,
} from 'lucide-react'
import { routes } from '@/config/routes'

export const discoveryPaths = [
  { label: 'I need a new website', href: routes.services.family('website-development'), icon: Globe2 },
  { label: 'I want to improve my existing website', href: routes.services.family('website-optimization-care'), icon: Gauge },
  { label: 'I need better search visibility', href: routes.services.family('search-discoverability'), icon: Search },
  { label: 'I run an ecommerce business', href: routes.services.family('ecommerce'), icon: ShoppingBag },
  { label: 'I need custom functionality', href: routes.services.family('custom-web-applications'), icon: Wrench },
]

// Positioning layer only — groups the existing service families into three
// commercial paths (Build / Transform / Grow). Does not replace or
// restructure the underlying family/service architecture or any URLs.
export const offeringGroups = [
  {
    key: 'build',
    label: '01 — Build',
    title: 'New websites, stores, and web applications.',
    description:
      'For businesses starting fresh: a new website, an online store, or a custom web application, built the right way from day one.',
    familySlugs: ['website-development', 'ecommerce', 'custom-web-applications'],
  },
  {
    key: 'transform',
    label: '02 — Transform',
    title: 'Redesign, optimize, and modernize what already exists.',
    description:
      'For businesses with a website that isn\u2019t pulling its weight: slow, outdated, hard to maintain, or falling behind technically.',
    familySlugs: ['website-optimization-care', 'automation-integrations'],
  },
  {
    key: 'grow',
    label: '03 — Grow',
    title: 'Search visibility, analytics, and ongoing improvement.',
    description:
      'For businesses that need more from the traffic they already have: SEO, analytics, and continuous conversion improvement.',
    familySlugs: ['search-discoverability'],
  },
] as const

// Keys must match the family `slug` values in content/services/index.ts
export const familyIcons = {
  'website-development': Globe2,
  ecommerce: ShoppingBag,
  'search-discoverability': Search,
  'automation-integrations': Layers,
  'custom-web-applications': Wrench,
  'website-optimization-care': ShieldCheck,
  // Legacy aliases for backward safety
  websites: Globe2,
  design: Palette,
  growth: TrendingUp,
  'seo-search': Search,
  'business-systems': Layers,
  integrations: Plug,
  analytics: BarChart3,
  'performance-security': ShieldCheck,
  development: Wrench,
  maintenance: Gauge,
} as const

export const serviceFaqEntries = [
  {
    question: 'How do I know which service family is right for me?',
    answer:
      'Start with the business outcome you want. If you need a stronger online presence, begin with Business Websites. If your site already exists but is underperforming, Website Performance is usually the right entry point.',
  },
  {
    question: 'What is the difference between SEO and AI Search Visibility?',
    answer:
      'SEO helps people find your site through search engines. AI Search Visibility helps systems like answer engines extract and trust your content. The two overlap, but they are not identical.',
  },
  {
    question: 'Do you only work on full website builds?',
    answer:
      'No. We also handle audits, performance work, ecommerce improvements, migrations, integrations, and technical consulting when a full rebuild is not the right move.',
  },
]
