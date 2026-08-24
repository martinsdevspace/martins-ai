import type { DataFromGlobalSlug } from 'payload'

export const homeGlobal = (): Partial<DataFromGlobalSlug<'home'>> => ({
  layout: [
    { blockType: 'homeHero' },
    {
      blockType: 'painPoints',
      label: '// THE_OLD_WAY',
      heading: 'Stop fighting your stack.',
      intro:
        "Most teams don't have an engineering problem. They have a systems problem - the tooling was never built to work together.",
      items: [
        {
          icon: 'database',
          title: 'Siloed data',
          body: "Your systems don't talk to each other.",
        },
        {
          icon: 'plug',
          title: 'Janky integrations',
          body: 'Every tool fights the next one.',
        },
        {
          icon: 'cloudOff',
          title: 'Bottlenecked features',
          body: 'Ship slower while competitors ship faster.',
        },
      ],
    },
    {
      blockType: 'miniStack',
      label: '// CURRENT_STACK',
      heading: 'Built on a stack that ships.',
      items: [
        { tech: 'Next.js 16' },
        { tech: 'Payload CMS' },
        { tech: 'Mastra AI' },
        { tech: 'TypeScript' },
        { tech: 'PostgreSQL' },
        { tech: 'Tailwind v4' },
        { tech: 'Vercel' },
        { tech: 'Redis' },
        { tech: 'Stripe' },
      ],
    },
    {
      blockType: 'about',
      label: '// — ABOUT',
      linkLabel: 'READ_THE_FULL_STORY',
    },
    {
      blockType: 'works',
      label: '// 02 — PORTFOLIO',
      heading: 'Systems that run real money.',
      intro: 'Production systems for fintech and beyond.',
      viewAllLabel: 'View all portfolio',
    },
    {
      blockType: 'services',
      label: '// 03 — SERVICES',
      heading: 'Engagements that ship.',
      intro: 'Clear scopes, honest timelines, production delivery.',
      viewAllLabel: 'View all services',
    },
    {
      blockType: 'industries',
      label: '// 04 — INDUSTRIES',
      heading: 'Where I operate.',
      intro:
        "Domain context matters. These are the sectors where I've shipped production systems under real constraints.",
      viewAllLabel: 'View all industries',
    },
    {
      blockType: 'process',
      label: '// 06 — PROCESS',
      heading: 'A repeatable path from first call to shipped.',
      intro: 'No black boxes, no mystery timelines. You always know what happens next.',
      phases: [
        {
          num: '01',
          title: 'Discover',
          description:
            'A discovery call to map your goals, constraints, current systems and the outcome you actually need.',
          tags: [{ tag: 'Discovery call' }, { tag: 'Requirements' }, { tag: 'Tech audit' }],
        },
        {
          num: '02',
          title: 'Design',
          description:
            'Architecture, data model and API contracts agreed before any code is written. You approve the plan.',
          tags: [{ tag: 'Architecture' }, { tag: 'Data model' }, { tag: 'API contract' }],
        },
        {
          num: '03',
          title: 'Build',
          description:
            'Shipped in short sprints with staging deploys you can see. You review real software, not slideware.',
          tags: [{ tag: 'Sprints' }, { tag: 'Daily standups' }, { tag: 'Staging deploys' }],
        },
        {
          num: '04',
          title: 'Launch',
          description:
            'Migration, monitoring and documentation handled. We go live when it is boring and reliable.',
          tags: [{ tag: 'Migration' }, { tag: 'Monitoring' }, { tag: 'Docs' }],
        },
        {
          num: '05',
          title: 'Iterate',
          description:
            'Post-launch feedback loop with metrics, profiling and a vNext roadmap agreed with you.',
          tags: [{ tag: 'Feedback loop' }, { tag: 'Metrics' }, { tag: 'vNext roadmap' }],
        },
      ],
    },
    {
      blockType: 'testimonials',
      label: '// 07 — TESTIMONIALS',
      heading: 'What founders and engineering leads say.',
      intro:
        'Working with Martins means a system that ships, survives, and scales. This is what the teams on the other side of that work say about it.',
    },
    {
      blockType: 'insights',
      label: '// 08 — LATEST_INSIGHTS',
      heading: 'Notes from the build log.',
      intro:
        'Essays and deep dives on agents, payments, and the architecture of systems that hold up in production.',
      viewAllLabel: 'View all insights',
    },
    {
      blockType: 'pageCta',
      address: '0x00F // END_OF_FILE',
      statusBadge: 'ACCEPTING_PROJECTS',
      title: 'Ready to Ship Something That Lasts?',
      subtitle:
        "Book a free 30-minute architecture review. I'll audit your stack and identify the highest-impact improvements — no commitment required.",
      primaryLabel: 'BOOK_FREE_REVIEW',
      primaryTo: '/contact',
      secondaryLabel: 'VIEW_WORK',
      secondaryTo: '/portfolio',
      responseNote: 'Response within 24h',
    },
  ],
})
