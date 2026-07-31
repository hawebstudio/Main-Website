'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { cn } from '@/lib/utils'
import { SearchBar } from '../navigation/search-bar'

interface FilterOption {
  label: string
  value: string
}

interface ContentFilterProps {
  options: FilterOption[]
  paramName?: string
  showSearch?: boolean
}

export function ContentFilter({ 
  options, 
  paramName = 'category',
  showSearch = true 
}: ContentFilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentFilter = searchParams.get(paramName) || 'all'

  const handleFilter = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value === 'all') {
      params.delete(paramName)
    } else {
      params.set(paramName, value)
    }
    
    // Reset pagination if present
    params.delete('page')
    
    router.push(`?${params.toString()}`, { scroll: false })
  }

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 w-full mb-12 border-b border-border pb-6">
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => handleFilter('all')}
          className={cn(
            'rounded-full px-4 py-2 text-sm font-medium transition-colors',
            currentFilter === 'all'
              ? 'bg-primary text-primary-foreground'
              : 'bg-secondary/50 text-secondary-foreground hover:bg-secondary'
          )}
        >
          All
        </button>
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => handleFilter(option.value)}
            className={cn(
              'rounded-full px-4 py-2 text-sm font-medium transition-colors',
              currentFilter === option.value
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary/50 text-secondary-foreground hover:bg-secondary'
            )}
          >
            {option.label}
          </button>
        ))}
      </div>
      
      {showSearch && (
        <div className="w-full sm:w-64">
          <SearchBar />
        </div>
      )}
    </div>
  )
}
