import { cn } from '@/lib/utils'

type SectionSpacing = 'sm' | 'md' | 'lg' | 'xl'

const spacingClasses: Record<SectionSpacing, string> = {
  sm: 'py-6 md:py-10',
  md: 'py-8 md:py-14',
  lg: 'py-10 md:py-16',
  xl: 'py-12 md:py-20',
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
