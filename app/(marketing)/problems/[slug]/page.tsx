import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { problems } from '@/lib/content/source'
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
import { CheckCircle2, XCircle, Search, AlertCircle } from 'lucide-react'
import Link from 'next/link'

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

  const relatedTech = await getRelatedTechnologies(problem.relatedTechnologySlugs)
  const relatedServices = await getRelatedServices(problem.relatedServiceSlugs)
  const relatedCaseStudies = await getRelatedCaseStudies(problem.relatedCaseStudySlugs)
  
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
      <Breadcrumbs items={breadcrumbItems} className="pt-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" />
      
      <HeroWrapper>
        <Eyebrow className="mb-4">Business Problem</Eyebrow>
        <Heading level={1} size="display">
          {problem.title}
        </Heading>
        <Text size="lg" tone="muted" className="max-w-2xl">
          {problem.description}
        </Text>
      </HeroWrapper>

      <Section spacing="md">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
            
            {/* Main Content Column */}
            <div className="lg:col-span-8 flex flex-col gap-16">
              
              {/* Symptoms */}
              {problem.symptoms && problem.symptoms.length > 0 && (
                <div className="flex flex-col gap-6 p-8 rounded-3xl bg-destructive/5 border border-destructive/10">
                  <Heading level={2} size="lg" className="text-destructive flex items-center gap-2">
                    <AlertCircle className="size-6" /> Symptoms You Might Be Seeing
                  </Heading>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {problem.symptoms.map((symptom, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <XCircle className="size-5 text-destructive shrink-0 mt-0.5" />
                        <Text>{symptom}</Text>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* Common Misconceptions */}
              {problem.commonMisconceptions && problem.commonMisconceptions.length > 0 && (
                <div className="flex flex-col gap-4">
                  <Heading level={2} size="lg">Common Misconceptions</Heading>
                  <ul className="flex flex-col gap-3 ml-6 list-disc">
                    {problem.commonMisconceptions.map((item, i) => (
                      <li key={i} className="text-foreground"><Text as="span">{item}</Text></li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* Possible Causes */}
              {problem.possibleCauses && problem.possibleCauses.length > 0 && (
                <div className="flex flex-col gap-4">
                  <Heading level={2} size="lg">What's Actually Causing It</Heading>
                  <ul className="flex flex-col gap-3 ml-6 list-disc text-muted-foreground">
                    {problem.possibleCauses.map((cause, i) => (
                      <li key={i}><Text as="span">{cause}</Text></li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* Self Diagnosis */}
              {problem.howToDiagnose && (
                <div className="flex flex-col gap-4 p-8 rounded-3xl bg-secondary/20">
                  <Heading level={3} size="sm" className="flex items-center gap-2">
                    <Search className="size-5 text-muted-foreground" /> How to diagnose it yourself
                  </Heading>
                  <Text>{problem.howToDiagnose}</Text>
                </div>
              )}
              
              {/* Before Hiring */}
              {problem.beforeHiring && (
                <div className="flex flex-col gap-4">
                  <Heading level={2} size="lg">What to do before hiring someone</Heading>
                  <Text>{problem.beforeHiring}</Text>
                </div>
              )}
              
              {/* HA Approach */}
              {problem.approach && (
                <div className="flex flex-col gap-4">
                  <Heading level={2} size="lg">How We Approach This</Heading>
                  <Text>{problem.approach}</Text>
                </div>
              )}
              
              {/* Potential Solutions */}
              {problem.potentialSolutions && problem.potentialSolutions.length > 0 && (
                <div className="flex flex-col gap-6 p-8 rounded-3xl bg-primary/5 border border-primary/10">
                  <Heading level={2} size="lg" className="text-primary flex items-center gap-2">
                    <CheckCircle2 className="size-6" /> Potential Solutions
                  </Heading>
                  <ul className="flex flex-col gap-4">
                    {problem.potentialSolutions.map((solution, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary font-bold text-sm">
                          {i + 1}
                        </div>
                        <Text className="mt-1">{solution}</Text>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* MDX Body Content */}
              {problem.content && (
                <div className="prose dark:prose-invert max-w-none mt-8 border-t border-border pt-16">
                  <MDXRemote source={problem.content} components={mdxComponents} options={mdxOptions} />
                </div>
              )}
            </div>
            
            {/* Sidebar Column */}
            <div className="lg:col-span-4 flex flex-col gap-12">
              <div className="sticky top-24 flex flex-col gap-12">
                
                {relatedServices.length > 0 && (
                  <div>
                    <Eyebrow className="mb-4">Services That Help</Eyebrow>
                    <ul className="flex flex-col gap-3">
                      {relatedServices.map(s => (
                        <li key={s.slug}>
                          <Link href={routes.services.detail(s.slug)} className="text-primary hover:underline font-medium text-sm">
                            {s.title} &rarr;
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {relatedTech.length > 0 && (
                  <div>
                    <Eyebrow className="mb-4">Technologies To Consider</Eyebrow>
                    <div className="flex flex-wrap gap-2">
                      {relatedTech.map(tech => (
                        <Badge key={tech.slug} variant="secondary">{tech.title}</Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                {relatedCaseStudies.length > 0 && (
                  <div>
                    <Eyebrow className="mb-4">How we solved this for others</Eyebrow>
                    <ul className="flex flex-col gap-4">
                      {relatedCaseStudies.map(cs => (
                        <li key={cs.slug} className="flex flex-col gap-1">
                          <Link href={routes.caseStudies.detail(cs.slug)} className="text-primary hover:underline font-medium text-sm leading-tight">
                            {cs.title}
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

      <SocialShareSection
        title={problem.title}
        description={problem.description}
        url={absoluteUrl(routes.problems.detail(problem.slug))}
      />

      <CtaSection />
    </>
  )
}
