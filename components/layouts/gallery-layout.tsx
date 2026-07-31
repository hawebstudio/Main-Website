import Image from 'next/image'
import { cn } from '@/lib/utils'
import type { ImageAsset } from '@/lib/content/types'

type GalleryCols = 2 | 3 | 4

const colClasses: Record<GalleryCols, string> = {
  2: 'columns-1 sm:columns-2',
  3: 'columns-1 sm:columns-2 lg:columns-3',
  4: 'columns-1 sm:columns-2 lg:columns-3 xl:columns-4',
}

interface GalleryLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Column count on desktop */
  cols?: GalleryCols
  /** Gap between items */
  gap?: 'sm' | 'md' | 'lg'
}

const gapClasses = {
  sm: 'gap-3 [&>*]:mb-3',
  md: 'gap-4 [&>*]:mb-4',
  lg: 'gap-6 [&>*]:mb-6',
}

/**
 * GalleryLayout — CSS-columns masonry for image galleries and
 * portfolio grids. Pass GalleryItem children.
 */
export function GalleryLayout({
  cols = 3,
  gap = 'md',
  className,
  ...props
}: GalleryLayoutProps) {
  return (
    <div
      className={cn(colClasses[cols], gapClasses[gap], className)}
      {...props}
    />
  )
}

interface GalleryItemProps extends React.HTMLAttributes<HTMLElement> {
  image?: ImageAsset
  /** Aspect ratio hint (only used when image is provided) */
  aspect?: 'auto' | 'square' | 'video' | 'portrait'
}

const aspectClasses = {
  auto: '',
  square: 'aspect-square',
  video: 'aspect-video',
  portrait: 'aspect-[3/4]',
}

/**
 * GalleryItem — single item inside a GalleryLayout. Renders an
 * image with optional overlay content, or arbitrary children.
 */
export function GalleryItem({
  image,
  aspect = 'auto',
  className,
  children,
  ...props
}: GalleryItemProps) {
  return (
    <figure
      className={cn(
        'group relative overflow-hidden rounded-2xl bg-surface-2 break-inside-avoid',
        aspectClasses[aspect],
        className,
      )}
      {...props}
    >
      {image ? (
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width ?? 800}
          height={image.height ?? 600}
          className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      ) : null}
      {children}
    </figure>
  )
}
