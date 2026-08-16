import { IconArrowRight } from '@tabler/icons-react'
import { SectionHeading, SectionLabel } from '@/sections/_shared'
import { getCachedCollection } from '@/utilities/getCollection'
import { industryIcon } from '@/utilities/industryIcon'
import Link from 'next/link'
import React from 'react'

type FallbackIndustry = {
  name: string
  tagline: string
  projectCount: number
  keyProjects: { project: string }[]
  slug?: string
}

const FALLBACK_INDUSTRIES: FallbackIndustry[] = [
  {
    name: 'Fintech',
    tagline: 'Payments, ledgers and compliance-critical rails.',
    projectCount: 4,
    keyProjects: [{ project: 'Ledger Core' }, { project: 'Payout Engine' }],
  },
  {
    name: 'Healthcare',
    tagline: 'Patient-facing systems and HIPAA-grade data flows.',
    projectCount: 2,
    keyProjects: [{ project: 'Telehealth Platform' }],
  },
  {
    name: 'Logistics',
    tagline: 'Fleet ops, dispatch and real-time tracking.',
    projectCount: 3,
    keyProjects: [{ project: 'Dispatch System' }, { project: 'Tracking API' }],
  },
]

export default async function Industries() {
  const industries = await getCachedCollection('industries', {
    sort: 'sortOrder',
    limit: 8,
    depth: 1,
  })()

  const items = industries.length > 0 ? industries : FALLBACK_INDUSTRIES

  return (
    <section id="industries" className="px-5 lg:px-[6vw] py-16 lg:py-24">
      <SectionLabel>// 04 — INDUSTRIES</SectionLabel>
      <div className="mt-4 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
        <SectionHeading>Where I operate.</SectionHeading>
        <p className="text-muted-foreground max-w-md text-sm leading-relaxed">
          Domain context matters. These are the sectors where I&apos;ve shipped production systems
          under real constraints.
        </p>
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        {items.map((industry) => (
          <span
            key={industry.name}
            className="border border-border px-4 py-2 font-mono-label text-muted-foreground hover:border-synthesis hover:text-synthesis transition-colors"
          >
            {industry.name}
          </span>
        ))}
      </div>

      <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((industry) => {
          const Icon = industryIcon(industry.name)
          const content = (
            <>
              <div className="w-10 h-10 border border-synthesis/30 bg-synthesis/10 text-synthesis flex items-center justify-center">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="font-heading text-2xl">{industry.name}</h3>
              <p className="text-sm text-muted-foreground">{industry.tagline}</p>
              {typeof industry.projectCount === 'number' && (
                <div className="font-mono-label text-synthesis">{industry.projectCount} projects</div>
              )}
              {industry.keyProjects && industry.keyProjects.length > 0 && (
                <ul className="mt-auto space-y-1.5 border-t border-border pt-4">
                  {industry.keyProjects.slice(0, 3).map((kp, i) => (
                    <li key={i} className="flex items-center gap-2 font-mono-label text-muted-foreground">
                      <IconArrowRight className="w-3 h-3 text-synthesis" />
                      {kp.project}
                    </li>
                  ))}
                </ul>
              )}
            </>
          )
          const className =
            'border border-border bg-card p-6 flex flex-col gap-4 hover:border-synthesis transition-colors group'

          return industry.slug ? (
            <Link key={industry.name} href={`/industries/${industry.slug}`} className={className}>
              {content}
            </Link>
          ) : (
            <div key={industry.name} className={className}>
              {content}
            </div>
          )
        })}
      </div>

      <div className="mt-10">
        <Link
          href="/industries"
          className="inline-flex items-center gap-2 font-mono-label text-muted-foreground hover:text-synthesis transition-colors"
        >
          View all industries
          <IconArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  )
}
