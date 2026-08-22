import {
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

/**
 * Shared Lexical editor config for long-form rich text in globals/blocks.
 * Mirrors the editing experience used across the About, Resume, Uses and Now
 * globals so the authoring UX stays consistent.
 */
export const longFormLexical = lexicalEditor({
  features: ({ rootFeatures }) => {
    return [
      ...rootFeatures,
      HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
      FixedToolbarFeature(),
      InlineToolbarFeature(),
      HorizontalRuleFeature(),
    ]
  },
})
