import { Category, Tag, Industry } from './types'

export const industries: Industry[] = [
  { slug: 'healthcare', name: 'Healthcare', description: 'Medical clinics, telehealth, and health tech.' },
  { slug: 'professional-services', name: 'Professional Services', description: 'Law firms, financial advisors, and consultants.' },
  { slug: 'retail', name: 'Retail', description: 'Brick-and-mortar stores and ecommerce.' },
  { slug: 'technology', name: 'Technology', description: 'SaaS, startups, and software companies.' },
  { slug: 'education', name: 'Education', description: 'Schools, e-learning, and universities.' }
]

export const contentCategories = {
  technologies: [
    { slug: 'frontend', name: 'Frontend' },
    { slug: 'backend', name: 'Backend' },
    { slug: 'databases', name: 'Databases' },
    { slug: 'cms', name: 'CMS' },
    { slug: 'ai-automation', name: 'AI & Automation' },
    { slug: 'cloud-infrastructure', name: 'Cloud & Infrastructure' },
    { slug: 'infrastructure', name: 'Application Infrastructure' },
    { slug: 'seo-analytics', name: 'SEO & Analytics' },
    { slug: 'ecommerce', name: 'Ecommerce' },
    { slug: 'communication', name: 'Communication' },
    { slug: 'development', name: 'Development Tooling' },
    { slug: 'design', name: 'Design' },
  ] as Category[],
  insights: [
    { slug: 'websites', name: 'Websites' },
    { slug: 'ecommerce', name: 'Ecommerce' },
    { slug: 'seo', name: 'SEO' },
    { slug: 'performance', name: 'Performance' },
    { slug: 'cro', name: 'CRO' },
    { slug: 'development', name: 'Development' },
    { slug: 'ai-search', name: 'AI Search' },
    { slug: 'local-seo', name: 'Local SEO' }
  ] as Category[],
  caseStudies: [
    { slug: 'business-websites', name: 'Business Websites' },
    { slug: 'ecommerce', name: 'Ecommerce' },
    { slug: 'performance', name: 'Performance' },
    { slug: 'seo-search-visibility', name: 'SEO & Search Visibility' },
    { slug: 'react', name: 'React' },
    { slug: 'nextjs', name: 'Next.js' },
    { slug: 'ai-automation', name: 'AI & Automation' },
    { slug: 'infrastructure', name: 'Infrastructure' },
    { slug: 'architecture', name: 'Architecture' },
  ] as Category[],
}

export const tags: Tag[] = [
  { slug: 'nextjs', name: 'Next.js' },
  { slug: 'react', name: 'React' },
  { slug: 'typescript', name: 'TypeScript' },
  { slug: 'tailwind', name: 'Tailwind CSS' },
  { slug: 'shopify', name: 'Shopify' },
  { slug: 'woocommerce', name: 'WooCommerce' },
  { slug: 'headless', name: 'Headless' },
  { slug: 'api', name: 'API' },
]

export function getIndustryBySlug(slug: string) {
  return industries.find(i => i.slug === slug)
}

export function getCategoryBySlug(collection: keyof typeof contentCategories, slug: string) {
  return contentCategories[collection]?.find(c => c.slug === slug)
}

export function getTagBySlug(slug: string) {
  return tags.find(t => t.slug === slug)
}
