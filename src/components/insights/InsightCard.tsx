import { IconArrowUpRight, IconClock } from '@tabler/icons-react'
import Link from 'next/link'
import React from 'react'

import { Media } from '@/components/Media'
import type { Insight } from '@/payload-types'
import { cn } from '@/utilities/ui'

const formatDate = (value: string): string =>
  new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

export const InsightCard: React.FC<{
  insight: Insight
  className?: string
}> = ({ insight, className }) => {
  const topic = insight.topic || 'Field Note'
  const hasTopic = Boolean(insight.topic)
  const publishedAt = insight.publishedAt ? formatDate(insight.publishedAt) : null
  const hasImage = insight.heroImage && typeof insight.heroImage === 'object'

  return (
    <Link
      href={`/insights/${insight.slug}`}
      className={cn(
        'group flex flex-col border border-border bg-card transition-colors hover:border-synthesis',
        className,
      )}
    >
      <div className="relative aspect-16/10 overflow-hidden border-b border-border bg-background">
        {hasImage ? (
          <Media
            resource={insight.heroImage}
            fill
            imgClassName="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="font-mono-label text-muted-foreground/50">// {topic}</span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <p className={`font-mono-label ${hasTopic ? 'text-synthesis' : 'text-muted-foreground'}`}>
          {topic}
        </p>
        <h3 className="font-heading text-2xl transition-colors group-hover:text-synthesis">
          {insight.title}
        </h3>
        <p className="flex flex-wrap items-center gap-2 font-mono-label text-muted-foreground">
          {insight.readTime ? (
            <>
              <IconClock className="h-4 w-4" />
              {insight.readTime}
            </>
          ) : null}
          {insight.readTime && publishedAt ? <span>·</span> : null}
          {publishedAt ? <span>{publishedAt}</span> : null}
        </p>
        <span className="mt-auto inline-flex items-center gap-1 font-mono-label text-muted-foreground transition-colors group-hover:text-synthesis">
          Read
          <IconArrowUpRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  )
}
