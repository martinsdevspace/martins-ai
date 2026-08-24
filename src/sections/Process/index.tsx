import type { ProcessBlock as ProcessBlockProps } from '@/payload-types'

import { SectionHeading, SectionLabel } from '@/sections/_shared'
import React from 'react'

export default async function Process({ label, heading, intro, phases }: ProcessBlockProps) {
  const safePhases = (phases || []).filter((phase) => phase.title)

  if (!heading && safePhases.length === 0) return null

  return (
    <section id="process" className="px-5 lg:px-[6vw] py-16 lg:py-24">
      {label ? <SectionLabel>{label}</SectionLabel> : null}
      <div className="mt-4 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
        {heading ? <SectionHeading>{heading}</SectionHeading> : null}
        {intro ? (
          <p className="text-muted-foreground max-w-md text-sm leading-relaxed">{intro}</p>
        ) : null}
      </div>

      <div className="mt-10 flex flex-col gap-4">
        {safePhases.map((phase, index) => {
          const tags =
            phase.tags?.map((t) => t.tag).filter((tag): tag is string => Boolean(tag)) || []

          return (
            <div
              key={phase.id || `phase-${index}`}
              className="flex flex-col md:flex-row md:items-center gap-4 border border-border bg-card p-6"
            >
              <div className="font-mono-label text-synthesis">{phase.num}</div>
              <h3 className="font-heading text-2xl md:w-48">{phase.title}</h3>
              <p className="text-sm text-muted-foreground max-w-xl leading-relaxed">
                {phase.description}
              </p>
              <div className="md:ml-auto flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono-label text-[10px] border border-border px-2 py-1 text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
