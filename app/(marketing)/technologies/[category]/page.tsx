import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { technologies } from '@/lib/content/source'
import { createMetadata } from '@/lib/seo/metadata'
import { routes } from '@/config/routes'
import { Breadcrumbs } from '@/components/navigation/breadcrumbs'
import { HeroWrapper } from '@/components/sections/hero-wrapper'
import { Heading, Text } from '@/components/primitives/typography'
import { Container } from '@/components/primitives/container'
import { Section } from '@/components/primitives/section'
import { CtaSection } from '@/components/sections/cta-section'
import { TechnologyCard } from '@/components/cards/domain-cards'
import { mdxComponents } from '@/lib/content/mdx-components'
import { mdxOptions } from '@/lib/content/mdx-options'

interface TechnologyCategoryPageProps {
  params: Promise<{ category: string }>
}

export async function generateStaticParams() {
  const categories = await technologies.getCategoryPages()
  return categories.map((category) => ({ category: category.slug }))
}

export async function generateMetadata({ params }: TechnologyCategoryPageProps): Promise<Metadata> {
  const { category } = await params
  const categoryPage = await technologies.getCategoryPage(category)
  if (!categoryPage) return {}

  return createMetadata({
    title: categoryPage.seoTitle ?? categoryPage.title,
    description: categoryPage.seoDescription ?? categoryPage.description,
    path: routes.technologies.category(categoryPage.slug),
  })
}

export default async function TechnologyCategoryPage({ params }: TechnologyCategoryPageProps) {
  const { category } = await params
  const categoryPage = await technologies.getCategoryPage(category)
  if (!categoryPage) notFound()

  const categoryTechnologies = await technologies.getByCategory(category)
  const breadcrumbItems = [
    { label: 'Home', href: routes.home() },
    { label: 'Technologies', href: routes.technologies.index() },
    { label: categoryPage.title, href: routes.technologies.category(categoryPage.slug) },
  ]

  return (
    <>
      <Breadcrumbs items={breadcrumbItems} className="pt-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" />

      <HeroWrapper>
        <Heading level={1} size="display">
          {categoryPage.title}
        </Heading>
        <Text size="lg" tone="muted" className="max-w-2xl">
          {categoryPage.description}
        </Text>
      </HeroWrapper>

      <Section spacing="md">
        <Container>
          <div className="flex flex-col gap-12">
            {categoryPage.content && (
              <div className="prose dark:prose-invert max-w-none">
                <MDXRemote source={categoryPage.content} components={mdxComponents} options={mdxOptions} />
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {categoryTechnologies.map((technology) => (
                <TechnologyCard key={technology.slug} technology={technology} />
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <CtaSection />
    </>
  )
}
