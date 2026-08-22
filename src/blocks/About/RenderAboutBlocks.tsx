import React, { Fragment } from 'react'

import type { About } from '@/payload-types'

import { AboutHeroBlock } from '@/blocks/About/AboutHero/Component'
import { BeyondCodeBlock } from '@/blocks/About/BeyondCode/Component'
import { CertificationsBlock } from '@/blocks/About/Certifications/Component'
import { OriginStoryBlock } from '@/blocks/About/OriginStory/Component'
import { PhilosophyBlock } from '@/blocks/About/Philosophy/Component'
import { SkillsBlock } from '@/blocks/About/Skills/Component'
import { TimelineBlock } from '@/blocks/About/Timeline/Component'

const aboutBlockComponents = {
  aboutHero: AboutHeroBlock,
  originStory: OriginStoryBlock,
  philosophy: PhilosophyBlock,
  timeline: TimelineBlock,
  skills: SkillsBlock,
  beyondCode: BeyondCodeBlock,
  certifications: CertificationsBlock,
}

export const RenderAboutBlocks: React.FC<{ blocks: About['layout'] }> = ({ blocks }) => {
  const safeBlocks = blocks && Array.isArray(blocks) ? blocks : []

  if (safeBlocks.length === 0) return null

  return (
    <Fragment>
      {safeBlocks.map((block, index) => {
        const { blockType } = block

        if (blockType && blockType in aboutBlockComponents) {
          const Block = aboutBlockComponents[blockType as keyof typeof aboutBlockComponents]

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
