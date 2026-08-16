import { SectionHeading, SectionLabel } from '@/sections/_shared'

const STACK = [
  'Next.js 16',
  'Payload CMS',
  'Mastra AI',
  'TypeScript',
  'PostgreSQL',
  'Tailwind v4',
  'Vercel',
  'Redis',
  'Stripe',
]

export default async function MiniStack() {
  return (
    <section id="mini-stack" className="px-5 lg:px-[6vw] py-16 lg:py-24">
      <SectionLabel className="mb-4">// CURRENT_STACK</SectionLabel>
      <SectionHeading className="mb-12">Built on a stack that ships.</SectionHeading>

      <div className="overflow-x-auto hide-scrollbar flex gap-3 pb-2">
        {STACK.map((tech) => (
          <span
            key={tech}
            className="flex items-center gap-2 border border-border px-4 py-2 font-mono-label text-muted-foreground whitespace-nowrap"
          >
            <span className="w-1 h-1 bg-synthesis" />
            {tech}
          </span>
        ))}
      </div>
    </section>
  )
}
