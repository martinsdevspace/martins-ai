'use client'
import { IconCopy } from '@tabler/icons-react'
import { useState } from 'react'

export function CopyButton({ code }: { code: string }) {
  const [text, setText] = useState('Copy')

  function updateCopyStatus() {
    if (text === 'Copy') {
      setText(() => 'Copied!')
      setTimeout(() => {
        setText(() => 'Copy')
      }, 1000)
    }
  }

  return (
    <button
      onClick={async () => {
        await navigator.clipboard.writeText(code)
        updateCopyStatus()
      }}
      aria-label="Copy code"
      className="flex items-center gap-1 rounded px-2 py-1 font-mono text-[11px] text-white/60 transition-colors hover:bg-white/10 hover:text-white"
    >
      {text}
      <IconCopy className="h-3.5 w-3.5" />
    </button>
  )
}
