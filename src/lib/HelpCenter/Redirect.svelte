<script lang="ts">
  import { onMount } from "svelte";
  import type { HelpCenterArticle } from "../../ts/helpcenter/interface";
  import {
    currentArticle,
    helpCenterArticles,
  } from "../../ts/helpcenter/store";

  export let id: string;

  let data: HelpCenterArticle;

  onMount(() => {
    data = helpCenterArticles[id];
  });

  function go() {
    currentArticle.set(id);
  }
</script>

{#if data}
  <button class="redirect" on:click={go}>{data.title}</button>
{/if}
