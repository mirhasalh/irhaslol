<script lang="ts">
  import { browser } from '$app/environment'
  import { onMount } from 'svelte'
  import type { PageData } from './$types'
  import 'highlight.js/styles/atom-one-dark.css'
  import { formatDate, website, formatSlug } from '$lib'
  import { PostPageState } from './state.svelte'
  import Back from '$icons/tiny/Back.svelte'
  import Sanitized from '$components/Sanitized.svelte'
  import Home from '$icons/tiny/Home.svelte'
  import Facebook from '$icons/socials/Facebook.svelte'
  import Linkedin from '$icons/socials/Linkedin.svelte'
  import Telegram from '$icons/socials/Telegram.svelte'
  import WhatsApp from '$icons/socials/WhatsApp.svelte'
  import Twitter from '$icons/socials/Twitter.svelte'

  let { data }: { data: PageData } = $props(),
    pageState = new PostPageState(),
    parsedEl: HTMLElement,
    headings = $state<string[]>([])

  const keywords = [data.post.title, ...data.post.tags],
    f = `https://www.facebook.com/sharer/sharer.php?u=${website}/post/${data.post.slug}`,
    x = `https://twitter.com/intent/tweet?text=Check%20this%20out!&url=${website}/post/${data.post.slug}`,
    l = `https://www.linkedin.com/sharing/share-offsite/?url=${website}/post/${data.post.slug}`,
    w = `https://wa.me/?text=Check%20this%20out!%20${website}/post/${data.post.slug}`,
    t = `https://t.me/share/url?url=${website}/post/${data.post.slug}&text=Check%20this%20out!`,
    shareBtnStyle = 'btn btn-circle btn-ghost btn-outline btn-sm`'

  const shareLinks = [
    { id: 'f', url: f },
    { id: 'l', url: l },
    { id: 't', url: t },
    { id: 'w', url: w },
    { id: 'x', url: x }
  ]

  if (browser) pageState.registerLanguages()

  const onElement = () => {
    pageState.highlightElement(parsedEl)
    pageState.setCodeStyle(parsedEl)
    pageState.setLinkStyle(parsedEl)
    pageState.setBlockquoteStyle(parsedEl)
    headings = pageState.getHeadings(parsedEl)
  }

  onMount(() => {
    if (parsedEl) onElement()
  })
</script>

<svelte:head>
  <!-- Basic metadata -->
  <title>{data.post.title}</title>
  <meta name="description" content={data.post.excerpt} />
  <meta name="keywords" content={keywords.join(', ')} />

  <!-- Open graph metadata -->
  <meta property="og:title" content={data.post.title} />
  <meta property="og:description" content={data.post.excerpt} />
  <meta property="og:image" content={`${website}/${data.post.slug}.png`} />
  <meta property="og:url" content={`${website}/post/${data.post.slug}`} />
  <meta property="og:type" content="article" />
  <meta property="article:published_time" content={data.post.publishedAt} />
  <meta property="article:tag" content={data.post.tags.join(', ')} />

  <!-- Twitter cards -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={data.post.title} />
  <meta name="twitter:description" content={data.post.excerpt} />
  <meta name="twitter:image" content={`${website}/${data.post.slug}.png`} />

  <!-- Canonical URL -->
  <link rel="canonical" href={`${website}/post/${data.post.slug}`} />
</svelte:head>

<div class="bg-base-300 sticky top-0 z-20 hidden md:flex">
  <div class="breadcrumbs mx-auto text-sm">
    <ul>
      <li><a href="/" title="Home"><Home /></a></li>
      <li><a href="/posts">posts</a></li>
      <li>{data.post.slug}</li>
    </ul>
  </div>
</div>
<article class="article">
  <div class="mx-auto max-w-3xl px-4 pt-4">
    <a class="btn btn-sm mb-4 md:hidden" href="/posts" title="Back to posts">
      <Back />
    </a>
    <br />
    <span class="text-base-content/50 font-medium uppercase">{data.post.category}</span>
    <br />
    <span class="text-base-content/70 font-medium"><small>{`${formatDate(data.post.publishedAt)} • ${data.post.readingTime} min read`}</small></span>
    <h1 class="merriweather my-4 text-3xl font-bold">{data.post.title}</h1>
    <p>{data.post.excerpt}</p>
    <div class="my-4 flex flex-wrap gap-2">
      {#each shareLinks as s, i (s.id)}
        <a class={shareBtnStyle} href={s.url}>
          {#if s.id === 'f'}
            <Facebook />
          {:else if s.id === 'l'}
            <Linkedin />
          {:else if s.id === 't'}
            <Telegram />
          {:else if s.id === 'w'}
            <WhatsApp />
          {:else if s.id === 'x'}
            <Twitter />
          {/if}
        </a>
      {/each}
    </div>
  </div>
  <figure class="post-card-graphic mx-auto my-10 max-w-4xl overflow-clip lg:rounded-lg">
    <img src={`${website}/${data.post.slug}.png`} alt={data.post.title} width="100%" />
    <figcaption class="hidden">{data.post.title}</figcaption>
  </figure>
  <div class="mx-auto max-w-3xl px-4 xl:hidden">
    <div class="border-base-300 collapse border">
      <input type="checkbox" />
      <div class="collapse-title font-semibold">Table of contents</div>
      <div class="collapse-content text-sm">
        <ul class="list list-mb-2">
          {#each headings as heading (heading)}
            <li>
              <button class="link link-hover toc-item" type="button" onclick={() => pageState.onHeading(heading)}>{formatSlug(heading)}</button>
            </li>
          {/each}
        </ul>
      </div>
    </div>
  </div>
  <div class="article-join">
    <div class="article-toc">
      <div class="border-base-300 collapse-open collapse border">
        <input type="checkbox" />
        <div class="collapse-title font-semibold">Table of contents</div>
        <div class="collapse-content text-sm">
          <ul class="list list-mb-2">
            {#each headings as heading (heading)}
              <li>
                <button class="link link-hover toc-item" type="button" onclick={() => pageState.onHeading(heading)}>{formatSlug(heading)}</button>
              </li>
            {/each}
          </ul>
        </div>
      </div>
    </div>
    <div class="article-content mx-auto my-4 max-w-3xl px-4" bind:this={parsedEl}>
      <Sanitized html={data.code} />
      <ul class="flex flex-wrap gap-2">
        {#each data.post.tags as tag (tag)}
          {@const url = `/posts/tagged/${tag}`}
          <li><a class="btn btn-sm btn-primary" href={url}>{`#${tag}`}</a></li>
        {/each}
      </ul>
    </div>
  </div>
</article>
