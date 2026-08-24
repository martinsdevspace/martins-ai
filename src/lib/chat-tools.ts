import { tool } from 'ai'
import { z } from 'zod'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

/**
 * Maps the resource names the LLM reasons about to real Payload collection
 * slugs. Deliberately does NOT include a `tool` resource — unlike the
 * reference implementation this was adapted from, this app has no `tools`
 * collection (the equivalent content — software/gear used — lives on the
 * `Uses` global, not a queryable collection). `post` was renamed `insight`
 * to match this app's actual collection slug (`insights`), `project` maps
 * to `portfolio`, and `idea` maps to the real `ideas` slug.
 */
const RESOURCE_MAP = {
  portfolio: 'portfolio',
  service: 'services',
  industry: 'industries',
  idea: 'ideas',
  insight: 'insights',
  testimonial: 'testimonials',
} as const

type ResourceKey = keyof typeof RESOURCE_MAP

const resourceEnum = z
  .enum(['portfolio', 'service', 'industry', 'idea', 'insight', 'testimonial'])
  .describe('The content resource type')

/**
 * These tools run inside the `/api/chat` route handler, i.e. server-side in
 * the same Next.js process as the rest of the app — not in the browser.
 * That means they can use Payload's *local* API directly (`getPayload(...)`)
 * instead of making HTTP round-trips to the REST API. This is both faster
 * (no network hop) and more secure than the alternative: it means nothing
 * needs to be reachable over public REST beyond what already is, and
 * `saveInquiry` can write to a fully locked-down `leads` collection without
 * needing a public `create` access rule that anyone could hit directly.
 */
export function createChatTools() {
  return {
    listContent: tool({
      description:
        'List items from a content collection. Valid resource values: portfolio, service, industry, idea, insight, testimonial.',
      inputSchema: z.object({
        resource: resourceEnum,
      }),
      execute: async ({ resource }: { resource: ResourceKey }) => {
        const payload = await getPayload({ config: configPromise })
        const collection = RESOURCE_MAP[resource]

        const result = await payload.find({
          collection,
          depth: 0,
          limit: 20,
          overrideAccess: false, // still only ever return published content
        })

        return { items: result.docs ?? [], total: result.totalDocs ?? 0 }
      },
    }),

    getContent: tool({
      description:
        "Fetch a single content item by slug from one of the same content resource types as listContent.",
      inputSchema: z.object({
        resource: resourceEnum,
        slug: z.string().describe("The item's slug"),
      }),
      execute: async ({ resource, slug }: { resource: ResourceKey; slug: string }) => {
        const payload = await getPayload({ config: configPromise })
        const collection = RESOURCE_MAP[resource]

        const result = await payload.find({
          collection,
          depth: 1,
          limit: 1,
          overrideAccess: false,
          where: {
            slug: { equals: slug },
          },
        })

        return result.docs?.[0] ?? null
      },
    }),

    saveInquiry: tool({
      description:
        "Save a visitor's contact inquiry captured during this conversation (name, email, message, and project type) as a lead. Only use this when the visitor has clearly expressed intent to be contacted back — never invent or save details the visitor didn't provide.",
      inputSchema: z.object({
        name: z
          .string()
          .min(1)
          .max(200)
          .describe("The visitor's name"),
        email: z
          .string()
          .email()
          .max(254)
          .describe("The visitor's email address"),
        message: z
          .string()
          .min(3)
          .max(2000)
          .describe('What the visitor wants help with'),
        project_type: z
          .string()
          .max(200)
          .optional()
          .describe('The type of project or engagement, if stated'),
      }),
      execute: async ({
        name,
        email,
        message,
        project_type,
      }: {
        name: string
        email: string
        message: string
        project_type?: string
      }) => {
        const payload = await getPayload({ config: configPromise })

        const lead = await payload.create({
          collection: 'leads',
          data: {
            name,
            email,
            message,
            projectType: project_type ?? '',
            source: 'chat',
          },
        })

        return { ok: true, contactId: String(lead.id) }
      },
    }),
  }
}
