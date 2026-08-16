import React from 'react'

export interface TimelinePhase {
  period?: string | null
  phase?: string | null
  description?: string | null
  hurdle?: string | null
  milestone?: string | null
}

export function ProjectTimeline({ phases }: { phases: TimelinePhase[] }) {
  if (!phases || phases.length === 0) return null

  return (
    <section className="mt-20">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="font-mono-label text-synthesis">// HOW_IT_UNFOLDED</h2>
        <span className="font-mono-label text-muted-foreground">{phases.length} PHASES</span>
      </div>

      <div className="relative">
        <div className="absolute bottom-1 left-[7px] top-1 w-px bg-border" />

        <div className="flex flex-col gap-10">
          {phases.map((phase, i) => (
            <div key={phase.period || i} className="relative pl-10">
              <span className="absolute left-0 top-1.5 z-10 block h-3.5 w-3.5 rounded-full bg-synthesis ring-4 ring-background" />

              <div className="mb-2 flex items-baseline gap-3">
                {phase.period ? (
                  <span className="whitespace-nowrap font-mono text-xs tracking-wider text-synthesis">
                    {phase.period}
                  </span>
                ) : null}
                <span className="font-mono text-[10px] tracking-wider text-muted-foreground">
                  PHASE {String(i + 1).padStart(2, '0')}
                </span>
              </div>

              {phase.phase ? (
                <h3 className="mb-2 font-heading text-xl font-light lg:text-2xl">{phase.phase}</h3>
              ) : null}
              {phase.description ? (
                <p className="mb-4 max-w-3xl text-sm leading-relaxed text-foreground/75 lg:text-base">
                  {phase.description}
                </p>
              ) : null}

              {phase.hurdle ? (
                <div className="mb-2 flex max-w-3xl items-start gap-3">
                  <span className="mt-1 flex-shrink-0 border border-border px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
                    Hurdle
                  </span>
                  <span className="text-sm leading-relaxed text-foreground/70">{phase.hurdle}</span>
                </div>
              ) : null}
              {phase.milestone ? (
                <div className="flex max-w-3xl items-start gap-3">
                  <span className="mt-1 flex-shrink-0 border border-synthesis px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-synthesis">
                    Milestone
                  </span>
                  <span className="text-sm leading-relaxed text-foreground/70">{phase.milestone}</span>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
