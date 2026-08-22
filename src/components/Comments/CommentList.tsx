import Link from 'next/link'
import React from 'react'

import type { Comment } from '@/payload-types'

import { Pagination } from '@/components/Pagination'
import { cn } from '@/utilities/ui'

export type CommentListProps = {
  docs: Comment[]
  totalPages: number
  currentPage: number
  insightSlug?: string
}

const formatDate = (value: string): string =>
  new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

export const CommentList: React.FC<CommentListProps> = ({
  docs,
  totalPages,
  currentPage,
  insightSlug,
}) => {
  if (docs.length === 0) {
    return (
      <p className="font-mono-label text-muted-foreground">
        // No comments yet. Be the first to share your thoughts.
      </p>
    )
  }

  const queryForPage = (page: number) => {
    if (!insightSlug) return `/insights?cpage=${page}`
    const base = `/insights/${insightSlug}`
    return page > 1 ? `${base}?cpage=${page}` : base
  }

  return (
    <div>
      <ul className="divide-y divide-border border-y border-border">
        {docs.map((comment) => (
          <li key={comment.id} className="py-6">
            <div className="flex items-baseline justify-between gap-4">
              <p className="font-heading text-lg">{comment.author}</p>
              {comment.createdAt ? (
                <span className="font-mono-label text-muted-foreground">{formatDate(comment.createdAt)}</span>
              ) : null}
            </div>
            <p className="mt-2 text-sm leading-relaxed text-foreground/80">{comment.content}</p>
          </li>
        ))}
      </ul>

      {totalPages > 1 ? (
        <PaginationWithBase queryForPage={queryForPage} page={currentPage} totalPages={totalPages} />
      ) : null}
    </div>
  )
}

const PaginationWithBase: React.FC<{
  queryForPage: (page: number) => string
  page: number
  totalPages: number
}> = ({ queryForPage, page, totalPages }) => {
  const buildPageItems = (p: number, total: number): (number | 'ellipsis')[] => {
    const items: (number | 'ellipsis')[] = []
    for (let i = 1; i <= total; i++) {
      if (i === 1 || i === total || Math.abs(i - p) <= 1) {
        items.push(i)
      } else if (items[items.length - 1] !== 'ellipsis') {
        items.push('ellipsis')
      }
    }
    return items
  }

  const buttonBase =
    'flex items-center justify-center min-w-10 h-10 px-3 border font-mono-label transition-colors disabled:opacity-30 disabled:pointer-events-none'

  return (
    <nav
      aria-label="Comments pagination"
      className={cn('mt-10 flex flex-wrap items-center justify-center gap-2')}
    >
      <Link
        href={queryForPage(Math.max(1, page - 1))}
        className={cn(
          buttonBase,
          'border-border text-muted-foreground hover:border-synthesis hover:text-synthesis',
          page <= 1 ? 'pointer-events-none opacity-30' : '',
        )}
        aria-disabled={page <= 1}
      >
        ← Prev
      </Link>

      {buildPageItems(page, totalPages).map((item, index) => {
        if (item === 'ellipsis') {
          return (
            <span
              key={`ellipsis-${index}`}
              className="flex h-10 items-center px-2 font-mono-label text-muted-foreground"
            >
              …
            </span>
          )
        }

        const isActive = item === page
        return (
          <Link
            key={item}
            href={queryForPage(item)}
            className={cn(
              buttonBase,
              isActive
                ? 'border-synthesis bg-synthesis text-background'
                : 'border-border text-muted-foreground hover:border-synthesis hover:text-synthesis',
            )}
            aria-current={isActive ? 'page' : undefined}
          >
            {item}
          </Link>
        )
      })}

      <Link
        href={queryForPage(Math.min(totalPages, page + 1))}
        className={cn(
          buttonBase,
          'border-border text-muted-foreground hover:border-synthesis hover:text-synthesis',
          page >= totalPages ? 'pointer-events-none opacity-30' : '',
        )}
        aria-disabled={page >= totalPages}
      >
        Next →
      </Link>
    </nav>
  )
}
