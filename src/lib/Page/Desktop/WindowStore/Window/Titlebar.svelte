<script lang="ts">
  import { closeWindow } from "../../../../../ts/applogic/events";
  import { getAppIcon } from "../../../../../ts/applogic/icon";
  import type { App, Process } from "../../../../../ts/applogic/interface";
  import { updateStores } from "../../../../../ts/applogic/store";
  import { closeErrorProcess } from "../../../../../ts/errorlogic/main";
  import { UserData } from "../../../../../ts/userlogic/interfaces";
  import { titlebarButtons } from "../../../../../ts/window/titlebar/store";
  import Default from "./Controls/Default.svelte";

  export let exttransition = false;
  export let titlebar: HTMLDivElement;
  export let app: App;
  export let isBoot = false;
  export let process: Process;

  function min() {
    process.windowState.minimized = !process.windowState.minimized;

    updateStores();
  }

  function max() {
    if (!app.controls.maximized) return;

    process.windowState.maximized = !process.windowState.maximized;

    if (process.windowState.maximized) exttransition = true;
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

    if (errorId > 0) closeErrorProcess(errorId);
    else closeWindow(process.id);

    /* if (isBoot) app = false; */
  }
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  class="titlebar"
  bind:this={titlebar}
  on:dblclick={max}
  class:centered={$UserData.sh.window.centertb}
>
  <div class="centeredtitle">{app.info.name}{app.info.titleSuffix || ""}</div>
  <p class="title">
    <img class="icon" src={getAppIcon(app)} alt={app.info.name} />
    <span>
      {app.info.name}{app.info.titleSuffix || ""}
    </span>
  </p>
  <div class="controls">
    {#if $UserData.sh.window.buttons}
      <svelte:component
        this={titlebarButtons[$UserData.sh.window.buttons].content}
        {cls}
        {min}
        {max}
        {app}
        {isBoot}
      />
    {:else}
      <Default {app} {cls} {min} {max} {isBoot} />
    {/if}
  </div>
</div>
