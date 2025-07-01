import { getPosts, website } from '$lib'

export const prerender = true

const posts = await getPosts(0, 100)
const websiteDescription = `Irhas's blog`
const postsUrl = `${website}/post`

export async function GET({ setHeaders }) {
  setHeaders({
    'Cache-Control': `max-age=0, s-max-age=600`,
    'Content-Type': 'application/xml'
  })

  const xml = `<rss xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
      <channel>
        <title>Irhas</title>
        <link>${website}</link>
        <description>${websiteDescription}</description>
        <atom:link href="${website}/rss.xml" rel="self" type="application/rss+xml" />
        ${posts
          .map(
            (post) =>
              `
              <item>
                <guid>${postsUrl}/${post.slug}</guid>
                <title>${post.title}</title>
                <description>${post.excerpt}</description>
                <link>${postsUrl}/${post.slug}</link>
                <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
            </item>
          `
          )
          .join('')}
      </channel>
    </rss>`

  return new Response(xml)
}
