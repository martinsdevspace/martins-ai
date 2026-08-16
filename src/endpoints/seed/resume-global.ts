import type { DataFromGlobalSlug } from 'payload'

import { heading, lexical, list, para } from './richtext'

export const resumeGlobal = (): Partial<DataFromGlobalSlug<'resume'>> => ({
  name: 'Martins Michael',
  title: 'Full-Stack Developer & AI Agent Architect',
  email: 'hello@martinsmichael.dev',
  phone: '+234 800 000 0000',
  location: 'Abuja, NG · Remote Worldwide',
  website: 'https://martinsmichael.dev',
  linkedin: 'https://www.linkedin.com/in/martinsmichael',
  github: 'https://github.com/martinsmichael',
  version: 'v2026.08',
  highlights: [
    { value: '5+', label: 'Years Shipping' },
    { value: '12+', label: 'Products Built' },
    { value: '3m+', label: 'Transactions Processed' },
    { value: '100%', label: 'Uptime Focus' },
  ],
  summary: lexical(
    para(
      'Full-stack engineer and AI agent architect shipping production systems for fintech, healthcare, and SaaS. I design, build, and operate the rails that move money and information at scale — with a reputation for systems that survive launch week.',
    ),
    heading('Focus areas'),
    list([
      'Payments, ledgers, and reconciliation',
      'Production AI agents with real evaluation',
      'Streaming data platforms',
      'Performance and reliability engineering',
    ]),
  ),
  experience: [
    {
      role: 'Founding Engineer',
      company: 'PayLink Africa',
      period: '2024 — Present',
      location: 'Remote',
      summary:
        'Own the ledger core and payout engine processing millions of transactions. Led the migration to an immutable double-entry ledger and automated reconciliation.',
      achievements: [
        { achievement: 'Cut settlement time from days to hours' },
        { achievement: 'Reduced ops reconciliation workload by 80%' },
        { achievement: 'Designed the agent stack that now answers support tickets' },
      ],
      stack: [{ tech: 'TypeScript' }, { tech: 'PostgreSQL' }, { tech: 'Mastra' }, { tech: 'Kafka' }],
    },
    {
      role: 'Senior Full-Stack Engineer',
      company: 'Northbeam AI',
      period: '2023 — 2024',
      location: 'Remote',
      summary:
        'Built the first production AI agent platform: grounded RAG, evaluation harnesses, and human-in-the-loop review for enterprise support teams.',
      achievements: [
        { achievement: 'Shipped agents that auto-resolve 60% of tickets' },
        { achievement: 'Designed the eval harness that guards every prompt change' },
      ],
      stack: [{ tech: 'Mastra' }, { tech: 'Next.js' }, { tech: 'OpenAI' }, { tech: 'Vercel' }],
    },
    {
      role: 'Full-Stack Developer',
      company: 'Independent',
      period: '2020 — 2023',
      location: 'Lagos, NG',
      summary:
        'Shipped products for startups across Africa and Europe — payment flows, marketplaces, health platforms, and analytics dashboards.',
      achievements: [
        { achievement: 'Delivered 10+ products from spec to production' },
        { achievement: 'Cut page-load p95 by 60% on a trading dashboard' },
      ],
      stack: [{ tech: 'React' }, { tech: 'Node.js' }, { tech: 'PostgreSQL' }, { tech: 'AWS' }],
    },
  ],
  education: [
    {
      degree: 'B.Eng. Computer Engineering',
      institution: 'University of Lagos',
      period: '2015 — 2019',
      detail: 'Graduated with distinction. Led the software engineering student community.',
    },
  ],
  skills: [
    {
      category: 'Languages',
      items: [{ item: 'TypeScript' }, { item: 'JavaScript' }, { item: 'Go' }, { item: 'SQL' }],
    },
    {
      category: 'Frontend',
      items: [{ item: 'React' }, { item: 'Next.js' }, { item: 'Tailwind' }, { item: 'Payload' }],
    },
    {
      category: 'Backend',
      items: [{ item: 'Node.js' }, { item: 'PostgreSQL' }, { item: 'Redis' }, { item: 'GraphQL' }],
    },
    {
      category: 'AI / Agents',
      items: [{ item: 'Mastra' }, { item: 'RAG' }, { item: 'Evals' }, { item: 'OpenAI' }],
    },
    {
      category: 'Infra',
      items: [{ item: 'AWS' }, { item: 'Docker' }, { item: 'Kubernetes' }, { item: 'Terraform' }],
    },
    {
      category: 'Payments',
      items: [{ item: 'Stripe' }, { item: 'Paystack' }, { item: 'Flutterwave' }, { item: 'Ledgers' }],
    },
  ],
  certifications: [
    { name: 'AWS Certified Solutions Architect', issuer: 'Amazon Web Services', year: '2024' },
    { name: 'Professional Cloud Developer', issuer: 'Google Cloud', year: '2023' },
  ],
  speaking: [
    { event: 'AgentConf', title: 'Evaluating agents before they reach production', year: '2026' },
    { event: 'Payments Summit', title: 'Ledgers that never lie', year: '2025' },
  ],
})
