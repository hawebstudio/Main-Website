import { Code2, Compass, Route } from 'lucide-react'
import { Container } from '@/components/primitives/container'
import { Section } from '@/components/primitives/section'
import { Eyebrow, Heading, Text } from '@/components/primitives/typography'
import type { WithContent } from '@/lib/content/source'
import type { Project } from '@/lib/content/types'

export function ProjectOverviewSection({ project }: { project: WithContent<Project> }) {
  return (
    <Section spacing="lg">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="glass-strong rounded-[2rem] border border-border/50 p-6 md:p-8">
            <Eyebrow>Project overview</Eyebrow>
            <Heading level={2} size="xl" className="mt-3">
              What this project is and why it exists.
            </Heading>
            <Text size="lg" tone="muted" className="mt-4 leading-relaxed">
              {project.context ?? 'Project context is intentionally limited to publicly shareable information.'}
            </Text>
            {project.whoFor ? <DetailBlock title="Who it was built for">{project.whoFor}</DetailBlock> : null}
            {project.scope ? <DetailBlock title="Scope">{project.scope}</DetailBlock> : null}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <SummaryCard icon={<Compass className="size-5 text-primary" />} title="Business challenge">
              {project.challenge ?? 'Challenge details are limited to non-confidential context.'}
            </SummaryCard>
            <SummaryCard icon={<Code2 className="size-5 text-primary" />} title="Solution approach">
              {project.implementation ?? 'Implementation details are summarized for public transparency.'}
            </SummaryCard>
            {project.architecture ? (
              <SummaryCard icon={<Route className="size-5 text-primary" />} title="Technical architecture" className="sm:col-span-2">
                {project.architecture}
              </SummaryCard>
            ) : null}
          </div>
        </div>
      </Container>
    </Section>
  )
}

function DetailBlock({ title, children }: { title: string; children: string }) {
  return (
    <div className="mt-4 rounded-2xl border border-border/60 bg-background/35 p-4 first:mt-6">
      <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{title}</div>
      <Text className="mt-2 leading-relaxed">{children}</Text>
    </div>
  )
}

function SummaryCard({
  icon,
  title,
  children,
  className,
}: {
  icon: React.ReactNode
  title: string
  children: string
  className?: string
}) {
  return (
    <div className={`rounded-[2rem] border border-border/50 bg-background/35 p-5 ${className || ''}`}>
      {icon}
      <Heading level={3} size="sm" className="mt-3">
        {title}
      </Heading>
      <Text tone="muted" size="sm" className="mt-3 leading-relaxed">
        {children}
      </Text>
    </div>
  )
}
