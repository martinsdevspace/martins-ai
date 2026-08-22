import type { Block } from 'payload'

import { longFormLexical } from '@/globals/shared/longFormLexical'

export const PhilosophyBlock: Block = {
  slug: 'philosophy',
  interfaceName: 'PhilosophyBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'How I think',
    },
    {
      name: 'intro',
      type: 'richText',
      editor: longFormLexical,
    },
    {
      name: 'values',
      type: 'array',
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'icon',
          type: 'text',
          admin: {
            description: 'Icon name, e.g. "Shield".',
          },
        },
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'description',
          type: 'textarea',
        },
      ],
    },
  ],
}
