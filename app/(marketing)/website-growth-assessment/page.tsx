import type { Metadata } from 'next'
import Link from 'next/link'
import {
  CheckCircle2,
  Search,
  Gauge,
  MousePointerClick,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react'
import { createMetadata } from '@/lib/seo/metadata'
import { faqJsonLd, webPageJsonLd } from '@/lib/seo/json-ld'
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

const pageDescription =
  'A no-obligation review of your website covering SEO visibility, technical performance, conversion paths, and trust — so you know what to fix first before you commit to a scope.'

export const metadata: Metadata = createMetadata({
  title: 'Website Growth Assessment | HA Web Studio',
  description: pageDescription,
  path: '/website-growth-assessment',
})

const breadcrumbItems = [
  { label: 'Home', href: routes.home() },
  { label: 'Website Growth Assessment', href: '/website-growth-assessment' },
]

// Primary conversion action for this page — the actual lead-capture form,
// preserving the existing 'audit' intent used across the site.
const startAssessmentCta = { label: 'Start My Assessment', href: routes.contact('audit') }

const reviewAreas = [
  {
    category: 'Search & Visibility',
    icon: Search,
    items: [
      'SEO visibility and technical SEO foundations',
      'AI/search readiness — how you show up in AI-assisted search',
      'Structured data and indexing basics',
      'Competitor positioning in search results',
    ],
  },
  {
    category: 'Speed & Technical Health',
    icon: Gauge,
    items: [
      'Website speed and Core Web Vitals',
      'Mobile experience and responsiveness',
      'Accessibility basics',
    ],
  },
  {
    category: 'Conversion & Messaging',
    icon: MousePointerClick,
    items: [
      'Conversion paths — where visitors drop off before enquiring',
      'Messaging clarity and trust signals',
      'Information architecture and navigation',
      'Lead-generation opportunities you may be missing',
    ],
  },
  {
    category: 'Measurement',
    icon: ShieldCheck,
    items: ['Analytics setup and whether you can actually measure what matters'],
  },
]

const process = [
  {
    step: '01',
    title: 'Tell us about your website',
    description: 'A short form — your site, what you sell or offer, and what feels off or underperforming.',
  },
  {
    step: '02',
    title: 'We review it',
    description:
      'We look at your site against the areas above and note what stands out — strengths and the things most likely holding growth back.',
  },
  {
    step: '03',
    title: 'You get a clear next step',
    description:
      'We tell you what we found and what we would prioritize first. If it makes sense to work together, we will be upfront about scope and cost before anything begins.',
  },
]

const faqs = [
  {
    question: 'Does this cost anything?',
    answer:
      "The assessment conversation itself doesn't commit you to any paid work. If a deeper technical audit or a project makes sense afterward, we'll always be upfront about scope and cost before starting anything.",
  },
  {
    question: 'Is this a sales pitch?',
    answer:
      "It's a genuine look at your website. Sometimes the honest answer is that your site is in reasonable shape and doesn't need a rebuild — we'll tell you that too.",
  },
  {
    question: 'What if I just have one specific problem, not a full website review?',
    answer:
      'That works too. Tell us the specific issue — slow pages, low conversions, poor search visibility — and we will focus the review there instead of a full pass.',
  },
  {
    question: "Do I need to be ready to start a project to request this?",
    answer:
      "No. This is meant to be a useful first step even if you're just trying to understand where your website stands today.",
  },
]

export default function WebsiteGrowthAssessmentPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd({
            title: 'Website Growth Assessment',
            description: pageDescription,
            path: '/website-growth-assessment',
          }),
          faqJsonLd(faqs),
        ]}
      />

      <HeroWrapper className="py-14 md:py-20">
        <Breadcrumbs items={breadcrumbItems} className="mb-4" />
        <div className="mx-auto flex max-w-4xl flex-col gap-6">
          <Eyebrow>Website Growth Assessment</Eyebrow>
          <Heading level={1} size="display" className="text-balance leading-[0.9] tracking-tight">
            Find out what&rsquo;s holding your website back.
          </Heading>
          <Text size="lg" tone="muted" className="max-w-2xl text-pretty leading-relaxed">
            A no-obligation review of your website — SEO, speed, conversion, and trust — so you know
            what to fix first before you commit to a scope.
          </Text>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link href={startAssessmentCta.href} className={buttonVariants({ size: 'lg' })}>
              {startAssessmentCta.label}
            </Link>
            <Link
              href={CTAS.viewWork.href}
              className={buttonVariants({ size: 'lg', variant: 'outline', className: 'bg-transparent' })}
            >
              {CTAS.viewWork.label}
            </Link>
          </div>
        </div>
      </HeroWrapper>

      <Section spacing="lg" className="bg-muted/20">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>What we review</Eyebrow>
            <Heading level={2} size="xl" className="mt-3">
              Everything that affects whether your website actually generates business.
            </Heading>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {reviewAreas.map((area) => (
              <div key={area.category} className="rounded-[2rem] border border-border/50 bg-background/35 p-6">
                <div className="flex items-center gap-3">
                  <area.icon className="size-5 text-primary" />
                  <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                    {area.category}
                  </div>
                </div>
                <div className="mt-4 space-y-3">
                  {area.items.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                      <Text className="leading-relaxed">{item}</Text>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section spacing="lg">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>How it works</Eyebrow>
            <Heading level={2} size="xl" className="mt-3">
              Three steps, starting today.
            </Heading>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {process.map((item) => (
              <div key={item.step} className="rounded-[2rem] border border-border/50 bg-background/35 p-6">
                <div className="text-sm font-semibold text-primary">{item.step}</div>
                <Heading level={3} size="sm" className="mt-3">
                  {item.title}
                </Heading>
                <Text tone="muted" className="mt-3 leading-relaxed">
                  {item.description}
                </Text>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section spacing="lg" className="bg-muted/20">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>FAQ</Eyebrow>
            <Heading level={2} size="xl" className="mt-3">
              Common questions.
            </Heading>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {faqs.map((faq) => (
              <div key={faq.question}>
                <Heading level={3} size="sm">
                  {faq.question}
                </Heading>
                <Text tone="muted" className="mt-3 leading-relaxed">
                  {faq.answer}
                </Text>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <CtaSection
        title="Ready to see where you stand?"
        description="Tell us about your website and we'll tell you what to prioritize first."
        primaryCta={startAssessmentCta}
        secondaryCta={CTAS.startProject}
      />

      <Section spacing="sm" className="pb-16 pt-0">
        <Container className="flex justify-center">
          <Link href={routes.services.index()} className={buttonVariants({ variant: 'ghost' })}>
            Or browse services first <ArrowRight className="ml-2 size-4" />
          </Link>
        </Container>
      </Section>
    </>
  )
}
