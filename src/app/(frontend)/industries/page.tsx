import type { Metadata } from 'next'
import { IconArrowUpRight } from '@tabler/icons-react'
import Link from 'next/link'
import React from 'react'

import { PageCTA } from '@/sections/PageCTA'
import { PageHero } from '@/sections/PageHero'
import { Reveal } from '@/components/Motion/Reveal'
import { getCachedCollection } from '@/utilities/getCollection'
import { generateMeta } from '@/utilities/generateMeta'

type IndustryRow = {
  slug: string
  name: string
  tagline: string | null
  projectCount: number | null
  services: string[]
  keyProjects: string[]
  stats: { value: string | null; label: string | null }[]
}

export default async function IndustriesPage() {
  const [industries, projects] = await Promise.all([
    getCachedCollection('industries', { sort: 'sortOrder', limit: 50, depth: 1 })(),
    getCachedCollection('portfolio', { sort: 'sortOrder', limit: 100, depth: 1 })(),
  ])

  const countByIndustry = new Map<string, number>()
  projects.forEach((project) => {
    const industry = project.industry
    if (industry && typeof industry === 'object' && industry.id) {
      countByIndustry.set(String(industry.id), (countByIndustry.get(String(industry.id)) || 0) + 1)
    }
  })

  const rows: IndustryRow[] = industries.map((industry) => ({
    slug: industry.slug || '',
    name: industry.name || 'Untitled industry',
    tagline: industry.tagline || null,
    projectCount:
      industry.projectCount ?? (industry.id ? countByIndustry.get(String(industry.id)) ?? null : null),
    services: (industry.services || [])
      .map((s) => s.service)
      .filter((s): s is string => Boolean(s)),
    keyProjects: (industry.keyProjects || [])
      .map((p) => p.project)
      .filter((p): p is string => Boolean(p)),
    stats: (industry.stats || []).map((s) => ({
      value: s.value || null,
      label: s.label || null,
    })),
  }))

  return (
    <article>
      <PageHero
        label="// 03 — VERTICALS"
        breadcrumbLabel="Industries"
        meta={`${industries.length} INDUSTRIES`}
        title={
          <>
            Patterns that <span className="text-synthesis italic">generalize</span> across industries.
          </>
        }
        intro="The same systems thinking — payments, data, AI, infrastructure — applied to regulated finance, healthcare logistics, and everything in between. If your domain is here, someone like you has been through this before."
      />

      <section className="px-5 lg:px-[6vw] py-8 lg:py-14">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {rows.map((row, i) => (
            <Reveal key={row.slug} delay={(i % 2) * 0.06}>
              <Link
                href={`/industries/${row.slug}`}
                className="group relative flex h-full flex-col overflow-hidden border border-border bg-card p-8 transition-colors hover:border-synthesis lg:p-10"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="font-mono-label text-synthesis">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <IconArrowUpRight className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-synthesis" />
                </div>

                <h2 className="mt-10 font-heading text-3xl font-light tracking-tight text-foreground transition-colors group-hover:text-synthesis lg:text-4xl">
                  {row.name}
                </h2>

                {row.tagline ? (
                  <p className="mt-3 max-w-md font-mono text-sm leading-relaxed text-muted-foreground">
                    {row.tagline}
                  </p>
                ) : null}

                <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2">
                  {row.projectCount != null ? (
                    <span className="font-mono-label text-foreground">
                      {row.projectCount} DEPLOYMENTS
                    </span>
                  ) : null}
                  {row.stats[0]?.value ? (
                    <span className="font-mono-label text-synthesis">
                      {row.stats[0].value} {row.stats[0].label}
                    </span>
                  ) : null}
                  {row.services.length > 0 ? (
                    <span className="font-mono-label text-muted-foreground">
                      {row.services.slice(0, 3).join(' · ')}
                    </span>
                  ) : null}
                </div>

                {row.keyProjects.length > 0 ? (
                  <div className="mt-auto flex flex-wrap gap-1.5 pt-8">
                    {row.keyProjects.slice(0, 4).map((project) => (
                      <span
                        key={project}
                        className="border border-border px-2 py-1 font-mono-label text-[10px] text-muted-foreground"
                      >
                        {project}
                      </span>
                    ))}
                  </div>
                ) : null}
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <PageCTA />
    </article>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  return generateMeta({
    doc: {
      slug: 'industries',
      meta: {
        title: 'Industries Served',
        description:
          'Deep domain patterns Martins Michael applies across finance, healthcare, logistics, and technology — payments, data, AI, and infrastructure.',
      },
    },
  })
}