<script lang="ts">
  import { onMount } from "svelte";
  import "../../../css/desktop/contextmenu.css";
  import type { App, ContextMenuItem } from "../../../ts/applogic/interface";
  import { getWindow, maxZIndex } from "../../../ts/applogic/store";
  import {
    composePosition,
    getCallerScope,
    getContextEntry,
  } from "../../../ts/contextmenu/main";
  import { getWindowElementByEvent } from "../../../ts/window/main";
  import Item from "./ContextMenu/Item.svelte";

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

    e.preventDefault();

    const mW = menuElement.offsetWidth;
    const mH = menuElement.offsetHeight;

    [x, y] = composePosition(e, mW, mH);

    const windowElement = getWindowElementByEvent(e);

    if (!windowElement) return;

    const windowData = getWindow(windowElement.id);

    const el = getCallerScope(e);

    const caller = el?.dataset.caller;

    console.log(el.dataset);

    if (!el) return;

    items = getContextEntry(windowElement.id, caller) || [];

    if (!items.length) return;

    scope = caller;
    window = windowData;
    scopeMap = el.dataset;

    setTimeout(() => {
      show = true;
    }, 100);
  }
</script>

<div
  class="contextmenu"
  class:show
  bind:this={menuElement}
  style="top: {y}px; left: {x}px; z-index: {$maxZIndex + 10}"
>
  {#if show}
    {#each items as item}
      <Item {window} {scope} {scopeMap} bind:show data={item} />
    {/each}
  {/if}
</div>
