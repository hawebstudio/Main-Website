'use client'

import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

interface SearchBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onSearch?: (query: string) => void
}

/**
 * SearchBox — unified search input with icon and keyboard shortcut hint.
 */
export function SearchBox({ className, onSearch, ...props }: SearchBoxProps) {
  return (
    <div className={cn('relative', className)}>
      <Search
        className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground"
        aria-hidden="true"
      />
      <Input
        type="search"
        placeholder="Search..."
        className="pl-10 pr-12 rounded-full bg-surface-1 border-border focus-visible:ring-primary/50"
        onChange={(e) => onSearch?.(e.target.value)}
        {...props}
      />
      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
        <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex text-muted-foreground">
          <span className="text-xs">⌘</span>K
        </kbd>
      </div>
    </div>
  )
}
