import { CheckCircle2 } from 'lucide-react'
import { Container } from '@/components/primitives/container'
import { Section } from '@/components/primitives/section'
import type { WithContent } from '@/lib/content/source'
import type { Project } from '@/lib/content/types'

export function ProjectGoalsSection({ project }: { project: WithContent<Project> }) {
  if (!project.goals?.length && !project.constraints?.length && !project.responsibilities?.length) return null

  return (
    <Section spacing="lg" className="bg-muted/20">
      <Container>
        <div className="grid gap-4 md:grid-cols-3">
          <ListCard title="Goals" items={project.goals ?? []} />
          <ListCard title="Constraints" items={project.constraints ?? []} />
          <ListCard title="Services delivered" items={project.responsibilities ?? []} icon="check" />
        </div>
      </Container>
    </Section>
  )
}

function ListCard({ title, items, icon }: { title: string; items: string[]; icon?: 'check' }) {
  return (
    <div className="rounded-3xl border border-border/50 bg-background/35 p-5">
      <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{title}</div>
      <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2 text-foreground">
            {icon === 'check' ? (
              <CheckCircle2 className="mt-0.5 size-4 text-primary" />
            ) : (
              <span className="mt-1 size-1.5 rounded-full bg-primary" />
            )}
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
