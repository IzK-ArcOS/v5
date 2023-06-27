<script lang="ts">
  import type { SearchItem } from "../../../../ts/search/interface";
  import searchIcon from "../../../../assets/arcfind.svg";
  import { showArcFind } from "../../../../ts/search/main";
  import { closeWindow } from "../../../../ts/applogic/events";

  export let result: SearchItem;
  export let index: number;
  export let resultIndex: number;

  function trigger() {
    result.action(result);
    showArcFind.set(false);
    closeWindow("AppLauncher");
  }
</script>

<button class="result" on:click={trigger} class:selected={index == resultIndex}>
  <div class="image">
    <img src={result.image || searchIcon} alt={result.caption} />
  </div>
  <div class="context">
    <p class="title">{result.caption}</p>
    {#if result.description}
      <p class="description">{result.description}</p>
    {/if}
  </div>
</button>
