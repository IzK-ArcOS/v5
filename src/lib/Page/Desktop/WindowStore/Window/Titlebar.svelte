<script lang="ts">
  import { closeWindow } from "../../../../../ts/applogic/events";
  import { getAppIcon } from "../../../../../ts/applogic/icon";
  import type { App } from "../../../../../ts/applogic/interface";
  import { updateStores } from "../../../../../ts/applogic/store";
  import { closeError } from "../../../../../ts/errorlogic/main";
  import { UserData } from "../../../../../ts/userlogic/interfaces";
  import { titlebarButtons } from "../../../../../ts/window/titlebar/store";
  import Default from "./Controls/Default.svelte";

  export let exttransition = false;
  export let titlebar: HTMLDivElement;
  export let app: App;
  export let isBoot = false;

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

<div class="titlebar" bind:this={titlebar} on:dblclick={max}>
  <p class="title">
    <img class="icon" src={getAppIcon(app)} alt={app.info.name} />
    <span>
      {app.info.name}{app.info.titleSuffix || ""}
      {#if isBoot}
        (In recovery mode)
      {/if}
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
