import { getCollectionSitemap } from '../getCollectionSitemap'

export async function GET() {
  return getCollectionSitemap('projects', 'projects-sitemap')
}