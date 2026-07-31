import Link from 'next/link'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Heading, Text } from '@/components/primitives/typography'
import { WhatsAppIcon } from '@/components/icons/whatsapp-icon'
import type { ImageAsset } from '@/lib/content/types'
import { cn } from '@/lib/utils'

export interface ContentCardProps {
  href: string
  title: string
  description?: string
  /** Small label above the title (e.g. category, client) */
  eyebrow?: string
  cover?: ImageAsset
  tags?: string[]
  /** Small trailing meta text (e.g. date, reading time) */
  meta?: string
  className?: string
  /**
   * WhatsApp deep link (wa.me URL, ideally with a pre-filled message) shown
   * as a floating action in the top-right corner of the card. Omit to hide.
   * Currently used by ServiceCard so each service card can start a chat
   * scoped to that specific service.
   */
  whatsappHref?: string
}

/**
 * ContentCard — the single card pattern for all content collections.
 * Domain cards (ServiceCard, ProjectCard, ...) map their model onto
 * these props instead of re-implementing card markup.
 *
 * The whole card is a "stretched link": the actual `<Link>` is an
 * absolutely-positioned overlay behind the content, and the content itself
 * is pointer-events-none so clicks fall through to it. This lets the
 * optional WhatsApp button sit as a real, independently-clickable link on
 * top of the card without nesting an `<a>` inside another `<a>` (invalid
 * HTML that would otherwise break the card's own link).
 */
export function ContentCard({
  href,
  title,
  description,
  eyebrow,
  cover,
  tags,
  meta,
  className,
  whatsappHref,
}: ContentCardProps) {
  return (
    <div
      className={cn(
        'glass group relative flex flex-col gap-4 rounded-2xl p-5 transition-colors hover:bg-accent',
        className,
      )}
    >
      <Link
        href={href}
        aria-label={title}
        className="absolute inset-0 z-0 rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      />

      {whatsappHref ? (
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Chat on WhatsApp about ${title}`}
          title="Chat on WhatsApp"
          className="absolute right-4 top-4 z-20 flex size-9 items-center justify-center rounded-full bg-[#25D366] text-white shadow-md transition-transform hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          <WhatsAppIcon className="size-4" />
        </a>
      ) : null}

      {cover ? (
        <div className="relative z-10 aspect-[16/10] overflow-hidden rounded-xl bg-surface-2 pointer-events-none">
          <Image
            src={cover.src || '/placeholder.svg'}
            alt={cover.alt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>
      ) : null}

      <div className="relative z-10 flex flex-1 flex-col gap-2 pointer-events-none">
        {eyebrow ? (
          <span className="font-mono text-xs uppercase tracking-widest text-primary">
            {eyebrow}
          </span>
        ) : null}
        <Heading level={3} size="sm" className="group-hover:text-primary">
          {title}
        </Heading>
        {description ? (
          <Text size="sm" tone="muted" className="line-clamp-2">
            {description}
          </Text>
        ) : null}
      </div>

      {(tags?.length || meta) && (
        <div className="relative z-10 flex items-center justify-between gap-3 pointer-events-none">
          {tags?.length ? (
            <ul className="flex flex-wrap gap-1.5">
              {tags.slice(0, 3).map((tag) => (
                <li key={tag}>
                  <Badge variant="secondary">{tag}</Badge>
                </li>
              ))}
            </ul>
          ) : (
            <span />
          )}
          {meta ? <span className="shrink-0 text-xs text-muted-foreground">{meta}</span> : null}
        </div>
      )}
    </div>
  )
}
