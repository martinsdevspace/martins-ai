import type { Block } from 'payload'

export const HeroBlock: Block = {
  slug: 'homeHero',
  interfaceName: 'HeroBlock',
  fields: [],
}

export const PainPointsBlock: Block = {
  slug: 'painPoints',
  interfaceName: 'PainPointsBlock',
  fields: [
    {
      name: 'label',
      type: 'text',
      defaultValue: '// THE_OLD_WAY',
    },
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Stop fighting your stack.',
    },
    {
      name: 'intro',
      type: 'textarea',
    },
    {
      name: 'items',
      type: 'array',
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'icon',
          type: 'text',
          admin: {
            description:
              'Icon name: database, plug, cloudOff, alertTriangle, shield, robot, brain, terminal.',
          },
        },
        { name: 'title', type: 'text' },
        { name: 'body', type: 'textarea' },
      ],
    },
  ],
}

export const MiniStackBlock: Block = {
  slug: 'miniStack',
  interfaceName: 'MiniStackBlock',
  fields: [
    {
      name: 'label',
      type: 'text',
      defaultValue: '// CURRENT_STACK',
    },
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Built on a stack that ships.',
    },
    {
      name: 'items',
      type: 'array',
      admin: { initCollapsed: true },
      fields: [{ name: 'tech', type: 'text' }],
    },
  ],
}

export const AboutBlock: Block = {
  slug: 'about',
  interfaceName: 'AboutBlock',
  fields: [
    {
      name: 'label',
      type: 'text',
      defaultValue: '// — ABOUT',
    },
    {
      name: 'linkLabel',
      type: 'text',
      defaultValue: 'READ_THE_FULL_STORY',
    },
  ],
}

export const WorksBlock: Block = {
  slug: 'works',
  interfaceName: 'WorksBlock',
  fields: [
    {
      name: 'label',
      type: 'text',
      defaultValue: '// 02 — SELECTED_WORKS',
    },
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Systems that run real money.',
    },
    {
      name: 'intro',
      type: 'textarea',
    },
    {
      name: 'viewAllLabel',
      type: 'text',
      defaultValue: 'View all works',
    },
  ],
}

export const ServicesBlock: Block = {
  slug: 'services',
  interfaceName: 'ServicesBlock',
  fields: [
    {
      name: 'label',
      type: 'text',
      defaultValue: '// 03 — SERVICES',
    },
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Engagements that ship.',
    },
    {
      name: 'intro',
      type: 'textarea',
    },
    {
      name: 'viewAllLabel',
      type: 'text',
      defaultValue: 'View all services',
    },
  ],
}

export const IndustriesBlock: Block = {
  slug: 'industries',
  interfaceName: 'IndustriesBlock',
  fields: [
    {
      name: 'label',
      type: 'text',
      defaultValue: '// 04 — INDUSTRIES',
    },
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Where I operate.',
    },
    {
      name: 'intro',
      type: 'textarea',
    },
    {
      name: 'viewAllLabel',
      type: 'text',
      defaultValue: 'View all industries',
    },
  ],
}

export const ProcessBlock: Block = {
  slug: 'process',
  interfaceName: 'ProcessBlock',
  fields: [
    {
      name: 'label',
      type: 'text',
      defaultValue: '// 06 — PROCESS',
    },
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'A repeatable path from first call to shipped.',
    },
    {
      name: 'intro',
      type: 'textarea',
    },
    {
      name: 'phases',
      type: 'array',
      admin: { initCollapsed: true },
      fields: [
        { name: 'num', type: 'text' },
        { name: 'title', type: 'text' },
        { name: 'description', type: 'textarea' },
        {
          name: 'tags',
          type: 'array',
          admin: { initCollapsed: true },
          fields: [{ name: 'tag', type: 'text' }],
        },
      ],
    },
  ],
}

export const TestimonialsBlock: Block = {
  slug: 'testimonials',
  interfaceName: 'TestimonialsBlock',
  fields: [
    {
      name: 'label',
      type: 'text',
      defaultValue: '// 07 — TESTIMONIALS',
    },
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'What founders and engineering leads say.',
    },
    {
      name: 'intro',
      type: 'textarea',
    },
  ],
}

export const InsightsBlock: Block = {
  slug: 'insights',
  interfaceName: 'InsightsBlock',
  fields: [
    {
      name: 'label',
      type: 'text',
      defaultValue: '// 08 — LATEST_INSIGHTS',
    },
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Notes from the build log.',
    },
    {
      name: 'intro',
      type: 'textarea',
    },
    {
      name: 'viewAllLabel',
      type: 'text',
      defaultValue: 'View all insights',
    },
  ],
}

export const PageCTABlock: Block = {
  slug: 'pageCta',
  interfaceName: 'PageCTABlock',
  fields: [
    {
      name: 'address',
      type: 'text',
      admin: { description: 'Mono label shown at the top of the CTA band.' },
    },
    {
      name: 'statusBadge',
      type: 'text',
      admin: { description: 'Pulsing badge label at the top right, e.g. "ACCEPTING_PROJECTS".' },
    },
    { name: 'title', type: 'text' },
    { name: 'subtitle', type: 'textarea' },
    { name: 'primaryLabel', type: 'text' },
    { name: 'primaryTo', type: 'text' },
    { name: 'secondaryLabel', type: 'text' },
    { name: 'secondaryTo', type: 'text' },
    {
      name: 'responseNote',
      type: 'text',
      admin: { description: 'Footer line under the CTAs, e.g. "Response within 24h".' },
    },
  ],
}
