import type { GlobalConfig } from 'payload'

import {
  FixedToolbarFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { revalidateResume } from './hooks/revalidateResume'

export const Resume: GlobalConfig = {
  slug: 'resume',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      admin: {
        description: 'Role line shown under the name, e.g. "Full-Stack Developer & AI Architect".',
      },
    },
    {
      name: 'email',
      type: 'email',
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'location',
      type: 'text',
    },
    {
      name: 'website',
      type: 'text',
    },
    {
      name: 'linkedin',
      type: 'text',
    },
    {
      name: 'github',
      type: 'text',
    },
    {
      name: 'version',
      type: 'text',
      admin: {
        description: 'Display version, e.g. "v2025.08".',
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [
            {
              name: 'highlights',
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
            {
              name: 'summary',
              type: 'richText',
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature(), HorizontalRuleFeature()]
                },
              }),
            },
          ],
          label: 'Overview',
        },
        {
          fields: [
            {
              name: 'experience',
              type: 'array',
              admin: {
                initCollapsed: true,
              },
              fields: [
                {
                  name: 'role',
                  type: 'text',
                },
                {
                  name: 'company',
                  type: 'text',
                },
                {
                  name: 'period',
                  type: 'text',
                },
                {
                  name: 'location',
                  type: 'text',
                },
                {
                  name: 'summary',
                  type: 'textarea',
                },
                {
                  name: 'achievements',
                  type: 'array',
                  admin: {
                    initCollapsed: true,
                  },
                  fields: [
                    {
                      name: 'achievement',
                      type: 'text',
                    },
                  ],
                },
                {
                  name: 'stack',
                  type: 'array',
                  admin: {
                    initCollapsed: true,
                  },
                  fields: [
                    {
                      name: 'tech',
                      type: 'text',
                    },
                  ],
                },
              ],
            },
          ],
          label: 'Experience',
        },
        {
          fields: [
            {
              name: 'education',
              type: 'array',
              admin: {
                initCollapsed: true,
              },
              fields: [
                {
                  name: 'degree',
                  type: 'text',
                },
                {
                  name: 'institution',
                  type: 'text',
                },
                {
                  name: 'period',
                  type: 'text',
                },
                {
                  name: 'detail',
                  type: 'text',
                },
              ],
            },
          ],
          label: 'Education',
        },
        {
          fields: [
            {
              name: 'skills',
              type: 'array',
              admin: {
                initCollapsed: true,
              },
              fields: [
                {
                  name: 'category',
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
                      name: 'item',
                      type: 'text',
                    },
                  ],
                },
              ],
            },
            {
              name: 'certifications',
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
            {
              name: 'speaking',
              type: 'array',
              admin: {
                initCollapsed: true,
              },
              fields: [
                {
                  name: 'event',
                  type: 'text',
                },
                {
                  name: 'title',
                  type: 'text',
                },
                {
                  name: 'year',
                  type: 'text',
                },
              ],
            },
          ],
          label: 'Skills & Credentials',
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateResume],
  },
  versions: false,
}