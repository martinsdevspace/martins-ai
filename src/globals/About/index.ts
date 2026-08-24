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
      name: 'heroLabel',
      type: 'text',
      defaultValue: '// — ABOUT',
      admin: { description: 'Eyebrow label for the About page hero.' },
    },
    {
      name: 'heroTitle',
      type: 'text',
      defaultValue: 'The builder behind the build.',
      admin: { description: 'Headline for the About page hero.' },
    },
    {
      name: 'heroIntro',
      type: 'textarea',
      defaultValue:
        'Background, philosophy, and the stack — what I care about, and how I like to work.',
      admin: { description: 'Intro paragraph for the About page hero.' },
    },
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
