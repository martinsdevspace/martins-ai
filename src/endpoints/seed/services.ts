import type { RequiredDataFromCollectionSlug } from 'payload'

import { heading, lexical, list, para } from './richtext'

export const services: RequiredDataFromCollectionSlug<'services'>[] = [
  {
    title: 'AI Agent Systems',
    slug: 'ai-agent-systems',
    num: '01',
    icon: 'brain',
    tagline: 'Autonomous agents, reasoning loops, and tool orchestration built for production.',
    timeline: '4-8 weeks',
    startingFrom: '5000',
    description: lexical(
      para(
        'I design and ship AI agents that go beyond demos: grounded on your data, instrumented with tracing, and evaluated against real failure modes before they ever touch production traffic.',
      ),
      heading('What you get'),
      list([
        'Agent architecture and tool design tailored to your domain',
        'Evaluation harness with regression tests for every prompt path',
        'Observability, tracing, and cost controls',
        'Human-in-the-loop review for high-stakes decisions',
      ]),
    ),
    deliverables: [
      { item: 'Agent architecture & tool design' },
      { item: 'Evaluation harness' },
      { item: 'Observability & tracing' },
      { item: 'Human-in-the-loop review' },
    ],
    stack: [{ tech: 'Mastra' }, { tech: 'TypeScript' }, { tech: 'OpenAI' }, { tech: 'Anthropic' }],
    process: [
      { num: '01', title: 'Discovery', description: 'Map the workflows, data, and failure modes that matter.' },
      { num: '02', title: 'Prototype', description: 'A working agent on real data within two weeks.' },
      { num: '03', title: 'Harden', description: 'Evals, tracing, and guardrails for production.' },
      { num: '04', title: 'Ship', description: 'Deploy with monitoring, alerts, and handoff paths.' },
    ],
    pricing: [
      { name: 'Fixed Scope', description: 'A well-defined agent system with a clear spec.', best: 'single project' },
      { name: 'Retainer', description: 'Ongoing agent engineering and iteration.', best: 'evolving systems' },
      { name: 'Audit', description: 'Review and harden an existing agent stack.', best: 'existing teams' },
    ],
    faq: [
      {
        question: 'Can you work with our existing LLM stack?',
        answer:
          'Yes. I work with any provider — OpenAI, Anthropic, open-source models via providers — and will match whatever you already use.',
      },
      {
        question: 'How do you evaluate agent reliability?',
        answer:
          'Every agent ships with an evaluation harness: golden datasets, regression tests for each tool path, and tracing to catch drift after launch.',
      },
    ],
    code: {
      language: 'typescript',
      title: 'AGENT_SAMPLE',
      code: `import { Agent } from '@mastra/core'

export const supportAgent = new Agent({
  name: 'support-agent',
  instructions: \`
    You are a support agent for Acme.
    Ground every answer in the provided documentation.
    If confidence is below threshold, escalate to a human.
  \`,
  tools: { searchDocs, resolveTicket },
})`,
    },
    _status: 'published',
  },
  {
    title: 'Payments & Ledger',
    slug: 'payments-ledger',
    num: '02',
    icon: 'creditcard',
    tagline: 'Reliable rails for money movement, settlement, and reconciliation.',
    timeline: '6-12 weeks',
    startingFrom: '8000',
    description: lexical(
      para(
        'Money movement is unforgiving. I build ledgers, payment flows, and reconciliation systems engineered for correctness under pressure — where a missed cent is a bug.',
      ),
      heading('What you get'),
      list([
        'Payment flow and provider integration design',
        'Immutable ledger with audit trails',
        'Automated reconciliation and exception handling',
        'Compliance hooks and failure drill plans',
      ]),
    ),
    deliverables: [
      { item: 'Payment flow design' },
      { item: 'Ledger & reconciliation' },
      { item: 'Compliance hooks' },
      { item: 'Failure drill plans' },
    ],
    stack: [{ tech: 'PostgreSQL' }, { tech: 'TypeScript' }, { tech: 'Stripe' }, { tech: 'Flutterwave' }],
    process: [
      { num: '01', title: 'Model', description: 'Money flow, accounts, and state machines.' },
      { num: '02', title: 'Build', description: 'Ledger core with idempotency and audit logs.' },
      { num: '03', title: 'Drill', description: 'Simulate failures and prove recovery.' },
      { num: '04', title: 'Ship', description: 'Roll out with monitoring and reconciliation.' },
    ],
    pricing: [
      { name: 'Fixed Scope', description: 'A complete payments flow with a defined spec.', best: 'new products' },
      { name: 'Retainer', description: 'Ongoing payments engineering and support.', best: 'post-launch' },
    ],
    faq: [
      {
        question: 'Do you integrate with African payment providers?',
        answer:
          'Yes — Flutterwave, Paystack, and international providers like Stripe and Adyen are all in the toolbox.',
      },
    ],
    _status: 'published',
  },
  {
    title: 'Data Platforms',
    slug: 'data-platforms',
    num: '03',
    icon: 'database',
    tagline: 'Streaming pipelines and analytics that scale with your volume.',
    timeline: '4-10 weeks',
    startingFrom: '6000',
    description: lexical(
      para(
        'From event ingestion to warehouse modeling, I build data platforms that stay fast as your volume grows and never lose an event.',
      ),
      heading('What you get'),
      list([
        'Event pipeline and ingestion architecture',
        'Warehouse modeling and transformations',
        'Streaming ingestion with replay guarantees',
        'Monitoring, alerts, and data quality checks',
      ]),
    ),
    deliverables: [
      { item: 'Pipeline architecture' },
      { item: 'Warehouse modeling' },
      { item: 'Streaming ingestion' },
      { item: 'Monitoring & alerts' },
    ],
    stack: [{ tech: 'ClickHouse' }, { tech: 'Kafka' }, { tech: 'dbt' }, { tech: 'Snowflake' }],
    process: [
      { num: '01', title: 'Map', description: 'Sources, events, and reporting needs.' },
      { num: '02', title: 'Pipe', description: 'Ingestion with exactly-once semantics.' },
      { num: '03', title: 'Model', description: 'Warehouse layers that answer questions fast.' },
      { num: '04', title: 'Watch', description: 'Freshness, quality, and alerting.' },
    ],
    pricing: [
      { name: 'Fixed Scope', description: 'A defined pipeline or migration.', best: 'single system' },
      { name: 'Retainer', description: 'Ongoing data engineering.', best: 'growing platforms' },
    ],
    faq: [
      {
        question: 'Can you work with our existing data stack?',
        answer:
          'Usually yes. I will meet your stack where it is, and only propose changes where they earn their keep.',
      },
    ],
    _status: 'published',
  },
  {
    title: 'Security & Compliance',
    slug: 'security-compliance',
    num: '04',
    icon: 'shield',
    tagline: 'Hardening and audit-ready systems for regulated workloads.',
    timeline: '4-8 weeks',
    startingFrom: '7000',
    description: lexical(
      para(
        'Regulated industries need systems that can prove they are safe. I harden applications, model threats, and build the audit trails regulators actually ask for.',
      ),
      heading('What you get'),
      list([
        'Threat modeling and security review',
        'Access control and least-privilege design',
        'Audit logging and immutable trails',
        'Compliance runbooks for SOC 2 / ISO 27001',
      ]),
    ),
    deliverables: [
      { item: 'Threat modeling' },
      { item: 'Access control review' },
      { item: 'Audit logging' },
      { item: 'Compliance runbooks' },
    ],
    stack: [{ tech: 'AWS IAM' }, { tech: 'OpenTelemetry' }, { tech: 'Hashicorp Vault' }],
    process: [
      { num: '01', title: 'Assess', description: 'Map assets, threats, and gaps.' },
      { num: '02', title: 'Remediate', description: 'Close the highest-risk gaps first.' },
      { num: '03', title: 'Prove', description: 'Build the evidence trail.' },
      { num: '04', title: 'Maintain', description: 'Runbooks and continuous monitoring.' },
    ],
    pricing: [
      { name: 'Audit', description: 'A comprehensive security assessment.', best: 'pre-compliance' },
      { name: 'Fixed Scope', description: 'Specific hardening projects.', best: 'known gaps' },
    ],
    faq: [
      {
        question: 'Do you handle SOC 2 preparation?',
        answer:
          'I build the technical controls and evidence trails that make SOC 2 and ISO 27001 audits straightforward — working alongside your compliance team.',
      },
    ],
    _status: 'published',
  },
  {
    title: 'Performance & Reliability',
    slug: 'performance-reliability',
    num: '05',
    icon: 'bolt',
    tagline: 'Finding the tail, killing the p95, and keeping the lights on.',
    timeline: '3-6 weeks',
    startingFrom: '4500',
    description: lexical(
      para(
        'Slow is a bug. I profile, load-test, and harden systems so your p95 stays flat during traffic spikes and your on-call sleeps through the night.',
      ),
      heading('What you get'),
      list([
        'Load and soak testing with real workloads',
        'Latency profiling and bottleneck removal',
        'Incident response playbooks',
        'SLO dashboards and alerting',
      ]),
    ),
    deliverables: [
      { item: 'Load & soak testing' },
      { item: 'Latency profiling' },
      { item: 'Incident playbooks' },
      { item: 'SLO dashboards' },
    ],
    stack: [{ tech: 'k6' }, { tech: 'Grafana' }, { tech: 'OpenTelemetry' }, { tech: 'Redis' }],
    process: [
      { num: '01', title: 'Profile', description: 'Find the actual bottlenecks.' },
      { num: '02', title: 'Test', description: 'Break it under load on purpose.' },
      { num: '03', title: 'Fix', description: 'Remove the tail, measure the win.' },
      { num: '04', title: 'Protect', description: 'SLOs, alerts, and runbooks.' },
    ],
    pricing: [
      { name: 'Fixed Scope', description: 'A performance engagement with defined targets.', best: 'p95 problems' },
      { name: 'Retainer', description: 'Ongoing reliability engineering.', best: 'on-call relief' },
    ],
    faq: [
      {
        question: 'What does a typical engagement improve?',
        answer:
          'Most engagements cut p95 latency by 40-70% and reduce on-call pages by eliminating the known tail, within the first few weeks.',
      },
    ],
    _status: 'published',
  },
  {
    title: 'Full-Stack Product Builds',
    slug: 'full-stack-product-builds',
    num: '06',
    icon: 'code',
    tagline: 'From idea to shipped product — design, build, and launch.',
    timeline: '8-16 weeks',
    startingFrom: '9000',
    description: lexical(
      para(
        'When you need a whole product shipped, I assemble the stack, build the system, and take it to production — handling design, engineering, and launch in one engagement.',
      ),
      heading('What you get'),
      list([
        'Product scoping and architecture',
        'Full-stack implementation',
        'Design system and front-end build',
        'Deployment, monitoring, and handover',
      ]),
    ),
    deliverables: [
      { item: 'Product architecture' },
      { item: 'Full-stack build' },
      { item: 'Design system' },
      { item: 'Launch & handover' },
    ],
    stack: [{ tech: 'Next.js' }, { tech: 'Payload' }, { tech: 'PostgreSQL' }, { tech: 'Mastra' }],
    process: [
      { num: '01', title: 'Scope', description: 'Product spec, scope, and milestones.' },
      { num: '02', title: 'Build', description: 'Weekly shippable increments.' },
      { num: '03', title: 'Polish', description: 'Design, performance, and edge cases.' },
      { num: '04', title: 'Launch', description: 'Deploy, monitor, and hand over.' },
    ],
    pricing: [
      { name: 'Fixed Scope', description: 'A fully-specified product build.', best: 'MVPs and v1' },
      { name: 'Retainer', description: 'Product team augmentation.', best: 'ongoing builds' },
    ],
    faq: [
      {
        question: 'Can you own the whole product?',
        answer:
          'Yes. Many engagements are product-to-launch: I scope, build, design, and deploy, with you reviewing every weekly increment.',
      },
    ],
    _status: 'published',
  },
]
