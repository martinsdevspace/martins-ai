import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import React from 'react'

import Link from 'next/link'

import { IconArrowLeft, IconArrowUpRight, IconCheck } from '@tabler/icons-react'

import { LivePreviewListener } from '@/components/LivePreviewListener'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import RichText from '@/components/RichText'
import configPromise from '@payload-config'
import type { Service } from '@/payload-types'
import { SectionLabel } from '@/sections/_shared'
import { generateMeta } from '@/utilities/generateMeta'
import { serviceIconMap } from '@/utilities/serviceIcons'
import { getPayload } from 'payload'

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function ServicePage({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const url = '/services/' + decodedSlug
  const service = await queryServiceBySlug({ slug: decodedSlug })

  if (!service) return <PayloadRedirects url={url} />

  const ServiceIcon = service.icon ? serviceIconMap[service.icon.toLowerCase()] : undefined
  const deliverables = service.deliverables?.map((d) => d.item).filter((i): i is string => Boolean(i)) || []
  const stack = service.stack?.map((s) => s.tech).filter((t): t is string => Boolean(t)) || []
  const process = service.process?.filter((p) => p.title) || []
  const pricing = service.pricing?.filter((p) => p.name) || []
  const faq = service.faq?.filter((f) => f.question) || []

  let price: string | null = null
  if (service.startingFrom) {
    price = service.startingFrom.startsWith('$')
      ? service.startingFrom
      : '$' + service.startingFrom
  }

  return (
    <article className="px-5 lg:px-[6vw] pt-24 pb-24">
      {draft && <LivePreviewListener />}

      <Link
        href="/#services"
        className="inline-flex items-center gap-2 font-mono-label text-muted-foreground hover:text-synthesis transition-colors"
      >
        <IconArrowLeft className="h-4 w-4" />
        Back to services
      </Link>

      <div className="mt-10 grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="flex items-center gap-3">
            {ServiceIcon ? (
              <span className="w-12 h-12 border border-synthesis/30 bg-synthesis/10 text-synthesis flex items-center justify-center">
                <ServiceIcon className="w-6 h-6" />
              </span>
            ) : null}
            {service.num ? (
              <SectionLabel className="mb-0">{service.num}</SectionLabel>
            ) : null}
          </div>
          <h1 className="mt-4 font-heading text-4xl md:text-6xl font-light tracking-tight text-balance">
            {service.title}
          </h1>
          {service.tagline ? (
            <p className="mt-4 max-w-xl text-lg text-muted-foreground">{service.tagline}</p>
          ) : null}
        </div>

        <div className="lg:col-span-5">
          <div className="border border-border bg-card p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between font-mono-label">
              <span className="text-muted-foreground">ENGAGEMENT</span>
              {price ? <span className="text-synthesis">from {price}</span> : null}
            </div>
            {service.timeline ? (
              <div className="flex items-center justify-between font-mono-label">
                <span className="text-muted-foreground">TIMELINE</span>
                <span>{service.timeline}</span>
              </div>
            ) : null}
            {stack.length > 0 ? (
              <div>
                <p className="font-mono-label text-muted-foreground mb-2">STACK</p>
                <div className="flex flex-wrap gap-1.5">
                  {stack.map((tech) => (
                    <span key={tech} className="border border-border px-2 py-1 font-mono-label text-[10px] text-muted-foreground">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-foreground px-5 py-2.5 font-mono-label text-background hover:bg-synthesis transition-colors"
            >
              Start a project
              <IconArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      {service.description ? (
        <section className="mt-16 max-w-3xl">
          <RichText
            data={service.description}
            enableProse={false}
            enableGutter={false}
            className="text-base leading-relaxed text-foreground/80"
          />
        </section>
      ) : null}

      <div className="mt-16 grid gap-10 lg:grid-cols-2">
        {deliverables.length > 0 ? (
          <section>
            <h2 className="font-mono-label text-synthesis mb-6">// DELIVERABLES</h2>
            <ul className="flex flex-col gap-3">
              {deliverables.map((item) => (
                <li key={item} className="flex items-start gap-3 border border-border bg-card px-5 py-4">
                  <IconCheck className="h-4 w-4 text-synthesis shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground/80">{item}</span>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {process.length > 0 ? (
          <section>
            <h2 className="font-mono-label text-synthesis mb-6">// PROCESS</h2>
            <div className="flex flex-col gap-2">
              {process.map((step) => (
                <div key={step.id || step.num || step.title} className="border border-border bg-card p-5">
                  <div className="flex items-center gap-3">
                    {step.num ? (
                      <span className="font-mono-label text-synthesis">{step.num}</span>
                    ) : null}
                    <h3 className="font-heading text-xl">{step.title}</h3>
                  </div>
                  {step.description ? (
                    <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
                  ) : null}
                </div>
              ))}
            </div>
          </section>
        ) : null}
      </div>

      {service.code?.code ? (
        <section className="mt-16 max-w-3xl">
          <h2 className="font-mono-label text-synthesis mb-4">
            // {service.code.title || 'CODE_SAMPLE'}
          </h2>
          <div className="border border-border bg-card">
            <div className="flex items-center justify-between border-b border-border px-4 py-2">
              <span className="font-mono-label text-muted-foreground">{service.code.language || 'code'}</span>
            </div>
            <pre className="overflow-x-auto p-5 text-sm leading-relaxed text-foreground/80">
              <code>{service.code.code}</code>
            </pre>
          </div>
        </section>
      ) : null}

      {pricing.length > 0 ? (
        <section className="mt-16">
          <h2 className="font-mono-label text-synthesis mb-6">// ENGAGEMENT_MODELS</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {pricing.map((model) => (
              <div key={model.id || model.name} className="border border-border bg-card p-6 flex flex-col gap-3">
                <h3 className="font-heading text-xl">{model.name}</h3>
                {model.description ? (
                  <p className="text-sm text-muted-foreground flex-1">{model.description}</p>
                ) : null}
                {model.best ? (
                  <span className="font-mono-label text-synthesis border-t border-border pt-3">
                    BEST FOR: {model.best}
                  </span>
                ) : null}
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {faq.length > 0 ? (
        <section className="mt-16 max-w-3xl">
          <h2 className="font-mono-label text-synthesis mb-6">// FAQ</h2>
          <div className="flex flex-col gap-4">
            {faq.map((item, i) => (
              <div key={i} className="border border-border bg-card p-6">
                <h3 className="font-heading text-xl">{item.question}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>
      ) : null}
    </article>
  )
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const services = await payload.find({
    collection: 'services',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  return services.docs.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const service = await queryServiceBySlug({ slug: decodedSlug })

  return generateMeta({ doc: service })
}

const queryServiceBySlug = async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'services',
    depth: 2,
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return (result.docs?.[0] as Service) || null
}
