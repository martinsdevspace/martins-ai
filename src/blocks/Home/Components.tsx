import React from 'react'

import About from '@/sections/About'
import Hero from '@/sections/Hero'
import Industries from '@/sections/Industries'
import Insights from '@/sections/Insights'
import MiniStack from '@/sections/MiniStack'
import PainPoints from '@/sections/PainPoints'
import Process from '@/sections/Process'
import Services from '@/sections/Services'
import Testimonials from '@/sections/Testimonials'
import Portfolio from '@/sections/Portfolio'
import { PageCTA } from '@/sections/PageCTA'

export const HeroBlock = () => <Hero />
export const PainPointsBlock = (props: React.ComponentProps<typeof PainPoints>) => (
  <PainPoints {...props} />
)
export const MiniStackBlock = (props: React.ComponentProps<typeof MiniStack>) => (
  <MiniStack {...props} />
)
export const AboutBlock = (props: React.ComponentProps<typeof About>) => <About {...props} />
export const WorksBlock = (props: React.ComponentProps<typeof Portfolio>) => <Portfolio {...props} />
export const ServicesBlock = (props: React.ComponentProps<typeof Services>) => (
  <Services {...props} />
)
export const IndustriesBlock = (props: React.ComponentProps<typeof Industries>) => (
  <Industries {...props} />
)
export const ProcessBlock = (props: React.ComponentProps<typeof Process>) => (
  <Process {...props} />
)
export const TestimonialsBlock = (props: React.ComponentProps<typeof Testimonials>) => (
  <Testimonials {...props} />
)
export const InsightsBlock = (props: React.ComponentProps<typeof Insights>) => (
  <Insights {...props} />
)

export type PageCTABlockProps = {
  address?: string | null
  statusBadge?: string | null
  title?: string | null
  subtitle?: string | null
  primaryLabel?: string | null
  primaryTo?: string | null
  secondaryLabel?: string | null
  secondaryTo?: string | null
  responseNote?: string | null
}

export const PageCTABlock = (props: PageCTABlockProps) => (
  <PageCTA
    address={props.address || undefined}
    statusBadge={props.statusBadge || undefined}
    title={props.title || undefined}
    subtitle={props.subtitle || undefined}
    primaryLabel={props.primaryLabel || undefined}
    primaryTo={props.primaryTo || undefined}
    secondaryLabel={props.secondaryLabel || undefined}
    secondaryTo={props.secondaryTo || undefined}
    responseNote={props.responseNote || undefined}
  />
)
