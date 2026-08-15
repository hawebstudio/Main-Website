'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { NavItem } from '@/lib/content/types'
import { cn } from '@/lib/utils'

interface NavLinkProps {
  item: NavItem
  className?: string
  onNavigate?: () => void
}

/**
 * NavLink — active-state-aware navigation link.
 * Marks the current section with aria-current.
 */
export function NavLink({ item, className, onNavigate }: NavLinkProps) {
  const pathname = usePathname()
  const isActive =
    item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)

  return (
    <Link
      href={item.href}
      aria-current={isActive ? 'page' : undefined}
      onClick={onNavigate}
      className={cn(
        'whitespace-nowrap rounded-full px-3 py-2 text-sm transition-all duration-200 lg:px-2.5 xl:px-4',
        isActive
          ? 'bg-background/80 text-foreground shadow-sm ring-1 ring-border/70'
          : 'text-muted-foreground hover:bg-background/60 hover:text-foreground',
        className,
      )}
    >
      {item.label}
    </Link>
  )
}
