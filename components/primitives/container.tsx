import { cn } from '@/lib/utils'

type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full'

const sizeClasses: Record<ContainerSize, string> = {
  sm: 'max-w-2xl', // article / prose width
  md: 'max-w-4xl', // narrow content
  lg: 'max-w-6xl', // standard marketing width
  xl: 'max-w-7xl', // wide galleries / bento
  full: 'max-w-none',
}

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: ContainerSize
  as?: 'div' | 'article' | 'section'
}

/**
 * Container — horizontal page rhythm.
 * The only component allowed to set max-width and page gutters.
 */
export function Container({
  size = 'lg',
  as: Tag = 'div',
  className,
  ...props
}: ContainerProps) {
  return (
    <Tag
      className={cn('mx-auto w-full px-4 sm:px-6 lg:px-8', sizeClasses[size], className)}
      {...props}
    />
  )
}
