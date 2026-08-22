import Link from 'next/link'

import { IconArrowUpRight } from '@tabler/icons-react'

import RichText from '@/components/RichText'
import { SectionHeading, SectionLabel } from '@/sections/_shared'
import { getCachedGlobal } from '@/utilities/getGlobals'

const FALLBACK_INTRO =
  'Martins Michael is a full-stack engineer and AI agent architect who designs, builds, and ships systems that move money and information at scale.'

const FALLBACK_TAGLINE = 'Full-Stack Developer & AI Agent Architect'

export default async function About() {
  const siteSettings = await getCachedGlobal('site-settings', 1)()

  const name = siteSettings?.name || 'Martins Michael'
  const tagline = siteSettings?.tagline || FALLBACK_TAGLINE
  const intro = siteSettings?.heroIntro || FALLBACK_INTRO

  return (
    <section id="about" className="px-5 lg:px-[6vw] py-16 lg:py-24">
      <SectionLabel className="mb-4">// — ABOUT</SectionLabel>
      <SectionHeading className="mb-2">
        {name}
        <span className="text-synthesis">.</span>
      </SectionHeading>
      <p className="font-mono-label text-muted-foreground mb-8">{tagline}</p>

      <div className="max-w-3xl">
        {typeof intro === 'object' ? (
          <RichText
            data={intro}
            enableProse={false}
            enableGutter={false}
            className="text-base leading-relaxed text-foreground/80"
          />
        ) : (
          <p className="text-base leading-relaxed text-foreground/80">{intro}</p>
        )}
      </div>

      <Link
        href="/about"
        className="group mt-8 inline-flex items-center gap-2 border border-border px-4 py-2 font-mono-label text-muted-foreground transition-colors hover:border-synthesis hover:text-synthesis"
      >
        READ_THE_FULL_STORY
        <IconArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </Link>
    </section>
  )
}
