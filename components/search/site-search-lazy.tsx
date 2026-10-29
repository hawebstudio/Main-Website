'use client'

import dynamic from 'next/dynamic'

// SiteSearch pulls in the local search engine (lib/search) and the search
// index fetch logic. It's mounted on every route (header + footer), but a
// visitor only needs that code once they actually open search. Loading it
// through next/dynamic keeps it out of the JS the browser has to parse and
// execute for the initial render of every page.
export const SiteSearchLazy = dynamic(
  () => import('./site-search').then((mod) => mod.SiteSearch),
  { ssr: false },
)
