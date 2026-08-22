import type { Block } from 'payload'

export const HeroBlock: Block = {
  slug: 'homeHero',
  interfaceName: 'HeroBlock',
  fields: [],
}

export const PainPointsBlock: Block = {
  slug: 'painPoints',
  interfaceName: 'PainPointsBlock',
  fields: [],
}

export const MiniStackBlock: Block = {
  slug: 'miniStack',
  interfaceName: 'MiniStackBlock',
  fields: [],
}

export const AboutBlock: Block = {
  slug: 'about',
  interfaceName: 'AboutBlock',
  fields: [],
}

export const WorksBlock: Block = {
  slug: 'works',
  interfaceName: 'WorksBlock',
  fields: [],
}

export const ServicesBlock: Block = {
  slug: 'services',
  interfaceName: 'ServicesBlock',
  fields: [],
}

export const IndustriesBlock: Block = {
  slug: 'industries',
  interfaceName: 'IndustriesBlock',
  fields: [],
}

export const ProcessBlock: Block = {
  slug: 'process',
  interfaceName: 'ProcessBlock',
  fields: [],
}

export const TestimonialsBlock: Block = {
  slug: 'testimonials',
  interfaceName: 'TestimonialsBlock',
  fields: [],
}

export const InsightsBlock: Block = {
  slug: 'insights',
  interfaceName: 'InsightsBlock',
  fields: [],
}

export const PageCTABlock: Block = {
  slug: 'pageCta',
  interfaceName: 'PageCTABlock',
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'subtitle',
      type: 'text',
    },
    {
      name: 'primaryLabel',
      type: 'text',
    },
    {
      name: 'primaryTo',
      type: 'text',
    },
    {
      name: 'secondaryLabel',
      type: 'text',
    },
    {
      name: 'secondaryTo',
      type: 'text',
    },
  ],
}
