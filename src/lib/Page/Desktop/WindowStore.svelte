<script lang="ts">
  import type { App } from "../../../ts/applogic/interface";

  import {
    focusedWindowId,
    getWindow,
    maxZIndex,
    OpenApps,
  } from "../../../ts/applogic/store";
  import { ErrorMessages } from "../../../ts/errorlogic/app";
  import { getErrorElement } from "../../../ts/errorlogic/main";
  import { getWindowElement } from "../../../ts/window/main";
  import ErrorDialogStore from "./ErrorDialogStore.svelte";
  import Window from "./WindowStore/Window.svelte";

  let oa: App[] = [];

  OpenApps.subscribe((v) => {
    oa = [];

    if (v) oa = v;
  });

  focusedWindowId.subscribe((v) => {
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
      <Window {app} />
    {/if}
  {/each}
</div>
