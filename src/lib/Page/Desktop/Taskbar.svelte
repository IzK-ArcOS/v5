<script lang="ts">
  import type { App } from "../../../ts/applogic/interface";
  import { UserData } from "../../../ts/userlogic/interfaces";
  import {
    getOpenedStore,
    isFullscreenWindow,
    maxZIndex,
    WindowStore,
  } from "../../../ts/applogic/store";

  import TaskbarButton from "./Taskbar/TaskbarButton.svelte";

  let oa: App[] = [];

  WindowStore.subscribe(() => {
    oa = getOpenedStore();
  });
</script>

{#if $UserData}
  <div
    class="taskbar"
    style="z-index: {$maxZIndex + 3};"
    class:docked={$UserData.sh.taskbar.docked}
    class:fullscreen={$isFullscreenWindow}
    class:centered={$UserData.sh.taskbar.centered}
  >
    <slot />
    <div class="buttons">
      {#each oa as app}
        {#if !app.disabled}
          <TaskbarButton {app} />
        {/if}
      {/each}
    </div>
  </div>
{/if}
