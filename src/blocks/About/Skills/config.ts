import type { Block } from 'payload'

export const SkillsBlock: Block = {
  slug: 'skills',
  interfaceName: 'SkillsBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'The stack',
    },
    {
      name: 'categories',
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
          name: 'tools',
          type: 'text',
        },
        {
          name: 'context',
          type: 'text',
        },
      ],
    },
  ],
}
