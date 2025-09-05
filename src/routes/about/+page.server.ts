import type { PageLoad } from './$types'
import { getWorks } from '$lib'

export const load: PageLoad = async () => {
  return { works: await getWorks(0, 10) }
}