<script lang="ts">
  import "../../../../css/desktop/shell/shade.css";
  import { showShellShade } from "../../../../ts/applogic/apps/shell";
  import { maxZIndex } from "../../../../ts/applogic/store";
  import { actionCenterOpened } from "../../../../ts/desktop/actioncenter/main";
  import { startOpened } from "../../../../ts/desktop/main";

  actionCenterOpened.subscribe(update);
  startOpened.subscribe(update);

  function update() {
    $showShellShade = $startOpened || $actionCenterOpened;
  }

  function closeAll() {
    startOpened.set(false);
    actionCenterOpened.set(false);
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  class="shellshade"
  style="z-index: {$maxZIndex + 3};"
  class:visible={$showShellShade}
  on:click={closeAll}
/>
