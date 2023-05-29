<script lang="ts">
  import {
    currentArticle,
    helpCenterArticles,
  } from "../../../ts/helpcenter/store";
</script>

<!--
  * About the .markdownrenderer class

  The articles in the Help Center are not markdown based, but the .markdownrenderer class
  is applied here so that the styling still matches that of all other markdown displays in ArcOS,
  like the Messaging App and Markdown Viewer.

  - Izaak Kuipers, May 29th 2023, 1:19 PM

-->
<div class="article-renderer markdownrenderer">
  {#if $currentArticle && helpCenterArticles[$currentArticle]}
    <svelte:component this={helpCenterArticles[$currentArticle].content} />
  {/if}
</div>
