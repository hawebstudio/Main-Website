import { SplitLayout } from '@/components/layouts/split-layout'
import { cn } from '@/lib/utils'

interface AlternatingLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Rows of [media, content] pairs — direction alternates automatically */
  rows: { media: React.ReactNode; content: React.ReactNode }[]
}

/**
 * AlternatingLayout — zig-zag media/content rows for feature and
 * service breakdowns.
 */
export function AlternatingLayout({ rows, className, ...props }: AlternatingLayoutProps) {
  return (
    <div className={cn('flex flex-col gap-16 md:gap-24', className)} {...props}>
      {rows.map((row, index) => (
        <SplitLayout key={index} align="center" reverse={index % 2 === 1}>
          <div>{row.media}</div>
          <div>{row.content}</div>
        </SplitLayout>
      ))}
    </div>
  )
}
