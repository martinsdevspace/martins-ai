import type { Metadata } from 'next'
import React from 'react'

import { PageCTA } from '@/sections/PageCTA'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'

import ResumeDocument from './ResumeDocument'
import ResumeInteractive from './ResumeInteractive'

export default async function ResumePage() {
  const resume = await getCachedGlobal('resume', 1)()

  const name = resume.name || 'Martins Michael'
  const highlights = resume.highlights?.filter((h) => h.value || h.label) || []
  const downloadFilename = `${name.replace(/\s+/g, '_')}_Resume.pdf`

  return (
    <article>
      <ResumeInteractive
        name={name}
        version={resume.version}
        highlights={highlights}
        downloadFilename={downloadFilename}
      >
        <ResumeDocument resume={resume} />
      </ResumeInteractive>

      <PageCTA
        address="0x003 // END_OF_FILE"
        title="Let's Build Something That Lasts"
        subtitle="I'm selective about the projects I take on. If you're building something that matters, let's talk. I respond within 24 hours."
        primaryLabel="BOOK_FREE_REVIEW"
        primaryTo="/contact"
        secondaryLabel="VIEW_PORTFOLIO"
        secondaryTo="/portfolio"
      />
    </article>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const resume = await getCachedGlobal('resume', 1)()

  const name = resume.name || 'Martins Michael'
  const title = resume.title || 'Full-Stack Developer & AI Agent Architect'

  return {
    title: `Résumé — ${name} | Martin's AI`,
    description: title,
    openGraph: mergeOpenGraph({
      title: `Résumé — ${name} | Martin's AI`,
      description: title,
    }),
  }
}
