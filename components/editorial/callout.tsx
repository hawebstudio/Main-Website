import { cn } from '@/lib/utils'
import { AlertCircle, CheckCircle2, Info, Lightbulb } from 'lucide-react'
import { Heading } from '@/components/primitives/typography'

export type CalloutType = 'info' | 'warning' | 'success' | 'tip'

interface CalloutProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: CalloutType
  title?: string
}

const config = {
  info: {
    icon: Info,
    styles: 'bg-secondary/50 border-border text-foreground',
    iconColor: 'text-primary'
  },
  warning: {
    icon: AlertCircle,
    styles: 'bg-destructive/5 border-destructive/20 text-foreground',
    iconColor: 'text-destructive'
  },
  success: {
    icon: CheckCircle2,
    styles: 'bg-green-500/5 border-green-500/20 text-foreground',
    iconColor: 'text-green-500'
  },
  tip: {
    icon: Lightbulb,
    styles: 'bg-primary/5 border-primary/20 text-foreground',
    iconColor: 'text-primary'
  }
}

export function Callout({
  type = 'info',
  title,
  children,
  className,
  ...props
}: CalloutProps) {
  const { icon: Icon, styles, iconColor } = config[type]

  return (
    <div
      className={cn(
        'my-8 flex gap-4 rounded-3xl border p-6',
        styles,
        className
      )}
      {...props}
    >
      <div className={cn('shrink-0 mt-1', iconColor)}>
        <Icon className="size-6" />
      </div>
      <div className="flex flex-col gap-2">
        {title && <Heading level={4} size="sm">{title}</Heading>}
        <div className="prose prose-sm dark:prose-invert max-w-none [&>p:last-child]:mb-0 [&>p:first-child]:mt-0">
          {children}
        </div>
      </div>
    </div>
  )
}
