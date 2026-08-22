import type { Block } from 'payload'

import { longFormLexical } from '@/globals/shared/longFormLexical'

export const OriginStoryBlock: Block = {
  slug: 'originStory',
  interfaceName: 'OriginStoryBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Where it started',
    },
    {
      name: 'content',
      type: 'richText',
      editor: longFormLexical,
    },
  ],
}
