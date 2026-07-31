import { Heading, Text } from '@/components/primitives/typography'
import { Callout } from '@/components/editorial/callout'
import { QuoteBlock } from '@/components/editorial/quote-block'
import { cn } from '@/lib/utils'

/**
 * MDX Components — maps standard HTML elements from MDX to our
 * design system primitives.
 */
export const mdxComponents = {
  h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <Heading level={1} size="xl" className={cn('mt-2 scroll-m-20', className)} {...props} />
  ),
  h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <Heading
      level={2}
      size="lg"
      className={cn('mt-10 scroll-m-20 border-b border-border pb-2 first:mt-0', className)}
      {...props}
    />
  ),
  h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <Heading level={3} size="md" className={cn('mt-8 scroll-m-20', className)} {...props} />
  ),
  h4: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <Heading level={4} size="sm" className={cn('mt-8 scroll-m-20', className)} {...props} />
  ),
  p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <Text className={cn('leading-7 [&:not(:first-child)]:mt-6', className)} {...props} />
  ),
  a: ({ className, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      className={cn('font-medium text-primary underline underline-offset-4', className)}
      {...props}
    />
  ),
  ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className={cn('my-6 ml-6 list-disc [&>li]:mt-2', className)} {...props} />
  ),
  ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className={cn('my-6 ml-6 list-decimal [&>li]:mt-2', className)} {...props} />
  ),
  li: ({ className, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li className={cn('text-foreground', className)} {...props} />
  ),
  blockquote: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <blockquote
      className={cn(
        'mt-6 border-l-2 border-primary pl-6 italic text-muted-foreground [&>*]:text-muted-foreground',
        className,
      )}
      {...props}
    />
  ),
  hr: ({ ...props }: React.HTMLAttributes<HTMLHRElement>) => (
    <hr className="my-8 md:my-12 border-border" {...props} />
  ),
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 w-full overflow-x-auto rounded-lg border border-border">
      <table className={cn('w-full border-collapse text-sm', className)} {...props} />
    </div>
  ),
  thead: ({ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead className={cn('bg-muted/50', className)} {...props} />
  ),
  tbody: ({ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <tbody className={cn('[&>tr:last-child]:border-0', className)} {...props} />
  ),
  tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr className={cn('border-b border-border', className)} {...props} />
  ),
  th: ({ className, ...props }: React.ThHTMLAttributes<HTMLTableCellElement>) => (
    <th
      className={cn(
        'px-4 py-3 text-left align-middle font-semibold text-foreground [&[align=center]]:text-center [&[align=right]]:text-right',
        className,
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }: React.TdHTMLAttributes<HTMLTableCellElement>) => (
    <td
      className={cn(
        'px-4 py-3 align-middle text-muted-foreground [&[align=center]]:text-center [&[align=right]]:text-right',
        className,
      )}
      {...props}
    />
  ),
  Callout: Callout,
  QuoteBlock: QuoteBlock,
  // Code and Pre blocks usually need a custom syntax highlighter wrapper
  // which will be implemented in Phase 3.
}
