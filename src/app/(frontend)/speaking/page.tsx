import type { Metadata } from 'next'

import { IconArrowUpRight } from '@tabler/icons-react'
import Link from 'next/link'
import React from 'react'

import RichText from '@/components/RichText'
import { SectionHeading, SectionLabel } from '@/sections/_shared'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'

export default async function SpeakingPage() {
  const speaking = await getCachedGlobal('speaking', 2)()

  const talks = speaking.talks?.filter((t) => t.title) || []
  const upcoming = talks.filter((t) => t.featured)
  const past = talks.filter((t) => !t.featured)

  return (
    <article className="px-5 py-24 lg:px-[6vw]">
      <div className="mx-auto max-w-6xl">
        <SectionLabel>// — SPEAKING</SectionLabel>

        {speaking.intro ? (
          <div className="mt-6 max-w-3xl">
            <RichText
              data={speaking.intro}
              enableProse={false}
              enableGutter={false}
              className="text-base leading-relaxed text-foreground/80"
            />
          </div>
        ) : null}

        {upcoming.length > 0 ? (
          <section className="mt-16">
            <SectionHeading className="mb-8">Upcoming</SectionHeading>
            <TalkList talks={upcoming} />
          </section>
        ) : null}

        {past.length > 0 ? (
          <section className="mt-16">
            <SectionHeading className="mb-8">Selected talks</SectionHeading>
            <TalkList talks={past} />
          </section>
        ) : null}

        {talks.length === 0 ? (
          <p className="mt-16 font-mono-label text-muted-foreground">
            // No talks listed yet. Check back soon.
          </p>
        ) : null}
      </div>
    </article>
  )
}

type Talk = {
  title: string
  event?: string | null
  year?: string | null
  location?: string | null
  link?: string | null
  description?: string | null
}

const TalkList: React.FC<{ talks: Talk[] }> = ({ talks }) => {
  return (
    <ul className="grid gap-px border-t border-border">
      {talks.map((talk, index) => {
        const body = (
          <>
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h3 className="font-heading text-xl">{talk.title}</h3>
              {talk.year ? <span className="font-mono-label text-synthesis">{talk.year}</span> : null}
            </div>
            {talk.event || talk.location ? (
              <p className="mt-1 font-mono-label text-muted-foreground">
                {talk.event}
                {talk.event && talk.location ? ' · ' : ''}
                {talk.location}
              </p>
            ) : null}
            {talk.description ? (
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{talk.description}</p>
            ) : null}
          </>
        )

        return (
          <li key={talk.link || `talk-${index}`} className="border-b border-border py-6">
            {talk.link ? (
              <Link
                href={talk.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start justify-between gap-4"
              >
                <div className="flex-1">{body}</div>
                <IconArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-muted-foreground transition-colors group-hover:text-synthesis" />
              </Link>
            ) : (
              body
            )}
          </li>
        )
      })}
    </ul>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const title = 'Speaking — Martins Michael'
  const description = 'Talks, panels and workshops on engineering, AI agents and systems.'

  return {
    title,
    description,
    openGraph: mergeOpenGraph({
      title,
      description,
      siteName: 'Martins Michael',
    }),
  }
}
