import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Portfolio } from '../../../payload-types'

export const revalidatePortfolio: CollectionAfterChangeHook<Portfolio> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const path = `/portfolio/${doc.slug}`

      payload.logger.info(`Revalidating portfolio entry at path: ${path}`)

      revalidatePath(path)
      revalidatePath('/portfolio')
      revalidatePath('/')
      revalidateTag('portfolio-sitemap', 'max')
    }

    // If the project was previously published, we need to revalidate the old path
    if (previousDoc._status === 'published' && doc._status !== 'published') {
      const oldPath = `/portfolio/${previousDoc.slug}`

      payload.logger.info(`Revalidating old portfolio entry at path: ${oldPath}`)

      revalidatePath(oldPath)
      revalidatePath('/portfolio')
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Portfolio> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    const path = `/portfolio/${doc?.slug}`

    revalidatePath(path)
    revalidatePath('/portfolio')
    revalidateTag('portfolio-sitemap', 'max')
  }

  return doc
}