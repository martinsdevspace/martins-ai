---
title: "Build Human-in-the-Loop Approval Gates for Financial Agents"
slug: "human-in-the-loop-financial-agents"
topic: "Architecture"
categories: [tutorials, ai-agents, fintech]
tags: [agents, human-in-the-loop, payments, mastra, typescript, postgres, approval]
readTime: "16 min read"
publishedAt: "2026-08-22"
metaTitle: "Human-in-the-Loop Approval Gates for Financial Agents with Mastra"
metaDescription: "A step-by-step tutorial for building durable human-in-the-loop approval gates for financial agents using Mastra workflows, PostgreSQL, and idempotent tool execution."
heroImage: "<placeholder-media-id>"
relatedPosts: [12-tools-ai-agent-development-2026, laravel-ai-sdk-six-months-production]
---

It started, as these things do, with an agent that was too confident. An agent I'd put in front of a payout queue had approved a disbursement it shouldn't have, because its confidence score cleared a threshold I'd set and nobody was watching. The money moved. The customer noticed. So did the compliance team.

The agent wasn't "wrong" in the narrow sense — the payout was legitimate. The problem was the *design*. Any system that can move fifty thousand dollars should require a human in the loop for amounts above a threshold, and that human should have full context before they click anything. "The model was confident" is not a control. It's an excuse.

This tutorial builds that control properly. By the end you'll have a Mastra workflow that *proposes* a financial action, *suspends* and persists its state while a human reviews it, and *resumes* to execute — or *bails* — based on the decision. It's durable (survives restarts), idempotent (can't double-charge), and auditable (every decision is logged).

This builds directly on two earlier pieces: [idempotency keys for payment agents](/insights/idempotency-keys-payment-agents) and [observability for tool-calling agents](/insights/observability-for-tool-calling-agents). Read those first if you haven't — the patterns here assume you already have idempotency and tracing in place.

---

## The pattern in one diagram

```
        ┌─────────────┐
        │  Trigger    │  (payout requested)
        └──────┬──────┘
               ▼
        ┌─────────────┐
        │  Agent      │  proposes: "refund $1,200 to order #1182"
        │  proposes   │
        └──────┬──────┘
               ▼
        ┌─────────────┐
        │ ApprovalGate│  suspend() ── persist intent + idempotency key
        │  (suspend)  │  ── notify human (Slack / email / webhook)
        └──────┬──────┘
               │  (workflow parked, run id returned to caller)
               │
      ┌────────┴─────────┐
      │  HUMAN REVIEWS   │  sees: who, amount, reason, full context
      └────────┬─────────┘
               │  POST /api/finance/decisions  { runId, approved, edits? }
               ▼
        ┌─────────────┐
        │ resume() or │  approved → execute idempotent tool
        │ bail()      │  rejected → log, do not execute
        └──────┬──────┘
               ▼
        ┌─────────────┐
        │ Audit log   │  immutable row: who decided, what was shown
        └─────────────┘
```

The key insight: **the agent never executes a money move directly.** It proposes. The workflow owns the gate. A human owns the decision. The tool owns idempotency.

---

## Prerequisites

- A Mastra project (`npm create mastra@latest` or add `@mastra/core` to an existing app)
- A PostgreSQL database for durable memory and the audit log
- The idempotency helper from the earlier post (we'll re-use it)
- OpenRouter configured for model access (we'll use it for the agent, not required for the gate logic)

Mastra's durability comes from its memory backend. For a workflow to `suspend()` and later `resume()`, the run state has to live in Postgres, not in a process variable that dies when the server restarts. Configure the Postgres memory store at init time.

```typescript
// src/mastra/index.ts
import { Mastra } from '@mastra/core/mastra'
import { MastraCompositeStore } from '@mastra/core/storage'
import { MemoryPG, WorkflowsPG } from '@mastra/pg'
import { Memory } from '@mastra/core/memory'

// Composite storage: durable Postgres for the `memory` and `workflows` domains.
// The `workflows` domain is what lets a suspended run resume after a restart.
const storage = new MastraCompositeStore({
  id: 'composite',
  domains: {
    memory: new MemoryPG({ connectionString: process.env.DATABASE_URL! }),
    workflows: new WorkflowsPG({ connectionString: process.env.DATABASE_URL! }),
  },
})

export const mastra = new Mastra({
  workflows: { paymentApproval },
  agents: { financeAgent },
  storage,
  memory: new Memory(),
})
```

---

## Step 1: Define the approval workflow

Mastra workflows are graphs of steps. A step runs, optionally `suspend()`s (with a payload describing why it paused), and later `resume()`s with data from outside. The `suspendSchema` and `resumeSchema` give you typed round-trips — the suspended payload and the resumed payload are both validated.

We'll build a workflow with three steps: **propose**, **gate**, and **execute**. The `gate` step is where we suspend.

```typescript
// src/mastra/workflows/paymentApproval.ts
import { createWorkflow, createStep } from '@mastra/core/workflows'
import { z } from 'zod'

const proposalSchema = z.object({
  orderId: z.string(),
  amount: z.number(),
  currency: z.string(),
  reason: z.string(),
})

const decisionSchema = z.object({
  approved: z.boolean(),
  decidedBy: z.string(),
  edits: proposalSchema.partial().optional(),
  note: z.string().optional(),
})

const proposeStep = createStep({
  id: 'propose',
  inputSchema: proposalSchema,
  outputSchema: proposalSchema,
  async execute({ inputData, mastra }) {
    const agent = mastra.getAgent('financeAgent')
    const res = await agent.generate(
      `Review refund request for order ${inputData.orderId}, amount ${inputData.amount} ${inputData.currency}.`,
    )
    // agent returns a structured proposal; for brevity we pass inputData through
    return inputData
  },
})

const gateStep = createStep({
  id: 'gate',
  inputSchema: proposalSchema,
  outputSchema: z.object({ decision: decisionSchema, final: proposalSchema }),
  // These schemas type the suspend payload and the resume payload
  suspendSchema: z.object({ reason: z.string(), proposal: proposalSchema }),
  resumeSchema: decisionSchema,
  async execute({ inputData, suspend, resume }) {
    // If we're resuming, resume() returns the human's decision
    const resumed = resume?.()
    if (resumed) {
      const final = { ...inputData, ...(resumed.edits ?? {}) }
      return { decision: resumed, final }
    }

    // First pass: park the workflow, persist intent, ask a human
    const payload = await suspend({
      reason: `Refund of ${inputData.amount} ${inputData.currency} requires approval`,
      proposal: inputData,
    })
    const final = { ...inputData, ...(payload.edits ?? {}) }
    return { decision: payload, final }
  },
})

const executeStep = createStep({
  id: 'execute',
  inputSchema: z.object({ decision: decisionSchema, final: proposalSchema }),
  outputSchema: z.object({ status: z.string(), refunded: z.boolean() }),
  async execute({ inputData, mastra }) {
    if (!inputData.decision.approved) {
      await mastra.getWorkflow('paymentApproval').getStep('gate').bail({
        message: `Rejected by ${inputData.decision.decidedBy}: ${inputData.decision.note ?? ''}`,
      })
      return { status: 'rejected', refunded: false }
    }
    const result = await issueRefund(inputData.final, inputData.decision.decidedBy)
    return { status: 'executed', refunded: result.ok }
  },
})

export const paymentApproval = createWorkflow({
  id: 'payment-approval',
  inputSchema: proposalSchema,
  outputSchema: z.object({ status: z.string(), refunded: z.boolean() }),
  steps: [proposeStep, gateStep, executeStep],
})
  .then(proposeStep)
  .then(gateStep)
  .then(executeStep)
  .commit()
```

A few things worth calling out:

- `suspend()` returns a value *only when the workflow is resumed* — on the first run it parks the workflow and returns control to the caller with a run id. On resume, `resume?.()` is populated.
- `bail()` lets the `execute` step record a rejection without pretending the money moved.
- The `edits` field lets a human *correct* the proposal (e.g., change the amount from $1,200 to $1,000) before it executes. That's a real control, not just yes/no.

---

## Step 2: The idempotent refund tool

The tool that actually moves money must be idempotent. We covered the principle in depth [here](/insights/idempotency-keys-payment-agents); the short version is that every mutating call carries a client-generated key tied to the *business decision*, not the HTTP request, and repeats return the cached response instead of re-executing.

```typescript
// src/mastra/tools/issueRefund.ts
import { createTool } from '@mastra/core/tools'
import { z } from 'zod'
import { db } from '../lib/db'

export const issueRefund = createTool({
  id: 'issueRefund',
  description: 'Issue a refund for an order. Idempotent per orderId+amount decision.',
  inputSchema: z.object({
    orderId: z.string(),
    amount: z.number(),
    currency: z.string(),
    approvedBy: z.string(),
  }),
  outputSchema: z.object({ ok: z.boolean(), refundId: z.string().optional() }),
  async execute({ context }) {
    const idempotencyKey = `refund:${context.orderId}:${context.amount}:${context.approvedBy}`

    const existing = await db.idempotencyKeys.findUnique({ where: { key: idempotencyKey } })
    if (existing) return { ok: true, refundId: existing.response.refundId }

    const refund = await paymentsProvider.refund({
      orderId: context.orderId,
      amount: context.amount,
      currency: context.currency,
    })

    await db.idempotencyKeys.create({
      data: { key: idempotencyKey, response: { refundId: refund.id }, createdAt: new Date() },
    })

    return { ok: true, refundId: refund.id }
  },
})
```

Note the key includes `approvedBy`. That means "approve $1,200 as Alice" and "approve $1,200 as Bob" are distinct decisions — which is correct, because the audit trail cares about *who* approved. If the same human re-approves the same amount, the second call is a safe no-op.

---

## Step 3: The finance agent

The agent's only job in this flow is to *propose*. It must never call `issueRefund` itself. We give it read-only tools (look up the order, read the ledger) and withhold the mutating tool entirely — the workflow, not the agent, owns execution.

```typescript
// src/mastra/agents/financeAgent.ts
import { Agent } from '@mastra/core/agent'
import { openrouter } from '@openrouter/ai-sdk-provider'
import { lookupOrder, readLedger } from '../tools/readonly'

export const financeAgent = new Agent({
  name: 'financeAgent',
  instructions: `You are a payments dispute analyst. Given a refund request, decide whether it is reasonable.
You may read order and ledger data. You may NEVER issue refunds yourself — only recommend them.
Return a clear recommendation with amount, currency, and reason.`,
  model: openrouter('anthropic/claude-opus-4.1'),
  tools: { lookupOrder, readLedger },
})
```

Keeping the mutating tool out of the agent's hands is the single most important safety decision in this whole design. The agent reasons; the workflow gates; the human decides; the tool executes. Each concern is isolated.

---

## Step 4: The human review surface

When the workflow suspends, the caller gets a `runId`. We hand that to a human via whatever channel fits — Slack, email, a dashboard. The human's decision comes back through an API route that resumes the run.

```typescript
// src/app/api/finance/decisions/route.ts
import { mastra } from '@/mastra'
import { z } from 'zod'

const DecisionSchema = z.object({
  runId: z.string(),
  approved: z.boolean(),
  decidedBy: z.string(),
  edits: z
    .object({ amount: z.number(), currency: z.string() })
    .partial()
    .optional(),
  note: z.string().optional(),
})

export async function POST(req: Request) {
  const body = DecisionSchema.parse(await req.json())
  const run = await mastra.getWorkflow('paymentApproval').resumeRun(body.runId, {
    triggerData: {}, // proposal already persisted in the suspended step
    resumeData: {
      approved: body.approved,
      decidedBy: body.decidedBy,
      edits: body.edits,
      note: body.note,
    },
  })

  await writeAuditLog({
    runId: body.runId,
    decidedBy: body.decidedBy,
    approved: body.approved,
    shown: await getSuspendedPayload(body.runId),
    note: body.note,
  })

  return Response.json({ resumed: true, runId: body.runId })
}
```

Two things to notice. First, the audit log is written *at the moment of decision*, capturing not just what the human chose but **what they were shown** — the suspended payload. In a dispute or an audit, "here is exactly the screen they saw" is worth more than any after-the-fact reconstruction. Second, the resume doesn't re-send the proposal; it was persisted when the workflow suspended, so the only new data is the human's decision.

---

## Step 5: Execute or bail

Back in the `executeStep`, if `approved` is true we call the idempotent tool; if false we `bail()`. Either way the workflow terminates cleanly and the run record (in Postgres) reflects the outcome. The caller polling the run sees `status: 'executed'` or `status: 'rejected'`.

The bail path matters because a rejected financial action is *not an error* — it's a valid business outcome. Treating rejection as a thrown exception leads to retry storms and confused logs. Bail it, log it, move on.

---

## Step 6: The audit log

The audit table is deliberately boring and immutable. No updates, only inserts.

```sql
-- migrations/audit_log.sql
CREATE TABLE audit_log (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  run_id        text NOT NULL,
  decided_by    text NOT NULL,
  approved      boolean NOT NULL,
  shown_payload jsonb NOT NULL,   -- exactly what the human saw
  decision      jsonb NOT NULL,   -- exactly what they chose
  note          text,
  created_at    timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_audit_run ON audit_log(run_id);
CREATE INDEX idx_audit_decided ON audit_log(decided_by);
```

This table is your compliance artifact. Export it for SOC 2, for a chargeback dispute, for a post-incident review. Because the gate is the *only* path to execution, every money move has a corresponding row.

---

## Step 7: A test harness

A control you can't test is a control you don't have. Here's a harness that exercises three paths: approval, rejection, and edit.

```typescript
// src/mastra/workflows/paymentApproval.test.ts
import { mastra } from '@/mastra'

async function runScenario(label: string, decision: any) {
  const run = await mastra.getWorkflow('paymentApproval').createRun()
  await run.start({ inputData: { orderId: '1182', amount: 1200, currency: 'USD', reason: 'duplicate charge' } })

  // workflow is now suspended; resume with the human decision
  const resumed = await mastra.getWorkflow('paymentApproval').resumeRun(run.runId, {
    triggerData: {},
    resumeData: decision,
  })
  console.log(label, await resumed.getResult())
}

await runScenario('APPROVE', { approved: true, decidedBy: 'alice@acme.co' })
await runScenario('REJECT', { approved: false, decidedBy: 'bob@acme.co', note: 'order not found' })
await runScenario('EDIT', { approved: true, decidedBy: 'carol@acme.co', edits: { amount: 1000 } })
```

If you can run all three and see `executed` / `rejected` / `executed-with-edited-amount` with matching audit rows, the gate works. If any path double-executes, your idempotency key is wrong — go fix Step 2 before you ship.

---

## Production hardening

The pattern above is correct but not yet production-grade. Four additions I always make:

1. **SLA on review time.** A parked payout is a liability. Set a timeout (via a Trigger.dev or Inngest timer — see the [tools list](/insights/12-tools-ai-agent-development-2026)) that auto-escalates to a fallback approver after, say, four business hours.
2. **Fallback approvers.** If Alice is on leave, the decision routes to Bob, then to a group inbox. Never let a single human being a hard dependency for a time-sensitive payout.
3. **Compliance export.** Stream audit rows to your SIEM. The audit table is the source of truth; the SIEM is the watchtower.
4. **Observability.** Wrap every step with tracing (Langfuse, per the [observability post](/insights/observability-for-tool-calling-agents)) so you can replay exactly which model proposed what, which tools it read, and how long the human took.

And a cultural note: the threshold above which a human is required should be a *config value owned by the business*, not a magic number buried in code. Compliance changes it, not engineering.

---

## What this gives you

A financial agent that cannot move money without a human seeing the exact context and making a recorded decision. It's durable (restarts don't lose in-flight approvals), idempotent (no double refunds), and auditable (every decision is logged with what was shown). The agent got smarter, but more importantly, the *system* got safer.

If your stack is PHP rather than TypeScript, the same control exists in the Laravel AI SDK — I cover it in the [tool review](/insights/laravel-ai-sdk-six-months-production), and the mental model transfers directly: propose, gate, decide, execute, audit.

The takeaway is not "use Mastra." It's that human-in-the-loop is a *workflow property*, not a model property. Put the gate in the workflow, keep the mutating tool out of the agent, persist the intent before you suspend, and log the decision with what was shown. Do that, and your agent can be both autonomous and safe — which is the only kind worth deploying.
