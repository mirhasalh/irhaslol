<script lang="ts">
  import { l } from '$lib/shared.svelte'
  import { fade, fly } from 'svelte/transition'
  import { flip } from 'svelte/animate'
  import type { PageData } from './$types'
  import PostCard from '$components/PostCard.svelte'

  let { data }: { data: PageData } = $props()

  let selectedCategory = $state('')

  const obj: any = data as any,
    posts: App.Post[] = obj.posts as App.Post[],
    categories = [...new Set(posts.map((v) => v.category).flat())]

  let postsToShow = $derived.by(() => {
    return !selectedCategory ? posts : posts.filter((p) => p.category === selectedCategory)
  })
</script>

<section class="max-w-4xl mx-auto min-h-screen">
  <h2 class="merriweather text-4xl mx-4 mt-4 font-bold">
    {l('recentPost')}
  </h2>
  <form class="filter m-4">
    <input class="btn btn-square" type="reset" value="×" />
    {#each categories as c}
      <input class="btn" type="radio" bind:group={selectedCategory} name="frameworks" aria-label={c} value={c} />
    {/each}
  </form>
  <ul class="recent-posts-grid grid gap-4 md:grid-cols-2 px-4">
    {#each postsToShow as post (post.slug)}
      <li animate:flip in:fade out:fly={{ x: 100 }}>
        <PostCard {post} />
      </li>
    {/each}
  </ul>
</section>
