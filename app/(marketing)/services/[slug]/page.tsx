import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  DollarSign,
  Layers3,
  Sparkles,
  Workflow,
} from "lucide-react";
import {
  getServiceBySlug,
  getFamilyBySlug,
  services,
  allCollections,
} from "@/lib/content/source";
import {
  getCaseStudiesForService,
  getInsightsForService,
  getProjectsForService,
  getServiceSiblings,
  getTechnologiesForService,
} from "@/lib/content/relations";
import { ServiceDetailHeroBackground } from "@/components/sections/hero-backgrounds";
import { createMetadata } from "@/lib/seo/metadata";
import { faqJsonLd, serviceJsonLd } from "@/lib/seo/json-ld";
import { routes } from "@/config/routes";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { HeroWrapper } from "@/components/sections/hero-wrapper";
import { Heading, Text, Eyebrow } from "@/components/primitives/typography";
import { Container } from "@/components/primitives/container";
import { Section } from "@/components/primitives/section";
import { CtaSection } from "@/components/sections/cta-section";
import { SocialShareSection } from "@/components/sections/social-share-section";
import { absoluteUrl } from "@/lib/seo/metadata";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { CTAS } from "@/lib/data/ctas";
import { ProblemSolutionSection } from "@/components/sections/problem-solution-section";
import { buttonVariants } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { buildWhatsAppUrl, serviceWhatsAppMessage } from "@/lib/whatsapp";
import {
  CaseStudyCard,
  InsightCard,
  ProjectCard,
  ServiceCard,
  TechnologyCard,
} from "@/components/cards/domain-cards";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const allServices = await services.getAll();
  return allServices.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const service = getServiceBySlug(resolvedParams.slug);

  if (!service) {
    return {};
  }

  return createMetadata({
    title: service.seo?.title ?? service.title,
    description: service.seo?.description ?? service.description,
    path: routes.services.detail(service.slug),
    ogImage: service.cover?.src,
  });
}

export default async function ServicePage({ params }: ServicePageProps) {
  const resolvedParams = await params;
  const service = getServiceBySlug(resolvedParams.slug);

  if (!service) {
    return notFound();
  }

  const family = service.family ? getFamilyBySlug(service.family) : null;
  const [
    relatedServices,
    relatedProjects,
    relatedCaseStudies,
    relatedInsights,
    relatedTechnologies,
    allTechnologies,
  ] = await Promise.all([
    getServiceSiblings(service),
    getProjectsForService(service.slug),
    getCaseStudiesForService(service.slug),
    getInsightsForService(service.slug),
    getTechnologiesForService(service.slug),
    allCollections.technologies.getAll(),
  ]);

  const resolvedRecommendations = (service.recommendations ?? [])
    .map((recSlug) => getServiceBySlug(recSlug))
    .filter((s) => s !== undefined);

  const resolvedRecommendedTechnologies = (service.recommendedTechnologies ?? [])
    .map((techName) => {
      const lowerTech = techName.toLowerCase();
      const found = allTechnologies.find(
        (t) => {
          const tLower = t.title.toLowerCase();
          return tLower === lowerTech || tLower.includes(lowerTech) || lowerTech.includes(tLower);
        }
      );
      return {
        name: techName,
        href: found
          ? routes.technologies.detail(
              found.category ?? found.slug,
              found.category ? found.slug : undefined
            )
          : null,
      };
    });

  const breadcrumbItems = [
    { label: "Home", href: routes.home() },
    { label: "Services", href: routes.services.index() },
    ...(family
      ? [{ label: family.title, href: routes.services.family(family.slug) }]
      : []),
    { label: service.title, href: routes.services.detail(service.slug) },
  ];

  const faqEntries = service.faqs ?? [];

  return (
    <article className="pb-4 md:pb-8">
      <JsonLd
        data={[
          serviceJsonLd({
            title: service.title,
            description: service.description,
            path: routes.services.detail(service.slug),
          }),
          ...(faqEntries.length ? [faqJsonLd(faqEntries)] : []),
        ]}
      />
      <HeroWrapper
        className="pb-14 pt-8 md:pb-18"
        background={<ServiceDetailHeroBackground />}
      >
        <div className="mx-auto flex max-w-5xl flex-col gap-6 relative z-20">
          <Breadcrumbs items={breadcrumbItems} className="pb-4" />
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            <span className="rounded-full border border-border/60 bg-background/45 px-3 py-1.5">
              Service page
            </span>
            {family ? (
              <Link
                href={routes.services.family(family.slug)}
                className="rounded-full border border-border/60 bg-background/45 px-3 py-1.5 text-foreground transition-colors hover:border-primary/40 hover:text-primary"
              >
                {family.title}
              </Link>
            ) : null}
            {service.availability === 'Coming Soon' && (
              <span className="rounded-full border border-orange-500/20 bg-orange-500/10 text-orange-500 px-3 py-1.5">
                Coming Soon
              </span>
            )}
            {service.complexity && (
              <span className="rounded-full border border-border/60 bg-background/45 px-3 py-1.5">
                Complexity: {service.complexity}
              </span>
            )}
          </div>
          <Heading
            level={1}
            size="display"
            className="max-w-4xl text-balance leading-[0.9] tracking-tight"
          >
            {service.title}
          </Heading>
          <Text
            size="lg"
            tone="muted"
            className="max-w-3xl text-pretty leading-relaxed"
          >
            {service.description}
          </Text>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href={service.cta?.href ?? CTAS.startProject.href}
              className={buttonVariants({ size: "lg" })}
            >
              {service.cta?.label ?? CTAS.startProject.label}
            </Link>
            <Link
              href={CTAS.requestAudit.href}
              className={buttonVariants({
                size: "lg",
                variant: "outline",
                className: "bg-transparent",
              })}
            >
              {CTAS.requestAudit.label}
            </Link>
            <a
              href={buildWhatsAppUrl(serviceWhatsAppMessage(service.title))}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({
                size: "lg",
                variant: "outline",
                className:
                  "gap-2 border-[#25D366]/40 bg-transparent text-[#25D366] hover:border-[#25D366] hover:bg-[#25D366]/10 hover:text-[#25D366]",
              })}
            >
              <WhatsAppIcon className="size-4" />
              Chat on WhatsApp
            </a>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="glass rounded-3xl border border-border/50 p-5">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Who it helps
              </div>
              <Text className="mt-3 leading-relaxed" tone="muted">
                {service.audience}
              </Text>
            </div>
            <div className="glass rounded-3xl border border-border/50 p-5">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                What it solves
              </div>
              <Text className="mt-3 leading-relaxed" tone="muted">
                Focused implementation for the specific business problems listed
                below.
              </Text>
            </div>
          </div>
        </div>
      </HeroWrapper>

      <Section spacing="lg">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="max-w-2xl">
              <Eyebrow>Overview</Eyebrow>
              <Heading level={2} size="xl" className="mt-3">
                {family?.overview ??
                  "A focused service built to solve a specific business problem."}
              </Heading>
              
              {service.scope && (
                <div className="mt-6 rounded-2xl border border-border/50 bg-background/35 p-5">
                  <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                    Scope
                  </div>
                  <Text size="sm" tone="muted" className="mt-2 leading-relaxed">
                    {service.scope}
                  </Text>
                </div>
              )}

              {service.outcomes && service.outcomes.length > 0 && (
                <div className="mt-6 rounded-2xl border border-border/50 bg-background/35 p-5">
                  <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                    Outcomes
                  </div>
                  <ul className="mt-3 grid gap-2">
                    {service.outcomes.map((item) => (
                      <li key={item} className="flex gap-3 text-sm text-muted-foreground">
                        <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {(service.pricing || service.timeline) && (
                <div className="mt-6 rounded-2xl border border-border/50 bg-background/35 p-5">
                  <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                    Cost &amp; Timeline
                  </div>
                  <div className="mt-3 grid gap-4 sm:grid-cols-2">
                    {service.pricing && (
                      <div className="flex gap-3">
                        <DollarSign className="mt-0.5 size-4 shrink-0 text-primary" />
                        <div>
                          <div className="text-sm font-medium text-foreground">How much does it cost?</div>
                          <Text size="sm" tone="muted" className="mt-1 leading-relaxed">
                            {service.pricing}
                          </Text>
                        </div>
                      </div>
                    )}
                    {service.timeline && (
                      <div className="flex gap-3">
                        <Clock className="mt-0.5 size-4 shrink-0 text-primary" />
                        <div>
                          <div className="text-sm font-medium text-foreground">How long does it take?</div>
                          <Text size="sm" tone="muted" className="mt-1 leading-relaxed">
                            {service.timeline}
                          </Text>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="@container flex flex-col gap-6">
              {service.core && service.core.length > 0 && (
                <div>
                  <Heading level={3} size="sm" className="mb-4">
                    Core Service
                  </Heading>
                  <div className="grid gap-3 @lg:grid-cols-2">
                    {service.core.map((item) => (
                      <div
                        key={item}
                        className="rounded-xl border border-border/50 bg-background/35 p-4 flex items-center gap-3"
                      >
                        <CheckCircle2 className="size-4 shrink-0 text-primary" />
                        <span className="text-sm font-medium text-foreground">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {service.addOns && service.addOns.length > 0 && (
                <div className="mt-2">
                  <Heading level={3} size="sm" className="mb-4">
                    Optional Add-ons
                  </Heading>
                  <div className="flex flex-wrap gap-2">
                    {service.addOns.map((item) => (
                      <span
                        key={item}
                        className="rounded-lg border border-border/60 bg-muted/30 px-3 py-1.5 text-sm text-muted-foreground"
                      >
                        + {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Container>
      </Section>

      {service.businessProblems?.length ? (
        <ProblemSolutionSection
          title="The problems we solve"
          description="Common reasons businesses choose this service."
          problems={service.businessProblems}
          solutions={service.core ?? []}
          className="bg-muted/30"
        />
      ) : null}

      {service.process && service.process.length > 0 && (
        <Section spacing="lg">
          <Container>
            <div className="max-w-3xl">
              <Eyebrow>Process</Eyebrow>
              <Heading level={2} size="xl" className="mt-3">
                How we deliver this service.
              </Heading>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {service.process.map((step, index) => (
                <div key={step.title} className="relative">
                  <div className="text-6xl font-black text-primary/10 mb-4">{index + 1}</div>
                  <Heading level={3} size="sm">{step.title}</Heading>
                  <Text tone="muted" size="sm" className="mt-3 leading-relaxed">{step.description}</Text>
                </div>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {(service.deliverables?.length || service.useCases?.length) ? (
        <Section spacing="lg" className="bg-muted/20">
          <Container>
            <div className="grid gap-12 lg:grid-cols-2">
              {service.deliverables && service.deliverables.length > 0 && (
                <div>
                  <Eyebrow>Deliverables</Eyebrow>
                  <Heading level={2} size="xl" className="mt-3 mb-6">
                    What you receive.
                  </Heading>
                  <ul className="grid gap-3">
                    {service.deliverables.map((item) => (
                      <li key={item} className="flex gap-4 rounded-xl border border-border/50 bg-background/50 p-4">
                        <CheckCircle2 className="size-5 shrink-0 text-primary" />
                        <span className="font-medium text-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {service.useCases && service.useCases.length > 0 && (
                <div>
                  <Eyebrow>Use Cases</Eyebrow>
                  <Heading level={2} size="xl" className="mt-3 mb-6">
                    Common applications.
                  </Heading>
                  <div className="grid gap-4">
                    {service.useCases.map((useCase) => (
                      <div key={useCase.title} className="rounded-2xl border border-border/50 bg-background/50 p-5">
                        <Heading level={3} size="sm">{useCase.title}</Heading>
                        <Text tone="muted" size="sm" className="mt-2 leading-relaxed">{useCase.description}</Text>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Container>
        </Section>
      ) : null}

      <Section spacing="xl">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="glass-strong rounded-[2rem] border border-border/50 p-6 md:p-8">
              <Eyebrow>Recommendations</Eyebrow>
              <Heading level={2} size="xl" className="mt-3">
                Related services and next steps.
              </Heading>
              {resolvedRecommendations.length > 0 ? (
                <div className="mt-6 space-y-4">
                  {resolvedRecommendations.map((rec, index) => (
                    <Link
                      key={rec.slug}
                      href={routes.services.detail(rec.slug)}
                      className="group flex items-center justify-between gap-4 rounded-2xl border border-border/50 bg-background/30 p-4 transition-colors hover:border-primary/30 hover:bg-background/50"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-border/60 bg-background/70 text-sm font-semibold text-primary transition-colors group-hover:border-primary/30 group-hover:bg-primary/10">
                          {index + 1}
                        </div>
                        <div className="font-medium text-foreground transition-colors group-hover:text-primary">
                          {rec.title}
                        </div>
                      </div>
                      <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                    </Link>
                  ))}
                </div>
              ) : (
                <Text size="lg" tone="muted" className="mt-4 leading-relaxed">
                  Speak with the team to identify the best follow-up services for your situation.
                </Text>
              )}
            </div>
            <div className="@container grid gap-4 @lg:grid-cols-2">
              <div className="rounded-[2rem] border border-border/50 bg-background/35 p-5">
                <Sparkles className="size-5 text-primary" />
                <Heading level={3} size="sm" className="mt-3">
                  Recommended technologies
                </Heading>
                <div className="mt-4 flex flex-wrap gap-2">
                  {resolvedRecommendedTechnologies.map((tech) => (
                    tech.href ? (
                      <Link
                        key={tech.name}
                        href={tech.href}
                        className="rounded-full border border-border/60 bg-background/45 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/30 hover:bg-primary/10 hover:text-primary"
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
                  ))}
                </div>
              </div>
              <div className="rounded-[2rem] border border-border/50 bg-background/35 p-5">
                <Layers3 className="size-5 text-primary" />
                <Heading level={3} size="sm" className="mt-3">
                  When it is not the right choice
                </Heading>
                {service.exclusions && service.exclusions.length > 0 ? (
                  <ul className="mt-4 grid gap-2">
                    {service.exclusions.map((exclusion) => (
                      <li key={exclusion} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="text-destructive font-bold mt-0.5">-</span>
                        <span className="leading-relaxed">{exclusion}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <Text tone="muted" size="sm" className="mt-3 leading-relaxed">
                    If the business problem is not clear yet, or the scope needs
                    strategy before execution, a discovery and audit engagement is
                    usually the better starting point.
                  </Text>
                )}
              </div>
              <div className="rounded-[2rem] border border-border/50 bg-background/35 p-5 @lg:col-span-2">
                <Workflow className="size-5 text-primary" />
                <Heading level={3} size="sm" className="mt-3">
                  Why this is structured this way
                </Heading>
                <Text tone="muted" size="sm" className="mt-3 leading-relaxed">
                  The service page answers the questions AI systems and humans
                  both ask: what the service is, who it is for, what problem it
                  solves, when to choose it, and how it fits into the wider
                  commercial stack.
                </Text>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {relatedServices.length ? (
        <Section spacing="lg" className="bg-muted/20">
          <Container>
            <div className="flex items-end justify-between gap-6">
              <div>
                <Eyebrow>Related services</Eyebrow>
                <Heading level={2} size="xl" className="mt-3">
                  Other options in this family.
                </Heading>
              </div>
              <Link
                href={routes.services.index()}
                className={buttonVariants({
                  variant: "ghost",
                  className: "hidden md:flex",
                })}
              >
                Back to services <ArrowRight className="ml-2 size-4" />
              </Link>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {relatedServices.map((item) => (
                <ServiceCard key={item.slug} service={item} />
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      {relatedProjects.length || relatedCaseStudies.length || relatedInsights.length || relatedTechnologies.length ? (
        <Section spacing="lg">
          <Container>
            <div className="mb-8 max-w-3xl">
              <Eyebrow>Connected content</Eyebrow>
              <Heading level={2} size="xl" className="mt-3">
                Work, evidence, insights, and technologies linked to this service.
              </Heading>
              <Text size="lg" tone="muted" className="mt-4 leading-relaxed">
                These recommendations are resolved from content metadata so the service page stays connected as the content system grows.
              </Text>
            </div>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
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
                  <Eyebrow>Related insights</Eyebrow>
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

      {faqEntries.length ? (
        <Section spacing="lg" className="bg-muted/20">
          <Container>
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="max-w-2xl">
                <Eyebrow>FAQ</Eyebrow>
                <Heading level={2} size="xl" className="mt-3">
                  Answers for buyers and AI systems.
                </Heading>
                <Text size="lg" tone="muted" className="mt-4 leading-relaxed">
                  The questions below help visitors make a better decision and
                  give retrieval systems clear answers to extract.
                </Text>
              </div>
              <Accordion type="single" collapsible className="w-full">
                {faqEntries.map((faq, index) => (
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
      ) : null}

      <SocialShareSection
        title={service.title}
        description={service.description}
        url={absoluteUrl(routes.services.detail(service.slug))}
      />

      <CtaSection
        title={`Ready to discuss ${service.title.toLowerCase()}?`}
        description="Start a project conversation or request an audit if you want to talk through the right next step first."
        primaryCta={service.cta ?? CTAS.startProject}
        secondaryCta={CTAS.requestAudit}
      />
    </article>
  );
}
