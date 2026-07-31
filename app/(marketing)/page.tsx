import type { Metadata } from 'next'
import { CtaSection } from '@/components/sections/cta-section'
import { CTAS } from '@/lib/data/ctas'
import { createMetadata } from '@/lib/seo/metadata'
import { JsonLd } from '@/components/seo/json-ld'
import { webPageJsonLd } from '@/lib/seo/json-ld'
import { caseStudies, insights, projects, services, technologies } from '@/lib/content/source'
import { CapabilitiesSection } from '@/components/sections/home/capabilities-section'
import { HeroSection } from '@/components/sections/home/hero-section'
import { InsightsSection } from '@/components/sections/home/insights-section'
import { OperatingPrinciplesSection } from '@/components/sections/home/operating-principles-section'
import { ProblemsSection } from '@/components/sections/home/problems-section'
import { ProcessSection } from '@/components/sections/home/process-section'
import { SelectedWorkSection } from '@/components/sections/home/selected-work-section'
import { TechnologyStackSection } from '@/components/sections/home/technology-stack-section'
// import { TestimonialsSection } from '@/components/sections/home/testimonials-section'
import { TrustBarSection } from '@/components/sections/home/trust-bar-section'

const homeDescription =
  'HA Web Studio is a digital product studio building fast, modern, conversion-focused websites, ecommerce stores, and web applications for small businesses, startups, and ecommerce brands. Every build is engineered for technical SEO and AI search visibility from day one.'

export const metadata: Metadata = createMetadata({
  title: 'HA Web Studio | Web Development, Ecommerce & AI Search Agency',
  description: homeDescription,
  path: '/',
})

const jsonLdData = [
  webPageJsonLd({
    title: 'HA Web Studio | Digital Product Studio',
    description: homeDescription,
    path: '/',
    type: 'WebPage',
  }),
]

export default async function HomePage() {
  const [serviceEntries, projectEntries, caseStudyEntries, insightEntries, featuredTechnologies] = await Promise.all([
    services.getAll(),
    projects.getAll(),
    caseStudies.getAll(),
    insights.getAll(),
    technologies.getFeatured(),
  ])

  const sortedProjects = [...projectEntries].sort((left, right) => {
    if (left.featured && !right.featured) return -1
    if (!left.featured && right.featured) return 1
    return (right.year ?? 0) - (left.year ?? 0)
  })

  return (
    <article className="pb-24">
      <JsonLd data={jsonLdData} />
      <HeroSection />
      <TrustBarSection />
      <OperatingPrinciplesSection />
      <ProblemsSection />
      <CapabilitiesSection services={serviceEntries.slice(0, 4)} />
      <TechnologyStackSection technologies={featuredTechnologies} />
      <SelectedWorkSection featuredProject={sortedProjects[0]} secondaryProjects={sortedProjects.slice(1, 3)} />
      <ProcessSection />
      {/* <TestimonialsSection /> */}
      <InsightsSection insights={insightEntries.slice(0, 2)} caseStudies={caseStudyEntries.slice(0, 3)} />
      <CtaSection
        title="Ready to build a website that actually performs?"
        description="Tell us about your business and goals, and we'll show you exactly how we'd approach it — no generic proposal, no pressure."
        primaryCta={CTAS.startProject}
        secondaryCta={CTAS.bookConsultation}
        note="Typically responding within one business day."
      />
    </article>
  )
}
