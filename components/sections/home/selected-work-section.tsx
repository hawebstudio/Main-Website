import { Container } from '@/components/primitives/container'
import { Section } from '@/components/primitives/section'
import { MagazineLayout, MagazineFeatured, MagazineGrid } from '@/components/layouts/magazine-layout'
import { ProjectCard } from '@/components/cards/domain-cards'
import type { Project } from '@/lib/content/types'
import type { WithContent } from '@/lib/content/source'
import { SectionHeading } from './section-heading'

interface SelectedWorkSectionProps {
  featuredProject?: WithContent<Project>
  secondaryProjects: WithContent<Project>[]
}

export function SelectedWorkSection({ featuredProject, secondaryProjects }: SelectedWorkSectionProps) {
  return (
    <Section spacing="xl">
      <Container>
        <div className="flex flex-col gap-12">
          <SectionHeading
            eyebrow="Selected work"
            title="Real projects, real businesses, measurable results."
            href="/work"
            ctaLabel="View all work"
          />

          {featuredProject ? (
            <MagazineLayout>
              <MagazineFeatured>
                <div className="mx-auto max-w-5xl">
                  <ProjectCard project={featuredProject} />
                </div>
              </MagazineFeatured>

              {secondaryProjects.length > 0 ? (
                <MagazineGrid gridCols={2}>
                  {secondaryProjects.map((project) => (
                    <ProjectCard key={project.slug} project={project} />
                  ))}
                </MagazineGrid>
              ) : null}
            </MagazineLayout>
          ) : (
            <div className="rounded-3xl border border-dashed border-border/60 bg-muted/20 p-10 text-center text-muted-foreground">
              Selected work will appear here soon.
            </div>
          )}
        </div>
      </Container>
    </Section>
  )
}
