import type { Metadata } from 'next'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { createMetadata } from '@/lib/seo/metadata'
import { HeroWrapper } from '@/components/sections/hero-wrapper'
import { Heading, Text, Eyebrow } from '@/components/primitives/typography'
import { Container } from '@/components/primitives/container'
import { Section } from '@/components/primitives/section'
import { CtaSection } from '@/components/sections/cta-section'
import { TechnologyCard } from '@/components/cards/domain-cards'
import { technologies } from '@/lib/content/source'
import { routes } from '@/config/routes'
import { mdxComponents } from '@/lib/content/mdx-components'
import { mdxOptions } from '@/lib/content/mdx-options'

export const metadata: Metadata = createMetadata({
  title: 'Technologies',
  description:
    'The modern platforms and frameworks we use to build fast, scalable web experiences.',
  path: '/technologies',
})

export default async function TechnologiesPage() {
  const rootPage = await technologies.getRoot()
  const categoryPages = await technologies.getCategoryPages()
  const featuredTechnologies = await technologies.getFeatured()
  const allTech = await technologies.getAll()

  return (
    <>
      <HeroWrapper>
        <Heading level={1} size="display">
          {rootPage?.title ?? 'Technologies'}
        </Heading>
        <Text size="lg" tone="muted" className="max-w-xl">
          {rootPage?.description ?? "The modern platforms and frameworks we use to build fast, scalable web experiences. We don't believe in one-size-fits-all."}
        </Text>
      </HeroWrapper>

      <Section spacing="sm">
        <Container>
          {categoryPages.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center border border-dashed rounded-3xl bg-secondary/10">
              <Heading level={3}>No technologies listed</Heading>
              <Text tone="muted">We are updating our technology stack.</Text>
            </div>
          ) : (
            <div className="flex flex-col gap-20">
              {rootPage?.content && (
                <div className="prose dark:prose-invert max-w-none">
                  <MDXRemote source={rootPage.content} components={mdxComponents} options={mdxOptions} />
                </div>
              )}

              {featuredTechnologies.length > 0 && (
                <div className="flex flex-col gap-8">
                  <div className="flex flex-col gap-2 border-b border-border pb-4">
                    <Eyebrow>Featured</Eyebrow>
                    <Heading level={2} size="lg">Featured Technologies</Heading>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {featuredTechnologies.map(technology => (
                      <TechnologyCard key={technology.slug} technology={technology} />
                    ))}
                  </div>
                </div>
              )}

              {categoryPages.map(category => {
                const categoryItems = allTech.filter(technology => technology.category === category.slug)
                return (
                  <div key={category.slug} className="flex flex-col gap-8">
                    <div className="flex flex-col gap-2 border-b border-border pb-4">
                      <a href={routes.technologies.category(category.slug)} className="group">
                        <Heading level={2} size="lg" className="group-hover:text-primary">{category.title}</Heading>
                      </a>
                      <Text tone="muted" className="max-w-3xl">{category.description}</Text>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {categoryItems.map(technology => (
                        <TechnologyCard key={technology.slug} technology={technology} />
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </Container>
      </Section>

      <CtaSection />
    </>
  )
}
