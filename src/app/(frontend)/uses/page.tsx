import type { Metadata } from 'next'
import React from 'react'

import RichText from '@/components/RichText'
import { SectionLabel } from '@/sections/_shared'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'

export default async function UsesPage() {
  const uses = await getCachedGlobal('uses', 1)()

  const sections = uses.sections?.filter((s) => s.title || (s.items && s.items.length > 0)) || []

  return (
    <article className="px-5 lg:px-[6vw] pt-24">
      <div className="max-w-3xl">
        <SectionLabel className="mb-4">// — USES</SectionLabel>
        <h1 className="font-heading text-4xl md:text-6xl font-light tracking-tight text-balance">
          The tools I actually use.
        </h1>
        <div className="mt-6">
          {uses.intro ? (
            <RichText
              data={uses.intro}
              enableProse={false}
              enableGutter={false}
              className="text-base leading-relaxed text-foreground/80"
            />
          ) : (
            <p className="text-base leading-relaxed text-foreground/80">
              An honest list of the hardware, software, and workflow pieces I rely on day to day.
              Updated whenever something meaningful changes.
            </p>
          )}
        </div>
      </div>

      <div className="mt-16 flex flex-col gap-10">
        {sections.map((section) => {
          const items = section.items?.filter((i) => i.name) || []
          return (
            <section key={section.id || section.title}>
              <div className="mb-4 flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
                <h2 className="font-heading text-2xl">{section.title}</h2>
                {section.subtitle ? (
                  <span className="font-mono-label text-muted-foreground">{section.subtitle}</span>
                ) : null}
              </div>
              <div className="grid gap-px border border-border bg-border md:grid-cols-2">
                {items.map((item, index) => (
                  <div key={item.id || `item-${index}`} className="bg-background p-5 flex flex-col gap-1">
                    <p className="font-heading text-lg">{item.name}</p>
                    {item.detail ? (
                      <p className="text-sm text-muted-foreground">{item.detail}</p>
                    ) : null}
                  </div>
                ))}
              </div>
            </section>
          )
        })}
      </div>
    </article>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await getCachedGlobal('site-settings', 1)()

  const name = siteSettings.name || 'Martins Michael'

  return {
    title: `Uses — ${name} | Martin's AI`,
    description: 'The tools and software I use to design, build, and ship.',
    openGraph: mergeOpenGraph({
      title: `Uses — ${name} | Martin's AI`,
      description: 'The tools and software I use to design, build, and ship.',
    }),
  }
}
