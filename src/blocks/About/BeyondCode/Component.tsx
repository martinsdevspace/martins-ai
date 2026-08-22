import type { BeyondCodeBlock as BeyondCodeBlockProps } from '@/payload-types'

import React from 'react'

import { SectionHeading, SectionLabel } from '@/sections/_shared'

export const BeyondCodeBlock: React.FC<BeyondCodeBlockProps> = ({ heading, paragraphs }) => {
  const safeParagraphs =
    paragraphs?.map((p) => p.paragraph).filter((text): text is string => Boolean(text)) || []
  if (safeParagraphs.length === 0) return null

  return (
    <section className="mt-20">
      {heading ? <SectionLabel>// — {heading}</SectionLabel> : null}
      <SectionHeading className="mt-4">{heading}</SectionHeading>

      <div className="mt-6 max-w-3xl space-y-4">
        {safeParagraphs.map((paragraph, index) => (
          <p key={`beyond-${index}`} className="text-base leading-relaxed text-foreground/80">
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  )
}
