import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { revalidateDelete, revalidateTestimonial } from './hooks/revalidateTestimonial'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultPopulate: {
    author: true,
    role: true,
    company: true,
    quote: true,
    avatar: true,
    featured: true,
  },
  admin: {
    defaultColumns: ['author', 'role', 'company', 'featured', 'updatedAt'],
    useAsTitle: 'author',
  },
  fields: [
    {
      name: 'author',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      type: 'text',
    },
    {
      name: 'company',
      type: 'text',
    },
    {
      name: 'quote',
      type: 'textarea',
      required: true,
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Featured testimonials appear in the homepage section.',
      },
    },
    {
      name: 'sortOrder',
      type: 'number',
      admin: {
        description: 'Lower values appear first.',
      },
    },
  ],
  hooks: {
    afterChange: [revalidateTestimonial],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
    },
    maxPerDoc: 50,
  },
}