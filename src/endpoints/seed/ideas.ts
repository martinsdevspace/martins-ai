import type { RequiredDataFromCollectionSlug } from 'payload'

type ProjectRef = { id: number; slug: string }

export const ideas = (
  portfolioDocs: ProjectRef[],
): RequiredDataFromCollectionSlug<'ideas'>[] => {
  const projectId = (slug: string): number | undefined =>
    portfolioDocs.find((p) => p.slug === slug)?.id

  return [
    {
      slug: 'paylink-africa',
      category: 'Payments',
      client: 'PayLink Africa',
      industry: 'Fintech',
      projectSlug: projectId('aurora-ledger'),
      sortOrder: 1,
      overview:
        'Unify a fragmented payout stack onto one engine with an immutable ledger and automated reconciliation.',
      audience: 'Payout-heavy platforms losing ops hours to manual settlement cycles.',
      outcomePromise:
        'Settlement time drops from days to hours, exceptions are caught automatically, and your ops team stops living in spreadsheets.',
      startingFrom: 'From $14k · 6–8 weeks',
      deliverables: [
        { item: 'Provider-abstraction layer for Flutterwave, Paystack & bank rails' },
        { item: 'Immutable double-entry ledger with idempotent posting' },
        { item: 'Automated reconciliation pipeline + finance dashboard' },
        { item: 'Migration plan that keeps live merchant payouts running' },
      ],
      whyItMatters:
        'A fragmented payout stack was costing the ops team eight hours a week and delaying merchant settlements.',
      initialSituation:
        'PayLink was running payouts through three separate providers with hand-built reconciliation. Every settlement cycle ended in a spreadsheet, and exceptions took days to untangle.',
      scope:
        'Design and build a unified payout engine: provider abstraction, a double-entry ledger, and automated reconciliation — without interrupting live merchant payouts.',
      keyDecision:
        'Move all money movement onto an immutable ledger with idempotent operations, even though it meant reworking the existing accounting flow, so every payout was provably correct.',
      outcome:
        'Settlement time dropped from days to hours, exceptions were caught automatically, and the ops team got their eight hours a week back.',
      systemsAffected:
        'Payout orchestration, ledger core, provider integrations (Flutterwave, Paystack, bank rails), reconciliation, and finance dashboards.',
      metrics: [
        { value: '40%', label: 'faster settlement' },
        { value: '3m+', label: 'transactions processed' },
        { value: '99.9%', label: 'uptime' },
      ],
      tags: [
        { tag: 'Ledger' },
        { tag: 'Payments' },
        { tag: 'Reconciliation' },
        { tag: 'PostgreSQL' },
      ],
      _status: 'published',
    },
    {
      slug: 'caregrid',
      category: 'Platform',
      client: 'CareGrid',
      industry: 'Healthcare',
      projectSlug: projectId('ember-portal'),
      sortOrder: 2,
      overview:
        'An offline-first scheduling and records platform that keeps clinics running through connectivity outages.',
      audience: 'Clinics and field programs operating in low-bandwidth regions.',
      outcomePromise:
        'Check-in time falls up to 4x, no records are ever lost, and staff keep working normally when the network drops.',
      startingFrom: 'From $18k · 8–10 weeks',
      deliverables: [
        { item: 'Offline-first client with conflict-free sync' },
        { item: 'Scheduling + patient records server (lightweight footprint)' },
        { item: 'Secure auth and role-based clinic access' },
        { item: 'Clinic admin interface + deployment guide' },
      ],
      whyItMatters:
        'Clinics needed a scheduling + records system that worked offline-first in low-bandwidth regions.',
      initialSituation:
        'Clinics in low-bandwidth regions were juggling paper records and phone calls. When connectivity dropped, so did access to patient histories.',
      scope:
        'Build a scheduling and records platform with an offline-first client, secure sync, and a lightweight server footprint deployable in constrained environments.',
      keyDecision:
        'Design the client around offline-first sync from day one — conflict-free resolution on write — rather than treating connectivity as a given.',
      outcome:
        'Check-in time fell by 4x, no records were ever lost, and clinics could operate normally through connectivity outages.',
      systemsAffected:
        'Scheduling, patient records, sync engine, auth, and the clinic-facing admin interface.',
      metrics: [
        { value: '12k', label: 'appointments / mo' },
        { value: '0', label: 'data loss events' },
        { value: '4x', label: 'faster check-in' },
      ],
      tags: [{ tag: 'Offline-first' }, { tag: 'Healthcare' }, { tag: 'Sync' }],
      _status: 'published',
    },
    {
      slug: 'northwind-support',
      category: 'AI Agents',
      client: 'Northwind',
      industry: 'SaaS & Software',
      projectSlug: projectId('northwind-support'),
      sortOrder: 3,
      overview:
        'Autonomous support agents grounded in your docs, with evaluation harnesses and safe human handoff.',
      audience: 'Support teams drowning in repeat questions while docs go unused.',
      outcomePromise:
        'A majority of tickets resolve end-to-end, first-response time drops sharply, and your team handles only what needs a human.',
      startingFrom: 'From $16k · 6–9 weeks',
      deliverables: [
        { item: 'Citation-required retrieval pipeline over private docs' },
        { item: 'Confidence gate + human handoff with reasoning trace' },
        { item: 'Continuous evaluation harness fed by resolved tickets' },
        { item: 'Per-topic accuracy dashboards' },
      ],
      whyItMatters:
        'Support volume was outgrowing the team, and answers to repetitive questions were eating the queue.',
      initialSituation:
        'Northwind’s support team was drowning in repeated questions while documentation sat underused. First-response times kept climbing.',
      scope:
        'Deploy autonomous support agents grounded on private documentation, with evaluation harnesses, tracing, and a confident human-handoff path.',
      keyDecision:
        'Require every agent answer to cite its source and escalate on low confidence — making the system safe to run without a safety net.',
      outcome:
        'Agents resolved a majority of tickets end-to-end, first-response time dropped dramatically, and the team focused on issues that needed humans.',
      systemsAffected:
        'Support inbox, docs search, ticketing system, and the agent evaluation pipeline.',
      metrics: [
        { value: '60%', label: 'tickets auto-resolved' },
        { value: '4x', label: 'faster first response' },
        { value: '0', label: 'unsafe escalations' },
      ],
      tags: [{ tag: 'AI Agents' }, { tag: 'Mastra' }, { tag: 'RAG' }],
      _status: 'published',
    },
  ]
}
