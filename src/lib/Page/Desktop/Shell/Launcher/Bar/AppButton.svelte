<script lang="ts">
  import { isMinimized } from "../../../../../../ts/applogic/checks";
  import { closeWindow } from "../../../../../../ts/applogic/events";
  import { getOriginalIcon } from "../../../../../../ts/applogic/icon";
  import type { App } from "../../../../../../ts/applogic/interface";
  import {
    WindowStore,
    focusedWindowId,
    maxZIndex,
    updateStores,
  } from "../../../../../../ts/applogic/store";
  import { getWindowElement } from "../../../../../../ts/window/main";

  export let app: App;

  let minimized = false;

  WindowStore.subscribe(() => {
    minimized = isMinimized(app.id);
  });

  function e() {
    if ($focusedWindowId == app.id)
      app.state.windowState.min = !app.state.windowState.min;
    else app.state.windowState.min = false;

    updateStores();

    $maxZIndex++;
    $focusedWindowId = app.id;

    const window = getWindowElement(app);

    window.style.zIndex = $maxZIndex.toString();
  }
</script>

<button
  title={app.info.name}
  class:minimized
  on:click={e}
  class:activated={app.id == $focusedWindowId}
>
  <img src={getOriginalIcon(app.id) || app.info.icon} alt={app.info.name} />
</button>
