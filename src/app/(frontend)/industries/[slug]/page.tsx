import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import React from 'react'

import Link from 'next/link'

import { IconArrowLeft, IconArrowUpRight } from '@tabler/icons-react'

import { LivePreviewListener } from '@/components/LivePreviewListener'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import RichText from '@/components/RichText'
import configPromise from '@payload-config'
import type { Industry } from '@/payload-types'
import { SectionLabel } from '@/sections/_shared'
import { generateMeta } from '@/utilities/generateMeta'
import { industryIcon } from '@/utilities/industryIcon'
import { getPayload } from 'payload'

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function IndustryPage({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const url = '/industries/' + decodedSlug
  const industry = await queryIndustryBySlug({ slug: decodedSlug })

  if (!industry) return <PayloadRedirects url={url} />

  const Icon = industryIcon(industry.name)
  const stats = industry.stats?.filter((s) => s.value || s.label) || []
  const services = industry.services?.map((s) => s.service).filter((v): v is string => Boolean(v)) || []
  const keyProjects = industry.keyProjects?.map((p) => p.project).filter((v): v is string => Boolean(v)) || []
  const challenges = industry.challenges?.map((c) => c.challenge).filter((v): v is string => Boolean(v)) || []
  const solutions = industry.solutions?.map((s) => s.solution).filter((v): v is string => Boolean(v)) || []

  return (
    <article className="px-5 lg:px-[6vw] pt-24">
      {draft && <LivePreviewListener />}

      <Link
        href="/#industries"
        className="inline-flex items-center gap-2 font-mono-label text-muted-foreground hover:text-synthesis transition-colors motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-synthesis focus-visible:ring-offset-2 focus-visible:ring-offset-background touch-manipulation"
      >
        <IconArrowLeft className="h-4 w-4" />
        Back to industries
      </Link>

      <div className="mt-10 grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="w-12 h-12 border border-synthesis/30 bg-synthesis/10 text-synthesis flex items-center justify-center">
            <Icon className="w-6 h-6" />
          </div>
          <h1 className="mt-4 font-heading text-4xl md:text-6xl font-light tracking-tight text-balance">
            {industry.name}
          </h1>
          {industry.tagline ? (
            <p className="mt-4 max-w-xl text-lg text-muted-foreground">{industry.tagline}</p>
          ) : null}
        </div>

        <div className="lg:col-span-5">
          <div className="border border-border bg-card p-6 flex flex-col gap-5">
            {typeof industry.projectCount === 'number' ? (
              <div className="flex items-center justify-between font-mono-label">
                <span className="text-muted-foreground">PROJECTS SHIPPED</span>
                <span className="text-synthesis">{industry.projectCount}</span>
              </div>
            ) : null}

            {stats.length > 0 ? (
                <div className="grid grid-cols-2 divide-x divide-border border border-border sm:grid-cols-3">
                {stats.map((s, i) => (
                  <div key={s.id || `stat-${i}`} className="px-3 py-3 flex flex-col gap-1">
                    <span className="font-heading text-xl text-synthesis">{s.value}</span>
                    <span className="font-mono-label text-muted-foreground text-[11px]">{s.label}</span>
                  </div>
                ))}
              </div>
            ) : null}

            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-foreground px-5 py-2.5 font-mono-label text-background hover:bg-synthesis transition-colors motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-synthesis focus-visible:ring-offset-2 focus-visible:ring-offset-background touch-manipulation"
            >
              Discuss a project
              <IconArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      {industry.description ? (
        <section className="mt-16 max-w-3xl">
          <RichText
            data={industry.description}
            enableProse={false}
            enableGutter={false}
            className="text-base leading-relaxed text-foreground/80"
          />
        </section>
      ) : null}

      <div className="mt-16 grid gap-10 lg:grid-cols-2">
        {services.length > 0 ? (
          <section>
            <h2 className="font-mono-label text-synthesis mb-6">// SERVICES_DELIVERED</h2>
            <ul className="flex flex-col gap-2">
              {services.map((service, i) => (
                <li key={i} className="border border-border bg-card px-5 py-3 font-mono-label text-foreground/80">
                  {service}
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {keyProjects.length > 0 ? (
          <section>
            <h2 className="font-mono-label text-synthesis mb-6">// KEY_PROJECTS</h2>
            <ul className="flex flex-col gap-2">
              {keyProjects.map((project, i) => (
                <li key={i}>
                  <Link
                    href="/portfolio"
                     className="group flex items-center gap-3 border border-border bg-card px-5 py-3 transition-colors hover:border-synthesis motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-synthesis focus-visible:ring-offset-2 focus-visible:ring-offset-background touch-manipulation"
                  >
                    <IconArrowUpRight className="h-4 w-4 text-synthesis shrink-0" />
                    <span className="font-heading text-base transition-colors group-hover:text-synthesis">
                      {project}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </div>

      {(challenges.length > 0 || solutions.length > 0) ? (
        <div className="mt-16 grid gap-10 lg:grid-cols-2">
          {challenges.length > 0 ? (
            <section>
              <h2 className="font-mono-label text-synthesis mb-6">// CHALLENGES</h2>
              <ul className="flex flex-col gap-3">
                {challenges.map((challenge, i) => (
                  <li key={i} className="flex items-start gap-3 border border-border bg-card px-5 py-4">
                     <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-warning" />
                    <span className="text-sm text-foreground/80">{challenge}</span>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {solutions.length > 0 ? (
            <section>
              <h2 className="font-mono-label text-synthesis mb-6">// SOLUTIONS</h2>
              <ul className="flex flex-col gap-3">
                {solutions.map((solution, i) => (
                  <li key={i} className="flex items-start gap-3 border border-border bg-card px-5 py-4">
                     <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-success" />
                    <span className="text-sm text-foreground/80">{solution}</span>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>
      ) : null}

    </article>
  )
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const industries = await payload.find({
    collection: 'industries',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  return industries.docs.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const industry = await queryIndustryBySlug({ slug: decodedSlug })

  return generateMeta({ doc: industry })
}

const queryIndustryBySlug = async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'industries',
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

  return (result.docs?.[0] as Industry) || null
}
