<script lang="ts">
  import type { App } from "../../../ts/applogic/interface";
  import { UserData } from "../../../ts/userlogic/interfaces";
  import {
    getOpenedStore,
    isFullscreenWindow,
    OpenApps,
    WS,
  } from "../../../ts/applogic/store";

  import TaskbarButton from "./Taskbar/TaskbarButton.svelte";

  let userdata: UserData;

  UserData.subscribe((v) => {
    userdata = v;
  });

  let oa: WS = {};
  let oaKeys: string[] = [];

  OpenApps.subscribe(() => {
    oa = getOpenedStore();
    oaKeys = Object.keys(oa);
  });
</script>

{#if userdata}
  <div
    class="taskbar"
    class:docked={userdata.sh.taskbar.docked}
    class:fullscreen={$isFullscreenWindow}
  >
    <slot />
    {#each oaKeys as id}
      <TaskbarButton app={oa[id]} />
    {/each}
  </div>
{/if}
