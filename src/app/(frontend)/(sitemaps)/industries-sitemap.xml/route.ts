import { getCollectionSitemap } from '../getCollectionSitemap'

export async function GET() {
  return getCollectionSitemap('industries', 'industries-sitemap')
}