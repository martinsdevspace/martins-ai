import type { GlobalConfig } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { revalidateAbout } from './hooks/revalidateAbout'

export const About: GlobalConfig = {
  slug: 'about',
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
              name: 'portrait',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'heroHeadline',
              type: 'textarea',
              admin: {
                description: 'About page headline, e.g. "The Architect Behind the Code."',
              },
            },
            {
              name: 'intro',
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
          label: 'Hero & Profile',
        },
        {
          fields: [
            {
              name: 'originHeading',
              type: 'text',
            },
            {
              name: 'originStory',
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
          ],
          label: 'Origin Story',
        },
        {
          fields: [
            {
              name: 'valuesHeading',
              type: 'text',
            },
            {
              name: 'valuesIntro',
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
          label: 'Philosophy',
        },
        {
          fields: [
            {
              name: 'timelineHeading',
              type: 'text',
            },
            {
              name: 'timeline',
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
          label: 'Timeline',
        },
        {
          fields: [
            {
              name: 'skillsHeading',
              type: 'text',
            },
            {
              name: 'skillCategories',
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
          label: 'Skills',
        },
        {
          fields: [
            {
              name: 'speakingHeading',
              type: 'text',
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
                {
                  name: 'location',
                  type: 'text',
                },
              ],
            },
            {
              name: 'beyondCodeHeading',
              type: 'text',
              admin: {
                description: 'e.g. "Beyond the code."',
              },
            },
            {
              name: 'beyondCode',
              type: 'array',
              admin: {
                initCollapsed: true,
                description: 'Short personal paragraphs — interests, hobbies, the human side. Shown between Skills and Speaking/Certifications.',
              },
              fields: [
                {
                  name: 'paragraph',
                  type: 'textarea',
                },
              ],
            },
            {
              name: 'certificationsHeading',
              type: 'text',
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
          ],
          label: 'Speaking & Credentials',
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateAbout],
  },
  versions: false,
}