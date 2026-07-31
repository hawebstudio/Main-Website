import { cn } from '@/lib/utils'

interface SidebarLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Sidebar content — rendered in an <aside> */
  sidebar: React.ReactNode
  /** Sidebar position on desktop */
  side?: 'left' | 'right'
  /** Make the sidebar sticky on desktop */
  sticky?: boolean
}

/**
 * SidebarLayout — main content plus a sidebar. Stacks on mobile
 * (content first), splits on desktop.
 */
export function SidebarLayout({
  sidebar,
  side = 'right',
  sticky = true,
  className,
  children,
  ...props
}: SidebarLayoutProps) {
  return (
    <div
      className={cn(
        'grid grid-cols-1 gap-8 lg:gap-12',
        side === 'right' ? 'lg:grid-cols-[1fr_18rem]' : 'lg:grid-cols-[18rem_1fr]',
        className,
      )}
      {...props}
    >
      <div className={cn(side === 'left' && 'lg:order-2')}>{children}</div>
      <aside className={cn(side === 'left' && 'lg:order-1')}>
        <div className={cn(sticky && 'lg:sticky lg:top-24')}>{sidebar}</div>
      </aside>
    </div>
  )
}
