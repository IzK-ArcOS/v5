<script lang="ts">
  import { updateStores } from "../../../../../ts/applogic/store";
  import type { App } from "../../../../../ts/applogic/interface";
  import { closeWindow } from "../../../../../ts/applogic/events";

  export let opened = false;
  export let exttransition = false;
  export let titlebar: HTMLDivElement;
  export let app: App;

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
    opened = false;

    setTimeout(() => {
      closeWindow(app.id);
    }, 250);
  }
</script>

<div class="titlebar" bind:this={titlebar} on:dblclick={max}>
  <p class="title">{app.info.name}{app.info.titleSuffix || ""}</p>
  <div class="controls">
    <button class="material-icons" on:click={min} disabled={!app.controls.min}>
      minimize
    </button>
    <button class="material-icons" on:click={max} disabled={!app.controls.max}>
      crop_square
    </button>
    <button class="material-icons" on:click={cls} disabled={!app.controls.cls}>
      close
    </button>
  </div>
</div>
