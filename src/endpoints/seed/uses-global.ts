import type { DataFromGlobalSlug } from 'payload'

import { lexical, para } from './richtext'

export const usesGlobal = (): Partial<DataFromGlobalSlug<'uses'>> => ({
  intro: lexical(
    para(
      'An honest list of the hardware, software, and workflow pieces I rely on day to day. Updated whenever something meaningful changes.',
    ),
  ),
  sections: [
    {
      title: 'Hardware',
      subtitle: 'WHAT_RUNS_EVERYTHING',
      items: [
        { name: 'MacBook Pro 14" M3 Pro', detail: 'Primary machine. 36GB RAM for local agent work.' },
        { name: 'Keychron K6', detail: 'Mechanical, hot-swappable. Gateron browns.' },
        { name: 'Dell U2723QE', detail: '27" 4K — the single most-used tool.' },
        { name: 'Logitech MX Master 3S', detail: 'For the long cursor days.' },
      ],
    },
    {
      title: 'Editor & Terminal',
      subtitle: 'WHERE_CODE_HAPPENS',
      items: [
        { name: 'VS Code', detail: 'Default editor. JetBrains Mono, Night Owl theme.' },
        { name: 'Ghostty', detail: 'Terminal for everything else.' },
        { name: 'tmux + zsh', detail: 'Session persistence across long builds.' },
      ],
    },
    {
      title: 'Tools & Apps',
      subtitle: 'DAY_TO_DAY',
      items: [
        { name: 'Linear', detail: 'Issue tracking that stays out of the way.' },
        { name: 'Postman', detail: 'API work and contract testing.' },
        { name: 'DBeaver', detail: 'SQL work on ledgers and analytics.' },
        { name: 'Figma', detail: 'Design reviews and quick mockups.' },
        { name: 'Raycast', detail: 'Launcher, snippets, clipboard.' },
      ],
    },
    {
      title: 'Services',
      subtitle: 'INFRA_AND_AI',
      items: [
        { name: 'Vercel', detail: 'Deploys for most Next.js work.' },
        { name: 'AWS', detail: 'Where the serious systems live.' },
        { name: 'Mastra', detail: 'Agent orchestration and evals.' },
        { name: 'Supabase', detail: 'Fast Postgres for prototypes.' },
      ],
    },
  ],
})
