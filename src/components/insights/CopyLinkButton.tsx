'use client'

import { IconCheck, IconLink } from '@tabler/icons-react'
import React, { useState } from 'react'

export function CopyLinkButton() {
  const [copied, setCopied] = useState(false)

  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard API can fail (permissions, insecure context) — fail
      // silently rather than showing an error for a non-critical action.
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="inline-flex items-center gap-2 font-mono-label text-muted-foreground transition-colors hover:text-synthesis"
    >
      {copied ? <IconCheck className="h-4 w-4" /> : <IconLink className="h-4 w-4" />}
      {copied ? 'Copied' : 'Copy link'}
    </button>
  )
}
