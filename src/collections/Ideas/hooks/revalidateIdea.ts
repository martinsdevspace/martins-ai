import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Idea } from '../../../payload-types'

export const revalidateIdea: CollectionAfterChangeHook<Idea> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const path = `/ideas/${doc.slug}`

      payload.logger.info(`Revalidating idea at path: ${path}`)

      revalidatePath(path)
      revalidatePath('/ideas')
      revalidatePath('/')
      revalidateTag('ideas-sitemap', 'max')
    }

    if (previousDoc._status === 'published' && doc._status !== 'published') {
      const oldPath = `/ideas/${previousDoc.slug}`

      payload.logger.info(`Revalidating old idea at path: ${oldPath}`)

      revalidatePath(oldPath)
      revalidatePath('/ideas')
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Idea> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    const path = `/ideas/${doc?.slug}`

    revalidatePath(path)
    revalidatePath('/ideas')
    revalidateTag('ideas-sitemap', 'max')
  }

  return doc
}