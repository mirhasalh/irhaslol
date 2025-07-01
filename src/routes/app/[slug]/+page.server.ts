import type { PageLoad } from './$types'
import { getApp } from '$lib'

export const load: PageLoad = async ({ params }: { params: { slug: string } }) => {
  const app = getApp(params.slug)
  return { slug: params.slug, app }
}
