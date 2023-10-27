<script lang="ts">
  import {
    isFullscreenWindow,
    maxZIndex,
  } from "../../../../../ts/applogic/store";
  import { UserData, UserName } from "../../../../../ts/userlogic/interfaces";
  import Tray from "../../Taskbar/Tray.svelte";
  import Clock from "./TopBar/Clock.svelte";
  import CurrentApp from "./TopBar/CurrentApp.svelte";
  import Power from "./TopBar/Power.svelte";
</script>

<div
  class="launcher-topbar shell-colored"
  class:docked={$UserData.sh.taskbar.docked}
  class:colored={$UserData.sh.taskbar.colored}
  class:visible={!$isFullscreenWindow}
  data-contextmenu="clockcontext"
  style="z-index: {$maxZIndex + 5}"
>
  <CurrentApp />
  <Clock />
  <Tray hasClock={false}>
    <Power />
    <span>
      {$UserName}
    </span>
  </Tray>
</div>
