<script lang="ts">
  import { gitHubAccounts, recentWork } from '$lib'
  import { l } from '$lib/shared.svelte'
  import Tick from '$icons/Tick.svelte'
  import Card3D from '$components/Card3D.svelte'

  let showImage = $state(false)
</script>

<svelte:head>
  <title>About</title>
</svelte:head>

<div class="hero min-h-screen">
  <div class="hero-pattern-primary"></div>
  <div class="hero-overlay-gradient-tertiary reveal-blur animation-delay-500"></div>
  <div class="hero-content relative z-10 max-w-3xl flex-col lg:flex-row-reverse">
    <Card3D />
    <div>
      <h1 id="greetings" class="merriweather text-5xl font-bold">
        {l('greetings2')}
      </h1>
      <p class="py-6">{l('bio')}</p>
      <h2 id="github-accounts" class="merriweather text-4xl font-bold">
        {l('gitHubAccounts')}
      </h2>
      <p class="py-4">{l('gitHubAccountsSubtitle')}</p>
      <div class="avatar-group -space-x-6">
        {#each gitHubAccounts as acc (acc.id)}
          <div class="avatar">
            <a class="w-12" href={acc.profile} target="_blank" rel="noopener noreferrer" aria-describedby="open-in-new-tab">
              <img src={acc.avatar} alt={acc.username} />
            </a>
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>

<section class="mx-auto max-w-4xl">
  <div class="m-4 flex-wrap items-center justify-between md:flex">
    <h2 id="work-history" class="merriweather text-4xl font-bold">
      {l('workHistory')}
    </h2>
    <fieldset class="fieldset p-4">
      <legend class="fieldset-legend hidden">Login options</legend>
      <label class="label">
        {l('showImage')}
        <input type="checkbox" bind:checked={showImage} class="toggle" />
      </label>
    </fieldset>
  </div>
  <ul class="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical px-4">
    {#each recentWork as w, i (w.id)}
      {@const isEven = i % 2 == 0}
      {@const textStyle = isEven ? 'timeline-start mb-10 md:text-end' : 'timeline-end md:mb-10'}
      <li>
        <div class="timeline-middle">
          <Tick />
        </div>
        <div class={textStyle}>
          <time class="jetbrains-mono italic">{w.year}</time>
          <div class="merriweather text-lg font-black">{w.title}</div>
          <img class:hidden={!showImage} src={w.imgUrl} alt={w.title} />
          <small>{w.desc}</small>
          <br />
          <a class="btn btn-sm mt-2" class:hidden={!showImage} href={w.urls[0]}>
            <span class="text-sm">{l('visit')}</span>
          </a>
        </div>
        {#if i !== recentWork.length - 1}
          <hr />
        {/if}
      </li>
    {/each}
  </ul>
</section>

<section class="hero">
  <div class="hero-content">
    <a class="btn btn-neutral" href="https://irhas.lol/Resume_20250124-081909.pdf" target="_parent">
      <span>Resume</span>
    </a>
  </div>
</section>
