'use client'

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

import { cn } from '@/utilities/ui'

export type CommentFormProps = {
  insightId: number | string
}

const fieldBase =
  'w-full border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-synthesis focus:outline-none'

export const CommentForm: React.FC<CommentFormProps> = ({ insightId }) => {
  const router = useRouter()
  const [author, setAuthor] = useState('')
  const [email, setEmail] = useState('')
  const [content, setContent] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus('submitting')
    setMessage('')

    try {
      // Submits to the Payload `comments` collection REST endpoint
      // (the anonymous `create` access on the collection allows public posts).
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ insight: insightId, author, email, content }),
      })

      if (!response.ok) {
        const data = (await response.json().catch(() => ({}))) as {
          errors?: { message: string }[]
          message?: string
        }
        const firstError = data.errors?.[0]?.message
        throw new Error(firstError || data.message || 'Something went wrong. Please try again.')
      }

      setStatus('success')
      setMessage('Thanks! Your comment is awaiting moderation and will appear once approved.')
      setAuthor('')
      setEmail('')
      setContent('')
      router.refresh()
    } catch (error) {
      setStatus('error')
      setMessage(error instanceof Error ? error.message : 'Something went wrong. Please try again.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <input
          className={fieldBase}
          placeholder="Your name"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
          maxLength={120}
        />
        <input
          className={fieldBase}
          type="email"
          placeholder="Your email (not published)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          maxLength={160}
        />
      </div>
      <textarea
        className={cn(fieldBase, 'min-h-28 resize-y')}
        placeholder="Share your thoughts…"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
        maxLength={2000}
      />

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="border border-synthesis bg-synthesis/10 px-5 py-2.5 font-mono-label text-synthesis transition-colors hover:bg-synthesis hover:text-background disabled:opacity-50"
        >
          {status === 'submitting' ? 'POSTING…' : 'POST_COMMENT'}
        </button>
        {status === 'success' ? (
          <span className="font-mono-label text-synthesis">{message}</span>
        ) : null}
        {status === 'error' ? (
          <span className="font-mono-label text-error">{message}</span>
        ) : null}
      </div>
    </form>
  )
}
