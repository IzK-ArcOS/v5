<script lang="ts">
  import { closeWindow } from "../../../../../ts/applogic/events";
  import { getAppIcon } from "../../../../../ts/applogic/icon";
  import type { App } from "../../../../../ts/applogic/interface";
  import { canMaximize } from "../../../../../ts/applogic/maximize";
  import { WindowStore, updateStores } from "../../../../../ts/applogic/store";
  import { closeError } from "../../../../../ts/errorlogic/main";
  import { UserData } from "../../../../../ts/userlogic/interfaces";
  import { titlebarButtons } from "../../../../../ts/window/titlebar/store";
  import Default from "./Controls/Default.svelte";

  export let exttransition = false;
  export let titlebar: HTMLDivElement;
  export let app: App;
  export let isBoot = false;

  let canMax = true;

  WindowStore.subscribe(() => {
    if (!app) return;

    canMax = canMaximize(app);
  });

  function min() {
    app.state.windowState.min = !app.state.windowState.min;

    updateStores();
  }

  function max() {
    if (!app.controls.max) return;

    app.state.windowState.max = !app.state.windowState.max;

    if (app.state.windowState.max) exttransition = true;
    else {
      setTimeout(() => {
        exttransition = false;
      }, 200);
    }

    updateStores();
  }

  function cls() {
    const id = app.id;
    const errorId = id.startsWith("error_")
      ? parseInt(id.replace("error_", ""))
      : -1;

    if (errorId > 0) closeError(errorId);
    else closeWindow(app.id);

    if (isBoot) app.opened = false;
  }
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  class="titlebar"
  bind:this={titlebar}
  on:dblclick={max}
  class:centered={$UserData && $UserData.sh.window.centertb}
  data-contextmenu="window-titlebar"
  data-appid={app.id}
>
  <div class="centeredtitle">{app.info.name}{app.info.titleSuffix || ""}</div>
  <p class="title">
    <img class="icon" src={getAppIcon(app)} alt={app.info.name} />
    <span>
      {app.info.name}{app.info.titleSuffix || ""}
    </span>
  </p>
  <div class="controls">
    {#if $UserData && $UserData.sh.window.buttons}
      <svelte:component
        this={titlebarButtons[$UserData.sh.window.buttons].content}
        {cls}
        {min}
        {max}
        {app}
        {isBoot}
        {canMax}
      />
    {:else}
      <Default {app} {cls} {min} {max} {isBoot} {canMax} />
    {/if}
  </div>
</div>
