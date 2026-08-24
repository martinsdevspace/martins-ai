import { IconAlertTriangle, IconCloudOff, IconDatabase, IconPlugConnected } from '@tabler/icons-react'
import type { ElementType } from 'react'

import type { PainPointsBlock as PainPointsBlockProps } from '@/payload-types'
import { SectionHeading, SectionLabel } from '@/sections/_shared'

const iconMap: Record<string, ElementType> = {
  database: IconDatabase,
  plug: IconPlugConnected,
  cloudoff: IconCloudOff,
  alerttriangle: IconAlertTriangle,
}

export default async function PainPoints({
  label,
  heading,
  intro,
  items,
}: PainPointsBlockProps) {
  const safeItems = (items || []).filter((item) => item.title)

  if (!heading && safeItems.length === 0) return null

  return (
    <section id="pain-points" className="px-5 lg:px-[6vw] py-16 lg:py-24">
      {label ? <SectionLabel className="mb-4">{label}</SectionLabel> : null}
      {heading ? <SectionHeading className="mb-4">{heading}</SectionHeading> : null}
      {intro ? (
        <p className="text-muted-foreground text-base max-w-xl mb-12">{intro}</p>
      ) : null}

      <div className="grid md:grid-cols-3 gap-4">
        {safeItems.map((item, index) => {
          const Icon = iconMap[(item.icon || '').toLowerCase()]
          return (
            <div key={item.id || `pain-${index}`} className="border border-border bg-card p-6 flex flex-col gap-4">
              {Icon ? (
                <div className="w-10 h-10 border border-synthesis/30 bg-synthesis/10 text-synthesis flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
              ) : null}
              <h3 className="font-heading text-2xl">{item.title}</h3>
              {item.body ? <p className="text-sm text-muted-foreground">{item.body}</p> : null}
            </div>
          )
        })}
      </div>
    </section>
  )
}
