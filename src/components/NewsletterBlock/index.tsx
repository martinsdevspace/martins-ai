'use client'

import { IconArrowRight, IconCheck } from '@tabler/icons-react'
import React, { useState } from 'react'

import { getClientSideURL } from '@/utilities/getURL'

interface NewsletterBlockProps {
  formId: string | number
  className?: string
  /** Compact renders as a single inline row (for footers/sidebars); default renders the full section with heading + copy. */
  variant?: 'section' | 'compact'
}

export function NewsletterBlock({ formId, className, variant = 'section' }: NewsletterBlockProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'submitted' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || status === 'loading') return
    setStatus('loading')

    try {
      const res = await fetch(`${getClientSideURL()}/api/form-submissions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          form: formId,
          submissionData: [{ field: 'email', value: email }],
        }),
      })

      if (!res.ok) throw new Error('Submission failed')

      setStatus('submitted')
      setEmail('')
      setTimeout(() => setStatus('idle'), 4000)
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 4000)
    }
  }

  const form = (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-3 sm:flex-row">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        aria-label="Email address"
        className="flex-1 border border-border bg-background px-4 py-3 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-synthesis focus:outline-none"
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="inline-flex items-center justify-center gap-2 whitespace-nowrap bg-foreground px-5 py-3 font-mono text-sm uppercase tracking-wider text-background transition-colors hover:bg-synthesis disabled:opacity-60"
      >
        {status === 'loading' ? 'Subscribing…' : 'Subscribe'}
        <IconArrowRight className="h-4 w-4" />
      </button>
    </form>
  )

  const feedback =
    status === 'submitted' ? (
      <div className="flex items-center gap-2 text-synthesis">
        <IconCheck className="h-5 w-5" />
        <span className="font-mono text-sm">SUBSCRIBED — check your inbox to confirm.</span>
      </div>
    ) : status === 'error' ? (
      <p className="font-mono text-sm text-red-600">Something went wrong — try again in a moment.</p>
    ) : null

  if (variant === 'compact') {
    return (
      <div className={className}>
        {feedback || form}
      </div>
    )
  }

  return (
    <section className={`border-t border-border px-5 pt-16 lg:px-[6vw] lg:pt-24 ${className || ''}`}>
      <div className="max-w-2xl">
        <div className="mb-4 font-mono-label text-muted-foreground">// NEWSLETTER</div>
        <h2 className="mb-4 font-heading text-3xl font-light leading-tight text-foreground lg:text-4xl">
          Get weekly engineering insights.
        </h2>
        <p className="mb-8 text-base leading-relaxed text-muted-foreground lg:text-lg">
          Practical notes on AI agents, payments architecture, and shipping production code. No spam.
          One email per week. Unsubscribe anytime.
        </p>
        {feedback || <div className="max-w-md">{form}</div>}
      </div>
    </section>
  )
}
