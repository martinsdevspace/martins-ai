import type { GlobalConfig } from 'payload'

import { longFormLexical } from '@/globals/shared/longFormLexical'

import { revalidateSpeaking } from './hooks/revalidateSpeaking'

export const Speaking: GlobalConfig = {
  slug: 'speaking',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'intro',
      type: 'richText',
      editor: longFormLexical,
    },
    {
      name: 'talks',
      type: 'array',
      admin: {
        initCollapsed: true,
        description: 'Past and upcoming talks, panels and workshops.',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'event',
          type: 'text',
        },
        {
          name: 'year',
          type: 'text',
          admin: {
            description: 'e.g. "2026" or "Mar 2026".',
          },
        },
        {
          name: 'location',
          type: 'text',
        },
        {
          name: 'link',
          type: 'text',
          admin: {
            description: 'Optional link to the talk, recording or slides.',
          },
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'featured',
          type: 'checkbox',
          defaultValue: false,
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateSpeaking],
  },
  versions: false,
}
