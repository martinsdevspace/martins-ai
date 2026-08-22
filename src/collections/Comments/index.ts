import type { CollectionBeforeChangeHook, CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { revalidateComment, revalidateCommentDelete } from './hooks/revalidateComment'

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/

// Server-side guardrails previously enforced by the custom API route, now kept
// at the collection level so the Payload REST endpoint rejects bad input.
export const validateComment: CollectionBeforeChangeHook = ({ data }) => {
  const author = typeof data.author === 'string' ? data.author.trim() : ''
  const email = typeof data.email === 'string' ? data.email.trim() : ''
  const content = typeof data.content === 'string' ? data.content.trim() : ''

  if (!author || !email || !content) {
    throw new Error('Name, email and comment are all required.')
  }
  if (!EMAIL_RE.test(email)) {
    throw new Error('Please provide a valid email address.')
  }
  if (content.length > 2000 || author.length > 120 || email.length > 160) {
    throw new Error('Comment, name or email exceeds the allowed length.')
  }

  // Normalize whitespace before persisting.
  data.author = author
  data.email = email
  data.content = content
  return data
}

export const Comments: CollectionConfig = {
  slug: 'comments',
  access: {
    // Anyone (logged in or not) may post a comment from the public form.
    create: () => true,
    // Only approved comments are readable on the public site.
    read: authenticatedOrPublished,
    update: authenticated,
    delete: authenticated,
  },
  hooks: {
    beforeChange: [validateComment],
    afterChange: [revalidateComment],
    afterDelete: [revalidateCommentDelete],
  },
  timestamps: true,
  fields: [
    {
      name: 'insight',
      type: 'relationship',
      relationTo: 'insights',
      required: true,
      index: true,
      hasMany: false,
    },
    {
      name: 'author',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'content',
      type: 'textarea',
      required: true,
    },
    {
      name: 'approved',
      type: 'checkbox',
      defaultValue: false,
      index: true,
      admin: {
        description: 'Only approved comments are shown publicly on the insight page.',
      },
    },
  ],
}

export default Comments
