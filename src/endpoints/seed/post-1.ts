import type { Media, User } from '@/payload-types'
import { RequiredDataFromCollectionSlug } from 'payload'
import {
  bannerBlock,
  boldParagraph,
  buildRichText,
  bulletList,
  codeBlock,
  heading,
  mediaBlock,
  paragraph,
} from './richTextHelpers'

export type PostArgs = {
  heroImage: Media
  blockImage: Media
  author: User
}

export const post1: (args: PostArgs) => RequiredDataFromCollectionSlug<'insights'> = ({
  heroImage,
  blockImage,
  author,
}) => {
  return {
    slug: 'idempotency-keys-payment-agents',
    _status: 'published',
    authors: [author],
    topic: 'Backend',
    readTime: '7 min read',
    tags: [{ tag: 'payments' }, { tag: 'idempotency' }, { tag: 'agents' }, { tag: 'postgres' }],
    content: buildRichText([
      paragraph(
        'An AI agent that can retry a failed action is useful. An AI agent that can retry a failed payment without your explicit permission is a production incident waiting to happen. Idempotency is the seam between those two outcomes.',
      ),
      heading('Why agents make this worse, not better', 'h2'),
      paragraph(
        'A human operator who double-clicks "Pay" once in a while is a nuisance. An LLM-driven agent that retries a tool call because a response timed out, or because it "thought" the first attempt failed, will do it every time the failure mode repeats. Agents are patient, fast, and have no embarrassment about trying the same thing five times in a row. That is exactly the behavior that turns a flaky network call into five duplicate charges.',
      ),
      paragraph(
        'The fix is not "make the agent smarter." The fix is the same one payments engineers have used for two decades: make the operation itself safe to repeat.',
      ),
      heading('Idempotency keys, briefly', 'h2'),
      paragraph(
        'Every mutating request the agent can issue — charge a card, disburse a payout, create a ledger entry — carries a client-generated idempotency key. The server persists the first successful response against that key and returns the same response for any repeat, instead of re-executing the operation.',
      ),
      codeBlock(
        `async function chargeCard(input: ChargeInput, idempotencyKey: string) {\n  const existing = await db.idempotencyKeys.findUnique({ where: { key: idempotencyKey } })\n  if (existing) return existing.response // safe to return, already executed\n\n  const result = await paymentsProvider.charge(input)\n\n  await db.idempotencyKeys.create({\n    data: { key: idempotencyKey, response: result, createdAt: new Date() },\n  })\n\n  return result\n}`,
        'typescript',
        'Idempotent charge wrapper',
      ),
      paragraph(
        'The key itself should be generated once per logical intent, not once per HTTP request. If the agent decides "charge this customer $40 for order #1182," that decision gets one key — every retry of the underlying call, whether triggered by a timeout, a rate limit, or the agent re-planning, reuses it.',
      ),
      heading('Where agents actually get this wrong', 'h2'),
      bulletList([
        'Generating a new key on every tool call instead of once per business decision',
        'Treating a timeout as "it failed" and immediately retrying with fresh state',
        'Letting the agent see raw provider errors instead of a normalized, idempotency-aware response',
        'No expiry policy on stored keys, so the table grows without bound',
      ]),
      bannerBlock(
        'A useful rule of thumb: if an operation moves money, changes an access grant, or sends a notification a human will read, it needs an idempotency key before an agent is allowed anywhere near it.',
        'warning',
        'Rule of thumb',
      ),
      heading('Making it visible to the agent', 'h2'),
      paragraph(
        'The last piece is giving the agent honest feedback. A tool call that silently short-circuits to a cached response should say so in its result, not just return the same payload as a fresh charge. That distinction matters when the agent is reasoning about what it just did and deciding whether to report success back to the user.',
      ),
      mediaBlock(blockImage.id),
      boldParagraph(
        'The takeaway: ',
        'idempotency is not a nice-to-have you add after the first duplicate-charge incident. For anything agent-driven that touches money, it is the first thing you build, not the last.',
      ),
    ]),
    heroImage: heroImage.id,
    meta: {
      description:
        'Why AI agents that retry failed actions need idempotency keys before they go anywhere near a payment provider — and where most implementations get it wrong.',
      image: heroImage.id,
      title: 'Idempotency Keys Are Non-Negotiable for Payment Agents',
    },
    relatedPosts: [], // populated by the seed script
    title: 'Idempotency Keys Are Non-Negotiable for Payment Agents',
  }
}
