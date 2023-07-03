<script lang="ts">
  import type { Process } from "../../../ts/applogic/interface";

  import {
    ProcessStore,
    focusedProcessPid,
    getWindow,
    isFullscreenWindow,
    maxZIndex,
  } from "../../../ts/applogic/store";
  import { getWindowElement } from "../../../ts/window/main";
  import Window from "./WindowStore/Window.svelte";

  let oa: [string, Process][] = [];

  ProcessStore.subscribe((v) => {
    if (!v) return;

    oa = [];

    const entries = Object.entries($ProcessStore);

    oa = entries;

    console.log(oa);

    for (let i = 0; i < entries.length; i++) {
      const pid = entries[i][0];
      const proc = entries[i][1];

      if (
        proc.windowState.fullscreen &&
        !proc.app.info.custom &&
        !proc.app.core
      )
        return isFullscreenWindow.set(true);
    }

    isFullscreenWindow.set(false);
  });

  focusedProcessPid.subscribe((v) => {
    if (getWindow(v)?.info.custom) return;

    $maxZIndex++;

    const element = getWindowElement(v);

    if (!element) return console.log("OH FUCK NO");

    element.style.zIndex = `${$maxZIndex}`;
  });
</script>

<div class="winstore">
  {#each oa as [pid, proc]}
    {#if proc.app && !proc.app.disabled}
      <Window app={proc.app} pid={parseInt(pid)} process={proc} />
    {/if}
  {/each}
</div>
