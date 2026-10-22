import { z } from "zod";

export const imageAssetSchema = z.object({
  src: z.string().min(1),
  alt: z.string().min(1),
  width: z.number().optional(),
  height: z.number().optional(),
});

export const seoMetadataSchema = z.object({
  title: z.string().min(1).max(70),
  description: z.string().min(1).max(200),
  canonical: z.string().url().optional(),
  ogImage: z.string().optional(),
  noIndex: z.boolean().optional(),
});

export const tagSchema = z.object({
  slug: z.string().min(1),
  name: z.string().min(1),
});

export const authorSchema = z.object({
  name: z.string().min(1),
  role: z.string().optional(),
  avatar: imageAssetSchema.optional(),
  bio: z.string().optional(),
  social: z
    .object({
      twitter: z.string().optional(),
      github: z.string().optional(),
      linkedin: z.string().optional(),
    })
    .optional(),
  expertise: z.array(z.string()).optional(),
});

export const contentStatusSchema = z.enum([
  "draft",
  "review",
  "published",
  "archived",
]);

export const contentEntrySchema = z.object({
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be kebab-case"),
  title: z.string().min(1),
  description: z.string().min(1),
  seo: seoMetadataSchema.optional(),
  publishedAt: z.string().optional(),
  updatedAt: z.string().optional(),
  status: contentStatusSchema.optional(),
  author: authorSchema.optional(),
  reviewer: authorSchema.optional(),
  version: z.number().int().positive().optional(),
  draft: z.boolean().optional(),
  tags: z.array(tagSchema).optional(),
  cover: imageAssetSchema.optional(),
});

export const serviceSchema = contentEntrySchema.extend({
  family: z.string().optional(),
  icon: z.string().optional(),
  audience: z.string().optional(),
  businessProblems: z.array(z.string()).optional(),
  outcomes: z.array(z.string()).optional(),
  scope: z.string().optional(),
  complexity: z.enum(["Low", "Medium", "High", "Advanced"]).optional(),
  availability: z.enum(["Live", "Coming Soon"]).optional(),
  core: z.array(z.string()).optional(),
  deliverables: z.array(z.string()).optional(),
  addOns: z.array(z.string()).optional(),
  recommendations: z.array(z.string()).optional(),
  process: z
    .array(z.object({ title: z.string(), description: z.string() }))
    .optional(),
  useCases: z
    .array(z.object({ title: z.string(), description: z.string() }))
    .optional(),
  exclusions: z.array(z.string()).optional(),
  recommendedTechnologies: z.array(z.string()).optional(),
  relatedServices: z.array(z.string()).optional(),
  pricing: z.string().optional(),
  timeline: z.string().optional(),
  faqs: z
    .array(z.object({ question: z.string(), answer: z.string() }))
    .optional(),
  cta: z
    .object({
      label: z.string(),
      href: z.string(),
      variant: z.enum(["primary", "secondary", "ghost"]).optional(),
    })
    .optional(),
});

export const projectSchema = contentEntrySchema.extend({
  category: z.enum(["client", "personal", "internal", "labs", "open-source"]),
  lifecycle: z
    .enum(["live", "in-progress", "experimental", "archived"])
    .optional(),
  client: z.string().optional(),
  whoFor: z.string().optional(),
  year: z.number().int().optional(),
  url: z.string().url().optional(),
  publicLinks: z
    .array(z.object({ label: z.string(), url: z.string().url() }))
    .optional(),
  technologies: z.array(z.string()).optional(),
  featured: z.boolean().optional(),
  scope: z.string().optional(),
  goals: z.array(z.string()).optional(),
  constraints: z.array(z.string()).optional(),
  keyFeatures: z.array(z.string()).optional(),
  technicalHighlights: z.array(z.string()).optional(),

  context: z.string().optional(),
  challenge: z.string().optional(),
  responsibilities: z.array(z.string()).optional(),
  architecture: z.string().optional(),
  implementation: z.string().optional(),
  lessonsLearned: z.string().optional(),

  relatedServiceSlugs: z.array(z.string()).optional(),
  relatedTechnologySlugs: z.array(z.string()).optional(),
  relatedCaseStudySlugs: z.array(z.string()).optional(),
  relatedInsightSlugs: z.array(z.string()).optional(),
  relatedSolutionLinks: z
    .array(z.object({ label: z.string(), href: z.string() }))
    .optional(),
});

export const caseStudySchema = contentEntrySchema.extend({
  caseStudyType: z.enum([
    "client",
    "internal",
    "personal-engineering",
    "technical-investigation",
  ]),
  category: z.enum([
    "business-websites",
    "ecommerce",
    "performance",
    "seo-search-visibility",
    "react",
    "nextjs",
    "ai-automation",
    "infrastructure",
    "architecture",
  ]),
  implementationStatus: z.enum(["live", "in-progress", "archived"]).optional(),
  difficulty: z.enum(["foundation", "intermediate", "advanced"]).optional(),
  summary: z.string().optional(),
  client: z.string().optional(),
  projectLabel: z.string().optional(),
  industry: z.string().optional(),
  year: z.number().int().optional(),
  technologiesUsed: z.array(z.string()).optional(),
  businessGoal: z.string().optional(),
  background: z.string().optional(),
  challenge: z.string().optional(),
  solution: z.string().optional(),
  results: z
    .array(z.object({ label: z.string(), value: z.string() }))
    .optional(),

  businessContext: z.string().optional(),
  constraints: z.union([z.string(), z.array(z.string())]).optional(),
  risks: z.array(z.string()).optional(),
  requirements: z.array(z.string()).optional(),
  investigation: z.string().optional(),
  optionsConsidered: z
    .array(
      z.object({
        option: z.string(),
        decision: z.enum(["selected", "rejected", "deferred"]),
        rationale: z.string(),
      }),
    )
    .optional(),
  decisionMaking: z.string().optional(),
  architecture: z.string().optional(),
  implementation: z.string().optional(),
  implementationSteps: z
    .array(z.object({ phase: z.string(), details: z.string() }))
    .optional(),
  technicalDetails: z.string().optional(),
  outcomes: z.array(z.string()).optional(),
  metricsNote: z.string().optional(),
  lessons: z.string().optional(),
  lessonsLearned: z.array(z.string()).optional(),
  businessImpact: z.string().optional(),
  technicalImpact: z.string().optional(),
  tradeOffs: z.union([z.string(), z.array(z.string())]).optional(),
  nextSteps: z.string().optional(),
  whatToDoDifferently: z.array(z.string()).optional(),

  relatedServiceSlugs: z.array(z.string()).optional(),
  relatedSolutionLinks: z
    .array(z.object({ label: z.string(), href: z.string() }))
    .optional(),
  relatedTechnologySlugs: z.array(z.string()).optional(),
  relatedProjectSlug: z.string().optional(),
  relatedProjectSlugs: z.array(z.string()).optional(),
  relatedInsightSlugs: z.array(z.string()).optional(),
  cta: z
    .object({
      label: z.string(),
      href: z.string(),
      variant: z.enum(["primary", "secondary", "ghost"]).optional(),
    })
    .optional(),
});

export const insightSchema = contentEntrySchema.extend({
  readingTime: z.number().optional(),
  featured: z.boolean().optional(),
  category: z
    .object({
      slug: z.string(),
      name: z.string(),
      description: z.string().optional(),
    })
    .optional(),

  keyTakeaways: z.array(z.string()).optional(),
  estimatedSkillLevel: z
    .enum(["Beginner", "Intermediate", "Advanced"])
    .optional(),
  faqs: z
    .array(z.object({ question: z.string(), answer: z.string() }))
    .optional(),

  relatedServiceSlugs: z.array(z.string()).optional(),
  relatedTechnologySlugs: z.array(z.string()).optional(),
  relatedArticleSlugs: z.array(z.string()).optional(),
  relatedProblemSlugs: z.array(z.string()).optional(),
  relatedCaseStudySlugs: z.array(z.string()).optional(),
});

export const technologySchema = contentEntrySchema.extend({
  kind: z.enum(["root", "category", "technology"]).optional(),
  category: z.string().optional(),
  website: z.string().url().optional(),
  officialWebsite: z.string().url().or(z.literal("")).optional(),
  documentation: z.string().url().or(z.literal("")).optional(),
  icon: z.string().optional(),
  summary: z.string().optional(),
  difficulty: z.enum(["Beginner", "Intermediate", "Advanced"]).optional(),
  featured: z.boolean().optional(),
  logo: imageAssetSchema.optional(),
  useCases: z.array(z.string()).optional(),

  bestFor: z.string().optional(),
  whenRecommended: z.string().optional(),
  whenNotRecommended: z.string().optional(),
  alternatives: z
    .array(
      z.object({
        name: z.string(),
        description: z.string(),
        slug: z.string().optional(),
      }),
    )
    .optional(),
  commonMistakes: z.array(z.string()).optional(),
  faqs: z
    .array(z.object({ question: z.string(), answer: z.string() }))
    .optional(),
  typicalProjectTypes: z.array(z.string()).optional(),
  learningResources: z
    .array(z.object({ title: z.string(), url: z.string().url() }))
    .optional(),
  keywords: z.array(z.string()).optional(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  lastReviewed: z.string().optional(),
  contentPath: z.string().optional(),
  featuredTechnologies: z.array(z.string()).optional(),
  categories: z.array(z.string()).optional(),
  technologies: z.array(z.string()).optional(),

  relatedServiceSlugs: z.array(z.string()).optional(),
  relatedServices: z.array(z.string()).optional(),
  relatedProjectSlugs: z.array(z.string()).optional(),
  relatedWorks: z.array(z.string()).optional(),
  relatedInsightSlugs: z.array(z.string()).optional(),
  relatedInsights: z.array(z.string()).optional(),
  relatedCaseStudySlugs: z.array(z.string()).optional(),
  relatedCaseStudies: z.array(z.string()).optional(),
  relatedTechnologies: z.array(z.string()).optional(),
});

export const problemSchema = contentEntrySchema.extend({
  symptoms: z.array(z.string()).optional(),
  solution: z.string().optional(),
  relatedServiceSlugs: z.array(z.string()).optional(),
  faqs: z
    .array(z.object({ question: z.string(), answer: z.string() }))
    .optional(),

  possibleCauses: z.array(z.string()).optional(),
  approach: z.string().optional(),
  potentialSolutions: z.array(z.string()).optional(),
  howToDiagnose: z.string().optional(),
  beforeHiring: z.string().optional(),
  commonMisconceptions: z.array(z.string()).optional(),

  relatedTechnologySlugs: z.array(z.string()).optional(),
  relatedCaseStudySlugs: z.array(z.string()).optional(),
});

export const promotionSchema = contentEntrySchema.extend({
  // Master switch for this promotion, independent of the date window —
  // lets a promo be paused without deleting or re-dating the file.
  enabled: z.boolean().optional().default(true),

  // ISO date strings (local time). The promotion is only "active" when
  // today's date falls within this range.
  startDate: z.string().min(1),
  endDate: z.string().min(1),

  headline: z.string().min(1),
  discountPercentage: z.number().optional(),

  // Which services the discount applies to — left empty means
  // "applies broadly / ask us which services qualify".
  eligibleServiceSlugs: z.array(z.string()).optional(),

  cta: z.object({
    label: z.string().min(1),
    href: z.string().min(1),
  }),
  secondaryCta: z
    .object({
      label: z.string().min(1),
      href: z.string().nullable().optional(),
    })
    .optional(),

  disclaimer: z.string().optional(),

  // Random delay window (ms) before the popup is eligible to appear.
  displayDelay: z
    .object({
      min: z.number().int().nonnegative(),
      max: z.number().int().nonnegative(),
    })
    .optional(),

  // localStorage key used to cap the popup at once per day per browser.
  localStorageKey: z.string().optional(),

  // Stable identifier used for analytics + campaign attribution on the
  // contact form (?campaign=<campaignId>).
  campaignId: z.string().min(1),

  // When more than one promotion is active at once, the highest
  // priority value wins.
  priority: z.number().optional(),
});

/* ---------- Forms ---------- */

export const contactIntentOptions = [
  { value: "start-project", label: "Start a New Project" },
  { value: "audit", label: "Get a Website Growth Assessment" },
  { value: "improve", label: "Improve an Existing Website" },
  { value: "design", label: "Design (UI/UX)" },
  { value: "development", label: "Custom Development" },
  { value: "ecommerce", label: "Ecommerce" },
  { value: "seo", label: "SEO & Search" },
  { value: "growth", label: "Marketing & Growth" },
  { value: "analytics", label: "Analytics & Tracking" },
  { value: "integrations", label: "Integrations & Automation" },
  { value: "maintenance", label: "Maintenance & Support" },
  { value: "performance-security", label: "Performance & Security" },
  { value: "business-systems", label: "Business Systems (Booking, CRM, etc.)" },
  { value: "consultation", label: "Book a Consultation" },
  { value: "partnership", label: "Partnership / Agency Collaboration" },
  { value: "general", label: "General Enquiry" },
] as const;

export const budgetOptions = [
  { value: "under-500", label: "Under $500" },
  { value: "500-1000", label: "$500 – $1,000" },
  { value: "1000-2500", label: "$1,000 – $2,500" },
  { value: "2500-5000", label: "$2,500 – $5,000" },
  { value: "5000-10000", label: "$5,000 – $10,000" },
  { value: "10000-20000", label: "$10,000 – $20,000" },
  { value: "20000-plus", label: "$20,000+" },
  { value: "custom", label: "Custom range" },
  { value: "not-sure", label: "Not sure yet" },
] as const;

export const contactFormSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Please enter a valid email"),
  company: z.string().optional(),
  budget: z
    .enum(budgetOptions.map((option) => option.value) as [string, ...string[]])
    .optional(),
  customBudget: z.string().max(100).optional(),
  intent: z.enum(
    contactIntentOptions.map((option) => option.value) as [string, ...string[]],
    {
      message: "Please let us know what you need",
    },
  ),
  message: z.string().min(10, "Tell us a little more about your project"),
  website: z.string().max(0).optional(),
  timestamp: z.string().optional(),
  sourcePage: z.string().max(300).optional(),
  campaign: z.string().max(150).optional(),
  utmSource: z.string().max(150).optional(),
  utmMedium: z.string().max(150).optional(),
  utmCampaign: z.string().max(150).optional(),
  utmContent: z.string().max(150).optional(),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
