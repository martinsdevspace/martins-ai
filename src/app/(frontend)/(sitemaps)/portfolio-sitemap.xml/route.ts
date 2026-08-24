import { getCollectionSitemap } from '../getCollectionSitemap'

export async function GET() {
  return getCollectionSitemap('portfolio', 'portfolio-sitemap')
}