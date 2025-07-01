<script lang="ts">
  import { onMount } from 'svelte'

  let { children } = $props()
  let container: HTMLDivElement | null
  let content: HTMLDivElement | null

  const weight = 0

  let animationDuration = $state(0)

  onMount(() => {
    if (content && container) {
      const contentWidth = content.offsetWidth
      const containerWidth = container.offsetWidth

      if (contentWidth > containerWidth) {
        animationDuration = contentWidth / 100 + weight
      }
    }
  })
</script>

<div class="marquee-container" role="presentation" bind:this={container}>
  <div class="marquee-track" bind:this={content} style={`animation-duration: ${animationDuration}s;`}>
    <div style="display: inline-block;">
      {@render children()}
    </div>
    <div style="display: inline-block;">
      {@render children()}
    </div>
  </div>
</div>

<style>
  .marquee-container {
    overflow: hidden;
    white-space: nowrap;
    position: relative;
    mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
    -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
    max-width: 768px;
    margin-left: auto;
    margin-right: auto;
  }

  .marquee-track {
    display: inline-block;
    white-space: nowrap;
    animation: scroll linear infinite;
    will-change: transform;
  }

  .marquee-container:hover .marquee-track {
    animation-play-state: paused;
  }

  @keyframes scroll {
    0% {
      transform: translateX(0%);
    }
    100% {
      transform: translateX(-50%);
    }
  }
</style>
