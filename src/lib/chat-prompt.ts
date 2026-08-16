import type { SiteSetting } from '@/payload-types'

/**
 * Builds the assistant's system prompt from the CMS-managed `SiteSetting`
 * global instead of hardcoded persona facts, so the chat widget's persona
 * stays in sync with whatever an editor has set in the admin panel.
 *
 * Every field is optional on the schema, so each piece degrades gracefully
 * — a partially-filled-in settings page still produces a coherent prompt,
 * it just omits the parts that aren't set.
 */
export function buildSystemPrompt(s: SiteSetting): string {
  const siteName = s.siteName?.trim() || "Martin's AI"
  const name = s.name?.trim() || 'Martins Michael'
  const tagline = s.tagline?.trim() || ''
  const location = s.location?.trim() || ''
  const email = s.email?.trim() || ''
  const availability = s.availability?.trim() || ''
  const calendlyUrl = s.calendlyUrl?.trim() || ''

  const roles = (s.roles ?? [])
    .map((r: { role?: string | null }) => r.role?.trim())
    .filter((r): r is string => Boolean(r))

  const identityBits = [roles.length ? roles.join(' / ') : tagline, location]
    .filter(Boolean)
    .join(', ')
  const identity = [siteName, identityBits].filter(Boolean).join(', ')

  const intro = identity
    ? `You are the assistant embedded on ${identity}, ${name}'s portfolio site.`
    : `You are the assistant embedded on ${name}'s portfolio site.`

  const contactBits = [
    email && `email them at ${email}`,
    calendlyUrl && `book a call at ${calendlyUrl}`,
  ].filter(Boolean)
  const contact = contactBits.length
    ? `Visitors who want to talk about work can ${contactBits.join(', or ')}.`
    : ''

  const availabilityLine = availability ? `Current availability: ${availability}.` : ''

  const blocks: string[] = [
    intro,
    availabilityLine,
    `Answer questions about the projects, services, industries, case studies, insights (blog posts), and testimonials using the listContent/getContent tools — valid resource values are: project, service, industry, case_study, insight, testimonial. Always look content up rather than inventing or guessing at specifics (numbers, names, pricing) you are not certain of.`,
    contact,
    `If a visitor clearly wants to gauge working together — they give (or offer to give) a name, a way to reach them, and what they need — use the saveInquiry tool to record it. Never call saveInquiry with invented or assumed details, and never use it for anything other than a genuine inquiry the visitor gave you.`,
    'Keep answers concise and conversational. This is a chat widget, not documentation — short paragraphs, no heavy formatting.',
  ]

  return blocks.filter(Boolean).join('\n\n')
}

/** Static fallback used server-side when the client supplies no system prompt. */
export const DEFAULT_SYSTEM_PROMPT = `You are the assistant embedded on Martin's AI, a portfolio site for a full-stack developer and AI agent architect. Answer questions about the projects, services, industries, case studies, insights (blog posts), and testimonials using the listContent/getContent tools — valid resource values are: project, service, industry, case_study, insight, testimonial. Always look content up rather than inventing specifics (numbers, names, pricing) you are not certain of.

If a visitor clearly wants to get in touch about working together — they give (or offer to give) a name, a way to reach them, and what they need — use the saveInquiry tool to record it. Never call saveInquiry with invented or assumed details, and never use it for anything other than a genuine inquiry the visitor gave you.

Keep answers concise and conversational. This is a chat widget, not an essay.`
