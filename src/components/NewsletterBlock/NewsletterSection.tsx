import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'

import { NewsletterBlock } from '@/components/NewsletterBlock'

/**
 * Looks up the "Newsletter Form" doc by title (same pattern the Contact
 * page already uses for "Contact Form") rather than storing its ID
 * somewhere — one less piece of config to keep in sync.
 */
export async function NewsletterSection({ className }: { className?: string }) {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'forms',
    depth: 0,
    limit: 1,
    where: {
      title: { equals: 'Newsletter Form' },
    },
  })

  const form = result.docs?.[0]
  if (!form) return null

  return <NewsletterBlock formId={form.id} className={className} />
}
