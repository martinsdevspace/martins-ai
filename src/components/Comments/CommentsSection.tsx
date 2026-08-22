import type { Insight } from '@/payload-types'

import { getCachedComments } from '@/utilities/getComments'
import { CommentForm } from './CommentForm'
import { CommentList } from './CommentList'

export type CommentsSectionProps = {
  insight: Insight
  page?: number
}

const PER_PAGE = 10

export async function CommentsSection({ insight, page = 1 }: CommentsSectionProps) {
  const insightId = typeof insight === 'object' ? insight.id : insight

  const { docs, totalDocs, totalPages } = await getCachedComments({
    insightId,
    page,
    limit: PER_PAGE,
  })()

  return (
    <section className="mt-16 border-t border-border pt-12" id="comments">
      <div className="flex items-center justify-between gap-4">
        <h2 className="font-heading text-3xl font-light tracking-tight">
          Comments
          {totalDocs > 0 ? (
            <span className="ml-3 font-mono-label align-middle text-muted-foreground">
              [{totalDocs}]
            </span>
          ) : null}
        </h2>
      </div>

      <div className="mt-8">
        <CommentForm insightId={insightId} />
      </div>

      <div className="mt-10">
        <CommentList docs={docs} totalPages={totalPages} currentPage={page} insightSlug={insight.slug} />
      </div>
    </section>
  )
}
