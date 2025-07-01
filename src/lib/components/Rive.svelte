<script lang="ts">
  import { onMount } from 'svelte'
  import { website } from '$lib'
  import * as rive from '@rive-app/canvas'

  let { fileName = 'avatar_1.riv', width = 200, height = 200 } = $props()

  const target = `canvas-${fileName.split('.')[0]}`

  const initRive = () => {
    const canvasElement = document.getElementById(target) as HTMLCanvasElement | null

    if (canvasElement) {
      // Adjust canvas size for high-DPI displays
      const dpr = window.devicePixelRatio || 1
      canvasElement.width = width * dpr // Multiply by DPR
      canvasElement.height = height * dpr
      canvasElement.style.width = `${width}px` // Set CSS size
      canvasElement.style.height = `${height}px`

      const r = new rive.Rive({
        src: `${website}/${fileName}`,
        canvas: canvasElement,
        stateMachines: 'State Machine 1',
        autoplay: true,
        onLoad: () => {
          // Ensure the drawing surface is resized
          r.resizeDrawingSurfaceToCanvas()
        }
      })
    }
  }

  onMount(() => initRive())
</script>

<canvas id={target} class="cursor-pointer"></canvas>
