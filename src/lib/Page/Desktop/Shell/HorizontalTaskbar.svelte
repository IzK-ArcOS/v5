<script lang="ts">
  import { isFullscreenWindow, maxZIndex } from "../../../../ts/applogic/store";
  import { UserData } from "../../../../ts/userlogic/interfaces";
  import TaskbarContent from "./TaskbarContent.svelte";
</script>

<div
  class="taskbar-h newtb shell-colored"
  style="z-index: {$maxZIndex + 5};"
  class:docked={$UserData.sh.taskbar.docked}
  class:centered={$UserData.sh.taskbar.centered}
  class:colored={$UserData.sh.taskbar.colored}
  class:visible={$UserData.sh.taskbar.pos == "" && !$isFullscreenWindow}
  data-contextmenu="shell-taskbar"
>
  <slot />
  <TaskbarContent />
</div>
