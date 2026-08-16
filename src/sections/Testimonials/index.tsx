import Image from 'next/image'

import { IconQuote } from '@tabler/icons-react'

import type { Testimonial } from '@/payload-types'
import { SectionHeading, SectionLabel } from '@/sections/_shared'
import { getCachedCollection } from '@/utilities/getCollection'
import { getMediaUrl } from '@/utilities/getMediaUrl'

const fallbackTestimonials: Testimonial[] = [
  {
    id: 1,
    author: 'Adaobi Nwosu',
    role: 'VP of Engineering',
    company: 'Ledgerline',
    quote:
      'Martins rebuilt our reconciliation pipeline without a single late-night incident. The migration was invisible to customers and auditable to the last cent.',
    featured: true,
    sortOrder: 1,
    updatedAt: '',
    createdAt: '',
  },
  {
    id: 2,
    author: 'Jonas Lindqvist',
    role: 'Founder',
    company: 'Northbeam AI',
    quote:
      'The agent framework felt like it had already been in production for years. He designed for failure modes we had not even thought to worry about yet.',
    featured: true,
    sortOrder: 2,
    updatedAt: '',
    createdAt: '',
  },
  {
    id: 3,
    author: 'Priya Raman',
    role: 'CTO',
    company: 'Sokudo',
    quote:
      'Clean boundaries, honest tooling, and code that reads like a proof. He shipped the whole payments flow in half the timeline we budgeted.',
    featured: true,
    sortOrder: 3,
    updatedAt: '',
    createdAt: '',
  },
]

export default async function Testimonials() {
  const testimonials = await getCachedCollection('testimonials', {
    sort: 'sortOrder',
    limit: 6,
    depth: 1,
    where: { featured: { equals: true } },
  })()
  const items = testimonials.length ? testimonials : fallbackTestimonials

  return (
    <section className="px-5 lg:px-[6vw] py-16 lg:py-24">
      <SectionLabel className="mb-4">// 07 — TESTIMONIALS</SectionLabel>
      <SectionHeading className="mb-4">What founders and engineering leads say.</SectionHeading>
      <p className="mb-12 max-w-2xl text-foreground/80">
        Working with Martins means a system that ships, survives, and scales. This is what the
        teams on the other side of that work say about it.
      </p>

      <div className="grid gap-4 md:grid-cols-3">
        {items.map((item) => {
          const avatar = item.avatar && typeof item.avatar === 'object' ? item.avatar : null
          const avatarUrl = getMediaUrl(avatar?.url, avatar?.updatedAt)
          return (
            <figure key={item.id} className="flex flex-col gap-4 border border-border bg-card p-6">
              <IconQuote className="h-6 w-6 text-synthesis" />
              <blockquote className="flex-1 text-sm leading-relaxed text-foreground/80">
                {item.quote}
              </blockquote>
              <figcaption className="flex items-center gap-3 border-t border-border pt-4">
                {avatar && avatarUrl ? (
                  <Image
                    src={avatarUrl}
                    alt={avatar.alt || item.author}
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-none object-cover"
                  />
                ) : null}
                <div>
                  <p className="font-mono-label text-foreground">{item.author}</p>
                  <p className="font-mono-label text-muted-foreground">
                    {item.role}
                    {item.role && item.company ? ' · ' : ''}
                    {item.company}
                  </p>
                </div>
              </figcaption>
            </figure>
          )
        })}
      </div>
    </section>
  )
}
