import type { Metadata } from 'next'
import { ProblemsPageContent } from '@/components/sections/problems/problems-page-content'
import { createMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = createMetadata({
  title: 'Solutions Hub',
  description:
    'Problem-first website solutions that map business challenges to the right HA Web Studio services.',
  path: '/problems',
})

export default function ProblemsPage() {
  return <ProblemsPageContent />
}
