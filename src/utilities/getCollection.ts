import type { Config } from '@/payload-types'

import configPromise from '@payload-config'
import { unstable_cache } from 'next/cache'
import { type DataFromCollectionSlug, getPayload, type Where } from 'payload'

type Collection = keyof Config['collections']

type GetCollectionArgs = {
  sort?: string
  limit?: number
  depth?: number
  where?: Where
  draft?: boolean
  pagination?: boolean
  select?: Record<string, true>
}

async function getCollection<T extends Collection>(
  collection: T,
  args: GetCollectionArgs = {},
): Promise<DataFromCollectionSlug<T>[]> {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: collection as Collection,
    sort: args.sort || '-updatedAt',
    limit: args.limit ?? 10,
    depth: args.depth ?? 1,
    pagination: args.pagination ?? false,
    draft: args.draft ?? false,
    where: args.where,
    select: args.select as Record<string, true> | undefined,
  })

  return result.docs as DataFromCollectionSlug<T>[]
}

/**
 * Returns a cached function for the given collection query, tagged with the
 * collection's list slug so any document change revalidates every consumer.
 */
export const getCachedCollection = <T extends Collection>(collection: T, args: GetCollectionArgs = {}) =>
  unstable_cache(
    async () => getCollection<T>(collection, args),
    [collection, JSON.stringify(args)],
    {
      tags: [`${collection}_list`, `${collection}-sitemap`],
    },
  )