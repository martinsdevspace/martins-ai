import React from 'react'

import RichText from '@/components/RichText'
import type { Resume as ResumeGlobal } from '@/payload-types'

/**
 * A single, print-realistic rendering of the CMS-managed Resume global.
 * Deliberately styled with the fixed `paper`/`carbon` tokens (not the
 * theme-aware `background`/`foreground` ones) so it looks like an actual
 * printed document regardless of the site's light/dark mode — this is also
 * the exact DOM node `html2canvas` captures for the PDF export in
 * `ResumeInteractive`, so its look here IS the look of the downloaded PDF.
 */
export default function ResumeDocument({ resume }: { resume: ResumeGlobal }) {
  const email = resume.email || 'hello@martinsmichael.dev'
  const location = resume.location || 'Abuja, NG · Remote Worldwide'

  const highlights = resume.highlights?.filter((h) => h.value || h.label) || []
  const experience = resume.experience?.filter((e) => e.role || e.company) || []
  const education = resume.education?.filter((e) => e.degree || e.institution) || []
  const skills = resume.skills?.filter((s) => s.category) || []
  const certifications = resume.certifications?.filter((c) => c.name) || []
  const speaking = resume.speaking?.filter((s) => s.event || s.title) || []

  const contactLinks = [
    resume.website ? { label: resume.website, href: resume.website } : null,
    resume.github ? { label: 'GitHub', href: resume.github } : null,
    resume.linkedin ? { label: 'LinkedIn', href: resume.linkedin } : null,
  ].filter(Boolean) as { label: string; href: string }[]

  return (
    <div className="border border-carbon/10 bg-paper p-8 text-carbon sm:p-12 lg:p-16">
      {/* Header */}
      <div className="flex flex-col gap-6 border-b border-carbon/15 pb-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-heading text-3xl font-light tracking-tight sm:text-4xl">
            {resume.name || 'Martins Michael'}
          </h1>
          <p className="mt-2 font-mono text-[11px] uppercase tracking-wider text-carbon/60">
            {resume.title || 'Full-Stack Developer & AI Agent Architect'}
          </p>
        </div>
        <div className="flex flex-col gap-1 font-mono text-[11px] text-carbon/70 sm:items-end sm:text-right">
          <span>{email}</span>
          {resume.phone ? <span>{resume.phone}</span> : null}
          <span>{location}</span>
          {contactLinks.map((link) => (
            <span key={link.label}>{link.label}</span>
          ))}
        </div>
      </div>

      {/* Highlights */}
      {highlights.length > 0 ? (
        <div className="mt-8 grid grid-cols-2 gap-px border border-carbon/15 bg-carbon/15 sm:grid-cols-4">
          {highlights.map((h, index) => (
            <div key={h.id || `highlight-${index}`} className="bg-paper p-4">
              <p className="font-heading text-xl">{h.value}</p>
              <p className="mt-1 font-mono text-[9px] uppercase tracking-wider text-carbon/60">
                {h.label}
              </p>
            </div>
          ))}
        </div>
      ) : null}

      {/* Summary */}
      {resume.summary ? (
        <div className="mt-8">
          <RichText
            data={resume.summary}
            enableProse={false}
            enableGutter={false}
            className="text-sm leading-relaxed text-carbon/80"
          />
        </div>
      ) : null}

      {/* Experience */}
      {experience.length > 0 ? (
        <section className="mt-10">
          <h2 className="font-mono text-[10px] uppercase tracking-wider text-carbon/50">
            Experience
          </h2>
          <div className="mt-4 flex flex-col gap-6">
            {experience.map((job) => {
              const achievements =
                job.achievements?.map((a) => a.achievement).filter((a): a is string => Boolean(a)) ||
                []
              const stack = job.stack?.map((s) => s.tech).filter((t): t is string => Boolean(t)) || []

              return (
                <div key={job.id || job.company || job.role}>
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                    <div>
                      <h3 className="font-heading text-lg">{job.role}</h3>
                      <p className="font-mono text-[11px] text-carbon/60">
                        {job.company}
                        {job.location ? ` · ${job.location}` : ''}
                      </p>
                    </div>
                    {job.period ? (
                      <span className="font-mono text-[10px] text-carbon/50">{job.period}</span>
                    ) : null}
                  </div>

                  {job.summary ? (
                    <p className="mt-2 text-sm leading-relaxed text-carbon/75">{job.summary}</p>
                  ) : null}

                  {achievements.length > 0 ? (
                    <ul className="mt-2 flex flex-col gap-1">
                      {achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-carbon/80">
                          <span className="mt-1.5 h-1 w-1 shrink-0 bg-carbon/50" />
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  {stack.length > 0 ? (
                    <p className="mt-2 font-mono text-[10px] text-carbon/50">{stack.join(' · ')}</p>
                  ) : null}
                </div>
              )
            })}
          </div>
        </section>
      ) : null}

      <div className="mt-10 grid gap-10 sm:grid-cols-2">
        {/* Education */}
        {education.length > 0 ? (
          <section>
            <h2 className="font-mono text-[10px] uppercase tracking-wider text-carbon/50">
              Education
            </h2>
            <div className="mt-4 flex flex-col gap-4">
              {education.map((edu) => (
                <div key={edu.id || edu.degree || edu.institution}>
                  <h3 className="font-heading text-base">{edu.degree}</h3>
                  <p className="font-mono text-[11px] text-carbon/60">{edu.institution}</p>
                  {edu.period ? (
                    <p className="mt-0.5 font-mono text-[10px] text-carbon/50">{edu.period}</p>
                  ) : null}
                  {edu.detail ? <p className="mt-1 text-sm text-carbon/70">{edu.detail}</p> : null}
                </div>
              ))}
            </div>
          </section>
        ) : null}

        <div className="flex flex-col gap-10">
          {/* Skills */}
          {skills.length > 0 ? (
            <section>
              <h2 className="font-mono text-[10px] uppercase tracking-wider text-carbon/50">
                Skills
              </h2>
              <div className="mt-4 flex flex-col gap-3">
                {skills.map((skill) => {
                  const items = skill.items?.map((i) => i.item).filter((i): i is string => Boolean(i)) || []
                  return (
                    <div key={skill.id || skill.category}>
                      <h3 className="font-heading text-sm">{skill.category}</h3>
                      <p className="mt-1 text-sm text-carbon/70">{items.join(', ')}</p>
                    </div>
                  )
                })}
              </div>
            </section>
          ) : null}

          {/* Certifications */}
          {certifications.length > 0 ? (
            <section>
              <h2 className="font-mono text-[10px] uppercase tracking-wider text-carbon/50">
                Certifications
              </h2>
              <div className="mt-4 flex flex-col gap-2">
                {certifications.map((cert) => (
                  <div key={cert.id || cert.name} className="flex items-baseline justify-between gap-4">
                    <div>
                      <p className="text-sm">{cert.name}</p>
                      <p className="font-mono text-[10px] text-carbon/50">{cert.issuer}</p>
                    </div>
                    {cert.year ? (
                      <span className="font-mono text-[10px] text-carbon/50">{cert.year}</span>
                    ) : null}
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {/* Speaking */}
          {speaking.length > 0 ? (
            <section>
              <h2 className="font-mono text-[10px] uppercase tracking-wider text-carbon/50">
                Speaking
              </h2>
              <div className="mt-4 flex flex-col gap-2">
                {speaking.map((talk) => (
                  <div key={talk.id || talk.event || talk.title}>
                    <p className="text-sm">{talk.title || talk.event}</p>
                    <p className="font-mono text-[10px] text-carbon/50">
                      {talk.event}
                      {talk.event && talk.year ? ' · ' : ''}
                      {talk.year}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          ) : null}
        </div>
      </div>
    </div>
  )
}
