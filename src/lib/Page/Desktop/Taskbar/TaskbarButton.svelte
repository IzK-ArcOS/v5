<script lang="ts">
  import { isMinimized } from "../../../../ts/applogic/checks";
  import {
    focusedWindowId,
    maxZIndex,
    updateStores,
    WindowStore,
  } from "../../../../ts/applogic/store";
  import type { App } from "../../../../ts/applogic/interface";
  import { UserData } from "../../../../ts/userlogic/interfaces";
  import { getWindowElement } from "../../../../ts/window/main";

  export let app: App;

  let showLabel = false;
  let minimized = false;

  UserData.subscribe((v) => {
    showLabel = v.sh.taskbar.labels;
  });

  WindowStore.subscribe(() => {
    minimized = isMinimized(app.id);
  });

  function e() {
    if ($focusedWindowId == app.id)
      app.state.windowState.min = !app.state.windowState.min;

    updateStores();

    if (app.state.windowState.min) return;

    $maxZIndex++;
    $focusedWindowId = app.id;

    const window = getWindowElement(app);

    window.style.zIndex = $maxZIndex.toString();
  }
</script>

<button
  class="appbutton"
  class:minimized
  on:click={e}
  class:activated={app.id == $focusedWindowId}
>
  <img src={app.info.icon} alt={app.info.name} class="icon" />
  {#if showLabel}
    <span>{app.info.name}</span>
  {/if}
</button>
