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
  import { generateCSS } from "../../../../ts/applogic/css";
  import { focusedWindowId } from "../../../../ts/applogic/store";

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

    cssString = generateCSS(app, !posUsed);

    if (!posUsed) posUsed = true;

    dragWindow(app, window, titlebar);
  }
</script>

<div
  class="window"
  class:focused={app.id == $focusedWindowId}
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
  on:mousedown={() => ($focusedWindowId = app.id)}
>
  <Titlebar {app} bind:exttransition bind:opened bind:titlebar />
  <Content {app}>
    <slot />
  </Content>
</div>
