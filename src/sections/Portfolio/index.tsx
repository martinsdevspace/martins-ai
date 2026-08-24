import { IconArrowUpRight, IconBrandGithub } from '@tabler/icons-react'
import Image from 'next/image'
import Link from 'next/link'

import type { WorksBlock as WorksBlockProps } from '@/payload-types'
import { SectionHeading, SectionLabel } from '@/sections/_shared'
import { getCachedCollection } from '@/utilities/getCollection'
import { getMediaUrl } from '@/utilities/getMediaUrl'

const getPortfolio = getCachedCollection('portfolio', { sort: 'sortOrder', limit: 6, depth: 2 })

export default async function Portfolio({
  label,
  heading,
  intro,
  viewAllLabel,
}: WorksBlockProps) {
  const projects = await getPortfolio()

  const docs = [...projects].sort(
    (a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)),
  )

  if (!heading && docs.length === 0) return null

  return (
    <section id="portfolio" className="px-5 lg:px-[6vw] py-16 lg:py-24">
      {label ? <SectionLabel className="mb-4">{label}</SectionLabel> : null}
      {heading ? <SectionHeading className="mb-4">{heading}</SectionHeading> : null}
      {intro ? <p className="text-muted-foreground text-base max-w-xl mb-12">{intro}</p> : null}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {docs.map((project) => {
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

      {viewAllLabel ? (
        <div className="mt-10">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 font-mono-label text-muted-foreground hover:text-synthesis transition-colors"
          >
            {viewAllLabel}
            <IconArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      ) : null}
    </section>
  )
}
