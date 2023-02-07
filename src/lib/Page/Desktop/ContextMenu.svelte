<script lang="ts">
  import "../../../assets/desktop/contextmenu.css";
  import { onMount } from "svelte";
  import { maxZIndex } from "../../../ts/applogic/store";
  import { composePosition } from "../../../ts/contextmenu/main";
  import {
    getWindowElement,
    getWindowElementByEvent,
  } from "../../../ts/window/main";

  let x = 0;
  let y = 0;
  let show = false;

  let menuElement: HTMLDivElement;

  onMount(() => {
    document.addEventListener("contextmenu", handleEvent);
    document.addEventListener("mousedown", (e: MouseEvent) => {
      if (e.button != 0 || e.composedPath().includes(menuElement)) return;

      show = false;
    });
  });

  function handleEvent(e: MouseEvent) {
    console.log(e);
    e.preventDefault();

    const mW = menuElement.offsetWidth;
    const mH = menuElement.offsetHeight;

    [x, y] = composePosition(e, mW, mH);

    const windowId = getWindowElementByEvent(e);

    console.log(windowId);

    show = true;
  }
</script>

<div
  class="contextmenu"
  class:show
  bind:this={menuElement}
  style="top: {y}px; left: {x}px; z-index: {$maxZIndex + 10}"
/>
