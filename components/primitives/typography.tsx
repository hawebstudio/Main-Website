import { cn } from '@/lib/utils'

/* ------------------------------------------------------------
   Typography scale — the ONLY place heading/body sizes live.
   ------------------------------------------------------------ */

type HeadingLevel = 1 | 2 | 3 | 4
type HeadingSize = 'display' | 'xl' | 'lg' | 'md' | 'sm'

const headingSizes: Record<HeadingSize, string> = {
  display: 'text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl',
  xl: 'text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl',
  lg: 'text-2xl font-semibold tracking-tight sm:text-3xl',
  md: 'text-xl font-semibold tracking-tight sm:text-2xl',
  sm: 'text-lg font-semibold tracking-tight',
}

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /** Semantic level (h1-h4) — decoupled from visual size */
  level?: HeadingLevel
  /** Visual size — decoupled from semantic level */
  size?: HeadingSize
}

export function Heading({
  level = 2,
  size = 'lg',
  className,
  ...props
}: HeadingProps) {
  const Tag = `h${level}` as const
  return (
    <Tag
      className={cn(headingSizes[size], 'text-balance text-foreground', className)}
      {...props}
    />
  )
}

/* ---------- Body text ---------- */

type TextSize = 'sm' | 'base' | 'lg'
type TextTone = 'default' | 'muted' | 'primary'

const textSizes: Record<TextSize, string> = {
  sm: 'text-sm leading-relaxed',
  base: 'text-base leading-relaxed',
  lg: 'text-lg leading-relaxed',
}

const textTones: Record<TextTone, string> = {
  default: 'text-foreground',
  muted: 'text-muted-foreground',
  primary: 'text-primary',
}

interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  size?: TextSize
  tone?: TextTone
  as?: 'p' | 'span' | 'div'
}

export function Text({
  size = 'base',
  tone = 'default',
  as: Tag = 'p',
  className,
  ...props
}: TextProps) {
  return (
    <Tag
      className={cn(textSizes[size], textTones[tone], 'text-pretty', className)}
      {...props}
    />
  )
}

/* ---------- Eyebrow / kicker label ---------- */

export function Eyebrow({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        'font-mono text-xs font-medium uppercase tracking-widest text-primary',
        className,
      )}
      {...props}
    />
  )
}
