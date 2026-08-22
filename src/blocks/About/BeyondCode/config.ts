import type { Block } from 'payload'

export const BeyondCodeBlock: Block = {
  slug: 'beyondCode',
  interfaceName: 'BeyondCodeBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Beyond the code',
    },
    {
      name: 'paragraphs',
      type: 'array',
      admin: {
        initCollapsed: true,
        description: 'Short personal paragraphs — interests, hobbies, the human side.',
      },
      fields: [
        {
          name: 'paragraph',
          type: 'textarea',
        },
      ],
    },
  ],
}
