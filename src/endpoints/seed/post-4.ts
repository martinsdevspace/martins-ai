import type { Media, User } from '@/payload-types'
import { RequiredDataFromCollectionSlug } from 'payload'
import {
  bannerBlock,
  boldParagraph,
  buildRichText,
  bulletList,
  codeBlock,
  heading,
  paragraph,
} from './richTextHelpers'

export type PostArgs = {
  heroImage: Media
  author: User
}

export const post4: (args: PostArgs) => RequiredDataFromCollectionSlug<'insights'> = ({
  heroImage,
  author,
}) => {
  return {
    slug: 'observability-for-tool-calling-agents',
    _status: 'published',
    authors: [author],
    topic: 'AI/ML',
    readTime: '6 min read',
    tags: [
      { tag: 'agents' },
      { tag: 'observability' },
      { tag: 'llm' },
      { tag: 'production' },
    ],
    content: buildRichText([
      paragraph(
        'A traditional API either succeeds or fails, and your existing observability stack already knows how to tell you which. An agent can "succeed" at calling a tool and still take the wrong action entirely — and that failure mode is invisible to every dashboard built for conventional software.',
      ),
      heading('Log the decision, not just the call', 'h2'),
      paragraph(
        'A tool call log tells you what the agent did. It does not tell you why. Without the reasoning trace attached to each call — what the agent believed, what alternatives it considered, what evidence it acted on — a wrong action and a correct one look identical in a request log. Both are a 200 response with a valid payload.',
      ),
      codeBlock(
        `logger.info('agent.tool_call', {\n  toolName: call.name,\n  input: call.input,\n  reasoningSummary: step.reasoning, // one sentence, not the full chain\n  confidence: step.confidence,\n  turnId: conversation.turnId,\n})`,
        'typescript',
        'Structured tool-call log',
      ),
      heading('The three signals that actually catch problems', 'h2'),
      bulletList([
        'Tool call success rate segmented by tool, not aggregated across all tools',
        'Retry and correction rate \u2014 how often the agent calls the same tool twice in a row with different arguments',
        'Human override rate \u2014 how often a person steps in and reverses or corrects what the agent did',
      ]),
      bannerBlock(
        'Override rate is the single most useful metric in this list. It is the only one that measures whether a human actually trusted the outcome, not just whether the system returned a response.',
        'info',
        'Most useful signal',
      ),
      heading('Alert on drift, not just errors', 'h2'),
      paragraph(
        'A model or prompt change can silently shift an agent\u2019s behavior without producing a single error. The tool calls still succeed; they are just subtly wrong more often. Track the distribution of which tools get called for a given intent over time, and alert when that distribution moves — that catches regressions traditional error-rate monitoring will never see.',
      ),
      boldParagraph(
        'The takeaway: ',
        'agent observability is not "add logging to the tool calls." It is capturing the reasoning behind the call and the human response to it \u2014 the parts a conventional APM tool was never built to see.',
      ),
    ]),
    heroImage: heroImage.id,
    meta: {
      description:
        'Why conventional API monitoring misses agent failures entirely, and the three signals \u2014 segmented success rate, retry rate, and human override rate \u2014 that actually catch them.',
      image: heroImage.id,
      title: 'Observability for Tool-Calling Agents',
    },
    relatedPosts: [], // populated by the seed script
    title: 'Observability for Tool-Calling Agents',
  }
}
