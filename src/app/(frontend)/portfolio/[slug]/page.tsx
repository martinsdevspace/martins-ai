import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import React from 'react'

import Image from 'next/image'
import Link from 'next/link'

import { IconArrowLeft, IconArrowUpRight, IconBrandGithub, IconCheck } from '@tabler/icons-react'

import { CodeBlock } from '@/blocks/Code/Component'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import { ProjectTimeline } from '@/components/ProjectTimeline'
import { PageCTA } from '@/sections/PageCTA'
import configPromise from '@payload-config'
import type { Project } from '@/payload-types'
import { SectionLabel } from '@/sections/_shared'
import { generateMeta } from '@/utilities/generateMeta'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { getPayload } from 'payload'

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function WorkspacePage({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const url = '/works/' + decodedSlug
  const project = await queryProjectBySlug({ slug: decodedSlug })

  if (!project) return <PayloadRedirects url={url} />

  const media = project.thumbnail && typeof project.thumbnail === 'object' ? project.thumbnail : null
  const thumbnailUrl = getMediaUrl(media?.url, media?.updatedAt)
  const stack = project.stack?.map((s) => s.tech).filter((t): t is string => Boolean(t)) || []
  const stats = project.stats

  const architecture = project.architecture?.filter((a) => a.title || a.description) || []
  const features = project.features?.map((f) => f.feature).filter((f): f is string => Boolean(f)) || []
  const resultMetrics = project.resultMetrics?.filter((m) => m.value || m.label) || []
  const lessons = project.lessons?.map((l) => l.lesson).filter((l): l is string => Boolean(l)) || []
  const timeline = project.developmentTimeline || []
  const codeSample = project.codeSample?.code ? project.codeSample : null

  return (
    <article className="px-5 lg:px-[6vw] pt-24">
      {draft && <LivePreviewListener />}

      <Link
        href="/#works"
        className="inline-flex items-center gap-2 font-mono-label text-muted-foreground hover:text-synthesis transition-colors"
      >
        <IconArrowLeft className="h-4 w-4" />
        Back to works
      </Link>

      <div className="mt-10 grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <SectionLabel className="mb-4">
            // PROJECT{project.category ? ` — ${project.category.toUpperCase()}` : ''}
          </SectionLabel>
          <h1 className="font-heading text-4xl md:text-6xl font-light tracking-tight text-balance">
            {project.name}
          </h1>
          {project.tagline ? (
            <p className="mt-4 max-w-xl text-lg text-muted-foreground">{project.tagline}</p>
          ) : null}
        </div>

        <div className="lg:col-span-5">
          <div className="border border-border bg-card p-6 flex flex-col gap-5">
            <div className="flex flex-wrap items-center gap-2 font-mono-label">
              {project.projectStatus ? (
                <span className="inline-flex items-center gap-2 border border-border px-2 py-1">
                  <span
                    className={`h-1.5 w-1.5 animate-pulse ${project.projectStatus === 'COMPLETED' ? 'bg-success' : 'bg-warning'
                      }`}
                  />
                  {project.projectStatus.replace('_', ' ')}
                </span>
              ) : null}
              {project.year ? (
                <span className="border border-border px-2 py-1 text-synthesis">{project.year}</span>
              ) : null}
            </div>

            {stats ? (
              <div className="grid grid-cols-3 divide-x divide-border border border-border">
                <div className="px-3 py-3 flex flex-col gap-1">
                  <span className="font-heading text-xl text-synthesis">{stats.loc ?? '—'}</span>
                  <span className="font-mono-label text-muted-foreground text-[10px]">LOC</span>
                </div>
                <div className="px-3 py-3 flex flex-col gap-1">
                  <span className="font-heading text-xl text-synthesis">{stats.commits ?? '—'}</span>
                  <span className="font-mono-label text-muted-foreground text-[10px]">COMMITS</span>
                </div>
                <div className="px-3 py-3 flex flex-col gap-1">
                  <span className="font-heading text-xl text-synthesis">
                    {stats.contributors ?? '—'}
                  </span>
                  <span className="font-mono-label text-muted-foreground text-[10px]">
                    CONTRIBUTORS
                  </span>
                </div>
              </div>
            ) : null}

            {stack.length > 0 ? (
              <div>
                <p className="font-mono-label text-muted-foreground mb-2">STACK</p>
                <div className="flex flex-wrap gap-1.5">
                  {stack.map((tech) => (
                    <span key={tech} className="border border-border px-2 py-1 font-mono-label text-[10px] text-muted-foreground">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}

            <div className="flex flex-wrap gap-2">
              {project.liveUrl ? (
                <Link
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-foreground px-5 py-2.5 font-mono-label text-background hover:bg-synthesis transition-colors"
                >
                  Visit live site
                  <IconArrowUpRight className="h-4 w-4" />
                </Link>
              ) : null}
              {project.github ? (
                <Link
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-border px-5 py-2.5 font-mono-label text-foreground hover:border-synthesis hover:text-synthesis transition-colors"
                >
                  <IconBrandGithub className="h-4 w-4" />
                  Source
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {thumbnailUrl && media ? (
        <div className="mt-12 relative aspect-[16/9] overflow-hidden border border-border bg-background">
          <Image
            src={thumbnailUrl}
            alt={media.alt || project.name}
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
      ) : (
        <div className="mt-12 flex aspect-[16/9] items-center justify-center border border-border bg-card">
          <span className="font-mono-label text-muted-foreground">[THUMBNAIL]</span>
        </div>
      )}

      {/* Overview */}
      {project.description ? (
        <section className="mt-20 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-3">
            <SectionLabel className="mb-4">// OVERVIEW</SectionLabel>
            <h2 className="font-heading text-2xl font-light lg:text-3xl">The project.</h2>
          </div>
          <div className="lg:col-span-9">
            <p className="text-lg leading-relaxed text-foreground/80">{project.description}</p>
          </div>
        </section>
      ) : null}

      {/* Challenge */}
      {project.challenge ? (
        <section className="mt-20 grid grid-cols-1 gap-6 border-t border-border pt-16 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-3">
            <SectionLabel className="mb-4">// THE_CHALLENGE</SectionLabel>
            <h2 className="font-heading text-2xl font-light lg:text-3xl">The problem.</h2>
          </div>
          <div className="lg:col-span-9">
            <p className="text-lg leading-relaxed text-foreground/80">{project.challenge}</p>
          </div>
        </section>
      ) : null}

      {/* Solution */}
      {project.solution ? (
        <section className="mt-20 grid grid-cols-1 gap-6 border-t border-border pt-16 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-3">
            <SectionLabel className="mb-4">// THE_SOLUTION</SectionLabel>
            <h2 className="font-heading text-2xl font-light lg:text-3xl">The approach.</h2>
          </div>
          <div className="lg:col-span-9">
            <p className="text-lg leading-relaxed text-foreground/80">{project.solution}</p>
          </div>
        </section>
      ) : null}

      {/* Architecture */}
      {architecture.length > 0 || codeSample ? (
        <section className="mt-20 border-t border-border pt-16">
          <div className="mb-10 flex items-center justify-between">
            <SectionLabel>// ARCHITECTURE_DEEP_DIVE</SectionLabel>
            {architecture.length > 0 ? (
              <span className="font-mono-label text-muted-foreground">
                {architecture.length} COMPONENTS
              </span>
            ) : null}
          </div>
          <h2 className="mb-12 font-heading text-3xl font-light lg:text-4xl">Under the hood.</h2>

          {architecture.length > 0 ? (
            <div className="mb-12 grid grid-cols-1 gap-px border border-border bg-border md:grid-cols-2">
              {architecture.map((item, i) => (
                <div key={item.id || i} className="bg-background p-8">
                  <span className="mb-3 block font-mono text-sm text-synthesis">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mb-3 font-heading text-xl font-light">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-foreground/70">{item.description}</p>
                </div>
              ))}
            </div>
          ) : null}

          {codeSample ? (
            <div>
              {codeSample.title ? (
                <p className="mb-2 font-mono-label text-muted-foreground">{codeSample.title}</p>
              ) : null}
              <CodeBlock blockType="code" code={codeSample.code || ''} language={codeSample.language || undefined} />
            </div>
          ) : null}
        </section>
      ) : null}

      {/* Features */}
      {features.length > 0 ? (
        <section className="mt-20 border-t border-border pt-16">
          <div className="mb-10 flex items-center justify-between">
            <SectionLabel>// KEY_FEATURES</SectionLabel>
            <span className="font-mono-label text-muted-foreground">{features.length} SHIPPED</span>
          </div>
          <h2 className="mb-12 font-heading text-3xl font-light lg:text-4xl">What was built.</h2>

          <div className="grid grid-cols-1 gap-x-12 gap-y-4 md:grid-cols-2">
            {features.map((feature, i) => (
              <div key={i} className="flex items-start gap-3 border-t border-border py-3">
                <IconCheck className="mt-1 h-4 w-4 flex-shrink-0 text-synthesis" />
                <span className="text-base leading-relaxed text-foreground/80">{feature}</span>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {/* Development timeline */}
      <ProjectTimeline phases={timeline} />

      {/* Results */}
      {resultMetrics.length > 0 || lessons.length > 0 ? (
        <section className="mt-20 border-t border-border pt-16">
          <div className="mb-10 flex items-center justify-between">
            <SectionLabel>// RESULTS</SectionLabel>
            {project.projectStatus === 'COMPLETED' ? (
              <span className="flex items-center gap-1.5 font-mono-label text-success">
                <span className="h-1 w-1 rounded-full bg-success" /> IN_PRODUCTION
              </span>
            ) : null}
          </div>
          <h2 className="mb-12 font-heading text-3xl font-light lg:text-4xl">The outcome.</h2>

          {resultMetrics.length > 0 ? (
            <div className="mb-16 grid grid-cols-2 gap-px border border-border bg-border lg:grid-cols-4">
              {resultMetrics.map((metric, i) => (
                <div key={metric.id || i} className="bg-background p-6 text-center lg:p-8">
                  <div className="mb-0.5 font-heading text-3xl font-light text-synthesis lg:text-4xl">
                    {metric.value}
                  </div>
                  <div className="font-mono-label text-muted-foreground">{metric.label}</div>
                </div>
              ))}
            </div>
          ) : null}

          {lessons.length > 0 ? (
            <div>
              <div className="mb-6 font-mono-label text-muted-foreground">// LESSONS_LEARNED</div>
              <div className="flex flex-col gap-4">
                {lessons.map((lesson, i) => (
                  <div key={i} className="flex items-start gap-4 border-t border-border py-4 last:border-b">
                    <span className="mt-1 flex-shrink-0 font-mono text-sm text-synthesis">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <p className="text-base leading-relaxed text-foreground/80">{lesson}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </section>
      ) : null}

      <div className="-mx-5 lg:-mx-[6vw]">
        <PageCTA
          address="0x008 // END_OF_FILE"
          title="Want similar results?"
          subtitle="If this project resonates with what you're building, let's talk. I take on a limited number of projects each quarter."
          primaryLabel="BOOK_FREE_REVIEW"
          primaryTo="/contact"
          secondaryLabel="VIEW_ALL_WORK"
          secondaryTo="/works"
        />
      </div>
    </article>
  )
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const projects = await payload.find({
    collection: 'projects',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  return projects.docs.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const project = await queryProjectBySlug({ slug: decodedSlug })

  return generateMeta({ doc: project })
}

const queryProjectBySlug = async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'projects',
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

  return (result.docs?.[0] as Project) || null
}
