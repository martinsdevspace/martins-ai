'use client'

import { IconArrowUpRight, IconCheck, IconChevronDown } from '@tabler/icons-react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { motion } from 'framer-motion'
import Link from 'next/link'
import React, { useState } from 'react'

import RichText from '@/components/RichText'

export type ServiceRowData = {
  slug: string
  num: string
  title: string
  tagline: string | null
  description: SerializedEditorState | null
  deliverables: string[]
  stack: string[]
  timeline: string | null
  startingFrom: string | null
  process: { num: string | null; title: string | null; description: string | null }[]
  pricing: { name: string | null; description: string | null; best: string | null }[]
  faq: { question: string | null; answer: string | null }[]
}

type ServicesExperienceProps = {
  services: ServiceRowData[]
}

export const ServicesExperience: React.FC<ServicesExperienceProps> = ({ services }) => {
  const [open, setOpen] = useState<string | null>(services[0]?.slug ?? null)

  const toggle = (slug: string) => setOpen(open === slug ? null : slug)

  return (
    <div>
      {services.map((service, i) => {
        const isOpen = open === service.slug
        return (
          <motion.section
            key={service.slug}
            id={service.slug}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.4, delay: (i % 2) * 0.05 }}
            className="border-b border-border"
          >
            <button
              type="button"
              onClick={() => toggle(service.slug)}
              aria-expanded={isOpen}
              aria-controls={`service-${service.slug}`}
              className="group grid w-full grid-cols-12 items-baseline gap-x-4 gap-y-3 py-10 text-left lg:py-14"
            >
              <span className="col-span-2 font-mono-label text-synthesis lg:col-span-1">
                {service.num || String(i + 1).padStart(2, '0')}
              </span>
              <span className="col-span-10 lg:col-span-7">
                <span className="block font-heading text-3xl font-light tracking-tight text-foreground transition-colors group-hover:text-synthesis lg:text-5xl">
                  {service.title}
                </span>
                {service.tagline ? (
                  <span className="mt-2 block max-w-2xl text-base leading-relaxed text-foreground/70">
                    {service.tagline}
                  </span>
                ) : null}
              </span>
              <span className="col-span-10 col-start-3 flex items-center gap-4 lg:col-span-4 lg:col-start-auto">
                {service.startingFrom ? (
                  <span className="font-mono-label text-[10px] text-muted-foreground">
                    FROM {service.startingFrom}
                  </span>
                ) : null}
                <span className="ml-auto rounded-full border border-border p-2 transition-colors group-hover:border-synthesis group-hover:text-synthesis">
                  <IconChevronDown
                    className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                  />
                </span>
              </span>
            </button>

            <div
              id={`service-${service.slug}`}
              className={`grid transition-[grid-template-rows] duration-300 ${
                isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
              }`}
            >
              <div className="overflow-hidden">
                <div className="border-t border-border pb-12 pt-8 lg:pb-16">
                  <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
                    {service.description ? (
                      <div className="lg:col-span-5">
                        <div className="mb-4 font-mono-label text-muted-foreground">
                          What this solves
                        </div>
                        <RichText
                          data={service.description}
                          enableProse={false}
                          enableGutter={false}
                          className="space-y-3 text-sm leading-relaxed text-foreground/85"
                        />
                      </div>
                    ) : null}

                    <div className="lg:col-span-4">
                      {service.deliverables.length > 0 ? (
                        <div>
                          <div className="mb-4 font-mono-label text-muted-foreground">
                            What you get
                          </div>
                          <ul className="space-y-2">
                            {service.deliverables.map((item) => (
                              <li key={item} className="flex items-baseline gap-2 text-sm text-foreground/85">
                                <IconCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-synthesis" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : null}

                      {service.stack.length > 0 ? (
                        <div className="mt-8">
                          <div className="mb-4 font-mono-label text-muted-foreground">
                            Built with (for the technical folks)
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {service.stack.map((tech) => (
                              <span
                                key={tech}
                                className="border border-border px-2 py-1 font-mono-label text-[10px] text-muted-foreground"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      ) : null}
                    </div>

                    <div className="lg:col-span-3">
                      <div className="mb-4 font-mono-label text-muted-foreground">How it works</div>
                      {service.process.length > 0 ? (
                        <ol className="space-y-4">
                          {service.process.map((step) => (
                            <li key={step.title} className="flex gap-3">
                              <span className="font-mono-label shrink-0 text-synthesis">
                                {step.num || 'ST'}
                              </span>
                              <div>
                                <div className="text-sm font-medium text-foreground">{step.title}</div>
                                {step.description ? (
                                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                                    {step.description}
                                  </p>
                                ) : null}
                              </div>
                            </li>
                          ))}
                        </ol>
                      ) : null}

                      {service.timeline ? (
                        <div className="mt-6 border-t border-border pt-4">
                          <div className="font-mono-label text-muted-foreground">
                            How long it takes
                          </div>
                          <div className="mt-1 text-sm text-foreground">{service.timeline}</div>
                        </div>
                      ) : null}
                    </div>
                  </div>

                  {service.pricing.length > 0 ? (
                    <div className="mt-10 border-t border-border pt-10">
                      <div className="mb-6 font-mono-label text-muted-foreground">
                        What it costs
                      </div>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {service.pricing.map((tier, tierIndex) => (
                          <div
                            key={tier.name || tierIndex}
                            className={`flex flex-col gap-2 border p-6 ${
                              tier.best
                                ? 'border-synthesis bg-synthesis/5'
                                : 'border-border bg-card'
                            }`}
                          >
                            {tier.best ? (
                              <span className="w-fit border border-synthesis px-2 py-0.5 font-mono-label text-[9px] text-synthesis">
                                {tier.best}
                              </span>
                            ) : null}
                            <h4 className="font-heading text-xl font-light text-foreground">
                              {tier.name}
                            </h4>
                            {tier.description ? (
                              <p className="text-sm leading-relaxed text-muted-foreground">
                                {tier.description}
                              </p>
                            ) : null}
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  {service.faq.length > 0 ? (
                    <div className="mt-10 border-t border-border pt-10">
                      <div className="mb-6 font-mono-label text-muted-foreground">
                        Questions people ask before starting
                      </div>
                      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                        {service.faq.map((item, faqIndex) => (
                          <div key={item.question || faqIndex}>
                            <h4 className="text-sm font-medium text-foreground">{item.question}</h4>
                            {item.answer ? (
                              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                                {item.answer}
                              </p>
                            ) : null}
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  <div className="mt-10 flex flex-wrap items-center gap-4 border-t border-border pt-8">
                    <Link
                      href={`/contact?service=${service.slug}`}
                      className="inline-flex items-center gap-2 bg-foreground px-5 py-2.5 font-mono-label text-background transition-colors hover:bg-synthesis"
                    >
                      Get a quote for this
                      <IconArrowUpRight className="h-4 w-4" />
                    </Link>
                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-flex items-center gap-2 font-mono-label text-sm text-muted-foreground transition-colors hover:text-synthesis"
                    >
                      See full details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        )
      })}
    </div>
  )
}
