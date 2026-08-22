import type { PhilosophyBlock as PhilosophyBlockProps } from '@/payload-types'

import type { ElementType } from 'react'
import React from 'react'

import {
  IconBrain,
  IconCode,
  IconDatabase,
  IconFocus2,
  IconRobot,
  IconShield,
  IconTerminal2,
} from '@tabler/icons-react'

import RichText from '@/components/RichText'
import { SectionHeading, SectionLabel } from '@/sections/_shared'

const focusIconMap: Record<string, ElementType> = {
  shield: IconShield,
  code: IconCode,
  robot: IconRobot,
  brain: IconBrain,
  database: IconDatabase,
  terminal: IconTerminal2,
  focus: IconFocus2,
}

export const PhilosophyBlock: React.FC<PhilosophyBlockProps> = ({ heading, intro, values }) => {
  const safeValues = values?.filter((v) => v.title) || []

  return (
    <section className="mt-20">
      {heading ? <SectionLabel>// — {heading}</SectionLabel> : null}
      <SectionHeading className="mt-4">{heading}</SectionHeading>

      {intro ? (
        <div className="mt-6 max-w-3xl">
          <RichText data={intro} enableProse={false} enableGutter={false} className="text-base leading-relaxed text-foreground/80" />
        </div>
      ) : null}

      {safeValues.length > 0 ? (
        <div className="mt-10 grid gap-px border border-border bg-border md:grid-cols-3">
          {safeValues.map((value, index) => {
            const Icon = value.icon ? focusIconMap[value.icon] : undefined
            return (
              <div key={value.id || `value-${index}`} className="bg-background p-6">
                <div className="flex h-10 w-10 items-center justify-center border border-border bg-card">
                  {Icon ? <Icon className="h-5 w-5 text-synthesis" /> : <span className="font-mono-label text-muted-foreground">*</span>}
                </div>
                <h3 className="mt-4 font-heading text-xl">{value.title}</h3>
                {value.description ? (
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{value.description}</p>
                ) : null}
              </div>
            )
          })}
        </div>
      ) : null}
    </section>
  )
}
