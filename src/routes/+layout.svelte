<script lang="ts">
  import '../app.css'
  import { browser } from '$app/environment'
  import { onMount } from 'svelte'
  import { onNavigate } from '$app/navigation'
  import { HomePageState } from './state.svelte'
  import { app } from '$lib/shared.svelte'
  import t9n from '$l10n/t9n'
  import Footer from '$components/Footer.svelte'
  import BrandLogo from '$components/BrandLogo.svelte'
  import AppBar from '$components/AppBar.svelte'
  import LightSwitch from '$components/LightSwitch.svelte'

  if (browser) {
    const currentTheme = document.documentElement.getAttribute('data-theme')
    if (currentTheme === 'light' || currentTheme === 'dark') app.theme = currentTheme
  }

  let { children } = $props(),
    pageState = new HomePageState(),
    to = $derived(app.theme === 'light' ? 'dark' : 'light')

  const onChanged = () => {
    pageState.setTheme(to)
    localStorage.setItem('theme', app.theme)
  }

  onNavigate((navigation) => {
    if (!document.startViewTransition) return

    return new Promise((resolve) => {
      document.startViewTransition(async () => {
        resolve()
        await navigation.complete
      })
    })
  })

  onMount(() => pageState.setBodyBackgroundColor())
</script>

<AppBar>
  {#snippet leading()}
    <a href="/" class="flex items-center gap-2" title="Home">
      <BrandLogo width={40} height={40} />
      <p class="merriweather leading-4 text-sm hidden sm:block">Irhas'<br />dev blog</p>
    </a>
  {/snippet}
  {#snippet trailing()}
    <select class="select w-18 uppercase" bind:value={app.locale}>
      {#each Object.keys(t9n) as lang}
        <option value={lang}>{lang}</option>
      {/each}
    </select>
    <LightSwitch isDark={app.theme === 'dark'} {onChanged} />
    <div class="indicator hidden md:block">
      <span class="indicator-item status status-success animate-ping"></span>
      <div class="indicator-item status status-success"></div>
      <div class="tooltip tooltip-left tooltip-success" data-tip="Open to work">
        <a class="btn btn-ghost btn-circle overflow-clip" href="https://github.com/mirhasalh" target="_blank" rel="noopener noreferrer" aria-describedby="open-in-new-tab" title="Go to mirhasalh GitHub">
          <img src="https://github.com/mirhasalh.png" alt="mirhasalh" />
        </a>
      </div>
    </div>
  {/snippet}
</AppBar>
{@render children()}
<Footer />
