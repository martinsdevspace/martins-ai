import configPromise from '@payload-config'
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'

export interface SidebarCategory {
  id: number
  title: string
  slug: string | null | undefined
  count: number
}

export interface SidebarTag {
  tag: string
  count: number
}

export interface InsightsSidebarData {
  categories: SidebarCategory[]
  tags: SidebarTag[]
}

async function fetchInsightsSidebarData(): Promise<InsightsSidebarData> {
  const payload = await getPayload({ config: configPromise })

  const insights = await payload.find({
    collection: 'insights',
    depth: 1,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      categories: true,
      tags: true,
    },
  })

  const categoryMap = new Map<number, SidebarCategory>()
  const tagMap = new Map<string, SidebarTag>()

  for (const doc of insights.docs) {
    for (const category of doc.categories || []) {
      if (typeof category !== 'object' || !category) continue
      const existing = categoryMap.get(category.id)
      if (existing) {
        existing.count += 1
      } else {
        categoryMap.set(category.id, {
          id: category.id,
          title: category.title || 'Untitled category',
          slug: category.slug,
          count: 1,
        })
      }
    }

    for (const entry of doc.tags || []) {
      const tag = entry?.tag?.trim()
      if (!tag) continue
      const key = tag.toLowerCase()
      const existing = tagMap.get(key)
      if (existing) {
        existing.count += 1
      } else {
        tagMap.set(key, { tag, count: 1 })
      }
    }
  }

  return {
    categories: Array.from(categoryMap.values()).sort((a, b) => b.count - a.count),
    tags: Array.from(tagMap.values()).sort((a, b) => b.count - a.count),
  }
}

/**
 * Cached, tagged with `insights` so publishing/editing any insight revalidates
 * the sidebar's category and tag aggregates across the site.
 */
export const getCachedInsightsSidebarData = () =>
  unstable_cache(fetchInsightsSidebarData, ['insights-sidebar-data'], {
    tags: ['insights'],
  })()
