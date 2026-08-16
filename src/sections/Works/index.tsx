import { IconArrowUpRight, IconBrandGithub } from '@tabler/icons-react'
import Image from 'next/image'
import Link from 'next/link'

import { SectionHeading, SectionLabel } from '@/sections/_shared'
import { getCachedCollection } from '@/utilities/getCollection'
import { getMediaUrl } from '@/utilities/getMediaUrl'

const getProjects = getCachedCollection('projects', { sort: 'sortOrder', limit: 6, depth: 2 })

const FALLBACK_PROJECTS: {
  slug: string
  name: string
  tagline: string
  category: string
  year: number
  stack: { tech: string }[]
  liveUrl: string
  github: string
  thumbnail: null
}[] = [
  {
    slug: 'aurora-ledger',
    name: 'Aurora Ledger',
    tagline: 'A real-time double-entry ledger core for high-volume payments.',
    category: 'Fintech',
    year: 2026,
    stack: [{ tech: 'Next.js' }, { tech: 'PostgreSQL' }, { tech: 'Mastra' }],
    liveUrl: '#',
    github: '#',
    thumbnail: null,
  },
  {
    slug: 'helix-recon',
    name: 'Helix Recon',
    tagline: 'Automated reconciliation that closes the books in minutes, not days.',
    category: 'Payments',
    year: 2025,
    stack: [{ tech: 'TypeScript' }, { tech: 'Redis' }, { tech: 'Stripe' }],
    liveUrl: '#',
    github: '#',
    thumbnail: null,
  },
  {
    slug: 'northwind-support',
    name: 'Northwind Support',
    tagline: 'Autonomous support agents grounded on private docs with human handoff.',
    category: 'AI Agents',
    year: 2025,
    stack: [{ tech: 'Mastra' }, { tech: 'Vercel' }, { tech: 'OpenAI' }],
    liveUrl: '#',
    github: '#',
    thumbnail: null,
  },
  {
    slug: 'forge-analytics',
    name: 'Forge Analytics',
    tagline: 'A streaming analytics platform for trading desks under load.',
    category: 'Data',
    year: 2024,
    stack: [{ tech: 'Next.js' }, { tech: 'ClickHouse' }, { tech: 'Kafka' }],
    liveUrl: '#',
    github: '#',
    thumbnail: null,
  },
  {
    slug: 'ember-portal',
    name: 'Ember Portal',
    tagline: 'Self-serve merchant onboarding with KYC and payout automation.',
    category: 'Fintech',
    year: 2024,
    stack: [{ tech: 'Payload' }, { tech: 'React' }, { tech: 'AWS' }],
    liveUrl: '#',
    github: '#',
    thumbnail: null,
  },
  {
    slug: 'relay-gateway',
    name: 'Relay Gateway',
    tagline: 'A fault-tolerant API gateway routing millions of events a day.',
    category: 'Infrastructure',
    year: 2023,
    stack: [{ tech: 'Go' }, { tech: 'gRPC' }, { tech: 'Kubernetes' }],
    liveUrl: '#',
    github: '#',
    thumbnail: null,
  },
]

export default async function Works() {
  const projects = await getProjects()

  const docs = [...projects].sort(
    (a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)),
  )
  const items = docs.length > 0 ? docs : FALLBACK_PROJECTS

  return (
    <section id="works" className="px-5 lg:px-[6vw] py-16 lg:py-24">
      <SectionLabel className="mb-4">// 02 — SELECTED_WORKS</SectionLabel>
      <SectionHeading className="mb-4">Systems that run real money.</SectionHeading>
      <p className="text-muted-foreground text-base max-w-xl mb-12">
        Production systems for fintech and beyond.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((project) => {
          const media =
            project.thumbnail && typeof project.thumbnail === 'object' ? project.thumbnail : null
          const thumbnailUrl = getMediaUrl(media?.url, media?.updatedAt)
          const stack =
            project.stack
              ?.map((item) => item.tech)
              .filter((tech): tech is string => Boolean(tech)) || []

          return (
            <article
              key={project.slug || project.name}
              className="border border-border bg-card group flex flex-col"
            >
              <div className="relative aspect-[16/10] overflow-hidden border-b border-border bg-background">
                {thumbnailUrl && media ? (
                  <Image
                    src={thumbnailUrl}
                    alt={media.alt || project.name}
                    fill
                    sizes="(min-width: 64rem) 33vw, (min-width: 48rem) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-mono-label text-muted-foreground">[THUMBNAIL]</span>
                  </div>
                )}
              </div>

              <div className="p-5 flex flex-col gap-3 flex-1">
                <div className="flex items-center justify-between gap-2 font-mono-label text-muted-foreground">
                  {project.category ? (
                    <span className="border border-border px-2 py-0.5">{project.category}</span>
                  ) : (
                    <span />
                  )}
                  {project.year ? <span>{project.year}</span> : null}
                </div>

                <h3 className="font-heading text-2xl group-hover:text-synthesis transition-colors">
                  {project.name}
                </h3>

                {project.tagline ? (
                  <p className="text-sm text-muted-foreground">{project.tagline}</p>
                ) : null}

                {stack.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5">
                    {stack.map((tech) => (
                      <span
                        key={tech}
                        className="font-mono-label text-[10px] border border-border px-2 py-1"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                ) : null}

                <div className="flex items-center gap-2 mt-auto pt-3 border-t border-border">
                  {project.liveUrl ? (
                    <Link
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border border-border p-2 text-foreground hover:border-synthesis hover:text-synthesis transition-colors"
                      aria-label={`${project.name} live site`}
                    >
                      <IconArrowUpRight className="w-4 h-4" />
                    </Link>
                  ) : null}
                  {project.github ? (
                    <Link
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border border-border p-2 text-foreground hover:border-synthesis hover:text-synthesis transition-colors"
                      aria-label={`${project.name} source code`}
                    >
                      <IconBrandGithub className="w-4 h-4" />
                    </Link>
                  ) : null}
                </div>
              </div>
            </article>
          )
        })}
      </div>

      <div className="mt-10">
        <Link
          href="/works"
          className="inline-flex items-center gap-2 font-mono-label text-muted-foreground hover:text-synthesis transition-colors"
        >
          View all works
          <IconArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  )
}
