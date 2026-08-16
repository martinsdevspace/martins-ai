import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { revalidateCaseStudy, revalidateDelete } from './hooks/revalidateCaseStudy'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

export const CaseStudies: CollectionConfig = {
  slug: 'case-studies',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultPopulate: {
    slug: true,
    category: true,
    client: true,
    industry: true,
    meta: {
      description: true,
    },
  },
  admin: {
    defaultColumns: ['category', 'client', 'industry', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: data?.slug,
          collection: 'case-studies',
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: data?.slug as string,
        collection: 'case-studies',
        req,
      }),
    useAsTitle: 'client',
  },
  fields: [
    {
      name: 'slug',
      type: 'slug',
      admin: {
        description: 'Used as the URL path segment for this case study.',
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [
            {
              name: 'category',
              type: 'text',
            },
            {
              name: 'client',
              type: 'text',
            },
            {
              name: 'industry',
              type: 'text',
            },
            {
              name: 'projectSlug',
              type: 'relationship',
              admin: {
                description: 'Related project.',
              },
              relationTo: 'projects',
            },
            {
              name: 'whyItMatters',
              type: 'textarea',
            },
            {
              name: 'initialSituation',
              type: 'textarea',
            },
            {
              name: 'scope',
              type: 'textarea',
            },
            {
              name: 'keyDecision',
              type: 'textarea',
            },
            {
              name: 'outcome',
              type: 'textarea',
            },
            {
              name: 'systemsAffected',
              type: 'textarea',
            },
            {
              name: 'metrics',
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
              name: 'tags',
              type: 'array',
              admin: {
                initCollapsed: true,
              },
              fields: [
                {
                  name: 'tag',
                  type: 'text',
                },
              ],
            },
          ],
          label: 'Content',
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
      name: 'sortOrder',
      type: 'number',
      admin: {
        description: 'Lower values appear first.',
        position: 'sidebar',
      },
    },
  ],
  hooks: {
    afterChange: [revalidateCaseStudy],
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