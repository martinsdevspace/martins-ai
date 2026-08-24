'use client'

import { IconArrowUpRight, IconBrandGithub } from '@tabler/icons-react'
import Link from 'next/link'
import React, { useMemo, useState } from 'react'
import { motion } from 'framer-motion'

export type ProjectCardData = {
  slug: string
  name: string
  tagline: string | null
  description: string | null
  category: string | null
  industryName: string | null
  projectStatus: string | null
  year: number | null
  featured: boolean
  stack: string[]
  stats: { loc: number | null; commits: number | null; contributors: number | null } | null
  liveUrl: string | null
  github: string | null
}

type WorksGridProps = {
  projects: ProjectCardData[]
}

const STATUS_COLORS: Record<string, string> = {
  COMPLETED: 'bg-success',
  IN_PROGRESS: 'bg-warning',
}

export const WorksGrid: React.FC<WorksGridProps> = ({ projects }) => {
  const industries = useMemo(() => {
    const set = new Set<string>()
    projects.forEach((p) => {
      if (p.industryName) set.add(p.industryName)
    })
    return ['All', ...Array.from(set).sort()]
  }, [projects])

  const [activeIndustry, setActiveIndustry] = useState('All')
  const [sortBy, setSortBy] = useState<'recent' | 'impactful'>('recent')

  const visible = useMemo(() => {
    const filtered =
      activeIndustry === 'All'
        ? projects
        : projects.filter((p) => p.industryName === activeIndustry)

    return filtered.sort((a, b) => {
      if (sortBy === 'recent') {
        return (b.year || 0) - (a.year || 0)
      }
      if (a.featured !== b.featured) return a.featured ? -1 : 1
      return (b.stats?.loc || 0) - (a.stats?.loc || 0)
    })
  }, [projects, activeIndustry, sortBy])

  const filterBtn = (active: boolean) =>
    active
      ? 'bg-foreground text-background border-foreground'
      : 'bg-background text-muted-foreground border-border hover:border-foreground hover:text-foreground'

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects by industry">
          {industries.map((industry) => (
            <button
              key={industry}
              type="button"
              onClick={() => setActiveIndustry(industry)}
              aria-pressed={activeIndustry === industry}
              className={`font-mono-label border px-4 py-2 transition-colors ${filterBtn(
                activeIndustry === industry,
              )}`}
            >
              {industry}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="font-mono-label text-muted-foreground">SORT:</span>
          <button
            type="button"
            onClick={() => setSortBy('recent')}
            className={`font-mono-label border px-3 py-2 transition-colors ${
              sortBy === 'recent'
                ? 'text-synthesis border-synthesis'
                : 'text-muted-foreground border-border hover:text-foreground hover:border-foreground'
            }`}
          >
            Recent
          </button>
          <button
            type="button"
            onClick={() => setSortBy('impactful')}
            className={`font-mono-label border px-3 py-2 transition-colors ${
              sortBy === 'impactful'
                ? 'text-synthesis border-synthesis'
                : 'text-muted-foreground border-border hover:text-foreground hover:border-foreground'
            }`}
          >
            Most Impactful
          </button>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
        {visible.map((project, i) => (
          <motion.article
            key={project.slug}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, delay: (i % 2) * 0.06 }}
            className="group flex flex-col border border-border bg-card transition-colors hover:border-synthesis"
          >
            <Link
              href={`/portfolio/${project.slug}`}
              className="flex aspect-[16/10] flex-col justify-between border-b border-border bg-carbon p-6 text-background"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="font-mono-label text-background/50">{String(i + 1).padStart(2, '0')}</span>
                <div className="flex items-center gap-2">
                  {project.projectStatus ? (
                    <span className="inline-flex items-center gap-1.5 border border-background/20 px-2 py-1 font-mono-label text-[10px] text-background/70">
                      <span
                        className={`h-1.5 w-1.5 animate-pulse ${STATUS_COLORS[project.projectStatus] || 'bg-synthesis'}`}
                      />
                      {project.projectStatus.replace('_', ' ')}
                    </span>
                  ) : null}
                  {project.year ? (
                    <span className="border border-background/20 px-2 py-1 font-mono-label text-[10px] text-synthesis">
                      {project.year}
                    </span>
                  ) : null}
                </div>
              </div>
              <div className="font-heading text-3xl font-light leading-none transition-colors group-hover:text-synthesis lg:text-4xl">
                {project.name}
              </div>
            </Link>

            <div className="flex flex-1 flex-col gap-4 p-6">
              <div className="flex items-baseline gap-3 font-mono-label text-muted-foreground">
                {project.category ? <span>{project.category}</span> : null}
                {project.industryName ? (
                  <>
                    <span className="text-synthesis">·</span>
                    <span className="text-synthesis">{project.industryName}</span>
                  </>
                ) : null}
              </div>

              {project.tagline ? (
                <p className="text-sm font-mono leading-relaxed text-muted-foreground">
                  {project.tagline}
                </p>
              ) : null}
              {project.description ? (
                <p className="text-sm leading-relaxed text-foreground/80">{project.description}</p>
              ) : null}

              {project.stack.length > 0 ? (
                <div className="flex flex-wrap gap-1.5">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="border border-border px-2 py-1 font-mono-label text-[10px] text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              ) : null}

              <div className="mt-auto flex items-center justify-between border-t border-border pt-4">
                <div className="flex items-center gap-2">
                  {project.liveUrl ? (
                    <Link
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.name} live site`}
                      className="flex items-center gap-1.5 font-mono-label text-[10px] text-muted-foreground transition-colors hover:text-synthesis"
                    >
                      LIVE <IconArrowUpRight className="h-3 w-3" />
                    </Link>
                  ) : null}
                  {project.github ? (
                    <Link
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.name} source code`}
                      className="flex items-center gap-1.5 font-mono-label text-[10px] text-muted-foreground transition-colors hover:text-synthesis"
                    >
                      <IconBrandGithub className="h-3 w-3" /> SOURCE
                    </Link>
                  ) : null}
                </div>
                <Link
                  href={`/portfolio/${project.slug}`}
                  className="flex items-center gap-1.5 font-mono-label text-[10px] text-synthesis transition-colors hover:text-foreground"
                >
                  DETAILS <IconArrowUpRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      <p className="mt-8 font-mono-label text-muted-foreground" aria-live="polite">
        {visible.length} RESULTS
      </p>
    </div>
  )
}
