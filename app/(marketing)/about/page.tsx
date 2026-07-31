import type { Metadata } from 'next'
import { createMetadata } from '@/lib/seo/metadata'
import { CtaSection } from '@/components/sections/cta-section'
import { CTAS } from '@/lib/data/ctas'
import { AboutHero } from '@/components/sections/about/about-hero'
import { AboutMissionSection } from '@/components/sections/about/about-mission-section'
import { AboutStandardsSection } from '@/components/sections/about/about-standards-section'
import { TechnologyPhilosophySection } from '@/components/sections/about/technology-philosophy-section'
import { AboutFaqSection } from '@/components/sections/about/about-faq-section'
import { JsonLd } from '@/components/seo/json-ld'
import { webPageJsonLd, faqJsonLd, breadcrumbJsonLd } from '@/lib/seo/json-ld'
import { aboutFaqs } from '@/lib/data/about-faqs'
import { routes } from '@/config/routes'

export const metadata: Metadata = createMetadata({
  title: 'About HA Web Studio | Web Development & AI Search Agency',
  description:
    'HA Web Studio is a digital product studio building fast, modern, conversion-focused websites and web apps. See our mission, standards, technology philosophy, and how we work.',
  path: '/about',
})

const jsonLdData = [
  webPageJsonLd({
    title: 'About HA Web Studio',
    description:
      'HA Web Studio is a digital product studio building fast, modern, conversion-focused websites and web apps for ambitious businesses.',
    path: '/about',
    type: 'AboutPage',
  }),
  breadcrumbJsonLd([
    { label: 'Home', href: routes.home() },
    { label: 'About', href: routes.about() },
  ]),
  faqJsonLd(aboutFaqs),
]

export default function AboutPage() {
  return (
    <article>
      <JsonLd data={jsonLdData} />
      <AboutHero />
      <AboutMissionSection />
      <AboutStandardsSection />
      <TechnologyPhilosophySection />
      <AboutFaqSection />
      <CtaSection
        title="Want to learn more?"
        description="Book a consultation to discuss how our approach aligns with your business goals."
        primaryCta={CTAS.bookConsultation}
      />
    </article>
  )
}
