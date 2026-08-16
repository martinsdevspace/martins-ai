import type { Metadata } from 'next/types'
import type { Where } from 'payload'

import { InsightsArchive } from '@/components/insights/InsightsArchive'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import type { Insight } from '@/payload-types'
import { getCachedInsightsSidebarData } from '@/utilities/getInsightsSidebarData'

type Args = {
  searchParams: Promise<{ category?: string; tag?: string }>
}

export default async function Page({ searchParams: searchParamsPromise }: Args) {
  const { category, tag } = await searchParamsPromise
  const payload = await getPayload({ config: configPromise })

  const where: Where = {}
  if (category) where['categories.slug'] = { equals: category }
  if (tag) where['tags.tag'] = { equals: tag }

  const [insights, { categories, tags }] = await Promise.all([
    payload.find({
      collection: 'insights',
      depth: 1,
      limit: 12,
      overrideAccess: false,
      where: Object.keys(where).length ? where : undefined,
      select: {
        title: true,
        slug: true,
        categories: true,
        meta: true,
        topic: true,
        readTime: true,
        publishedAt: true,
        heroImage: true,
      },
    }),
    getCachedInsightsSidebarData(),
  ])

  return (
    <InsightsArchive
      docs={insights.docs as Insight[]}
      limit={12}
      page={insights.page || 1}
      totalDocs={insights.totalDocs}
      categories={categories}
      tags={tags}
      activeCategory={category}
      activeTag={tag}
    >
      {insights.totalPages > 1 && insights.page && (
        <div className="mt-10">
          <Pagination page={insights.page} totalPages={insights.totalPages} />
        </div>
      )}
    </InsightsArchive>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Insights | Martin's AI`,
    description: 'Notes from the build log — essays on agents, payments, and production systems.',
    openGraph: mergeOpenGraph({
      title: `Insights | Martin's AI`,
      description: 'Notes from the build log — essays on agents, payments, and production systems.',
    }),
  }
}
