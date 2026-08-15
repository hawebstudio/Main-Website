import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { problems, allCollections } from '@/lib/content/source'
import { getRelatedServices, getRelatedTechnologies, getRelatedCaseStudies } from '@/lib/content/relations'
import { createMetadata } from '@/lib/seo/metadata'
import { faqJsonLd, problemJsonLd } from '@/lib/seo/json-ld'
import { routes } from '@/config/routes'
import { Breadcrumbs } from '@/components/navigation/breadcrumbs'
import { JsonLd } from '@/components/seo/json-ld'
import { HeroWrapper } from '@/components/sections/hero-wrapper'
import { Heading, Text, Eyebrow } from '@/components/primitives/typography'
import { Container } from '@/components/primitives/container'
import { Section } from '@/components/primitives/section'
import { CtaSection } from '@/components/sections/cta-section'
import { SocialShareSection } from '@/components/sections/social-share-section'
import { absoluteUrl } from '@/lib/seo/metadata'
import { mdxComponents } from '@/lib/content/mdx-components'
import { mdxOptions } from '@/lib/content/mdx-options'
import { Badge } from '@/components/ui/badge'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { CheckCircle2, XCircle, Search, AlertCircle, ArrowRight, Lightbulb, ShieldAlert, Stethoscope, BookOpen } from 'lucide-react'
import Link from 'next/link'
import { CTAS } from '@/lib/data/ctas'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ProblemDetailHeroBackground } from '@/components/sections/hero-backgrounds'

interface ProblemPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await problems.getSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: ProblemPageProps): Promise<Metadata> {
  const { slug } = await params
  const problem = await problems.getBySlug(slug)
  if (!problem) return {}

  return createMetadata({
    title: problem.seo?.title ?? problem.title,
    description: problem.seo?.description ?? problem.description,
    path: routes.problems.detail(slug),
    ogImage: problem.cover?.src,
  })
}

export default async function ProblemDetailPage({ params }: ProblemPageProps) {
  const { slug } = await params
  const problem = await problems.getBySlug(slug)
  if (!problem) notFound()

  const allTechnologies = await allCollections.technologies.getAll()
  const relatedTech = await getRelatedTechnologies(problem.relatedTechnologySlugs)
  const relatedServices = await getRelatedServices(problem.relatedServiceSlugs)
  const relatedCaseStudies = await getRelatedCaseStudies(problem.relatedCaseStudySlugs)

  // Get other problems for "Related problems" section
  const allProblems = await problems.getAll()
  const otherProblems = allProblems.filter((p) => p.slug !== problem.slug).slice(0, 4)

  // Resolve technology pills to clickable links (matching service page pattern)
  const resolvedTechnologies = (problem.relatedTechnologySlugs ?? [])
    .map((techSlug) => {
      const found = allTechnologies.find((t) => {
        const tLower = t.slug.toLowerCase()
        const sLower = techSlug.toLowerCase()
        return tLower === sLower || t.title.toLowerCase() === sLower
      })
      return {
        name: found?.title ?? techSlug,
        href: found
          ? routes.technologies.detail(found.category ?? found.slug, found.category ? found.slug : undefined)
          : null,
      }
    })

  const breadcrumbItems = [
    { label: 'Home', href: routes.home() },
    { label: 'Problems', href: routes.problems.index() },
    { label: problem.title, href: routes.problems.detail(problem.slug) },
  ]

  return (
    <>
      <JsonLd
        data={[
          problemJsonLd({
            title: problem.title,
            description: problem.description,
            path: routes.problems.detail(problem.slug),
          }),
          ...(problem.faqs?.length ? [faqJsonLd(problem.faqs)] : []),
        ]}
      />
      <HeroWrapper className="pt-8" background={<ProblemDetailHeroBackground />}>
        <div className="relative z-20 space-y-4">
          <Breadcrumbs items={breadcrumbItems} className="pb-4" />
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            <span className="rounded-full border border-border/60 bg-background/45 px-3 py-1.5">
              Business Problem
            </span>
            {problem.symptoms && (
              <span className="rounded-full border border-border/60 bg-background/45 px-3 py-1.5">
                {problem.symptoms.length} symptoms identified
              </span>
            )}
            {relatedServices.length > 0 && (
              <span className="rounded-full border border-border/60 bg-background/45 px-3 py-1.5">
                {relatedServices.length} services that help
              </span>
            )}
          </div>
          <Heading level={1} size="display" className="max-w-4xl text-balance leading-[0.9] tracking-tight">
            {problem.title}
          </Heading>
          <Text size="lg" tone="muted" className="max-w-2xl text-pretty leading-relaxed">
            {problem.description}
          </Text>
          {problem.solution && (
            <Text size="sm" tone="muted" className="max-w-2xl italic">
              {problem.solution}
            </Text>
          )}
        </div>
      </HeroWrapper>

      <Section spacing="md">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Main Content Column */}
            <div className="@container lg:col-span-8 flex flex-col gap-16">
              
              {/* Symptoms */}
              {problem.symptoms && problem.symptoms.length > 0 && (
                <div className="glass-strong rounded-[2rem] border border-destructive/20 p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="flex size-10 items-center justify-center rounded-2xl border border-destructive/30 bg-destructive/10">
                      <AlertCircle className="size-5 text-destructive" />
                    </span>
                    <Heading level={2} size="lg">Symptoms You Might Be Seeing</Heading>
                  </div>
                  <div className="grid grid-cols-1 @xl:grid-cols-2 gap-3">
                    {problem.symptoms.map((symptom, i) => (
                      <div key={i} className="flex items-start gap-3 rounded-2xl border border-border/50 bg-background/30 px-4 py-3">
                        <XCircle className="size-4 text-destructive shrink-0 mt-0.5" />
                        <Text size="sm">{symptom}</Text>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Possible Causes */}
              {problem.possibleCauses && problem.possibleCauses.length > 0 && (
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="flex size-10 items-center justify-center rounded-2xl border border-border/60 bg-background/70">
                      <Stethoscope className="size-5 text-amber-400" />
                    </span>
                    <Heading level={2} size="lg">What Is Actually Causing It</Heading>
                  </div>
                  <div className="grid gap-3">
                    {problem.possibleCauses.map((cause, i) => (
                      <div key={i} className="flex items-start gap-4 rounded-2xl border border-border/50 bg-background/30 p-4">
                        <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-amber-400 font-bold text-sm">
                          {i + 1}
                        </div>
                        <Text className="mt-0.5">{cause}</Text>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Common Misconceptions — Myth vs Reality */}
              {problem.commonMisconceptions && problem.commonMisconceptions.length > 0 && (
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="flex size-10 items-center justify-center rounded-2xl border border-border/60 bg-background/70">
                      <ShieldAlert className="size-5 text-rose-400" />
                    </span>
                    <Heading level={2} size="lg">Common Misconceptions</Heading>
                  </div>
                  <div className="grid gap-3">
                    {problem.commonMisconceptions.map((myth, i) => (
                      <div key={i} className="flex items-start gap-4 rounded-2xl border border-rose-500/20 bg-rose-500/5 p-4">
                        <div className="flex shrink-0 items-center gap-2 rounded-full bg-rose-500/20 px-2.5 py-1 text-xs font-semibold text-rose-300">
                          ✕ Myth
                        </div>
                        <Text className="mt-0.5">{myth}</Text>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Self Diagnosis */}
              {problem.howToDiagnose && (
                <div className="glass-strong rounded-[2rem] border border-primary/20 p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="flex size-10 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10">
                      <Search className="size-5 text-primary" />
                    </span>
                    <Heading level={3} size="md">How to Diagnose It Yourself</Heading>
                  </div>
                  <Text className="leading-relaxed">{problem.howToDiagnose}</Text>
                </div>
              )}
              
              {/* Before Hiring */}
              {problem.beforeHiring && (
                <div className="rounded-[2rem] border border-border/50 bg-background/30 p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="flex size-10 items-center justify-center rounded-2xl border border-border/60 bg-background/70">
                      <Lightbulb className="size-5 text-amber-400" />
                    </span>
                    <Heading level={3} size="md">What to Do Before Hiring Someone</Heading>
                  </div>
                  <Text className="leading-relaxed">{problem.beforeHiring}</Text>
                </div>
              )}
              
              {/* HA Approach */}
              {problem.approach && (
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="flex size-10 items-center justify-center rounded-2xl border border-border/60 bg-background/70">
                      <BookOpen className="size-5 text-primary" />
                    </span>
                    <Heading level={2} size="lg">How We Approach This</Heading>
                  </div>
                  <Text size="lg" className="leading-relaxed">{problem.approach}</Text>
                </div>
              )}
              
              {/* Potential Solutions */}
              {problem.potentialSolutions && problem.potentialSolutions.length > 0 && (
                <div className="glass-strong rounded-[2rem] border border-primary/20 p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="flex size-10 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10">
                      <CheckCircle2 className="size-5 text-primary" />
                    </span>
                    <Heading level={2} size="lg">Potential Solutions</Heading>
                  </div>
                  <div className="grid gap-3">
                    {problem.potentialSolutions.map((solution, i) => (
                      <div key={i} className="flex items-start gap-4 rounded-2xl border border-border/50 bg-background/30 p-4">
                        <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary font-bold text-sm">
                          {i + 1}
                        </div>
                        <Text className="mt-0.5">{solution}</Text>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* FAQ Accordion */}
              {problem.faqs && problem.faqs.length > 0 && (
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <Heading level={2} size="lg">Frequently Asked Questions</Heading>
                  </div>
                  <Accordion type="single" collapsible className="w-full">
                    {problem.faqs.map((faq, index) => (
                      <AccordionItem key={index} value={`faq-${index}`} className="border-border/50">
                        <AccordionTrigger className="text-left text-base font-medium hover:text-primary">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground leading-relaxed">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              )}
              
              {/* MDX Body Content */}
              {problem.content && (
                <div className="prose dark:prose-invert max-w-none border-t border-border pt-16">
                  <MDXRemote source={problem.content} components={mdxComponents} options={mdxOptions} />
                </div>
              )}
            </div>
            
            {/* Sidebar Column */}
            <div className="lg:col-span-4 flex flex-col gap-8">
              <div className="sticky top-24 flex flex-col gap-8">
                
                {/* Get Help CTA */}
                <div className="glass-strong rounded-[2rem] border border-primary/30 p-6">
                  <Eyebrow className="text-primary">Need help with this?</Eyebrow>
                  <Heading level={3} size="sm" className="mt-3">
                    Let us diagnose the root cause and recommend the right fix.
                  </Heading>
                  <Text size="sm" tone="muted" className="mt-3 leading-relaxed">
                    Every engagement starts with understanding your specific situation — not a one-size-fits-all package.
                  </Text>
                  <div className="mt-5 flex flex-col gap-2">
                    <Link href={CTAS.startProject.href} className={buttonVariants({ size: 'sm', className: 'w-full justify-center' })}>
                      Discuss This Problem
                    </Link>
                    <Link href={CTAS.requestAudit.href} className={buttonVariants({ size: 'sm', variant: 'outline', className: 'w-full justify-center bg-transparent' })}>
                      {CTAS.requestAudit.label}
                    </Link>
                  </div>
                </div>

                {/* Related Services */}
                {relatedServices.length > 0 && (
                  <div className="rounded-[2rem] border border-border/50 bg-background/30 p-6">
                    <Eyebrow className="mb-4">Services that help</Eyebrow>
                    <ul className="flex flex-col gap-3">
                      {relatedServices.map(s => (
                        <li key={s.slug}>
                          <Link
                            href={routes.services.detail(s.slug)}
                            className="group flex items-center justify-between gap-2 rounded-2xl border border-border/50 bg-background/30 px-4 py-3 transition-all hover:border-primary/40 hover:bg-background/50"
                          >
                            <div>
                              <span className="text-sm font-medium text-foreground">{s.title}</span>
                              {s.description && (
                                <p className="mt-0.5 text-xs text-muted-foreground line-clamp-1">{s.description}</p>
                              )}
                            </div>
                            <ArrowRight className="size-3.5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {/* Technologies */}
                {resolvedTechnologies.length > 0 && (
                  <div className="rounded-[2rem] border border-border/50 bg-background/30 p-6">
                    <Eyebrow className="mb-4">Technologies to consider</Eyebrow>
                    <div className="flex flex-wrap gap-2">
                      {resolvedTechnologies.map((tech) =>
                        tech.href ? (
                          <Link
                            key={tech.name}
                            href={tech.href}
                            className="rounded-full border border-border/60 bg-background/45 px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-primary/40 hover:text-primary"
                          >
                            {tech.name}
                          </Link>
                        ) : (
                          <span
                            key={tech.name}
                            className="rounded-full border border-border/60 bg-background/45 px-3 py-1.5 text-xs font-medium text-muted-foreground"
                          >
                            {tech.name}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                )}
                
                {/* Related Case Studies */}
                {relatedCaseStudies.length > 0 && (
                  <div className="rounded-[2rem] border border-border/50 bg-background/30 p-6">
                    <Eyebrow className="mb-4">How we solved this for others</Eyebrow>
                    <ul className="flex flex-col gap-3">
                      {relatedCaseStudies.map(cs => (
                        <li key={cs.slug}>
                          <Link
                            href={routes.caseStudies.detail(cs.slug)}
                            className="group flex items-center justify-between gap-2 rounded-2xl border border-border/50 bg-background/30 px-4 py-3 transition-all hover:border-primary/40 hover:bg-background/50"
                          >
                            <span className="text-sm font-medium text-foreground line-clamp-2">{cs.title}</span>
                            <ArrowRight className="size-3.5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
              </div>
            </div>
            
          </div>
        </Container>
      </Section>

      {/* Related Problems */}
      {otherProblems.length > 0 && (
        <Section spacing="lg" className="border-t border-border/50">
          <Container>
            <div className="max-w-3xl mb-8">
              <Eyebrow>Related challenges</Eyebrow>
              <Heading level={2} size="lg" className="mt-3">
                Other problems you might also be facing.
              </Heading>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {otherProblems.map((p) => (
                <Link
                  key={p.slug}
                  href={routes.problems.detail(p.slug)}
                  className="group flex flex-col gap-3 rounded-[2rem] border border-border/50 bg-background/30 p-5 transition-all hover:border-primary/40 hover:bg-background/50"
                >
                  <Heading level={3} size="sm" className="text-foreground">
                    {p.title}
                  </Heading>
                  <Text size="sm" tone="muted" className="line-clamp-2 leading-relaxed">
                    {p.description}
                  </Text>
                  <span className="mt-auto inline-flex items-center gap-1.5 text-xs font-medium text-primary">
                    Learn more <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              ))}
            </div>
          </Container>
        </Section>
      )}

      <SocialShareSection
        title={problem.title}
        description={problem.description}
        url={absoluteUrl(routes.problems.detail(problem.slug))}
      />

      <CtaSection
        title="Ready to move forward?"
        description={`Tell us more about "${problem.title}" and we'll recommend the right fix.`}
        primaryCta={CTAS.requestAudit}
        secondaryCta={CTAS.startProject}
      />
    </>
  )
}
