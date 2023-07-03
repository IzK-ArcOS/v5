<script lang="ts">
  import { isMinimized } from "../../../../ts/applogic/checks";
  import { getAppIcon } from "../../../../ts/applogic/icon";
  import type { Process } from "../../../../ts/applogic/interface";
  import {
    AppStore,
    focusedProcessPid,
    maxZIndex,
    updateStores,
  } from "../../../../ts/applogic/store";
  import { UserData } from "../../../../ts/userlogic/interfaces";
  import { getWindowElement } from "../../../../ts/window/main";

  export let process: Process;

  let showLabel = false;
  let minimized = false;

  UserData.subscribe((v) => {
    showLabel = v.sh.taskbar.labels;
  });

  AppStore.subscribe(() => {
    minimized = isMinimized(process.id);
  });

  function e() {
    if ($focusedProcessPid == process.id)
      process.windowState.minimized = !process.windowState.minimized;
    else process.windowState.minimized = false;

    updateStores();

    $maxZIndex++;
    $focusedProcessPid = process.id;

    const window = getWindowElement(process.id);

    window.style.zIndex = $maxZIndex.toString();
  }
</script>

<button
  class="appbutton"
  class:minimized
  on:click={e}
  class:activated={process.id == $focusedProcessPid}
>
  <img src={getAppIcon(process.app)} alt={process.app.info.name} class="icon" />
  {#if showLabel}
    <span>{process.app.info.name}</span>
  {/if}
</button>
