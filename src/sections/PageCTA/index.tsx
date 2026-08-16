import { IconArrowUpRight, IconMail } from '@tabler/icons-react'
import Link from 'next/link'
import React from 'react'

import { Reveal } from '@/components/Motion/Reveal'
import { getCachedGlobal } from '@/utilities/getGlobals'

type PageCTAProps = {
  address?: string
  title?: string
  subtitle?: string
  primaryLabel?: string
  primaryTo?: string
  secondaryLabel?: string
  secondaryTo?: string
}

export const PageCTA: React.FC<PageCTAProps> = async (props) => {
  const siteSettings = await getCachedGlobal('site-settings', 1)()

  const cta = siteSettings?.cta
  const email = siteSettings?.email || 'hello@martinsmichael.dev'

  const address = props.address || '0x00F // END_OF_FILE'
  const title = props.title || cta?.title || 'Ready to Ship Something That Lasts?'
  const subtitle =
    props.subtitle ||
    cta?.subtitle ||
    "Book a free 30-minute architecture review. I'll audit your stack and identify the highest-impact improvements — no commitment required."
  const primaryLabel = props.primaryLabel || cta?.primaryLabel || 'BOOK_FREE_REVIEW'
  const primaryTo = props.primaryTo || cta?.primaryTo || '/contact'
  const secondaryLabel = props.secondaryLabel || cta?.secondaryLabel || 'VIEW_WORK'
  const secondaryTo = props.secondaryTo || cta?.secondaryTo || '/works'

  return (
    <section className="relative overflow-hidden bg-carbon px-5 py-20 text-background lg:px-[6vw] lg:py-32">
      <div className="relative mb-12 flex items-center justify-between lg:mb-16">
        <span className="font-mono-label text-background/40">{address}</span>
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 animate-pulse bg-synthesis" />
          <span className="font-mono-label text-background/40">ACCEPTING_PROJECTS</span>
        </div>
      </div>

      <Reveal y={30}>
        <h2
          className="font-heading font-light leading-[0.95] text-background text-balance mb-8"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)' }}
        >
          {title}
        </h2>
        <p className="max-w-2xl text-lg leading-relaxed text-background/70 lg:text-xl">{subtitle}</p>
      </Reveal>

      <Reveal delay={0.1} y={20}>
        <div className="relative mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:mt-16">
          <Link
            href={primaryTo}
            className="group flex items-center justify-between bg-synthesis px-6 py-6 text-white transition-opacity hover:opacity-90 lg:py-8"
          >
            <div>
              <div className="font-mono-label mb-1 opacity-70">// PRIMARY</div>
              <div className="font-mono-label text-base lg:text-lg">{primaryLabel}</div>
            </div>
            <IconMail className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href={secondaryTo}
            className="group flex items-center justify-between border border-background/20 px-6 py-6 transition-colors hover:border-synthesis lg:py-8"
          >
            <div>
              <div className="font-mono-label mb-1 text-background/50">// SECONDARY</div>
              <div className="font-mono-label text-base text-background lg:text-lg">
                {secondaryLabel}
              </div>
            </div>
            <IconArrowUpRight className="h-5 w-5 text-background transition-colors group-hover:text-synthesis" />
          </Link>
        </div>
      </Reveal>

      <p className="relative mt-10 font-mono-label text-background/40">
        {email} · Response within 24h
      </p>
    </section>
  )
}
