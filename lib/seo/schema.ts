import { branding, company, contact, metadataDefaults, socialUrls } from '@/lib/business/company'

export interface FaqItem {
  question: string
  answer: string
}

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${metadataDefaults.canonicalBaseUrl}/#organization`,
    name: company.name,
    url: metadataDefaults.canonicalBaseUrl,
    logo: `${metadataDefaults.canonicalBaseUrl}${branding.logos.wordmark}`,
    image: `${metadataDefaults.canonicalBaseUrl}${branding.logos.wordmark}`,
    email: contact.emails.general,
    telephone: company.primaryPhone,
    description: company.shortDescription,
    sameAs: socialUrls,
    areaServed: 'Worldwide',
    knowsAbout: [
      'Web Development',
      'Next.js Development',
      'Ecommerce Development',
      'Technical SEO',
      'AI Search Optimization',
      'Website Performance Optimization',
    ],
  }
}

/**
 * AboutPage schema. Wraps the Organization as its main entity so the page
 * itself is machine-readable as "the About page for this specific org",
 * not just a generic WebPage.
 */
export function aboutPageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    '@id': `${metadataDefaults.canonicalBaseUrl}/about/#webpage`,
    url: `${metadataDefaults.canonicalBaseUrl}/about`,
    name: `About ${company.name}`,
    isPartOf: {
      '@id': `${metadataDefaults.canonicalBaseUrl}/#website`,
    },
    about: {
      '@id': `${metadataDefaults.canonicalBaseUrl}/#organization`,
    },
    mainEntity: {
      '@id': `${metadataDefaults.canonicalBaseUrl}/#organization`,
    },
  }
}

/**
 * Breadcrumb schema for Home > About.
 */
export function breadcrumbSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: metadataDefaults.canonicalBaseUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'About',
        item: `${metadataDefaults.canonicalBaseUrl}/about`,
      },
    ],
  }
}

/**
 * FAQPage schema. IMPORTANT: the `faqs` passed here must exactly match the
 * visible question/answer text rendered on the page. Google (and AI answer
 * engines pulling from the same structured data) can penalize or ignore
 * FAQ schema that doesn't match on-page content.
 */
export function faqPageSchema(faqs: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}
