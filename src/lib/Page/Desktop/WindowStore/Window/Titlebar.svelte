<script lang="ts">
  import { closeWindow } from "../../../../../ts/applogic/events";
  import { getAppIcon } from "../../../../../ts/applogic/icon";
  import type { App } from "../../../../../ts/applogic/interface";
  import { updateStores } from "../../../../../ts/applogic/store";
  import { closeError } from "../../../../../ts/errorlogic/main";
  import { UserData } from "../../../../../ts/userlogic/interfaces";
  import Default from "./Controls/Default.svelte";
  import Traffic from "./Controls/Traffic.svelte";

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
    if (app.id.startsWith("error_"))
      closeError(parseInt(app.id.replace("error_", "")));
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
    {#if $UserData.sh.window.traffic}
      <Traffic {cls} {min} {max} {app} {isBoot} />
    {:else}
      <Default {cls} {min} {max} {app} {isBoot} />
    {/if}
  </div>
</div>
