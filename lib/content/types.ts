/**
 * Content models.
 * Every future page consumes these interfaces. Content can come from
 * MDX, a CMS, or a database — the shape stays the same.
 */

/* ---------- Shared primitives ---------- */

export interface SeoMetadata {
  title: string
  description: string
  canonical?: string
  ogImage?: string
  noIndex?: boolean
}

export interface ImageAsset {
  src: string
  alt: string
  width?: number
  height?: number
}

export interface Cta {
  label: string
  href: string
  variant?: 'primary' | 'secondary' | 'ghost'
}

export interface BreadcrumbItem {
  label: string
  href: string
}

export interface Faq {
  question: string
  answer: string
}

export interface Author {
  name: string
  role?: string
  avatar?: ImageAsset
  bio?: string
  social?: Partial<Record<'twitter' | 'github' | 'linkedin', string>>
  expertise?: string[]
}

export interface Category {
  slug: string
  name: string
  description?: string
}

export interface Tag {
  slug: string
  name: string
}

export interface Industry {
  slug: string
  name: string
  description?: string
}

/* ---------- Navigation ---------- */

export interface NavItem {
  label: string
  href: string
  description?: string
  external?: boolean
  children?: NavItem[]
}

export interface NavGroup {
  title: string
  items: NavItem[]
}

/* ---------- Editorial workflow ---------- */

export type ContentStatus = 'draft' | 'review' | 'published' | 'archived'

export interface EditorialMetadata {
  /** Workflow status. `draft: true` is equivalent to status: 'draft' for backward compatibility */
  status?: ContentStatus
  author?: Author
  reviewer?: Author
  /** Monotonically increasing version number for content revisions */
  version?: number
}

/* ---------- Base entry shared by all content types ---------- */

export interface ContentEntry extends EditorialMetadata {
  slug: string
  title: string
  description: string
  seo?: SeoMetadata
  publishedAt?: string
  updatedAt?: string
  /** @deprecated Use status: 'draft' instead. Kept for backward compatibility. */
  draft?: boolean
  tags?: Tag[]
  cover?: ImageAsset
}

/* ---------- Domain models ---------- */

export interface Service extends ContentEntry {
  family?: string
  icon?: string
  audience?: string
  businessProblems?: string[]
  deliverables?: string[]
  process?: { title: string; description: string }[]
  recommendedTechnologies?: string[]
  relatedServices?: string[]
  faqs?: Faq[]
  cta?: Cta
}

export interface ServiceFamily {
  slug: string
  title: string
  description: string
  seo?: SeoMetadata
  overview: string
  services: string[]
  whatYouGet: string[]
  problems: string[]
  cta: Cta
  faqs?: Faq[]
}

export type WorkCategory = 'client' | 'personal' | 'internal' | 'labs' | 'open-source'

export type ProjectLifecycle = 'live' | 'in-progress' | 'experimental' | 'archived'

export interface Project extends ContentEntry {
  category: WorkCategory
  lifecycle?: ProjectLifecycle
  cover?: ImageAsset
  client?: string
  whoFor?: string
  year?: number
  url?: string
  publicLinks?: { label: string; url: string }[]
  technologies?: string[]
  gallery?: ImageAsset[]
  featured?: boolean
  scope?: string
  goals?: string[]
  constraints?: string[]
  keyFeatures?: string[]
  technicalHighlights?: string[]
  
  context?: string
  challenge?: string
  responsibilities?: string[]
  architecture?: string
  implementation?: string
  lessonsLearned?: string
  
  relatedServiceSlugs?: string[]
  relatedTechnologySlugs?: string[]
  relatedCaseStudySlugs?: string[]
  relatedInsightSlugs?: string[]
  relatedSolutionLinks?: { label: string; href: string }[]
}

export interface CaseStudy extends ContentEntry {
  caseStudyType: 'client' | 'internal' | 'personal-engineering' | 'technical-investigation'
  category:
    | 'business-websites'
    | 'ecommerce'
    | 'performance'
    | 'seo-search-visibility'
    | 'react'
    | 'nextjs'
    | 'ai-automation'
    | 'infrastructure'
    | 'architecture'
  implementationStatus?: 'live' | 'in-progress' | 'archived'
  difficulty?: 'foundation' | 'intermediate' | 'advanced'
  summary?: string
  client?: string
  projectLabel?: string
  industry?: string
  year?: number
  technologiesUsed?: string[]
  businessGoal?: string
  background?: string
  challenge?: string
  solution?: string
  results?: { label: string; value: string }[]

  businessContext?: string
  constraints?: string | string[]
  risks?: string[]
  requirements?: string[]
  investigation?: string
  optionsConsidered?: { option: string; decision: 'selected' | 'rejected' | 'deferred'; rationale: string }[]
  decisionMaking?: string
  architecture?: string
  implementation?: string
  implementationSteps?: { phase: string; details: string }[]
  technicalDetails?: string
  outcomes?: string[]
  metricsNote?: string
  lessons?: string
  lessonsLearned?: string[]
  businessImpact?: string
  technicalImpact?: string
  tradeOffs?: string | string[]
  nextSteps?: string
  whatToDoDifferently?: string[]

  relatedServiceSlugs?: string[]
  relatedSolutionLinks?: { label: string; href: string }[]
  relatedTechnologySlugs?: string[]
  relatedProjectSlug?: string
  relatedProjectSlugs?: string[]
  relatedInsightSlugs?: string[]
  cta?: Cta
}

export interface Technology extends ContentEntry {
  kind?: 'root' | 'category' | 'technology'
  category?: string
  website?: string
  officialWebsite?: string
  documentation?: string
  icon?: string
  summary?: string
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced'
  featured?: boolean
  logo?: ImageAsset
  useCases?: string[]
  
  bestFor?: string
  whenRecommended?: string
  whenNotRecommended?: string
  alternatives?: { name: string; description: string; slug?: string }[]
  commonMistakes?: string[]
  faqs?: Faq[]
  typicalProjectTypes?: string[]
  learningResources?: { title: string; url: string }[]
  keywords?: string[]
  seoTitle?: string
  seoDescription?: string
  lastReviewed?: string
  contentPath?: string
  featuredTechnologies?: string[]
  categories?: string[]
  technologies?: string[]

  relatedServiceSlugs?: string[]
  relatedServices?: string[]
  relatedProjectSlugs?: string[]
  relatedWorks?: string[]
  relatedInsightSlugs?: string[]
  relatedInsights?: string[]
  relatedCaseStudySlugs?: string[]
  relatedCaseStudies?: string[]
  relatedTechnologies?: string[]
}

export interface Insight extends ContentEntry {
  author?: Author
  category?: Category
  readingTime?: number
  featured?: boolean
  
  keyTakeaways?: string[]
  estimatedSkillLevel?: 'Beginner' | 'Intermediate' | 'Advanced'
  
  relatedServiceSlugs?: string[]
  relatedTechnologySlugs?: string[]
  relatedArticleSlugs?: string[]
}

export interface Problem extends ContentEntry {
  symptoms?: string[]
  solution?: string
  relatedServiceSlugs?: string[]
  faqs?: Faq[]
  
  possibleCauses?: string[]
  approach?: string
  potentialSolutions?: string[]
  howToDiagnose?: string
  beforeHiring?: string
  commonMisconceptions?: string[]

  relatedTechnologySlugs?: string[]
  relatedCaseStudySlugs?: string[]
}
