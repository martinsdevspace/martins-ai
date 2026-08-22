import type { OriginStoryBlock as OriginStoryBlockProps } from '@/payload-types'

import React from 'react'

import RichText from '@/components/RichText'
import { SectionHeading, SectionLabel } from '@/sections/_shared'

export const OriginStoryBlock: React.FC<OriginStoryBlockProps> = ({ heading, content }) => {
  if (!content) return null

  return (
    <section className="mt-20">
      {heading ? <SectionLabel>// — {heading}</SectionLabel> : null}
      <SectionHeading className="mt-4">{heading}</SectionHeading>
      <div className="mt-6 max-w-3xl">
        <RichText data={content} enableProse={false} enableGutter={false} className="text-base leading-relaxed text-foreground/80" />
      </div>
    </section>
  )
}
