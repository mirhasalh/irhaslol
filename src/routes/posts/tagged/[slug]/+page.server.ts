import type { PageLoad } from './$types'
import { getTagged } from '$lib'

export const load: PageLoad = async ({ params }: { params: { slug: string } }) => {
  return { posts: await getTagged(params.slug), slug: params.slug }
}
