<script lang="ts">
  import { DragEventData, draggable } from "@neodrag/svelte";
  import { onMount } from "svelte";
  import { generateCSS } from "../../../../ts/applogic/css";
  import type { App } from "../../../../ts/applogic/interface";
  import type { AppRuntime } from "../../../../ts/applogic/runtime/main";
  import { WindowStore, focusedWindowId } from "../../../../ts/applogic/store";
  import { ArcSoundBus } from "../../../../ts/sound/main";
  import { UserData } from "../../../../ts/userlogic/interfaces";
  import OverlayableErrorWindow from "./OverlayableErrorWindow.svelte";
  import OverlayableWindow from "./OverlayableWindow.svelte";
  import Content from "./Window/Content.svelte";
  import Titlebar from "./Window/Titlebar.svelte";

  export let app: App = null;
  export let visible = false;
  export let max = false;
  export let isBoot = false;

  let cssString = "";
  let titlebar: HTMLDivElement;
  let runtime: AppRuntime;
  let window: HTMLDivElement;

  export let exttransition = false;

  onMount(() => {
    focusedWindowId.set(app.id);

    update();

    if (app.id.startsWith("error_")) ArcSoundBus.playSound("arcos.dialog.info");
  });

  function update() {
    if (app.minSize.w > app.size.w || app.minSize.h > app.size.h) return;
    if (app.maxSize.w < app.minSize.w || app.maxSize.h < app.minSize.h) return;

    cssString = generateCSS(app);
  }

  WindowStore.subscribe(() => {
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

  function handleDragStart() {
    window.querySelectorAll("iframe").forEach((i) => {
      i.style.pointerEvents = "none";
    });
  }

  function handleDragEnd(e: CustomEvent<DragEventData>) {
    window.querySelectorAll("iframe").forEach((i) => {
      i.style.pointerEvents = "";
    });
  }
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
  class:colored={$UserData && $UserData.sh.taskbar.colored}
  style={cssString}
  id={app.id}
  on:mousedown={handleMouse}
  use:draggable={{
    disabled:
      app.state.windowState.max ||
      max ||
      app.core ||
      app.info.custom ||
      app.state.windowState.min ||
      !(app.opened || visible),
    handle: ".titlebar",
    bounds: { top: 0, left: 0, right: 0, bottom: -1000 },
    defaultPosition: { x: app.pos.x, y: app.pos.y },
  }}
  on:neodrag:start={handleDragStart}
  on:neodrag:end={handleDragEnd}
  bind:this={window}
>
  <div class="accent" />

  <Titlebar {app} bind:exttransition bind:titlebar {isBoot} />
  {#if (!app.runtime ? true : runtime) && (app.opened || app.core || app.info.preloaded)}
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
