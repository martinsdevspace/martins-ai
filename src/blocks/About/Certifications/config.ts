import type { Block } from 'payload'

export const CertificationsBlock: Block = {
  slug: 'certifications',
  interfaceName: 'CertificationsBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Credentials',
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
          name: 'issuer',
          type: 'text',
        },
        {
          name: 'year',
          type: 'text',
        },
      ],
    },
  ],
}
