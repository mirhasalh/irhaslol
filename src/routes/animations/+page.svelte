<script lang="ts">
  import Rive from '$components/Rive.svelte'
  import { l } from '$lib/shared.svelte'

  const width = 200,
    height = 200,
    avatars = [
      { id: 0, fileSize: 4, file: 'avatar_3.riv' },
      { id: 1, fileSize: 4, file: 'avatar_1.riv' },
      { id: 2, fileSize: 3, file: 'avatar_2.riv' }
    ]
</script>

<svelte:head>
  <title>Animations</title>
</svelte:head>

<div class="hero min-h-screen">
  <div class="hero-pattern-secondary"></div>
  <div class="hero-overlay-gradient-secondary reveal-blur animation-delay-500"></div>
  <div class="hero-content relative z-10 text-center">
    <div class="max-w-3xl">
      <h1 id="animations" class="merriweather text-5xl font-bold">
        {l('animations')}
      </h1>
      <p class="hidden py-6 md:block">
        {l('riveIntro.start')}
        <a class="link link-hover link-secondary" href="https://rive.app/" target="_blank" rel="noopener noreferrer" aria-describedby="open-in-new-tab">Rive</a>
        — {l('riveIntro.mid')}
        <br />
        {l('riveIntro.end')}
      </p>
      <p class="block py-6 text-sm md:hidden">
        {l('riveIntro.start')}
        <a class="link link-hover link-secondary" href="https://rive.app/" target="_blank" rel="noopener noreferrer" aria-describedby="open-in-new-tab">Rive</a>
        — {l('riveIntro.mid')}
        {l('riveIntro.end')}
      </p>
      <ul class="flex flex-wrap items-center justify-center gap-2">
        {#each avatars as avatar, i (avatar.id)}
          <li>
            <div class="card bg-base-100 shadow-sm">
              <Rive fileName={avatar.file} {width} {height} />
              <div class="card-body">
                <p>{avatar.fileSize} kb</p>
              </div>
            </div>
          </li>
        {/each}
      </ul>
    </div>
  </div>
</div>
