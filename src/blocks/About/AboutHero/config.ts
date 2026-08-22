import type { Block } from 'payload'

import { longFormLexical } from '@/globals/shared/longFormLexical'

export const AboutHeroBlock: Block = {
  slug: 'aboutHero',
  interfaceName: 'AboutHeroBlock',
  fields: [
    {
      name: 'portrait',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'headline',
      type: 'textarea',
      admin: {
        description: 'About page headline, e.g. "The Architect Behind the Code."',
      },
    },
    {
      name: 'intro',
      type: 'richText',
      editor: longFormLexical,
    },
    {
      name: 'stats',
      type: 'array',
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'value',
          type: 'text',
        },
        {
          name: 'label',
          type: 'text',
        },
      ],
    },
  ],
}
