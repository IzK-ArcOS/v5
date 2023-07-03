<script lang="ts">
  import { onMount } from "svelte";
  import { generateCSS } from "../../../../ts/applogic/css";
  import { dragWindow } from "../../../../ts/applogic/drag";
  import type { App, Process } from "../../../../ts/applogic/interface";
  import type { ProcessRuntime } from "../../../../ts/applogic/runtime/main";
  import {
    draggingPid,
    leftZoneTriggered,
    rightZoneTriggered,
  } from "../../../../ts/applogic/snapzones/store";
  import {
    AppStore,
    ProcessStore,
    focusedProcessPid,
  } from "../../../../ts/applogic/store";
  import { UserData } from "../../../../ts/userlogic/interfaces";
  import OverlayableWindow from "./OverlayableWindow.svelte";
  import Content from "./Window/Content.svelte";
  import Titlebar from "./Window/Titlebar.svelte";
  import { Log, LogLevel } from "../../../../ts/console";

  export let app: App = null;
  export let pid: number;
  export let process: Process;

  export let visible = true;
  export let max = false;
  export let isBoot = false;

  let cssString = "";
  let window: HTMLDivElement;
  let posUsed = false;
  let titlebar: HTMLDivElement;
  let runtime: ProcessRuntime;

  ProcessStore.subscribe((v) => {
    process = v[pid];

    max = process.windowState.maximized;
  });

  export let exttransition = false;

  onMount(() => {
    focusedProcessPid.set(pid);

    update();
  });

  function update() {
    if (!app)
      return Log({
        source: "Window.svelte",
        msg: `Process ${process.id} may not have a valid application.`,
        level: LogLevel.warn,
      });
    if (app.minSize.w > app.initialSize.w || app.minSize.h > app.initialSize.h)
      return;

    if (app.maxSize.w < app.minSize.w || app.maxSize.h < app.minSize.h) return;

    console.log(pid);

    if (pid > 0) cssString = generateCSS(pid, !posUsed);

    if (!posUsed) posUsed = true;

    if (!app.info.custom && window) dragWindow(pid, window, titlebar);
  }

  AppStore.subscribe(() => {
    if (!app)
      return Log({
        source: "Window.svelte",
        msg: `Process ${process.id} may not have a valid application.`,
        level: LogLevel.warn,
      });
    if (!app.info.custom && window) dragWindow(pid, window, titlebar);

    update();
  });

  function handleMouse() {
    $focusedProcessPid = pid;
  }

  focusedProcessPid.subscribe((v) => {
    if (!app || !app.events) return;

    if (v == pid && app.events.focus) app.events.focus(pid);
    if (v != pid && app.events.blur) app.events.blur(pid);
  });
  /* 
  onMount(() => {
    if (app.runtime) runtime = new app.runtime(app, app.events);
  }); */

  $: process, app, pid;
</script>

{#if app && process && pid}
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <window
    class:window={!app.info.custom}
    class:focused={pid == $focusedProcessPid}
    class:headless={app.windowProperties.headless ||
      process.windowState.fullscreen}
    class:visible
    class:resizable={app.windowProperties.resizable}
    class:min={process.windowState.minimized}
    class:max
    class:exttransition
    class:fullscreen={process.windowState.fullscreen || app.info.custom}
    class:glass={app.glass}
    class:lefttb={$UserData.sh.window.lefttb}
    class:custom={app.info.custom}
    class:child={!!process.parentPid}
    class:snapped={process.snapped}
    class:snapping={pid == $draggingPid &&
      ($leftZoneTriggered || $rightZoneTriggered)}
    style={cssString}
    id={app.id}
    data-pid={pid}
    bind:this={window}
    on:mousedown={handleMouse}
  >
    <Titlebar {app} bind:exttransition bind:titlebar {isBoot} {process} />
    <Content {process}>
      <slot />
    </Content>
    {#if app && process.overlayProcesses}
      {#each Object.entries(process.overlayProcesses) as overlay}
        <OverlayableWindow {process} overlay={overlay[1]} id={overlay[0]} />
      {/each}
    {/if}

    <!-- {#if app && app.errorOverlays}
    {#each app.errorOverlays as error}
      <OverlayableErrorWindow {error} {app} />
    {/each}
  {/if} -->
  </window>
{/if}
