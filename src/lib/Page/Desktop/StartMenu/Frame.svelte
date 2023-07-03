<script lang="ts">
  import { maxZIndex } from "../../../../ts/applogic/store";

  import { startOpened } from "../../../../ts/desktop/main";

  function closeStart() {
    $startOpened = false;
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  class="startframe fullscreen"
  class:present={$startOpened}
  style="z-index: {$maxZIndex + 1};"
  on:click={closeStart}
/>
