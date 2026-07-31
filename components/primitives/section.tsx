import { cn } from '@/lib/utils'

type SectionSpacing = 'sm' | 'md' | 'lg' | 'xl'

const spacingClasses: Record<SectionSpacing, string> = {
  sm: 'py-8 md:py-12',
  md: 'py-12 md:py-20',
  lg: 'py-16 md:py-28',
  xl: 'py-24 md:py-36',
}

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  spacing?: SectionSpacing
  as?: 'section' | 'div' | 'header' | 'footer'
}

/**
 * Section — vertical page rhythm.
 * The only component allowed to set section-level vertical padding.
 */
export function Section({
  spacing = 'lg',
  as: Tag = 'section',
  className,
  ...props
}: SectionProps) {
  return <Tag className={cn(spacingClasses[spacing], className)} {...props} />
}
