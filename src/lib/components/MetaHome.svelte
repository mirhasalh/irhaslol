<script lang="ts">
  import { website } from '$lib'
</script>

<svelte:head>
  <title>Irhas' dev blog | Building in public</title>
  <meta name="description" content="Self-taught developer sharing practical coding tips, real-world project insights, and lessons learned in web development." />
  <meta name="keywords" content="Irhas, software developer, programming blog, web development, JavaScript, front-end, back-end, coding journey, self-taught developer, build in public" />
  <meta name="author" content="Irhas" />
  <link rel="canonical" href={website} />

  <meta property="og:title" content="Irhas' dev blog" />
  <meta property="og:description" content="Learn how to builds real-world web applications and shares development insights, coding strategies, and lessons from the tech industry." />
  <meta property="og:image" content={`${website}/og-image.jpg`} />
  <meta property="og:url" content={website} />
  <meta property="og:type" content="website" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Irhas' dev blog" />
  <meta name="twitter:description" content="Explore path as a self-taught software engineer, sharing code tutorials, dev tips, and reflections from real projects." />
  <meta name="twitter:image" content={`${website}/twitter-image.jpg`} />
  <meta name="twitter:site" content="@irhasdev" />

  <link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap.xml" />
  <link rel="alternate" type="application/rss+xml" title="RSS Feed" href="/rss.xml" />

  <meta name="msvalidate.01" content="E5CD603A2AABF1659ECAC8A20B150AF4" />
</svelte:head>
