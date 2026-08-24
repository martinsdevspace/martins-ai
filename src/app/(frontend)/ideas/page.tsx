import type { Metadata } from 'next'
import { IconArrowUpRight } from '@tabler/icons-react'
import Link from 'next/link'
import React from 'react'

import { PageCTA } from '@/sections/PageCTA'
import { PageHero } from '@/sections/PageHero'
import { Reveal } from '@/components/Motion/Reveal'
import configPromise from '@payload-config'
import { generateMeta } from '@/utilities/generateMeta'
import { getPayload } from 'payload'

const PAGE_SIZE = 8

type Args = {
  searchParams: Promise<{ page?: string; category?: string }>
}

export default async function IdeasPage({ searchParams }: Args) {
  const { page: pageParam, category } = await searchParams
  const page = Math.max(1, Number(pageParam) || 1)

  const payload = await getPayload({ config: configPromise })

  const where = category ? { category: { equals: category } } : undefined

  const [result, all] = await Promise.all([
    payload.find({
      collection: 'ideas',
      sort: '-sortOrder',
      page,
      limit: PAGE_SIZE,
      pagination: true,
      depth: 1,
      where,
      overrideAccess: false,
    }),
    payload.find({
      collection: 'ideas',
      limit: 1000,
      pagination: false,
      depth: 0,
      select: { category: true },
      overrideAccess: false,
    }),
  ])

  const rows = (result.docs || []).map((cs) => ({
    slug: cs.slug || '',
    category: cs.category || null,
    client: cs.client || null,
    industry: cs.industry || null,
    projectSlug:
      cs.projectSlug && typeof cs.projectSlug === 'object'
        ? ((cs.projectSlug as { slug?: string }).slug as string) || null
        : null,
    whyItMatters: cs.whyItMatters || null,
    initialSituation: cs.initialSituation || null,
    outcome: cs.outcome || null,
    metrics: (cs.metrics || []).map((m) => ({ value: m.value || null, label: m.label || null })),
    tags: (cs.tags || []).map((t) => t.tag).filter((t): t is string => Boolean(t)),
  }))

  const categories = [
    'All',
    ...Array.from(new Set((all.docs || []).map((d) => d.category).filter(Boolean) as string[])).sort(),
  ]

  const totalPages = result.totalPages || 1
  const currentCategory = category || 'All'

  return (
    <article>
      <PageHero
        label="// 05 — IDEAS"
        breadcrumbLabel="Ideas"
        meta={`${result.totalDocs ?? rows.length} ENGAGEMENTS`}
        title={
          <>
            Ideas <span className="text-synthesis italic">you can</span> build.
          </>
        }
        intro="A catalogue of engagements I can run for you — from payments platforms to agentic systems. Each one is scoped, delivered in production, and built to last."
      />

      <section className="px-5 lg:px-[6vw] py-8 lg:py-14">
        <div className="mb-10 flex flex-wrap gap-2" role="group" aria-label="Filter ideas by category">
          {categories.map((cat) => {
            const href = cat === 'All' ? '/ideas' : `/ideas?category=${encodeURIComponent(cat)}`
            const active = currentCategory === cat
            return (
              <Link
                key={cat}
                href={href}
                aria-current={active ? 'page' : undefined}
                className={`font-mono-label border px-4 py-2 transition-colors ${
                  active
                    ? 'border-foreground bg-foreground text-background'
                    : 'border-border bg-background text-muted-foreground hover:border-foreground hover:text-foreground'
                }`}
              >
                {cat}
              </Link>
            )
          })}
        </div>

        <div className="border-t border-border">
          {rows.map((row, i) => {
            const hasMetrics = row.metrics.length > 0
            return (
              <Reveal key={row.slug} delay={(i % 2) * 0.04}>
                <Link
                  href={`/ideas/${row.slug}`}
                  className="group grid grid-cols-1 gap-4 border-b border-border py-10 transition-colors lg:grid-cols-12 lg:items-baseline lg:gap-6 lg:py-12"
                >
                  <span className="font-mono-label text-synthesis lg:col-span-1">
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  <div className="lg:col-span-5">
                    <div className="font-heading text-3xl font-light tracking-tight text-foreground transition-colors group-hover:text-synthesis lg:text-4xl">
                      {row.client || row.category || row.slug}
                    </div>
                    {row.industry || row.category ? (
                      <div className="mt-2 font-mono-label text-muted-foreground">
                        {[row.category, row.industry].filter(Boolean).join(' · ')}
                      </div>
                    ) : null}
                  </div>

                  <div className="lg:col-span-5">
                    {row.whyItMatters ? (
                      <p className="text-sm leading-relaxed text-muted-foreground">{row.whyItMatters}</p>
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

        {totalPages > 1 ? (
          <nav className="mt-10 flex flex-wrap items-center gap-2" aria-label="Pagination">
            {page > 1 ? <PageLink href={paginationHref(page - 1, currentCategory)} label="Prev" /> : null}
            {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((p) => {
              const active = p === page
              return (
                <Link
                  key={p}
                  href={paginationHref(p, currentCategory)}
                  aria-current={active ? 'page' : undefined}
                  className={`font-mono-label border px-3 py-2 transition-colors ${
                    active
                      ? 'border-foreground bg-foreground text-background'
                      : 'border-border bg-background text-muted-foreground hover:border-foreground hover:text-foreground'
                  }`}
                >
                  {String(p).padStart(2, '0')}
                </Link>
              )
            })}
            {page < totalPages ? (
              <PageLink href={paginationHref(page + 1, currentCategory)} label="Next" />
            ) : null}
          </nav>
        ) : null}
      </section>

      <PageCTA secondaryTo="/portfolio" secondaryLabel="VIEW_PORTFOLIO" />
    </article>
  )
}

function paginationHref(page: number, category: string) {
  const params = new URLSearchParams()
  params.set('page', String(page))
  if (category && category !== 'All') params.set('category', category)
  const qs = params.toString()
  return qs ? `/ideas?${qs}` : '/ideas'
}

function PageLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="border border-border px-3 py-2 font-mono-label text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
    >
      {label}
    </Link>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  return generateMeta({
    doc: {
      slug: 'ideas',
      meta: {
        title: 'Ideas — Engagements You Can Build',
        description:
          'A catalogue of engagements Martins Michael can run for you — payments platforms, agentic systems, and production-ready builds.',
      },
    },
  })
}
