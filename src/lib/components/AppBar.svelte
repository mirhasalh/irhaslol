<script lang="ts">
  import { page } from '$app/state'
  import { l } from '$lib/shared.svelte'
  import Menu from '$icons/Menu.svelte'

  let { leading, trailing } = $props()

  const urls = [
    { url: '/', id: 'home' },
    { url: '/animations', id: 'animations' },
    { url: '/posts', id: 'posts' },
    { url: '/about', id: 'about' }
  ]
</script>

<header class="navbar bg-base-100 shadow-sm">
  <div class="navbar-start">
    <div class="dropdown">
      <div tabindex="-1" role="button" class="btn btn-ghost lg:hidden">
        <Menu />
      </div>
      <ul tabindex="-1" class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        {#each urls as u (u)}
          {@const active = u.url === '/' ? false : u.url === page.route.id}
          {@const link = active ? 'link link-primary' : 'link link-hover'}
          <li><a class={link} href={u.url}>{l(`link.${u.id}`)}</a></li>
        {/each}
      </ul>
    </div>
    {@render leading?.()}
  </div>
  <div class="navbar-center hidden lg:flex">
    <ul class="menu menu-horizontal px-1">
      {#each urls as u (u)}
        {@const active = u.url === '/' ? false : u.url === page.route.id}
        {@const link = active ? 'link link-primary' : 'link link-hover'}
        <li><a class={link} href={u.url}>{l(`link.${u.id}`)}</a></li>
      {/each}
    </ul>
  </div>
  <div class="navbar-end gap-2">
    {@render trailing?.()}
  </div>
</header>
