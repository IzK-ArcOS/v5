<script lang="ts">
  import "../../../../css/desktop/shell/shade.css";
  import { showShellShade } from "../../../../ts/applogic/apps/shell";
  import { maxZIndex } from "../../../../ts/applogic/store";
  import { ActionCenterOpened } from "../../../../ts/desktop/actioncenter/main";
  import { startOpened } from "../../../../ts/desktop/main";

  ActionCenterOpened.subscribe(update);
  startOpened.subscribe(update);

  function update() {
    $showShellShade = $startOpened || $ActionCenterOpened;
  }

  function closeAll() {
    startOpened.set(false);
    ActionCenterOpened.set(false);
  }
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  class="shellshade"
  style="z-index: {$maxZIndex + 3};"
  class:visible={$showShellShade}
  on:click={closeAll}
/>
