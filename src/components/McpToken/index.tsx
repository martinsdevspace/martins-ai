'use client'
import React, { useState } from 'react'

type TokenData = {
  email?: string
  error?: string
  expiresAt?: string
  token?: string
}

const McpToken: React.FC = () => {
  const [token, setToken] = useState('')
  const [expiresAt, setExpiresAt] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState('')

  const generate = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/mcp-token', { method: 'POST' })
      const data: TokenData = await res.json()
      if (!res.ok) {
        throw new Error(data.error || 'Failed to generate token.')
      }
      setToken(data.token || '')
      setExpiresAt(data.expiresAt || '')
      setEmail(data.email || '')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate token.')
      setToken('')
    } finally {
      setLoading(false)
    }
  }

  const copy = async () => {
    if (!token) return
    try {
      await navigator.clipboard.writeText(token)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setError('Copy failed — select and copy the token manually.')
    }
  }

  return (
    <div
      style={{
        border: '1px solid var(--theme-elevation-150)',
        borderRadius: '4px',
        marginBottom: '1rem',
        padding: '1rem',
      }}
    >
      <p style={{ margin: '0 0 0.5rem' }}>
        <b>MCP Access Token</b>
        {' — used to authenticate MCP clients (e.g. opencode) against /api/mcp.'}
      </p>

      {token ? (
        <>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'stretch' }}>
            <textarea
              readOnly
              rows={4}
              value={token}
              onFocus={(e) => e.target.select()}
              style={{
                flex: '1',
                fontFamily: 'monospace',
                fontSize: '0.8rem',
                lineHeight: '1.4',
                resize: 'vertical',
                width: '100%',
              }}
            />
          </div>
          {email && (
            <p style={{ margin: '0.5rem 0 0', fontSize: '0.85rem' }}>
              <b>User:</b> {email}
            </p>
          )}
          {expiresAt && (
            <p style={{ margin: '0.25rem 0 0', fontSize: '0.85rem' }}>
              <b>Expires:</b> {new Date(expiresAt).toLocaleString()}
            </p>
          )}
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem' }}>
            <button
              type="button"
              onClick={copy}
              style={{
                background: 'var(--theme-elevation-100)',
                border: '1px solid var(--theme-elevation-150)',
                borderRadius: '4px',
                cursor: 'pointer',
                padding: '0.5rem 0.75rem',
              }}
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
            <button
              type="button"
              onClick={generate}
              disabled={loading}
              style={{
                background: 'var(--theme-elevation-100)',
                border: '1px solid var(--theme-elevation-150)',
                borderRadius: '4px',
                cursor: 'pointer',
                padding: '0.5rem 0.75rem',
              }}
            >
              {loading ? 'Generating…' : 'Regenerate'}
            </button>
          </div>
        </>
      ) : (
        <button
          type="button"
          onClick={generate}
          disabled={loading}
          style={{
            background: 'var(--theme-elevation-100)',
            border: '1px solid var(--theme-elevation-150)',
            borderRadius: '4px',
            cursor: 'pointer',
            padding: '0.5rem 0.75rem',
          }}
        >
          {loading ? 'Generating…' : 'Generate token'}
        </button>
      )}

      {error && <p style={{ color: 'var(--theme-error-500)', marginTop: '0.5rem' }}>{error}</p>}
    </div>
  )
}

export default McpToken