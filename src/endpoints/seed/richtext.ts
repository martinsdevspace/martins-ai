type LexText = {
  type: 'text'
  detail: number
  format: number
  mode: 'normal'
  style: string
  text: string
  version: number
}

export type LexNode = {
  type: string
  version: number
  direction: string
  format: string
  indent: number
  children?: (LexNode | LexText)[]
  [key: string]: unknown
}

const text = (value: string): LexText => ({
  type: 'text',
  detail: 0,
  format: 0,
  mode: 'normal',
  style: '',
  text: value,
  version: 1,
})

export const para = (value: string): LexNode => ({
  type: 'paragraph',
  version: 1,
  textFormat: 0,
  textStyle: '',
  indent: 0,
  direction: 'ltr',
  format: '',
  children: [text(value)],
})

export const heading = (value: string, tag: 'h1' | 'h2' | 'h3' | 'h4' = 'h2'): LexNode => ({
  type: 'heading',
  version: 1,
  tag,
  direction: 'ltr',
  format: '',
  indent: 0,
  children: [text(value)],
})

export const listItem = (value: string): LexNode => ({
  type: 'listitem',
  version: 1,
  value: 1,
  direction: 'ltr',
  format: '',
  indent: 0,
  children: [text(value)],
})

export const list = (items: string[], listType: 'bullet' | 'number' = 'bullet'): LexNode => ({
  type: 'list',
  version: 1,
  listType,
  tag: listType === 'bullet' ? 'ul' : 'ol',
  start: 1,
  direction: 'ltr',
  format: '',
  indent: 0,
  children: items.map(listItem),
})

export const lexical = (...children: LexNode[]): any => ({
  root: {
    type: 'root',
    version: 1,
    indent: 0,
    direction: 'ltr',
    format: '',
    children,
  },
})
