import type { DataFromGlobalSlug } from 'payload'

import { lexical, para } from './richtext'

export const nowGlobal = (): Partial<DataFromGlobalSlug<'now'>> => ({
  updated: 'AUGUST_2026',
  intro: lexical(
    para(
      'A living snapshot of what I’m building, learning, and thinking about. Last updated August 2026.',
    ),
  ),
  blocks: [
    {
      label: 'CURRENTLY_BUILDING',
      title: 'Agentic systems in production',
      items: [
        {
          name: 'Paylink ledger v2',
          detail: 'Rebuilding the payout engine on an event-sourced ledger.',
        },
        {
          name: 'Support agents',
          detail: 'Shipping grounded support agents with eval-first development.',
        },
        {
          name: 'This site',
          detail: 'Rebuilding martinsmichael.dev on Payload + Next.js.',
        },
      ],
    },
    {
      label: 'CURRENTLY_LEARNING',
      title: 'Sharpening the fundamentals',
      items: [
        { name: 'Rust', detail: 'For low-latency payments services.' },
        { name: 'Evals', detail: 'Systematic evaluation of agent behavior.' },
        { name: 'Distributed systems', detail: 'Consensus, durability, and failure drills.' },
      ],
    },
    {
      label: 'CURRENTLY_READING',
      title: 'On the desk',
      items: [
        { name: 'Designing Data-Intensive Applications', detail: 'Kleppmann — a reread.' },
        { name: 'The Pragmatic Programmer', detail: 'The classic, still sharp.' },
      ],
    },
    {
      label: 'CURRENTLY_WRITING',
      title: 'Essays in progress',
      items: [
        { name: 'Reliable agents', detail: 'Field notes on evaluating AI agents.' },
        { name: 'Ledger state machines', detail: 'Designing payment state machines.' },
      ],
    },
  ],
})
