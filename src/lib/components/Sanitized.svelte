<script lang="ts">
  import { browser } from '$app/environment'
  import DOMPurify from 'isomorphic-dompurify'

  let { html } = $props()
</script>

{#if browser}
  {@html DOMPurify.sanitize(html, { USE_PROFILES: { html: true } })}
{/if}
