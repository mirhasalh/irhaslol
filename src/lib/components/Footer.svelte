<script lang="ts">
  import { l } from '$lib/shared.svelte'
  import BrandLogo from './BrandLogo.svelte'
  import { email } from '$lib'

  const socials = [
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/irhas03'
    },
    {
      name: 'GitHub',
      url: 'https://github.com/mirhasalh/irhaslol'
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/irhasdev/'
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/irhasdev/'
    }
  ]

  const d = new Date()

  let { trailing } = $props(),
    year = $state(d.getFullYear()),
    emailBody = $state('')

  const sendEmail = (event: Event) => {
    event.preventDefault()
    const subject = 'Contact form submission'
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`
    window.location.href = mailtoLink
  }
</script>

<footer class="footer md:footer-horizontal bg-base-300 text-base-content mt-10 p-10">
  <nav>
    <h3 class="footer-title">{l('socials')}</h3>
    {#each socials as social (social.url)}
      <a class="link link-hover roboto" href={social.url} target="_blank" rel="noopener noreferrer" aria-describedby="open-in-new-tab">
        {social.name}
      </a>
    {/each}
  </nav>
  <form onsubmit={sendEmail}>
    <h3 class="footer-title">{l('getInTouch')}</h3>
    <fieldset class="fieldset">
      <legend class="fieldset-legend">{l('emailMe')}</legend>
      <div class="join">
        <input class="input input-bordered join-item" id="email-body" name="email-body" type="text" aria-label="Email body" placeholder="Jot something down" bind:value={emailBody} />
        <button type="submit" class="btn btn-primary join-item" disabled={emailBody.length < 5}>
          <span class="roboto">{l('send')}</span>
        </button>
      </div>
    </fieldset>
  </form>
  <nav>
    <h3 class="footer-title">{l('themes')}</h3>
    {@render trailing?.()}
  </nav>
</footer>
<footer class="footer bg-base-300 text-base-content px-10 py-4">
  <aside>
    <a href="/" title="Home">
      <BrandLogo />
    </a>
    <p>
      <span class="merriweather">Irhas' dev blog</span>
      <br />
      © {year}
    </p>
  </aside>
  <nav class="md:place-self-center md:justify-self-end">
    <div class="grid grid-flow-col gap-4">
      <a href="https://www.netlify.com" target="_blank" rel="noopener noreferrer" aria-describedby="open-in-new-tab">
        <img src="/api/netlify-badge" alt="Deploys by Netlify" />
      </a>
    </div>
  </nav>
</footer>
