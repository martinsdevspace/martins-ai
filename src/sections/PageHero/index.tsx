import { IconChevronRight, IconMapPin } from '@tabler/icons-react'
import Link from 'next/link'
import React from 'react'

import { Reveal } from '@/components/Motion/Reveal'
import { SectionLabel } from '@/sections/_shared'
import { getCachedGlobal } from '@/utilities/getGlobals'

type PageHeroProps = {
  /** Mono label shown above the headline, e.g. "// 01 — SELECTED_WORKS". */
  label: string
  /** Headline. Pass a React node so accent phrases can be styled. */
  title: React.ReactNode
  /** Short, authoritative intro paragraph. */
  intro: string
  /** Optional count badge, e.g. "06 INDEXED". */
  meta?: string
  /** Optional plain-English page name for the breadcrumb trail, e.g. "Works". Omit to hide the breadcrumb. */
  breadcrumbLabel?: string
  /** Optional content rendered after the intro (e.g. a stats bar). */
  children?: React.ReactNode
}

export const PageHero: React.FC<PageHeroProps> = async ({
  label,
  title,
  intro,
  meta,
  breadcrumbLabel,
  children,
}) => {
  const siteSettings = await getCachedGlobal('site-settings', 1)()

  const availability = siteSettings?.availability || 'Available for projects'
  const location = siteSettings?.location || 'Abuja, NG · Remote Worldwide'

  return (
    <section className="relative px-5 lg:px-[6vw] pt-24 lg:pt-32 pb-14 lg:pb-20">
      {breadcrumbLabel ? (
        <nav aria-label="Breadcrumb" className="mb-5">
          <ol className="flex items-center gap-1.5 font-mono-label text-muted-foreground">
            <li>
              <Link href="/" className="transition-colors hover:text-synthesis">
                Home
              </Link>
            </li>
            <li aria-hidden="true">
              <IconChevronRight className="h-3 w-3" />
            </li>
            <li aria-current="page" className="text-foreground/70">
              {breadcrumbLabel}
            </li>
          </ol>
        </nav>
      ) : null}

      <Reveal y={-12}>
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <SectionLabel className="text-synthesis">{label}</SectionLabel>
          {meta ? (
            <span className="flex items-center gap-1.5 font-mono-label text-synthesis">
              <span className="h-1 w-1 rounded-full bg-synthesis animate-pulse" />
              {meta}
            </span>
          ) : null}
        </div>

        <div className="font-mono-label text-muted-foreground flex flex-wrap items-center gap-x-4 gap-y-2 mb-8">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-success animate-pulse" />
            {availability}
          </span>
          <span className="flex items-center gap-1.5">
            <IconMapPin className="w-3.5 h-3.5 text-synthesis" />
            {location}
          </span>
        </div>
      </Reveal>

      <Reveal delay={0.05}>
        <h1
          className="font-heading font-light tracking-tight text-balance leading-[0.95]"
          style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)' }}
        >
          {title}
        </h1>
      </Reveal>

      <Reveal delay={0.1}>
        <p className="mt-6 max-w-2xl text-base md:text-lg leading-relaxed text-muted-foreground">
          {intro}
        </p>
      </Reveal>

      {children}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-5 bottom-0 h-px bg-gradient-to-r from-transparent via-border to-transparent lg:inset-x-[6vw]"
      />
    </section>
  )
}
