<script lang="ts">
  import type { App } from "../../../../ts/applogic/interface";
  import { getOpenedStore, WindowStore } from "../../../../ts/applogic/store";

  import TaskbarButton from "../Taskbar/TaskbarButton.svelte";
  import Tray from "../Taskbar/Tray.svelte";

  let oa: App[] = [];

  WindowStore.subscribe(() => {
    oa = getOpenedStore();
  });
</script>

<div class="buttons">
  {#each oa as app}
    {#if !app.disabled}
      <TaskbarButton {app} />
    {/if}
  {/each}
</div>
<Tray />
