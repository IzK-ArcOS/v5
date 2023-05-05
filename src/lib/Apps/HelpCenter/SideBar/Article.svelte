<script lang="ts">
  import type { HelpCenterArticle } from "../../../../ts/helpcenter/interface";

  export let article: HelpCenterArticle;
  export let id: string;

  function open() {
    console.log(id);
  }
</script>

<button class="article-link" on:click={open}>
  {article.title}
</button>
