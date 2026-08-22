import type { SkillsBlock as SkillsBlockProps } from '@/payload-types'

import React from 'react'

import { SectionHeading, SectionLabel } from '@/sections/_shared'

export const SkillsBlock: React.FC<SkillsBlockProps> = ({ heading, categories }) => {
  const safeCategories = categories?.filter((c) => c.name) || []
  if (safeCategories.length === 0) return null

  return (
    <section className="mt-20">
      {heading ? <SectionLabel>// — {heading}</SectionLabel> : null}
      <SectionHeading className="mt-4">{heading}</SectionHeading>

      <div className="mt-10 grid gap-px border border-border bg-border md:grid-cols-2">
        {safeCategories.map((category, index) => (
          <div key={category.id || `skill-${index}`} className="bg-background p-6">
            <h3 className="font-heading text-xl">{category.name}</h3>
            {category.context ? (
              <p className="mt-1 text-sm text-muted-foreground">{category.context}</p>
            ) : null}
            {category.tools ? (
              <p className="mt-3 font-mono-label leading-relaxed text-foreground/80">{category.tools}</p>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  )
}
