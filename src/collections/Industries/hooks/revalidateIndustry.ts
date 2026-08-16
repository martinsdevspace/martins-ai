import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Industry } from '../../../payload-types'

export const revalidateIndustry: CollectionAfterChangeHook<Industry> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const path = `/industries/${doc.slug}`

      payload.logger.info(`Revalidating industry at path: ${path}`)

      revalidatePath(path)
      revalidatePath('/industries')
      revalidatePath('/')
      revalidateTag('industries-sitemap', 'max')
    }

    if (previousDoc._status === 'published' && doc._status !== 'published') {
      const oldPath = `/industries/${previousDoc.slug}`

      payload.logger.info(`Revalidating old industry at path: ${oldPath}`)

      revalidatePath(oldPath)
      revalidatePath('/industries')
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Industry> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    const path = `/industries/${doc?.slug}`

    revalidatePath(path)
    revalidatePath('/industries')
    revalidateTag('industries-sitemap', 'max')
  }

  return doc
}