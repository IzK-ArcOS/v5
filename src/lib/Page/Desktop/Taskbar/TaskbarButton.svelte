<script lang="ts">
  import { isMinimized } from "../../../../ts/applogic/checks";
  import { getAppIcon, getOriginalIcon } from "../../../../ts/applogic/icon";
  import type { App } from "../../../../ts/applogic/interface";
  import {
    focusedWindowId,
    maxZIndex,
    updateStores,
    WindowStore,
  } from "../../../../ts/applogic/store";
  import { ActionCenterOpened } from "../../../../ts/desktop/actioncenter/main";
  import { attentionId, startOpened } from "../../../../ts/desktop/main";
  import { UserData } from "../../../../ts/userlogic/interfaces";
  import { getWindowElement } from "../../../../ts/window/main";

  export let app: App;

  let showLabel = false;
  let minimized = false;

  UserData.subscribe((v) => {
    showLabel = v.sh.taskbar.labels;
  });

  focusedWindowId.subscribe((v) => {
    if ($attentionId == v && app.id == $attentionId) $attentionId = null;
  });

  WindowStore.subscribe(() => {
    minimized = isMinimized(app.id);
  });

  function e() {
    $startOpened = false;
    $ActionCenterOpened = false;

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
  class="appbutton"
  class:minimized
  on:click={e}
  class:attention={$attentionId == app.id}
  class:activated={app.id == $focusedWindowId}
  class:labels={showLabel}
>
  <img
    src={getOriginalIcon(app.id) || getAppIcon(app)}
    alt={app.info.name}
    class="icon"
  />
  {#if showLabel}
    <span>{app.info.name}</span>
  {/if}
</button>
