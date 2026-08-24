import { IconArrowUpRight, IconCheck } from '@tabler/icons-react'
import Link from 'next/link'

import type { ServicesBlock as ServicesBlockProps } from '@/payload-types'
import { SectionHeading, SectionLabel } from '@/sections/_shared'
import { getCachedCollection } from '@/utilities/getCollection'
import { serviceIconMap } from '@/utilities/serviceIcons'

const getServices = getCachedCollection('services', { sort: 'sortOrder', limit: 8, depth: 2 })

export default async function Services({
  label,
  heading,
  intro,
  viewAllLabel,
}: ServicesBlockProps) {
  const services = await getServices()

  if (!heading && services.length === 0) return null

  return (
    <section id="services" className="px-5 lg:px-[6vw] py-16 lg:py-24">
      {label ? <SectionLabel className="mb-4">{label}</SectionLabel> : null}
      {heading ? <SectionHeading className="mb-4">{heading}</SectionHeading> : null}
      {intro ? <p className="text-muted-foreground text-base max-w-xl mb-12">{intro}</p> : null}

      <div className="flex flex-col gap-4">
        {services.map((service) => {
          const ServiceIcon = service.icon
            ? serviceIconMap[service.icon.toLowerCase()]
            : undefined
          let price: string | null = null
          if (service.startingFrom) {
            price = service.startingFrom.startsWith('$')
              ? service.startingFrom
              : '$' + service.startingFrom
          }
          const deliverables =
            service.deliverables
              ?.map((d) => d.item)
              .filter((item): item is string => Boolean(item))
              .slice(0, 4) || []

          return (
            <div key={service.slug || service.title} className="border border-border bg-card">
              <div className="grid md:grid-cols-[1fr_1.2fr] lg:grid-cols-[1.1fr_0.9fr]">
                <div className="p-6 flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    {ServiceIcon ? (
                      <span className="w-10 h-10 border border-synthesis/30 bg-synthesis/10 text-synthesis flex items-center justify-center">
                        <ServiceIcon className="w-5 h-5" />
                      </span>
                    ) : null}
                    {service.num ? (
                      <span className="font-mono-label text-synthesis">{service.num}</span>
                    ) : null}
                  </div>

                  <h3 className="font-heading text-2xl">{service.title}</h3>

                  {service.tagline ? (
                    <p className="text-sm text-muted-foreground">{service.tagline}</p>
                  ) : null}
                </div>

                <div className="p-6 hidden md:flex flex-col justify-between gap-6 border-l border-border">
                  <div className="flex flex-col gap-2 font-mono-label">
                    {price ? <span className="text-synthesis">from {price}</span> : null}
                    {service.timeline ? (
                      <span className="text-muted-foreground">{service.timeline}</span>
                    ) : null}
                  </div>

                  {deliverables.length > 0 ? (
                    <ul className="flex flex-col gap-2">
                      {deliverables.map((item) => (
                        <li
                          key={item}
                          className="flex items-center gap-2 text-sm text-muted-foreground"
                        >
                          <IconCheck className="w-4 h-4 text-synthesis shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  <div className="flex justify-end">
                    <Link
                      href={`/services/${service.slug}`}
                      className="border border-border p-2 text-foreground hover:border-synthesis hover:text-synthesis transition-colors"
                      aria-label={`${service.title} details`}
                    >
                      <IconArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {viewAllLabel ? (
        <div className="mt-10">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 font-mono-label text-muted-foreground hover:text-synthesis transition-colors"
          >
            {viewAllLabel}
            <IconArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      ) : null}
    </section>
  )
}
