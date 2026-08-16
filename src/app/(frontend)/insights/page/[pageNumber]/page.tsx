import type { Metadata } from 'next/types'
import type { Where } from 'payload'

import { InsightsArchive } from '@/components/insights/InsightsArchive'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import { notFound } from 'next/navigation'
import type { Insight } from '@/payload-types'
import { getCachedInsightsSidebarData } from '@/utilities/getInsightsSidebarData'

type Args = {
  params: Promise<{
    pageNumber: string
  }>
  searchParams: Promise<{ category?: string; tag?: string }>
}

export default async function Page({ params: paramsPromise, searchParams: searchParamsPromise }: Args) {
  const { pageNumber } = await paramsPromise
  const { category, tag } = await searchParamsPromise
  const payload = await getPayload({ config: configPromise })

  const sanitizedPageNumber = Number(pageNumber)

  if (!Number.isInteger(sanitizedPageNumber)) notFound()

  const where: Where = {}
  if (category) where['categories.slug'] = { equals: category }
  if (tag) where['tags.tag'] = { equals: tag }

  const [insights, { categories, tags }] = await Promise.all([
    payload.find({
      collection: 'insights',
      depth: 1,
      limit: 12,
      page: sanitizedPageNumber,
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

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { pageNumber } = await paramsPromise
  return {
    title: `Insights Page ${pageNumber || ''} | Martin's AI`,
  }
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const { totalDocs } = await payload.count({
    collection: 'insights',
    overrideAccess: false,
  })

  const totalPages = Math.ceil(totalDocs / 12)

  const pages: { pageNumber: string }[] = []

  for (let i = 1; i <= totalPages; i++) {
    pages.push({ pageNumber: String(i) })
  }

  return pages
}
