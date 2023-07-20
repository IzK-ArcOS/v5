<script lang="ts">
  import { onMount } from "svelte";
  import { generateCSS } from "../../../../ts/applogic/css";
  import { dragWindow } from "../../../../ts/applogic/drag";
  import type { App } from "../../../../ts/applogic/interface";
  import type { AppRuntime } from "../../../../ts/applogic/runtime/main";
  import {
    draggingId,
    leftZoneTriggered,
    rightZoneTriggered,
  } from "../../../../ts/applogic/snapzones/store";
  import { WindowStore, focusedWindowId } from "../../../../ts/applogic/store";
  import { UserData } from "../../../../ts/userlogic/interfaces";
  import OverlayableErrorWindow from "./OverlayableErrorWindow.svelte";
  import OverlayableWindow from "./OverlayableWindow.svelte";
  import Content from "./Window/Content.svelte";
  import Titlebar from "./Window/Titlebar.svelte";
  import { ArcSoundBus } from "../../../../ts/sound/main";

  export let app: App = null;

  export let visible = false;
  export let max = false;
  export let isBoot = false;

  let cssString = "";
  let window: HTMLDivElement;
  let posUsed = false;
  let titlebar: HTMLDivElement;
  let runtime: AppRuntime;

  export let exttransition = false;

  onMount(() => {
    focusedWindowId.set(app.id);

    update();

    if (app.id.startsWith("error_")) ArcSoundBus.playSound("arcos.dialog.info");
  });

  function update() {
    if (app.minSize.w > app.size.w || app.minSize.h > app.size.h) return;
    if (app.maxSize.w < app.minSize.w || app.maxSize.h < app.minSize.h) return;

    cssString = generateCSS(app, !posUsed);

    if (!posUsed) posUsed = true;

    if (!app.info.custom) dragWindow(app, window, titlebar);
  }

  WindowStore.subscribe(() => {
    if (app.opened && !app.info.custom) dragWindow(app, window, titlebar);

    update();
  });

  function handleMouse() {
    $focusedWindowId = app.id;
  }

  focusedWindowId.subscribe((v) => {
    if (!app || !app.events) return;

    if (v == app.id && app.events.focus) app.events.focus(app);
    if (v != app.id && app.events.blur) app.events.blur(app);
  });

  onMount(() => {
    if (app.runtime) runtime = new app.runtime(app);
  });
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<window
  class:window={!app.info.custom}
  class:focused={app.id == $focusedWindowId}
  class:headless={app.state.headless || app.state.windowState.fll}
  class:resizable={app.state.resizable}
  class:min={app.state.windowState.min}
  class:max={app.state.windowState.max || max}
  class:visible={app.opened || visible}
  class:exttransition
  class:fullscreen={app.state.windowState.fll || app.info.custom}
  class:glass={app.glass}
  class:lefttb={$UserData && $UserData.sh.window.lefttb}
  class:custom={app.info.custom}
  class:child={!!app.parentId}
  class:snapped={app.snapped}
  class:snapping={app.id == $draggingId &&
    ($leftZoneTriggered || $rightZoneTriggered)}
  style={cssString}
  id={app.id}
  bind:this={window}
  on:mousedown={handleMouse}
>
  <Titlebar {app} bind:exttransition bind:titlebar {isBoot} />
  {#if !app.runtime ? true : runtime}
    <Content {app} {runtime}>
      <slot />
    </Content>
  {/if}
  {#if app && app.overlays && (!app.runtime ? true : runtime)}
    {#each Object.entries(app.overlays) as overlay}
      <OverlayableWindow {runtime} {app} overlay={overlay[1]} id={overlay[0]} />
    {/each}
  {/if}

  {#if app && app.errorOverlays}
    {#each app.errorOverlays as error}
      <OverlayableErrorWindow {error} {app} />
    {/each}
  {/if}
</window>
