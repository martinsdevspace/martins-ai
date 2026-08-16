import type { CollectionConfig } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { revalidateDelete, revalidateService } from './hooks/revalidateService'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

export const Services: CollectionConfig = {
  slug: 'services',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultPopulate: {
    title: true,
    slug: true,
    num: true,
    tagline: true,
    startingFrom: true,
    timeline: true,
    meta: {
      description: true,
    },
  },
  admin: {
    defaultColumns: ['title', 'num', 'timeline', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: data?.slug,
          collection: 'services',
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: data?.slug as string,
        collection: 'services',
        req,
      }),
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [
            {
              name: 'num',
              type: 'text',
              admin: {
                description: 'Display number, e.g. "01".',
                width: '25%',
              },
            },
            {
              name: 'icon',
              type: 'text',
              admin: {
                description: 'Icon name used by the frontend, e.g. "Code2".',
                width: '75%',
              },
            },
            {
              name: 'tagline',
              type: 'text',
            },
            {
              name: 'description',
              type: 'richText',
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
                    FixedToolbarFeature(),
                    InlineToolbarFeature(),
                    HorizontalRuleFeature(),
                  ]
                },
              }),
              label: false,
            },
            {
              name: 'deliverables',
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
            {
              name: 'timeline',
              type: 'text',
            },
            {
              name: 'startingFrom',
              type: 'text',
            },
          ],
          label: 'Content',
        },
        {
          fields: [
            {
              name: 'process',
              type: 'array',
              admin: {
                description: 'Steps the client goes through when engaging this service.',
                initCollapsed: true,
              },
              fields: [
                {
                  name: 'num',
                  type: 'text',
                },
                {
                  name: 'title',
                  type: 'text',
                },
                {
                  name: 'description',
                  type: 'text',
                },
              ],
            },
            {
              name: 'code',
              type: 'group',
              admin: {
                description: 'Optional code sample shown on the service detail page.',
              },
              fields: [
                {
                  name: 'language',
                  type: 'text',
                },
                {
                  name: 'title',
                  type: 'text',
                },
                {
                  name: 'code',
                  type: 'code',
                },
              ],
            },
            {
              name: 'pricing',
              type: 'array',
              admin: {
                description: 'Engagement models.',
                initCollapsed: true,
              },
              fields: [
                {
                  name: 'name',
                  type: 'text',
                },
                {
                  name: 'description',
                  type: 'text',
                },
                {
                  name: 'best',
                  type: 'text',
                },
              ],
            },
            {
              name: 'faq',
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
          label: 'Process & Details',
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),

            MetaDescriptionField({}),
            PreviewField({
              hasGenerateFn: true,
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        position: 'sidebar',
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === 'published' && !value) {
              return new Date()
            }
            return value
          },
        ],
      },
    },
    {
      name: 'slug',
      type: 'slug',
      useAsSlug: 'title',
    },
  ],
  hooks: {
    afterChange: [revalidateService],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
autosave: {
      interval: 100,
    },
    schedulePublish: true,
  },
  maxPerDoc: 50,
  },
}