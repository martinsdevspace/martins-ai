import type { DataFromGlobalSlug } from 'payload'

import { lexical, para } from './richtext'

export const speakingGlobal = (): Partial<DataFromGlobalSlug<'speaking'>> => ({
  intro: lexical(
    para(
      'Martins speaks on the engineering, systems, and AI-agent work behind production-grade products — usually the unglamorous parts: correctness under load, agent evaluation, and the boring infrastructure that makes the interesting parts possible.',
    ),
  ),
  talks: [
    {
      title: 'Evaluating agents before they reach production',
      event: 'AgentConf',
      year: '2026',
      location: 'Lagos, NG',
      link: '',
      description:
        'A practical framework for evaluating autonomous agents — offline evals, guardrails, and the failure modes that only show up at 3am.',
      featured: true,
    },
    {
      title: 'Ledgers that never lie',
      event: 'Payments Summit',
      year: '2025',
      location: 'Nairobi, KE',
      link: '',
      description:
        'Designing double-entry ledger cores that stay correct under concurrency, partial failure, and reconciliation pressure.',
      featured: false,
    },
  ],
})
