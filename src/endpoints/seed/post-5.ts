import type { Media, User } from '@/payload-types'
import { RequiredDataFromCollectionSlug } from 'payload'
import {
  bannerBlock,
  boldParagraph,
  buildRichText,
  bulletList,
  heading,
  paragraph,
} from './richTextHelpers'

export type PostArgs = {
  heroImage: Media
  author: User
}

export const post5: (args: PostArgs) => RequiredDataFromCollectionSlug<'insights'> = ({
  heroImage,
  author,
}) => {
  return {
    slug: 'shipping-a-fintech-mvp-in-six-weeks',
    _status: 'published',
    authors: [author],
    topic: 'Career',
    readTime: '5 min read',
    tags: [
      { tag: 'payments' },
      { tag: 'production' },
      { tag: 'architecture' },
      { tag: 'reliability' },
    ],
    content: buildRichText([
      paragraph(
        'Six weeks is not enough time to build a fintech product properly. It is enough time to build the 20% of it that actually needs to be right on day one, and to be honest with the client about which 80% you deliberately deferred.',
      ),
      heading('Decide what cannot be wrong', 'h2'),
      paragraph(
        'Every fintech build has a short list of things that are genuinely non-negotiable from day one: the ledger design, idempotent payment handling, and access control on anything that moves money. Everything else \u2014 the admin dashboard\u2019s filtering options, the email templates, the third reporting view nobody asked for yet \u2014 can ship rough and improve later without anyone getting hurt.',
      ),
      bulletList([
        'Week 1\u20132: ledger schema, core domain model, auth \u2014 no UI yet',
        'Week 3\u20134: payment provider integration behind an idempotent interface',
        'Week 5: the actual product surface \u2014 the parts users touch every day',
        'Week 6: load testing the money-moving paths specifically, not the whole app evenly',
      ]),
      heading('The client conversation that saves the timeline', 'h2'),
      paragraph(
        'The single highest-leverage conversation in a six-week build happens in week one, not week five: an explicit, written list of what will and will not exist at launch. Clients rarely push back on a well-reasoned "not yet" for a reporting dashboard. They push back hard, and rightly so, on a rushed ledger design \u2014 which is exactly why that list should be decided before any code is written, not negotiated under deadline pressure in week five.',
      ),
      bannerBlock(
        'Load test the money-moving path under realistic concurrency before launch, even if nothing else gets a formal test pass. A UI bug is an inconvenience. A race condition in a payout flow is a wire transfer you cannot take back.',
        'warning',
        'Non-negotiable before launch',
      ),
      boldParagraph(
        'The takeaway: ',
        'a fast fintech build is not a build with less care. It is a build where the care is concentrated entirely on the paths that touch money, and everywhere else is allowed to be genuinely simple.',
      ),
    ]),
    heroImage: heroImage.id,
    meta: {
      description:
        'What actually has to be right on day one when a fintech MVP has a six-week timeline \u2014 and the client conversation that keeps that timeline honest.',
      image: heroImage.id,
      title: 'Shipping a Fintech MVP in Six Weeks',
    },
    relatedPosts: [], // populated by the seed script
    title: 'Shipping a Fintech MVP in Six Weeks',
  }
}
