import type { Metadata } from 'next'
import { RenderAboutBlocks } from '@/blocks/About/RenderAboutBlocks'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'

export default async function AboutPage() {
  const about = await getCachedGlobal('about', 2)()

  return (
    <article className="px-5 py-24 lg:px-[6vw]">
      <div className="max-w-7xl">
        {/* <PageHero
          label={about.heroLabel || ''}
          title={about.heroTitle || ''}
          intro={about.heroIntro || ''}
          breadcrumbLabel="About"
        /> */}
        <RenderAboutBlocks blocks={about.layout} />
      </div>
    </article>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const about = await getCachedGlobal('about', 1)()

  const heroText = about.layout?.find((block) => block.blockType === 'aboutHero') as
    | { headline?: string }
    | undefined

  const title = heroText?.headline || 'About — Martins Michael'
  const description = 'The builder behind the build — background, philosophy, and the stack.'

  return {
    title,
    description,
    openGraph: mergeOpenGraph({
      title,
      description,
      siteName: 'Martins Michael',
    }),
  }
}
