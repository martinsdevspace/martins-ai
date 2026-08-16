import {
  IconArrowDown,
  IconArrowRight,
  IconMail,
  IconMapPin,
  IconTerminal2,
} from '@tabler/icons-react'
import Link from 'next/link'

import RichText from '@/components/RichText'
import { SectionLabel } from '@/sections/_shared'
import { getCachedGlobal } from '@/utilities/getGlobals'

const FALLBACK_HEADLINE = 'I build AI agents\nthat handle real money, real users, and real scale.'

const FALLBACK_ROLES = ['Full-Stack Developer', 'AI Architect']

const FALLBACK_METRICS = [
  { value: '12+', label: 'Years of engineering' },
  { value: '40+', label: 'Systems shipped' },
  { value: '3m+', label: 'Users served' },
  { value: '100%', label: 'Money moved securely' },
]

const TERMINAL_LINES: [string, string][] = [
  ['$', 'whoami'],
  ['>', 'martins - full-stack dev & ai agent architect'],
  ['$', 'ls ./production'],
  ['>', 'payments/  auth/  agents/  scale/'],
  ['$', 'tail -f uptime.log'],
  ['>', '99.9% uptime - 42ms p95 - 0 incidents'],
]

export default async function Hero() {
  const siteSettings = await getCachedGlobal('site-settings', 2)()

  const headlineParts = (siteSettings?.heroHeadline || FALLBACK_HEADLINE).split('\n')
  const headlineLead = headlineParts[0]
  const headlineAccent = headlineParts.slice(1).join(' ')

  const availability = siteSettings?.availability || 'Available for projects'
  const location = siteSettings?.location || 'Abuja, NG - Remote Worldwide'

  const roles =
    siteSettings?.roles
      ?.map((role) => role.role)
      .filter((role): role is string => Boolean(role)) || FALLBACK_ROLES

  const cmsMetrics = siteSettings?.metrics?.filter((m) => m.value && m.label) || []
  const metrics = cmsMetrics.length > 0 ? cmsMetrics : FALLBACK_METRICS

  const primaryLabel = siteSettings?.cta?.primaryLabel || 'View My Work'
  const primaryTo = siteSettings?.cta?.primaryTo || '/#works'
  const secondaryLabel = siteSettings?.cta?.secondaryLabel || 'Get in Touch'
  const secondaryTo = siteSettings?.cta?.secondaryTo || '/contact'

  return (
    <section
      id="hero"
      className="min-h-[100vh] pt-14 px-5 lg:px-[6vw] py-16 lg:py-24 flex flex-col justify-center"
    >
      <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-12 items-center">
        <div className="flex flex-col items-start">
          <SectionLabel className="mb-6">// 01 - HERO</SectionLabel>

          <div className="font-mono-label text-muted-foreground flex flex-wrap items-center gap-x-4 gap-y-2 mb-6">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-green-500 animate-pulse" />
              {availability}
            </span>
            {location && (
              <span className="flex items-center gap-1.5">
                <IconMapPin className="w-3.5 h-3.5 text-synthesis" />
                {location}
              </span>
            )}
          </div>

          <h1 className="font-heading text-5xl md:text-7xl font-light tracking-tight text-balance">
            {headlineLead}
            {headlineAccent && (
              <>
                <br />
                <em className="text-synthesis italic">{headlineAccent}</em>
              </>
            )}
          </h1>

          <div className="mt-6 max-w-xl">
            {siteSettings?.heroIntro ? (
              <RichText
                data={siteSettings.heroIntro}
                enableProse={false}
                enableGutter={false}
                className="text-muted-foreground text-base leading-relaxed"
              />
            ) : (
              <p className="text-muted-foreground text-base leading-relaxed">
                I design and ship full-stack products with autonomous AI agents at the core -
                built for production, not demos.
              </p>
            )}
          </div>

          {roles.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-2">
              {roles.map((role) => (
                <span
                  key={role}
                  className="font-mono-label text-muted-foreground border border-border px-3 py-1.5"
                >
                  {'// ' + role}
                </span>
              ))}
            </div>
          )}

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href={primaryTo}
              className="inline-flex items-center gap-2 bg-synthesis text-white hover:bg-synthesis/90 transition-colors px-5 py-2.5 font-mono-label"
            >
              {primaryLabel}
              <IconArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href={secondaryTo}
              className="inline-flex items-center gap-2 border border-border text-foreground hover:border-synthesis hover:text-synthesis transition-colors px-5 py-2.5 font-mono-label"
            >
              <IconMail className="w-4 h-4" />
              {secondaryLabel}
            </Link>
          </div>
        </div>

        <aside className="hidden lg:flex flex-col border border-border bg-carbon text-background">
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-border/50">
            <span className="font-mono-label text-background/70 flex items-center gap-2">
              <IconTerminal2 className="w-3.5 h-3.5 text-synthesis" />
              martins@dev:~$
            </span>
            <span className="w-2 h-2 bg-synthesis" />
          </div>
          <div className="p-5 font-mono text-xs leading-relaxed space-y-2">
            {TERMINAL_LINES.map(([prompt, text], i) => (
              <p key={i} className="flex gap-2">
                <span className="text-synthesis shrink-0">{prompt}</span>
                <span className="text-background/80 whitespace-pre-wrap">{text}</span>
                {i === TERMINAL_LINES.length - 1 && (
                  <span className="text-synthesis animate-pulse">_</span>
                )}
              </p>
            ))}
          </div>
        </aside>
      </div>

      <div className="mt-16 lg:mt-20 grid grid-cols-2 md:grid-cols-4 border border-border">
        {metrics.map((metric, i) => (
          <div
            key={i}
            className="flex flex-col gap-1.5 px-5 py-6 md:px-6 lg:px-8 border-border border-t border-l -mt-px -ml-px"
          >
            <span className="font-heading text-3xl md:text-4xl font-light text-synthesis">
              {metric.value}
            </span>
            <span className="font-mono-label text-muted-foreground uppercase">{metric.label}</span>
          </div>
        ))}
      </div>

      <div className="mt-12 font-mono-label text-muted-foreground flex items-center gap-2">
        <IconArrowDown className="w-4 h-4 animate-bounce" />
        Scroll
      </div>
    </section>
  )
}
