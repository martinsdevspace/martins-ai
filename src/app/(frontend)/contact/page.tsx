import type { Metadata } from 'next'
import type { Form as FormType } from '@payloadcms/plugin-form-builder/types'
import React from 'react'

import {
  IconArrowUpRight,
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandX,
  IconCalendar,
  IconClock,
  IconMail,
} from '@tabler/icons-react'

import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { FormBlock } from '@/blocks/Form/Component'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'

type ChannelKind = 'email' | 'schedule' | 'linkedin' | 'github' | 'twitter' | 'link'

function getChannelKind(url?: string | null): ChannelKind {
  if (!url) return 'link'
  if (url.startsWith('mailto:')) return 'email'
  if (url.includes('calendly.com') || url.includes('cal.com')) return 'schedule'
  if (url.includes('linkedin.com')) return 'linkedin'
  if (url.includes('github.com')) return 'github'
  if (url.includes('twitter.com') || url.includes('x.com')) return 'twitter'
  return 'link'
}

const CHANNEL_ICON: Record<ChannelKind, React.ElementType> = {
  email: IconMail,
  schedule: IconCalendar,
  linkedin: IconBrandLinkedin,
  github: IconBrandGithub,
  twitter: IconBrandX,
  link: IconArrowUpRight,
}

const CHANNEL_CATEGORY: Record<ChannelKind, string> = {
  email: 'Email',
  schedule: 'Schedule',
  linkedin: 'LinkedIn',
  github: 'GitHub',
  twitter: 'X / Twitter',
  link: 'Link',
}

const emptyRichText = {
  root: {
    type: 'root' as const,
    version: 1,
    indent: 0,
    direction: 'ltr' as const,
    format: '' as const,
    children: [] as never[],
  },
}

export default async function ContactPage() {
  const siteSettings = await getCachedGlobal('site-settings', 1)()

  const payload = await getPayload({ config: configPromise })
  const formsResult = await payload.find({
    collection: 'forms',
    depth: 1,
    limit: 1,
    where: {
      title: {
        equals: 'Contact Form',
      },
    },
  })
  const form = formsResult.docs?.[0] as unknown as FormType | undefined

  const email = siteSettings.email || 'hello@martinsmichael.dev'
  const calendlyUrl = siteSettings.calendlyUrl || '/contact'

  const channels = siteSettings.contactChannels?.filter((c) => c.label || c.url) || []
  const steps = siteSettings.contactSteps?.filter((s) => s.title) || []
  const faq = siteSettings.contactFaq?.filter((f) => f.question) || []

  return (
    <article>
      {/* Hero */}
      <section className="px-5 lg:px-[6vw] pt-24 pb-16 lg:pb-24">
        <div className="flex items-center gap-3 mb-8 flex-wrap">
          <span className="font-mono-label text-muted-foreground">0x001 // DIRECT_CHANNEL</span>
          <span className="font-mono-label text-synthesis flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-synthesis rounded-full animate-pulse" />
            ACCEPTING_PROJECTS
          </span>
        </div>

        <h1 className="font-heading font-light text-foreground leading-[0.95] mb-8 text-5xl md:text-7xl lg:text-8xl tracking-tight text-balance">
          Let&apos;s Talk About
          <br />
          <span className="text-synthesis">Your Project.</span>
        </h1>

        <p className="text-lg lg:text-xl leading-relaxed text-foreground/80 max-w-2xl">
          I respond to every inquiry within 24 hours. Based in Abuja, working with teams in US, UK, EU,
          and Africa. Tell me what you&apos;re building, and I&apos;ll tell you if I can help. No automated
          replies, no sales funnel — just a direct conversation.
        </p>
      </section>

      {/* Form + Direct Channels */}
      <section className="px-5 lg:px-[6vw] py-16 lg:py-24 border-t border-border">
        <div className="flex items-center justify-between mb-10 lg:mb-14">
          <span className="font-mono-label text-muted-foreground">0x002 // TRANSMISSION_FORM</span>
          <span className="font-mono-label text-muted-foreground hidden md:block">SECURE_CHANNEL</span>
        </div>

        <div className="grid grid-cols-12 gap-6 lg:gap-12">
          {/* Form */}
          <div className="col-span-12 lg:col-span-7">
            {form ? (
              <FormBlock form={form} enableIntro={false} />
            ) : (
              <div className="border border-border bg-card p-8 flex flex-col gap-4">
                <h2 className="font-mono-label text-synthesis">// SEND_A_MESSAGE</h2>
                <p className="text-sm text-foreground/80">
                  The contact form isn&apos;t configured yet — email me directly at{' '}
                  <a href={`mailto:${email}`} className="text-synthesis underline">
                    {email}
                  </a>{' '}
                  or{' '}
                  <a href={calendlyUrl} target="_blank" rel="noopener noreferrer" className="text-synthesis underline">
                    book a call
                  </a>
                  .
                </p>
              </div>
            )}
          </div>

          {/* Direct Channels */}
          <div className="col-span-12 lg:col-span-4 lg:col-start-9">
            <div className="font-mono-label text-muted-foreground mb-6">// DIRECT_CHANNELS</div>
            <div className="space-y-0">
              {channels.map((channel, i) => {
                const kind = getChannelKind(channel.url)
                const Icon = CHANNEL_ICON[kind]
                return (
                  <a
                    key={i}
                    href={channel.url || '#'}
                    target={channel.url?.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="group flex items-start gap-4 py-4 border-t border-border last:border-b hover:bg-card transition-colors -mx-2 px-2"
                  >
                    <Icon className="w-4 h-4 text-foreground group-hover:text-synthesis transition-colors mt-1 shrink-0" />
                    <span className="flex-1 min-w-0">
                      <span className="font-mono text-[10px] tracking-wider text-muted-foreground uppercase block">
                        {CHANNEL_CATEGORY[kind]}
                      </span>
                      <span className="font-mono text-sm text-foreground group-hover:text-synthesis transition-colors block mt-0.5 truncate">
                        {channel.label}
                      </span>
                    </span>
                    <IconArrowUpRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-synthesis transition-colors mt-1 shrink-0" />
                  </a>
                )
              })}
            </div>

            {/* Response time */}
            <div className="mt-8 border border-border p-6">
              <div className="flex items-center gap-2 mb-3">
                <IconClock className="w-4 h-4 text-synthesis" />
                <span className="font-mono-label text-muted-foreground">RESPONSE_TIME</span>
              </div>
              <p className="text-sm leading-relaxed text-foreground/75">
                Typically responds within <span className="text-synthesis font-medium">24 hours</span>. For
                urgent matters, email is fastest. I&apos;m based in Abuja (WAT / UTC+1).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What Happens Next */}
      <section className="px-5 lg:px-[6vw] py-16 lg:py-24 border-t border-border">
        <div className="flex items-center justify-between mb-8 lg:mb-12">
          <span className="font-mono-label text-muted-foreground">0x003 // WHAT_HAPPENS_NEXT</span>
          <span className="font-mono-label text-muted-foreground hidden md:block">
            {String(steps.length).padStart(2, '0')} STAGES
          </span>
        </div>

        {steps.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
            {steps.map((step, i) => (
              <div key={i} className="bg-background p-6 lg:p-8">
                <span className="font-heading text-4xl lg:text-5xl font-light text-muted-foreground/60 block mb-4">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h2 className="font-heading text-lg font-light text-foreground mb-2">{step.title}</h2>
                <p className="text-sm leading-relaxed text-foreground/60">{step.description}</p>
              </div>
            ))}
          </div>
        ) : null}
      </section>

      {/* FAQ */}
      <section className="px-5 lg:px-[6vw] py-16 lg:py-24 border-t border-border">
        <div className="flex items-center justify-between mb-8 lg:mb-12">
          <span className="font-mono-label text-muted-foreground">0x004 // FAQ</span>
          <span className="font-mono-label text-muted-foreground hidden md:block">
            {String(faq.length).padStart(2, '0')} ENTRIES
          </span>
        </div>

        {faq.length > 0 ? (
          <div className="grid grid-cols-12 gap-6 lg:gap-12">
            <div className="col-span-12 lg:col-span-4">
              <h2 className="font-heading font-light text-foreground leading-[0.95] text-4xl lg:text-5xl text-balance">
                Quick
                <br />
                <span className="text-synthesis">answers.</span>
              </h2>
            </div>
            <div className="col-span-12 lg:col-span-8 space-y-0">
              {faq.map((item, i) => (
                <div key={i} className="py-6 border-t border-border last:border-b">
                  <h3 className="font-heading text-lg lg:text-xl font-light text-foreground mb-2">
                    {item.question}
                  </h3>
                  <p className="text-base leading-relaxed text-foreground/70">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </section>
    </article>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await getCachedGlobal('site-settings', 1)()

  const name = siteSettings.name || 'Martins Michael'
  const email = siteSettings.email || 'hello@martinsmichael.dev'

  return {
    title: `Contact — ${name} | Martin's AI`,
    description: `Let's talk about your project. Email ${email} or reach out about your build.`,
    openGraph: mergeOpenGraph({
      title: `Contact — ${name} | Martin's AI`,
      description: `Let's talk about your project. Email ${email} or reach out about your build.`,
    }),
  }
}