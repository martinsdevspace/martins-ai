import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import React from 'react'

import Link from 'next/link'

import { IconArrowLeft, IconArrowUpRight } from '@tabler/icons-react'

import { LivePreviewListener } from '@/components/LivePreviewListener'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import type { CaseStudy } from '@/payload-types'
import { SectionLabel } from '@/sections/_shared'
import { generateMeta } from '@/utilities/generateMeta'
import { getPayload } from 'payload'
import { DetailSidebar, type DetailSidebarFact } from '@/components/DetailSidebar'

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function CaseStudyPage({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const url = '/case-studies/' + decodedSlug
  const caseStudy = await queryCaseStudyBySlug({ slug: decodedSlug })

  if (!caseStudy) return <PayloadRedirects url={url} />

  const metrics = caseStudy.metrics?.filter((m) => m.value) || []
  const tags = caseStudy.tags?.map((t) => t.tag).filter((t): t is string => Boolean(t)) || []
  const project =
    caseStudy.projectSlug && typeof caseStudy.projectSlug === 'object' ? caseStudy.projectSlug : null

  const narrative: { label: string; body?: string | null }[] = [
    { label: 'INITIAL_SITUATION', body: caseStudy.initialSituation },
    { label: 'SCOPE', body: caseStudy.scope },
    { label: 'KEY_DECISION', body: caseStudy.keyDecision },
    { label: 'OUTCOME', body: caseStudy.outcome },
    { label: 'SYSTEMS_AFFECTED', body: caseStudy.systemsAffected },
  ].filter((n) => n.body)

  const facts: DetailSidebarFact[] = [
    caseStudy.client ? { label: 'Client', value: caseStudy.client } : null,
    caseStudy.industry ? { label: 'Industry', value: caseStudy.industry } : null,
    caseStudy.category ? { label: 'Category', value: caseStudy.category } : null,
    project ? { label: 'Related project', value: project.name } : null,
  ].filter((f): f is DetailSidebarFact => Boolean(f))

  return (
    <article className="px-5 lg:px-[6vw] pt-24">
      {draft && <LivePreviewListener />}

      <Link
        href="/#case-studies"
        className="inline-flex items-center gap-2 font-mono-label text-muted-foreground hover:text-synthesis transition-colors"
      >
        <IconArrowLeft className="h-4 w-4" />
        Back to case studies
      </Link>

      <div className="mt-10 grid grid-cols-1 gap-16 lg:grid-cols-[1fr_320px]">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2 font-mono-label">
            {caseStudy.category ? (
              <span className="border border-synthesis/40 bg-synthesis/10 px-2 py-1 text-synthesis">
                {caseStudy.category}
              </span>
            ) : null}
            {caseStudy.industry ? (
              <span className="border border-border px-2 py-1 text-muted-foreground">
                {caseStudy.industry}
              </span>
            ) : null}
          </div>

          <h1 className="mt-4 max-w-4xl font-heading text-4xl md:text-6xl font-light tracking-tight text-balance">
            {caseStudy.client}
          </h1>

          {caseStudy.whyItMatters ? (
            <blockquote className="mt-8 max-w-3xl border-l-2 border-synthesis pl-6">
              <p className="font-heading text-2xl font-light leading-relaxed text-foreground/90">
                {caseStudy.whyItMatters}
              </p>
            </blockquote>
          ) : null}

          {metrics.length > 0 ? (
            <div className="mt-10 grid grid-cols-3 divide-x divide-border border border-border max-w-3xl">
              {metrics.map((m, i) => (
                <div key={i} className="px-4 py-5 flex flex-col gap-1">
                  <span className="font-heading text-2xl text-synthesis">{m.value}</span>
                  <span className="font-mono-label text-muted-foreground text-[10px]">{m.label}</span>
                </div>
              ))}
            </div>
          ) : null}

          {narrative.length > 0 ? (
            <section className="mt-16 flex max-w-3xl flex-col gap-4">
              {narrative.map((item) => (
                <div key={item.label} className="border border-border bg-card p-6">
                  <h2 className="font-mono-label text-synthesis mb-2">// {item.label}</h2>
                  <p className="text-base leading-relaxed text-foreground/80">{item.body}</p>
                </div>
              ))}
            </section>
          ) : null}

          {tags.length > 0 ? (
            <div className="mt-16">
              <p className="font-mono-label text-muted-foreground mb-3">TAGS</p>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span key={tag} className="border border-border px-3 py-1.5 font-mono-label text-muted-foreground">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ) : null}

          <div className="mt-16 flex flex-wrap items-center gap-3">
            {project ? (
              <Link
                href={`/works/${project.slug}`}
                className="inline-flex items-center gap-2 border border-border px-5 py-2.5 font-mono-label text-foreground hover:border-synthesis hover:text-synthesis transition-colors"
              >
                Related project: {project.name}
                <IconArrowUpRight className="h-4 w-4" />
              </Link>
            ) : null}
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-foreground px-5 py-2.5 font-mono-label text-background hover:bg-synthesis transition-colors"
            >
              Start a similar project
              <IconArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <DetailSidebar
          heading="Have a similar challenge?"
          body="I take on a small number of production builds and AI agent projects each quarter."
          ctaLabel="Start a similar project"
          facts={facts}
          className="lg:sticky lg:top-24 lg:h-fit"
        />
      </div>
    </article>
  )
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const caseStudies = await payload.find({
    collection: 'case-studies',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  return caseStudies.docs.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const caseStudy = await queryCaseStudyBySlug({ slug: decodedSlug })

  return generateMeta({ doc: caseStudy })
}

const queryCaseStudyBySlug = async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'case-studies',
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

  return (result.docs?.[0] as CaseStudy) || null
}
