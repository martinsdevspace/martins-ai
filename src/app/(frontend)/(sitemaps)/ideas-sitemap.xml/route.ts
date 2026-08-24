import { getCollectionSitemap } from '../getCollectionSitemap'

export async function GET() {
  return getCollectionSitemap('ideas', 'ideas-sitemap')
}