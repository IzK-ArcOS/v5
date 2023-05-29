<script lang="ts">
  import type { HelpCenterArticle } from "../../../../ts/helpcenter/interface";
  import { currentArticle } from "../../../../ts/helpcenter/store";
  import Article from "./Article.svelte";

  export let article: HelpCenterArticle;
  export let id: string;
  export let articles: [string, HelpCenterArticle][] = [];

  function open() {
    currentArticle.set(id);
  }
</script>

<button
  class="article-link"
  on:click={open}
  class:selected={$currentArticle == id}
>
  {article.title}
</button>
<div class="indent">
  {#each articles as a}
    {#if a[1].parentId == id}
      <Article article={a[1]} id={a[0]} {articles} />
    {/if}
  {/each}
</div>
{#if article.sep}<hr />{/if}
