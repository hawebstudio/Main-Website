import { Heading, Text } from '@/components/primitives/typography'
import { cn } from '@/lib/utils'

interface FeatureCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description: string
  icon?: React.ReactNode
}

/**
 * FeatureCard — standard icon + title + text card for marketing pages.
 */
export function FeatureCard({
  title,
  description,
  icon,
  className,
  ...props
}: FeatureCardProps) {
  return (
    <div
      className={cn(
        'glass flex flex-col gap-4 rounded-2xl p-6 md:p-8',
        className,
      )}
      {...props}
    >
      {icon ? (
        <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
          {icon}
        </div>
      ) : null}
      <div className="flex flex-col gap-2">
        <Heading level={3} size="sm">
          {title}
        </Heading>
        <Text tone="muted" size="sm">
          {description}
        </Text>
      </div>
    </div>
  )
}
