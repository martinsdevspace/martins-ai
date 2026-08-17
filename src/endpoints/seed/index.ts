import type { CollectionSlug, GlobalSlug, Payload, PayloadRequest, File } from 'payload'

import { aboutGlobal } from './about-global'
import { caseStudies } from './case-studies'
import { contactForm as contactFormData } from './contact-form'
import { newsletterForm as newsletterFormData } from './newsletter-form'
import { contact as contactPageData } from './contact-page'
import { home } from './home'
import { image1 } from './image-1'
import { image2 } from './image-2'
import { imageHero1 } from './image-hero-1'
import { industries } from './industries'
import { nowGlobal } from './now-global'
import { post1 } from './post-1'
import { post2 } from './post-2'
import { post3 } from './post-3'
import { post4 } from './post-4'
import { post5 } from './post-5'
import { projects } from './projects'
import { resumeGlobal } from './resume-global'
import { services } from './services'
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
  await Promise.all(
    globals.map((global) =>
      payload.updateGlobal({
        slug: global,
        data: {
          navItems: [],
        },
        depth: 0,
        context: {
          disableRevalidate: true,
        },
      }),
    ),
  )

  await Promise.all(
    collections.map((collection) => payload.db.deleteMany({ collection, req, where: {} })),
  )

  await Promise.all(
    collections
      .filter((collection) => Boolean(payload.collections[collection].config.versions))
      .map((collection) => payload.db.deleteVersions({ collection, req, where: {} })),
  )

  payload.logger.info(`— Seeding demo author and user...`)

  await payload.delete({
    collection: 'users',
    depth: 0,
    where: {
      email: {
        equals: 'demo-author@example.com',
      },
    },
  })

  payload.logger.info(`— Seeding media...`)

  const [image1Buffer, image2Buffer, image3Buffer, hero1Buffer] = await Promise.all([
    fetchFileByURL(
      'https://raw.githubusercontent.com/payloadcms/payload/refs/heads/main/templates/website/src/endpoints/seed/image-post1.webp',
    ),
    fetchFileByURL(
      'https://raw.githubusercontent.com/payloadcms/payload/refs/heads/main/templates/website/src/endpoints/seed/image-post2.webp',
    ),
    fetchFileByURL(
      'https://raw.githubusercontent.com/payloadcms/payload/refs/heads/main/templates/website/src/endpoints/seed/image-post3.webp',
    ),
    fetchFileByURL(
      'https://raw.githubusercontent.com/payloadcms/payload/refs/heads/main/templates/website/src/endpoints/seed/image-hero1.webp',
    ),
  ])

   const [demoAuthor, image1Doc, image2Doc, image3Doc, imageHomeDoc, categoryDocs] =
     await Promise.all([
       payload.create({
         collection: 'users',
         data: {
           name: 'Demo Author',
           email: 'demo-author@example.com',
           password: 'password',
         },
       }),
       payload.create({
         collection: 'media',
         data: image1,
         file: image1Buffer,
       }),
       payload.create({
         collection: 'media',
         data: image2,
         file: image2Buffer,
       }),
       payload.create({
         collection: 'media',
         data: image2,
         file: image3Buffer,
       }),
       payload.create({
         collection: 'media',
         data: imageHero1,
         file: hero1Buffer,
       }),
       Promise.all(
         categories.map((category) =>
           payload.create({
             collection: 'categories',
             data: {
               title: category,
               slug: category,
             },
           }),
         ),
       ),
     ])

   const [aiAgentsCat, paymentsCat, architectureCat, engineeringCat] = categoryDocs

payload.logger.info(`— Seeding insights...`)

  // Do not create insights with `Promise.all` because we want the posts to be created in order
  // This way we can sort them by `createdAt` or `publishedAt` and they will be in the expected order
  // POST SEEDING COMMENTED OUT - posts will not be created
  // const post1Doc = await payload.create({
  //   collection: 'insights',
  //   depth: 0,
  //   context: {
  //     disableRevalidate: true,
  //   },
  //   data: {
  //     ...post1({ heroImage: image1Doc, blockImage: image2Doc, author: demoAuthor }),
  //     categories: [paymentsCat.id, architectureCat.id],
  //   },
  // })

  // const post2Doc = await payload.create({
  //   collection: 'insights',
  //   depth: 0,
  //   context: {
  //     disableRevalidate: true,
  //   },
  //   data: {
  //     ...post2({ heroImage: image2Doc, blockImage: image3Doc, author: demoAuthor }),
  //     categories: [aiAgentsCat.id],
  //   },
  // })

  // const post3Doc = await payload.create({
  //   collection: 'insights',
  //   depth: 0,
  //   context: {
  //     disableRevalidate: true,
  //   },
  //   data: {
  //     ...post3({ heroImage: image3Doc, blockImage: image1Doc, author: demoAuthor }),
  //     categories: [paymentsCat.id, architectureCat.id],
  //   },
  // })

  // const post4Doc = await payload.create({
  //   collection: 'insights',
  //   depth: 0,
  //   context: {
  //     disableRevalidate: true,
  //   },
  //   data: {
  //     ...post4({ heroImage: image2Doc, author: demoAuthor }),
  //     categories: [aiAgentsCat.id, engineeringCat.id],
  //   },
  // })

  // const post5Doc = await payload.create({
  //   collection: 'insights',
  //   depth: 0,
  //   context: {
  //     disableRevalidate: true,
  //   },
  //   data: {
  //     ...post5({ heroImage: image3Doc, author: demoAuthor }),
  //     categories: [paymentsCat.id, engineeringCat.id],
  //   },
  // })

  // update each post with topically-relevant related posts (not an
  // all-to-all link) so the RelatedPosts block demonstrates real curation
  // POST RELATED POSTS COMMENTED OUT - posts will not be linked
  // await payload.update({
  //   id: post1Doc.id,
  //   collection: 'insights',
  //   context: { disableRevalidate: true },
  //   data: { relatedPosts: [post3Doc.id, post5Doc.id] },
  // })
  // await payload.update({
  //   id: post2Doc.id,
  //   collection: 'insights',
  //   context: { disableRevalidate: true },
  //   data: { relatedPosts: [post4Doc.id, post1Doc.id] },
  // })
  // await payload.update({
  //   id: post3Doc.id,
  //   collection: 'insights',
  //   context: { disableRevalidate: true },
  //   data: { relatedPosts: [post1Doc.id, post5Doc.id] },
  // })
  // await payload.update({
  //   id: post4Doc.id,
  //   collection: 'insights',
  //   context: { disableRevalidate: true },
  //   data: { relatedPosts: [post2Doc.id, post1Doc.id] },
  // })
  // await payload.update({
  //   id: post5Doc.id,
  //   collection: 'insights',
  //   context: { disableRevalidate: true },
  //   data: { relatedPosts: [post3Doc.id, post1Doc.id] },
  // })

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

  const industryDocs = []
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

  payload.logger.info(`— Seeding projects...`)

  const projectIndustries: Record<string, string> = {
    'aurora-ledger': 'fintech',
    'helix-recon': 'fintech',
    'northwind-support': 'saas-software',
    'forge-analytics': 'saas-software',
    'ember-portal': 'fintech',
    'relay-gateway': 'logistics',
  }

  const projectDocs = []
  for (const project of projects) {
    const industry = industryDocs.find((i) => i.slug === projectIndustries[project.slug])
    const doc = await payload.create({
      collection: 'projects',
      depth: 0,
      context: {
        disableRevalidate: true,
      },
      data: {
        ...project,
        industry: industry ? industry.id : undefined,
      },
    })
    projectDocs.push(doc)
  }

  payload.logger.info(`— Seeding services...`)

  const serviceDocs = []
  for (const service of services) {
    const doc = await payload.create({
      collection: 'services',
      depth: 0,
      context: {
        disableRevalidate: true,
      },
      data: service,
    })
    serviceDocs.push(doc)
  }

  payload.logger.info(`— Seeding case studies...`)

  for (const caseStudy of caseStudies(projectDocs)) {
    await payload.create({
      collection: 'case-studies',
      depth: 0,
      context: {
        disableRevalidate: true,
      },
      data: caseStudy,
    })
  }

  payload.logger.info(`— Seeding testimonials...`)

  for (const testimonial of testimonials) {
    await payload.create({
      collection: 'testimonials',
      depth: 0,
      context: {
        disableRevalidate: true,
      },
      data: testimonial,
    })
  }

  payload.logger.info(`— Seeding pages...`)

  const [_, contactPage] = await Promise.all([
    payload.create({
      collection: 'pages',
      depth: 0,
      context: {
        disableRevalidate: true,
      },
      data: home({ heroImage: imageHomeDoc, metaImage: image2Doc }),
    }),
    payload.create({
      collection: 'pages',
      depth: 0,
      context: {
        disableRevalidate: true,
      },
      data: contactPageData({ contactForm: contactForm }),
    }),
  ])

  payload.logger.info(`— Seeding globals...`)

  await Promise.all([
    payload.updateGlobal({
      slug: 'site-settings',
      context: {
        disableRevalidate: true,
      },
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
        ],
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
        footerNote:
          'Full-Stack Developer & AI Agent Architect. Building production systems that handle real money, real users, and real scale.',
      },
    }),
    payload.updateGlobal({
      slug: 'about',
      context: {
        disableRevalidate: true,
      },
      data: aboutGlobal(),
    }),
    payload.updateGlobal({
      slug: 'resume',
      context: {
        disableRevalidate: true,
      },
      data: resumeGlobal(),
    }),
    payload.updateGlobal({
      slug: 'uses',
      context: {
        disableRevalidate: true,
      },
      data: usesGlobal(),
    }),
    payload.updateGlobal({
      slug: 'now',
      context: {
        disableRevalidate: true,
      },
      data: nowGlobal(),
    }),
    payload.updateGlobal({
      slug: 'header',
      context: {
        disableRevalidate: true,
      },
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
        ],
      },
    }),
    payload.updateGlobal({
      slug: 'footer',
      context: {
        disableRevalidate: true,
      },
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
    }),
  ])

  payload.logger.info('Seeded database successfully!')
}

async function fetchFileByURL(url: string): Promise<File> {
  const res = await fetch(url, {
    credentials: 'include',
    method: 'GET',
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch file from ${url}, status: ${res.status}`)
  }

  const data = await res.arrayBuffer()

  return {
    name: url.split('/').pop() || `file-${Date.now()}`,
    data: Buffer.from(data),
    mimetype: `image/${url.split('.').pop()}`,
    size: data.byteLength,
  }
}
