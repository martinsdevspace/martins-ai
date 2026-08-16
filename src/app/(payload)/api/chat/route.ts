/* Sibling static route next to the Payload REST catch-all
 * (`(payload)/api/[...slug]/route.ts`) — Next.js resolves the static
 * `/api/chat` segment before it ever considers the `[...slug]` catch-all,
 * so this doesn't collide with Payload's own API, the same pattern Payload's
 * official website template uses for `/api/contact-form-submit`. */
import { createOpenRouter } from '@openrouter/ai-sdk-provider'
import { convertToModelMessages, stepCountIs, streamText, type UIMessage } from 'ai'

import { buildSystemPrompt, DEFAULT_SYSTEM_PROMPT } from '@/lib/chat-prompt'
import { createChatTools } from '@/lib/chat-tools'
import { checkRateLimit, getClientIp } from '@/lib/rate-limit'
import { getCachedGlobal } from '@/utilities/getGlobals'

export const maxDuration = 30

// "openrouter/free" auto-routes each request to whichever free model on
// OpenRouter is currently available — it costs nothing but capability and
// uptime vary by whatever it lands on. Override via env if you'd rather
// pin a specific free model (e.g. an ID from openrouter.ai/models?max_price=0)
// for consistent behavior instead of auto-routing.
const CHAT_MODEL = process.env.CHAT_MODEL || 'openrouter/free'

// Body bounds so a single request can't blow up the token budget.
const MAX_MESSAGES = 30
const MAX_USER_TEXT_LENGTH = 4000

function messageTextLength(message: UIMessage): number {
  let total = 0
  for (const part of message.parts ?? []) {
    if (part.type === 'text' && 'text' in part) total += part.text.length
  }
  return total
}

export async function POST(req: Request) {
  if (!process.env.OPENROUTER_API_KEY) {
    return Response.json(
      { error: 'Chat is not configured — missing OPENROUTER_API_KEY on the server.' },
      { status: 503 },
    )
  }

  const ip = getClientIp(req)
  const { limited, retryAfter } = await checkRateLimit(ip)
  if (limited) {
    return Response.json(
      { error: 'Too many messages — please wait a few minutes and try again.' },
      {
        status: 429,
        headers: retryAfter ? { 'Retry-After': String(retryAfter) } : undefined,
      },
    )
  }

  let body: { messages: UIMessage[] }
  try {
    body = await req.json()
  } catch {
    return Response.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const messages = body?.messages
  if (!Array.isArray(messages) || messages.length === 0 || messages.length > MAX_MESSAGES) {
    return Response.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  for (const message of messages) {
    if (!message || (message.role !== 'user' && message.role !== 'assistant')) {
      return Response.json({ error: 'Invalid request body.' }, { status: 400 })
    }
    if (messageTextLength(message) > MAX_USER_TEXT_LENGTH) {
      return Response.json({ error: 'Message too long.' }, { status: 413 })
    }
  }

  // The system prompt is always built server-side from the CMS `site-settings`
  // global. The request body is never trusted for it — a client-supplied
  // prompt would let anyone repurpose the OpenRouter key as a generic LLM API.
  let system = DEFAULT_SYSTEM_PROMPT
  try {
    const settings = await getCachedGlobal('site-settings', 0)()
    if (settings) system = buildSystemPrompt(settings)
  } catch (err) {
    console.error('Failed to load site-settings for the chat system prompt:', err)
  }

  const openrouter = createOpenRouter({ apiKey: process.env.OPENROUTER_API_KEY })

  try {
    const result = streamText({
      model: openrouter(CHAT_MODEL),
      system,
      messages: await convertToModelMessages(messages),
      tools: createChatTools(),
      stopWhen: stepCountIs(5), // cap tool-call round trips
    })

    return result.toUIMessageStreamResponse()
  } catch (err) {
    console.error('Chat request failed:', err)
    return Response.json({ error: 'The chat model failed to respond. Please try again.' }, { status: 502 })
  }
}
