'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { Eyebrow } from '@/components/primitives/typography'

export interface TocItem {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  items: TocItem[]
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '0px 0px -80% 0px' }
    )

    items.forEach((item) => {
      const element = document.getElementById(item.id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [items])

  if (items.length === 0) return null

  return (
    <nav className="flex flex-col gap-4">
      <Eyebrow>Table of Contents</Eyebrow>
      <ul className="flex flex-col gap-2 border-l-2 border-border pl-4">
        {items.map((item) => (
          <li
            key={item.id}
            className={cn(
              'text-sm transition-colors',
              item.level === 3 ? 'ml-4' : '',
              activeId === item.id 
                ? 'text-primary font-medium' 
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <a href={`#${item.id}`} onClick={(e) => {
              e.preventDefault()
              document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' })
              setActiveId(item.id)
            }}>
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
