import { Heading, Text } from '@/components/primitives/typography'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface EditorialCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description: string
  href: string
  image?: {
    src: string
    alt: string
  }
  tag?: string
}

/**
 * EditorialCard — used for displaying services or insights with an image and refined typography.
 */
export function EditorialCard({
  title,
  description,
  href,
  image,
  tag,
  className,
  ...props
}: EditorialCardProps) {
  return (
    <Link href={href} className="group block focus-visible:outline-none">
      <article
        className={cn(
          'flex h-full flex-col gap-6 rounded-3xl border border-border/50 bg-background/50 p-6 transition-all hover:bg-muted/50 hover:border-primary/30',
          className,
        )}
        {...props}
      >
        {image ? (
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-muted">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        ) : null}
        
        <div className="flex flex-1 flex-col gap-4">
          {tag && (
            <span className="text-xs font-medium uppercase tracking-widest text-primary">
              {tag}
            </span>
          )}
          <Heading level={3} size="sm" className="group-hover:text-primary transition-colors">
            {title}
          </Heading>
          <Text tone="muted" size="sm" className="line-clamp-3">
            {description}
          </Text>
        </div>

        <div className="flex items-center gap-2 text-sm font-medium text-primary">
          Read more
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </div>
      </article>
    </Link>
  )
}
