import type { RequiredDataFromCollectionSlug } from 'payload'

export const projects: RequiredDataFromCollectionSlug<'projects'>[] = [
  {
    name: 'Aurora Ledger',
    slug: 'aurora-ledger',
    tagline: 'A real-time double-entry ledger core for high-volume payments.',
    description:
      'Designed and built a double-entry ledger core handling millions of postings per day. Every entry is immutable, every balance reconcilable, and every payout auditable to the last cent.',
    category: 'Fintech',
    year: 2026,
    projectStatus: 'COMPLETED',
    featured: true,
    sortOrder: 1,
    stack: [{ tech: 'Next.js' }, { tech: 'PostgreSQL' }, { tech: 'Mastra' }],
    stats: { loc: 12400, commits: 380, contributors: 3 },
    liveUrl: '',
    github: '',
    challenge:
      'The client\u2019s existing balance system stored a single mutable "balance" column per account. Under concurrent load — two payouts firing at once, a retried webhook, an agent re-attempting a failed call — that column silently lost updates. Support was fielding "where did my money go" tickets weekly, and finance couldn\u2019t reconcile the books without a manual spreadsheet audit at the end of every cycle.',
    solution:
      'Replaced the mutable balance column with an immutable double-entry ledger: every transaction writes two or more offsetting entries that must net to zero, and every balance is a derived sum over entries rather than a stored number anyone can overwrite. Nothing is ever updated in place — corrections are new offsetting entries, which means the full history of any account is always a queryable audit trail, not a forensic investigation.',
    architecture: [
      {
        title: 'Append-only entries table',
        description:
          'A single `ledger_entries` table with no UPDATE or DELETE grants at the database role level — only INSERT. Balances are computed with a SUM() query, never stored and mutated directly.',
      },
      {
        title: 'Idempotency at the transaction boundary',
        description:
          'Every mutating operation carries a client-generated idempotency key tied to the business decision, not the HTTP request — so a retried webhook or a re-planning agent can never double-post.',
      },
      {
        title: 'Reconciliation as a query, not a process',
        description:
          'Because every entry is immutable and every transaction balances to zero by construction, "does this reconcile" became a SQL query finance could run themselves instead of a manual monthly close.',
      },
    ],
    codeSample: {
      title: 'ledger.ts',
      language: 'typescript',
      code: `async function postTransaction(entries: LedgerEntry[], idempotencyKey: string) {\n  const total = entries.reduce((sum, e) => sum + e.amount, 0)\n  if (total !== 0) throw new Error('Entries must net to zero')\n\n  const existing = await db.idempotencyKeys.findUnique({ where: { key: idempotencyKey } })\n  if (existing) return existing.result\n\n  return db.$transaction(async (tx) => {\n    await tx.ledgerEntries.createMany({ data: entries })\n    return tx.idempotencyKeys.create({ data: { key: idempotencyKey, result: entries } })\n  })\n}`,
    },
    features: [
      { feature: 'Immutable, append-only ledger entries' },
      { feature: 'Idempotent posting — safe to retry any operation' },
      { feature: 'Real-time balance computation with sub-100ms reads' },
      { feature: 'Self-serve reconciliation reports for finance' },
      { feature: 'Full audit trail on every account, queryable by date range' },
      { feature: 'Automated anomaly detection on entries that don\u2019t net to zero' },
    ],
    resultMetrics: [
      { value: '99.99%', label: 'Ledger accuracy' },
      { value: '<100ms', label: 'Balance read latency' },
      { value: '12M+', label: 'Postings / month' },
      { value: '0', label: 'Manual reconciliations since launch' },
    ],
    lessons: [
      { lesson: 'Modeling the ledger as immutable entries eliminated an entire category of race conditions by construction — no amount of application-layer locking would have been as reliable.' },
      { lesson: 'Idempotency keys need to be tied to the business decision, not the HTTP call — generating a fresh key per retry defeats the entire point.' },
      { lesson: 'Giving finance a self-serve reconciliation query saved more support time than any dashboard feature we shipped.' },
    ],
    developmentTimeline: [
      {
        period: 'Weeks 1–2',
        phase: 'Ledger schema & domain model',
        description: 'Designed the entries schema, idempotency key strategy, and account model before writing any UI.',
        hurdle: 'Modeling multi-currency accounts without complicating the core zero-sum invariant took two failed schema attempts.',
      },
      {
        period: 'Weeks 3–5',
        phase: 'Posting pipeline & provider integration',
        description: 'Built the idempotent posting pipeline and wired it to the payments provider behind a queue.',
        milestone: 'First real transaction posted end-to-end with automatic reconciliation.',
      },
      {
        period: 'Weeks 6–8',
        phase: 'Load testing & finance tooling',
        description: 'Load-tested concurrent posting at 5x expected peak volume and shipped the self-serve reconciliation report.',
        milestone: 'Zero lost updates under sustained concurrent load — the exact failure mode that started the project.',
      },
    ],
    _status: 'published',
  },
  {
    name: 'Helix Recon',
    slug: 'helix-recon',
    tagline: 'Automated reconciliation that closes the books in minutes, not days.',
    description:
      'Replaced a manual, spreadsheet-driven reconciliation process with an automated pipeline that matches transactions across providers, flags exceptions, and closes the books in minutes.',
    category: 'Payments',
    year: 2025,
    projectStatus: 'COMPLETED',
    featured: true,
    sortOrder: 2,
    stack: [{ tech: 'TypeScript' }, { tech: 'Redis' }, { tech: 'Stripe' }],
    stats: { loc: 8200, commits: 240, contributors: 2 },
    liveUrl: '',
    github: '',
    challenge:
      'The finance team spent 2–3 full days every month manually matching transactions across three payment providers in spreadsheets, hunting down mismatches by eye. A single missed decimal or duplicate row could take hours to trace, and the process didn\u2019t scale — every new provider added meant another spreadsheet tab and another day of manual work.',
    solution:
      'Built an automated matching pipeline that pulls transactions from every provider on a schedule, matches them against internal records using a tiered matching strategy (exact match, then fuzzy match on amount + date window), and surfaces only genuine exceptions for human review — instead of asking a human to check everything.',
    architecture: [
      {
        title: 'Tiered matching engine',
        description:
          'Exact matches (provider ID + amount) resolve automatically. Near-matches within a configurable date/amount tolerance get flagged for one-click human confirmation instead of a full manual hunt.',
      },
      {
        title: 'Provider-agnostic ingestion layer',
        description:
          'Each payment provider\u2019s API is normalized into one internal transaction shape, so adding a new provider is a mapping function, not a new pipeline.',
      },
    ],
    features: [
      { feature: 'Automated daily matching across all connected providers' },
      { feature: 'Exception queue — only genuine mismatches need a human' },
      { feature: 'One-click resolution for near-matches' },
      { feature: 'Full audit history of every match decision, automatic or manual' },
      { feature: 'Slack alerts for exceptions above a configurable dollar threshold' },
    ],
    resultMetrics: [
      { value: 'Minutes', label: 'Time to close books (from 2–3 days)' },
      { value: '97%', label: 'Transactions auto-matched' },
      { value: '3', label: 'Providers reconciled in one pipeline' },
    ],
    lessons: [
      { lesson: 'A tiered match strategy — exact, then fuzzy, then human — did more for finance\u2019s trust in the system than any UI polish.' },
      { lesson: 'Provider APIs are never as consistent as their docs claim; the normalization layer needed far more edge-case handling than initially scoped.' },
    ],
    developmentTimeline: [
      {
        period: 'Month 1',
        phase: 'Ingestion & normalization',
        description: 'Built provider connectors and the normalized transaction schema.',
        hurdle: 'One provider\u2019s API silently changed its timestamp format mid-project, breaking date-window matching.',
      },
      {
        period: 'Month 2',
        phase: 'Matching engine & exception UI',
        description: 'Shipped the tiered matcher and the exception review queue for the finance team.',
        milestone: 'First fully automated monthly close, cut from 3 days to under an hour.',
      },
    ],
    _status: 'published',
  },
  {
    name: 'Northwind Support',
    slug: 'northwind-support',
    tagline: 'Autonomous support agents grounded on private docs with human handoff.',
    description:
      'Built autonomous support agents that answer from private documentation, escalate to humans when confidence drops, and learn from every resolved ticket. Instrumented with full tracing and evaluation harnesses.',
    category: 'AI Agents',
    year: 2025,
    projectStatus: 'COMPLETED',
    sortOrder: 3,
    stack: [{ tech: 'Mastra' }, { tech: 'Vercel' }, { tech: 'OpenAI' }],
    stats: { loc: 15600, commits: 420, contributors: 4 },
    liveUrl: '',
    github: '',
    challenge:
      'Support tickets were growing faster than the support team could hire. Most tickets were genuinely answerable from existing documentation, but customers didn\u2019t want to search docs themselves, and a naive chatbot that occasionally invented answers was worse than no chatbot at all — it eroded trust the first time it confidently gave a wrong answer.',
    solution:
      'Built an agent that only answers from retrieved, cited documentation — never from its own unsupported knowledge — and is instrumented to recognize its own uncertainty and hand off to a human rather than guess. Every resolved ticket feeds back into an evaluation set so accuracy is measured continuously, not just at launch.',
    architecture: [
      {
        title: 'Grounded retrieval, not free generation',
        description:
          'The agent is architecturally prevented from answering without a citation — if retrieval doesn\u2019t surface a confident source, it escalates instead of generating an unsupported answer.',
      },
      {
        title: 'Confidence-based human handoff',
        description:
          'A separate scoring pass estimates answer confidence before it reaches the customer; anything below threshold routes to a human with the agent\u2019s partial reasoning attached, so the human isn\u2019t starting from zero.',
      },
      {
        title: 'Continuous evaluation harness',
        description:
          'Every resolved ticket — agent-handled or human-escalated — becomes a labeled example in an evaluation set, so accuracy regressions from prompt or model changes are caught before they reach customers.',
      },
    ],
    codeSample: {
      title: 'confidenceGate.ts',
      language: 'typescript',
      code: `async function answerOrEscalate(query: string) {\n  const { docs, citations } = await retrieve(query)\n  if (citations.length === 0) return escalate(query, 'no_grounding')\n\n  const draft = await generateAnswer(query, docs)\n  const confidence = await scoreConfidence(draft, docs)\n\n  if (confidence < CONFIDENCE_THRESHOLD) {\n    return escalate(query, 'low_confidence', { draft, confidence })\n  }\n  return { answer: draft, citations }\n}`,
    },
    features: [
      { feature: 'Answers grounded in cited documentation only' },
      { feature: 'Automatic escalation to a human on low confidence' },
      { feature: 'Full reasoning trace attached to every escalation' },
      { feature: 'Continuous evaluation harness fed by resolved tickets' },
      { feature: 'Per-topic accuracy dashboards for the support team' },
    ],
    resultMetrics: [
      { value: '68%', label: 'Tickets resolved without a human' },
      { value: '94%', label: 'Cited-answer accuracy' },
      { value: '<2min', label: 'Median first response time' },
    ],
    lessons: [
      { lesson: 'Forcing the agent to cite or escalate — never generate unsupported — did more for customer trust than any amount of prompt tuning aimed at "sounding confident."' },
      { lesson: 'A confidence score is only useful if it\u2019s validated against real escalation outcomes over time, not just tuned once at launch and left alone.' },
    ],
    developmentTimeline: [
      {
        period: 'Month 1',
        phase: 'Retrieval & grounding',
        description: 'Built the citation-required retrieval pipeline against the existing documentation set.',
      },
      {
        period: 'Month 2',
        phase: 'Confidence scoring & handoff',
        description: 'Added the confidence gate and human handoff flow with reasoning trace attached.',
        hurdle: 'Early confidence scores were poorly calibrated — the model was often "confidently wrong," which took a dedicated calibration pass against real ticket outcomes to fix.',
      },
      {
        period: 'Month 3',
        phase: 'Evaluation harness & rollout',
        description: 'Shipped the continuous evaluation harness and rolled out to the full ticket volume.',
        milestone: 'Crossed 60% autonomous resolution rate without a drop in customer satisfaction scores.',
      },
    ],
    _status: 'published',
  },
  {
    name: 'Forge Analytics',
    slug: 'forge-analytics',
    tagline: 'A streaming analytics platform for trading desks under load.',
    description:
      'A streaming analytics platform that ingests market data, computes real-time aggregates, and serves dashboards to trading desks — under sustained load with sub-second latency targets.',
    category: 'Data',
    year: 2024,
    projectStatus: 'COMPLETED',
    sortOrder: 4,
    stack: [{ tech: 'Next.js' }, { tech: 'ClickHouse' }, { tech: 'Kafka' }],
    stats: { loc: 9800, commits: 310, contributors: 3 },
    liveUrl: '',
    github: '',
    challenge:
      'The trading desk\u2019s existing dashboards ran on hourly batch jobs — by the time a metric appeared, it was already stale for a fast-moving market. They needed sub-second visibility into positions and market aggregates, at volumes existing tooling had never been tested against.',
    solution:
      'Replaced the batch pipeline with a streaming architecture: market data lands in Kafka, gets aggregated in near-real-time, and lands in ClickHouse for sub-second dashboard queries — with the dashboards themselves subscribing to live updates instead of polling.',
    architecture: [
      {
        title: 'Kafka as the ingestion backbone',
        description: 'Every market data event lands in Kafka first, decoupling ingestion volume spikes from downstream processing capacity.',
      },
      {
        title: 'ClickHouse for sub-second aggregate queries',
        description: 'Chosen specifically for its columnar storage and real-time aggregation performance at the query volumes trading desks generate.',
      },
    ],
    features: [
      { feature: 'Sub-second dashboard updates via live subscriptions' },
      { feature: 'Real-time aggregates across configurable time windows' },
      { feature: 'Horizontal scaling tested to 5x peak trading-hours volume' },
      { feature: 'Historical backfill without disrupting live ingestion' },
    ],
    resultMetrics: [
      { value: '<800ms', label: 'End-to-end latency' },
      { value: '5x', label: 'Peak load headroom tested' },
      { value: '99.95%', label: 'Uptime during market hours' },
    ],
    lessons: [
      { lesson: 'Decoupling ingestion from processing via Kafka meant a downstream slowdown never became an ingestion-side data loss problem.' },
      { lesson: 'Load testing against realistic trading-hours traffic patterns — not synthetic even load — surfaced bottlenecks a steady-load test never would have.' },
    ],
    developmentTimeline: [
      {
        period: 'Weeks 1–3',
        phase: 'Streaming pipeline',
        description: 'Built the Kafka ingestion layer and the ClickHouse aggregation pipeline.',
      },
      {
        period: 'Weeks 4–6',
        phase: 'Dashboard & load testing',
        description: 'Shipped live-subscribing dashboards and load-tested against 5x peak volume.',
        milestone: 'Sustained sub-second latency at 5x expected peak load with zero dropped events.',
      },
    ],
    _status: 'published',
  },
  {
    name: 'Ember Portal',
    slug: 'ember-portal',
    tagline: 'Self-serve merchant onboarding with KYC and payout automation.',
    description:
      'A self-serve merchant portal covering onboarding, KYC checks, and payout automation. Cut onboarding time from weeks to minutes while keeping compliance controls auditable.',
    category: 'Fintech',
    year: 2024,
    projectStatus: 'COMPLETED',
    sortOrder: 5,
    stack: [{ tech: 'Payload' }, { tech: 'React' }, { tech: 'AWS' }],
    stats: { loc: 11300, commits: 290, contributors: 2 },
    liveUrl: '',
    github: '',
    challenge:
      'New merchants took 2–3 weeks to onboard, most of it spent on manual back-and-forth for KYC documentation and account setup handled over email. The compliance team wanted better auditability, not less rigor — but the manual process was the bottleneck, not the rigor itself.',
    solution:
      'Built a self-serve portal that walks merchants through document upload and verification themselves, automates the KYC checks that don\u2019t need a human, and routes only genuine exceptions to the compliance team — with every step logged for audit rather than living in email threads.',
    features: [
      { feature: 'Self-serve document upload and verification' },
      { feature: 'Automated KYC checks with compliance-team exception review' },
      { feature: 'Automated payout scheduling once verified' },
      { feature: 'Full audit log of every onboarding step, replacing email threads' },
    ],
    resultMetrics: [
      { value: 'Minutes', label: 'Onboarding time (from 2–3 weeks)' },
      { value: '80%', label: 'KYC checks automated' },
      { value: '100%', label: 'Steps auditable, zero email trails' },
    ],
    lessons: [
      { lesson: 'The compliance team\u2019s real requirement was auditability, not manual review for its own sake — automating the checks while keeping a complete audit trail satisfied both speed and rigor.' },
    ],
    developmentTimeline: [
      {
        period: 'Month 1',
        phase: 'Onboarding flow & document handling',
        description: 'Built the self-serve upload flow and automated KYC integration.',
      },
      {
        period: 'Month 2',
        phase: 'Payout automation & audit trail',
        description: 'Shipped automated payout scheduling and the compliance audit log.',
        milestone: 'First merchant onboarded end-to-end in under 15 minutes, entirely self-serve.',
      },
    ],
    _status: 'published',
  },
  {
    name: 'Relay Gateway',
    slug: 'relay-gateway',
    tagline: 'A fault-tolerant API gateway routing millions of events a day.',
    description:
      'A fault-tolerant gateway that routes millions of events a day across microservices, with circuit breaking, retries, and transparent failover — deployed on Kubernetes.',
    category: 'Infrastructure',
    year: 2023,
    projectStatus: 'COMPLETED',
    sortOrder: 6,
    stack: [{ tech: 'Go' }, { tech: 'gRPC' }, { tech: 'Kubernetes' }],
    stats: { loc: 7400, commits: 210, contributors: 2 },
    liveUrl: '',
    github: '',
    challenge:
      'A growing microservices architecture had no consistent routing or failure-handling layer — each service implemented its own retry logic inconsistently, and a single slow downstream service could cascade into a platform-wide outage with no circuit breaker to stop it.',
    solution:
      'Built a dedicated gateway handling routing, circuit breaking, and retries in one place, so individual services no longer need to reimplement resilience logic — and a failing downstream service degrades gracefully instead of cascading.',
    architecture: [
      {
        title: 'Circuit breaking per downstream service',
        description: 'Each downstream service gets its own circuit breaker state, so one failing service can\u2019t take down routing to healthy ones.',
      },
      {
        title: 'Transparent failover',
        description: 'Multi-region service instances are tried in priority order automatically, invisible to the calling service.',
      },
    ],
    features: [
      { feature: 'Centralized circuit breaking across all downstream services' },
      { feature: 'Automatic retries with exponential backoff' },
      { feature: 'Transparent multi-region failover' },
      { feature: 'Per-service health dashboards' },
    ],
    resultMetrics: [
      { value: '4M+', label: 'Events routed / day' },
      { value: '99.98%', label: 'Gateway uptime' },
      { value: '0', label: 'Cascading outages since launch' },
    ],
    lessons: [
      { lesson: 'Centralizing resilience logic in the gateway, rather than trusting every service team to implement it consistently, was the single highest-leverage decision on this project.' },
    ],
    developmentTimeline: [
      {
        period: 'Weeks 1–4',
        phase: 'Core routing & circuit breaking',
        description: 'Built the gRPC routing layer with per-service circuit breakers.',
        hurdle: 'Tuning circuit-breaker thresholds took several rounds — too sensitive and healthy services tripped it, too lax and it didn\u2019t stop cascades.',
      },
      {
        period: 'Weeks 5–6',
        phase: 'Failover & rollout',
        description: 'Added transparent multi-region failover and rolled out gradually behind a feature flag per service.',
        milestone: 'First real cascading-failure scenario contained automatically with zero platform-wide impact.',
      },
    ],
    _status: 'published',
  },
]
