import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Insight } from '../../../payload-types'

export const revalidateInsight: CollectionAfterChangeHook<Insight> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const path = `/insights/${doc.slug}`

      payload.logger.info(`Revalidating insight at path: ${path}`)

      revalidatePath(path)
      revalidatePath('/insights')
      revalidateTag('insights-sitemap', 'max')
      revalidateTag('insights', 'max')
    }

    // If the insight was previously published, we need to revalidate the old path
    if (previousDoc._status === 'published' && doc._status !== 'published') {
      const oldPath = `/insights/${previousDoc.slug}`

      payload.logger.info(`Revalidating old insight at path: ${oldPath}`)

      revalidatePath(oldPath)
      revalidateTag('insights-sitemap', 'max')
      revalidateTag('insights', 'max')
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Insight> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    const path = `/insights/${doc?.slug}`

    revalidatePath(path)
    revalidateTag('insights-sitemap', 'max')
    revalidateTag('insights', 'max')
  }

  return doc
}