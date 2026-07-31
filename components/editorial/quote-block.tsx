import { cn } from '@/lib/utils'
import { Text } from '@/components/primitives/typography'
import { QuoteIcon } from 'lucide-react'

interface QuoteBlockProps extends React.HTMLAttributes<HTMLQuoteElement> {
  author?: string
  role?: string
}

export function QuoteBlock({
  children,
  author,
  role,
  className,
  ...props
}: QuoteBlockProps) {
  return (
    <figure
      className={cn(
        'my-12 flex flex-col gap-6 relative px-8 py-10 rounded-3xl bg-secondary/10 border border-border overflow-hidden',
        className
      )}
      {...props}
    >
      <QuoteIcon className="absolute -top-4 -left-4 size-24 text-secondary/30 -z-10 rotate-180" />
      
      <blockquote className="text-xl md:text-2xl font-medium leading-relaxed text-balance text-foreground italic">
        "{children}"
      </blockquote>
      
      {(author || role) && (
        <figcaption className="flex flex-col gap-1 mt-4">
          {author && <Text className="font-semibold">{author}</Text>}
          {role && <Text size="sm" tone="muted">{role}</Text>}
        </figcaption>
      )}
    </figure>
  )
}
