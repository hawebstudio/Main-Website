'use client'

import { SiteSearch } from '@/components/search/site-search'

export function SearchBar({ className }: { className?: string }) {
  return <SiteSearch variant="header" className={className} placeholder="Search..." />
}
