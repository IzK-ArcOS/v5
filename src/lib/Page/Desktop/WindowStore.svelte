<script lang="ts">
  import app from "../../../main";
  import { isOpened } from "../../../ts/applogic/checks";
  import type { App } from "../../../ts/applogic/interface";
  import { SideloadedStore } from "../../../ts/applogic/sideloading/store";

  import {
    focusedWindowId,
    getOpenedStore,
    getWindow,
    isFullscreenWindow,
    maxZIndex,
    WindowStore,
  } from "../../../ts/applogic/store";
  import { getWindowElement } from "../../../ts/window/main";
  import SideloadedWindow from "./WindowStore/SideloadedWindow.svelte";
  import Window from "./WindowStore/Window.svelte";

  let oa: App[] = [];

  WindowStore.subscribe((v) => {
    oa = [];

    if (v) oa = v;

    const openedStore = getOpenedStore();

    for (let i = 0; i < openedStore.length; i++) {
      if (openedStore[i].state.windowState.fll)
        return isFullscreenWindow.set(true);
    }

    isFullscreenWindow.set(false);
  });

  focusedWindowId.subscribe((v) => {
    if (getWindow(v)?.info.custom) return;

    $maxZIndex++;

    if (!v || v.startsWith("error_")) {
      if (!v) return;

      const el = document.querySelector(`#${v}`) as HTMLDivElement;

      if (!el) return;

      el.style.zIndex = `${$maxZIndex}`;

      return;
    }

    const appData = getWindow(v);

    if (!appData) return;

    const element = getWindowElement(appData);

    if (!element) return;

    element.style.zIndex = `${$maxZIndex}`;
  });
</script>

<div class="winstore">
  {#each oa as app}
    {#if app}
      {#if app.sideloaded}
        <SideloadedWindow tag={app.id} {app} />
      {:else}
        <Window {app} />
      {/if}
    {/if}
  {/each}
</div>
