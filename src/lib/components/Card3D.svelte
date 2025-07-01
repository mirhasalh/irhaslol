<script lang="ts">
  import { browser } from '$app/environment'
  import { onDestroy } from 'svelte'

  let cardEl: HTMLDivElement | null = null
  let bounds = $state<DOMRect | null>(null)

  function rotateToMouse(e: MouseEvent) {
    if (!cardEl || !bounds) return

    const mouseX = e.clientX
    const mouseY = e.clientY
    const leftX = mouseX - bounds.x
    const topY = mouseY - bounds.y

    const center = {
      x: leftX - bounds.width / 2,
      y: topY - bounds.height / 2
    }

    const distance = Math.sqrt(center.x ** 2 + center.y ** 2)

    cardEl.style.transform = `
        scale3d(1.07, 1.07, 1.07)
        rotate3d(
          ${center.y / 100},
          ${-center.x / 100},
          0,
          ${Math.log(distance) * 2}deg
        )
      `

    const glow = cardEl.querySelector('.glow') as HTMLDivElement
    if (glow) {
      glow.style.backgroundImage = `
          radial-gradient(
            circle at
            ${center.x * 2 + bounds.width / 2}px
            ${center.y * 2 + bounds.height / 2}px,
            #ffffff55,
            #0000000f
          )
        `
    }
  }

  function handleMouseEnter() {
    if (!cardEl) return
    bounds = cardEl.getBoundingClientRect()
    document.addEventListener('mousemove', rotateToMouse)
  }

  function handleMouseLeave() {
    if (!cardEl) return
    document.removeEventListener('mousemove', rotateToMouse)
    cardEl.style.transform = ''
    const glow = cardEl.querySelector('.glow') as HTMLDivElement
    if (glow) glow.style.backgroundImage = ''
  }

  onDestroy(() => {
    if (browser) document.removeEventListener('mousemove', rotateToMouse)
  })
</script>

<div bind:this={cardEl} class="card-3d card-3d-irhas" role="presentation" onmouseenter={handleMouseEnter} onmouseleave={handleMouseLeave}>
  <div class="glow"></div>
</div>

<style>
  .card-3d {
    font-weight: bold;
    padding: 1em;
    text-align: right;
    color: #181a1a;
    box-shadow: 0 1px 5px #00000099;
    border-radius: 0.5rem;
    background-size: cover;
    position: relative;
    transition-duration: 300ms;
    transition-property: transform, box-shadow;
    transition-timing-function: ease-out;
    transform: rotate3d(0);
  }

  .card-3d:hover {
    transition-duration: 150ms;
    box-shadow: 0 5px 20px 5px #00000044;
  }

  .card-3d .glow {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background-image: radial-gradient(circle at 50% -20%, #ffffff22, #0000000f);
  }

  .card-3d-irhas {
    background-image: url(https://irhas.lol/IMG_20250501-170202.webp);
    min-width: 300px;
    min-height: 428px;
  }

  @media screen and (min-width: 768px) {
    .card-3d-irhas {
      min-width: 384px;
      min-height: 512px;
    }
  }
</style>
