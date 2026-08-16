import { getCollectionSitemap } from '../getCollectionSitemap'

export async function GET() {
  return getCollectionSitemap('case-studies', 'case-studies-sitemap')
}