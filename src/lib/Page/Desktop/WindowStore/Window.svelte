<script lang="ts">
  import { dragWindow } from "../../../../ts/applogic/drag";
  import type { App } from "../../../../ts/applogic/interface";
  import { closeWindow } from "../../../../ts/applogic/events";
  import { updateStores } from "../../../../ts/applogic/store";
  import { onMount } from "svelte";

  export let app: App;

  let cssString = "";
  let window: HTMLDivElement;
  let exttransition = false;
  let posUsed = false;
  let opened = false;

  onMount(() => {
    setTimeout(() => {
      opened = true;
    }, 250);

    update();
  });

  function update() {
    cssString = "";

    if (!app.state.windowState.max) {
      cssString += `min-width: ${app.minSize.w}px;`;
      cssString += `min-height: ${app.minSize.h}px;`;
      cssString += `max-width: ${app.maxSize.w}px;`;
      cssString += `max-height: ${app.maxSize.h}px;`;
      if (!posUsed) {
        posUsed = true;

        cssString += `left: ${app.pos.x}px;`;
        cssString += `top: ${app.pos.y}px;`;
      }
      cssString += `width: ${app.size.w}px`;
      cssString += `height: ${app.size.h}px`;
    }

    dragWindow(app, window);
  }

  function min() {
    app.state.windowState.min = !app.state.windowState.min;

    updateStores();
    update();
  }

  function max() {
    app.state.windowState.max = !app.state.windowState.max;

    if (app.state.windowState.max) exttransition = true;
    else {
      setTimeout(() => {
        exttransition = false;
      }, 200);
    }

    update();
    updateStores();
  }
  function cls() {
    opened = false;

    setTimeout(() => {
      update();
      closeWindow(app.id);
    }, 250);
  }
</script>

<div
  class="window"
  class:headless={app.state.headless}
  class:resizable={app.state.resizable}
  class:min={app.state.windowState.min}
  class:max={app.state.windowState.max}
  class:visible={opened}
  class:exttransition
  class:fullscreen={app.state.windowState.fll}
  style={cssString}
  bind:this={window}
>
  <div class="titlebar">
    <p class="title">{app.info.name}</p>
    <div class="controls">
      {#if app.controls.min}
        <button class="material-icons" on:click={min}>minimize</button>
      {/if}
      {#if app.controls.max}
        <button class="material-icons" on:click={max}>crop_square</button>
      {/if}
      {#if app.controls.cls}
        <button class="material-icons" on:click={cls}>close</button>
      {/if}
    </div>
  </div>
  <div class="body">
    <svelte:component this={app.content} {app} />
  </div>
</div>
