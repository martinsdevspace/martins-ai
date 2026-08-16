import type { Metadata } from 'next'

import { getCachedGlobal } from '@/utilities/getGlobals'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import React from 'react'

import About from '@/sections/About'
import CaseStudies from '@/sections/CaseStudies'
import Hero from '@/sections/Hero'
import Industries from '@/sections/Industries'
import Insights from '@/sections/Insights'
import MiniStack from '@/sections/MiniStack'
import { PageCTA } from '@/sections/PageCTA'
import PainPoints from '@/sections/PainPoints'
import Process from '@/sections/Process'
import Services from '@/sections/Services'
import Testimonials from '@/sections/Testimonials'
import Works from '@/sections/Works'

export default async function HomePage() {
  return (
    <article>
      <Hero />
      <PainPoints />
      <MiniStack />
      <About />
      <Works />
      <Services />
      <Industries />
      {/* <CaseStudies /> */}
      <Process />
      <Testimonials />
      <Insights />
      <PageCTA />
    </article>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await getCachedGlobal('site-settings', 0)()

  const name = siteSettings?.name || 'Martins Michael'
  const tagline =
    siteSettings?.tagline || 'Full-Stack Developer & AI Agent Architect'

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
