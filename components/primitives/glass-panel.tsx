import { cn } from '@/lib/utils'

interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Visual intensity of the glass effect */
  intensity?: 'subtle' | 'strong'
  as?: 'div' | 'article' | 'aside' | 'nav'
}

/**
 * GlassPanel — the core surface of the liquid-glass design language.
 * Use for cards, nav bars, and any elevated surface. Composes the
 * `glass` / `glass-strong` utilities defined in globals.css.
 */
export function GlassPanel({
  intensity = 'subtle',
  as: Tag = 'div',
  className,
  ...props
}: GlassPanelProps) {
  return (
    <Tag
      className={cn(
        'rounded-2xl',
        intensity === 'strong' ? 'glass-strong' : 'glass',
        className,
      )}
      {...props}
    />
  )
}
