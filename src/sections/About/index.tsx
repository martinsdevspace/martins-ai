import Link from 'next/link'

import { IconArrowUpRight } from '@tabler/icons-react'

import RichText from '@/components/RichText'
import type { AboutBlock as AboutBlockProps } from '@/payload-types'
import { SectionHeading, SectionLabel } from '@/sections/_shared'
import { getCachedGlobal } from '@/utilities/getGlobals'

export default async function About({ label, linkLabel }: AboutBlockProps) {
  const siteSettings = await getCachedGlobal('site-settings', 1)()

  const name = siteSettings?.name
  const tagline = siteSettings?.tagline
  const intro = siteSettings?.heroIntro

  if (!name && !intro) return null

  return (
    <section id="about" className="px-5 lg:px-[6vw] py-16 lg:py-24">
      {label ? <SectionLabel className="mb-4">{label}</SectionLabel> : null}
      {name ? (
        <SectionHeading className="mb-2">
          {name}
          <span className="text-synthesis">.</span>
        </SectionHeading>
      ) : null}
      {tagline ? <p className="font-mono-label text-muted-foreground mb-8">{tagline}</p> : null}

      {intro && typeof intro === 'object' ? (
        <div className="max-w-3xl">
          <RichText
            data={intro}
            enableProse={false}
            enableGutter={false}
            className="text-base leading-relaxed text-foreground/80"
          />
        </div>
      ) : null}

      {linkLabel ? (
        <Link
          href="/about"
          className="group mt-8 inline-flex items-center gap-2 border border-border px-4 py-2 font-mono-label text-muted-foreground transition-colors hover:border-synthesis hover:text-synthesis"
        >
          {linkLabel}
          <IconArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      ) : null}
    </section>
  )
}
