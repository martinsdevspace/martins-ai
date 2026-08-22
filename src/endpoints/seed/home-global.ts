import type { DataFromGlobalSlug } from 'payload'

import { lexical, para } from './richtext'

export const homeGlobal = (): Partial<DataFromGlobalSlug<'home'>> => ({
  layout: [
    { blockType: 'homeHero' },
    { blockType: 'painPoints' },
    { blockType: 'miniStack' },
    { blockType: 'about' },
    { blockType: 'works' },
    { blockType: 'services' },
    { blockType: 'industries' },
    { blockType: 'process' },
    { blockType: 'testimonials' },
    { blockType: 'insights' },
    {
      blockType: 'pageCta',
    },
  ],
})
