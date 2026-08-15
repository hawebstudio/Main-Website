import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, CheckCircle2, Globe2, Gauge, Search, ShoppingBag, Wrench, BarChart3, MapPin, Sparkles, Layout, TrendingUp, Calendar, Link2, Code, ShieldCheck } from 'lucide-react'
import { serviceFamilies, getFamilyBySlug, getServicesByFamily } from '@/lib/content/source'
import {
  getCaseStudiesForServices,
  getInsightsForServices,
  getProjectsForServices,
  getTechnologiesForServices,
} from '@/lib/content/relations'
import { createMetadata } from '@/lib/seo/metadata'
import { collectionPageJsonLd, faqJsonLd } from '@/lib/seo/json-ld'
import { routes } from '@/config/routes'
import { JsonLd } from '@/components/seo/json-ld'
import { Breadcrumbs } from '@/components/navigation/breadcrumbs'
import { HeroWrapper } from '@/components/sections/hero-wrapper'
import { Heading, Text, Eyebrow } from '@/components/primitives/typography'
import { Container } from '@/components/primitives/container'
import { Section } from '@/components/primitives/section'
import { buttonVariants } from '@/components/ui/button'
import { CtaSection } from '@/components/sections/cta-section'
import { CTAS } from '@/lib/data/ctas'
import { CaseStudyCard, InsightCard, ProjectCard, ServiceCard, TechnologyCard } from '@/components/cards/domain-cards'
import { ServiceFamilyHeroBackground } from '@/components/sections/hero-backgrounds'

interface FamilyPageProps {
  params: Promise<{ slug: string }>
}

const icons = {
  'websites': Globe2,
  'design': Layout,
  'ecommerce': ShoppingBag,
  'growth': TrendingUp,
  'seo-search': Search,
  'business-systems': Calendar,
  'integrations': Link2,
  'analytics': BarChart3,
  'performance-security': ShieldCheck,
  'development': Code,
  'maintenance': Sparkles,
} as const

export async function generateStaticParams() {
  return serviceFamilies.map((family) => ({ slug: family.slug }))
}

export async function generateMetadata({ params }: FamilyPageProps): Promise<Metadata> {
  const resolvedParams = await params
  const family = getFamilyBySlug(resolvedParams.slug)

  if (!family) return {}

  return createMetadata({
    title: family.seo?.title ?? family.title,
    description: family.seo?.description ?? family.description,
    path: routes.services.family(family.slug),
  })
}

export default async function ServiceFamilyPage({ params }: FamilyPageProps) {
  const resolvedParams = await params
  const family = getFamilyBySlug(resolvedParams.slug)

  if (!family) {
    return notFound()
  }

  const familyServices = getServicesByFamily(family.slug)
  const familyServiceSlugs = familyServices.map((service) => service.slug)
  const [relatedProjects, relatedCaseStudies, relatedInsights, relatedTechnologies] = await Promise.all([
    getProjectsForServices(familyServiceSlugs),
    getCaseStudiesForServices(familyServiceSlugs),
    getInsightsForServices(familyServiceSlugs),
    getTechnologiesForServices(familyServiceSlugs),
  ])
  const Icon = icons[family.slug as keyof typeof icons]
  const breadcrumbItems = [
    { label: 'Home', href: routes.home() },
    { label: 'Services', href: routes.services.index() },
    { label: family.title, href: routes.services.family(family.slug) },
  ]

  const faqEntries =
    family.faqs ?? [
      {
        question: 'When should I choose this family?',
        answer: 'Choose this family when your main business goal matches the category description and the services underneath it.',
      },
      {
        question: 'What happens after I choose a family?',
        answer: 'You can move into the most relevant service page, related work, and a consultation or audit conversation.',
      },
    ]

  return (
    <article className="pb-4 md:pb-8">
      <JsonLd
        data={[
          collectionPageJsonLd({
            title: family.seo?.title ?? family.title,
            description: family.seo?.description ?? family.description,
            path: routes.services.family(family.slug),
            items: familyServices.map((service) => ({
              title: service.title,
              path: routes.services.detail(service.slug),
            })),
          }),
          faqJsonLd(faqEntries),
        ]}
      />
      <HeroWrapper
        className="pb-14 pt-8 md:pb-20"
        background={<ServiceFamilyHeroBackground />}
      >
        <div className="mx-auto flex max-w-5xl flex-col gap-6 relative z-20">
          <Breadcrumbs items={breadcrumbItems} className="pb-4" />
          <div className="flex items-center gap-3">
            <span className="flex size-12 items-center justify-center rounded-2xl border border-border/60 bg-background/70 text-primary">
              <Icon className="size-6" />
            </span>
            <Eyebrow>Service family</Eyebrow>
          </div>
          <Heading level={1} size="display" className="max-w-4xl text-balance leading-[0.9] tracking-tight">
            {family.title}
          </Heading>
          <Text size="lg" tone="muted" className="max-w-3xl text-pretty leading-relaxed">
            {family.description}
          </Text>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href={family.cta.href} className={buttonVariants({ size: 'lg' })}>
              {family.cta.label}
            </Link>
            <Link href={routes.services.index()} className={buttonVariants({ size: 'lg', variant: 'outline', className: 'bg-transparent' })}>
              Back to services
            </Link>
          </div>
        </div>
      </HeroWrapper>

      <Section spacing="lg">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="glass-strong rounded-[2rem] border border-border/50 p-6 md:p-8">
              <Eyebrow>Overview</Eyebrow>
              <Heading level={2} size="xl" className="mt-3">
                {family.overview}
              </Heading>
              <Text size="lg" tone="muted" className="mt-4 leading-relaxed">
                This category groups the services that solve the same class of business problem and leads visitors toward the right implementation path.
              </Text>
            </div>
            <div className="rounded-[2rem] border border-border/50 bg-background/35 p-6">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Problems solved</div>
              <div className="mt-4 space-y-3">
                {family.problems.map((problem) => (
                  <div key={problem} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 size-4 text-primary" />
                    <Text className="leading-relaxed">{problem}</Text>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section spacing="lg" className="bg-muted/20">
        <Container>
          <div className="flex items-end justify-between gap-6">
            <div>
              <Eyebrow>Services</Eyebrow>
              <Heading level={2} size="xl" className="mt-3">
                The individual services in this family.
              </Heading>
            </div>
            <Link href={family.cta.href} className={buttonVariants({ variant: 'ghost', className: 'hidden md:flex' })}>
              Start a conversation <ArrowRight className="ml-2 size-4" />
            </Link>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {familyServices.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </Container>
      </Section>

      <Section spacing="lg">
        <Container>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-[2rem] border border-border/50 bg-background/35 p-6">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">What you'll get</div>
              <div className="mt-4 space-y-3">
                {family.whatYouGet.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 size-4 text-primary" />
                    <Text className="leading-relaxed">{item}</Text>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[2rem] border border-border/50 bg-background/35 p-6">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Buyer's journey</div>
              <Text tone="muted" className="mt-4 leading-relaxed">
                Use this category when you know the broad business goal, but need help identifying the exact service and scope.
              </Text>
            </div>
          </div>
        </Container>
      </Section>

      {relatedProjects.length || relatedCaseStudies.length || relatedInsights.length || relatedTechnologies.length ? (
        <Section spacing="lg" className="bg-muted/20">
          <Container>
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div className="max-w-3xl">
                <Eyebrow>Connected content</Eyebrow>
                <Heading level={2} size="xl" className="mt-3">
                  Evidence and guidance connected to this service family.
                </Heading>
                <Text size="lg" tone="muted" className="mt-4 leading-relaxed">
                  Related work, case studies, insights, and technologies are resolved from service metadata instead of page-specific hardcoding.
                </Text>
              </div>
              <Link href={routes.services.index()} className={buttonVariants({ variant: 'outline', className: 'bg-transparent' })}>
                View all services
              </Link>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {relatedProjects.length ? (
                <div className="rounded-[2rem] border border-border/50 bg-background/35 p-5">
                  <Eyebrow>Related work</Eyebrow>
                  <div className="mt-4 grid gap-4">
                    {relatedProjects.slice(0, 3).map((project) => (
                      <ProjectCard key={project.slug} project={project} />
                    ))}
                  </div>
                </div>
              ) : null}

              {relatedCaseStudies.length ? (
                <div className="rounded-[2rem] border border-border/50 bg-background/35 p-5">
                  <Eyebrow>Case studies</Eyebrow>
                  <div className="mt-4 grid gap-4">
                    {relatedCaseStudies.slice(0, 3).map((caseStudy) => (
                      <CaseStudyCard key={caseStudy.slug} caseStudy={caseStudy} />
                    ))}
                  </div>
                </div>
              ) : null}

              {relatedInsights.length ? (
                <div className="rounded-[2rem] border border-border/50 bg-background/35 p-5">
                  <Eyebrow>Insights</Eyebrow>
                  <div className="mt-4 grid gap-4">
                    {relatedInsights.slice(0, 3).map((insight) => (
                      <InsightCard key={insight.slug} insight={insight} />
                    ))}
                  </div>
                </div>
              ) : null}

              {relatedTechnologies.length ? (
                <div className="rounded-[2rem] border border-border/50 bg-background/35 p-5">
                  <Eyebrow>Technologies</Eyebrow>
                  <div className="mt-4 grid gap-4">
                    {relatedTechnologies.slice(0, 3).map((technology) => (
                      <TechnologyCard key={technology.slug} technology={technology} />
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </Container>
        </Section>
      ) : null}

      <Section spacing="lg" className="bg-muted/20">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <Eyebrow>FAQ</Eyebrow>
              <Heading level={2} size="xl" className="mt-3">
                Common questions about this family.
              </Heading>
            </div>
            <div className="space-y-4">
              {faqEntries.map((faq) => (
                <div key={faq.question} className="rounded-3xl border border-border/50 bg-background/35 p-5">
                  <Heading level={3} size="sm">
                    {faq.question}
                  </Heading>
                  <Text tone="muted" className="mt-3 leading-relaxed">
                    {faq.answer}
                  </Text>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <CtaSection title={family.cta.label} description="Move from a broad goal into the service that fits best." primaryCta={family.cta} secondaryCta={CTAS.requestAudit} />
    </article>
  )
}
