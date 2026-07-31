import Image from 'next/image'
import { Container } from '@/components/primitives/container'
import { Section } from '@/components/primitives/section'
import { Eyebrow, Heading, Text } from '@/components/primitives/typography'
import type { WithContent } from '@/lib/content/source'
import type { ImageAsset, Project } from '@/lib/content/types'

export function ProjectGallerySection({ project }: { project: WithContent<Project> }) {
  const gallery = project.gallery ?? []

  if (gallery.length === 0) return null

  const [featured, ...rest] = gallery

  return (
    <Section spacing="lg">
      <Container>
        <div className="flex flex-col gap-8">
          <div className="max-w-2xl">
            <Eyebrow>Project gallery</Eyebrow>
            <Heading level={2} size="xl" className="mt-3">
              A closer look at {project.title}.
            </Heading>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <GalleryImage image={featured} className="md:col-span-2" priority />
            {rest.map((image, index) => (
              <GalleryImage key={image.src} image={image} priority={index === 0} />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  )
}

function GalleryImage({
  image,
  className,
  priority,
}: {
  image: ImageAsset
  className?: string
  priority?: boolean
}) {
  return (
    <figure className={className}>
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-border/50 bg-surface-2">
        <Image
          src={image.src || '/placeholder.svg'}
          alt={image.alt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
      </div>
      {image.alt ? (
        <figcaption className="mt-2 text-sm text-muted-foreground">{image.alt}</figcaption>
      ) : null}
    </figure>
  )
}
