import type { MiniStackBlock as MiniStackBlockProps } from '@/payload-types'

import { SectionHeading, SectionLabel } from '@/sections/_shared'

export default async function MiniStack({ label, heading, items }: MiniStackBlockProps) {
  const safeItems = (items || [])
    .map((item) => item.tech)
    .filter((tech): tech is string => Boolean(tech))

  if (!heading && safeItems.length === 0) return null

  return (
    <section id="mini-stack" className="px-5 lg:px-[6vw] py-16 lg:py-24">
      {label ? <SectionLabel className="mb-4">{label}</SectionLabel> : null}
      {heading ? <SectionHeading className="mb-12">{heading}</SectionHeading> : null}

      <div className="overflow-x-auto hide-scrollbar flex gap-3 pb-2">
        {safeItems.map((tech) => (
          <span
            key={tech}
            className="flex items-center gap-2 border border-border px-4 py-2 font-mono-label text-muted-foreground whitespace-nowrap"
          >
            <span className="w-1 h-1 bg-synthesis" />
            {tech}
          </span>
        ))}
      </div>
    </section>
  )
}
