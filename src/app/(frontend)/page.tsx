import type { Metadata } from 'next'

import React from 'react'

import { RenderHomeBlocks } from '@/blocks/Home/RenderHomeBlocks'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'

export default async function HomePage() {
  const home = await getCachedGlobal('home', 0)()

  return <RenderHomeBlocks blocks={home.layout} />
}

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await getCachedGlobal('site-settings', 0)()

  const name = siteSettings?.name || 'Martins Michael'
  const tagline = siteSettings?.tagline || 'Full-Stack Developer & AI Agent Architect'

  return {
    title: `${name} — ${tagline}`,
    description: tagline,
    openGraph: mergeOpenGraph({
      title: `${name} — ${tagline}`,
      description: tagline,
      siteName: name,
    }),
  }
}
