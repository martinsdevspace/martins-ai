import type { GlobalConfig } from 'payload'

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
} from '@/blocks/Home/config'

import { revalidateHome } from './hooks/revalidateHome'

export const Home: GlobalConfig = {
  slug: 'home',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'layout',
      type: 'blocks',
      blocks: [
        HeroBlock,
        PainPointsBlock,
        MiniStackBlock,
        AboutBlock,
        WorksBlock,
        ServicesBlock,
        IndustriesBlock,
        ProcessBlock,
        TestimonialsBlock,
        InsightsBlock,
        PageCTABlock,
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateHome],
  },
  versions: false,
}
