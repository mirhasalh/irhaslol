<script lang="ts">
  import Contrast from '$icons/Contrast.svelte'
  import Dark from '$icons/Dark.svelte'
  import Light from '$icons/Light.svelte'
  import { app } from '$lib/shared.svelte'

  let { onAuto, onDark, onLight }: { onAuto: (event: Event) => void; onDark: (event: Event) => void; onLight: (event: Event) => void } = $props()
</script>

<div>
  <span>{app.theme}</span>
  <button class="btn btn-sm sm:btn-xs" class:btn-neutral={app.theme === 'dark'} onclick={onDark}>
    <Dark class="h-4 w-4 fill-current" />
  </button>
  <button class="btn btn-sm sm:btn-xs" class:btn-neutral={app.theme === 'light'} onclick={onLight}>
    <Light class="h-4 w-4 fill-current" />
  </button>
  <button class="btn btn-sm sm:btn-xs" onclick={onAuto}>
    <Contrast class="h-4 w-4 fill-current" />
  </button>
</div>
