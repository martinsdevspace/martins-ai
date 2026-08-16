'use client'

import { useEffect, useState } from 'react'

import { cn } from '@/utilities/ui'
import type { TocEntry } from '@/utilities/extractHeadings'

interface TocItemProps {
  entry: TocEntry
  isActive: boolean
}

function TocItem({ entry, isActive }: TocItemProps) {
  return (
    <li>
      <a
        href={`#${entry.id}`}
        className={cn(
          'font-mono text-sm transition-colors',
          entry.level === 2
            ? 'text-foreground/60 hover:text-foreground'
            : 'text-foreground/40 hover:text-foreground/60 text-xs ps-4',
          isActive && 'text-foreground font-medium',
        )}
      >
        {entry.text}
      </a>
    </li>
  )
}

interface TocProps {
  entries: TocEntry[]
  className?: string
}

export function Toc({ entries, className }: TocProps) {
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      const ids = entries.map((entry) => entry.id)
      const visible = ids.filter((id) => {
        const el = document.getElementById(id)
        if (!el) return false
        const rect = el.getBoundingClientRect()
        return rect.top >= 0 && rect.top < window.innerHeight / 2
      })
      if (visible.length > 0) {
        setActiveId(visible[visible.length - 1])
      }
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [entries])

  useEffect(() => {
    const handleHashChange = () => {
      const id = window.location.hash.slice(1)
      if (id) setActiveId(id)
    }
    window.addEventListener('hashchange', handleHashChange)
    handleHashChange()
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  if (!entries || entries.length < 2) return null

  return (
    <nav className={cn('sticky top-24 h-fit', className)} aria-label="Table of Contents">
      <div className="font-mono-label text-muted-foreground mb-4 text-xs uppercase">// CONTENT</div>
      <ul className="space-y-2.5">
        {entries.map((entry) => (
          <TocItem
            key={entry.id}
            entry={entry}
            isActive={activeId === entry.id}
          />
        ))}
      </ul>
    </nav>
  )
}