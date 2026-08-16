import clsx from 'clsx'
import React from 'react'
import RichText from '@/components/RichText'

import type { Insight } from '@/payload-types'

import { InsightCard } from '../../components/insights/InsightCard'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

export type RelatedPostsProps = {
  className?: string
  docs?: Insight[]
  introContent?: SerializedEditorState
}

export const RelatedPosts: React.FC<RelatedPostsProps> = (props) => {
  const { className, docs, introContent } = props

  return (
    <div className={clsx(className)}>
      {introContent && <RichText data={introContent} enableGutter={false} />}

      <div className="mb-6 flex items-center gap-2 font-mono-label text-synthesis">
        <span className="w-1 h-1 bg-synthesis animate-pulse" />
        // KEEP_READING
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
        {docs?.map((doc, index) => {
          if (typeof doc === 'string') return null

          return <InsightCard key={index} insight={doc} />
        })}
      </div>
    </div>
  )
}
