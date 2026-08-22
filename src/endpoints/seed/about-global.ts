import type { DataFromGlobalSlug } from 'payload'

import { lexical, para } from './richtext'

export const aboutGlobal = (): Partial<DataFromGlobalSlug<'about'>> => ({
  layout: [
    {
      blockType: 'aboutHero',
      headline: 'The builder behind the build.',
      intro: lexical(
        para(
          'Martins Michael is a full-stack engineer and AI agent architect who designs, builds, and ships systems that move money and information at scale.',
        ),
        para(
          'His work sits at the intersection of payments and fintech, where reliability is a feature — every API, ledger, and agent loop is engineered for correctness under pressure.',
        ),
        para(
          'Beyond production systems, he cares deeply about developer experience: clean boundaries, honest tooling, and code that reads like a proof.',
        ),
      ),
      stats: [
        { value: '5+', label: 'Years Shipping' },
        { value: '12+', label: 'Products Built' },
        { value: '3m+', label: 'Transactions Processed' },
        { value: '100%', label: 'Uptime Focus' },
      ],
    },
    {
      blockType: 'originStory',
      heading: 'Origin Story',
      content: lexical(
        para(
          'The path started in Lagos, debugging payment failures at 2am because money does not wait for business hours. That first production incident taught a lesson that shaped everything since: reliability is not a feature you add, it is a way you build.',
        ),
        para(
          'Since then the work has grown from payment rails to agentic systems — but the standard has not moved. Every system still has to handle real money, real users, and real scale.',
        ),
      ),
    },
    {
      blockType: 'philosophy',
      heading: 'Philosophy',
      intro: lexical(
        para(
          'Three convictions guide every engagement: correctness over cleverness, observability over optimism, and shipping over perfect.',
        ),
      ),
      values: [
        {
          icon: 'robot',
          title: 'AI Agent Architecture',
          description:
            'Designing autonomous agents, reasoning loops, and tool orchestration that survive production.',
        },
        {
          icon: 'database',
          title: 'Payments & Fintech',
          description:
            'Building reliable rails for money movement, settlement, and reconciliation under load.',
        },
        {
          icon: 'code',
          title: 'Developer Experience',
          description:
            'Shipping tooling and interfaces that make complex systems feel inevitable and obvious.',
        },
      ],
    },
    {
      blockType: 'timeline',
      heading: 'Timeline',
      items: [
        {
          year: '2026',
          title: 'Agentic systems at scale',
          description: 'Shipping production AI agents for fintech and support.',
        },
        {
          year: '2024',
          title: 'Payments platform lead',
          description: 'Owned ledger and payout systems processing millions of transactions.',
        },
        {
          year: '2022',
          title: 'Full-stack contractor',
          description: 'Built products for startups across Africa and Europe.',
        },
        {
          year: '2020',
          title: 'First production system',
          description: 'A payment integration that has not stopped running since.',
        },
      ],
    },
    {
      blockType: 'skills',
      heading: 'The stack',
      categories: [
        {
          name: 'Frontend',
          tools: 'React · Next.js · TypeScript · Tailwind · Payload CMS',
          context: 'Production-first interfaces',
        },
        {
          name: 'Backend',
          tools: 'Node.js · Go · PostgreSQL · Redis · GraphQL · REST',
          context: 'APIs that hold up under load',
        },
        {
          name: 'AI / Agents',
          tools: 'Mastra · OpenAI · Anthropic · RAG · Evals',
          context: 'Agents that survive production',
        },
        {
          name: 'Infrastructure',
          tools: 'AWS · Docker · Kubernetes · Terraform · GitHub Actions',
          context: 'Deployments that don’t scare anyone',
        },
        {
          name: 'Payments',
          tools: 'Stripe · Paystack · Flutterwave · Ledger design',
          context: 'Money movement done right',
        },
        {
          name: 'Data',
          tools: 'ClickHouse · Kafka · dbt · OpenTelemetry',
          context: 'Pipelines that never lose an event',
        },
      ],
    },
    {
      blockType: 'beyondCode',
      heading: 'Beyond the code.',
      paragraphs: [
        {
          paragraph:
            'When I am not shipping, I am usually taking things apart — old routers, broken watches, whatever is lying around — mostly to see how the pieces talk to each other. Same instinct that makes me good at debugging distributed systems, applied to less expensive things.',
        },
        {
          paragraph:
            'I run most mornings, badly but consistently. It is the one part of the day nobody can put on my calendar, and I have found that the best fix for a hard architecture problem is usually not more time at the keyboard — it is a 5K and a shower.',
        },
        {
          paragraph:
            'I mentor a handful of early-career developers in Lagos and Abuja, mostly over voice notes and messy screen-shares. Nothing scales your own understanding of a concept faster than being asked "but why" by someone who has every right to ask it.',
        },
      ],
    },
    {
      blockType: 'certifications',
      heading: 'Credentials',
      items: [
        { name: 'AWS Certified Solutions Architect', issuer: 'Amazon Web Services', year: '2024' },
        { name: 'Professional Cloud Developer', issuer: 'Google Cloud', year: '2023' },
      ],
    },
  ],
})
