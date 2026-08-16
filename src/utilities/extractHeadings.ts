import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

type UnknownNode = {
  type?: string
  tag?: unknown
  text?: unknown
  children?: unknown
}

export interface TocEntry {
  id: string
  level: number
  text: string
}

export function slugify(text: string): string {
  let normalized = text.toLowerCase()
  try {
    normalized = normalized.normalize('nfd').replace(/[\u0300-\u036f]/g, '')
  } catch {
    normalized = normalized.replace(/[^\u0000-\u007f]/g, '')
  }
  return normalized
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function collectText(node: unknown): string {
  if (!node || typeof node !== 'object') return ''
  const value = node as UnknownNode
  if (typeof value.text === 'string') return value.text
  if (Array.isArray(value.children)) {
    return value.children.map((child) => collectText(child)).join('')
  }
  return ''
}

function headingLevel(node: UnknownNode): number {
  const tag = typeof node.tag === 'string' ? node.tag : ''
  const parsed = Number.parseInt(tag.replace('h', ''), 10)
  return Number.isNaN(parsed) ? 2 : parsed
}

export function extractHeadings(data: SerializedEditorState): TocEntry[] {
  const headings: TocEntry[] = []
  const usedIds = new Set<string>()

  const walk = (node: unknown) => {
    if (!node || typeof node !== 'object') return
    const value = node as UnknownNode

    if (value.type === 'heading') {
      const text = collectText(node)
      if (!text) return
      let id = slugify(text)
      if (!id || usedIds.has(id)) {
        let i = 2
        const base = id
        while (usedIds.has(`${base}-${i}`)) i++
        id = base ? `${base}-${i}` : `heading-${i}`
      }
      usedIds.add(id)
      headings.push({ id, level: headingLevel(value), text })
      return
    }

    if (Array.isArray(value.children)) {
      for (const child of value.children) walk(child)
    }
  }

  const root = (data as { root?: unknown }).root
  if (root) walk(root)

  return headings
}
