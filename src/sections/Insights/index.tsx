import { IconArrowUpRight } from '@tabler/icons-react'
import Link from 'next/link'

import type { Insight } from '@/payload-types'
import { InsightCard } from '@/components/insights/InsightCard'
import { SectionHeading, SectionLabel } from '@/sections/_shared'
import { getCachedCollection } from '@/utilities/getCollection'

const emptyContent = {
  root: {
    type: 'root' as const,
    version: 1,
    indent: 0,
    direction: 'ltr' as const,
    format: '' as const,
    children: [] as never[],
  },
}

const fallbackInsights: Insight[] = [
  {
    id: 1,
    title: 'Building reliable AI agents',
    slug: 'building-reliable-ai-agents',
    topic: 'AI/ML',
    readTime: '9 min read',
    publishedAt: '2026-03-18T00:00:00.000Z',
    content: emptyContent,
    updatedAt: '',
    createdAt: '',
  },
  {
    id: 2,
    title: 'RAG beyond the demo',
    slug: 'rag-beyond-the-demo',
    topic: 'AI/ML',
    readTime: '7 min read',
    publishedAt: '2026-02-03T00:00:00.000Z',
    content: emptyContent,
    updatedAt: '',
    createdAt: '',
  },
  {
    id: 3,
    title: 'Designing payment state machines',
    slug: 'designing-payment-state-machines',
    topic: 'Architecture',
    readTime: '11 min read',
    publishedAt: '2026-01-12T00:00:00.000Z',
    content: emptyContent,
    updatedAt: '',
    createdAt: '',
  },
]

export default async function Insights() {
  const insights = await getCachedCollection('insights', {
    sort: '-publishedAt',
    limit: 3,
    depth: 1,
  })()
  const items = insights.length ? insights : fallbackInsights

  return (
    <section id="insights" className="px-5 lg:px-[6vw] py-16 lg:py-24">
      <SectionLabel className="mb-4">// 08 — LATEST_INSIGHTS</SectionLabel>
      <SectionHeading className="mb-4">Notes from the build log.</SectionHeading>
      <p className="mb-12 max-w-2xl text-foreground/80">
        Essays and deep dives on agents, payments, and the architecture of systems that hold up in
        production.
      </p>

      <div className="grid gap-4 md:grid-cols-3">
        {items.map((insight) => (
          <InsightCard key={insight.id} insight={insight} />
        ))}
      </div>

      <div className="mt-8">
        <Link
          href="/insights"
          className="inline-flex items-center gap-2 font-mono-label text-muted-foreground hover:text-synthesis transition-colors"
        >
          View all insights
          <IconArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  )
}
