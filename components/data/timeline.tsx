import { Heading, Text } from '@/components/primitives/typography'
import { cn } from '@/lib/utils'

interface TimelineEvent {
  title: string
  description?: string
  date?: string
  /** Optional icon or label rendered in the dot position */
  marker?: React.ReactNode
}

interface TimelineProps extends React.HTMLAttributes<HTMLOListElement> {
  events: TimelineEvent[]
}

/**
 * Timeline — vertical timeline for about/history pages, project
 * milestones, or roadmaps. Each event gets a dot + connecting line.
 */
export function Timeline({ events, className, ...props }: TimelineProps) {
  return (
    <ol
      className={cn('relative ml-4 flex flex-col gap-10 border-l border-border pl-8', className)}
      {...props}
    >
      {events.map((event) => (
        <li key={event.title} className="relative">
          {/* Dot / marker */}
          <div
            aria-hidden="true"
            className="absolute -left-[calc(2rem+0.375rem)] flex size-3 items-center justify-center rounded-full border-2 border-primary bg-background"
          >
            {event.marker}
          </div>

          <div className="flex flex-col gap-1">
            {event.date ? (
              <time className="font-mono text-xs text-muted-foreground">
                {event.date}
              </time>
            ) : null}
            <Heading level={3} size="sm">
              {event.title}
            </Heading>
            {event.description ? (
              <Text tone="muted">{event.description}</Text>
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  )
}
