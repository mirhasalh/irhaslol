<script lang="ts">
  import t9n from '$l10n/t9n'
  import { app } from '$lib/shared.svelte'

  const onChange = (event: Event) => {
    const target = event.target as HTMLSelectElement | null
    const selected = target?.value || 'en'
    const htmlElement = document.documentElement
    htmlElement.lang = selected
    localStorage.setItem('lang', selected)
  }
</script>

<form>
  <label for="language-settings" class="hidden">Language settings</label>
  <select id="language-settings" name="language-settings" class="select w-18 uppercase" aria-label="Language settings" bind:value={app.locale} onchange={onChange}>
    {#each Object.keys(t9n) as lang}
      <option class="roboto" value={lang}>{lang}</option>
    {/each}
  </select>
</form>
