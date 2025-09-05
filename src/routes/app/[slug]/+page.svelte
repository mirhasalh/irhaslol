<script lang="ts">
  import { website, formatDate } from '$lib'
  import type { PageData } from './$types'
  import GooglePlay from '$icons/download/GooglePlay.svelte'
  import AppStore from '$icons/download/AppStore.svelte'

  const note = `Thanks for trying out this app before it's released! 🙏`

  let { data }: { data: PageData } = $props()

  const mobileApp = data.app as App.MobileApp

  const requestInternalTesting = () => {
    const email = prompt('Enter your email to request access to the closed testing:')

    if (email) {
      const subject = encodeURIComponent('Request to join closed-testing')
      const body = encodeURIComponent(`Hello,\n\nI would like to join the closed testing for your app.\n\nMy email: ${email}\n\nThanks!`)
      const mailtoLink = `mailto:irhasm@icloud.com?subject=${subject}&body=${body}`

      window.location.href = mailtoLink
    }
  }
</script>

<svelte:head>
  <title>{`${mobileApp.title} (${mobileApp.year})`}</title>
  <meta name="description" content={mobileApp.shortDescription} />
  <meta property="og:title" content={`${mobileApp.title} (${mobileApp.year})`} />
  <meta property="og:description" content={mobileApp.description} />
  <meta property="og:image" content={`${website}/${mobileApp.featureGraphic}`} />
  <meta property="og:url" content={`${website}/app/${data.slug}`} />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={mobileApp.title} />
  <meta name="twitter:description" content={mobileApp.description} />
  <meta name="twitter:image" content={`${website}/${mobileApp.featureGraphic}`} />
  <link rel="canonical" href={`${website}/app/${data.slug}`} />
</svelte:head>

<div class="hero min-h-screen">
  <div class="hero-overlay-gradient-primary reveal-blur animation-delay-500"></div>
  <div class="hero-pattern-neutral-content"></div>
  <div class="hero-content relative z-10 text-center">
    <div class="max-w-md">
      <img class="app-icon mx-auto mb-4" src={`${website}/${mobileApp.icon}`} alt={mobileApp.title} width="126" />
      <ul class="flex justify-center gap-2">
        {#each mobileApp.urls.filter((v) => v.show) as url}
          <li>
            {#if url.code === 'internal-testing'}
              <button class="btn" onclick={() => requestInternalTesting()}>
                <span>Join closed-testing</span>
              </button>
            {:else}
              <a href={url.url} target="_blank" rel="noopener noreferrer" aria-describedby="open-in-new-tab">
                {#if url.code === 'android'}
                  <GooglePlay />
                {:else if url.code === 'ios'}
                  <AppStore />
                {:else}
                  <span>{url.title}</span>
                {/if}
              </a>
            {/if}
          </li>
        {/each}
      </ul>
      {#if mobileApp.production}
        <p class="mt-2"><small>{note}</small></p>
      {/if}
    </div>
  </div>
</div>

<section class="mx-auto max-w-4xl">
  <h2 id="feature-graphic" class="merriweather m-4 text-4xl font-bold">Feature graphic</h2>
  <figure class="post-card-graphic overflow-clip lg:rounded-lg">
    <img src={`${website}/${mobileApp.featureGraphic}`} alt={mobileApp.title} width="100%" />
    <figcaption class="hidden">{mobileApp.shortDescription}</figcaption>
  </figure>
</section>
<section class="mx-auto mt-10 max-w-4xl">
  <h2 id="description" class="merriweather m-4 text-4xl font-bold">Description</h2>
  <p class="px-4">{mobileApp.description}</p>
</section>
<section class="mx-auto mt-10 max-w-4xl">
  <h2 id="privacy" class="merriweather m-4 text-4xl font-bold">Privacy policy</h2>
  <p class="px-4">Effective date: {formatDate(mobileApp.effectiveDateOfPrivacy)}</p>
  <ol class="list-mb-4 list mt-4 px-4">
    {#each mobileApp.privacyDeclarations as declaration, i}
      <li>
        <p>
          <strong>{i + 1}. {declaration.title}</strong>
          <br />
          {declaration.text}
        </p>
      </li>
    {/each}
  </ol>
</section>
