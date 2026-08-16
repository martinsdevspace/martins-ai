import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'

/**
 * Captures inquiries the chat widget's `saveInquiry` tool records on a
 * visitor's behalf. Deliberately locked down at the access-control layer —
 * the tool that writes to this collection runs server-side inside the
 * `/api/chat` route via Payload's *local* API (not a public REST call), so
 * there is no public `create` access to abuse. See `src/lib/chat-tools.ts`.
 */
export const Leads: CollectionConfig = {
  slug: 'leads',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'email', 'projectType', 'source', 'status', 'createdAt'],
    useAsTitle: 'name',
    description: "Inquiries captured by the site's chat widget and contact form.",
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
    },
    {
      name: 'projectType',
      type: 'text',
      admin: {
        description: 'The type of project or engagement, if stated.',
      },
    },
    {
      name: 'source',
      type: 'select',
      defaultValue: 'chat',
      options: [
        { label: 'Chat widget', value: 'chat' },
        { label: 'Contact form', value: 'contact-form' },
        { label: 'Other', value: 'other' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Contacted', value: 'contacted' },
        { label: 'Closed', value: 'closed' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
  ],
  timestamps: true,
}
