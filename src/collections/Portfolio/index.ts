import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { revalidateDelete, revalidatePortfolio } from './hooks/revalidatePortfolio'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

export const Portfolio: CollectionConfig = {
  slug: 'portfolio',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultPopulate: {
    name: true,
    slug: true,
    tagline: true,
    thumbnail: true,
    category: true,
    year: true,
    featured: true,
    projectStatus: true,
    meta: {
      image: true,
      description: true,
    },
  },
  admin: {
    defaultColumns: ['name', 'category', 'projectStatus', 'year', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: data?.slug,
          collection: 'portfolio',
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: data?.slug as string,
        collection: 'portfolio',
        req,
      }),
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [
            {
              name: 'tagline',
              type: 'text',
            },
            {
              name: 'description',
              type: 'textarea',
            },
            {
              name: 'thumbnail',
              type: 'upload',
              relationTo: 'media',
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
              name: 'stats',
              type: 'group',
              fields: [
                {
                  name: 'loc',
                  type: 'number',
                },
                {
                  name: 'commits',
                  type: 'number',
                },
                {
                  name: 'contributors',
                  type: 'number',
                },
              ],
            },
            {
              name: 'liveUrl',
              type: 'text',
            },
            {
              name: 'github',
              type: 'text',
            },
            {
              name: 'challenge',
              type: 'textarea',
              admin: {
                description: 'The problem this project solved. Rendered in a "The problem" section on the project page.',
              },
            },
            {
              name: 'solution',
              type: 'textarea',
              admin: {
                description: 'The approach taken. Rendered in a "The approach" section on the project page.',
              },
            },
            {
              name: 'architecture',
              type: 'array',
              admin: {
                initCollapsed: true,
                description: 'Key architectural decisions, shown as an "Under the hood" grid.',
              },
              fields: [
                { name: 'title', type: 'text' },
                { name: 'description', type: 'textarea' },
              ],
            },
            {
              name: 'codeSample',
              type: 'group',
              admin: {
                description: 'One representative code sample shown alongside the architecture section.',
              },
              fields: [
                { name: 'title', type: 'text', admin: { description: 'e.g. "PaymentPipeline.php"' } },
                {
                  name: 'language',
                  type: 'select',
                  options: [
                    'typescript',
                    'javascript',
                    'php',
                    'python',
                    'sql',
                    'go',
                    'bash',
                    'json',
                    'yaml',
                  ].map((l) => ({ label: l, value: l })),
                },
                { name: 'code', type: 'code' },
              ],
            },
            {
              name: 'features',
              type: 'array',
              admin: {
                initCollapsed: true,
                description: 'Shipped features, shown as a checklist under "What was built".',
              },
              fields: [{ name: 'feature', type: 'text' }],
            },
            {
              name: 'resultMetrics',
              type: 'array',
              admin: {
                initCollapsed: true,
                description: 'Outcome metrics shown under "The outcome" (e.g. "99.97%" / "Uptime").',
              },
              fields: [
                { name: 'value', type: 'text' },
                { name: 'label', type: 'text' },
              ],
            },
            {
              name: 'lessons',
              type: 'array',
              admin: {
                initCollapsed: true,
                description: 'Lessons learned, shown under "The outcome".',
              },
              fields: [{ name: 'lesson', type: 'textarea' }],
            },
            {
              name: 'developmentTimeline',
              type: 'array',
              admin: {
                initCollapsed: true,
                description: 'Build phases, shown as a vertical timeline ("How it unfolded").',
              },
              fields: [
                { name: 'period', type: 'text', admin: { description: 'e.g. "Month 1" or "Week 1–2"' } },
                { name: 'phase', type: 'text' },
                { name: 'description', type: 'textarea' },
                { name: 'hurdle', type: 'textarea', admin: { description: 'Optional — a specific obstacle hit during this phase.' } },
                { name: 'milestone', type: 'textarea', admin: { description: 'Optional — a specific milestone hit during this phase.' } },
              ],
            },
          ],
          label: 'Content',
        },
        {
          fields: [
            {
              name: 'projectStatus',
              type: 'select',
              admin: {
                position: 'sidebar',
              },
              defaultValue: 'COMPLETED',
              options: [
                {
                  label: 'Completed',
                  value: 'COMPLETED',
                },
                {
                  label: 'In Progress',
                  value: 'IN_PROGRESS',
                },
              ],
            },
            {
              name: 'category',
              type: 'text',
            },
            {
              name: 'industry',
              type: 'relationship',
              admin: {
                position: 'sidebar',
              },
              relationTo: 'industries',
            },
            {
              name: 'year',
              type: 'number',
            },
            {
              name: 'featured',
              type: 'checkbox',
              defaultValue: false,
            },
            {
              name: 'sortOrder',
              type: 'number',
              admin: {
                description: 'Lower values appear first.',
              },
            },
          ],
          label: 'Meta',
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
      useAsSlug: 'name',
    },
  ],
  hooks: {
    afterChange: [revalidatePortfolio],
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