import type { RequiredDataFromCollectionSlug } from 'payload'

import { heading, lexical, list, para } from './richtext'

export const industries: RequiredDataFromCollectionSlug<'industries'>[] = [
  {
    name: 'Fintech',
    slug: 'fintech',
    tagline: 'Payments, ledgers and compliance-critical rails.',
    projectCount: 4,
    sortOrder: 1,
    description: lexical(
      para(
        'Fintech is where reliability is the product. I have shipped payment flows, ledger cores, and reconciliation systems that move real money under real regulation.',
      ),
    ),
    services: [{ service: 'Payments & Ledger' }, { service: 'AI Agent Systems' }],
    keyProjects: [{ project: 'Aurora Ledger' }, { project: 'Helix Recon' }, { project: 'Ember Portal' }],
    challenges: [
      { challenge: 'Reconciling millions of transactions across fragmented providers' },
      { challenge: 'Meeting compliance requirements without slowing down launches' },
      { challenge: 'Keeping payouts accurate and on-time at volume' },
    ],
    solutions: [
      { solution: 'Immutable ledgers with full audit trails' },
      { solution: 'Automated reconciliation that flags exceptions early' },
      { solution: 'Compliance hooks designed into the flow, not bolted on' },
    ],
    stats: [
      { value: '3m+', label: 'transactions processed' },
      { value: '99.9%', label: 'uptime focus' },
      { value: '4', label: 'products shipped' },
    ],
    _status: 'published',
  },
  {
    name: 'Healthcare',
    slug: 'healthcare',
    tagline: 'Patient-facing systems and HIPAA-grade data flows.',
    projectCount: 2,
    sortOrder: 2,
    description: lexical(
      para(
        'Healthcare systems must work offline-first in low-bandwidth regions and never lose patient data. I build for that reality.',
      ),
    ),
    services: [{ service: 'Full-Stack Product Builds' }, { service: 'Data Platforms' }],
    keyProjects: [{ project: 'CareGrid' }],
    challenges: [
      { challenge: 'Low-bandwidth clinics needing reliable access' },
      { challenge: 'Sensitive patient data moving safely' },
    ],
    solutions: [
      { solution: 'Offline-first clients with conflict-free sync' },
      { solution: 'Encryption, audit logs, and access controls' },
    ],
    stats: [
      { value: '12k', label: 'appointments / mo' },
      { value: '0', label: 'data loss events' },
    ],
    _status: 'published',
  },
  {
    name: 'Logistics',
    slug: 'logistics',
    tagline: 'Fleet ops, dispatch and real-time tracking.',
    projectCount: 3,
    sortOrder: 3,
    description: lexical(
      para(
        'Dispatch and tracking systems live and die on real-time correctness. I build the streaming backends that keep fleets moving.',
      ),
    ),
    services: [{ service: 'Data Platforms' }, { service: 'Performance & Reliability' }],
    keyProjects: [{ project: 'Relay Gateway' }],
    challenges: [
      { challenge: 'High-frequency location updates at fleet scale' },
      { challenge: 'Reconciling dispatched vs delivered states' },
    ],
    solutions: [
      { solution: 'Streaming ingestion with exactly-once semantics' },
      { solution: 'Event-sourced state machines for each delivery' },
    ],
    stats: [
      { value: '50k+', label: 'events / day' },
      { value: '3', label: 'systems shipped' },
    ],
    _status: 'published',
  },
  {
    name: 'SaaS & Software',
    slug: 'saas-software',
    tagline: 'Multi-tenant platforms that scale with paying users.',
    projectCount: 5,
    sortOrder: 4,
    description: lexical(
      para(
        'From internal tools to multi-tenant platforms, I build software that stays fast, secure, and easy to maintain as the user count grows.',
      ),
    ),
    services: [{ service: 'Full-Stack Product Builds' }, { service: 'AI Agent Systems' }],
    keyProjects: [{ project: 'Northwind Support' }, { project: 'Forge Analytics' }],
    challenges: [
      { challenge: 'Tenant isolation without sacrificing velocity' },
      { challenge: 'Support load outpacing the team' },
    ],
    solutions: [
      { solution: 'Row-level security and per-tenant partitioning' },
      { solution: 'Autonomous support agents with human handoff' },
    ],
    stats: [
      { value: '5', label: 'products shipped' },
      { value: '4x', label: 'support resolution speed' },
    ],
    _status: 'published',
  },
  {
    name: 'Retail & E-commerce',
    slug: 'retail-ecommerce',
    tagline: 'Storefronts, carts, and order pipelines that convert.',
    projectCount: 2,
    sortOrder: 5,
    description: lexical(
      para(
        'E-commerce lives and dies on the path from cart to order. I build storefronts and order systems where every checkout is reliable.',
      ),
    ),
    services: [{ service: 'Full-Stack Product Builds' }, { service: 'Payments & Ledger' }],
    keyProjects: [{ project: 'Ember Portal' }],
    challenges: [{ challenge: 'Checkout drop-off from slow order flows' }],
    solutions: [{ solution: 'Fast, resilient checkout and order pipelines' }],
    stats: [
      { value: '+30%', label: 'checkout completion' },
      { value: '2', label: 'systems shipped' },
    ],
    _status: 'published',
  },
  {
    name: 'Agritech',
    slug: 'agritech',
    tagline: 'Data-driven farming platforms for last-mile impact.',
    projectCount: 2,
    sortOrder: 6,
    description: lexical(
      para(
        'Agriculture technology needs to work where connectivity is unreliable and data is patchy. I build platforms designed for that harsh reality.',
      ),
    ),
    services: [{ service: 'Data Platforms' }, { service: 'Full-Stack Product Builds' }],
    keyProjects: [{ project: 'Northwind Support' }],
    challenges: [
      { challenge: 'Patchy connectivity in rural deployment zones' },
      { challenge: 'Integrating SMS and USSD channels' },
    ],
    solutions: [
      { solution: 'Offline-first field data collection' },
      { solution: 'Multichannel reporting (SMS, USSD, web)' },
    ],
    stats: [
      { value: '10k+', label: 'farmers reached' },
      { value: '2', label: 'platforms shipped' },
    ],
    _status: 'published',
  },
]
