<script lang="ts">
  import "../../../css/desktop/contextmenu.css";
  import { onMount } from "svelte";
  import { maxZIndex } from "../../../ts/applogic/store";
  import { composePosition } from "../../../ts/contextmenu/main";
  import {
    getWindowElement,
    getWindowElementByEvent,
  } from "../../../ts/window/main";

  let x = 0;
  let y = 0;
  let path = "";
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
    e.preventDefault();

    const mW = menuElement.offsetWidth;
    const mH = menuElement.offsetHeight;

    [x, y] = composePosition(e, mW, mH);

    const window = getWindowElementByEvent(e);

    show = true;

    if (!window) return;

    path = "";

    const p = e.composedPath() as HTMLDivElement[];

    let lastClass = "";

    for (let i = 0; i < p.length; i++) {
      const tag = p[i].tagName;

      if (!tag) continue;

      if (tag.toLowerCase() == "button") {
        lastClass = p[i].className.split(" ").join(".");

        break;
      }
    }

    console.log(
      window,
      e.composedPath(),
      window.querySelector(`.${lastClass}`),
      lastClass
    );

    path = `.${lastClass}`;
  }
</script>

<div
  class="contextmenu"
  class:show
  bind:this={menuElement}
  style="top: {y}px; left: {x}px; z-index: {$maxZIndex + 10}"
>
  pos -> {x}x{y}<br /><br />
  {path}
</div>
