import type { AboutHeroBlock as AboutHeroBlockProps } from '@/payload-types'

import Image from 'next/image'
import React from 'react'

import RichText from '@/components/RichText'
import { getMediaUrl } from '@/utilities/getMediaUrl'

export const AboutHeroBlock: React.FC<AboutHeroBlockProps> = ({ portrait, headline, intro, stats }) => {
  const media = portrait && typeof portrait === 'object' ? portrait : null
  const portraitUrl = getMediaUrl(media?.url, media?.updatedAt)

  const safeStats = stats?.filter((s) => s.value || s.label) || []

  return (
    <section className="grid gap-12 lg:grid-cols-12">
      <div className="lg:col-span-5 lg:sticky lg:top-24 lg:self-start">
        {portraitUrl ? (
          <div className="relative aspect-[4/5] overflow-hidden border border-border bg-card">
            <Image
              src={portraitUrl}
              alt={media?.alt || 'Portrait of Martins Michael'}
              fill
              sizes="(max-width: 64rem) 100vw, 40vw"
              className="object-cover"
            />
          </div>
        ) : (
          <div className="flex aspect-[4/5] items-center justify-center border border-border bg-card">
            <span className="font-mono-label text-muted-foreground">[PORTRAIT]</span>
          </div>
        )}
      </div>

      <div className="space-y-10 lg:col-span-7">
        {headline ? (
          <h1 className="font-heading text-4xl font-light tracking-tight text-balance md:text-5xl lg:text-6xl">
            {headline}
          </h1>
        ) : null}

        {intro ? (
          <RichText
            data={intro}
            enableProse={false}
            enableGutter={false}
            className="text-base leading-relaxed text-foreground/80"
          />
        ) : null}

        {safeStats.length > 0 ? (
          <div className="grid grid-cols-2 gap-px border border-border bg-border lg:grid-cols-4">
            {safeStats.map((metric, index) => (
              <div key={metric.id || `metric-${index}`} className="bg-background p-5">
                <p className="font-heading text-2xl">{metric.value}</p>
                <p className="mt-1 font-mono-label text-muted-foreground">{metric.label}</p>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  )
}
