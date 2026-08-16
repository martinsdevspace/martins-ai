import React from 'react'

import type { Insight } from '@/payload-types'

import { InsightCard } from '@/components/insights/InsightCard'
import { cn } from '@/utilities/ui'

export type Props = {
  insights: Insight[]
  className?: string
}

export const CollectionArchive: React.FC<Props> = ({ insights, className }) => {
  const validInsights = insights?.filter(
    (result): result is Insight => typeof result === 'object' && result !== null,
  )

  return (
    <div className={cn('px-5 lg:px-[6vw]', className)}>
      {validInsights && validInsights.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {validInsights.map((insight) => (
            <InsightCard key={insight.id} insight={insight} />
          ))}
        </div>
      ) : (
        <div className="border border-border bg-card p-8 font-mono-label text-muted-foreground">
          No insights published yet.
        </div>
      )}
    </div>
  )
}
