import { BarChart3, Gauge, Globe2, MapPin, Search, ShoppingBag, Sparkles, Wrench } from 'lucide-react'
import { routes } from '@/config/routes'

export const discoveryPaths = [
  { label: 'I need a new website', href: routes.services.family('business-websites'), icon: Globe2 },
  { label: 'I want to improve my existing website', href: routes.services.family('website-performance'), icon: Gauge },
  { label: 'I need better search visibility', href: routes.services.family('seo-search-visibility'), icon: Search },
  { label: 'I run an ecommerce business', href: routes.services.family('ecommerce'), icon: ShoppingBag },
  { label: 'I need custom functionality', href: routes.services.family('custom-web-applications'), icon: Wrench },
]

export const familyIcons = {
  'business-websites': Globe2,
  ecommerce: ShoppingBag,
  'website-performance': Gauge,
  'seo-search-visibility': Search,
  'google-business': MapPin,
  analytics: BarChart3,
  'custom-web-applications': Wrench,
  'website-management': Sparkles,
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
