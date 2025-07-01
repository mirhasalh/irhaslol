<script lang="ts">
  import { formatDate, website } from '$lib'

  let { post }: { post: App.Post } = $props()
</script>

<a class="post-card card bg-base-100 shadow-sm hover:shadow-xl" href={`/post/${post.slug}`}>
  <figure class="post-card-graphic">
    <img src={`${website}/${post.slug}.png`} alt={post.title} width="100%" />
  </figure>
  <div class="card-body">
    <span class="uppercase text-base-content/50"><strong>{post.category}</strong></span>
    <h2 id={post.slug} class="post-card-title merriweather card-title">{post.title}</h2>
    <p><span class="post-card-excerpt">{post.excerpt}</span></p>
    <small class="jetbrains-mono font-medium text-base-content/70">{formatDate(post.publishedAt)}</small>
  </div>
</a>
