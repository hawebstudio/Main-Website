import { Cta } from '@/lib/content/types'

export const CTAS = {
  startProject: {
    label: 'Start a Project',
    href: '/contact?intent=start-project',
  } as Cta,
  requestAudit: {
    label: 'Request Website Audit',
    href: '/contact?intent=audit',
  } as Cta,
  improveWebsite: {
    label: 'Improve Existing Website',
    href: '/contact?intent=improve',
  } as Cta,
  discussSeo: {
    label: 'Discuss SEO',
    href: '/contact?intent=seo',
  } as Cta,
  talkEcommerce: {
    label: 'Talk About Ecommerce',
    href: '/contact?intent=ecommerce',
  } as Cta,
  bookConsultation: {
    label: 'Book Consultation',
    href: '/contact?intent=consultation',
  } as Cta,
}
