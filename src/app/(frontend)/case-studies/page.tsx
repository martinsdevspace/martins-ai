import type { Metadata } from 'next'
import { IconArrowUpRight } from '@tabler/icons-react'
import Link from 'next/link'
import React from 'react'

import { PageCTA } from '@/sections/PageCTA'
import { PageHero } from '@/sections/PageHero'
import { Reveal } from '@/components/Motion/Reveal'
import { getCachedCollection } from '@/utilities/getCollection'
import { generateMeta } from '@/utilities/generateMeta'

type CaseStudyRow = {
  slug: string
  category: string | null
  client: string | null
  industry: string | null
  projectSlug: string | null
  whyItMatters: string | null
  initialSituation: string | null
  outcome: string | null
  metrics: { value: string | null; label: string | null }[]
  tags: string[]
}

export default async function CaseStudiesPage() {
  const caseStudies = await getCachedCollection('case-studies', {
    sort: 'sortOrder',
    limit: 50,
    depth: 1,
  })()

  const rows: CaseStudyRow[] = caseStudies.map((cs) => ({
    slug: cs.slug || '',
    category: cs.category || null,
    client: cs.client || null,
    industry: cs.industry || null,
    projectSlug:
      cs.projectSlug && typeof cs.projectSlug === 'object' ? (cs.projectSlug.slug as string) || null : null,
    whyItMatters: cs.whyItMatters || null,
    initialSituation: cs.initialSituation || null,
    outcome: cs.outcome || null,
    metrics: (cs.metrics || []).map((m) => ({
      value: m.value || null,
      label: m.label || null,
    })),
    tags: (cs.tags || []).map((t) => t.tag).filter((t): t is string => Boolean(t)),
  }))

  return (
    <article className="pb-8">
      <PageHero
        label="// 04 — CASE_STUDIES"
        breadcrumbLabel="Case Studies"
        meta={`${rows.length} POST_MORTEMS`}
        title={
          <>
            The story <span className="text-synthesis italic">behind</span> the system.
          </>
        }
        intro="Project pages show what shipped. Case studies show why: the initial situation, the decision that mattered, the scope of the change, and the outcomes that followed."
      />

      <section className="px-5 lg:px-[6vw] py-8 lg:py-14">
        <div className="border-t border-border">
          {rows.map((row, i) => {
            const hasMetrics = row.metrics.length > 0
            return (
              <Reveal key={row.slug} delay={(i % 2) * 0.04}>
                <Link
                  href={`/case-studies/${row.slug}`}
                  className="group grid grid-cols-1 gap-4 border-b border-border py-10 transition-colors lg:grid-cols-12 lg:items-baseline lg:gap-6 lg:py-12"
                >
                  <span className="font-mono-label text-synthesis lg:col-span-1">
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  <div className="lg:col-span-5">
                    <div className="font-heading text-3xl font-light tracking-tight text-foreground transition-colors group-hover:text-synthesis lg:text-4xl">
                      {row.client || row.category || row.slug}
                    </div>
                    {row.industry ? (
                      <div className="mt-2 font-mono-label text-muted-foreground">
                        {[row.category, row.industry].filter(Boolean).join(' · ')}
                      </div>
                    ) : (
                      row.category && (
                        <div className="mt-2 font-mono-label text-muted-foreground">
                          {row.category}
                        </div>
                      )
                    )}
                  </div>

                  <div className="lg:col-span-5">
                    {row.whyItMatters ? (
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {row.whyItMatters}
                      </p>
                    ) : row.initialSituation ? (
                      <p className="text-sm leading-relaxed text-muted-foreground line-clamp-3">
                        {row.initialSituation}
                      </p>
                    ) : (
                      row.outcome && (
                        <p className="text-sm leading-relaxed text-muted-foreground line-clamp-3">
                          {row.outcome}
                        </p>
                      )
                    )}
                  </div>

                  <div className="flex items-center justify-between gap-4 lg:col-span-1">
                    {hasMetrics ? (
                      <span className="font-heading text-2xl font-light text-foreground lg:text-3xl">
                        {row.metrics[0].value}
                      </span>
                    ) : null}
                    <IconArrowUpRight className="h-5 w-5 text-foreground transition-colors group-hover:text-synthesis" />
                  </div>
                </Link>
              </Reveal>
            )
          })}
        </div>
      </section>

      <PageCTA />
    </article>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  return generateMeta({
    doc: {
      slug: 'case-studies',
      meta: {
        title: 'Case Studies — Deep Dives',
        description:
          'Detailed case studies from Martins Michael: the initial situation, key decisions, scope of change, and measurable outcomes behind production systems.',
      },
    },
  })
}