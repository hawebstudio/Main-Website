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
        'whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium transition-colors duration-150',
        isActive
          ? 'bg-primary/10 text-primary font-semibold'
          : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground',
        className,
      )}
    >
      {item.label}
    </Link>
  )
}
