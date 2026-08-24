import type { CollectionSlug, GlobalSlug, Payload, PayloadRequest } from 'payload'

import { aboutGlobal } from './about-global'
import { caseStudies } from './case-studies'
import { contactForm as contactFormData } from './contact-form'
import { newsletterForm as newsletterFormData } from './newsletter-form'
import { contact as contactPageData } from './contact-page'
import { home } from './home'
import { homeGlobal } from './home-global'
import { industries } from './industries'
import { nowGlobal } from './now-global'
import { projects } from './projects'
import { resumeGlobal } from './resume-global'
import { services } from './services'
import { speakingGlobal } from './speaking-global'
import { testimonials } from './testimonials'
import { usesGlobal } from './uses-global'

const collections: CollectionSlug[] = [
  'categories',
  'media',
  'pages',
  'insights',
  'projects',
  'services',
  'industries',
  'case-studies',
  'testimonials',
  'forms',
  'form-submissions',
  'search',
]

const globals = ['header', 'footer'] as const satisfies GlobalSlug[]

// On-brand with the site's actual voice ("Notes from the build log — essays
// on agents, payments, and production systems"), not the generic template
// defaults ('Technology', 'News', 'Design'...) this replaced.
const categories = [
  'AI Agents',
  'Payments & Fintech',
  'Systems Architecture',
  'Engineering Practice',
]

// Next.js revalidation errors are normal when seeding the database without a server running
// i.e. running `yarn seed` locally instead of using the admin UI within an active app
// The app is not running to revalidate the pages and so the API routes are not available
// These error messages can be ignored: `Error hitting revalidate route for...`
export const seed = async ({
  payload,
  req,
}: {
  payload: Payload
  req: PayloadRequest
}): Promise<void> => {
  payload.logger.info('Seeding database...')

  // we need to clear the media directory before seeding
  // as well as the collections and globals
  // this is because while `yarn seed` drops the database
  // the custom `/api/seed` endpoint does not
  payload.logger.info(`— Clearing collections and globals...`)

  // clear the database
  for (const global of globals) {
    await payload.updateGlobal({
      slug: global,
      data: { navItems: [] },
      depth: 0,
      context: { disableRevalidate: true },
    })
  }

  for (const collection of collections) {
    await payload.db.deleteMany({ collection, req, where: {} })
  }

  for (const collection of collections) {
    if (payload.collections[collection].config.versions) {
      await payload.db.deleteVersions({ collection, req, where: {} })
    }
  }

  // payload.logger.info(`— Seeding admin user...`)

  // await payload.delete({
  //   collection: 'users',
  //   depth: 0,
  //   where: {
  //     email: {
  //       equals: 'hello@martinsai.name.ng',
  //     },
  //   },
  // })

  payload.logger.info(`— Seeding categories...`)

  // await payload.create({
  //   collection: 'users',
  //   data: {
  //     name: 'Martins Michael',
  //     email: 'hello@martinsai.name.ng',
  //     password: 'Youhear5xmore.',
  //   },
  // })

  const categoryDocs = []
  for (const category of categories) {
    const doc = await payload.create({
      collection: 'categories',
      data: { title: category, slug: category },
    })
    categoryDocs.push(doc)
  }

  payload.logger.info(`— Seeding contact form...`)

  const contactForm = await payload.create({
    collection: 'forms',
    depth: 0,
    data: contactFormData,
  })

  await payload.create({
    collection: 'forms',
    depth: 0,
    data: newsletterFormData,
  })

  payload.logger.info(`— Seeding industries...`)

  const industryDocs: Array<{ id: number; slug?: string | null }> = []
  for (const industry of industries) {
    const doc = await payload.create({
      collection: 'industries',
      depth: 0,
      context: {
        disableRevalidate: true,
      },
      data: industry,
    })
    industryDocs.push(doc)
  }

  payload.logger.info(`— Seeding projects, services, testimonials sequentially...`)

  const projectIndustries: Record<string, string> = {
    'aurora-ledger': 'fintech',
    'helix-recon': 'fintech',
    'northwind-support': 'saas-software',
    'forge-analytics': 'saas-software',
    'ember-portal': 'fintech',
    'relay-gateway': 'logistics',
  }

  // Projects — depend on industry IDs
  const projectDocs = []
  for (const project of projects) {
    const industry = industryDocs.find((i) => i.slug === projectIndustries[project.slug])
    const doc = await payload.create({
      collection: 'projects',
      depth: 0,
      context: { disableRevalidate: true },
      data: { ...project, industry: industry ? industry.id : undefined },
    })
    projectDocs.push(doc)
  }

  // Services — no dependencies
  const serviceDocs = []
  for (const service of services) {
    const doc = await payload.create({
      collection: 'services',
      depth: 0,
      context: { disableRevalidate: true },
      data: service,
    })
    serviceDocs.push(doc)
  }

  // Testimonials — no dependencies
  const testimonialDocs = []
  for (const testimonial of testimonials) {
    const doc = await payload.create({
      collection: 'testimonials',
      depth: 0,
      context: { disableRevalidate: true },
      data: testimonial,
    })
    testimonialDocs.push(doc)
  }

  payload.logger.info(`— Seeding case studies...`)

  payload.logger.info(`— Seeding case studies...`)

  for (const caseStudy of caseStudies(projectDocs)) {
    await payload.create({
      collection: 'case-studies',
      depth: 0,
      context: { disableRevalidate: true },
      data: caseStudy,
    })
  }

  payload.logger.info(`— Seeding pages...`)

  await payload.create({
    collection: 'pages',
    depth: 0,
    context: { disableRevalidate: true },
    data: home({}),
  })
  await payload.create({
    collection: 'pages',
    depth: 0,
    context: { disableRevalidate: true },
    data: contactPageData({ contactForm }),
  })

  payload.logger.info(`— Seeding globals...`)

  await payload.updateGlobal({
    slug: 'site-settings',
    context: { disableRevalidate: true },
    data: {
      siteName: 'MARTINS_AI',
      name: 'Martins Michael',
      roles: [{ role: 'Full-Stack Developer' }, { role: 'AI Agent Architect' }],
      tagline: 'Full-Stack Developer & AI Agent Architect',
      availability: 'Available for new projects',
      location: 'Abuja, NG · Remote Worldwide',
      email: 'hello@martinsmichael.dev',
      calendlyUrl: 'https://calendly.com/martinsmichael/intro',
      socials: [
        { label: 'GitHub', url: 'https://github.com/martinsmichael' },
        { label: 'LinkedIn', url: 'https://www.linkedin.com/in/martinsmichael' },
        { label: 'X', url: 'https://x.com/martinsmichael' },
        { label: 'Medium', url: 'https://medium.com/@martinsmichael' },
        { label: 'Hashnode', url: 'https://hashnode.com/@martinsmichael' },
        { label: 'Daily.dev', url: 'https://daily.dev/@martinsmichael' },
        { label: 'HackerNoon', url: 'https://hackernoon.com/@martinsmichael' },
        { label: 'Dev.To', url: 'https://dev.to/@martinsmichael' },
        { label: 'Cal.com', url: 'https://cal.com/martinsmichael' },
      ],
      terminalLines: [
        { prompt: '$', text: 'whoami' },
        { prompt: '>', text: 'martins - full-stack dev & ai agent architect' },
        { prompt: '$', text: 'ls ./production' },
        { prompt: '>', text: 'payments/  auth/  agents/  scale/' },
        { prompt: '$', text: 'tail -f uptime.log' },
        { prompt: '>', text: '99.9% uptime - 42ms p95 - 0 incidents' },
      ],
      footerNote:
        'Full-Stack Developer & AI Agent Architect. Building production systems that handle real money, real users, and real scale.',
      navigateLabel: '// NAVIGATE',
      connectLabel: '// CONNECT',
      contactColumnLabel: '// CONTACT & AVAILABILITY',
      responseTimeNote: 'Typical response time: < 24h on weekdays.',
      timezoneNote: 'Based in GMT+1',
      copyrightText:
        '© {year} Martins Michael — Engineering Intelligence, Architecting Impact',
      statusLabel: 'SYSTEM_ONLINE · v2.0.26',
      heroHeadline:
        'I build AI agents\nthat handle real money, real users, and real scale.',
      heroIntro: {
        root: {
          type: 'root',
          version: 1,
          indent: 0,
          direction: 'ltr',
          format: '',
          children: [
            {
              type: 'paragraph',
              version: 1,
              textFormat: 0,
              textStyle: '',
              indent: 0,
              direction: 'ltr',
              format: '',
              children: [
                {
                  type: 'text',
                  detail: 0,
                  format: 0,
                  mode: 'normal',
                  style: '',
                  text: 'Full-stack engineer focused on fintech, payments and agentic systems — shipped to production for companies across Africa and Europe.',
                  version: 1,
                },
              ],
            },
          ],
        },
      },
      metrics: [
        { value: '12+', label: 'Products shipped' },
        { value: '5+', label: 'Years building' },
        { value: '3m+', label: 'Transactions processed' },
        { value: '100%', label: 'Production uptime focus' },
      ],
      clients: [
        { name: 'PayLink', type: 'fintech' },
        { name: 'CareGrid', type: 'healthtech' },
        { name: 'Northwind', type: 'logistics' },
        { name: 'Ember', type: 'fintech' },
      ],
      cta: {
        title: 'Have a system that needs building?',
        subtitle:
          "Let's talk about your project — I'll tell you honestly if it's a fit, and give you a clear path to ship.",
        primaryLabel: 'Book a call',
        primaryTo: '/contact',
        secondaryLabel: 'Email me',
        secondaryTo: 'mailto:hello@martinsmichael.dev',
      },
      contactIntro: {
        root: {
          type: 'root',
          version: 1,
          indent: 0,
          direction: 'ltr',
          format: '',
          children: [
            {
              type: 'paragraph',
              version: 1,
              textFormat: 0,
              textStyle: '',
              indent: 0,
              direction: 'ltr',
              format: '',
              children: [
                {
                  type: 'text',
                  detail: 0,
                  format: 0,
                  mode: 'normal',
                  style: '',
                  text: 'Tell me where you are and where you need to be. If it is a fit, I will give you a clear path and a straight answer — if not, I will tell you that too.',
                  version: 1,
                },
              ],
            },
          ],
        },
      },
      contactChannels: [
        { label: 'hello@martinsmichael.dev', url: 'mailto:hello@martinsmichael.dev' },
        { label: 'Calendly — 30 min intro', url: 'https://calendly.com/martinsmichael/intro' },
        { label: 'LinkedIn', url: 'https://www.linkedin.com/in/martinsmichael' },
        { label: 'X / Twitter', url: 'https://x.com/martinsmichael' },
        { label: 'GitHub', url: 'https://github.com/martinsmichael' },
      ],
      projectTypes: [
        { type: 'AI Agent Systems' },
        { type: 'Payments & Ledger' },
        { type: 'Data Platforms' },
        { type: 'Full-Stack Products' },
        { type: 'Performance & Reliability' },
        { type: 'Security & Compliance' },
      ],
      budgetRanges: [
        { range: '$5k – $10k' },
        { range: '$10k – $25k' },
        { range: '$25k – $50k' },
        { range: '$50k+' },
      ],
      timelines: [
        { timeline: '2-4 weeks' },
        { timeline: '1-2 months' },
        { timeline: '2-4 months' },
        { timeline: 'Flexible' },
      ],
      contactSteps: [
        {
          title: 'I review your message',
          description: 'Within 24 hours, I read your message and assess fit — scope, timeline, and whether I\u2019m the right person for the job.',
        },
        {
          title: 'Discovery call',
          description: 'If it\u2019s a fit, we schedule a 30-minute call. You tell me about the problem; I ask questions and sketch a rough approach.',
        },
        {
          title: 'Proposal & scope',
          description: 'Within 3\u20135 days, you get a written proposal — scope, timeline, price, and deliverables. No pressure to accept.',
        },
        {
          title: 'We start building',
          description: 'Once you approve, we kick off. Weekly check-ins, transparent progress, and a system that actually works at the end.',
        },
      ],
      contactFaq: [
        {
          question: 'What do you need from me to start?',
          answer:
            'A one-page brief is enough: the problem, the users, and what success looks like. I will ask the sharp questions from there.',
        },
        {
          question: 'How fast do you reply?',
          answer:
            'Within 24 hours on weekdays, usually faster. If I am fully booked, I will say so and recommend someone good.',
        },
        {
          question: 'Do you work with early-stage teams?',
          answer:
            'Yes — a fixed scope with weekly increments works well for startups that need momentum without a hiring cycle.',
        },
        {
          question: 'Can you join an existing team?',
          answer:
            'Yes. Retainer engagements embed me as a senior engineer on your team, shipping alongside your people.',
        },
      ],
    },
  })

  await payload.updateGlobal({
    slug: 'about',
    context: { disableRevalidate: true },
    data: aboutGlobal(),
  })

  await payload.updateGlobal({
    slug: 'home',
    context: { disableRevalidate: true },
    data: homeGlobal(),
  })

  await payload.updateGlobal({
    slug: 'speaking',
    context: { disableRevalidate: true },
    data: speakingGlobal(),
  })

  await payload.updateGlobal({
    slug: 'resume',
    context: { disableRevalidate: true },
    data: resumeGlobal(),
  })

  await payload.updateGlobal({
    slug: 'uses',
    context: { disableRevalidate: true },
    data: usesGlobal(),
  })

  await payload.updateGlobal({
    slug: 'now',
    context: { disableRevalidate: true },
    data: nowGlobal(),
  })

  await payload.updateGlobal({
    slug: 'header',
    context: { disableRevalidate: true },
    data: {
      navItems: [
        {
          link: {
            type: 'custom',
            label: 'About',
            url: '/about',
          },
        },
        {
          link: {
            type: 'custom',
            label: 'Works',
            url: '/works',
          },
        },
        {
          link: {
            type: 'custom',
            label: 'Services',
            url: '/services',
          },
        },
        {
          link: {
            type: 'custom',
            label: 'Industries',
            url: '/industries',
          },
        },
        {
          link: {
            type: 'custom',
            label: 'Case Studies',
            url: '/case-studies',
          },
        },
        {
          link: {
            type: 'custom',
            label: 'Insights',
            url: '/insights',
          },
        },
        {
          link: {
            type: 'custom',
            label: 'Speaking',
            url: '/speaking',
          },
        },
      ],
    },
  })

  await payload.updateGlobal({
    slug: 'footer',
    context: { disableRevalidate: true },
    data: {
      navItems: [
        {
          link: {
            type: 'custom',
            label: 'About',
            url: '/about',
          },
        },
        {
          link: {
            type: 'custom',
            label: 'Works',
            url: '/works',
          },
        },
        {
          link: {
            type: 'custom',
            label: 'Services',
            url: '/services',
          },
        },
        {
          link: {
            type: 'custom',
            label: 'Industries',
            url: '/industries',
          },
        },
        {
          link: {
            type: 'custom',
            label: 'Case Studies',
            url: '/case-studies',
          },
        },
        {
          link: {
            type: 'custom',
            label: 'Insights',
            url: '/insights',
          },
        },
        {
          link: {
            type: 'custom',
            label: 'Speaking',
            url: '/speaking',
          },
        },
        {
          link: {
            type: 'custom',
            label: 'Resume',
            url: '/resume',
          },
        },
        {
          link: {
            type: 'custom',
            label: 'Uses',
            url: '/uses',
          },
        },
        {
          link: {
            type: 'custom',
            label: 'Now',
            url: '/now',
          },
        },
        {
          link: {
            type: 'custom',
            label: 'Contact',
            url: '/contact',
          },
        },
      ],
    },
  })

  payload.logger.info('Seeded database successfully!')
}
