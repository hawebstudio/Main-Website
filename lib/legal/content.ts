import { company, contact, legal } from '@/lib/business/company'

export interface LegalSection {
  heading: string
  body: string[]
}

export interface LegalDocument {
  slug: 'privacy' | 'terms' | 'cookies'
  title: string
  path: string
  metaDescription: string
  effectiveDate: string
  intro: string[]
  sections: LegalSection[]
}

/**
 * Legal page copy. This is placeholder content written to be accurate for
 * a small remote-first web studio — review it (ideally with a lawyer)
 * before relying on it for compliance purposes, and keep `effectiveDate`
 * updated whenever the copy changes.
 */
export const legalDocuments: Record<LegalDocument['slug'], LegalDocument> = {
  privacy: {
    slug: 'privacy',
    title: 'Privacy Policy',
    path: legal.privacyUrl,
    metaDescription: `How ${company.name} collects, uses, and protects your information.`,
    effectiveDate: 'July 29, 2026',
    intro: [
      `This Privacy Policy explains how ${company.name} ("we", "us", "our") collects, uses, and protects information when you visit our website, use our contact form, or engage us for services.`,
    ],
    sections: [
      {
        heading: 'Information we collect',
        body: [
          'When you fill out our contact form, we collect the information you provide directly, such as your name, email address, company name, budget range, and project details.',
          'We also collect standard technical information automatically, such as IP address, browser type, device information, and pages visited, through analytics tools like Google Analytics and Microsoft Clarity.',
        ],
      },
      {
        heading: 'How we use your information',
        body: [
          'We use the information you submit to respond to enquiries, prepare proposals, and deliver services you request.',
          'We use aggregated analytics data to understand how the website is used and to improve its performance and content.',
          `We do not sell your personal information to third parties.`,
        ],
      },
      {
        heading: 'Cookies and tracking',
        body: [
          'Our website uses cookies and similar technologies for analytics and, where enabled, advertising measurement. See our Cookie Policy for details on what we use and how to control it.',
        ],
      },
      {
        heading: 'Third-party services',
        body: [
          'We may share information with service providers who help us operate the website and deliver our services, such as hosting, analytics, and email delivery providers. These providers are only permitted to use your information to provide services to us.',
        ],
      },
      {
        heading: 'Data retention',
        body: [
          'We retain contact form submissions and project-related information for as long as necessary to respond to your enquiry, deliver services, and meet legal or accounting obligations.',
        ],
      },
      {
        heading: 'Your rights',
        body: [
          'Depending on your location, you may have the right to access, correct, or request deletion of your personal information. To make a request, contact us using the details below.',
        ],
      },
      {
        heading: 'Contact us',
        body: [
          `If you have questions about this Privacy Policy, contact us at ${contact.emails.general}.`,
        ],
      },
    ],
  },
  terms: {
    slug: 'terms',
    title: 'Terms of Service',
    path: legal.termsUrl,
    metaDescription: `The terms that govern use of the ${company.name} website and our services.`,
    effectiveDate: 'July 29, 2026',
    intro: [
      `These Terms of Service ("Terms") govern your use of the ${company.name} website and any services you engage us to provide. By using our website or engaging our services, you agree to these Terms.`,
    ],
    sections: [
      {
        heading: 'Services',
        body: [
          `${company.name} provides web design, development, and related digital services. The specific scope, deliverables, timeline, and fees for any engagement are set out separately in a proposal or agreement signed by both parties.`,
        ],
      },
      {
        heading: 'Use of this website',
        body: [
          'This website and its content are provided for general information about our services. You may not copy, reproduce, or reuse content from this site for commercial purposes without our written permission.',
        ],
      },
      {
        heading: 'Intellectual property',
        body: [
          'Unless otherwise agreed in a project contract, ownership of deliverables transfers to the client upon full payment. Pre-existing tools, frameworks, and internal libraries we use to deliver services remain our property.',
        ],
      },
      {
        heading: 'Payment terms',
        body: [
          'Payment terms, including deposits, milestones, and due dates, are defined in the individual project proposal or agreement and take precedence over any general terms stated here.',
        ],
      },
      {
        heading: 'Limitation of liability',
        body: [
          `To the extent permitted by law, ${company.name} is not liable for indirect, incidental, or consequential damages arising from use of our website or services.`,
        ],
      },
      {
        heading: 'Changes to these terms',
        body: [
          'We may update these Terms from time to time. Continued use of the website after changes are posted constitutes acceptance of the updated Terms.',
        ],
      },
      {
        heading: 'Contact us',
        body: [
          `Questions about these Terms can be sent to ${contact.emails.general}.`,
        ],
      },
    ],
  },
  cookies: {
    slug: 'cookies',
    title: 'Cookie Policy',
    path: legal.cookiesUrl,
    metaDescription: `How ${company.name} uses cookies and similar technologies on this website.`,
    effectiveDate: 'July 29, 2026',
    intro: [
      'This Cookie Policy explains what cookies are, which ones we use, and how you can control them.',
    ],
    sections: [
      {
        heading: 'What are cookies',
        body: [
          'Cookies are small text files stored on your device that help websites function and collect information about how they are used.',
        ],
      },
      {
        heading: 'Cookies we use',
        body: [
          'Essential cookies: required for the website to function correctly, such as remembering security tokens during form submission.',
          'Analytics cookies: help us understand how visitors use the site (for example, Google Analytics and Microsoft Clarity) so we can improve content and performance.',
        ],
      },
      {
        heading: 'Managing cookies',
        body: [
          'Most browsers let you control or delete cookies through their settings. Blocking essential cookies may affect how parts of the website function, such as the contact form.',
        ],
      },
      {
        heading: 'Changes to this policy',
        body: [
          'We may update this Cookie Policy as our use of cookies changes. Check back periodically for the latest version.',
        ],
      },
      {
        heading: 'Contact us',
        body: [
          `Questions about this Cookie Policy can be sent to ${contact.emails.general}.`,
        ],
      },
    ],
  },
}
