---
title: "Laravel AI SDK: Six Months Building Agentic Backends in PHP"
slug: "laravel-ai-sdk-six-months-production"
topic: "Backend"
categories: [tool-reviews, frameworks, php]
tags: [laravel, php, agents, tool-review, fintech, hitl, ai-sdk]
readTime: "14 min read"
publishedAt: "2026-08-22"
metaTitle: "Laravel AI SDK Review: Six Months Building Agentic Backends in PHP"
metaDescription: "A hands-on review of the Laravel AI SDK on Laravel 13 after six months in production: what works, what's painful, human-in-the-loop tool approval, and when to choose it."
heroImage: "<placeholder-media-id>"
relatedPosts: [human-in-the-loop-financial-agents, 12-tools-ai-agent-development-2026]
---

I went into this skeptical. "AI SDK" and "Laravel" in the same sentence usually means a thin wrapper around an HTTP client and a prayer. Six months and one production fintech deployment later, I've changed my mind — partially. The Laravel AI SDK (`laravel/ai`) is genuinely well-built for teams that already live in Laravel, and its human-in-the-loop tool-approval API (shipped in v0.10.0, July 21, 2026) is the feature that earned my respect. But it is not the framework I'd pick for a greenfield AI-only product, and I'll explain exactly why.

This review is grounded in real work: I built the agentic layer for a payments reconciliation service (call it BluuPay v3) on Laravel 13, PHP 8.3+. The team was Laravel-native, the ledger ran in PHP, and a Node rewrite was off the table. That context is the whole point — the SDK's value is proportional to how much you already trust Laravel.

---

## Context: why I evaluated it at all

The brief was simple to state and hard to do: "let a model help our ops team reconcile payouts, but never let it move money without a human clicking approve." If you've read the [Mastra human-in-the-loop tutorial](/insights/human-in-the-loop-financial-agents), that's the same control, translated to PHP.

Two paths were on the table: stand up a separate TypeScript service (more surface area, more ops burden, a second language for the team to own) or use the first-party Laravel AI SDK and keep everything in one framework. We chose the latter. Laravel 13, released March 17, 2026, requires PHP 8.3+, and ships the AI SDK as a first-party package — text generation, tool-calling agents, embeddings, audio, images, and vector stores, all with Eloquent-friendly interfaces.

---

## What works well

### Eloquent as agent memory

This is the killer feature for a Laravel team. Your models *are* the agent's context. No separate vector database to provision just to remember a customer — you query the same tables you already have.

```php
use App\Models\Payout;
use Laravel\Ai\Facades\Ai;

$recent = Payout::where('customer_id', $customerId)
    ->latest()
    ->take(10)
    ->get();

$response = Ai::chat()
    ->withContext($recent->toArray())
    ->ask("Should we refund this disputed payout?");
```

The mental model transfers: a relationship is a memory source, a scope is a filter, an accessor is a derived fact. Your existing ORM fluency becomes agent fluency.

### Queue jobs as durable tool execution

Laravel Queues are already durable, retryable, and observable. The AI SDK lets a tool be a queued job, which means a long-running or side-effecting action inherits all of that for free — retries with backoff, failed-job inspection, Horizon metrics.

```php
use Illuminate\Support\Facades\Queue;
use App\Jobs\IssueRefundJob;

// inside a tool handler
Queue::push(new IssueRefundJob($payoutId, $amount));
```

For a financial action, that's exactly the durability story you want, and you didn't write a line of orchestration code.

### Broadcasting for real-time agent status

When the agent is working, ops wants to *see* it. Laravel Broadcasting (with Reverb, now first-party) pushes agent state to the browser over WebSockets with the same auth model you already use for everything else.

```php
use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('agent.{runId}', fn ($user, $runId) => $user->can('view', Run::find($runId)));
```

No separate realtime service, no new auth boundary. This is the quiet superpower of staying in one framework.

### Policies as the agent's permission layer

The agent should not be able to do anything the current user can't. Laravel Policies express that, and you reuse them directly — the tool checks `Gate::allows('refund', $payout)` before it acts. The permission model your app already has becomes the agent's constraint. That's a compliance story you'd otherwise have to build from scratch.

### Human-in-the-loop tool approval (v0.10.0)

This is the feature that justified the whole exercise. Released July 21, 2026 (PR `laravel/ai#773`, announced at Laracon US 2026 in Boston), it lets a tool *require human approval* before it runs. The agent calls the tool, Laravel parks it, a human approves or rejects (or edits the arguments), and only then does execution proceed.

```php
use Laravel\Ai\Contracts\Approvable;
use Laravel\Ai\Concerns\InteractsWithApprovals;

class IssueRefund implements Approvable
{
    use InteractsWithApprovals;

    public function needsApproval(): bool
    {
        // anything over $1,000 waits for a human
        return $this->amount > 1000;
    }
}
```

When the agent invokes `IssueRefund` with a $5,000 amount, the SDK emits a `ToolApprovalRequested` event (streamed to the client as a `tool_approval_request` event), persists a pending approval, and halts. The human responds with a `Decisions` object:

```php
use Laravel\Ai\Support\Decisions;

$decision = Decisions::from([
    'tool_approval_request' => [
        'id' => $approvalId,
        'decision' => 'approve', // or 'reject'
        'arguments' => ['amount' => 5000], // optional edits
    ],
])->rejectRemaining(); // auto-reject anything not explicitly handled

Ai::chat()->withDecisions($decision)->continue();
```

If the human's supplied arguments don't match what the tool expected, you get an `ApprovalMismatchException` instead of a silent wrong action. That mismatch guard is the difference between "we built a gate" and "we built a gate with a hole in it."

---

## What's painful

I'm not going to soft-pedal this. The SDK is young and it shows.

### Docs assume Laravel fluency, not agent fluency

The documentation is excellent *if* you already think in Laravel. If your mental model is "agents, tools, memory" and you're learning Laravel to use this, the docs won't always meet you where you are. This used to bite me: the human-in-the-loop example originally assumed you knew to add the `RemembersConversations` trait and use the `Conversational` agent type, and the conversation-history prerequisite wasn't obvious from the tool-approval page. **This has since been fixed in the docs** — the HITL guide now spells out that persisted conversation history is what makes approvals coherent across turns.

```php
use Laravel\Ai\Concerns\RemembersConversations;
use Laravel\Ai\Agents\Conversational;

class FinanceAgent extends Conversational
{
    use RemembersConversations; // required for coherent HITL across turns
}
```

### Provider error messages are opaque

When something goes wrong at the provider layer, the exception you get is often a wrapped generic with the real cause several layers down. Debugging a malformed tool schema took longer than it should have because the error didn't point at the actual offending field. This is a maturity gap, not a design flaw, and I expect it to improve — but budget for it today.

### Streaming UX needs custom plumbing

The SDK streams tokens and `tool_approval_request` events, but turning that into a polished chat UI is on you. You'll wire Livewire or Inertia + Reverb and build the approval card yourself. Compare this to `assistant-ui` on the TypeScript side, which hands you generative UI with inline approvals out of the box. On Laravel you get the events; you build the experience.

### The eval/observability ecosystem is Node/Python-first

When I wanted to run an eval suite and trace agent calls, the mature tooling (Langfuse, Mastra's evals, Trigger.dev's observability) lives in the TypeScript/Python world. There's nothing stopping you from shipping traces to Langfuse from PHP, but you're writing the integration, not installing it. For a team that cares about agent quality measurement, that's a real cost.

---

## Comparison matrix

Picking an agent framework is picking a problem shape. Here's how I frame the four I know best:

| If your team is… | And the job is… | Reach for |
|---|---|---|
| Laravel-native, PHP ledger | Reconciliation, ops assist, in-framework agents | **Laravel AI SDK** |
| TypeScript, needs durable workflows + HITL | Financial agents, long-running automations | **Mastra** (see [tutorial](/insights/human-in-the-loop-financial-agents)) |
| Python, research-grade agents | Experimentation, RAG, langchain ecosystem | **LangGraph** |
| Greenfield, OpenAI-centric | Quick agents on one provider | **OpenAI Agents SDK** |

The trap is choosing by model quality. Models are commodities now — they're behind every one of these. Choose by *where your code and your team already live*, because that's where the durability, auth, and permission stories come from for free.

---

## Human-in-the-loop deep dive

For the BluuPay case, the approval flow looked like this end to end:

1. Ops asks the agent to "refund the disputed payout for customer #4471."
2. The agent calls `IssueRefund` with an amount above the approval threshold.
3. Because `needsApproval()` returns true, Laravel parks the call and fires `ToolApprovalRequested`.
4. The frontend (Livewire + Reverb) shows an approval card: customer, amount, reason, and the agent's stated justification.
5. Ops clicks Approve (or edits the amount, or rejects with a note).
6. The `Decisions` object resumes the run; the tool executes only on approve.
7. The queue job writes the refund; an audit row records who decided and what they saw.

That last step is the same audit discipline I described for Mastra — the control is a *workflow property*, and Laravel gives you the primitives (Queues, Policies, Broadcasting, Eloquent) to implement it without leaving the framework. The v0.10 HITL API is the glue that was missing in earlier versions.

One subtlety: approvals are **per-call, not per-step**. Each tool invocation that needs approval is gated independently; there's no "approve this whole plan" primitive yet. For our use case that's actually preferable — approve the refund, but still watch the ledger write separately. If you want plan-level approval, you build it on top.

---

## When to choose it

My decision framework, bluntly:

**Choose Laravel AI SDK when:**
- Your team is already productive in Laravel and PHP.
- The data and the money live in a Laravel app.
- You want agentic features *without* standing up a second language/runtime.
- Human-in-the-loop and policy-gated actions matter (fintech, internal ops tools).

**Do not choose it when:**
- You're building a greenfield, AI-first product with no existing Laravel investment.
- Your team has no PHP competence and no intention to acquire it.
- You need best-in-class eval/observability tooling *today* and can't staff the PHP integration.
- The agents are the product, not a feature of a PHP product.

---

## Verdict

I'm betting on the Laravel AI SDK for African fintech specifically, and here's the reasoning: a huge share of fintech in this region is built on Laravel, the talent pool is PHP-strong, and the regulatory posture favors systems where money movement is gated by the same framework that already handles auth, queues, and audits. For those teams, this SDK removes the temptation to bolt on a fragile Node service just to get "AI." That's a real win.

But I would not use it to start an AI-native startup from zero. The ecosystem gravity — evals, observability, agent frameworks, community examples — is in TypeScript and Python right now. If Laravel isn't already your home, don't move in just for this.

Net: a mature, opinionated, genuinely useful SDK that solves a real problem for the right team, with rough edges that will smooth out over the next two or three minor versions. The human-in-the-loop approval API alone makes it worth a serious look for any Laravel shop that touches money.

If you want the TypeScript equivalent of everything in this review, the [Mastra human-in-the-loop tutorial](/insights/human-in-the-loop-financial-agents) implements the same control with `suspend()` and `resume()` — read them side by side and you'll see the pattern is framework-agnostic. The gate belongs in the workflow, not the model.
