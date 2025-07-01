<script lang="ts">
  import { onMount } from 'svelte'

  let innerWidth = $state(0)
  let parentHeight = $state(0)

  interface Dot {
    x: number
    y: number
    radius: number
    color: string
    blinkSpeed: number
    blinkPhase: number
  }

  const colors: string[] = ['#060b10', '#1e242c', '#272f38', '#3b434c', '#14ffcc']
  const gap: number = 14
  const radius: number = 0.8

  let canvasEl: HTMLCanvasElement
  let ctx: CanvasRenderingContext2D
  let dots: Dot[] = []

  function initCanvas(): void {
    if (!canvasEl || !ctx) return

    canvasEl.width = innerWidth
    canvasEl.height = parentHeight

    dots = []

    const cols = Math.floor(canvasEl.width / gap)
    const rows = Math.floor(canvasEl.height / gap)

    for (let y = 0; y <= rows; y++) {
      for (let x = 0; x <= cols; x++) {
        dots.push({
          x: x * gap,
          y: y * gap,
          radius,
          color: colors[Math.floor(Math.random() * colors.length)],
          blinkSpeed: Math.random() * 2 + 0.5,
          blinkPhase: Math.random() * Math.PI * 2
        })
      }
    }
  }

  let startTime = performance.now()

  function draw(): void {
    const currentTime = performance.now()
    const elapsed = (currentTime - startTime) / 1000

    ctx.clearRect(0, 0, canvasEl?.width, canvasEl?.height)

    for (const dot of dots) {
      const alpha = 0.5 + 0.5 * Math.sin(elapsed * dot.blinkSpeed + dot.blinkPhase)

      ctx.beginPath()
      ctx.globalAlpha = alpha
      ctx.fillStyle = dot.color
      ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2)
      ctx.fill()
    }

    ctx.globalAlpha = 1
    requestAnimationFrame(draw)
  }

  const getParentHeight = () => {
    const parent = canvasEl.parentElement
    parentHeight = parent!.offsetHeight
  }

  $effect(() => {
    if (innerWidth && ctx) {
      initCanvas()
    }
  })

  onMount(() => {
    const context = canvasEl.getContext('2d')
    if (!context) throw new Error('Failed to get canvas context')
    ctx = context

    if (canvasEl) getParentHeight()
    initCanvas()
    if (canvasEl) draw()
  })
</script>

<svelte:window bind:innerWidth />

<canvas class="pixel-canvas" bind:this={canvasEl}></canvas>

<style>
  canvas.pixel-canvas {
    width: inherit;
    height: inherit;
    pointer-events: none;
    display: block;
    position: relative;
    z-index: 1;
    mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%);
    -webkit-mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%);
  }
</style>
