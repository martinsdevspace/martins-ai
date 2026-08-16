import { IconAlertTriangle, IconCloudOff, IconDatabase, IconPlugConnected } from '@tabler/icons-react'

import { SectionHeading, SectionLabel } from '@/sections/_shared'

const PAIN_POINTS = [
  {
    icon: IconDatabase,
    title: 'Siloed data',
    body: 'Your systems don\u2019t talk to each other.',
  },
  {
    icon: IconPlugConnected,
    title: 'Janky integrations',
    body: 'Every tool fights the next one.',
  },
  {
    icon: IconCloudOff,
    title: 'Bottlenecked features',
    body: 'Ship slower while competitors ship faster.',
  },
]

export default async function PainPoints() {
  return (
    <section id="pain-points" className="px-5 lg:px-[6vw] py-16 lg:py-24">
      <SectionLabel className="mb-4">// THE_OLD_WAY</SectionLabel>
      <SectionHeading className="mb-4">Stop fighting your stack.</SectionHeading>
      <p className="text-muted-foreground text-base max-w-xl mb-12">
        Most teams don\u2019t have an engineering problem. They have a systems problem - the
        tooling was never built to work together.
      </p>

      <div className="grid md:grid-cols-3 gap-4">
        {PAIN_POINTS.map(({ icon: Icon, title, body }) => (
          <div key={title} className="border border-border bg-card p-6 flex flex-col gap-4">
            <div className="w-10 h-10 border border-synthesis/30 bg-synthesis/10 text-synthesis flex items-center justify-center">
              <Icon className="w-5 h-5" />
            </div>
            <h3 className="font-heading text-2xl">{title}</h3>
            <p className="text-sm text-muted-foreground">{body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
