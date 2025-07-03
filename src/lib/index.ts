import { PUBLIC_CMS } from '$env/static/public'
import { error } from '@sveltejs/kit'

export const website = 'https://irhas.lol',
  email = 'irhasm@outlook.com'

export const gitHubAccounts = [
  {
    id: 0,
    username: 'b3nggo',
    profile: 'https://github.com/b3nggo',
    avatar: 'https://github.com/b3nggo.png'
  },
  {
    id: 1,
    username: 'mirhas',
    profile: 'https://gitlab.com/mirhas',
    avatar: 'https://gitlab.com/uploads/-/system/user/avatar/12060869/avatar.png'
  },
  {
    id: 2,
    username: 'irhasalh',
    profile: 'https://github.com/irhasalh',
    avatar: 'https://github.com/irhasalh.png'
  },
  {
    id: 3,
    username: 'mirhasalh',
    profile: 'https://github.com/mirhasalh',
    avatar: 'https://github.com/mirhasalh.png'
  }
]

export const getEnvVar = (data: string) => {
  try {
    JSON.parse(data)
  } catch (e) {
    return data
  }
  return JSON.parse(data)
}

export const findAllByKey = (obj: Record<string, any>, keyToFind: string): any[] => {
  return Object.entries(obj).reduce((acc: any[], [key, value]) => {
    if (key === keyToFind) {
      return acc.concat(value);
    } else if (typeof value === 'object' && value !== null) {
      return acc.concat(findAllByKey(value, keyToFind))
    }
    return acc
  }, [])
}

const publicEnv = getEnvVar(PUBLIC_CMS)
const base = publicEnv.endpoint

interface SendOptions {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  path: string
  data?: unknown
  token?: string
}

async function send({ method, path, data, token }: SendOptions): Promise<any> {
  const opts: RequestInit = { method, headers: {} }

  if (data) {
    (opts.headers as Record<string, string>)['Content-Type'] = 'application/json'
    opts.body = JSON.stringify(data)
  }

  if (token) {
    (opts.headers as Record<string, string>)['Authorization'] = `Bearer ${token}`
  }

  const res = await fetch(`${base}${path}`, opts)
  const text = await res.text()

  if (res.ok) {
    return text ? JSON.parse(text) : {}
  }

  const errorMessage = text
    ? (findAllByKey(JSON.parse(text), 'cause')[0] || findAllByKey(JSON.parse(text), 'message')[0])
    : ''
  throw error(res.status, errorMessage)
}

export function get(path: string, token?: string): Promise<any> {
  return send({ method: 'GET', path, token })
}

export function del(path: string, token?: string): Promise<any> {
  return send({ method: 'DELETE', path, token })
}

export function post(path: string, data?: unknown, token?: string): Promise<any> {
  return send({ method: 'POST', path, data, token })
}

export function patch(path: string, data?: unknown, token?: string): Promise<any> {
  return send({ method: 'PATCH', path, data, token })
}

export function put(path: string, data?: unknown, token?: string): Promise<any> {
  return send({ method: 'PUT', path, data, token })
}

// Paths
const posts = publicEnv.posts,
  postsQuery = publicEnv.postsQuery,
  aPost = publicEnv.post,
  tagged = publicEnv.tagged,
  taggedQuery = publicEnv.taggedQuery

export const getPosts = async (from: number, to: number) => {
  const res = await get(`${posts}${from}...${to}${postsQuery}`)
  const sorted = (res.result as App.Post[]).sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )
  return sorted
}

export const getPost = async (slug: string) => {
  const param = `slug=%22${slug}%22&perspective=drafts`
  const res = await get(aPost + param)
  return (res.result as App.Post[])[0]
}

export const getTagged = async (tag: string, from = 0, to = 5): Promise<App.Post[]> => {
  const param = `tagged=%22${tag}%22&perspective=drafts`
  const res = await get(`${tagged}${from}...${to}${taggedQuery}${param}`)
  const sorted = (res.result as App.Post[]).sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )
  return sorted
}

// A ugly workaround to remove unused `@html`
export const parseCompiled = (code: string): string => {
  return code.replace(/>{@html `<code class="language-/g, '><code class="language-')
    .replace(/<\/code>`}<\/pre>/g, '</code></pre>')
}

export const formatDate = (input: string): string => {
  const date = new Date(input);
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Intl.DateTimeFormat('en-US', options).format(date);
}

export const formatSlug = (str: string) => {
  return str[0].toLocaleUpperCase() + str.replaceAll('-', ' ').substring(1)
}

export const sites = [
  {
    name: 'Flutter web',
    url: 'https://flutter.irhas.lol/'
  },
  {
    name: 'Outter HTML formatter',
    url: 'https://ohf.irhas.lol/'
  }
]

export const socials = [
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/irhas03'
  },
  {
    name: 'GitHub',
    url: 'https://github.com/mirhasalh/irhaslol'
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/irhasdev/'
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/irhasdev/'
  }
]

export const recentWork = [
  {
    id: 0,
    year: 2024,
    imgUrl: `${website}/IMG_20250108-174556.webp`,
    urls: ['https://play.google.com/store/apps/details?id=com.dafturn.mypertamina&hl=en'],
    title: 'MyPertamina x UCOllect microsite UI/UX design (Associated with Senja Solutions)',
    desc: 'Created the UCOllect microsite using Figma, ensuring a seamless design that integrates cohesively with the MyPertamina app to provide a unified user experience.'
  },
  {
    id: 1,
    year: 2024,
    imgUrl: `${website}/IMG_20250108-174004.webp`,
    urls: ['https://demo.photobook.ai/'],
    title: 'Photobook AI demo website (Associated with Senja Solutions)',
    desc: 'Designed and developed a demo website for a SaaS product using the Svelte 5 JavaScript framework. Delivered the project successfully within an ambitious 4-day deadline 💪.'
  },
  {
    id: 2,
    year: 2024,
    imgUrl: `${website}/IMG_20250108-172909.webp`,
    urls: ['https://gomining.com/tokenomics'],
    title: 'GoMining landing page (Associated with Senja Solutions)',
    desc: 'Served as a supporting Frontend Engineer, utilizing the Nuxt.js framework to build and optimize the landing page for the multinational company GoMining.'
  },
  {
    id: 3,
    year: 2023,
    imgUrl: `${website}/IMG_20250108-173808.webp`,
    urls: ['https://demo.photobook.ai/'],
    title: 'AI-Powered photo book editor (Associated with Senja Solutions)',
    desc: 'Worked as a Frontend Engineer at Photobook.ai in Singapore, specializing in building seamless user experiences with Svelte. Responsibilities included creating and maintaining frontend components, collaborating with cross-functional teams, and enhancing web applications.'
  },
  {
    id: 4,
    year: 2023,
    imgUrl: `${website}/IMG_20230521-195115.webp`,
    urls: ['https://apps.apple.com/id/app/ucollect-by-noovoleum/id6462969708', 'https://play.google.com/store/apps/details?id=com.noovoleum.ucollect&hl=en'],
    title: 'UCOllect app by noovoleum (Associated with Senja Solutions)',
    desc: 'As the pioneering engineer on the team, I initiated the design and executed the front-end development using the Flutter framework for iOS and Android, successfully achieving over 10,000 downloads and maintaining a 4-star rating.'
  }
]

export const apps = [
  {
    id: 0,
    year: '2025',
    urls: [
      {
        id: 0,
        title: 'Internal testing',
        code: 'internal-testing',
        url: '',
        show: false
      },
      {
        id: 1,
        title: 'Android',
        code: 'android',
        url: 'https://play.google.com/store/apps/details?id=lol.irhas&pli=1',
        show: true
      },
      {
        id: 2,
        title: 'iOS',
        code: 'ios',
        url: 'https://irhas.lol',
        show: false
      }
    ],
    production: true,
    name: 'Create invoice',
    icon: `${website}/IMG_20250212-231404.webp`,
    featureGraphic: `${website}/IMG_20250213-134303.webp`,
    shortDescription: 'Create an Invoice in Under 5 Seconds – Let’s Go!',
    description: 'A minimalist tool for generating PDF invoices with dynamic colors, company logo attachment, and zero cost.',
    privacy: {
      effectiveDate: '12 February 2025',
      declarations: [
        {
          id: 0,
          title: 'Introduction',
          subtitle: 'Thank you for using Create Invoice. Your privacy is important to us. This privacy policy explains how we handle your data.'
        },
        {
          id: 1,
          title: 'No data collection',
          subtitle: 'Create Invoice does not collect, store, or transmit any personal or sensitive data. All invoices you create remain on your device and are not shared with us or any third party.'
        },
        {
          id: 2,
          title: 'No internet access',
          subtitle: 'The app works entirely offline and does not require an internet connection. There are no online services, cloud storage, or remote servers involved.'
        },
        {
          id: 3,
          title: 'Permissions',
          subtitle: 'Create Invoice may request access to your device’s storage solely to save and manage invoices. We do not access, share, or collect any data from your device.'
        },
        {
          id: 4,
          title: 'Changes to this Policy',
          subtitle: 'We may update this privacy policy from time to time. Any changes will be reflected in this document.'
        },
        {
          id: 5,
          title: 'Contact',
          subtitle: 'If you have any questions about this privacy policy, you can contact us at irhasm@icloud.com.'
        }
      ]
    }
  }
]

export const getApp = (slug = '') => {
  return apps.find((v) => v.name.replace(' ', '-').toLowerCase() === slug)
}

export const techStacks = [
  { id: 0, title: 'Dart', },
  { id: 1, title: 'Flutter' },
  { id: 2, title: 'Figma' },
  { id: 3, title: 'Svelte' },
  { id: 4, title: 'Nuxt' },
  { id: 5, title: 'Go' },
  { id: 6, title: 'Next' },
  { id: 7, title: 'Swift' },
  { id: 8, title: 'Java' },
  { id: 9, title: 'Spring' },
  { id: 10, title: 'Rive' }
]
