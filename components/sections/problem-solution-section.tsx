import { Container } from '@/components/primitives/container'
import { Heading, Text } from '@/components/primitives/typography'
import { cn } from '@/lib/utils'
import { CheckCircle2, XCircle } from 'lucide-react'

interface ProblemSolutionSectionProps extends React.HTMLAttributes<HTMLElement> {
  title: string
  description?: string
  problems: string[]
  solutions: string[]
}

export function ProblemSolutionSection({
  title,
  description,
  problems,
  solutions,
  className,
  ...props
}: ProblemSolutionSectionProps) {
  return (
    <section className={cn('py-24', className)} {...props}>
      <Container>
        <div className="flex flex-col gap-6 text-center max-w-3xl mx-auto mb-16">
          <Heading level={2} size="lg">
            {title}
          </Heading>
          {description && (
            <Text size="lg" tone="muted">
              {description}
            </Text>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
          {/* Problems */}
          <div className="flex flex-col gap-6 rounded-3xl bg-destructive/5 p-8 border border-destructive/10">
            <Heading level={3} size="sm" className="text-destructive">
              The Problems
            </Heading>
            <ul className="flex flex-col gap-4">
              {problems.map((problem, i) => (
                <li key={i} className="flex items-start gap-3">
                  <XCircle className="size-6 text-destructive shrink-0" />
                  <Text>{problem}</Text>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions */}
          <div className="flex flex-col gap-6 rounded-3xl bg-primary/5 p-8 border border-primary/10">
            <Heading level={3} size="sm" className="text-primary">
              Our Solutions
            </Heading>
            <ul className="flex flex-col gap-4">
              {solutions.map((solution, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="size-6 text-primary shrink-0" />
                  <Text>{solution}</Text>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  )
}
