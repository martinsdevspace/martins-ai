import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidateTag } from 'next/cache'

export const revalidateComment: CollectionAfterChangeHook = ({ doc, req: { payload, context } }) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating comments for insight ${doc.insight}`)

    if (doc.insight) {
      revalidateTag(`comments_${doc.insight}`, 'max')
    }
  }

  return doc
}

export const revalidateCommentDelete: CollectionAfterDeleteHook = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating comments for insight ${doc.insight}`)

    if (doc.insight) {
      revalidateTag(`comments_${doc.insight}`, 'max')
    }
  }

  return doc
}
