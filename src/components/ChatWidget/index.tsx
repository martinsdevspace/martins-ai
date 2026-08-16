'use client'

import { useEffect, useRef, useState } from 'react'
import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport, type UIMessage } from 'ai'
import { track } from '@vercel/analytics'
import {
  IconMessageCircle,
  IconX,
  IconSend,
  IconAlertTriangle,
  IconTrash,
} from '@tabler/icons-react'

const STORAGE_KEY = 'martinsai-chat-v1'
const MAX_STORED_MESSAGES = 40

function loadMessages(): UIMessage[] | undefined {
  if (typeof window === 'undefined') return undefined
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return undefined
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? (parsed as UIMessage[]) : undefined
  } catch {
    return undefined
  }
}

function saveMessages(messages: UIMessage[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-MAX_STORED_MESSAGES)))
  } catch {
    // Ignore: private browsing, quota, or storage unavailable.
  }
}

function clearStoredMessages() {
  try {
    window.localStorage.removeItem(STORAGE_KEY)
  } catch {
    // Ignore: nothing to clear if storage is unavailable.
  }
}

function trackEvent(name: string) {
  if (process.env.NODE_ENV === 'production') track(name)
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)
  const [initialMessages] = useState(loadMessages)

  const { messages, sendMessage, setMessages, status, error } = useChat({
    transport: new DefaultChatTransport({ api: '/api/chat' }),
    messages: initialMessages,
  })

  const streaming = status === 'submitted' || status === 'streaming'
  const hasError = status === 'error'

  useEffect(() => {
    if (!open) return
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, streaming, open])

  // Persist once a turn settles — avoids writing partial streaming chunks.
  useEffect(() => {
    if (status === 'submitted' || status === 'streaming') return
    saveMessages(messages)
  }, [messages, status])

  const toggleOpen = () => {
    const next = !open
    setOpen(next)
    trackEvent(next ? 'chat_widget_opened' : 'chat_widget_closed')
  }

  const send = () => {
    const text = input.trim()
    if (!text || streaming) return
    sendMessage({ text })
    trackEvent('chat_message_sent')
    setInput('')
  }

  const clearConversation = () => {
    setMessages([])
    clearStoredMessages()
    trackEvent('chat_conversation_cleared')
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-9998 flex flex-col items-end gap-3">
      {open && (
        <div className="flex h-[min(70vh,520px)] w-[min(90vw,360px)] flex-col border border-carbon bg-paper shadow-lg">
          <div className="flex items-center justify-between border-b border-concrete bg-carbon px-4 py-3 text-paper">
            <span className="font-mono-label">ASK_MARTINSAI</span>
            <div className="flex items-center gap-2">
              {messages.length > 0 && (
                <button onClick={clearConversation} aria-label="Clear conversation">
                  <IconTrash className="h-4 w-4" />
                </button>
              )}
              <button onClick={() => setOpen(false)} aria-label="Close chat">
                <IconX className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto p-4">
            {messages.length === 0 && (
              <p className="text-sm leading-relaxed text-carbon/60">
                Ask me about Martins&apos; projects, services, or industries.
              </p>
            )}
            {messages.map((message) => (
              <div key={message.id} className={message.role === 'user' ? 'text-right' : 'text-left'}>
                <div
                  className={`inline-block max-w-[85%] px-3 py-2 text-left text-sm leading-relaxed ${message.role === 'user' ? 'bg-carbon text-paper' : 'bg-concrete/40 text-carbon'
                    }`}
                >
                  {message.parts.map((part, i) => {
                    if (part.type === 'text') {
                      return <span key={i}>{part.text}</span>
                    }
                    if (part.type.startsWith('tool-')) {
                      return (
                        <span key={i} className="font-mono text-[11px] text-carbon/40">
                          looking that up…
                        </span>
                      )
                    }
                    return null
                  })}
                </div>
              </div>
            ))}
            {streaming && <p className="font-mono text-[11px] text-carbon/40">…</p>}
            {hasError && (
              <div className="flex items-start gap-2 border border-red-900/30 bg-red-900/10 px-3 py-2 text-sm text-red-800">
                <IconAlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                <span>
                  {error?.message?.trim() ||
                    "Something went wrong on my end. Try again, or reach out directly via the contact page."}
                </span>
              </div>
            )}
          </div>

          <div className="flex items-end gap-2 border-t border-concrete p-3">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask a question…"
              rows={1}
              className="max-h-24 flex-1 resize-none bg-transparent font-mono text-sm focus:outline-none"
            />
            <button
              onClick={send}
              disabled={streaming || !input.trim()}
              aria-label="Send message"
              className="text-carbon transition-colors hover:text-synthesis disabled:opacity-30"
            >
              <IconSend className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      <button
        onClick={toggleOpen}
        aria-label={open ? 'Close chat' : 'Open chat'}
        className="flex h-12 w-12 items-center justify-center bg-carbon text-paper shadow-lg transition-colors hover:bg-synthesis"
      >
        {open ? <IconX className="h-5 w-5" /> : <IconMessageCircle className="h-5 w-5" />}
      </button>
    </div>
  )
}
