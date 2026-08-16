import { SectionHeading, SectionLabel } from '@/sections/_shared'
import React from 'react'

const PHASES = [
  {
    num: '01',
    title: 'Discover',
    description:
      'A discovery call to map your goals, constraints, current systems and the outcome you actually need.',
    tags: ['Discovery call', 'Requirements', 'Tech audit'],
  },
  {
    num: '02',
    title: 'Design',
    description:
      'Architecture, data model and API contracts agreed before any code is written. You approve the plan.',
    tags: ['Architecture', 'Data model', 'API contract'],
  },
  {
    num: '03',
    title: 'Build',
    description:
      'Shipped in short sprints with staging deploys you can see. You review real software, not slideware.',
    tags: ['Sprints', 'Daily standups', 'Staging deploys'],
  },
  {
    num: '04',
    title: 'Launch',
    description:
      'Migration, monitoring and documentation handled. We go live when it is boring and reliable.',
    tags: ['Migration', 'Monitoring', 'Docs'],
  },
  {
    num: '05',
    title: 'Iterate',
    description:
      'Post-launch feedback loop with metrics, profiling and a vNext roadmap agreed with you.',
    tags: ['Feedback loop', 'Metrics', 'vNext roadmap'],
  },
]

export default async function Process() {
  return (
    <section id="process" className="px-5 lg:px-[6vw] py-16 lg:py-24">
      <SectionLabel>// 06 — PROCESS</SectionLabel>
      <div className="mt-4 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
        <SectionHeading>A repeatable path from first call to shipped.</SectionHeading>
        <p className="text-muted-foreground max-w-md text-sm leading-relaxed">
          No black boxes, no mystery timelines. You always know what happens next.
        </p>
      </div>

      <div className="mt-10 flex flex-col gap-4">
        {PHASES.map((phase) => (
          <div
            key={phase.num}
            className="flex flex-col md:flex-row md:items-center gap-4 border border-border bg-card p-6"
          >
            <div className="font-mono-label text-synthesis">{phase.num}</div>
            <h3 className="font-heading text-2xl md:w-48">{phase.title}</h3>
            <p className="text-sm text-muted-foreground max-w-xl leading-relaxed">
              {phase.description}
            </p>
            <div className="md:ml-auto flex flex-wrap gap-2">
              {phase.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono-label text-[10px] border border-border px-2 py-1 text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
