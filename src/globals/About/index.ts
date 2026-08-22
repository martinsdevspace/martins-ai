import type { GlobalConfig } from 'payload'

import { AboutHeroBlock } from '@/blocks/About/AboutHero/config'
import { BeyondCodeBlock } from '@/blocks/About/BeyondCode/config'
import { CertificationsBlock } from '@/blocks/About/Certifications/config'
import { OriginStoryBlock } from '@/blocks/About/OriginStory/config'
import { PhilosophyBlock } from '@/blocks/About/Philosophy/config'
import { SkillsBlock } from '@/blocks/About/Skills/config'
import { TimelineBlock } from '@/blocks/About/Timeline/config'

import { revalidateAbout } from './hooks/revalidateAbout'

export const About: GlobalConfig = {
  slug: 'about',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'layout',
      type: 'blocks',
      blocks: [
        AboutHeroBlock,
        OriginStoryBlock,
        PhilosophyBlock,
        TimelineBlock,
        SkillsBlock,
        BeyondCodeBlock,
        CertificationsBlock,
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateAbout],
  },
  versions: false,
}
