import type { PageServerLoad } from './$types'
import { getPosts, getMobileApps } from '$lib'

export const prerender = true

export const load: PageServerLoad = async () => {
  return { posts: await getPosts(0, 5), apps: await getMobileApps(0, 5) }
}
