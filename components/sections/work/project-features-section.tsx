import { Lightbulb, Link2 } from 'lucide-react'
import { Container } from '@/components/primitives/container'
import { Section } from '@/components/primitives/section'
import { Eyebrow, Heading, Text } from '@/components/primitives/typography'
import type { WithContent } from '@/lib/content/source'
import type { Project } from '@/lib/content/types'

export function ProjectFeaturesSection({ project }: { project: WithContent<Project> }) {
  if (!project.keyFeatures?.length && !project.technicalHighlights?.length && !project.lessonsLearned) return null

  return (
    <Section spacing="lg">
      <Container>
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="glass-strong rounded-[2rem] border border-border/50 p-6 md:p-8">
            <Eyebrow>Key features</Eyebrow>
            <BulletList items={project.keyFeatures ?? []} className="mt-4" />
          </div>

          <div className="grid gap-4">
            <div className="rounded-[2rem] border border-border/50 bg-background/35 p-5">
              <Link2 className="size-5 text-primary" />
              <Heading level={3} size="sm" className="mt-3">
                Technical highlights
              </Heading>
              <BulletList items={project.technicalHighlights ?? []} className="mt-3" />
            </div>

            {project.lessonsLearned ? (
              <div className="rounded-[2rem] border border-border/50 bg-background/35 p-5">
                <Lightbulb className="size-5 text-primary" />
                <Heading level={3} size="sm" className="mt-3">
                  Lessons learned
                </Heading>
                <Text tone="muted" size="sm" className="mt-3 leading-relaxed">
                  {project.lessonsLearned}
                </Text>
              </div>
            ) : null}
          </div>
        </div>
      </Container>
    </Section>
  )
}

function BulletList({ items, className }: { items: string[]; className?: string }) {
  return (
    <ul className={`space-y-3 text-sm text-muted-foreground ${className || ''}`}>
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2 text-foreground">
          <span className="mt-1 size-1.5 rounded-full bg-primary" />
          {item}
        </li>
      ))}
    </ul>
  )
}
