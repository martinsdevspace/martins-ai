import type { Metadata } from 'next'

import { IconArrowUpRight } from '@tabler/icons-react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import Link from 'next/link'
import React, { Suspense } from 'react'
import { Search } from '@/search/Component'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'

type Args = {
  searchParams: Promise<{
    q: string
  }>
}

export default function Page({ searchParams: searchParamsPromise }: Args) {
  return (
    <div className="px-5 lg:px-[6vw] pt-24">
      <div className="max-w-3xl">
        <div className="font-mono-label text-synthesis mb-4 flex items-center gap-2">
          <span className="w-1 h-1 bg-synthesis animate-pulse" />
          // — SEARCH
        </div>
        <h1 className="font-heading text-4xl md:text-6xl font-light tracking-tight text-balance">
          Search the build log.
        </h1>
        <p className="mt-4 text-foreground/80">
          Find essays, notes, and deep dives across the site.
        </p>

        <div className="mt-8">
          <Search />
        </div>
      </div>

      <Suspense
        fallback={
          <div className="mt-12 border border-border bg-card p-8 font-mono-label text-muted-foreground">
            Searching…
          </div>
        }
      >
        <SearchResults searchParams={searchParamsPromise} />
      </Suspense>
    </div>
  )
}

async function SearchResults({ searchParams: searchParamsPromise }: Args) {
  const { q: query } = await searchParamsPromise
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'search',
    depth: 1,
    limit: 12,
    select: {
      title: true,
      slug: true,
      meta: true,
    },
    // pagination: false reduces overhead if you don't need totalDocs
    pagination: false,
    ...(query
      ? {
        where: {
          or: [
            {
              title: {
                like: query,
              },
            },
            {
              'meta.description': {
                like: query,
              },
            },
            {
              'meta.title': {
                like: query,
              },
            },
            {
              slug: {
                like: query,
              },
            },
          ],
        },
      }
      : {}),
  })

  return (
    <>
      {posts.totalDocs > 0 ? (
        <div className="mt-12 flex flex-col gap-2">
          <p className="font-mono-label text-muted-foreground mb-2">
            {posts.totalDocs} RESULT{posts.totalDocs === 1 ? '' : 'S'}
            {query ? ` FOR "${query}"` : ''}
          </p>
          {posts.docs.map((post) => (
            <Link
              key={post.id}
              href={`/insights/${post.slug}`}
              className="group flex items-start justify-between gap-4 border border-border bg-card px-6 py-5 hover:border-synthesis transition-colors"
            >
              <div>
                <h2 className="font-heading text-xl transition-colors group-hover:text-synthesis">
                  {post.title}
                </h2>
                {post.meta?.description ? (
                  <p className="mt-1 text-sm text-muted-foreground">{post.meta.description}</p>
                ) : null}
              </div>
              <IconArrowUpRight className="h-5 w-5 shrink-0 text-muted-foreground transition-colors group-hover:text-synthesis" />
            </Link>
          ))}
        </div>
      ) : (
        <div className="mt-12 border border-border bg-card p-8 font-mono-label text-muted-foreground">
          No results found.
        </div>
      )}
    </>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Search | Martin's AI`,
    description: 'Search essays, notes, and deep dives across the site.',
    openGraph: mergeOpenGraph({
      title: `Search | Martin's AI`,
      description: 'Search essays, notes, and deep dives across the site.',
    }),
  }
}
