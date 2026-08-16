'use client'
import { useRouter } from 'next/navigation'
import React from 'react'

import { cn } from '@/utilities/ui'

const buildPageItems = (page: number, totalPages: number): (number | 'ellipsis')[] => {
  const items: (number | 'ellipsis')[] = []

  for (let p = 1; p <= totalPages; p++) {
    if (p === 1 || p === totalPages || Math.abs(p - page) <= 1) {
      items.push(p)
    } else if (items[items.length - 1] !== 'ellipsis') {
      items.push('ellipsis')
    }
  }

  return items
}

export const Pagination: React.FC<{
  className?: string
  page: number
  totalPages: number
}> = ({ className, page, totalPages }) => {
  const router = useRouter()

  const go = (p: number) => router.push(`/insights/page/${p}`)

  const hasPrevPage = page > 1
  const hasNextPage = page < totalPages

  const buttonBase =
    'flex items-center justify-center min-w-10 h-10 px-3 border font-mono-label transition-colors disabled:opacity-30 disabled:pointer-events-none'

  return (
    <nav aria-label="Pagination" className={cn('mt-14 flex flex-wrap items-center justify-center gap-2', className)}>
      <button
        type="button"
        disabled={!hasPrevPage}
        onClick={() => go(page - 1)}
        className={cn(buttonBase, 'border-border text-muted-foreground hover:border-synthesis hover:text-synthesis')}
        aria-label="Previous page"
      >
        ← Prev
      </button>

      {buildPageItems(page, totalPages).map((item, index) => {
        if (item === 'ellipsis') {
          return (
            <span key={`ellipsis-${index}`} className="flex h-10 items-center px-2 font-mono-label text-muted-foreground">
              …
            </span>
          )
        }

        const isActive = item === page

        return (
          <button
            key={item}
            type="button"
            onClick={() => go(item)}
            aria-current={isActive ? 'page' : undefined}
            className={cn(
              buttonBase,
              isActive
                ? 'border-foreground bg-foreground text-background'
                : 'border-border text-muted-foreground hover:border-synthesis hover:text-synthesis',
            )}
          >
            {item}
          </button>
        )
      })}

      <button
        type="button"
        disabled={!hasNextPage}
        onClick={() => go(page + 1)}
        className={cn(buttonBase, 'border-border text-muted-foreground hover:border-synthesis hover:text-synthesis')}
        aria-label="Next page"
      >
        Next →
      </button>
    </nav>
  )
}
