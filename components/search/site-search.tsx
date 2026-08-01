'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  Fragment,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type RefObject,
} from 'react'
import { createPortal } from 'react-dom'
import { ArrowRight, CornerDownLeft, Loader2, Search, X } from 'lucide-react'
import {
  createSearchProvider,
  createSearchSuggestions,
  highlightText,
  type SearchDocument,
  type SearchDocumentType,
  type SearchResult,
} from '@/lib/search'
import { routes } from '@/config/routes'
import { cn } from '@/lib/utils'
import { useBodyScrollLock } from '@/components/navigation/use-body-scroll-lock'

type SearchVariant = 'header' | 'footer' | 'page' | 'modal' | 'mobile'
type SearchShortcutMedia = 'all' | 'desktop' | 'mobile' | 'wide' | 'compact'

interface SiteSearchProps {
  variant?: SearchVariant
  placeholder?: string
  className?: string
  initialQuery?: string
  initialType?: SearchDocumentType | 'all'
  enableShortcut?: boolean
  shortcutMedia?: SearchShortcutMedia
}

const documentTypeLabels: Record<SearchDocumentType, string> = {
  service: 'Services',
  work: 'Work',
  'case-study': 'Case Studies',
  problem: 'Problems',
  insight: 'Insights',
  technology: 'Technologies',
}

const filters: Array<{ label: string; value: SearchDocumentType | 'all' }> = [
  { label: 'All', value: 'all' },
  { label: 'Services', value: 'service' },
  { label: 'Work', value: 'work' },
  { label: 'Case Studies', value: 'case-study' },
  { label: 'Insights', value: 'insight' },
  { label: 'Technologies', value: 'technology' },
]

const popularSearches = ['nextjs', 'shopify', 'seo', 'cloudflare', 'analytics']

function useSearchDocuments() {
  const [documents, setDocuments] = useState<SearchDocument[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    async function load() {
      setIsLoading(true)
      try {
        const response = await fetch('/search/search-index.json')
        if (!response.ok) return
        const index = (await response.json()) as SearchDocument[]
        if (mounted) setDocuments(index)
      } finally {
        if (mounted) setIsLoading(false)
      }
    }

    load()
    return () => {
      mounted = false
    }
  }, [])

  return { documents, isLoading }
}

function useRecentSearches() {
  const [recentSearches, setRecentSearches] = useState<string[]>([])

  useEffect(() => {
    try {
      setRecentSearches(JSON.parse(sessionStorage.getItem('ha-recent-searches') ?? '[]'))
    } catch {
      setRecentSearches([])
    }
  }, [])

  function addRecentSearch(query: string) {
    const trimmed = query.trim()
    if (trimmed.length < 2) return
    setRecentSearches((current) => {
      const next = [trimmed, ...current.filter((item) => item.toLowerCase() !== trimmed.toLowerCase())].slice(0, 6)
      sessionStorage.setItem('ha-recent-searches', JSON.stringify(next))
      return next
    })
  }

  return { recentSearches, addRecentSearch }
}

function Highlight({ value, query }: { value?: string; query: string }) {
  if (!value) return null
  if (!query.trim()) return <>{value}</>

  const highlighted = highlightText(value, query)
  const parts = highlighted.split(/(<mark>.*?<\/mark>)/gi)

  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith('<mark>') && part.endsWith('</mark>')) {
          return (
            <mark key={`${part}-${index}`} className="rounded bg-primary/15 px-0.5 text-primary">
              {part.replace(/<\/?mark>/g, '')}
            </mark>
          )
        }
        return <Fragment key={`${part}-${index}`}>{part}</Fragment>
      })}
    </>
  )
}

function groupResults(results: SearchResult[]) {
  return results.reduce(
    (groups, result) => {
      const type = result.document.type
      groups[type] = [...(groups[type] ?? []), result]
      return groups
    },
    {} as Partial<Record<SearchDocumentType, SearchResult[]>>,
  )
}

function documentPool(documents: SearchDocument[], type: SearchDocumentType, limit: number) {
  return documents.filter((document) => document.type === type).slice(0, limit)
}

function ShortcutHint() {
  return (
    <kbd className="hidden h-5 select-none items-center gap-1 rounded border border-border bg-background/80 px-1.5 font-mono text-[10px] font-medium text-muted-foreground shadow-sm sm:flex">
      Ctrl K
    </kbd>
  )
}

function shortcutMatchesMedia(media: SearchShortcutMedia) {
  if (typeof window === 'undefined' || media === 'all') return true
  const isDesktop = window.matchMedia('(min-width: 768px)').matches
  const isWide = window.matchMedia('(min-width: 1120px)').matches
  if (media === 'desktop') return isDesktop
  if (media === 'mobile') return !isDesktop
  if (media === 'wide') return isWide
  return !isWide
}

function buildSearchUrl(query: string, type: SearchDocumentType | 'all' = 'all') {
  const params = new URLSearchParams()
  const trimmed = query.trim()
  if (trimmed) params.set('q', trimmed)
  if (type !== 'all') params.set('type', type)
  const value = params.toString()
  return value ? `${routes.search()}?${value}` : routes.search()
}

interface DropdownPosition {
  top: number
  left: number
  width: number
}

function getDropdownPosition(container: HTMLElement): DropdownPosition {
  const rect = container.getBoundingClientRect()
  const viewportPadding = 12
  const minWidth = 280
  const width = Math.min(window.innerWidth - viewportPadding * 2, Math.max(rect.width, minWidth))
  const left = Math.min(
    Math.max(viewportPadding, rect.left),
    window.innerWidth - width - viewportPadding,
  )

  return {
    top: rect.bottom + 8,
    left,
    width,
  }
}

function ResultLink({
  result,
  query,
  active,
  onSelect,
}: {
  result: SearchResult
  query: string
  active?: boolean
  onSelect: () => void
}) {
  return (
    <Link
      href={result.document.url}
      className={cn(
        'block rounded-xl px-3 py-3 transition-colors',
        active ? 'bg-muted text-foreground' : 'hover:bg-muted/70',
      )}
      onClick={onSelect}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="truncate text-sm font-medium text-foreground">
            <Highlight value={result.document.title} query={query} />
          </div>
          <div className="mt-1 line-clamp-2 text-xs leading-5 text-muted-foreground">
            <Highlight value={result.snippet?.replace(/<\/?mark>/g, '') ?? result.document.description} query={query} />
          </div>
        </div>
        <span className="shrink-0 rounded-full border border-border px-2 py-0.5 text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
          {documentTypeLabels[result.document.type]}
        </span>
      </div>
    </Link>
  )
}

function SearchInput({
  query,
  setQuery,
  placeholder,
  inputId,
  isLoading,
  onFocus,
  onKeyDown,
  inputRef,
  compact,
}: {
  query: string
  setQuery: (value: string) => void
  placeholder: string
  inputId: string
  isLoading: boolean
  onFocus?: () => void
  onKeyDown?: (event: ReactKeyboardEvent<HTMLInputElement>) => void
  inputRef?: RefObject<HTMLInputElement | null>
  compact?: boolean
}) {
  return (
    <div className="group relative">
      <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" />
      <input
        ref={inputRef}
        id={inputId}
        type="search"
        value={query}
        placeholder={placeholder}
        autoComplete="off"
        className={cn(
          'h-10 w-full rounded-full border border-border/70 bg-background/75 pl-10 pr-16 text-sm text-foreground outline-none backdrop-blur transition-all placeholder:text-muted-foreground focus:border-primary/50 focus:bg-background focus:ring-4 focus:ring-primary/10',
          compact && 'h-9 min-w-0',
        )}
        onChange={(event) => setQuery(event.target.value)}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
      />
      <div className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-2">
        {isLoading ? <Loader2 className="size-3.5 animate-spin text-primary" /> : <ShortcutHint />}
      </div>
    </div>
  )
}

export function SiteSearch({
  variant = 'header',
  placeholder = 'Search services, technologies, case studies...',
  className,
  initialQuery = '',
  initialType = 'all',
  enableShortcut = false,
  shortcutMedia = 'all',
}: SiteSearchProps) {
  const router = useRouter()
  const inputId = useId()
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const { documents, isLoading: loadingDocuments } = useSearchDocuments()
  const { recentSearches, addRecentSearch } = useRecentSearches()
  const provider = useMemo(() => createSearchProvider({ type: 'local', documents }), [documents])
  const isPage = variant === 'page'
  const isModal = variant === 'modal'
  const [query, setQuery] = useState(isPage ? initialQuery : '')
  const [activeFilter, setActiveFilter] = useState<SearchDocumentType | 'all'>(isPage ? initialType : 'all')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [open, setOpen] = useState(isPage)
  const [mounted, setMounted] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [dropdownPosition, setDropdownPosition] = useState<DropdownPosition | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useBodyScrollLock(isModal && open)

  useEffect(() => {
    if (!isModal || !open) return
    const id = window.setTimeout(() => inputRef.current?.focus(), 30)
    return () => window.clearTimeout(id)
  }, [isModal, open])

  const trimmedQuery = query.trim()
  const filteredResults = results
  const suggestions = useMemo(
    () => createSearchSuggestions(documents, trimmedQuery, 5).filter((item) => item.toLowerCase() !== trimmedQuery.toLowerCase()),
    [documents, trimmedQuery],
  )
  const groupedResults = groupResults(filteredResults)
  const flatResults = filteredResults

  useEffect(() => {
    if (!isPage) return
    setQuery(initialQuery)
    setActiveFilter(initialType)
  }, [initialQuery, initialType, isPage])

  useEffect(() => {
    let active = true

    async function runSearch() {
      if (trimmedQuery.length < 2) {
        setResults([])
        return
      }

      setIsSearching(true)
      try {
        const nextResults = await provider.search(trimmedQuery, {
          limit: isPage ? 48 : 8,
          filters: activeFilter === 'all' ? undefined : { type: activeFilter },
        })
        if (active) {
          setResults(nextResults)
          setActiveIndex(0)
        }
      } finally {
        if (active) setIsSearching(false)
      }
    }

    runSearch()
    return () => {
      active = false
    }
  }, [activeFilter, isPage, provider, trimmedQuery])

  useEffect(() => {
    if (!isPage) return
    router.replace(buildSearchUrl(trimmedQuery, activeFilter), { scroll: false })
  }, [activeFilter, isPage, router, trimmedQuery])

  useEffect(() => {
    if (!enableShortcut) return

    function onKeyDown(event: KeyboardEvent) {
      const isShortcut = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k'
      if (!isShortcut) return
      if (!shortcutMatchesMedia(shortcutMedia)) return
      event.preventDefault()
      if (isPage) {
        inputRef.current?.focus()
        setOpen(true)
        return
      }
      if (variant !== 'mobile') window.dispatchEvent(new CustomEvent('ha-search-open'))
      setOpen(true)
      window.setTimeout(() => inputRef.current?.focus(), 0)
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [enableShortcut, isPage, shortcutMedia, variant])

  useEffect(() => {
    if (!open || isPage) return
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [isPage, open])

  useEffect(() => {
    if (!open || isPage || isModal) return

    function onPointerDown(event: PointerEvent) {
      const target = event.target as Node
      if (containerRef.current?.contains(target)) return
      if ((target as HTMLElement).closest?.('[data-search-dropdown]')) return
      setOpen(false)
    }

    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [isModal, isPage, open])

  useEffect(() => {
    if (!open || isPage || isModal || !containerRef.current) {
      setDropdownPosition(null)
      return
    }

    function updatePosition() {
      if (!containerRef.current) return
      setDropdownPosition(getDropdownPosition(containerRef.current))
    }

    updatePosition()
    window.addEventListener('resize', updatePosition)
    window.addEventListener('scroll', updatePosition, true)
    return () => {
      window.removeEventListener('resize', updatePosition)
      window.removeEventListener('scroll', updatePosition, true)
    }
  }, [isModal, isPage, open])

  function updateQuery(value: string) {
    setQuery(value)
    if (!isPage) setOpen(true)
  }

  function updateActiveFilter(value: SearchDocumentType | 'all') {
    setActiveFilter(value)
    if (isPage) router.push(buildSearchUrl(trimmedQuery, value), { scroll: false })
  }

  function submitSearch(nextQuery = trimmedQuery) {
    const value = nextQuery.trim()
    if (!value) return
    addRecentSearch(value)
    if (isPage) {
      router.push(buildSearchUrl(value, activeFilter))
      inputRef.current?.focus()
    } else {
      setOpen(false)
      router.push(buildSearchUrl(value))
    }
  }

  function selectResult(result: SearchResult) {
    addRecentSearch(trimmedQuery || result.document.title)
    setOpen(false)
    // Only clear the input for the header/footer dropdown. On the /search
    // page, clearing it here re-triggers the query -> URL sync effect
    // (router.replace to a bare "/search"), which races with this Link's
    // own navigation to the result and can win, cancelling the click.
    if (!isPage) setQuery('')
  }

  function handleKeyDown(event: ReactKeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      event.preventDefault()
      const activeResult = flatResults[activeIndex]
      if (activeResult && !isPage) {
        selectResult(activeResult)
        router.push(activeResult.document.url)
        return
      }
      submitSearch()
    }
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setActiveIndex((index) => Math.min(index + 1, Math.max(flatResults.length - 1, 0)))
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActiveIndex((index) => Math.max(index - 1, 0))
    }
  }

  function EmptyState() {
    const featuredServices = documentPool(documents, 'service', 4)
    const popularTechnologies = documentPool(documents, 'technology', 5)
    const recentInsights = documentPool(documents, 'insight', 4)
    const featuredCaseStudies = documentPool(documents, 'case-study', 3)

    return (
      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-2xl border border-border/60 bg-background/55 p-5">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Popular searches</div>
          <div className="mt-4 flex flex-wrap gap-2">
            {popularSearches.map((item) => (
              <button
                key={item}
                type="button"
                className="rounded-full border border-border bg-background px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
                onClick={() => {
                  setQuery(item)
                  submitSearch(item)
                }}
              >
                {item}
              </button>
            ))}
          </div>

          {recentSearches.length ? (
            <>
              <div className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-primary">Recent searches</div>
              <div className="mt-4 flex flex-wrap gap-2">
                {recentSearches.map((item) => (
                  <button
                    key={item}
                    type="button"
                    className="rounded-full border border-border bg-background px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
                    onClick={() => setQuery(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </>
          ) : null}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <SuggestionGroup title="Featured services" documents={featuredServices} />
          <SuggestionGroup title="Popular technologies" documents={popularTechnologies} />
          <SuggestionGroup title="Recent insights" documents={recentInsights} />
          <SuggestionGroup title="Featured case studies" documents={featuredCaseStudies} />
        </div>
      </div>
    )
  }

  function SuggestionGroup({ title, documents: items }: { title: string; documents: SearchDocument[] }) {
    return (
      <div className="rounded-2xl border border-border/60 bg-background/55 p-5">
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{title}</div>
        <div className="mt-4 space-y-2">
          {items.map((document) => (
            <Link
              key={document.id}
              href={document.url}
              className="flex items-center justify-between gap-3 rounded-xl px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <span className="truncate">{document.title}</span>
              <ArrowRight className="size-3.5 shrink-0" />
            </Link>
          ))}
        </div>
      </div>
    )
  }

  const loading = loadingDocuments || isSearching
  const shouldShowPanel = open && !isPage

  const dropdownPanel = shouldShowPanel && dropdownPosition && mounted ? (
    <div
      data-search-dropdown
      className="fixed z-[130] max-h-[min(24rem,calc(100dvh-6rem))] overflow-hidden rounded-2xl border border-border bg-background/95 shadow-2xl backdrop-blur-xl"
      style={{
        top: dropdownPosition.top,
        left: dropdownPosition.left,
        width: dropdownPosition.width,
      }}
    >
      <div className="max-h-[min(24rem,calc(100dvh-6rem))] overflow-y-auto overscroll-contain">
        <SearchPanel
          query={trimmedQuery}
          results={filteredResults}
          groupedResults={groupedResults}
          activeIndex={activeIndex}
          suggestions={suggestions}
          recentSearches={recentSearches}
          loading={loading}
          setQuery={setQuery}
          submitSearch={submitSearch}
          selectResult={selectResult}
          page={false}
        />
      </div>
    </div>
  ) : null

  if (isModal) {
    const modalOverlay = mounted && open ? (
      <div className="fixed inset-0 z-[130] flex justify-center overflow-y-auto p-4 pt-[12vh] sm:pt-[16vh]">
        <button
          type="button"
          aria-label="Close search"
          className="fixed inset-0 bg-background/70 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />

        <div
          role="dialog"
          aria-modal="true"
          aria-label="Site search"
          className="relative z-10 h-fit w-full max-w-2xl rounded-3xl border border-border/70 bg-background shadow-[0_24px_70px_-28px_rgba(0,0,0,0.9)]"
        >
          <div className="flex items-center gap-2 border-b border-border/60 p-3 sm:p-4">
            <div className="min-w-0 flex-1">
              <SearchInput
                query={query}
                setQuery={updateQuery}
                placeholder={placeholder}
                inputId={inputId}
                isLoading={loading}
                inputRef={inputRef}
                onKeyDown={handleKeyDown}
              />
            </div>
            <button
              type="button"
              aria-label="Close search"
              onClick={() => setOpen(false)}
              className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-border/60 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <X className="size-4" />
            </button>
          </div>

          <div className="max-h-[min(30rem,70dvh)] overflow-y-auto overscroll-contain p-4">
            {trimmedQuery.length < 2 ? (
              <EmptyState />
            ) : (
              <SearchPanel
                query={trimmedQuery}
                results={filteredResults}
                groupedResults={groupedResults}
                activeIndex={activeIndex}
                suggestions={suggestions}
                recentSearches={recentSearches}
                loading={loading}
                setQuery={setQuery}
                submitSearch={submitSearch}
                selectResult={selectResult}
                page
              />
            )}
          </div>
        </div>
      </div>
    ) : null

    return (
      <div ref={containerRef} className={cn('relative', className)}>
        <button
          type="button"
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-label="Open search"
          onClick={() => {
            window.dispatchEvent(new CustomEvent('ha-search-open'))
            setOpen(true)
          }}
          className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-border/60 bg-background/55 text-foreground shadow-sm backdrop-blur transition-colors hover:bg-background/80 hover:text-primary sm:size-10"
        >
          <Search className="size-4 sm:size-[18px]" />
        </button>

        {mounted && modalOverlay ? createPortal(modalOverlay, document.body) : null}
      </div>
    )
  }

  return (
    <div ref={containerRef} className={cn('relative', className)}>
      <SearchInput
        query={query}
        setQuery={updateQuery}
        placeholder={placeholder}
        inputId={inputId}
        isLoading={loading}
        inputRef={inputRef}
        compact={variant === 'header'}
        onFocus={() => {
          if (variant !== 'mobile') window.dispatchEvent(new CustomEvent('ha-search-open'))
          setOpen(true)
        }}
        onKeyDown={handleKeyDown}
      />

      {variant === 'footer' || variant === 'mobile' ? (
        <Link href={routes.search(trimmedQuery || undefined)} className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-primary">
          Open full search <ArrowRight className="size-4" />
        </Link>
      ) : null}

      {isPage ? (
        <div className="mt-6">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {filters.map((filter) => (
              <button
                key={filter.value}
                type="button"
                className={cn(
                  'shrink-0 rounded-full border px-3 py-1.5 text-sm transition-colors',
                  activeFilter === filter.value
                    ? 'border-primary/50 bg-primary/10 text-primary'
                    : 'border-border bg-background/60 text-muted-foreground hover:text-foreground',
                )}
                onClick={() => updateActiveFilter(filter.value)}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {trimmedQuery.length < 2 ? (
            <div className="mt-8">
              <EmptyState />
            </div>
          ) : (
            <SearchPanel
              query={trimmedQuery}
              results={filteredResults}
              groupedResults={groupedResults}
              activeIndex={activeIndex}
              suggestions={suggestions}
              recentSearches={recentSearches}
              loading={loading}
              setQuery={setQuery}
              submitSearch={submitSearch}
              selectResult={selectResult}
              page
            />
          )}
        </div>
      ) : null}

      {mounted && dropdownPanel ? createPortal(dropdownPanel, document.body) : null}
    </div>
  )
}

function SearchPanel({
  query,
  results,
  groupedResults,
  activeIndex,
  suggestions,
  recentSearches,
  loading,
  setQuery,
  submitSearch,
  selectResult,
  page,
}: {
  query: string
  results: SearchResult[]
  groupedResults: Partial<Record<SearchDocumentType, SearchResult[]>>
  activeIndex: number
  suggestions: string[]
  recentSearches: string[]
  loading: boolean
  setQuery: (value: string) => void
  submitSearch: (value?: string) => void
  selectResult: (result: SearchResult) => void
  page: boolean
}) {
  const orderedTypes = Object.keys(groupedResults) as SearchDocumentType[]
  let runningIndex = 0

  if (query.length < 2) {
    return (
      <div className={cn('p-4', page && 'rounded-2xl border border-border/60 bg-background/55')}>
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Start searching</div>
        <div className="mt-3 text-sm text-muted-foreground">Type at least two characters to search the full website.</div>
        {recentSearches.length ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {recentSearches.map((item) => (
              <button
                key={item}
                type="button"
                className="rounded-full border border-border px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground"
                onClick={() => setQuery(item)}
              >
                {item}
              </button>
            ))}
          </div>
        ) : null}
      </div>
    )
  }

  if (loading && !results.length) {
    return (
      <div className={cn('flex items-center gap-3 p-4 text-sm text-muted-foreground', page && 'rounded-2xl border border-border/60 bg-background/55')}>
        <Loader2 className="size-4 animate-spin text-primary" />
        Searching...
      </div>
    )
  }

  if (!results.length) {
    return (
      <div className={cn('p-4', page && 'rounded-2xl border border-border/60 bg-background/55')}>
        <div className="text-sm font-medium text-foreground">No results for "{query}".</div>
        <div className="mt-2 text-sm text-muted-foreground">Try a technology, service, project type, or business problem.</div>
        {suggestions.length ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {suggestions.map((item) => (
              <button
                key={item}
                type="button"
                className="rounded-full border border-border px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground"
                onClick={() => {
                  setQuery(item)
                  submitSearch(item)
                }}
              >
                {item}
              </button>
            ))}
          </div>
        ) : null}
      </div>
    )
  }

  return (
    <div className={cn(page ? 'mt-8 grid gap-6' : 'grid gap-2 p-3')}>
      {!page ? (
        <div className="flex items-center justify-between gap-3 px-1 pb-1 text-xs text-muted-foreground">
          <span>
            {results.length} result{results.length === 1 ? '' : 's'} for "{query}"
          </span>
          <span className="hidden sm:inline">Use arrows and Enter</span>
        </div>
      ) : null}
      {suggestions.length ? (
        <div className={cn('flex flex-wrap gap-2', !page && 'px-2 pb-2 pt-1')}>
          {suggestions.map((item) => (
            <button
              key={item}
              type="button"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
              onClick={() => setQuery(item)}
            >
              <Search className="size-3" />
              {item}
            </button>
          ))}
        </div>
      ) : null}

      {orderedTypes.map((type) => {
        const group = groupedResults[type] ?? []
        return (
          <section key={type} className={cn(page ? 'rounded-2xl border border-border/60 bg-background/55 p-4' : 'rounded-2xl border border-border/60 bg-background/80 p-2')}>
            <div className={cn('px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary', page && 'px-0 pt-0')}>
              {documentTypeLabels[type]}
            </div>
            <div className="grid gap-1">
              {group.map((result) => {
                const currentIndex = runningIndex
                runningIndex += 1
                return (
                  <ResultLink
                    key={result.document.id}
                    result={result}
                    query={query}
                    active={currentIndex === activeIndex}
                    onSelect={() => selectResult(result)}
                  />
                )
              })}
            </div>
          </section>
        )
      })}

      {!page ? (
        <Link
          href={buildSearchUrl(query)}
          className="flex items-center justify-between border-t border-border px-4 py-3 text-sm font-medium text-primary"
          onClick={() => submitSearch(query)}
        >
          Open full search
          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
            Enter <CornerDownLeft className="size-3" />
          </span>
        </Link>
      ) : null}
    </div>
  )
}
