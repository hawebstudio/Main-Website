import type { Metadata } from 'next'
import { ProblemsPageContent } from '@/components/sections/problems/problems-page-content'
import { createMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = createMetadata({
  title: 'Problems We Solve — Website Challenges Mapped to Solutions',
  description:
    'Describe your business challenge and we will map it to the right website service. Browse common problems including poor search visibility, slow performance, low conversions, security concerns, and more.',
  path: '/problems',
})

export default async function ProblemsPage() {
  return <ProblemsPageContent />
}
