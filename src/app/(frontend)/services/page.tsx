import type { Metadata } from 'next'
import React from 'react'

import { IconArrowRight } from '@tabler/icons-react'
import Link from 'next/link'

import { ServiceRowData, ServicesExperience } from './ServicesExperience'
import { PageCTA } from '@/sections/PageCTA'
import { PageHero } from '@/sections/PageHero'
import { SectionLabel } from '@/sections/_shared'
import { Reveal } from '@/components/Motion/Reveal'
import { getCachedCollection } from '@/utilities/getCollection'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { generateMeta } from '@/utilities/generateMeta'

export default async function ServicesPage() {
  const [services, siteSettings] = await Promise.all([
    getCachedCollection('services', { sort: 'title', limit: 50, depth: 1 })(),
    getCachedGlobal('site-settings', 1)(),
  ])

  const rows: ServiceRowData[] = services.map((service) => ({
    slug: service.slug || '',
    num: service.num || '',
    title: service.title || 'Untitled service',
    tagline: service.tagline || null,
    description: service.description || null,
    deliverables: (service.deliverables || [])
      .map((d) => d.item)
      .filter((d): d is string => Boolean(d)),
    stack: (service.stack || []).map((s) => s.tech).filter((t): t is string => Boolean(t)),
    timeline: service.timeline || null,
    startingFrom: service.startingFrom || null,
    process: (service.process || []).map((step) => ({
      num: step.num || null,
      title: step.title || null,
      description: step.description || null,
    })),
    pricing: (service.pricing || []).map((p) => ({
      name: p.name || null,
      description: p.description || null,
      best: p.best || null,
    })),
    faq: (service.faq || []).map((f) => ({
      question: f.question || null,
      answer: f.answer || null,
    })),
  }))

  const faq = siteSettings?.contactFaq || []

  const approachSteps = [
    {
      num: '01',
      title: 'Discovery & Architecture Audit',
      description:
        'A free 30-minute review of your stack, followed by a written plan: scope, milestones, and the highest-impact improvements ranked by ROI.',
    },
    {
      num: '02',
      title: 'Scoped Build',
      description:
        'Fixed-price delivery in short milestones with weekly demos. Transparent async updates, no surprise invoices, and no hand-wavy timelines.',
    },
    {
      num: '03',
      title: 'Handoff & Long-Term Care',
      description:
        'Documented systems, CI/CD in place, and an optional retainer for maintenance, monitoring, and iteration — you stay the owner.',
    },
  ]

  return (
    <article>
      <PageHero
        label="// 02 — SERVICE_LAYER"
        breadcrumbLabel="Services"
        meta={`${services.length} SERVICES`}
        title={
          <>
            Engineering <span className="text-synthesis italic">as a service,</span> not a ticket.
          </>
        }
        intro="You don't need a vendor with a portfolio of templates — you need someone who ships production systems. Each engagement is scoped, priced up front, and delivered milestone by milestone."
      />

      <section className="px-5 lg:px-[6vw] py-8 lg:py-14">
        <Reveal>
          <div className="mb-10 flex items-center justify-between">
            <SectionLabel className="text-synthesis">// SELECTED_SERVICES</SectionLabel>
            <span className="font-mono-label text-muted-foreground">
              CLICK_TO_EXPAND
            </span>
          </div>
        </Reveal>
        <ServicesExperience services={rows} />
      </section>

      <section className="px-5 lg:px-[6vw] py-16 lg:py-24">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {approachSteps.map((step, i) => (
            <Reveal key={step.num} delay={i * 0.06}>
              <div className="flex h-full flex-col gap-4 border border-border bg-card p-8">
                <span className="font-mono-label text-synthesis">{step.num}</span>
                <h3 className="font-heading text-2xl font-light tracking-tight text-foreground">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{step.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {faq.length > 0 ? (
        <section className="px-5 lg:px-[6vw] py-8 lg:py-14">
          <Reveal>
            <h2 className="mb-10 font-heading text-3xl font-light tracking-tight text-foreground lg:text-5xl">
              Common questions, <span className="text-synthesis italic">answered upfront.</span>
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 gap-x-16 gap-y-10 lg:grid-cols-2">
            {faq.map((item, i) => (
              <Reveal key={item.question || i} delay={(i % 2) * 0.05}>
                <div className="border-b border-border pb-6">
                  <h3 className="font-heading text-lg font-normal text-foreground">
                    {item.question}
                  </h3>
                  {item.answer ? (
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {item.answer}
                    </p>
                  ) : null}
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      ) : null}

      <PageCTA />
    </article>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  return generateMeta({
    doc: {
      slug: 'services',
      meta: {
        title: 'Services — Engineering as a Service',
        description:
          'Fixed-scope, fixed-price engineering services by Martins Michael: AI systems, fintech payments, data platforms, and infrastructure — delivered milestone by milestone.',
      },
    },
  })
}