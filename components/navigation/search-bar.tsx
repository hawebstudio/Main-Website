'use client'

import { SiteSearchLazy } from '@/components/search/site-search-lazy'

export function SearchBar({ className }: { className?: string }) {
  return <SiteSearchLazy variant="header" className={className} placeholder="Search..." />
}
