<script lang="ts">
  import { helpCenterArticles } from "../../../ts/helpcenter/store";
  import Article from "./SideBar/Article.svelte";
</script>

<div class="sidebar">
  {#each Object.entries(helpCenterArticles) as article}
    <Article article={article[1]} id={article[0]} />
  {/each}
</div>
