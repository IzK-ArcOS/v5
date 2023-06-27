<script lang="ts">
  import "../../css/desktop/apps/AppLauncher.css";
  import { isPopulatable } from "../../ts/applogic/checks";
  import { closeWindow } from "../../ts/applogic/events";
  import { WindowStore, focusedWindowId } from "../../ts/applogic/store";
  import ArcFind from "../Page/Desktop/ArcFind.svelte";
  import AppListItem from "../Page/Desktop/StartMenu/AppListItem.svelte";

  focusedWindowId.subscribe((v) => {
    if (v != "AppLauncher") closeWindow("AppLauncher");
  });
</script>

<ArcFind inlined />
<div class="apps">
  {#each $WindowStore as app}
    {#if isPopulatable(app)}
      <AppListItem {app} onopen={() => closeWindow("AppLauncher")} />
    {/if}
  {/each}
</div>
