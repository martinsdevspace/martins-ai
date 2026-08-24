import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { revalidateIdea, revalidateDelete } from './hooks/revalidateIdea'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

export const Ideas: CollectionConfig = {
  slug: 'ideas',
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
          collection: 'ideas',
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: data?.slug as string,
        collection: 'ideas',
        req,
      }),
    useAsTitle: 'client',
  },
  fields: [
    {
      name: 'slug',
      type: 'slug',
      admin: {
        description: 'Used as the URL path segment for this idea.',
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
              admin: {
                description: 'Who this idea is for (optional reference client or engagement).',
              },
            },
            {
              name: 'industry',
              type: 'text',
            },
            {
              name: 'projectSlug',
              type: 'relationship',
              admin: {
                description:
                  'Related built platform (Portfolio entry), if this idea maps to something already shipped.',
              },
              relationTo: 'portfolio',
            },
            {
              name: 'overview',
              type: 'textarea',
              admin: {
                description: 'What this engagement is, in one screen. Shown as the lead on the idea page.',
              },
            },
            {
              name: 'audience',
              type: 'textarea',
              admin: {
                description: 'Who this is for — the team or problem this idea targets.',
              },
            },
            {
              name: 'outcomePromise',
              type: 'textarea',
              admin: {
                description: 'What you walk away with if we build this.',
              },
            },
            {
              name: 'startingFrom',
              type: 'text',
              admin: {
                description: 'Indicative budget or timeline, e.g. "From $8k" or "4–6 weeks".',
              },
            },
            {
              name: 'deliverables',
              type: 'array',
              admin: {
                initCollapsed: true,
                description: 'What is included if we build this idea.',
              },
              fields: [{ name: 'item', type: 'text' }],
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
    afterChange: [revalidateIdea],
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