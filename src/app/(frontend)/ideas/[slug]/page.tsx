import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import React from 'react'

import Link from 'next/link'

import { IconArrowLeft, IconArrowUpRight, IconCheck } from '@tabler/icons-react'

import { LivePreviewListener } from '@/components/LivePreviewListener'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import { Reveal } from '@/components/Motion/Reveal'
import { PageHero } from '@/sections/PageHero'
import { PageCTA } from '@/sections/PageCTA'
import configPromise from '@payload-config'
import type { Idea } from '@/payload-types'
import { SectionLabel } from '@/sections/_shared'
import { generateMeta } from '@/utilities/generateMeta'
import { getPayload } from 'payload'
import { DetailSidebar, type DetailSidebarFact } from '@/components/DetailSidebar'

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function IdeaPage({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const url = '/ideas/' + decodedSlug
  const idea = await queryIdeaBySlug({ slug: decodedSlug })

  if (!idea) return <PayloadRedirects url={url} />

  const metrics = idea.metrics?.filter((m) => m.value) || []
  const tags = idea.tags?.map((t) => t.tag).filter((t): t is string => Boolean(t)) || []
  const deliverables = idea.deliverables?.map((d) => d.item).filter((d): d is string => Boolean(d)) || []
  const project = idea.projectSlug && typeof idea.projectSlug === 'object' ? idea.projectSlug : null

  const narrative: { label: string; body?: string | null }[] = [
    { label: 'INITIAL_SITUATION', body: idea.initialSituation },
    { label: 'SCOPE', body: idea.scope },
    { label: 'KEY_DECISION', body: idea.keyDecision },
    { label: 'OUTCOME', body: idea.outcome },
    { label: 'SYSTEMS_AFFECTED', body: idea.systemsAffected },
  ].filter((n) => n.body)

  const facts: DetailSidebarFact[] = [
    idea.client ? { label: 'For', value: idea.client } : null,
    idea.industry ? { label: 'Industry', value: idea.industry } : null,
    idea.category ? { label: 'Category', value: idea.category } : null,
    idea.startingFrom ? { label: 'Starting from', value: idea.startingFrom } : null,
    project ? { label: 'Built platform', value: project.name } : null,
  ].filter((f): f is DetailSidebarFact => Boolean(f))

  return (
    <article>
      <PageHero
        label="// IDEA"
        breadcrumbLabel="Ideas"
        meta={idea.category ? idea.category.toUpperCase() : 'ENGAGEMENT'}
        title={idea.client || 'Engagement'}
        intro={idea.overview || idea.whyItMatters || ''}
      />

      <div className="px-5 lg:px-[6vw] pt-16">
        {draft && <LivePreviewListener />}

        <Link
          href="/ideas"
          className="inline-flex items-center gap-2 font-mono-label text-muted-foreground hover:text-synthesis transition-colors"
        >
          <IconArrowLeft className="h-4 w-4" />
          Back to ideas
        </Link>

        {idea.whyItMatters ? (
          <blockquote className="mt-10 max-w-7xl border-l-2 border-synthesis pl-6">
            <p className="font-heading text-2xl font-light leading-relaxed text-foreground/90">
              {idea.whyItMatters}
            </p>
          </blockquote>
        ) : null}

        <div className="mt-16 grid grid-cols-1 gap-16 lg:grid-cols-[1fr_320px]">
          <div className="min-w-0">
            {idea.audience ? (
              <Reveal>
                <section className="border-t border-border pt-12">
                  <SectionLabel className="mb-4">// WHO_IT'S_FOR</SectionLabel>
                  <p className="max-w-3xl text-lg leading-relaxed text-foreground/80">{idea.audience}</p>
                </section>
              </Reveal>
            ) : null}

            {idea.outcomePromise ? (
              <Reveal>
                <section className="mt-16 border-t border-border pt-12">
                  <SectionLabel className="mb-4">// WHAT_YOU_GET</SectionLabel>
                  <p className="max-w-3xl text-lg leading-relaxed text-foreground/80">
                    {idea.outcomePromise}
                  </p>
                </section>
              </Reveal>
            ) : null}

            {deliverables.length > 0 ? (
              <Reveal>
                <section className="mt-16 border-t border-border pt-12">
                  <SectionLabel className="mb-4">// DELIVERABLES</SectionLabel>
                  <div className="grid grid-cols-1 gap-x-12 gap-y-4 md:grid-cols-2">
                    {deliverables.map((item, i) => (
                      <div key={i} className="flex items-start gap-3 border-t border-border py-3">
                        <IconCheck className="mt-1 h-4 w-4 flex-shrink-0 text-synthesis" />
                        <span className="text-base leading-relaxed text-foreground/80">{item}</span>
                      </div>
                    ))}
                  </div>
                </section>
              </Reveal>
            ) : null}

            {narrative.length > 0 ? (
              <Reveal>
                <section className="mt-16 flex max-w-7xl flex-col gap-4">
                  {narrative.map((item) => (
                    <div key={item.label} className="border border-border bg-card p-6">
                      <h2 className="font-mono-label text-synthesis mb-2">// {item.label}</h2>
                      <p className="text-base leading-relaxed text-foreground/80">{item.body}</p>
                    </div>
                  ))}
                </section>
              </Reveal>
            ) : null}

            {metrics.length > 0 ? (
              <Reveal>
                <section className="mt-16 border-t border-border pt-12">
                  <SectionLabel className="mb-4">// RESULTS</SectionLabel>
                  <div className="grid grid-cols-3 divide-x divide-border border border-border max-w-7xl">
                    {metrics.map((m, i) => (
                      <div key={i} className="px-4 py-5 flex flex-col gap-1">
                        <span className="font-heading text-2xl text-synthesis">{m.value}</span>
                        <span className="font-mono-label text-muted-foreground text-[10px]">{m.label}</span>
                      </div>
                    ))}
                  </div>
                </section>
              </Reveal>
            ) : null}

            {tags.length > 0 ? (
              <Reveal>
                <section className="mt-16">
                  <p className="font-mono-label text-muted-foreground mb-3">TAGS</p>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="border border-border px-3 py-1.5 font-mono-label text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </section>
              </Reveal>
            ) : null}

            <div className="mt-16 flex flex-wrap items-center gap-3">
              {project ? (
                <Link
                  href={`/portfolio/${project.slug}`}
                  className="inline-flex items-center gap-2 border border-border px-5 py-2.5 font-mono-label text-foreground hover:border-synthesis hover:text-synthesis transition-colors"
                >
                  See the built platform: {project.name}
                  <IconArrowUpRight className="h-4 w-4" />
                </Link>
              ) : null}
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-foreground px-5 py-2.5 font-mono-label text-background hover:bg-synthesis transition-colors"
              >
                Start a similar engagement
                <IconArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <DetailSidebar
            heading="Have a similar challenge?"
            body="I take on a small number of production builds and AI agent projects each quarter."
            ctaLabel="Start a conversation"
            ctaHref="/contact"
            facts={facts}
            className="lg:sticky lg:top-24 lg:h-fit"
          />
        </div>
      </div>

      <div className="-mx-5 lg:-mx-[6vw] mt-20">
        <PageCTA secondaryTo="/portfolio" secondaryLabel="VIEW_PORTFOLIO" />
      </div>
    </article>
  )
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const ideas = await payload.find({
    collection: 'ideas',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  return ideas.docs.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const idea = await queryIdeaBySlug({ slug: decodedSlug })

  return generateMeta({ doc: idea })
}

const queryIdeaBySlug = async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'ideas',
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

  return (result.docs?.[0] as Idea) || null
}
