<script lang="ts">
  import { isFullscreenWindow, maxZIndex } from "../../../../ts/applogic/store";
  import { UserData } from "../../../../ts/userlogic/interfaces";
  import TaskbarContent from "./TaskbarContent.svelte";
</script>

<div
  class="taskbar-h newtb"
  style="z-index: {$maxZIndex + 3};"
  class:docked={$UserData.sh.taskbar.docked}
  class:centered={$UserData.sh.taskbar.centered}
  class:colored={$UserData.sh.taskbar.colored}
  class:visible={$UserData.sh.taskbar.pos == "" && !$isFullscreenWindow}
  data-caller="shell-taskbar"
>
  <slot />
  <TaskbarContent />
</div>
