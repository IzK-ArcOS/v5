<script>
  import {
    currentArticle,
    helpCenterArticles,
  } from "../../../ts/helpcenter/store";
</script>

<div class="article-renderer markdownrenderer">
  {#if $currentArticle && helpCenterArticles[$currentArticle]}
    <svelte:component this={helpCenterArticles[$currentArticle].content} />
  {/if}
</div>
