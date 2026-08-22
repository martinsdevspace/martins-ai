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
import Works from '@/sections/Works'
import { PageCTA } from '@/sections/PageCTA'

export const HeroBlock = () => <Hero />
export const PainPointsBlock = () => <PainPoints />
export const MiniStackBlock = () => <MiniStack />
export const AboutBlock = () => <About />
export const WorksBlock = () => <Works />
export const ServicesBlock = () => <Services />
export const IndustriesBlock = () => <Industries />
export const ProcessBlock = () => <Process />
export const TestimonialsBlock = () => <Testimonials />
export const InsightsBlock = () => <Insights />

export const PageCTABlock = ({
  title,
  subtitle,
  primaryLabel,
  primaryTo,
  secondaryLabel,
  secondaryTo,
}: {
  title?: string
  subtitle?: string
  primaryLabel?: string
  primaryTo?: string
  secondaryLabel?: string
  secondaryTo?: string
}) => (
  <PageCTA
    title={title}
    subtitle={subtitle}
    primaryLabel={primaryLabel}
    primaryTo={primaryTo}
    secondaryLabel={secondaryLabel}
    secondaryTo={secondaryTo}
  />
)
