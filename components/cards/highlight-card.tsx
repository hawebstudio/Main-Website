import { Heading, Text } from '@/components/primitives/typography'
import { cn } from '@/lib/utils'

interface HighlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description: string
  highlight: string
  icon?: React.ReactNode
}

/**
 * HighlightCard — calls attention to a specific metric, problem, or outcome.
 */
export function HighlightCard({
  title,
  description,
  highlight,
  icon,
  className,
  ...props
}: HighlightCardProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-4 rounded-2xl border border-primary/20 bg-primary/5 p-6 md:p-8',
        className,
      )}
      {...props}
    >
      <div className="flex items-center gap-4">
        {icon ? (
          <div className="flex size-10 items-center justify-center rounded-full bg-primary/20 text-primary">
            {icon}
          </div>
        ) : null}
        <span className="text-sm font-semibold uppercase tracking-wider text-primary">
          {highlight}
        </span>
      </div>
      <div className="flex flex-col gap-2">
        <Heading level={3} size="md">
          {title}
        </Heading>
        <Text tone="muted" size="base">
          {description}
        </Text>
      </div>
    </div>
  )
}
