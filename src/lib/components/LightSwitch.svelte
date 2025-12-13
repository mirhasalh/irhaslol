<script lang="ts">
  import Contrast from '$icons/Contrast.svelte'
  import Dark from '$icons/Dark.svelte'
  import Light from '$icons/Light.svelte'
  import { app } from '$lib/shared.svelte'

  let { onAuto, onDark, onLight }: { onAuto: (event: Event) => void; onDark: (event: Event) => void; onLight: (event: Event) => void } = $props()
</script>

<div class="border-base-content/5 rounded-md border p-1">
  <button class={`${app.theme == 'dark' ? 'btn' : 'btn btn-ghost'} btn-sm sm:btn-xs`} onclick={onDark}>
    <Dark class="h-4 w-4 fill-current" />
  </button>
  <button class={`${app.theme == 'light' ? 'btn' : 'btn btn-ghost'} btn-sm sm:btn-xs`} onclick={onLight}>
    <Light class="h-4 w-4 fill-current" />
  </button>
  <button class={`${app.theme == 'auto' ? 'btn' : 'btn btn-ghost'} btn-sm sm:btn-xs`} onclick={onAuto}>
    <Contrast class="h-4 w-4 fill-current" />
  </button>
</div>
