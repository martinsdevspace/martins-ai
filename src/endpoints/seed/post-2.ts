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

export const post2: (args: PostArgs) => RequiredDataFromCollectionSlug<'insights'> = ({
  heroImage,
  blockImage,
  author,
}) => {
  return {
    slug: 'context-window-budget-production-agents',
    _status: 'published',
    authors: [author],
    topic: 'AI/ML',
    readTime: '9 min read',
    tags: [
      { tag: 'agents' },
      { tag: 'llm' },
      { tag: 'observability' },
      { tag: 'production' },
    ],
    content: buildRichText([
      paragraph(
        'Every production agent has a context window budget whether or not anyone on the team has written it down. Once you make it explicit, a whole category of "the agent got confused" bugs stop being mysterious.',
      ),
      heading('Treat the context window like a memory budget', 'h2'),
      paragraph(
        'A context window is not infinite scratch space — it is a fixed resource that gets consumed by system prompt, tool definitions, conversation history, and retrieved documents, in that order of priority. When a long-running agent starts giving worse answers after twenty turns, the cause is almost never "the model got dumber." It is that the budget ran out and something important got truncated or pushed out of relevance.',
      ),
      heading('A simple budget split that works in practice', 'h2'),
      bulletList([
        'System prompt + tool schemas: fixed cost, pay it once, keep it lean',
        'Retrieved context: capped and re-ranked, never appended without a limit',
        'Conversation history: summarized past a turn threshold, not kept verbatim forever',
        'Reserved headroom: always leave room for the model\u2019s own reasoning and output',
      ]),
      codeBlock(
        `function buildContext(history: Turn[], retrieved: Doc[], budgetTokens: number) {\n  const systemCost = estimateTokens(SYSTEM_PROMPT) + estimateTokens(TOOL_SCHEMAS)\n  const reserved = 2000 // headroom for reasoning + output\n  const available = budgetTokens - systemCost - reserved\n\n  const trimmedHistory = summarizeIfOverBudget(history, available * 0.6)\n  const trimmedDocs = rerankAndTruncate(retrieved, available * 0.4)\n\n  return [SYSTEM_PROMPT, ...trimmedHistory, ...trimmedDocs]\n}`,
        'typescript',
        'Context budget split',
      ),
      heading('The failure mode that actually ships to production', 'h2'),
      paragraph(
        'The most common version of this bug: an agent with tool access accumulates full tool call results in its history — a 200-row database query result here, a full API response there — until the budget is entirely consumed by data the agent already acted on and no longer needs verbatim. By the time a user asks a follow-up question, there is no room left for the answer to reason properly.',
      ),
      bannerBlock(
        'Log your actual token usage per turn in production, not just in testing. Budgets that look fine against a demo conversation regularly blow up against a real user who pastes in a long error log.',
        'info',
        'Observability note',
      ),
      mediaBlock(blockImage.id),
      heading('Summarization is a design decision, not a fallback', 'h2'),
      paragraph(
        'Treat history summarization as part of the agent\u2019s architecture from day one, not a patch you bolt on once you hit the limit in production. Decide upfront what is safe to compress — casual back-and-forth — and what must stay verbatim, like the exact wording of a commitment the agent made to a user or the precise parameters of an action it already took.',
      ),
      boldParagraph(
        'The takeaway: ',
        'a context window budget is infrastructure, not an implementation detail. Write it down, log against it, and treat running out of room as an incident, not a shrug.',
      ),
    ]),
    heroImage: heroImage.id,
    meta: {
      description:
        'Why long-running agents degrade after enough turns, and how treating the context window as an explicit token budget — not infinite scratch space — fixes it.',
      image: heroImage.id,
      title: 'Give Your Production Agent a Context Window Budget',
    },
    relatedPosts: [], // this is populated by the seed script
    title: 'Give Your Production Agent a Context Window Budget',
  }
}
