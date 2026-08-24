import { IconArrowUpRight, IconMail } from '@tabler/icons-react'
import Link from 'next/link'
import React from 'react'

import { Reveal } from '@/components/Motion/Reveal'
import { getCachedGlobal } from '@/utilities/getGlobals'

type PageCTAProps = {
  address?: string
  statusBadge?: string
  title?: string
  subtitle?: string
  primaryLabel?: string
  primaryTo?: string
  secondaryLabel?: string
  secondaryTo?: string
  responseNote?: string
}

export const PageCTA: React.FC<PageCTAProps> = async (props) => {
  const siteSettings = await getCachedGlobal('site-settings', 1)()

  // Block props take precedence, then the site-settings CTA group.
  // No hardcoded fallbacks — everything renders only what the DB provides.
  const cta = siteSettings?.cta
  const email = siteSettings?.email

  const address = props.address || ''
  const statusBadge = props.statusBadge || ''
  const title = props.title || cta?.title || ''
  const subtitle = props.subtitle || cta?.subtitle || ''
  const primaryLabel = props.primaryLabel || cta?.primaryLabel || ''
  const primaryTo = props.primaryTo || cta?.primaryTo || '/contact'
  const secondaryLabel = props.secondaryLabel || cta?.secondaryLabel || ''
  const secondaryTo = props.secondaryTo || cta?.secondaryTo || '/portfolio'
  const responseNote = props.responseNote || ''

  if (!title && !subtitle) return null

  return (
    <section className="relative overflow-hidden bg-carbon px-5 py-20 text-background lg:px-[6vw] lg:py-32">
      {(address || statusBadge) && (
        <div className="relative mb-12 flex items-center justify-between lg:mb-16">
          {address ? <span className="font-mono-label text-background/40">{address}</span> : <span />}
          {statusBadge ? (
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 animate-pulse bg-synthesis" />
              <span className="font-mono-label text-background/40">{statusBadge}</span>
            </div>
          ) : null}
        </div>
      )}

      {title ? (
        <Reveal y={30}>
          <h2
            className="font-heading font-light leading-[0.95] text-background text-balance mb-8"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)' }}
          >
            {title}
          </h2>
        </Reveal>
      ) : null}
      {subtitle ? (
        <p className="max-w-2xl text-lg leading-relaxed text-background/70 lg:text-xl">{subtitle}</p>
      ) : null}

      {(primaryLabel || secondaryLabel) && (
        <Reveal delay={0.1} y={20}>
          <div className="relative mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:mt-16">
            {primaryLabel ? (
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
            ) : null}
            {secondaryLabel ? (
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
            ) : null}
          </div>
        </Reveal>
      )}

      {email || responseNote ? (
        <p className="relative mt-10 font-mono-label text-background/40">
          {[email, responseNote].filter(Boolean).join(' · ')}
        </p>
      ) : null}
    </section>
  )
}
