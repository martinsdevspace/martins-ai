/**
 * Extends the existing `richtext.ts` seed helpers (para/heading/list/lexical)
 * with the additional block builders the Insights seed posts need — code
 * blocks, banner callouts, media blocks, and a bold-lead-in paragraph.
 * Reuses the existing helpers rather than duplicating text/para/heading/list.
 */
import { heading, lexical, list, para, type LexNode } from './richtext'

export { heading, list as bulletList, para as paragraph }

/**
 * `lexical()` in `richtext.ts` takes its children as rest params
 * (`...children: LexNode[]`), but every seed post in this folder calls
 * `buildRichText([...])` with a single array literal — passing one
 * `LexNode[]` argument where a rest parameter expects individual `LexNode`
 * elements. TypeScript should reject that call, and at runtime it nests the
 * array one level too deep (`root.children` ends up `[[...nodes]]` instead
 * of `[...nodes]`), which is why nothing rendered in either the frontend or
 * the admin's Lexical editor — the whole richText document was malformed.
 * Wrapping here (rather than editing every call site in every post file)
 * keeps the fix in one place and matches how the posts are actually written.
 */
export const buildRichText = (children: LexNode[]) => lexical(...children)

const text = (
  value: string,
  format = 0,
): { type: 'text'; detail: number; format: number; mode: 'normal'; style: string; text: string; version: number } => ({
  type: 'text',
  detail: 0,
  format,
  mode: 'normal',
  style: '',
  text: value,
  version: 1,
})

export const boldParagraph = (boldText: string, rest: string): LexNode => ({
  type: 'paragraph',
  version: 1,
  textFormat: 0,
  textStyle: '',
  indent: 0,
  direction: 'ltr',
  format: '',
  children: [text(boldText, 1), text(rest)],
})

export const codeBlock = (code: string, language: string, blockName = 'Example'): LexNode => ({
  type: 'block',
  version: 2,
  direction: 'ltr',
  format: '',
  indent: 0,
  fields: {
    id: randomId(),
    blockName,
    blockType: 'code',
    code,
    language,
  },
})

export const bannerBlock = (
  bodyText: string,
  style: 'info' | 'warning' | 'error' | 'success' = 'info',
  blockName = 'Note',
): LexNode => ({
  type: 'block',
  version: 2,
  direction: 'ltr',
  format: '',
  indent: 0,
  fields: {
    id: randomId(),
    blockName,
    blockType: 'banner',
    content: lexical(para(bodyText)),
    style,
  },
})

export const mediaBlock = (mediaId: string | number): LexNode => ({
  type: 'block',
  version: 2,
  direction: 'ltr',
  format: '',
  indent: 0,
  fields: {
    id: randomId(),
    blockName: '',
    blockType: 'mediaBlock',
    media: mediaId,
  },
})

function randomId(): string {
  return Math.random().toString(16).slice(2) + Date.now().toString(16)
}
