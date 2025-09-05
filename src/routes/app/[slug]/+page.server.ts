import type { PageLoad } from './$types'
import { getMobileApp } from '$lib'

export const load: PageLoad = async ({ params }: { params: { slug: string } }) => {
  return { slug: params.slug, app: await getMobileApp(params.slug) }
}
