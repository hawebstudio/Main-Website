import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo/metadata";
import { HeroWrapper } from "@/components/sections/hero-wrapper";
import { Heading, Text } from "@/components/primitives/typography";
import { Container } from "@/components/primitives/container";
import { Section } from "@/components/primitives/section";
import { CtaSection } from "@/components/sections/cta-section";
import { caseStudies, services } from "@/lib/content/source";
import { routes } from "@/config/routes";
import { CaseStudiesFilterPanel } from "@/components/sections/case-studies/case-studies-filter-panel";
import { CaseStudiesHubHero } from "@/components/sections/case-studies/case-studies-hub-hero";
import { CaseStudiesProofSection } from "@/components/sections/case-studies/case-studies-proof-section";
import { CaseStudiesResultsSection } from "@/components/sections/case-studies/case-studies-results-section";
import {
  getSingleValue,
  normalizeHrefValueToSlug,
  type CaseStudyFilters,
} from "@/components/sections/case-studies/hub-utils";

interface CaseStudiesPageProps {
  searchParams: Promise<CaseStudyFilters>;
}

export const metadata: Metadata = createMetadata({
  title: "Web Design, SEO & Engineering Case Studies",
  description:
    "HA Web Studio case studies: real architecture, SEO, infrastructure, and application decisions behind client and internal projects — including what was rejected and why.",
  path: "/case-studies",
});

export default async function CaseStudiesPage({
  searchParams,
}: CaseStudiesPageProps) {
  const filters = await searchParams;
  const allCaseStudies = await caseStudies.getAll();
  const allServices = await services.getAll();

  const selectedCategory = getSingleValue(filters.category);
  const selectedType = getSingleValue(filters.type);
  const selectedTechnology = getSingleValue(filters.technology);
  const selectedGoal = getSingleValue(filters.goal);
  const selectedService = getSingleValue(filters.service);
  const selectedSolution = getSingleValue(filters.solution);
  const selectedDifficulty = getSingleValue(filters.difficulty);
  const selectedYear = getSingleValue(filters.year);

  const filteredCaseStudies = allCaseStudies.filter((item) => {
    if (selectedCategory && item.category !== selectedCategory) return false;
    if (selectedType && item.caseStudyType !== selectedType) return false;
    if (
      selectedTechnology &&
      !item.relatedTechnologySlugs?.includes(selectedTechnology)
    )
      return false;
    if (selectedGoal && item.businessGoal !== selectedGoal) return false;
    if (selectedService && !item.relatedServiceSlugs?.includes(selectedService))
      return false;
    if (
      selectedSolution &&
      !item.relatedSolutionLinks?.some(
        (solution) =>
          normalizeHrefValueToSlug(solution.href) === selectedSolution,
      )
    ) {
      return false;
    }
    if (selectedDifficulty && item.difficulty !== selectedDifficulty)
      return false;
    if (selectedYear && String(item.year ?? "") !== selectedYear) return false;
    return true;
  });

  const sortedCaseStudies = [...filteredCaseStudies].sort((a, b) => {
    const aScore =
      a.caseStudyType === "internal"
        ? 3
        : a.caseStudyType === "personal-engineering"
          ? 2
          : 1;
    const bScore =
      b.caseStudyType === "internal"
        ? 3
        : b.caseStudyType === "personal-engineering"
          ? 2
          : 1;
    if (aScore !== bScore) return bScore - aScore;
    return (b.year ?? 0) - (a.year ?? 0);
  });

  const availableServices = allServices.filter((service) =>
    allCaseStudies.some((item) =>
      item.relatedServiceSlugs?.includes(service.slug),
    ),
  );

  if (allCaseStudies.length === 0) {
    return (
      <>
        <HeroWrapper>
          <Heading level={1} size="display">
            Case Studies
          </Heading>
          <Text size="lg" tone="muted" className="max-w-xl">
            Engineering and business implementation stories will appear here as
            they are documented.
          </Text>
        </HeroWrapper>
        <Section>
          <Container>
            <div className="flex flex-col items-center justify-center py-24 text-center border border-dashed rounded-3xl bg-secondary/10">
              <Heading level={3}>No case studies yet</Heading>
              <Text tone="muted">The hub is ready for publishing.</Text>
            </div>
          </Container>
        </Section>
        <CtaSection />
      </>
    );
  }

  return (
    <>
      <CaseStudiesHubHero />
      <CaseStudiesFilterPanel
        filters={filters}
        selected={{
          category: selectedCategory,
          type: selectedType,
          service: selectedService,
        }}
        availableServices={availableServices}
        resultCount={sortedCaseStudies.length}
      />
      <CaseStudiesResultsSection items={sortedCaseStudies} />
      <CaseStudiesProofSection />
      <CtaSection
        title="Need a Similar Solution?"
        description="Tell us what you're building and we'll map it to the closest implementation pathway — architecture, SEO foundation, or application work — based on what actually shipped in these case studies."
        primaryCta={{ label: "Start Your Project", href: routes.contact() }}
        secondaryCta={{
          label: "Explore Services",
          href: routes.services.index(),
        }}
      />
    </>
  );
}
