import type { Metadata } from 'next'
import type { ElementType } from 'react'
import React from 'react'

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
import { SectionHeading, SectionLabel } from '@/sections/_shared'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'

const focusIconMap: Record<string, ElementType> = {
  shield: IconShield,
  code: IconCode,
  robot: IconRobot,
  brain: IconBrain,
  database: IconDatabase,
  terminal: IconTerminal2,
  focus: IconFocus2,
}

export default async function AboutPage() {
  const [about, siteSettings] = await Promise.all([
    getCachedGlobal('about', 2)(),
    getCachedGlobal('site-settings', 1)(),
  ])

  const portrait = about.portrait && typeof about.portrait === 'object' ? about.portrait : null
  const portraitUrl = getMediaUrl(portrait?.url, portrait?.updatedAt)

  const location = siteSettings.location || 'Lagos, Nigeria'
  const availability = siteSettings.availability || 'Open to select projects'

  const stats = about.stats?.filter((s) => s.value || s.label) || []
  const values = about.values?.filter((v) => v.title) || []
  const timeline = about.timeline?.filter((t) => t.title) || []
  const skillCategories = about.skillCategories?.filter((s) => s.name) || []
  const beyondCode = about.beyondCode?.map((b) => b.paragraph).filter((p): p is string => Boolean(p)) || []
  const speaking = about.speaking?.filter((s) => s.event || s.title) || []
  const certifications = about.certifications?.filter((c) => c.name) || []

  return (
    <article className="px-5 lg:px-[6vw] pt-24 pb-24">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5 lg:sticky lg:top-24 lg:self-start">
          <SectionLabel>// — ABOUT</SectionLabel>
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

        <div className="space-y-16 lg:col-span-7">
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
                Martins Michael is a full-stack engineer and AI agent architect who designs, builds,
                and ships systems that move money and information at scale.
              </p>
              <p>
                His work sits at the intersection of payments and fintech, where reliability is a
                feature — every API, ledger, and agent loop is engineered for correctness under
                pressure.
              </p>
            </div>
          )}

          {stats.length > 0 ? (
            <div className="grid grid-cols-2 gap-px border border-border bg-border lg:grid-cols-4">
              {stats.map((metric, index) => (
                <div key={metric.id || `metric-${index}`} className="bg-background p-5">
                  <p className="font-heading text-2xl">{metric.value}</p>
                  <p className="mt-1 font-mono-label text-muted-foreground">{metric.label}</p>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>

      {about.originStory ? (
        <section className="mt-20">
          <h2 className="font-mono-label text-synthesis mb-4">
            // {about.originHeading || 'ORIGIN_STORY'}
          </h2>
          <RichText
            data={about.originStory}
            enableProse={false}
            enableGutter={false}
            className="max-w-3xl text-base leading-relaxed text-foreground/80"
          />
        </section>
      ) : null}

      {values.length > 0 ? (
        <section className="mt-20">
          <h2 className="font-mono-label text-synthesis mb-4">
            // {about.valuesHeading || 'PHILOSOPHY'}
          </h2>
          {about.valuesIntro ? (
            <RichText
              data={about.valuesIntro}
              enableProse={false}
              enableGutter={false}
              className="mb-8 max-w-3xl text-base leading-relaxed text-foreground/80"
            />
          ) : null}
          <div className="grid gap-4 md:grid-cols-3">
            {values.map((value, index) => {
              const ValueIcon = focusIconMap[(value.icon || '').toLowerCase()] || IconFocus2
              return (
                <div key={value.id || `value-${index}`} className="border border-border bg-card p-6 flex flex-col gap-3">
                  <ValueIcon className="h-5 w-5 text-synthesis" />
                  <h3 className="font-heading text-xl">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </div>
              )
            })}
          </div>
        </section>
      ) : null}

      {timeline.length > 0 ? (
        <section className="mt-20">
          <h2 className="font-mono-label text-synthesis mb-4">
            // {about.timelineHeading || 'TIMELINE'}
          </h2>
          <div className="flex flex-col gap-4">
            {timeline.map((item, index) => (
              <div key={item.id || `timeline-${index}`} className="grid gap-2 border border-border bg-card p-6 md:grid-cols-[8rem_1fr]">
                {item.year ? <span className="font-mono-label text-synthesis">{item.year}</span> : <span />}
                <div>
                  <h3 className="font-heading text-xl">{item.title}</h3>
                  {item.description ? (
                    <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {skillCategories.length > 0 ? (
        <section className="mt-20">
          <h2 className="font-mono-label text-synthesis mb-4">
            // {about.skillsHeading || 'SKILLS'}
          </h2>
          <div className="flex flex-col gap-4">
            {skillCategories.map((skill, index) => (
              <div key={skill.id || `skill-${index}`} className="border border-border bg-card p-6">
                <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
                  <h3 className="font-heading text-xl">{skill.name}</h3>
                  {skill.context ? (
                    <span className="font-mono-label text-muted-foreground">{skill.context}</span>
                  ) : null}
                </div>
                {skill.tools ? (
                  <p className="mt-2 text-sm text-muted-foreground">{skill.tools}</p>
                ) : null}
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {beyondCode.length > 0 ? (
        <section className="mt-20 grid grid-cols-1 gap-10 border-t border-border pt-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="font-heading text-2xl font-light lg:text-3xl">
              {about.beyondCodeHeading || 'Beyond the code.'}
            </h2>
          </div>
          <div className="flex flex-col gap-5 lg:col-span-8">
            {beyondCode.map((paragraph, index) => (
              <p
                key={index}
                className="max-w-2xl text-base leading-relaxed text-foreground/75 lg:text-lg"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </section>
      ) : null}

      {(speaking.length > 0 || certifications.length > 0) ? (
        <div className="mt-20 grid gap-10 lg:grid-cols-2">
          {speaking.length > 0 ? (
            <section>
              <h2 className="font-mono-label text-synthesis mb-4">
                // {about.speakingHeading || 'SPEAKING'}
              </h2>
              <div className="flex flex-col gap-2">
                {speaking.map((talk, index) => (
                  <div key={talk.id || `speaking-${index}`} className="border border-border bg-card px-5 py-3">
                    <p className="font-heading text-base">{talk.title || talk.event}</p>
                    <p className="font-mono-label text-muted-foreground">
                      {talk.event}
                      {talk.event && talk.year ? ' · ' : ''}
                      {talk.year}
                      {talk.location ? ` · ${talk.location}` : ''}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {certifications.length > 0 ? (
            <section>
              <h2 className="font-mono-label text-synthesis mb-4">
                // {about.certificationsHeading || 'CERTIFICATIONS'}
              </h2>
              <div className="flex flex-col gap-2">
                {certifications.map((cert, index) => (
                  <div key={cert.id || `cert-${index}`} className="border border-border bg-card px-5 py-3 flex items-center justify-between gap-4">
                    <div>
                      <p className="font-heading text-base">{cert.name}</p>
                      <p className="font-mono-label text-muted-foreground">{cert.issuer}</p>
                    </div>
                    {cert.year ? <span className="font-mono-label text-synthesis">{cert.year}</span> : null}
                  </div>
                ))}
              </div>
            </section>
          ) : null}
        </div>
      ) : null}

      <div className="mt-20 flex flex-wrap gap-3">
        <Link
          href="/resume"
          className="inline-flex items-center gap-2 border border-border px-5 py-2.5 font-mono-label text-foreground hover:border-synthesis hover:text-synthesis transition-colors"
        >
          Read the full story
          <IconArrowUpRight className="h-4 w-4" />
        </Link>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 bg-foreground px-5 py-2.5 font-mono-label text-background hover:bg-synthesis hover:text-background transition-colors"
        >
          Work with me
          <IconArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await getCachedGlobal('site-settings', 1)()

  const name = siteSettings.name || 'Martins Michael'

  return {
    title: `About — ${name} | Martin's AI`,
    description: 'The builder behind the build. Full-stack engineer and AI agent architect.',
    openGraph: mergeOpenGraph({
      title: `About — ${name} | Martin's AI`,
      description: 'The builder behind the build. Full-stack engineer and AI agent architect.',
    }),
  }
}
