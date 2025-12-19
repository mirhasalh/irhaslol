<script lang="ts">
  import t9n from '$l10n/t9n'
  import { app } from '$lib/shared.svelte'
</script>

<form>
  <label for="language-settings" class="hidden">Language settings</label>
  <select id="language-settings" name="language-settings" class="select w-18 uppercase" aria-label="Language settings" bind:value={app.locale}>
    {#each Object.keys(t9n) as lang}
      <option value={lang}>{lang}</option>
    {/each}
  </select>
</form>
