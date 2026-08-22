import type { GlobalAfterChangeHook } from 'payload'

import { revalidateTag } from 'next/cache'

export const revalidateSpeaking: GlobalAfterChangeHook = ({ doc, req: { payload, context } }) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating speaking`)

    revalidateTag('global_speaking', 'max')
  }

  return doc
}
