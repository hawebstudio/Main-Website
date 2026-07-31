import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { caseStudies } from "@/lib/content/source";
import {
  getRelatedInsights,
  getRelatedProjects,
  getRelatedServices,
  getRelatedTechnologies,
} from "@/lib/content/relations";
import { createMetadata } from "@/lib/seo/metadata";
import { breadcrumbJsonLd, caseStudyJsonLd } from "@/lib/seo/json-ld";
import { routes } from "@/config/routes";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { Container } from "@/components/primitives/container";
import { Section } from "@/components/primitives/section";
import { CtaSection } from "@/components/sections/cta-section";
import { SocialShareSection } from "@/components/sections/social-share-section";
import { absoluteUrl } from "@/lib/seo/metadata";
import { ReadingProgress } from "@/components/sections/reading-progress";
import { contentCategories } from "@/lib/content/taxonomy";
import { CaseStudyDetailHero } from "@/components/sections/case-studies/case-study-detail-hero";
import { CaseStudyMainArticle } from "@/components/sections/case-studies/case-study-main-article";
import {
  CaseStudyOverviewSidebar,
  CaseStudyRelatedSidebar,
  MoreCaseStudiesSection,
} from "@/components/sections/case-studies/case-study-sidebars";
import {
  estimateReadingTime,
  extractHeadings,
  toArray,
  toLabel,
} from "@/components/sections/case-studies/detail-utils";

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await caseStudies.getSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = await caseStudies.getBySlug(slug);
  if (!caseStudy) return {};

  return createMetadata({
    title: `${caseStudy.seo?.title ?? caseStudy.title} | Case Study`,
    description: caseStudy.seo?.description ?? caseStudy.description,
    path: routes.caseStudies.detail(slug),
    ogImage: caseStudy.cover?.src,
    article: {
      publishedTime: caseStudy.publishedAt,
      modifiedTime: caseStudy.updatedAt,
      authors: caseStudy.author?.name ? [caseStudy.author.name] : undefined,
      tags: caseStudy.tags?.map((tag) => tag.name),
    },
  });
}

export default async function CaseStudyDetailPage({
  params,
}: CaseStudyPageProps) {
  const { slug } = await params;
  const caseStudy = await caseStudies.getBySlug(slug);
  if (!caseStudy) notFound();

  const [
    relatedServices,
    relatedTech,
    relatedProjects,
    relatedInsights,
    moreCaseStudies,
  ] = await Promise.all([
    getRelatedServices(caseStudy.relatedServiceSlugs),
    getRelatedTechnologies(caseStudy.relatedTechnologySlugs),
    getRelatedProjects([
      ...(caseStudy.relatedProjectSlug ? [caseStudy.relatedProjectSlug] : []),
      ...(caseStudy.relatedProjectSlugs ?? []),
    ]),
    getRelatedInsights(caseStudy.relatedInsightSlugs),
    caseStudies.getAll(),
  ]);

  const categoryLabel =
    contentCategories.caseStudies.find(
      (item) => item.slug === caseStudy.category,
    )?.name ?? toLabel(caseStudy.category);
  const typeLabel = getCaseStudyTypeLabel(caseStudy.caseStudyType);
  const breadcrumbItems = [
    { label: "Home", href: routes.home() },
    { label: "Case Studies", href: routes.caseStudies.index() },
    { label: caseStudy.title, href: routes.caseStudies.detail(caseStudy.slug) },
  ];
  const timelineEvents = (caseStudy.implementationSteps ?? []).map((step) => ({
    title: step.phase,
    description: step.details,
  }));

  return (
    <>
      <ReadingProgress />
      <JsonLd
        data={[
          breadcrumbJsonLd(breadcrumbItems),
          caseStudyJsonLd({
            title: caseStudy.title,
            description: caseStudy.description,
            path: routes.caseStudies.detail(caseStudy.slug),
            client: caseStudy.client,
            authorName: caseStudy.author?.name,
            publishedAt: caseStudy.publishedAt,
            updatedAt: caseStudy.updatedAt,
            schemaType:
              caseStudy.caseStudyType === "technical-investigation"
                ? "TechArticle"
                : "Article",
          }),
        ]}
      />

      <Breadcrumbs
        items={breadcrumbItems}
        className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8"
      />
      <CaseStudyDetailHero
        caseStudy={caseStudy}
        categoryLabel={categoryLabel}
        typeLabel={typeLabel}
        readingTime={estimateReadingTime(caseStudy)}
      />

      <Section spacing="md">
        <Container size="lg">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-20">
            <CaseStudyOverviewSidebar
              caseStudy={caseStudy}
              tocItems={
                caseStudy.content ? extractHeadings(caseStudy.content) : []
              }
            />
            <CaseStudyMainArticle
              caseStudy={caseStudy}
              constraints={toArray(caseStudy.constraints)}
              tradeOffs={toArray(caseStudy.tradeOffs)}
              timelineEvents={timelineEvents}
            />
            <CaseStudyRelatedSidebar
              caseStudy={caseStudy}
              relatedServices={relatedServices}
              relatedTech={relatedTech}
              relatedProjects={relatedProjects}
              relatedInsights={relatedInsights}
            />
          </div>
        </Container>
      </Section>

      <Section spacing="sm">
        <Container>
          <MoreCaseStudiesSection
            items={moreCaseStudies
              .filter((item) => item.slug !== caseStudy.slug)
              .slice(0, 2)}
          />
        </Container>
      </Section>

      <SocialShareSection
        title={caseStudy.title}
        description={caseStudy.description}
        url={absoluteUrl(routes.caseStudies.detail(caseStudy.slug))}
      />

      <CtaSection
        title="Need a Similar Solution?"
        description="Share your context and we'll map it to the closest architecture, SEO foundation, or implementation pathway from these case studies — including the trade-offs, not just the outcome."
        primaryCta={{
          label: caseStudy.cta?.label ?? "Discuss Your Project",
          href: caseStudy.cta?.href ?? routes.contact(),
        }}
        secondaryCta={{
          label: "Explore Services",
          href: routes.services.index(),
        }}
      />
    </>
  );
}

function getCaseStudyTypeLabel(type: string) {
  if (type === "client") return "Client Case Study";
  if (type === "internal") return "Internal Case Study";
  if (type === "personal-engineering") return "Personal Engineering Case Study";
  return "Technical Investigation";
}
