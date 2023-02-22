<script lang="ts">
  import { onMount } from "svelte";
  import "../../../css/desktop/contextmenu.css";
  import type { App, ContextMenuItem } from "../../../ts/applogic/interface";
  import { getWindow, maxZIndex } from "../../../ts/applogic/store";
  import {
    composePosition,
    getComposedClassName,
    getContextEntry,
    getScopedElement,
  } from "../../../ts/contextmenu/main";
  import { getWindowElementByEvent } from "../../../ts/window/main";

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
    e.preventDefault();

    const mW = menuElement.offsetWidth;
    const mH = menuElement.offsetHeight;

    [x, y] = composePosition(e, mW, mH);

    const windowElement = getWindowElementByEvent(e);

    if (!windowElement) return;

    const windowData = getWindow(windowElement.id);

    const lastClass = `.${getComposedClassName(e)}`;

    const el = getScopedElement(windowElement, lastClass);

    if (!el) return;

    items = getContextEntry(windowElement.id, lastClass) || [];

    if (!items.length) return;

    scope = lastClass;
    window = windowData;
    scopeMap = el.dataset;

    setTimeout(() => {
      show = true;
    });
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
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div on:click={() => item.action(window, scopeMap, scope)}>
        {item.caption}
      </div>
    {/each}
  {/if}
</div>
