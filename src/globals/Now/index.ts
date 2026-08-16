import type { GlobalConfig } from 'payload'

import {
  FixedToolbarFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { revalidateNow } from './hooks/revalidateNow'

export const Now: GlobalConfig = {
  slug: 'now',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'updated',
      type: 'text',
      admin: {
        description: 'Display label, e.g. "AUGUST_2026".',
      },
    },
    {
      name: 'intro',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature(), HorizontalRuleFeature()]
        },
      }),
    },
    {
      name: 'blocks',
      type: 'array',
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          admin: {
            description: 'Mono label, e.g. "CURRENTLY_BUILDING".',
          },
        },
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'items',
          type: 'array',
          admin: {
            initCollapsed: true,
          },
          fields: [
            {
              name: 'name',
              type: 'text',
            },
            {
              name: 'detail',
              type: 'text',
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateNow],
  },
  versions: false,
}