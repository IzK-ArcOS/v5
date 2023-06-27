<script lang="ts">
  import { isPopulatable } from "../../ts/applogic/checks";
  import { WindowStore } from "../../ts/applogic/store";
  import AppListItem from "../Page/Desktop/StartMenu/AppListItem.svelte";
</script>

<div class="apps">
  {#each $WindowStore as app}
    {#if isPopulatable(app)}
      <AppListItem {app} />
    {/if}
  {/each}
</div>
