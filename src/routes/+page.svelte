<script lang="ts">
  import type { LayoutData } from './$types'
  import { website } from '$lib'
  import { l } from '$lib/shared.svelte'
  import MetaHome from '$components/MetaHome.svelte'
  import PostCard from '$components/PostCard.svelte'
  import PixelCanvas from '$components/PixelCanvas.svelte'
  import ArrowDown from '$icons/ArrowDown.svelte'
  import Dart from '$icons/tech/Dart.svelte'
  import Flutter from '$icons/tech/Flutter.svelte'
  import Figma from '$icons/tech/Figma.svelte'
  import Go from '$icons/tech/Go.svelte'
  import Java from '$icons/tech/Java.svelte'
  import Next from '$icons/tech/Next.svelte'
  import Nuxt from '$icons/tech/Nuxt.svelte'
  import Spring from '$icons/tech/Spring.svelte'
  import Svelte from '$icons/tech/Svelte.svelte'
  import Swift from '$icons/tech/Swift.svelte'
  import Rive from '$icons/tech/Rive.svelte'
  import Marquee from '$components/Marquee.svelte'

  const techStacks = [
    { id: 0, title: 'Dart' },
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

  let { data }: { data: LayoutData } = $props()

  const obj: any = data as any,
    posts: App.Post[] = obj.posts as App.Post[],
    mobileApps: App.MobileApp[] = obj.apps as App.MobileApp[]
</script>

<MetaHome />

<div class="hero relative min-h-screen">
  <div class="reveal-curtain"></div>
  <div class="hero-overlay-gradient-primary reveal-blur animation-delay-2000"></div>
  <div class="hero-content relative z-10 text-center">
    <div class="max-w-md">
      <h1 class="reveal-fade-fly-blur merriweather text-5xl font-bold md:text-7xl">
        <span class="animate-wave">👋</span>
        {l('greetings.hello')}
        <br />
        {l('greetings.name')}
      </h1>
      <p class="reveal-fade-fly-blur animation-delay-250 py-6 md:text-xl">
        {l('welcome')}
      </p>
      <div class="tooltip tooltip-bottom" data-tip="See recent posts">
        <a href="#recent-posts" class="reveal-fade-fly-blur animation-delay-500 btn btn-ghost" title="See recent posts">
          <ArrowDown />
          <span class="hidden">See recent posts</span>
        </a>
      </div>
    </div>
  </div>
  <PixelCanvas />
</div>

<section id="marquee-section" class="reveal-fade-fly-blur animation-delay-2000 relative">
  <Marquee>
    <div class="flex gap-1">
      {#each techStacks as tech (tech.id)}
        <div class="flex items-center justify-center p-6">
          {#if tech.title === 'Flutter'}
            <Flutter />
          {:else if tech.title === 'Figma'}
            <Figma />
          {:else if tech.title === 'Go'}
            <Go />
          {:else if tech.title === 'Java'}
            <Java />
          {:else if tech.title === 'Next'}
            <Next />
          {:else if tech.title === 'Nuxt'}
            <Nuxt />
          {:else if tech.title === 'Spring'}
            <Spring />
          {:else if tech.title === 'Svelte'}
            <Svelte />
          {:else if tech.title === 'Swift'}
            <Swift />
          {:else if tech.title === 'Rive'}
            <Rive />
          {:else}
            <Dart />
          {/if}
        </div>
      {/each}
    </div>
  </Marquee>
</section>

<section class="mx-auto max-w-4xl">
  <h2 id="recent-posts" class="merriweather m-4 text-4xl font-bold">
    {l('recentPosts')}
  </h2>
  <ul class="recent-posts-grid grid gap-4 px-4 md:grid-cols-2">
    {#each posts as post (post.slug)}
      <li><PostCard {post} /></li>
    {/each}
  </ul>
  <div class="my-4 flex justify-center">
    <a class="btn" href="/posts">
      {l('viewAll')}
    </a>
  </div>
</section>

<section class="mx-auto mt-10 max-w-4xl">
  <h2 id="apps" class="merriweather m-4 text-4xl font-bold">
    {l('apps')}
  </h2>
  <ul class="recent-posts-grid grid gap-4 px-4 md:grid-cols-2">
    {#each mobileApps as app (app._id)}
      {@const url = `/app/${app.slug}`}
      <li>
        <a class="post-card card bg-base-100 shadow-sm hover:shadow-xl" href={url}>
          <figure class="post-card-graphic">
            <img src={`${website}/${app.featureGraphic}`} alt={app.title} width="100%" />
          </figure>
          <div class="card-body">
            <span class="jetbrains-mono text-base-content/50 uppercase"><strong>{app.year}</strong></span>
            <h2 class="merriweather card-title">{app.title}</h2>
            <p><span>{app.description}</span></p>
          </div>
        </a>
      </li>
    {/each}
  </ul>
</section>
