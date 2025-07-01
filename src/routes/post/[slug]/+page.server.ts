import type { PageLoad } from './$types'
import { compile } from 'mdsvex'
import { getPost, parseCompiled } from '$lib'
import { rehype } from 'rehype'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'

export const load: PageLoad = async ({ params }: { params: { slug: string } }) => {
  const post = await getPost(params.slug)
  const compiled = await compile(post.body)
  const code = compiled ? parseCompiled(compiled?.code) : ''

  let processedHtml = ''

  if (compiled?.code) {
    const file = await rehype().use(rehypeSlug).use(rehypeAutolinkHeadings).process(code)

    processedHtml = String(file)
  }

  return { post, code: processedHtml }
}
