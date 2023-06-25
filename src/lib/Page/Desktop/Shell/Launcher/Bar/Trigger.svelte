<script lang="ts">
  import { maxZIndex } from "../../../../../../ts/applogic/store";

  export let visible = false;
  export let dockfocused: boolean;
  export let interval: NodeJS.Timeout;

  function mouseenter() {
    visible = true;
  }

  function mouseleave() {
    clearTimeout(interval);

    if (dockfocused) return;

    interval = setTimeout(() => {
      visible = false;
    }, 1000);
  }
</script>

<div
  class="launcher-bar-trigger"
  style="z-index: {$maxZIndex + 21}"
  on:mouseenter={mouseenter}
  on:mouseleave={mouseleave}
/>
