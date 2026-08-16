import type { RequiredDataFromCollectionSlug } from 'payload'

export const testimonials: RequiredDataFromCollectionSlug<'testimonials'>[] = [
  {
    author: 'Adaobi Nwosu',
    role: 'VP of Engineering',
    company: 'Ledgerline',
    quote:
      'Martins rebuilt our reconciliation pipeline without a single late-night incident. The migration was invisible to customers and auditable to the last cent.',
    featured: true,
    sortOrder: 1,
    _status: 'published',
  },
  {
    author: 'Jonas Lindqvist',
    role: 'Founder',
    company: 'Northbeam AI',
    quote:
      'The agent framework felt like it had already been in production for years. He designed for failure modes we had not even thought to worry about yet.',
    featured: true,
    sortOrder: 2,
    _status: 'published',
  },
  {
    author: 'Priya Raman',
    role: 'CTO',
    company: 'Sokudo',
    quote:
      'Clean boundaries, honest tooling, and code that reads like a proof. He shipped the whole payments flow in half the timeline we budgeted.',
    featured: true,
    sortOrder: 3,
    _status: 'published',
  },
  {
    author: 'Kenji Tanaka',
    role: 'Head of Platform',
    company: 'Vantage',
    quote:
      'He found a p95 latency tail that had been plaguing us for months and eliminated it in the first sprint. The dashboards he left behind still earn their keep.',
    featured: true,
    sortOrder: 4,
    _status: 'published',
  },
]
