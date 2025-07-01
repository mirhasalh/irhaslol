import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

const BADGE_URL = 'https://www.netlify.com/img/global/badges/netlify-color-bg.svg'

export const GET: RequestHandler = async () => {
  try {
    const res = await fetch(BADGE_URL)

    if (!res.ok) {
      throw error(502, 'Failed to fetch Netlify badge')
    }

    const contentType = res.headers.get('content-type') ?? 'image/svg+xml'
    const buffer = await res.arrayBuffer()

    return new Response(buffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=86400'
      }
    });
  } catch (err) {
    console.error('Netlify badge proxy error:', err)
    throw error(500, 'Internal Server Error')
  }
}
