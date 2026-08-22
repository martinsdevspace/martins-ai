import type { Block } from 'payload'

export const TimelineBlock: Block = {
  slug: 'timeline',
  interfaceName: 'TimelineBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'The road so far',
    },
    {
      name: 'items',
      type: 'array',
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'year',
          type: 'text',
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
