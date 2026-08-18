import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { mcpPlugin } from '@payloadcms/plugin-mcp'
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { searchPlugin } from '@payloadcms/plugin-search'
import { Plugin } from 'payload'
import { revalidateRedirects } from '@/hooks/revalidateRedirects'
import { GenerateTitle, GenerateURL, GenerateDescription } from '@payloadcms/plugin-seo/types'
import { FixedToolbarFeature, HeadingFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { searchFields } from '@/search/fieldOverrides'
import { beforeSyncWithSearch } from '@/search/beforeSync'

import { Insight, Page } from '@/payload-types'
import { getServerSideURL } from '@/utilities/getURL'
import { lexicalToPlainText, truncateForMeta } from '@/utilities/lexicalToPlainText'

const generateTitle: GenerateTitle<Insight | Page> = ({ doc }) => {
  return doc?.title ? `${doc.title} | Martin's AI` : "Martin's AI"
}

const generateURL: GenerateURL<Insight | Page> = ({ doc }) => {
  const url = getServerSideURL()

  return doc?.slug ? `${url}/${doc.slug}` : url
}

/**
 * Falls back to an auto-generated description derived from the document's
 * richText content whenever an editor hasn't written one manually, so pages
 * never ship with an empty meta description.
 */
const generateDescription: GenerateDescription<Insight | Page> = ({ doc }) => {
  const insight = doc as Partial<Insight>
  const page = doc as Partial<Page>

  const richTextSource = insight?.content ?? findFirstContentBlock(page?.layout)

  if (!richTextSource) return ''

  const plainText = lexicalToPlainText(richTextSource)

  return plainText ? truncateForMeta(plainText) : ''
}

/**
 * Pages are block-based (no single `content` field), so we look for the
 * first Content block's first richText column to source a description from.
 */
function findFirstContentBlock(layout: Page['layout'] | undefined) {
  if (!Array.isArray(layout)) return undefined

  for (const block of layout) {
    if (block.blockType === 'content' && Array.isArray(block.columns)) {
      const column = block.columns.find((col) => col.richText)
      if (column?.richText) return column.richText
    }
  }

  return undefined
}

export const plugins: Plugin[] = [
  mcpPlugin({
    collections: {
      // Public content — safe for an MCP client to read, but never to
      // write or delete via the protocol. Payload's own access control
      // still applies underneath this on top of these tool-level gates.
      insights: {
        description: 'Articles, guides and essays published on the site.',
        tools: { create: false, update: false, delete: false },
      },
      projects: {
        description: 'Production products and systems built.',
        tools: { create: false, update: false, delete: false },
      },
      services: {
        description: 'Professional services offered.',
        tools: { create: false, update: false, delete: false },
      },
      industries: {
        description: 'Industry verticals served.',
        tools: { create: false, update: false, delete: false },
      },
      'case-studies': {
        description: 'Detailed project case studies.',
        tools: { create: false, update: false, delete: false },
      },
      pages: {
        description: 'Content pages.',
        tools: { create: false, update: false, delete: false },
      },
      categories: {
        description: 'Categories used to group insights.',
        tools: { create: false, update: false, delete: false },
      },
      testimonials: {
        description: 'Client testimonials displayed on the site.',
        tools: { create: false, update: false, delete: false },
      },
      media: {
        description: 'Media library.',
        tools: { create: false, update: false, delete: false },
      },
      // Payload v4's plugin-mcp exposes every collection with full CRUD
      // by default (opt-out model). A prior pass here tried to disable
      // these with `{ enabled: false }` — that key doesn't exist on
      // MCPPluginCollectionConfig (confirmed against the installed
      // package's types after finally running a real typecheck), so it
      // was silently ignored by TypeScript's structural typing and did
      // NOT actually disable anything at runtime. `users`, `form-submissions`,
      // and `leads` were fully exposed with complete CRUD this whole time.
      // The real mechanism is setting every built-in tool name to `false`
      // individually — there's no single top-level switch.
      users: {
        description: 'Internal — not exposed via MCP.',
        tools: {
          count: false,
          create: false,
          delete: false,
          duplicate: false,
          find: false,
          findDistinct: false,
          getCollectionSchema: false,
          getUploadInstructions: false,
          update: false,
          // Auth tools are opt-IN — only `true` or an override object is valid.
          // Enable login for interactive MCP use and token generation.
          login: true,
        },
      },
      'form-submissions': {
        description: 'Internal — not exposed via MCP.',
        tools: {
          count: false,
          create: false,
          delete: false,
          duplicate: false,
          find: false,
          findDistinct: false,
          getCollectionSchema: false,
          getUploadInstructions: false,
          update: false,
        },
      },
      // Contains visitor contact details captured by the chat widget and
      // contact form — same reasoning as `users`/`form-submissions` above.
      leads: {
        description: 'Internal — not exposed via MCP.',
        tools: {
          count: false,
          create: false,
          delete: false,
          duplicate: false,
          find: false,
          findDistinct: false,
          getCollectionSchema: false,
          getUploadInstructions: false,
          update: false,
        },
      },
    },
    globals: {
      'site-settings': {
        description: 'Global site settings and identity.',
        tools: { update: false },
      },
      about: { description: 'About page content.', tools: { update: false } },
      now: { description: '"Now" page content.', tools: { update: false } },
      resume: { description: 'Resume/CV content.', tools: { update: false } },
      uses: { description: '"Uses" page content (tools, gear, setup).', tools: { update: false } },
    },
  }),
  redirectsPlugin({
    collections: ['pages', 'insights'],
    overrides: {
      // @ts-expect-error - This is a valid override, mapped fields don't resolve to the same type
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if ('name' in field && field.name === 'from') {
            return {
              ...field,
              admin: {
                description: 'You will need to rebuild the website when changing this field.',
              },
            }
          }
          return field
        })
      },
      hooks: {
        afterChange: [revalidateRedirects],
      },
    },
  }),
  nestedDocsPlugin({
    collections: ['categories'],
    generateURL: (docs) => docs.reduce((url, doc) => `${url}/${doc.slug}`, ''),
  }),
  seoPlugin({
    generateTitle,
    generateURL,
    generateDescription,
  }),
  formBuilderPlugin({
    fields: {
      payment: false,
    },
    formOverrides: {
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if ('name' in field && field.name === 'confirmationMessage') {
            return {
              ...field,
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    FixedToolbarFeature(),
                    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                  ]
                },
              }),
            }
          }
          return field
        })
      },
    },
  }),
  searchPlugin({
    collections: ['insights'],
    beforeSync: beforeSyncWithSearch,
    searchOverrides: {
      fields: ({ defaultFields }) => {
        return [...defaultFields, ...searchFields]
      },
    },
  }),
]
