<script lang="ts">
  import { dragWindow } from "../../../../ts/applogic/drag";
  import type { App } from "../../../../ts/applogic/interface";
  import { onMount } from "svelte";
  import Content from "./Window/Content.svelte";
  import Titlebar from "./Window/Titlebar.svelte";
  import {
    maxSizeExceedsLiteral,
    minSizeExceedsLiteral,
  } from "../../../../ts/applogic/error";

  export let app: App = null;

  let cssString = "";
  let window: HTMLDivElement;
  let posUsed = false;
  let titlebar: HTMLDivElement;

  export let exttransition = false;
  export let opened = false;

  onMount(() => {
    setTimeout(() => {
      opened = true;
    }, 250);

    update();
  });

  function update() {
    if (app.minSize.w > app.size.w || app.minSize.h > app.size.h)
      return minSizeExceedsLiteral(app);

    if (app.maxSize.w < app.minSize.w || app.maxSize.h < app.minSize.h)
      return maxSizeExceedsLiteral(app);

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
      cssString += `width: ${app.size.w}px;`;
      cssString += `height: ${app.size.h}px;`;
    }

    dragWindow(app, window, titlebar);
  }
</script>

<div
  class="window"
  class:headless={app.state.headless || app.state.windowState.fll}
  class:resizable={app.state.resizable}
  class:min={app.state.windowState.min}
  class:max={app.state.windowState.max}
  class:visible={opened}
  class:exttransition
  class:fullscreen={app.state.windowState.fll}
  class:glass={app.glass}
  style={cssString}
  id={app.id}
  bind:this={window}
>
  <Titlebar {app} bind:exttransition bind:opened bind:titlebar />
  <Content {app}>
    <slot />
  </Content>
</div>
