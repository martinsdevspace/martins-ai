---
title: "12 Tools I Use for AI Agent Development in 2026"
slug: "12-tools-ai-agent-development-2026"
topic: "AI/ML"
categories: [lists, tools, ai-agents]
tags: [agents, tools, workflow, production, frameworks, mastra, laravel]
readTime: "11 min read"
publishedAt: "2026-08-22"
metaTitle: "12 Tools I Use for AI Agent Development in 2026"
metaDescription: "The 12 tools that survived contact with production for building AI agents in 2026 — from Mastra and Vercel AI SDK to Laravel, Trigger.dev, Langfuse, and Ollama."
heroImage: "<placeholder-media-id>"
relatedPosts: [human-in-the-loop-financial-agents, laravel-ai-sdk-six-months-production]
---

The stack I run today is not the stack I ran eighteen months ago. Back then "agentic" meant a single `while` loop around a chat completion and a prayer that it would terminate. Today it means durable execution, human approval gates, eval harnesses, and observability that tells you *why* your agent quietly shipped a $50k refund at 3 a.m.

I'm not nostalgic for the old days. But I am deliberate about what earns a permanent place in my toolchain. Every tool below has survived at least one production incident, one angry client, or one 2 a.m. page. If it's here, I'd reach for it again tomorrow.

A note on selection bias: I build for fintech and payments teams, mostly on TypeScript/Next.js with occasional PHP/Laravel backends. Your mileage will vary if you live in Python or ship consumer chatbots. Treat this as a curated stack, not a ranking — tool #12 is not "worse" than tool #1, it's just later in the alphabet.

---

## 1. OpenRouter — one API to 400+ models

I keep `@openrouter/ai-sdk-provider` in every project. It's already in the `package.json` of this very site. The value isn't the models (you can hit Anthropic or OpenAI directly); it's the **routing**. One OpenAI-compatible endpoint, 400+ models across 90+ providers, automatic fallbacks, and BYOK so the client's API keys never touch my infrastructure.

For agent work specifically, model routing is a superpower. You can let a planner run on a cheap model, a critic run on a smart one, and a coder run on whatever is fastest that week — without wiring four different SDKs. The 5.5% platform fee is cheaper than the engineering time you'd spend maintaining four provider integrations.

**When I skip it:** tiny prototypes where a single provider is fine, or when a client has contractual restrictions on where inference happens.

```typescript
import { openrouter } from '@openrouter/ai-sdk-provider'
import { generateText } from 'ai'

const { text } = await generateText({
  model: openrouter('anthropic/claude-opus-4.1'),
  prompt: 'Summarize this payout dispute.',
})
```

---

## 2. Ollama — local inference for iteration and privacy

`ollama run qwen3.6` and you've got a capable model on your laptop. I use Ollama for two things: fast iteration when I don't want to burn API credits on a failing prompt, and privacy-sensitive work where the data can't leave the machine. The API is OpenAI-compatible, so swapping between Ollama locally and a cloud provider in code is a one-line change.

It supports structured JSON output and tool calling, which means you can develop and debug agent loops entirely offline, then promote the exact same prompt to a hosted model. For African fintech clients especially, local models mean you can demo a working agent on a laptop with no connectivity requirement.

**When I skip it:** anything needing frontier reasoning or a model bigger than your RAM. Ollama is for dev velocity and privacy, not for production scale.

```bash
ollama run qwen3.6
# then point your AI SDK at http://localhost:11434/v1
```

---

## 3. Mastra — the TypeScript agent framework I build on

Mastra hit v1.0 in January 2026 and it's the framework I reach for when an agent needs to do more than chat. It's built on the Vercel AI SDK, so everything you know about `generateText` and `streamText` still applies, but it layers on what production agents actually need: durable workflows, persistent memory (Postgres/Redis/in-memory), RAG, evals, and a real observability surface.

The workflow engine is the killer feature. You model agent logic as a graph of steps, and because it's durable, a workflow can `suspend()` mid-flight — waiting on a human, on another service, on a timer — and resume exactly where it left off. That's the backbone of the human-in-the-loop pattern I wrote about separately (see the Tutorial). Mastra is Apache 2.0 at the core, with enterprise features (RBAC, SSO, ACL) behind a commercial license.

**When I skip it:** when the client is PHP-first (see #11), or when a single short-lived agent call is all the job needs and a framework would be overkill.

```typescript
import { createWorkflow, createStep } from '@mastra/core/workflows'

const approvalStep = createStep({
  id: 'approval',
  resumeSchema: z.object({ approved: z.boolean() }),
  async execute({ suspend }) {
    const decision = await suspend({ reason: 'Awaiting payout approval' })
    return decision
  },
})
```

---

## 4. Vercel AI SDK v7 — the plumbing underneath everything

Mastra sits on top of it, but I also use the Vercel AI SDK directly, especially v7 (released June 25, 2026). It's the three-layer toolkit: **Core** (`generateText`, `streamText`, `generateObject`), **UI** (`useChat`, `useCompletion`), and **RSC**. v7 added reasoning control (`reasoning: 'high'`), tool approvals, and `WorkflowAgent` for durable execution — plus first-class telemetry. It's also what powers the chatbot on this website.

If you're on v6, the v7 codemod (`npx @ai-sdk/codemod v7`) handles most of the rename churn: `system` becomes `instructions`, `onFinish` becomes `onEnd`, `experimental_telemetry` becomes `telemetry`. Minimum is now Node 22 and ESM.

**When I skip it:** I basically don't. It's the substrate. If I'm writing TypeScript agents, this is the default.

```typescript
import { generateText } from 'ai'

const result = await generateText({
  model: openrouter('openai/gpt-5.1'),
  instructions: 'You are a payments dispute analyst.', // note: v7 renamed system -> instructions
  reasoning: 'high',
  prompt: disputeText,
})
```

---

## 5. assistant-ui — chat UX I actually ship

Building chat UI from scratch is a trap. `assistant-ui` (MIT, ~11.7k stars, YC-backed) gives you composable React primitives — `Thread`, `Message`, `Composer`, `ActionBar` — that look good and behave correctly out of the box. It's also what I used to build CowriterAI. It runs on `useChatRuntime` and supports generative UI: you render tool calls as live React components, and crucially, you can collect **inline human approvals** right inside the chat, which is exactly what a financial agent needs.

It pairs with Mastra, LangGraph, or a custom backend. I've used it as the review surface for the approval-gate pattern — the human sees the proposed action as a card in the thread and clicks Approve or Reject without leaving the conversation.

**When I skip it:** when the interface isn't chat (a background batch agent needs no UI), or when design wants something so custom that the primitives fight you more than they help.

```tsx
import { Thread } from '@assistant-ui/react'

export function Chat() {
  return <Thread /> // wired to your runtime; tool calls render as components
}
```

---

## 6. eve — Vercel's filesystem-first "Next.js for agents"

eve (beta, June 2026) is the most interesting new entry. The thesis: an agent should be a **directory of files**, not a tangle of SDK calls. You get `instructions.md`, `agent.ts`, `tools/`, `skills/`, `subagents/`, `channels/`, and `schedules/`. Under the hood it's durable by default — Postgres-backed checkpointing via the Workflow SDK, the AI SDK for inference, and a Docker sandbox for untrusted code.

I'm experimenting with it for agents that need to run on a schedule and survive restarts. The filesystem convention means a new teammate can `ls` an agent and understand it in thirty seconds. Built-in `defineEval` means tests ship next to the agent. It's beta, so I'm not putting it in client production yet — but it's the direction I think agent frameworks are heading, and Mastra is heading in this same direction too. I'm currently using it in apps in private testing, combined with AssistantUI via `@assistant-ui/eve`.

**When I skip it:** anything client-facing today. Wait for GA.

```typescript
// agents/payout-agent/agent.ts
import { defineAgent } from 'eve'

export default defineAgent({
  instructions: './instructions.md',
  tools: ['./tools/issueRefund.ts'],
  schedules: [{ cron: '0 9 * * 1', action: 'weeklyReconcile' }],
})
```

---

## 7. Trigger.dev — durable workflows, no timeouts

Serverless functions time out — often in about 30 seconds on platforms like Vercel. Agents don't respect that limit. Trigger.dev (v4 GA in 2026, Apache 2.0, ~15k stars) solves this with durable tasks: a run can pause for hours, wait on an external event, and resume — all without you managing state. No timeouts. Self-hostable. Type-safe agents via Zod schemas that become type-safe tools for the AI SDK.

I reach for it when an agent's job spans longer than a request lifecycle: a multi-day approval cycle, a nightly reconciliation that fans out to hundreds of records, a pipeline that polls a slow bank API. Atomic versioning means I can ship a new agent version without breaking in-flight runs.

**When I skip it:** when the whole job fits in a single function call. Don't rent durability you won't use.

```typescript
import { task } from '@trigger.dev/sdk/v4'

export const reconcile = task({
  id: 'reconcile-payouts',
  run: async (payload) => {
    // can pause here for hours without timing out
    return await longRunningReconciliation(payload)
  },
})
```

---

## 8. Inngest — event-driven durable execution

Inngest is Trigger.dev's philosophical cousin. Event-driven, zero-infra hosted option, with `step.run`, `step.sleep`, and `step.waitForEvent` — the last being how you build human-in-the-loop: pause the workflow indefinitely, then resume the moment an approval event fires. It's a simpler API than Temporal and more mature than most alternatives.

I've used Inngest when the agent is one step in a larger event-sourced system — "when a payout is created, kick off the fraud-check agent, then wait for the risk event." Its Agent Evals platform feature lets you score agent outputs in the same place you orchestrate them.

**When I skip it:** when I already have Trigger.dev wired in (pick one, don't run both), or when the system isn't event-driven at its core.

```typescript
import { Inngest } from 'inngest'

const inngest = new Inngest({ id: 'payments' })

export const payoutFlow = inngest.createFunction(
  { id: 'payout-with-approval' },
  { event: 'payout.created' },
  async ({ event, step }) => {
    await step.run('fraud-check', () => checkRisk(event.payout))
    await step.waitForEvent('approval.received', { timeout: '24h' })
    await step.run('execute', () => issuePayout(event.payout))
  },
)
```

---

## 9. Langfuse — tracing and evals you can trust

If you can't see what your agent did, you can't fix it, and you definitely can't defend it in an audit. Langfuse (MIT, ~30k stars, ClickHouse-backed, acquired by ClickHouse in January 2026) is open-source LLM observability: tracing, LLM-as-judge evaluations, prompt management, and datasets. It's async, so it doesn't add latency to your requests, and it's self-hostable for free.

I use it for two jobs: debugging agent failures (show me the exact tool calls and tokens) and running eval suites in CI (did the agent follow the approval policy?). The LLM-as-judge pattern lets me grade outputs automatically instead of reading 500 traces by hand.

**When I skip it:** for throwaway prototypes. But the moment an agent touches money, tracing stops being optional.

```typescript
import { observeOpenAI } from '@langfuse/ai-sdk'

const result = await generateText({
  model: observeOpenAI(openrouter('anthropic/claude-opus-4.1')),
  prompt: 'Approve or reject this refund.',
})
```

---

## 10. Upstash — rate limiting and caching, already in the stack

`@upstash/ratelimit` and `@upstash/redis` are already dependencies here, and they earn their place. Agents are expensive per call and trivially abusable — a loop that retries forever will happily run up your bill. Upstash gives you serverless Redis with per-tenant rate limiting and caching, no connection-pool management.

I use it for three things: capping agent calls per tenant, caching expensive tool results (don't re-query the ledger twice in one run), and storing idempotency keys. It's the unglamorous backbone that keeps a demo from becoming a $4,000 invoice.

**When I skip it:** when the app already has a Redis instance — just use that. Don't add a second one for fashion.

```typescript
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(20, '1 h'),
})

const { success } = await ratelimit.limit(tenantId)
```

---

## 11. Laravel AI SDK — when the backend is PHP

Not every fintech client wants a Node rewrite. Laravel 13 (released March 2026, PHP 8.3+) ships a first-party `laravel/ai` package, and its human-in-the-loop tool-approval API (v0.10.0, July 2026) is genuinely good. If the team is already Laravel-native and the payments run in PHP, this lets them add agentic features without leaving the framework they trust. Eloquent models become agent memory; Queues become durable tool execution; Broadcasting becomes real-time status; Policies become the agent's permission layer.

I wrote a full review of it separately (see the Tool Review), but the short version: it's the right call when the org is PHP-first, and the wrong call for a greenfield AI-only team that would be better on TypeScript.

**When I skip it:** greenfield agent projects, or when the team has no PHP competence.

```php
use Laravel\Ai\Facades\Ai;
use Laravel\Ai\Contracts\Approvable;

class IssueRefund implements Approvable
{
    public function needsApproval(): bool
    {
        return $this->amount > 1000;
    }
}
```

---

## 12. Portkey — the AI gateway with guardrails

The last tool is the one that sits in front of all the others. Portkey is an AI gateway: it adds fallbacks across providers, guardrails (PII redaction, content policy), budget caps, and a virtual-key layer so you never hardcode a provider key in a client repo. When an agent makes a hundred calls a minute across three providers, a gateway is what keeps one provider outage from taking down the whole system.

The alternative is the Vercel AI Gateway, which is tighter if you're already all-in on Vercel. I lean Portkey when clients span multiple clouds or want self-hosting. Either way, once you're past prototype scale, you want one choke point for every token that leaves your infrastructure.

**When I skip it:** single-provider prototypes. A gateway is infrastructure, and infrastructure has a cost — don't buy it before you need it.

```typescript
import { createGateway } from '@portkey-ai/gateway'

const gateway = createGateway({ apiKey: process.env.PORTKEY_KEY })
// route every agent call through gateway for fallbacks + budgets
```

---

## The throughline

Twelve tools, but they cluster into five jobs: **model access** (OpenRouter, Ollama), **agent frameworks** (Mastra, eve, Laravel AI SDK), **SDK and UI** (Vercel AI SDK, assistant-ui), **durable execution** (Trigger.dev, Inngest), and **observability and control** (Langfuse, Upstash, Portkey).

If you take one thing from this list: the tools that matter most in 2026 aren't the ones that make agents *smarter* — they're the ones that make agents *safe, observable, and resumable*. A clever agent that charges the wrong card is worse than a boring agent that waits for a human.

Next: read the deep dive on [building human-in-the-loop approval gates with Mastra](/insights/human-in-the-loop-financial-agents), or the hands-on [review of the Laravel AI SDK](/insights/laravel-ai-sdk-six-months-production).
