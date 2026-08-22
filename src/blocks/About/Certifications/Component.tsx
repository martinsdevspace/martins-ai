import type { CertificationsBlock as CertificationsBlockProps } from '@/payload-types'

import React from 'react'

import { SectionHeading, SectionLabel } from '@/sections/_shared'
import { IconAward } from '@tabler/icons-react'

export const CertificationsBlock: React.FC<CertificationsBlockProps> = ({ heading, items }) => {
  const safeItems = items?.filter((c) => c.name) || []
  if (safeItems.length === 0) return null

  return (
    <section className="mt-20">
      {heading ? <SectionLabel>// — {heading}</SectionLabel> : null}
      <SectionHeading className="mt-4">{heading}</SectionHeading>

      <ul className="mt-10 grid gap-px border-t border-border md:grid-cols-2">
        {safeItems.map((item, index) => (
          <li
            key={item.id || `cert-${index}`}
            className="flex items-start gap-4 border-b border-border py-5"
          >
            <IconAward className="mt-0.5 h-5 w-5 shrink-0 text-synthesis" />
            <div>
              <p className="font-heading text-lg">{item.name}</p>
              <p className="font-mono-label text-muted-foreground">
                {item.issuer}
                {item.issuer && item.year ? ' · ' : ''}
                {item.year}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
