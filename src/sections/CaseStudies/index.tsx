import { IconArrowUpRight } from '@tabler/icons-react'
import { SectionHeading, SectionLabel } from '@/sections/_shared'
import { getCachedCollection } from '@/utilities/getCollection'
import Link from 'next/link'
import React from 'react'

const FALLBACK_CASE_STUDIES = [
  {
    client: 'PayLink Africa',
    category: 'Payments',
    industry: 'Fintech',
    whyItMatters:
      'A fragmented payout stack was costing the ops team eight hours a week and delaying merchant settlements.',
    metrics: [
      { value: '40%', label: 'faster settlement' },
      { value: '3m+', label: 'transactions processed' },
      { value: '99.9%', label: 'uptime' },
    ],
  },
  {
    client: 'CareGrid',
    category: 'Platform',
    industry: 'Healthcare',
    whyItMatters:
      'Clinics needed a scheduling + records system that worked offline-first in low-bandwidth regions.',
    metrics: [
      { value: '12k', label: 'appointments / mo' },
      { value: '0', label: 'data loss events' },
      { value: '4x', label: 'faster check-in' },
    ],
  },
]

export default async function CaseStudies() {
  const caseStudies = await getCachedCollection('case-studies', {
    sort: 'sortOrder',
    limit: 4,
    depth: 2,
  })()

  const items = caseStudies.length > 0 ? caseStudies : FALLBACK_CASE_STUDIES

  return (
    <section id="case-studies" className="px-5 lg:px-[6vw] py-16 lg:py-24">
      <SectionLabel>// 05 — CASE_STUDIES</SectionLabel>
      <div className="mt-4 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
        <SectionHeading>Real problems. Real systems. Real outcomes.</SectionHeading>
        <p className="text-muted-foreground max-w-md text-sm leading-relaxed">
          Behind every launch is a decision tree of tradeoffs. These are the ones worth writing down.
        </p>
      </div>

      <div className="mt-10 grid md:grid-cols-2 gap-4">
        {items.map((cs) => (
          <div key={cs.client} className="border border-border bg-card flex flex-col p-6 gap-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                {cs.category && (
                  <div className="font-mono-label text-synthesis mb-2">{cs.category}</div>
                )}
                <h3 className="font-heading text-2xl">{cs.client}</h3>
              </div>
              {cs.industry && (
                <span className="font-mono-label text-muted-foreground border border-border px-2 py-1">
                  {cs.industry}
                </span>
              )}
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed flex-1">{cs.whyItMatters}</p>

            <div className="grid grid-cols-3 divide-x divide-border border border-border">
              {(cs.metrics && cs.metrics.length > 0 ? cs.metrics : []).map((m, i) => (
                <div key={i} className="px-3 py-3 flex flex-col gap-1">
                  <span className="font-heading text-xl text-synthesis">{m.value}</span>
                  <span className="font-mono-label text-muted-foreground text-[10px]">{m.label}</span>
                </div>
              ))}
            </div>

            <Link
              href={'slug' in cs && cs.slug ? `/case-studies/${cs.slug}` : '/case-studies'}
              className="font-mono-label flex items-center gap-2 text-muted-foreground hover:text-synthesis transition-colors"
            >
              Read case study <IconArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <Link
          href="/case-studies"
          className="inline-flex items-center gap-2 font-mono-label text-muted-foreground hover:text-synthesis transition-colors"
        >
          View all case studies
          <IconArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  )
}
