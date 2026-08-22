import type { TimelineBlock as TimelineBlockProps } from '@/payload-types'

import React from 'react'

import { SectionHeading, SectionLabel } from '@/sections/_shared'

export const TimelineBlock: React.FC<TimelineBlockProps> = ({ heading, items }) => {
  const safeItems = items?.filter((t) => t.title) || []
  if (safeItems.length === 0) return null

  return (
    <section className="mt-20">
      {heading ? <SectionLabel>// — {heading}</SectionLabel> : null}
      <SectionHeading className="mt-4">{heading}</SectionHeading>

      <ol className="mt-10 space-y-px border-t border-border">
        {safeItems.map((item, index) => (
          <li
            key={item.id || `timeline-${index}`}
            className="grid gap-4 border-b border-border py-6 sm:grid-cols-12 sm:gap-8"
          >
            <div className="font-mono-label text-synthesis sm:col-span-2">{item.year}</div>
            <div className="sm:col-span-10">
              <h3 className="font-heading text-xl">{item.title}</h3>
              {item.description ? (
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
              ) : null}
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
