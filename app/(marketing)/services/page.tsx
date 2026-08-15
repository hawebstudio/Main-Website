import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { createMetadata } from '@/lib/seo/metadata'
import { Heading, Text, Eyebrow } from '@/components/primitives/typography'
import { Container } from '@/components/primitives/container'
import { Section } from '@/components/primitives/section'
import { buttonVariants } from '@/components/ui/button'
import { CtaSection } from '@/components/sections/cta-section'
import { CTAS } from '@/lib/data/ctas'
import { JsonLd } from '@/components/seo/json-ld'
import { serviceJsonLd } from '@/lib/seo/json-ld'
import { routes } from '@/config/routes'
import { cn } from '@/lib/utils'
import { getServicesByFamily, serviceFamilies, services } from '@/lib/content/source'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { faqJsonLd } from '@/lib/seo/json-ld'
import { ServicesHero } from '@/components/sections/services/services-hero'
import { familyIcons, offeringGroups, serviceFaqEntries } from '@/components/sections/services/services-data'
import { Breadcrumbs } from '@/components/navigation/breadcrumbs'

export const metadata: Metadata = createMetadata({
  title: 'Services',
  description:
    'Explore HA Web Studio services across websites, ecommerce, search visibility, optimization, and technical delivery.',
  path: '/services',
})

export default async function ServicesPage() {
  const allServices = await services.getAll()
  const breadcrumbItems = [
    { label: 'Home', href: routes.home() },
    { label: 'Services', href: routes.services.index() },
  ]

  return (
    <article className="pb-4 md:pb-8">
      <JsonLd
        data={[
          ...serviceFamilies.map((family) =>
            serviceJsonLd({
              title: family.title,
              description: family.description,
              path: routes.services.family(family.slug),
            }),
          ),
          faqJsonLd(serviceFaqEntries),
        ]}
      />
      <ServicesHero breadcrumbs={<Breadcrumbs items={breadcrumbItems} className="mb-4" />} />

      <Section spacing="lg">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>Three ways to work with us</Eyebrow>
            <Heading level={2} size="xl" className="mt-3">
              Wherever your website is today, there&rsquo;s a clear starting point.
            </Heading>
            <Text size="lg" tone="muted" className="mt-4 leading-relaxed">
              Every service below fits one of three paths. Start with the one that matches where your business is right now.
            </Text>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {offeringGroups.map((group) => (
              <div key={group.key} className="glass-strong flex flex-col gap-4 rounded-[2rem] border border-border/50 p-6">
                <Eyebrow>{group.label}</Eyebrow>
                <Heading level={3} size="lg">
                  {group.title}
                </Heading>
                <Text tone="muted" size="sm" className="leading-relaxed">
                  {group.description}
                </Text>
                <div className="mt-auto flex flex-wrap gap-2 pt-2">
                  {group.familySlugs.map((slug) => {
                    const family = serviceFamilies.find((entry) => entry.slug === slug)
                    if (!family) return null
                    return (
                      <Link
                        key={slug}
                        href={`${routes.services.index()}#${slug}`}
                        className="rounded-full border border-border/60 bg-background/45 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/60 hover:text-primary"
                      >
                        {family.title}
                      </Link>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section spacing="lg" className="border-y border-border/50 bg-background/70">
        <Container>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <Eyebrow>Service families</Eyebrow>
              <Heading level={2} size="xl" className="mt-3">
                {serviceFamilies.length} commercial paths, each organized around business outcomes.
              </Heading>
              <Text size="lg" tone="muted" className="mt-4">
                These families help visitors move from a broad goal to the right service without forcing technical interpretation first.
              </Text>
            </div>
            <div className="flex flex-wrap gap-2 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              {['Editorial', 'Commercial', 'Searchable'].map((item) => (
                <span key={item} className="rounded-full border border-border/60 bg-background/45 px-3 py-1.5">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-10 grid gap-4 xl:grid-cols-12">
            {serviceFamilies.map((family, index) => {
              const Icon = familyIcons[family.slug as keyof typeof familyIcons]
              const familyServices = getServicesByFamily(family.slug)
              return (
                <section
                  key={family.slug}
                  id={family.slug}
                  className={cn(
                    '@container glass-strong rounded-[2rem] border border-border/50 p-6 transition-transform hover:-translate-y-1',
                    [
                      'xl:col-span-7', 'xl:col-span-5',
                      'xl:col-span-6', 'xl:col-span-6',
                      'xl:col-span-4', 'xl:col-span-4', 'xl:col-span-4',
                      'xl:col-span-5', 'xl:col-span-7',
                      'xl:col-span-6', 'xl:col-span-6',
                    ][index] ?? 'xl:col-span-12',
                  )}
                >
                  <div className="flex flex-col gap-6">
                    <div className="max-w-2xl">
                      <div className="flex items-center gap-3">
                        <span className="flex size-11 items-center justify-center rounded-2xl border border-border/60 bg-background/70 text-primary">
                          <Icon className="size-5" />
                        </span>
                        <div>
                          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                            <Eyebrow>Family {String(index + 1).padStart(2, '0')}</Eyebrow>
                            <span className="text-xs text-muted-foreground">
                              &middot; {familyServices.length} {familyServices.length === 1 ? 'service' : 'services'}
                            </span>
                          </div>
                          <Heading level={3} size="lg" className="mt-2">
                            {family.title}
                          </Heading>
                        </div>
                      </div>
                      <Text size="lg" tone="muted" className="mt-4 max-w-3xl leading-relaxed">
                        {family.overview}
                      </Text>
                    </div>

                    <div className="grid gap-4 @lg:grid-cols-2">
                      <div className="rounded-3xl border border-border/60 bg-background/35 p-5">
                        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Services</div>
                        <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                          {familyServices.map((item) => (
                            <li key={item.slug} className="flex items-center gap-2 text-foreground">
                              <span className="size-1.5 rounded-full bg-primary" />
                              <Link
                                href={routes.services.detail(item.slug)}
                                className="transition-colors hover:text-primary"
                              >
                                {item.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="rounded-3xl border border-border/60 bg-background/35 p-5">
                        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">What you will get</div>
                        <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                          {family.whatYouGet.slice(0, 6).map((item) => (
                            <li key={item} className="flex items-center gap-2 text-foreground">
                              <span className="size-1.5 rounded-full bg-primary" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="flex flex-col gap-4 @lg:flex-row @lg:items-center @lg:justify-between">
                      <div className="text-sm text-muted-foreground line-clamp-2">
                        {family.overview}
                      </div>
                      <Link
                        href={routes.services.family(family.slug)}
                        className={buttonVariants({ variant: 'secondary', className: 'shrink-0 self-start whitespace-nowrap @lg:self-auto' })}
                      >
                        {family.cta.label}
                        <ArrowRight className="size-4" />
                      </Link>
                    </div>
                  </div>
                </section>
              )
            })}
          </div>
        </Container>
      </Section>

      <Section spacing="xl">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="glass-strong rounded-[2rem] border border-border/50 p-6 md:p-8">
              <Eyebrow>Internal linking</Eyebrow>
              <Heading level={2} size="xl" className="mt-3">
                A hub should send visitors deeper, not end the journey.
              </Heading>
              <Text size="lg" tone="muted" className="mt-4 leading-relaxed">
                Each service family should connect to related work, case studies, technologies, and insights so the page becomes a navigation layer for both users and search systems.
              </Text>
              <div className="mt-6 flex flex-wrap gap-2 text-sm text-muted-foreground">
                {['Solutions', 'Technologies', 'Work', 'Case Studies', 'Insights', 'Contact'].map((item) => (
                  <span key={item} className="rounded-full border border-border/60 bg-background/45 px-3 py-1.5">
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {allServices.slice(0, 4).map((service) => (
                <div key={service.slug} className="rounded-[2rem] border border-border/50 bg-background/35 p-5">
                  <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Service</div>
                  <Heading level={3} size="sm" className="mt-3">
                    {service.title}
                  </Heading>
                  <Text tone="muted" size="sm" className="mt-3 leading-relaxed">
                    {service.description}
                  </Text>
                  <Link href={routes.services.detail(service.slug)} className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary">
                    View service <ArrowRight className="size-4" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section spacing="lg" className="bg-muted/20">
        <Container>
          <div className="grid gap-4 xl:grid-cols-12">
            <div className="glass-strong rounded-[2rem] border border-border/50 p-6 xl:col-span-7">
              <Eyebrow>Case studies</Eyebrow>
              <Heading level={3} size="lg" className="mt-3">
                What you will find
              </Heading>
              <ul className="mt-4 grid gap-3 text-sm text-muted-foreground md:grid-cols-2">
                {[
                  'Real client projects',
                  'Project goals and challenges',
                  'Design and development process',
                  'Technical solutions',
                  'Business outcomes where available',
                  'Lessons learned',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-foreground">
                    <span className="size-1.5 rounded-full bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href={routes.caseStudies.index()} className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary">
                Explore case studies <ArrowRight className="size-4" />
              </Link>
            </div>

            <div className="glass rounded-[2rem] border border-border/50 p-6 xl:col-span-5">
              <Eyebrow>Website inspiration</Eyebrow>
              <Heading level={3} size="sm" className="mt-3">
                What you will find
              </Heading>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                {[
                  'Curated design inspiration',
                  'UI and UX references',
                  'Layout ideas and interaction patterns',
                  'Modern website trends',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-foreground">
                    <span className="size-1.5 rounded-full bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href={routes.insights.index()} className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary">
                Explore inspiration <ArrowRight className="size-4" />
              </Link>
            </div>

            <div className="glass rounded-[2rem] border border-border/50 p-6 xl:col-span-6">
              <Eyebrow>Responsive design</Eyebrow>
              <Heading level={3} size="sm" className="mt-3">
                What you will get
              </Heading>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                {[
                  'Mobile-first development',
                  'Tablet and desktop optimization',
                  'Consistent experience across devices',
                  'Touch-friendly interactions and responsive layouts',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-foreground">
                    <span className="size-1.5 rounded-full bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass rounded-[2rem] border border-border/50 p-6 xl:col-span-6">
              <Eyebrow>AI and automation</Eyebrow>
              <Heading level={3} size="sm" className="mt-3">
                What you will get
              </Heading>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                {[
                  'AI-powered website features',
                  'Intelligent workflow automation',
                  'Content and process assistance',
                  'Future-ready AI architecture and integrations',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-foreground">
                    <span className="size-1.5 rounded-full bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      <Section spacing="lg" className="bg-muted/20">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="max-w-2xl">
              <Eyebrow>FAQ</Eyebrow>
              <Heading level={2} size="xl" className="mt-3">
                Answers people need before they choose a service.
              </Heading>
              <Text size="lg" tone="muted" className="mt-4 leading-relaxed">
                Keep the language clear, direct, and useful enough for both users and AI systems to extract.
              </Text>
            </div>
            <Accordion type="single" collapsible className="w-full">
              {serviceFaqEntries.map((faq, index) => (
                <AccordionItem key={faq.question} value={`faq-${index}`}>
                  <AccordionTrigger className="text-left text-lg font-medium">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Container>
      </Section>

      <CtaSection
        title="Ready to choose the right service path?"
        description="Start with a project conversation or request an audit if you want a clearer recommendation first."
        primaryCta={CTAS.startProject}
        secondaryCta={CTAS.requestAudit}
        className="mt-12"
      />
    </article>
  )
}
