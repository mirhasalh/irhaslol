<script lang="ts">
  import type { PageData } from './$types'
  import PostCard from '$components/PostCard.svelte'

  let { data }: { data: PageData } = $props(),
    find = $state(data.slug),
    toFind = $derived(find.replace(/\s+/g, '').toLowerCase())

  const obj: any = data as any,
    posts: App.Post[] = obj.posts as App.Post[]

  const goFind = async (find = '') => window.open(`/posts/tagged/${find}`, '_blank')

  const onKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (toFind) {
        goFind(toFind)
      } else {
        goFind('flutter')
      }
    }
  }
</script>

<svelte:head>
  <title>Tag: {data.slug}</title>
</svelte:head>

<section class="mx-auto min-h-screen max-w-4xl">
  <form class="m-4" onsubmit={() => goFind(toFind)}>
    <label class="input mx-auto" for="search">
      <span class="label">Search</span>
      <input name="search" type="text" placeholder="Tag" bind:value={find} onkeypress={onKeyPress} />
    </label>
  </form>
  {#if posts.length}
    <ul class="recent-posts-grid grid gap-4 px-4 md:grid-cols-2">
      {#each posts as post (post.slug)}
        <li><PostCard {post} /></li>
      {/each}
    </ul>
  {:else}
    <ul class="px-4">
      <li>Posts? Nah</li>
    </ul>
  {/if}
</section>
