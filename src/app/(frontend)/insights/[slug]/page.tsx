import type { Metadata } from 'next'

import { RelatedPosts } from '@/blocks/RelatedPosts/Component'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import Link from 'next/link'
import React from 'react'
import RichText from '@/components/RichText'

import type { Insight } from '@/payload-types'

import { IconArrowLeft, IconClock } from '@tabler/icons-react'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { generateMeta } from '@/utilities/generateMeta'
import { Media } from '@/components/Media'
import { InsightsSidebar } from '@/components/insights/InsightsSidebar'
import { NewsletterSection } from '@/components/NewsletterBlock/NewsletterSection'
import { ReadingProgress } from '@/components/insights/ReadingProgress'
import { CopyLinkButton } from '@/components/insights/CopyLinkButton'
import { extractHeadings } from '@/utilities/extractHeadings'
import { getCachedInsightsSidebarData } from '@/utilities/getInsightsSidebarData'
import { getServerSideURL } from '@/utilities/getURL'

const formatDate = (value: string): string =>
  new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const insights = await payload.find({
    collection: 'insights',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = insights.docs.map(({ slug }) => {
    return { slug }
  })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Insight({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug)
  const url = '/insights/' + decodedSlug
  const insight = await queryInsightBySlug({ slug: decodedSlug })

  if (!insight) return <PayloadRedirects url={url} />

  const publishedAt = insight.publishedAt ? formatDate(insight.publishedAt) : null
  const tocEntries = insight.content ? extractHeadings(insight.content) : []
  const { categories, tags } = await getCachedInsightsSidebarData()
  const siteUrl = getServerSideURL()
  const author = insight.authors?.[0]
  const authorName = author && typeof author === 'object' ? author.name : null
  const postTags =
    insight.tags?.map((t) => t.tag).filter((t): t is string => Boolean(t)) || []

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: insight.title,
    description: insight.meta?.description || undefined,
    image:
      insight.heroImage && typeof insight.heroImage === 'object' && insight.heroImage.url
        ? `${siteUrl}${insight.heroImage.url}`
        : undefined,
    datePublished: insight.publishedAt || undefined,
    dateModified: insight.updatedAt || insight.publishedAt || undefined,
    author: {
      '@type': 'Person',
      name: authorName || 'Martins Michael',
    },
    publisher: {
      '@type': 'Organization',
      name: "Martin's AI",
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}/insights/${insight.slug}`,
    },
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Insights', item: `${siteUrl}/insights` },
      {
        '@type': 'ListItem',
        position: 3,
        name: insight.title,
        item: `${siteUrl}/insights/${insight.slug}`,
      },
    ],
  }

  return (
    <article className="px-5 lg:px-[6vw] pt-24 pb-24">
      <ReadingProgress />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      <div className="flex items-center justify-between">
        <Link
          href="/insights"
          className="inline-flex items-center gap-2 font-mono-label text-muted-foreground hover:text-synthesis transition-colors"
        >
          <IconArrowLeft className="h-4 w-4" />
          Back to insights
        </Link>
        <CopyLinkButton />
      </div>

      <div className="mt-10 grid grid-cols-1 gap-16 lg:grid-cols-[1fr_320px]">
        <div className="min-w-0">
          <header className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-2 font-mono-label">
              {insight.topic ? (
                <span className="border border-synthesis/40 bg-synthesis/10 px-2 py-1 text-synthesis">
                  {insight.topic}
                </span>
              ) : null}
              {insight.readTime ? (
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <IconClock className="h-4 w-4" />
                  {insight.readTime}
                </span>
              ) : null}
              {publishedAt ? <span className="text-muted-foreground">{publishedAt}</span> : null}
            </div>

            <h1 className="mt-4 font-heading text-4xl md:text-6xl font-light tracking-tight text-balance">
              {insight.title}
            </h1>

            {authorName ? (
              <div className="mt-6 flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-synthesis/10 font-mono-label text-synthesis">
                  {authorName.charAt(0)}
                </span>
                <div className="leading-tight">
                  <p className="text-sm font-medium text-foreground">{authorName}</p>
                  <p className="font-mono-label text-muted-foreground">AUTHOR</p>
                </div>
              </div>
            ) : null}
          </header>

          {insight.heroImage && typeof insight.heroImage !== 'string' && (
            <div className="relative mt-10 aspect-video overflow-hidden border border-border bg-card">
              <Media fill priority imgClassName="object-cover" resource={insight.heroImage} />
            </div>
          )}

          <div className="mt-12 max-w-4xl border-t border-border pt-10">
            <RichText className="mx-auto" data={insight.content} enableGutter={false} />
          </div>

          {postTags.length > 0 ? (
            <div className="mt-12 flex max-w-3xl flex-wrap items-center gap-2 border-t border-border pt-8">
              <span className="font-mono-label text-muted-foreground">TAGS</span>
              {postTags.map((tag) => (
                <Link
                  key={tag}
                  href={`/insights?tag=${encodeURIComponent(tag)}`}
                  className="border border-border px-2.5 py-1 font-mono-label text-muted-foreground transition-colors hover:border-synthesis hover:text-synthesis"
                >
                  {tag}
                </Link>
              ))}
            </div>
          ) : null}

          {insight.relatedPosts && insight.relatedPosts.length > 0 && (
            <RelatedPosts
              className="mt-20"
              docs={insight.relatedPosts.filter((post) => typeof post === 'object')}
            />
          )}

          <NewsletterSection className="-mx-5 mt-20 lg:mx-[-6vw]" />
        </div>

        <InsightsSidebar
          tocEntries={tocEntries}
          categories={categories}
          tags={tags}
          className="lg:sticky lg:top-24 lg:h-fit"
        />
      </div>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug)
  const insight = await queryInsightBySlug({ slug: decodedSlug })

  return generateMeta({ doc: insight })
}

const queryInsightBySlug = async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'insights',
    depth: 2,
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return (result.docs?.[0] as Insight) || null
}
