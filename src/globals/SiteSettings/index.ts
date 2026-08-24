import type { GlobalConfig } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { link } from '@/fields/link'
import { revalidateSiteSettings } from './hooks/revalidateSiteSettings'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          fields: [
            {
              name: 'siteName',
              type: 'text',
              required: true,
            },
            {
              name: 'name',
              type: 'text',
              required: true,
              admin: {
                description: 'Display name, e.g. "Martins Michael".',
              },
            },
            {
              name: 'roles',
              type: 'array',
              admin: {
                description: 'Hero roles, e.g. "Full-Stack Developer" and "AI Architect".',
                initCollapsed: true,
              },
              fields: [
                {
                  name: 'role',
                  type: 'text',
                },
              ],
            },
            {
              name: 'tagline',
              type: 'textarea',
            },
            {
              name: 'availability',
              type: 'text',
            },
            {
              name: 'location',
              type: 'text',
            },
            {
              name: 'email',
              type: 'email',
            },
            {
              name: 'calendlyUrl',
              type: 'text',
            },
            {
              name: 'socials',
              type: 'array',
              admin: {
                initCollapsed: true,
              },
              fields: [
                {
                  name: 'label',
                  type: 'text',
                },
                {
                  name: 'url',
                  type: 'text',
                },
              ],
            },
          ],
          label: 'Identity',
        },
        {
          fields: [
            {
              name: 'heroHeadline',
              type: 'textarea',
              admin: {
                description: 'Large homepage headline.',
              },
            },
            {
              name: 'heroIntro',
              type: 'richText',
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    FixedToolbarFeature(),
                    InlineToolbarFeature(),
                    HorizontalRuleFeature(),
                  ]
                },
              }),
            },
            {
              name: 'metrics',
              type: 'array',
              admin: {
                description: 'Homepage metrics bar.',
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
            {
              name: 'terminalLines',
              type: 'array',
              admin: {
                description: 'Terminal mock panel lines shown in the hero.',
                initCollapsed: true,
              },
              fields: [
                {
                  name: 'prompt',
                  type: 'text',
                  admin: {
                    description: 'Prompt symbol, e.g. "$" or ">".',
                  },
                },
                {
                  name: 'text',
                  type: 'text',
                },
              ],
            },
            {
              name: 'clients',
              type: 'array',
              admin: {
                description: 'Trusted-by client logos.',
                initCollapsed: true,
              },
              fields: [
                {
                  name: 'name',
                  type: 'text',
                },
                {
                  name: 'type',
                  type: 'text',
                },
              ],
            },
            {
              name: 'cta',
              type: 'group',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                },
                {
                  name: 'subtitle',
                  type: 'textarea',
                },
                {
                  name: 'primaryLabel',
                  type: 'text',
                },
                {
                  name: 'primaryTo',
                  type: 'text',
                },
                {
                  name: 'secondaryLabel',
                  type: 'text',
                },
                {
                  name: 'secondaryTo',
                  type: 'text',
                },
              ],
            },
          ],
          label: 'Homepage',
        },
        {
          fields: [
            {
              name: 'contactIntro',
              type: 'richText',
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    FixedToolbarFeature(),
                    InlineToolbarFeature(),
                    HorizontalRuleFeature(),
                  ]
                },
              }),
            },
            {
              name: 'contactChannels',
              type: 'array',
              admin: {
                initCollapsed: true,
              },
              fields: [
                {
                  name: 'label',
                  type: 'text',
                },
                {
                  name: 'url',
                  type: 'text',
                },
              ],
            },
            {
              name: 'projectTypes',
              type: 'array',
              admin: {
                initCollapsed: true,
              },
              fields: [
                {
                  name: 'type',
                  type: 'text',
                },
              ],
            },
            {
              name: 'budgetRanges',
              type: 'array',
              admin: {
                initCollapsed: true,
              },
              fields: [
                {
                  name: 'range',
                  type: 'text',
                },
              ],
            },
            {
              name: 'timelines',
              type: 'array',
              admin: {
                initCollapsed: true,
              },
              fields: [
                {
                  name: 'timeline',
                  type: 'text',
                },
              ],
            },
            {
              name: 'contactSteps',
              type: 'array',
              admin: {
                initCollapsed: true,
              },
              fields: [
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
            {
              name: 'contactFaq',
              type: 'array',
              admin: {
                initCollapsed: true,
              },
              fields: [
                {
                  name: 'question',
                  type: 'text',
                },
                {
                  name: 'answer',
                  type: 'textarea',
                },
              ],
            },
          ],
          label: 'Contact',
        },
        {
          fields: [
            {
              name: 'footerNote',
              type: 'textarea',
              admin: {
                description: 'Short brand description shown under the logo in the footer.',
              },
            },
            {
              name: 'navigateLabel',
              type: 'text',
              admin: { description: 'Footer column heading, e.g. "// NAVIGATE".' },
            },
            {
              name: 'connectLabel',
              type: 'text',
              admin: { description: 'Social links column heading, e.g. "// CONNECT".' },
            },
            {
              name: 'contactColumnLabel',
              type: 'text',
              admin: { description: 'Contact column heading, e.g. "// CONTACT & AVAILABILITY".' },
            },
            {
              name: 'responseTimeNote',
              type: 'text',
              admin: { description: 'e.g. "Typical response time: < 24h on weekdays."' },
            },
            {
              name: 'timezoneNote',
              type: 'text',
              admin: { description: 'e.g. "Based in GMT+1".' },
            },
            {
              name: 'copyrightText',
              type: 'textarea',
              admin: { description: 'Bottom-left copyright line. Use {year} to inject the year.' },
            },
            {
              name: 'statusLabel',
              type: 'text',
              admin: { description: 'Bottom-right status badge text, e.g. "SYSTEM_ONLINE · v2.0.26".' },
            },
            {
              name: 'footerLinks',
              type: 'array',
              admin: {
                initCollapsed: true,
              },
              fields: [
                link({
                  appearances: false,
                }),
              ],
            },
          ],
          label: 'Footer',
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateSiteSettings],
  },
  versions: false,
}