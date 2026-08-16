import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Testimonial } from '../../../payload-types'

export const revalidateTestimonial: CollectionAfterChangeHook<Testimonial> = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating testimonials`)

    revalidatePath('/', 'layout')
    revalidateTag('testimonials-sitemap', 'max')
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Testimonial> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    revalidatePath('/', 'layout')
    revalidateTag('testimonials-sitemap', 'max')
  }
  return doc
}