<script lang="ts">
  import { isMinimized } from "../../../../../../ts/applogic/checks";
  import { closeWindow } from "../../../../../../ts/applogic/events";
  import { getOriginalIcon } from "../../../../../../ts/applogic/icon";
  import type { App, Process } from "../../../../../../ts/applogic/interface";
  import {
    AppStore,
    focusedProcessPid,
    maxZIndex,
    updateStores,
  } from "../../../../../../ts/applogic/store";
  import { showArcFind } from "../../../../../../ts/search/main";
  import { getWindowElement } from "../../../../../../ts/window/main";

  export let process: Process;

  let minimized = false;

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

    showArcFind.set(false);
  }
</script>

<button
  title={process.app.info.name}
  class:minimized
  on:click={e}
  class:activated={process.id == $focusedProcessPid}
>
  <img src={process.app.info.icon} alt={process.app.info.name} />
</button>
