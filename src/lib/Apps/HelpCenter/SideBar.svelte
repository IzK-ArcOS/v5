<script lang="ts">
  import { onMount } from "svelte";
  import type { HelpCenterArticle } from "../../../ts/helpcenter/interface";
  import { helpCenterArticles } from "../../../ts/helpcenter/store";
  import Article from "./SideBar/Article.svelte";

  let articles: [string, HelpCenterArticle][] = [];

  onMount(() => {
    articles = Object.entries(helpCenterArticles);
  });
</script>

<div class="sidebar">
  {#each articles as article}
    {#if !article[1].parentId}
      <Article article={article[1]} id={article[0]} {articles} />
    {/if}
  {/each}
</div>
