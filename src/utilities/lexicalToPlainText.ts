import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

type UnknownNode = {
  type?: string
  text?: unknown
  children?: unknown
}

function collectText(node: unknown): string {
  if (!node || typeof node !== 'object') return ''
  const value = node as UnknownNode
  if (typeof value.text === 'string') return value.text
  if (Array.isArray(value.children)) {
    const isBlockLevel = value.type === 'paragraph' || value.type === 'heading' || value.type === 'listitem'
    const joined = value.children.map((child) => collectText(child)).join('')
    return isBlockLevel ? `${joined} ` : joined
  }
  return ''
}

/**
 * Extracts plain text from a serialized Lexical document, collapsing
 * whitespace. Used to auto-generate SEO meta descriptions when an editor
 * hasn't written one manually.
 */
export function lexicalToPlainText(data: SerializedEditorState | null | undefined): string {
  if (!data) return ''
  const root = (data as { root?: unknown }).root
  if (!root) return ''
  return collectText(root).replace(/\s+/g, ' ').trim()
}

/**
 * Truncates plain text to a max length on a word boundary, appending an
 * ellipsis if truncated. Defaults to the ~155 characters search engines and
 * LLM answer engines typically display for a meta description.
 */
export function truncateForMeta(text: string, maxLength = 155): string {
  if (text.length <= maxLength) return text
  const truncated = text.slice(0, maxLength)
  const lastSpace = truncated.lastIndexOf(' ')
  return `${(lastSpace > 0 ? truncated.slice(0, lastSpace) : truncated).trim()}…`
}
