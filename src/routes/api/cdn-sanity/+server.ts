import { error } from '@sveltejs/kit'
import type { RequestHandler } from './$types'

export const GET: RequestHandler = async ({ url }) => {
  const targetUrl = url.searchParams.get('url')

  if (!targetUrl || !targetUrl.startsWith('https://cdn.sanity.io/')) {
    throw error(400, 'Invalid or missing Sanity CDN URL')
  }

  try {
    const res = await fetch(targetUrl)

    if (!res.ok) {
      throw error(502, 'Failed to fetch image from Sanity')
    }

    const contentType = res.headers.get('content-type') ?? 'image/jpeg'
    const buffer = await res.arrayBuffer()

    return new Response(buffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000'
      }
    })
  } catch (err) {
    console.error('Proxy error:', err)
    throw error(500, 'Internal Server Error')
  }
}
