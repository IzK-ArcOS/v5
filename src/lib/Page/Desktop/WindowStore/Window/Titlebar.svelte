<script lang="ts">
  import { closeWindow } from "../../../../../ts/applogic/events";
  import type { App } from "../../../../../ts/applogic/interface";
  import { updateStores } from "../../../../../ts/applogic/store";
  import { closeError } from "../../../../../ts/errorlogic/main";

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
    <img class="icon" src={app.info.icon} alt={app.info.name} />
    {app.info.name}{app.info.titleSuffix || ""}
    {#if isBoot}
      (In recovery mode)
    {/if}
  </p>
  <div class="controls">
    <button
      class="material-icons"
      on:click={min}
      disabled={!app.controls.min || isBoot}
    >
      minimize
    </button>
    <button
      class="material-icons"
      on:click={max}
      disabled={!app.controls.max || isBoot}
    >
      crop_square
    </button>
    <button
      class="material-icons"
      on:click={cls}
      disabled={!app.controls.cls || isBoot}
    >
      close
    </button>
  </div>
</div>
