import Link from 'next/link'
import React from 'react'

import { IconArrowUpRight } from '@tabler/icons-react'

import { cn } from '@/utilities/ui'

export interface DetailSidebarFact {
  label: string
  value: string
}

interface DetailSidebarProps {
  eyebrow?: string
  heading: string
  body: string
  ctaLabel?: string
  ctaHref?: string
  facts?: DetailSidebarFact[]
  className?: string
}

/**
 * Shared right-hand sidebar for detail pages (case studies, services,
 * industries, projects) whose main content is a narrow single column,
 * leaving the right side of the viewport empty on large screens.
 * Sticky on desktop, stacks below the main content on mobile.
 */
export function DetailSidebar({
  eyebrow = "// LET'S BUILD",
  heading,
  body,
  ctaLabel = 'Start a conversation',
  ctaHref = '/contact',
  facts,
  className,
}: DetailSidebarProps) {
  return (
    <aside className={cn('flex flex-col gap-6', className)} aria-label="Page sidebar">
      {facts && facts.length > 0 && (
        <div className="border border-border bg-card p-6">
          <p className="font-mono-label text-muted-foreground mb-4 text-xs uppercase">// AT A GLANCE</p>
          <dl className="flex flex-col gap-3">
            {facts.map((fact) => (
              <div key={fact.label} className="flex flex-col gap-0.5">
                <dt className="font-mono-label text-[10px] text-muted-foreground uppercase">
                  {fact.label}
                </dt>
                <dd className="text-sm text-foreground/80">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}

      <div className="border border-border bg-card p-6">
        <p className="font-mono-label text-synthesis mb-2 text-xs">{eyebrow}</p>
        <h3 className="font-heading text-xl font-light">{heading}</h3>
        <p className="mt-2 text-sm text-foreground/70">{body}</p>
        <Link
          href={ctaHref}
          className="mt-4 inline-flex items-center gap-1.5 font-mono-label text-foreground transition-colors hover:text-synthesis"
        >
          {ctaLabel}
          <IconArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </aside>
  )
}
