<script lang="ts">
  import type { App } from "../../../ts/applogic/interface";
  import { UserData } from "../../../ts/userlogic/interfaces";
  import {
    getOpenedStore,
    isFullscreenWindow,
    maxZIndex,
    OpenApps,
  } from "../../../ts/applogic/store";

  import TaskbarButton from "./Taskbar/TaskbarButton.svelte";

  let userdata: UserData;

  UserData.subscribe((v) => {
    userdata = v;
  });

  let oa: App[] = [];

  OpenApps.subscribe(() => {
    oa = getOpenedStore();
  });
</script>

{#if userdata}
  <div
    class="taskbar"
    style="z-index: {$maxZIndex + 3};"
    class:docked={userdata.sh.taskbar.docked}
    class:fullscreen={$isFullscreenWindow}
  >
    <slot />
    {#each oa as app}
      <TaskbarButton {app} />
    {/each}
  </div>
{/if}
