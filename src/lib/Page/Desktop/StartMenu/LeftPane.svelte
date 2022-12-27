<script lang="ts">
  import { WindowStore } from "../../../../ts/applogic/store";
  import AppListItem from "./AppListItem.svelte";
</script>

<div class="left">
  {#each $WindowStore as app}
    {#if !app.info.hidden && !app.disabled}
      <AppListItem {app} />
    {/if}
  {/each}
</div>
