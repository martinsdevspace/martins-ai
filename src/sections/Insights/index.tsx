import { IconArrowUpRight } from '@tabler/icons-react'
import Link from 'next/link'

import type { InsightsBlock as InsightsBlockProps } from '@/payload-types'
import { InsightCard } from '@/components/insights/InsightCard'
import { SectionHeading, SectionLabel } from '@/sections/_shared'
import { getCachedCollection } from '@/utilities/getCollection'

export default async function Insights({ label, heading, intro, viewAllLabel }: InsightsBlockProps) {
  const insights = await getCachedCollection('insights', {
    sort: '-publishedAt',
    limit: 3,
    depth: 1,
  })()

  if (!heading && insights.length === 0) return null

  return (
    <section id="insights" className="px-5 lg:px-[6vw] py-16 lg:py-24">
      {label ? <SectionLabel className="mb-4">{label}</SectionLabel> : null}
      {heading ? <SectionHeading className="mb-4">{heading}</SectionHeading> : null}
      {intro ? <p className="mb-12 max-w-2xl text-foreground/80">{intro}</p> : null}

      <div className="grid gap-4 md:grid-cols-3">
        {insights.map((insight) => (
          <InsightCard key={insight.id} insight={insight} />
        ))}
      </div>

      {viewAllLabel ? (
        <div className="mt-8">
          <Link
            href="/insights"
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
