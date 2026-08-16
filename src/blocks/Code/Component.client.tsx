'use client'
import { Highlight, themes } from 'prism-react-renderer'
import React from 'react'
import { CopyButton } from './CopyButton'

type Props = {
  code: string
  language?: string
  blockName?: string
}

const LANGUAGE_LABELS: Record<string, string> = {
  typescript: 'TypeScript',
  javascript: 'JavaScript',
  css: 'CSS',
  python: 'Python',
  sql: 'SQL',
}

function titleFor(blockName: string | undefined, language: string): string {
  if (blockName?.trim()) return blockName.trim()
  if (language) return LANGUAGE_LABELS[language] ?? language
  return 'Code'
}

export const Code: React.FC<Props> = ({ code, language = '', blockName }) => {
  if (!code) return null

  return (
    <Highlight code={code} language={language} theme={themes.vsDark}>
      {({ getLineProps, getTokenProps, tokens }) => (
        <div className="overflow-hidden rounded border border-border bg-black">
          <div className="flex items-center gap-2 border-b border-white/10 bg-[#1e1e1e] px-3 py-2">
            <span className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
              <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
              <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
            </span>
            <span className="ml-2 flex-1 truncate font-mono text-xs text-white/70">
              {titleFor(blockName, language)}
            </span>
            <CopyButton code={code} />
          </div>
          <pre className="overflow-x-auto p-4 text-xs leading-relaxed">
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ className: 'table-row', line })}>
                <span className="table-cell select-none pr-4 text-right text-white/25">{i + 1}</span>
                <span className="table-cell">
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </span>
              </div>
            ))}
          </pre>
        </div>
      )}
    </Highlight>
  )
}
