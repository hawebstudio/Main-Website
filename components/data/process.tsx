import { Heading, Text } from '@/components/primitives/typography'
import { cn } from '@/lib/utils'

interface ProcessStep {
  title: string
  description: string
}

interface ProcessProps extends React.HTMLAttributes<HTMLOListElement> {
  steps: ProcessStep[]
}

/**
 * Process — numbered step timeline for service and about pages.
 */
export function Process({ steps, className, ...props }: ProcessProps) {
  return (
    <ol className={cn('flex flex-col gap-8', className)} {...props}>
      {steps.map((step, index) => (
        <li key={step.title} className="flex gap-5">
          <span
            aria-hidden="true"
            className="glass flex size-10 shrink-0 items-center justify-center rounded-full font-mono text-sm text-primary"
          >
            {String(index + 1).padStart(2, '0')}
          </span>
          <div className="flex flex-col gap-1 pt-1.5">
            <Heading level={3} size="sm">
              {step.title}
            </Heading>
            <Text tone="muted">{step.description}</Text>
          </div>
        </li>
      ))}
    </ol>
  )
}
