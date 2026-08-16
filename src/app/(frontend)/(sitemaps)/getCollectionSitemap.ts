import { getServerSideSitemap } from 'next-sitemap'
import { getPayload } from 'payload'
import config from '@payload-config'

type Collection = 'projects' | 'services' | 'industries' | 'case-studies'

const collectionPath: Record<Collection, string> = {
  projects: 'works',
  services: 'services',
  industries: 'industries',
  'case-studies': 'case-studies',
}

export async function getCollectionSitemap(collection: Collection, tag: string) {
  const urls = await getCollectionUrls(collection, tag)

  return getServerSideSitemap(urls)
}

async function getCollectionUrls(collection: Collection, tag: string) {
  const payload = await getPayload({ config })
  const SITE_URL =
    process.env.NEXT_PUBLIC_SERVER_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    'https://example.com'

  const results = await payload.find({
    collection,
    overrideAccess: false,
    draft: false,
    depth: 0,
    limit: 1000,
    pagination: false,
    where: {
      _status: {
        equals: 'published',
      },
    },
    select: {
      slug: true,
      updatedAt: true,
    },
  })

  const dateFallback = new Date().toISOString()
  const base = collectionPath[collection]

  return [
    { loc: `${SITE_URL}/${base}`, lastmod: dateFallback },
    ...(results.docs ?? [])
      .filter((doc) => Boolean(doc?.slug))
      .map((doc) => ({
        loc: `${SITE_URL}/${base}/${doc?.slug}`,
        lastmod: doc.updatedAt || dateFallback,
      })),
  ]
}