import { Eyebrow, Heading, Text } from '@/components/primitives/typography'
import { cn } from '@/lib/utils'

interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  headingLevel?: 1 | 2 | 3
  headingSize?: 'display' | 'xl' | 'lg' | 'md'
}

/**
 * SectionHeader — standard heading block used at the top of every
 * content section. Keeps eyebrow/title/description rhythm consistent.
 */
export function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'left',
  headingLevel = 2,
  headingSize = 'lg',
  className,
  ...props
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-3',
        align === 'center' && 'items-center text-center',
        className,
      )}
      {...props}
    >
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <Heading level={headingLevel} size={headingSize}>
        {title}
      </Heading>
      {description ? (
        <Text size="lg" tone="muted" className="max-w-2xl">
          {description}
        </Text>
      ) : null}
    </div>
  )
}
