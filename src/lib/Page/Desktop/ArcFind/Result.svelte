<script lang="ts">
  import { ArcFindIcon } from "../../../../ts/icon/general";
  import type { SearchItem } from "../../../../ts/search/interface";
  import { showArcFind } from "../../../../ts/search/main";

  export let result: SearchItem;
  export let index: number;
  export let resultIndex: number;

  function trigger() {
    result.action(result);
    showArcFind.set(false);
  }
</script>

<button class="result" on:click={trigger} class:selected={index == resultIndex}>
  <div class="image">
    <img src={result.image || ArcFindIcon} alt={result.caption} />
  </div>
  <div class="context">
    <p class="title">{result.caption}</p>
    {#if result.description}
      <p class="description">{result.description}</p>
    {/if}
  </div>
</button>
