import type { Metadata } from 'next'
import React from 'react'

import RichText from '@/components/RichText'
import { SectionLabel } from '@/sections/_shared'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'

export default async function NowPage() {
  const now = await getCachedGlobal('now', 1)()

  const blocks = now.blocks?.filter((b) => b.label || b.title) || []

  return (
    <article className="px-5 lg:px-[6vw] pt-24">
      <div className="max-w-3xl">
        <div className="flex items-center gap-3">
          <SectionLabel className="mb-0">// — NOW</SectionLabel>
          {now.updated ? (
            <span className="font-mono-label text-muted-foreground border border-border px-2 py-1">
              {now.updated}
            </span>
          ) : null}
        </div>
        <h1 className="mt-4 font-heading text-4xl md:text-6xl font-light tracking-tight text-balance">
          What I&apos;m working on right now.
        </h1>
        <div className="mt-6">
          {now.intro ? (
            <RichText
              data={now.intro}
              enableProse={false}
              enableGutter={false}
              className="text-base leading-relaxed text-foreground/80"
            />
          ) : (
            <p className="text-base leading-relaxed text-foreground/80">
              A living snapshot of what I&apos;m building, learning, and thinking about.
            </p>
          )}
        </div>
      </div>

      <div className="mt-16 flex flex-col gap-10">
        {blocks.map((block) => {
          const items = block.items?.filter((i) => i.name) || []
          return (
            <section key={block.id || block.label}>
              <p className="font-mono-label text-synthesis mb-2">// {block.label}</p>
              <h2 className="font-heading text-3xl mb-4">{block.title}</h2>
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
    title: `Now — ${name} | Martin's AI`,
    description: 'A living snapshot of what I’m building, learning, and thinking about.',
    openGraph: mergeOpenGraph({
      title: `Now — ${name} | Martin's AI`,
      description: 'A living snapshot of what I’m building, learning, and thinking about.',
    }),
  }
}
