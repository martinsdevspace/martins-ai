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