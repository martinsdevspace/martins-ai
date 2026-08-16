import type { ElementType } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import {
  IconArrowUpRight,
  IconBrain,
  IconCode,
  IconDatabase,
  IconFocus2,
  IconMapPin,
  IconRobot,
  IconShield,
  IconTerminal2,
} from '@tabler/icons-react'

import RichText from '@/components/RichText'
import type { About as AboutType } from '@/payload-types'
import { SectionHeading, SectionLabel } from '@/sections/_shared'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { getMediaUrl } from '@/utilities/getMediaUrl'

const focusIconMap: Record<string, ElementType> = {
  shield: IconShield,
  code: IconCode,
  robot: IconRobot,
  brain: IconBrain,
  database: IconDatabase,
  terminal: IconTerminal2,
  focus: IconFocus2,
}

const fallbackFocusAreas: NonNullable<AboutType['values']> = [
  {
    icon: 'robot',
    title: 'AI Agent Architecture',
    description:
      'Designing autonomous agents, reasoning loops, and tool orchestration that survive production.',
  },
  {
    icon: 'database',
    title: 'Payments & Fintech',
    description:
      'Building reliable rails for money movement, settlement, and reconciliation under load.',
  },
  {
    icon: 'code',
    title: 'Developer Experience',
    description:
      'Shipping tooling and interfaces that make complex systems feel inevitable and obvious.',
  },
]

const fallbackMetrics: NonNullable<AboutType['stats']> = [
  { value: '5+', label: 'Years Shipping' },
  { value: '12+', label: 'Products Built' },
  { value: '3m+', label: 'Transactions Processed' },
  { value: '100%', label: 'Uptime Focus' },
]

const ghostLink =
  'inline-flex items-center gap-2 border border-border text-foreground hover:border-synthesis hover:text-synthesis transition-colors px-5 py-2.5 font-mono-label'

export default async function About() {
  const about = await getCachedGlobal('about', 2)()
  const site = await getCachedGlobal('site-settings', 1)()

  const portrait = about.portrait && typeof about.portrait === 'object' ? about.portrait : null
  const portraitUrl = getMediaUrl(portrait?.url, portrait?.updatedAt)

  const focusAreas = about.values?.length ? about.values : fallbackFocusAreas
  const metrics = about.stats?.length ? about.stats : fallbackMetrics

  const location = site.location || 'Lagos, Nigeria'
  const availability = site.availability || 'Open to select projects'

  return (
    <section id="about" className="px-5 lg:px-[6vw] py-16 lg:py-24">
      <div className="grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5">
          <SectionLabel>// 01 — ABOUT</SectionLabel>
          <SectionHeading className="mt-4">
            {about.heroHeadline || 'The builder behind the build.'}
          </SectionHeading>

          <div className="mt-8">
            {portrait && portraitUrl ? (
              <div className="relative aspect-[4/5] overflow-hidden border border-border bg-card">
                <Image
                  src={portraitUrl}
                  alt={portrait.alt || 'Portrait of Martins Michael'}
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

          <div className="mt-6 space-y-3 border border-border bg-card p-4">
            <div className="flex items-center gap-2 font-mono-label text-muted-foreground">
              <IconMapPin className="h-4 w-4 text-synthesis" />
              {location}
            </div>
            <div className="flex items-center gap-2 font-mono-label text-muted-foreground">
              <span className="h-1.5 w-1.5 bg-synthesis animate-pulse" />
              {availability}
            </div>
          </div>
        </div>

        <div className="space-y-10 lg:col-span-7">
          {about.intro ? (
            <RichText
              data={about.intro}
              enableProse={false}
              enableGutter={false}
              className="text-base leading-relaxed text-foreground/80"
            />
          ) : (
            <div className="space-y-4 text-base leading-relaxed text-foreground/80">
              <p>
                Martins Michael is a full-stack engineer and AI agent architect who designs,
                builds, and ships systems that move money and information at scale.
              </p>
              <p>
                His work sits at the intersection of payments and fintech, where reliability is a
                feature — every API, ledger, and agent loop is engineered for correctness under
                pressure.
              </p>
              <p>
                Beyond production systems, he cares deeply about developer experience: clean
                boundaries, honest tooling, and code that reads like a proof.
              </p>
            </div>
          )}

          <div className="space-y-3">
            <p className="font-mono-label text-muted-foreground">// CURRENT_FOCUS</p>
            {focusAreas.map((area, index) => {
              const FocusIcon = focusIconMap[(area.icon || '').toLowerCase()] || IconFocus2
              return (
                <div
                  key={area.id || `focus-${index}`}
                  className="flex items-start gap-3 border border-border bg-card p-4"
                >
                  <FocusIcon className="h-5 w-5 shrink-0 text-synthesis" />
                  <div>
                    <h3 className="font-heading text-xl">{area.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{area.description}</p>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="grid grid-cols-2 gap-px border border-border bg-border lg:grid-cols-4">
            {metrics.map((metric, index) => (
              <div key={metric.id || `metric-${index}`} className="bg-background p-5">
                <p className="font-heading text-2xl">{metric.value}</p>
                <p className="mt-1 font-mono-label text-muted-foreground">{metric.label}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <Link href="/about" className={ghostLink}>
              Read the full story
              <IconArrowUpRight className="h-4 w-4" />
            </Link>
            <Link href="/resume" className={ghostLink}>
              Download Résumé
              <IconArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
