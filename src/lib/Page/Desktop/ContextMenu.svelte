<script lang="ts">
  import { onMount } from "svelte";
  import "../../../css/desktop/contextmenu.css";
  import type { App, ContextMenuItem } from "../../../ts/applogic/interface";
  import { getWindow, maxZIndex } from "../../../ts/applogic/store";
  import {
    composePosition,
    getContexMenuScope,
    getContextEntry,
  } from "../../../ts/contextmenu/main";
  import { getWindowElementByEvent } from "../../../ts/window/main";
  import Item from "./ContextMenu/Item.svelte";
  import { UserData } from "../../../ts/userlogic/interfaces";

  let x = 0;
  let y = 0;
  let show = false;
  let items: ContextMenuItem[] = [];
  let window: App;
  let scope: string;
  let scopeMap: DOMStringMap;

  let menuElement: HTMLDivElement;

  onMount(() => {
    document.addEventListener("contextmenu", handleEvent);
    document.addEventListener("mousedown", (e: MouseEvent) => {
      if (e.button != 0 || e.composedPath().includes(menuElement)) return;

      show = false;
    });
  });

  function handleEvent(e: MouseEvent) {
    show = false;
    items = [];

    e.preventDefault();

    const windowElement = getWindowElementByEvent(e);

    if (!windowElement) return;

    const windowData = getWindow(windowElement.id);

    const el = getContexMenuScope(e);

    if (!el) return;

    const contextmenu = el?.dataset.contextmenu;

    setTimeout(() => {
      items = getContextEntry(windowElement.id, contextmenu) || [];

      if (!items.length) return;

      scope = contextmenu;
      window = windowData;
      scopeMap = el.dataset;

      show = true;

      setTimeout(() => {
        const mW = menuElement.offsetWidth;
        const mH = menuElement.offsetHeight;

        [x, y] = composePosition(e, mW, mH);
      });
    });
  }
</script>

<div
  class="contextmenu shell-colored"
  class:show
  class:compact={$UserData.sh.compactContext}
  class:colored={$UserData.sh.taskbar.colored}
  bind:this={menuElement}
  style="top: {y}px; left: {x}px; z-index: {$maxZIndex + 10}"
>
  {#each items as item}
    <Item {window} {scope} {scopeMap} bind:show data={item} />
  {/each}
</div>
