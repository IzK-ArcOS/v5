<script lang="ts">
  import { WindowStore } from "../../../../ts/applogic/store";
  import AppListItem from "./AppListItem.svelte";
</script>

<div class="left">
  {#each $WindowStore as window}
    {#if !window.info.hidden}
      <AppListItem app={window} />
    {/if}
  {/each}
</div>
