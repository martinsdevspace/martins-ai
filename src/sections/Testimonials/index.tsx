import Image from 'next/image'

import { IconQuote } from '@tabler/icons-react'

import type { TestimonialsBlock as TestimonialsBlockProps } from '@/payload-types'
import { SectionHeading, SectionLabel } from '@/sections/_shared'
import { getCachedCollection } from '@/utilities/getCollection'
import { getMediaUrl } from '@/utilities/getMediaUrl'

export default async function Testimonials({ label, heading, intro }: TestimonialsBlockProps) {
  const testimonials = await getCachedCollection('testimonials', {
    sort: 'sortOrder',
    limit: 6,
    depth: 1,
    where: { featured: { equals: true } },
  })()

  if (!heading && testimonials.length === 0) return null

  return (
    <section className="px-5 lg:px-[6vw] py-16 lg:py-24">
      {label ? <SectionLabel className="mb-4">{label}</SectionLabel> : null}
      {heading ? <SectionHeading className="mb-4">{heading}</SectionHeading> : null}
      {intro ? <p className="mb-12 max-w-2xl text-foreground/80">{intro}</p> : null}

      <div className="grid gap-4 md:grid-cols-3">
        {testimonials.map((item) => {
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
