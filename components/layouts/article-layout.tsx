import { Container } from '@/components/primitives/container'
import { Section } from '@/components/primitives/section'
import { cn } from '@/lib/utils'

interface ArticleLayoutProps extends React.HTMLAttributes<HTMLElement> {
  /** Header region (breadcrumb, title, meta) */
  header?: React.ReactNode
  /** Footer region (related content, prev/next) */
  footer?: React.ReactNode
}

/**
 * ArticleLayout — editorial reading layout for insights, case studies,
 * and long-form content. Prose width, generous rhythm.
 */
export function ArticleLayout({
  header,
  footer,
  className,
  children,
  ...props
}: ArticleLayoutProps) {
  return (
    <article className={cn(className)} {...props}>
      {header ? (
        <Section spacing="md" as="header">
          <Container size="sm">{header}</Container>
        </Section>
      ) : null}
      <Section spacing="sm">
        <Container size="sm" className="flex flex-col gap-6">
          {children}
        </Container>
      </Section>
      {footer ? (
        <Section spacing="md" as="footer">
          <Container size="sm">{footer}</Container>
        </Section>
      ) : null}
    </article>
  )
}
