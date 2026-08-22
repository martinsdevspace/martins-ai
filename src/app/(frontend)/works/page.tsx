import type { Metadata } from 'next'
import React from 'react'

import { IconArrowUpRight, IconArrowRight } from '@tabler/icons-react'
import Link from 'next/link'

import { ProjectCardData, WorksGrid } from './WorksGrid'
import { Reveal } from '@/components/Motion/Reveal'
import { PageHero } from '@/sections/PageHero'
import { PageCTA } from '@/sections/PageCTA'
import { getCachedCollection } from '@/utilities/getCollection'
import { generateMeta } from '@/utilities/generateMeta'

export default async function WorksPage() {
  const [projects, industries] = await Promise.all([
    getCachedCollection('projects', { sort: 'sortOrder', limit: 100, depth: 1 })(),
    getCachedCollection('industries', { sort: 'sortOrder', limit: 100, depth: 0 })(),
  ])

  const industryNameById = new Map<string, string>()
  industries.forEach((industry) => {
    if (industry.id) industryNameById.set(String(industry.id), industry.name)
  })

  const cards: ProjectCardData[] = projects.map((project) => ({
    slug: project.slug || '',
    name: project.name || 'Untitled project',
    tagline: project.tagline || null,
    description: project.description || null,
    category: project.category || null,
    industryName:
      project.industry && typeof project.industry === 'object'
        ? industryNameById.get(String(project.industry.id)) || project.industry.name || null
        : null,
    projectStatus: project.projectStatus || null,
    year: project.year ?? null,
    featured: Boolean(project.featured),
    stack: (project.stack || []).map((s) => s.tech).filter((t): t is string => Boolean(t)),
    stats: project.stats
      ? {
        loc: project.stats.loc ?? null,
        commits: project.stats.commits ?? null,
        contributors: project.stats.contributors ?? null,
      }
      : null,
    liveUrl: project.liveUrl || null,
    github: project.github || null,
  }))

  const totalLoc = cards.reduce((sum, p) => sum + (p.stats?.loc || 0), 0)
  const totalCommits = cards.reduce((sum, p) => sum + (p.stats?.commits || 0), 0)
  const industryCount = new Set(
    cards.map((c) => c.industryName).filter((n): n is string => Boolean(n)),
  ).size

  const formatCompact = (n: number) => {
    if (n >= 1000) return `${(n / 1000).toFixed(1).replace(/\.0$/, '')}K+`
    return `${n}+`
  }

  const stats = [
    { value: `${cards.length}+`, label: 'Systems shipped' },
    { value: formatCompact(totalLoc), label: 'Lines of code' },
    { value: formatCompact(totalCommits), label: 'Git commits' },
    { value: `${industryCount}+`, label: 'Industries served' },
  ]

  return (
    <article>
      <PageHero
        label="// 01 — SELECTED_DEPLOYMENTS"
        breadcrumbLabel="Works"
        meta={`${cards.length} DEPLOYMENTS`}
        title={
          <>
            Every system tells <span className="text-synthesis italic">a story.</span>
          </>
        }
        intro="A selection of production systems I designed and shipped — spanning fintech payments, AI agents, data platforms, and infrastructure. Each one delivered measurable outcomes, not demos."
      >
        <Reveal delay={0.15}>
          <dl className="mt-10 grid grid-cols-2 gap-px border border-border bg-border lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-background p-6 lg:p-8">
                <dt className="font-mono-label text-[10px] uppercase tracking-wider text-muted-foreground">
                  {stat.label}
                </dt>
                <dd className="mt-2 font-heading text-4xl font-light text-foreground lg:text-5xl">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </PageHero>

      <section className="px-5 lg:px-[6vw] py-8 lg:py-12">
        <WorksGrid projects={cards} />
      </section>

      <section className="px-5 lg:px-[6vw] py-16 lg:py-24">
        <Reveal>
          <div className="flex flex-col justify-between gap-6 border border-border bg-card p-8 lg:flex-row lg:items-center lg:p-14">
            <div>
              <div className="font-mono-label text-synthesis mb-3">// DEEPER — CASE_STUDIES</div>
              <h2 className="font-heading text-3xl font-light tracking-tight text-balance lg:text-5xl">
                Go deeper on the problems behind the systems.
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground lg:text-base">
                Detailed case studies cover the initial situation, the key decisions, the scope of
                change, and the measurable outcomes — the context that a project page can&apos;t capture.
              </p>
            </div>
            <Link
              href="/case-studies"
              className="inline-flex shrink-0 items-center gap-2 border border-foreground px-6 py-4 font-mono-label text-sm transition-colors hover:bg-foreground hover:text-background"
            >
              VIEW_CASE_STUDIES <IconArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </section>

      <PageCTA />
    </article>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  return generateMeta({
    doc: {
      slug: 'works',
      meta: {
        title: 'Works — Selected Deployments',
        description:
          'A selection of production systems designed and shipped by Martins Michael — fintech payments, AI agents, data platforms, and infrastructure with measurable outcomes.',
      },
    },
  })
}