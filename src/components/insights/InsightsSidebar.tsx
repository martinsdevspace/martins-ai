import Link from 'next/link'
import React from 'react'

import { IconArrowUpRight } from '@tabler/icons-react'

import { Toc } from '@/components/Toc'
import type { TocEntry } from '@/utilities/extractHeadings'
import type { SidebarCategory, SidebarTag } from '@/utilities/getInsightsSidebarData'
import { cn } from '@/utilities/ui'

interface InsightsSidebarProps {
  tocEntries?: TocEntry[]
  categories: SidebarCategory[]
  tags: SidebarTag[]
  className?: string
}

/**
 * Right-hand sidebar for the Insights list and detail pages.
 * On large screens it's a sticky column; on mobile it collapses into a
 * single stacked block that renders below the main content.
 */
export function InsightsSidebar({ tocEntries, categories, tags, className }: InsightsSidebarProps) {
  const maxTagCount = tags.reduce((max, t) => Math.max(max, t.count), 1)

  return (
    <aside className={cn('flex flex-col gap-10', className)} aria-label="Insights sidebar">
      {/* {tocEntries && tocEntries.length > 1 && <Toc entries={tocEntries} />} */}

      {categories.length > 0 && (
        <div>
          <div className="font-mono-label text-muted-foreground mb-4 text-xs uppercase">
            // CATEGORIES
          </div>
          <ul className="flex flex-col gap-2.5">
            {categories.map((category) => (
              <li key={category.id}>
                <Link
                  href={category.slug ? `/insights?category=${category.slug}` : '/insights'}
                  className="flex items-center justify-between gap-2 font-mono text-sm text-foreground/70 transition-colors hover:text-synthesis"
                >
                  <span>{category.title}</span>
                  <span className="text-foreground/40">{category.count}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {tags.length > 0 && (
        <div>
          <div className="font-mono-label text-muted-foreground mb-4 text-xs uppercase">// TAGS</div>
          <div className="flex flex-wrap gap-2">
            {tags.map(({ tag, count }) => {
              const weight = count / maxTagCount
              const isEmphasized = weight > 0.6
              return (
                <Link
                  key={tag}
                  href={`/insights?tag=${encodeURIComponent(tag)}`}
                  className={cn(
                    'border border-border px-2.5 py-1 font-mono-label text-muted-foreground transition-colors hover:border-synthesis hover:text-synthesis',
                    isEmphasized && 'border-synthesis/40 bg-synthesis/10 text-synthesis',
                  )}
                >
                  {tag}
                </Link>
              )
            })}
          </div>
        </div>
      )}

      <div className="border border-border bg-card p-6">
        <p className="font-mono-label text-synthesis mb-2 text-xs">// LET'S BUILD</p>
        <h3 className="font-heading text-xl font-light">Have a system you need shipped?</h3>
        <p className="mt-2 text-sm text-foreground/70">
          I take on a small number of production builds and AI agent projects each quarter.
        </p>
        <Link
          href="/contact"
          className="mt-4 inline-flex items-center gap-1.5 font-mono-label text-foreground transition-colors hover:text-synthesis"
        >
          Start a conversation
          <IconArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </aside>
  )
}
