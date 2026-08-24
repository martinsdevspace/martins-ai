import { IconArrowRight } from '@tabler/icons-react'
import Link from 'next/link'

import type { IndustriesBlock as IndustriesBlockProps } from '@/payload-types'
import { SectionHeading, SectionLabel } from '@/sections/_shared'
import { getCachedCollection } from '@/utilities/getCollection'
import { industryIcon } from '@/utilities/industryIcon'

export default async function Industries({
  label,
  heading,
  intro,
  viewAllLabel,
}: IndustriesBlockProps) {
  const industries = await getCachedCollection('industries', {
    sort: 'sortOrder',
    limit: 8,
    depth: 1,
  })()

  if (!heading && industries.length === 0) return null

  return (
    <section id="industries" className="px-5 lg:px-[6vw] py-16 lg:py-24">
      {label ? <SectionLabel>{label}</SectionLabel> : null}
      <div className="mt-4 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
        {heading ? <SectionHeading>{heading}</SectionHeading> : null}
        {intro ? (
          <p className="text-muted-foreground max-w-md text-sm leading-relaxed">{intro}</p>
        ) : null}
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        {industries.map((industry) => (
          <span
            key={industry.name}
            className="border border-border px-4 py-2 font-mono-label text-muted-foreground hover:border-synthesis hover:text-synthesis transition-colors"
          >
            {industry.name}
          </span>
        ))}
      </div>

      <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {industries.map((industry) => {
          const Icon = industryIcon(industry.name)
          const content = (
            <>
              <div className="w-10 h-10 border border-synthesis/30 bg-synthesis/10 text-synthesis flex items-center justify-center">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="font-heading text-2xl">{industry.name}</h3>
              <p className="text-sm text-muted-foreground">{industry.tagline}</p>
              {typeof industry.projectCount === 'number' && (
                <div className="font-mono-label text-synthesis">{industry.projectCount} projects</div>
              )}
              {industry.keyProjects && industry.keyProjects.length > 0 && (
                <ul className="mt-auto space-y-1.5 border-t border-border pt-4">
                  {industry.keyProjects.slice(0, 3).map((kp, i) => (
                    <li key={i} className="flex items-center gap-2 font-mono-label text-muted-foreground">
                      <IconArrowRight className="w-3 h-3 text-synthesis" />
                      {kp.project}
                    </li>
                  ))}
                </ul>
              )}
            </>
          )
          const className =
            'border border-border bg-card p-6 flex flex-col gap-4 hover:border-synthesis transition-colors group'

          return industry.slug ? (
            <Link key={industry.name} href={`/industries/${industry.slug}`} className={className}>
              {content}
            </Link>
          ) : (
            <div key={industry.name} className={className}>
              {content}
            </div>
          )
        })}
      </div>

      {viewAllLabel ? (
        <div className="mt-10">
          <Link
            href="/industries"
            className="inline-flex items-center gap-2 font-mono-label text-muted-foreground hover:text-synthesis transition-colors"
          >
            {viewAllLabel}
            <IconArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ) : null}
    </section>
  )
}
