import type { ComponentType } from 'react'
import { Gauge, Globe2, Paintbrush2, Search, ShoppingBag, Target, Wand2 } from 'lucide-react'
import { CTAS } from '@/lib/data/ctas'
import { routes } from '@/config/routes'

export type SolutionSection = {
  slug: string
  title: string
  intro: string
  idealFor?: string[]
  challenges: string[]
  recommendedServices: Array<{ label: string; href: string }>
  outcomes: string[]
  related: Array<{ label: string; href: string }>
  cta: { label: string; href: string }
  style: 'website' | 'redesign' | 'performance' | 'search' | 'conversion' | 'ai'
}

export const finderPaths = [
  { label: 'I need a new website', href: '#need-a-website', icon: Globe2 },
  { label: 'I already have a website', href: '#website-redesign', icon: Paintbrush2 },
  { label: 'I run an ecommerce business', href: routes.services.family('ecommerce'), icon: ShoppingBag },
  { label: 'I want more customers', href: '#not-ranking', icon: Target },
  { label: 'I need custom functionality', href: '#need-ai-features', icon: Wand2 },
]

export const solutionSections: SolutionSection[] = [
  {
    slug: 'need-a-website',
    title: 'Need a Website',
    intro: 'For new businesses, startups, or teams that need a professional digital presence to generate enquiries.',
    idealFor: ['New businesses and startups', 'Teams without an online presence', 'Businesses using outdated websites'],
    challenges: ['No professional online presence', 'Difficult to attract customers', 'Poor credibility', 'Hard to showcase services', 'No lead generation system'],
    recommendedServices: [
      { label: 'Business Website Development', href: routes.services.detail('business-website-development') },
      { label: 'Landing Page Development', href: routes.services.detail('landing-page-development') },
      { label: 'Analytics & Tracking Setup', href: routes.services.detail('analytics-tracking-setup') },
    ],
    outcomes: ['Professional business website', 'Responsive design', 'Lead generation features', 'SEO-ready structure', 'Fast and secure foundation'],
    related: [
      { label: 'Business Website Projects', href: routes.work.index() },
      { label: 'Business Website Success Stories', href: routes.caseStudies.index() },
      { label: 'Website Planning Insights', href: routes.insights.index() },
    ],
    cta: { label: 'Start Your Website Project', href: CTAS.startProject.href },
    style: 'website',
  },
  {
    slug: 'website-redesign',
    title: 'Website Redesign',
    intro: 'For businesses whose current website no longer reflects their brand, goals, or expected customer experience.',
    challenges: ['Outdated design', 'Poor user experience', 'Low credibility', 'Difficult navigation', 'High bounce rate'],
    recommendedServices: [
      { label: 'Website Redesign', href: routes.services.detail('website-redesign') },
      { label: 'Website Performance Optimization', href: routes.services.detail('website-performance-optimization') },
      { label: 'Conversion Rate Optimization', href: routes.services.detail('conversion-rate-optimization') },
      { label: 'Website Audit & Technical Fixes', href: routes.services.detail('website-audit-technical-fixes') },
    ],
    outcomes: ['Modern visual design', 'Improved user experience', 'Better mobile experience', 'Faster performance', 'Improved conversion opportunities'],
    related: [
      { label: 'Website Redesign Service', href: routes.services.detail('website-redesign') },
      { label: 'Performance Optimization', href: routes.services.detail('website-performance-optimization') },
      { label: 'Case Studies', href: routes.caseStudies.index() },
      { label: 'Insights', href: routes.insights.index() },
    ],
    cta: { label: 'Improve My Website', href: CTAS.requestAudit.href },
    style: 'redesign',
  },
  {
    slug: 'website-is-slow',
    title: 'Website Is Slow',
    intro: 'For websites losing visitors and opportunities because performance is holding back user experience.',
    challenges: ['Long loading times', 'Poor Core Web Vitals', 'Slow mobile performance', 'High bounce rate', 'Lost customers'],
    recommendedServices: [
      { label: 'Website Performance Optimization', href: routes.services.detail('website-performance-optimization') },
      { label: 'Website Audit & Technical Fixes', href: routes.services.detail('website-audit-technical-fixes') },
      { label: 'Website Maintenance & Support', href: routes.services.detail('website-maintenance-support') },
    ],
    outcomes: ['Faster loading', 'Better Core Web Vitals', 'Improved user experience', 'Better mobile performance', 'Ongoing optimization recommendations'],
    related: [
      { label: 'Performance Service', href: routes.services.detail('website-performance-optimization') },
      { label: 'Technical Audit', href: routes.services.detail('website-audit-technical-fixes') },
      { label: 'Performance Case Studies', href: routes.caseStudies.index() },
      { label: 'Performance Insights', href: routes.insights.index() },
    ],
    cta: { label: 'Speed Up My Website', href: CTAS.requestAudit.href },
    style: 'performance',
  },
  {
    slug: 'not-ranking',
    title: 'Not Ranking',
    intro: 'For teams that need stronger search visibility, clearer indexing, and a long-term discoverability strategy.',
    challenges: ['Website not appearing on Google', 'Poor visibility', 'Low organic traffic', 'Indexing issues', 'Missing local presence'],
    recommendedServices: [
      { label: 'Technical SEO Setup', href: routes.services.detail('technical-seo-setup') },
      { label: 'Search Visibility Setup', href: routes.services.detail('search-visibility-setup') },
      { label: 'Local SEO Foundations', href: routes.services.detail('local-seo-foundations') },
      { label: 'Structured Data & Schema Setup', href: routes.services.detail('structured-data-schema-setup') },
      { label: 'Google Business & Maps Visibility', href: routes.services.detail('google-business-maps-visibility') },
    ],
    outcomes: ['Improved crawlability', 'Better indexing', 'Local visibility improvements', 'Structured data implementation', 'Long-term search foundation'],
    related: [
      { label: 'Technical SEO', href: routes.services.detail('technical-seo-setup') },
      { label: 'Search Visibility', href: routes.services.detail('search-visibility-setup') },
      { label: 'Google Business', href: routes.services.detail('google-business-maps-visibility') },
      { label: 'SEO Case Studies', href: routes.caseStudies.index() },
      { label: 'SEO Insights', href: routes.insights.index() },
    ],
    cta: { label: 'Improve My Search Visibility', href: CTAS.requestAudit.href },
    style: 'search',
  },
  {
    slug: 'improve-conversions',
    title: 'Improve Conversions',
    intro: 'For businesses with traffic but weak lead or sales outcomes due to unclear journeys and friction points.',
    challenges: ["Visitors don't contact you", 'Low sales', 'Low enquiry rate', 'High abandonment', 'Weak calls-to-action'],
    recommendedServices: [
      { label: 'Conversion Rate Optimization', href: routes.services.detail('conversion-rate-optimization') },
      { label: 'Website Performance Optimization', href: routes.services.detail('website-performance-optimization') },
      { label: 'Landing Page Development', href: routes.services.detail('landing-page-development') },
      { label: 'Analytics & Tracking Setup', href: routes.services.detail('analytics-tracking-setup') },
    ],
    outcomes: ['Improved user journeys', 'Better CTAs', 'Enhanced landing pages', 'Actionable analytics', 'Increased conversion opportunities'],
    related: [
      { label: 'CRO', href: routes.services.detail('conversion-rate-optimization') },
      { label: 'Landing Pages', href: routes.services.detail('landing-page-development') },
      { label: 'Analytics', href: routes.services.detail('analytics-tracking-setup') },
      { label: 'Case Studies', href: routes.caseStudies.index() },
    ],
    cta: { label: 'Improve My Website Conversions', href: CTAS.requestAudit.href },
    style: 'conversion',
  },
  {
    slug: 'need-ai-features',
    title: 'Need AI Features',
    intro: 'For teams that want to automate manual workflows and add intelligent digital features to their business stack.',
    challenges: ['Manual business processes', 'Repetitive customer support', 'No AI-powered features', 'Time-consuming workflows'],
    recommendedServices: [
      { label: 'Custom Web Application Development', href: routes.services.detail('custom-web-application-development') },
      { label: 'Third-Party & API Integrations', href: routes.services.detail('third-party-api-integrations') },
      { label: 'AI Search Visibility & AEO', href: routes.services.detail('ai-search-visibility-answer-engine-optimization') },
    ],
    outcomes: ['AI-powered workflows', 'Intelligent website features', 'Business process automation', 'AI integrations', 'Future-ready architecture'],
    related: [
      { label: 'Custom Applications', href: routes.services.detail('custom-web-application-development') },
      { label: 'API Integrations', href: routes.services.detail('third-party-api-integrations') },
      { label: 'AI Insights', href: routes.insights.index() },
      { label: 'Case Studies', href: routes.caseStudies.index() },
    ],
    cta: { label: 'Discuss AI Solutions', href: CTAS.startProject.href },
    style: 'ai',
  },
]

export const comparisonRows = [
  { goal: 'Build a new online presence', solution: 'Need a Website', href: '#need-a-website' },
  { goal: 'Modernize an existing website', solution: 'Website Redesign', href: '#website-redesign' },
  { goal: 'Improve speed', solution: 'Website Is Slow', href: '#website-is-slow' },
  { goal: 'Increase Google visibility', solution: 'Not Ranking', href: '#not-ranking' },
  { goal: 'Generate more enquiries', solution: 'Improve Conversions', href: '#improve-conversions' },
  { goal: 'Add intelligent features', solution: 'Need AI Features', href: '#need-ai-features' },
]

export const styleMap: Record<SolutionSection['style'], { icon: ComponentType<{ className?: string }>; accent: string; panel: string }> = {
  website: {
    icon: Globe2,
    accent: 'text-cyan-300',
    panel: 'bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.15),transparent_55%)]',
  },
  redesign: {
    icon: Paintbrush2,
    accent: 'text-fuchsia-300',
    panel: 'bg-[radial-gradient(circle_at_top_left,rgba(244,114,182,0.14),transparent_55%)]',
  },
  performance: {
    icon: Gauge,
    accent: 'text-emerald-300',
    panel: 'bg-[radial-gradient(circle_at_top_left,rgba(52,211,153,0.14),transparent_55%)]',
  },
  search: {
    icon: Search,
    accent: 'text-amber-300',
    panel: 'bg-[radial-gradient(circle_at_top_left,rgba(251,191,36,0.16),transparent_55%)]',
  },
  conversion: {
    icon: Target,
    accent: 'text-violet-300',
    panel: 'bg-[radial-gradient(circle_at_top_left,rgba(167,139,250,0.16),transparent_55%)]',
  },
  ai: {
    icon: Wand2,
    accent: 'text-sky-300',
    panel: 'bg-[radial-gradient(circle_at_top_left,rgba(125,211,252,0.16),transparent_55%)]',
  },
}
