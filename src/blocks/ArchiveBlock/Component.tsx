import type { Insight, ArchiveBlock as ArchiveBlockProps } from '@/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import RichText from '@/components/RichText'

import { CollectionArchive } from '@/components/CollectionArchive'

export const ArchiveBlock: React.FC<
  ArchiveBlockProps & {
    id?: string
  }
> = async (props) => {
  const { id, categories, introContent, limit: limitFromProps, populateBy, selectedDocs } = props

  const limit = limitFromProps || 3

  let insights: Insight[] = []

  if (populateBy === 'collection') {
    const payload = await getPayload({ config: configPromise })

    const flattenedCategories = categories?.map((category) => {
      if (typeof category === 'object') return category.id
      else return category
    })

    const fetchedInsights = await payload.find({
      collection: 'insights',
      depth: 1,
      limit,
      ...(flattenedCategories && flattenedCategories.length > 0
        ? {
            where: {
              categories: {
                in: flattenedCategories,
              },
            },
          }
        : {}),
    })

    insights = fetchedInsights.docs
  } else {
    if (selectedDocs?.length) {
      const filteredSelectedPosts = selectedDocs.map((post) => {
        if (typeof post.value === 'object') return post.value
      }) as Insight[]

      insights = filteredSelectedPosts
    }
  }

  return (
    <div className="py-16 md:py-24" id={`block-${id}`}>
      {introContent && (
        <div className="px-5 lg:px-[6vw] mb-12 max-w-3xl">
          <RichText className="prose" data={introContent} enableGutter={false} />
        </div>
      )}
      <CollectionArchive insights={insights} />
    </div>
  )
}
