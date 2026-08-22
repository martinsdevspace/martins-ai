import type { Config } from '@/payload-types'

import configPromise from '@payload-config'
import { unstable_cache } from 'next/cache'
import { type DataFromCollectionSlug, getPayload } from 'payload'

type Comment = DataFromCollectionSlug<'comments'>

type GetCommentsArgs = {
  insightId: number | string
  page?: number
  limit?: number
  draft?: boolean
}

async function getComments({
  insightId,
  page = 1,
  limit = 10,
  draft = false,
}: GetCommentsArgs): Promise<{
  docs: Comment[]
  totalDocs: number
  totalPages: number
  page: number
}> {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'comments',
    where: {
      and: [
        { insight: { equals: insightId } },
        ...(draft ? [] : [{ approved: { equals: true } }]),
      ],
    },
    sort: 'createdAt',
    page,
    limit,
    pagination: true,
    draft,
  })

  return {
    docs: result.docs as Comment[],
    totalDocs: result.totalDocs,
    totalPages: result.totalPages,
    page: result.page || 1,
  }
}

/**
 * Returns a cached function for approved comments on a given insight, tagged
 * per-insight so new approvals revalidate only that insight's comment thread.
 */
export const getCachedComments = (args: GetCommentsArgs) =>
  unstable_cache(
    async () => getComments(args),
    ['comments', String(args.insightId), String(args.page), String(args.limit)],
    {
      tags: [`comments_${args.insightId}`],
    },
  )
