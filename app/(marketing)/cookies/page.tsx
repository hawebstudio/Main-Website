import type { Metadata } from 'next'
import { createMetadata } from '@/lib/seo/metadata'
import { JsonLd } from '@/components/seo/json-ld'
import { webPageJsonLd } from '@/lib/seo/json-ld'
import { Breadcrumbs } from '@/components/navigation/breadcrumbs'
import { LegalDocumentSection } from '@/components/sections/legal/legal-document'
import { legalDocuments } from '@/lib/legal/content'
import { routes } from '@/config/routes'

const document = legalDocuments.cookies

export const metadata: Metadata = createMetadata({
  title: document.title,
  description: document.metaDescription,
  path: document.path,
})

const breadcrumbItems = [
  { label: 'Home', href: routes.home() },
  { label: document.title, href: document.path },
]

const jsonLdData = [
  webPageJsonLd({
    title: document.title,
    description: document.metaDescription,
    path: document.path,
  }),
]

export default function CookiesPage() {
  return (
    <>
      <JsonLd data={jsonLdData} />
      <LegalDocumentSection document={document} breadcrumbs={<Breadcrumbs items={breadcrumbItems} />} />
    </>
  )
}
