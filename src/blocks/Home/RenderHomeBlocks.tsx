import React, { Fragment } from 'react'

import type { Home } from '@/payload-types'

import {
  AboutBlock,
  HeroBlock,
  IndustriesBlock,
  InsightsBlock,
  MiniStackBlock,
  PageCTABlock,
  PainPointsBlock,
  ProcessBlock,
  ServicesBlock,
  TestimonialsBlock,
  WorksBlock,
} from '@/blocks/Home/Components'

const homeBlockComponents = {
  homeHero: HeroBlock,
  painPoints: PainPointsBlock,
  miniStack: MiniStackBlock,
  about: AboutBlock,
  works: WorksBlock,
  services: ServicesBlock,
  industries: IndustriesBlock,
  process: ProcessBlock,
  testimonials: TestimonialsBlock,
  insights: InsightsBlock,
  pageCta: PageCTABlock,
}

export const RenderHomeBlocks: React.FC<{ blocks: Home['layout'] }> = ({ blocks }) => {
  const safeBlocks = blocks && Array.isArray(blocks) ? blocks : []

  if (safeBlocks.length === 0) return null

  return (
    <Fragment>
      {safeBlocks.map((block, index) => {
        const { blockType } = block

        if (blockType && blockType in homeBlockComponents) {
          const Block = homeBlockComponents[blockType as keyof typeof homeBlockComponents]

          if (Block) {
            // @ts-expect-error block type union resolves per blockType
            return <Block key={index} {...block} />
          }
        }

        return null
      })}
    </Fragment>
  )
}
