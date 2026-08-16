import Link from 'next/link'
import React from 'react'

import { IconArrowUpRight, IconClock } from '@tabler/icons-react'

import type { Insight } from '@/payload-types'

import { InsightCard } from './InsightCard'
import { InsightsSidebar } from './InsightsSidebar'
import { NewsletterSection } from '@/components/NewsletterBlock/NewsletterSection'
import { Media } from '@/components/Media'
import type { SidebarCategory, SidebarTag } from '@/utilities/getInsightsSidebarData'

const formatDate = (value: string): string =>
  new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

function FeaturedInsight({ insight }: { insight: Insight }) {
  const publishedAt = insight.publishedAt ? formatDate(insight.publishedAt) : null
  const hasImage = insight.heroImage && typeof insight.heroImage === 'object'

  return (
    <Link
      href={`/insights/${insight.slug}`}
      className="group grid grid-cols-1 items-center gap-8 border border-border bg-card p-6 transition-colors hover:border-synthesis lg:grid-cols-2 lg:gap-12 lg:p-8"
    >
      <div className="relative aspect-[4/3] overflow-hidden border border-border bg-background">
        {hasImage ? (
          <Media
            resource={insight.heroImage}
            fill
            imgClassName="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="font-mono-label text-muted-foreground">[FEATURED]</span>
          </div>
        )}
      </div>

      <div>
        <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono-label text-muted-foreground">
          {insight.topic ? <span className="text-synthesis">{insight.topic}</span> : null}
          {insight.topic && publishedAt ? <span>·</span> : null}
          {publishedAt ? <span>{publishedAt}</span> : null}
          {insight.readTime ? (
            <span className="flex items-center gap-1">
              <IconClock className="h-3.5 w-3.5" />
              {insight.readTime}
            </span>
          ) : null}
        </div>
        <h2 className="mb-4 font-heading text-3xl font-light leading-tight transition-colors group-hover:text-synthesis lg:text-4xl">
          {insight.title}
        </h2>
        {insight.meta?.description ? (
          <p className="mb-6 text-base leading-relaxed text-muted-foreground lg:text-lg">
            {insight.meta.description}
          </p>
        ) : null}
        <span className="inline-flex items-center gap-2 font-mono-label text-foreground transition-colors group-hover:text-synthesis">
          Read full entry
          <IconArrowUpRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  )
}

export const InsightsArchive: React.FC<{
  docs: Insight[]
  page: number
  limit: number
  totalDocs: number
  categories: SidebarCategory[]
  tags: SidebarTag[]
  activeCategory?: string
  activeTag?: string
  children?: React.ReactNode
}> = ({ docs, limit, page, totalDocs, categories, tags, activeCategory, activeTag, children }) => {
  const from = totalDocs === 0 ? 0 : (page - 1) * limit + 1
  const to = Math.min(page * limit, totalDocs)

  // Only spotlight a featured entry on the unfiltered first page — once a
  // filter or later page is active, every result should appear as an equal
  // row in the grid rather than have one arbitrarily pulled out.
  const showFeatured = page === 1 && !activeCategory && !activeTag && docs.length > 0
  const featured = showFeatured ? docs[0] : null
  const gridDocs = featured ? docs.slice(1) : docs

  const activeCategoryLabel = activeCategory
    ? categories.find((c) => c.slug === activeCategory)?.title || activeCategory
    : null

  return (
    <div className="px-5 lg:px-[6vw] pt-24 pb-24">
      <div className="max-w-3xl">
        <div className="font-mono-label text-synthesis mb-4 flex items-center gap-2">
          <span className="w-1 h-1 bg-synthesis animate-pulse" />
          // — INSIGHTS
        </div>
        <h1 className="font-heading text-4xl md:text-6xl font-light tracking-tight text-balance">
          Notes from the build log.
        </h1>
        <p className="mt-4 max-w-2xl text-foreground/80">
          Essays and deep dives on agents, payments, and the architecture of systems that hold up in
          production.
        </p>
      </div>

      {categories.length > 0 ? (
        <div className="mt-10 flex flex-wrap gap-2">
          <Link
            href="/insights"
            className={`border px-4 py-2 font-mono-label transition-colors ${
              !activeCategory
                ? 'border-foreground bg-foreground text-background'
                : 'border-border text-muted-foreground hover:border-synthesis hover:text-synthesis'
            }`}
          >
            All
          </Link>
          {categories.map((category) => (
            <Link
              key={category.id}
              href={category.slug ? `/insights?category=${category.slug}` : '/insights'}
              className={`border px-4 py-2 font-mono-label transition-colors ${
                activeCategory === category.slug
                  ? 'border-foreground bg-foreground text-background'
                  : 'border-border text-muted-foreground hover:border-synthesis hover:text-synthesis'
              }`}
            >
              {category.title}
            </Link>
          ))}
        </div>
      ) : null}

      {featured ? (
        <div className="mt-12">
          <p className="mb-4 font-mono-label text-muted-foreground">// FEATURED_ENTRY</p>
          <FeaturedInsight insight={featured} />
        </div>
      ) : null}

      <div className="mt-12 grid grid-cols-1 gap-16 lg:grid-cols-[1fr_320px]">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
            {totalDocs > 0 ? (
              <p className="font-mono-label text-muted-foreground">
                SHOWING {from} — {to} OF {totalDocs}
              </p>
            ) : (
              <span />
            )}
            {activeCategoryLabel || activeTag ? (
              <p className="font-mono-label text-muted-foreground">
                FILTERED BY{' '}
                <span className="text-synthesis">{activeCategoryLabel || activeTag}</span>
                {' · '}
                <Link href="/insights" className="underline hover:text-synthesis">
                  clear
                </Link>
              </p>
            ) : null}
          </div>

          {gridDocs.length > 0 ? (
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {gridDocs.map((insight) => (
                <InsightCard key={insight.id} insight={insight} />
              ))}
            </div>
          ) : !featured ? (
            <div className="mt-8 border border-border bg-card p-8 font-mono-label text-muted-foreground">
              No insights found{activeCategoryLabel || activeTag ? ' for this filter' : ' yet'}.
            </div>
          ) : null}

          {children}
        </div>

        <InsightsSidebar
          categories={categories}
          tags={tags}
          className="lg:sticky lg:top-24 lg:h-fit"
        />
      </div>

      <NewsletterSection className="-mx-5 mt-20 lg:-mx-[6vw]" />
    </div>
  )
}
