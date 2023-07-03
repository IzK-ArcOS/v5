<script lang="ts">
  import "../../../css/desktop/actioncenter.css";
  import { maxZIndex } from "../../../ts/applogic/store";
  import { actionCenterOpened } from "../../../ts/desktop/actioncenter/main";
  import {
    CurrentNotification,
    NotificationStore,
  } from "../../../ts/notiflogic/main";
  import { UserData } from "../../../ts/userlogic/interfaces";
  import Notifications from "./ActionCenter/Notifications.svelte";
  import QuickSettings from "./ActionCenter/QuickSettings.svelte";
  import QuickSettingsToggle from "./ActionCenter/QuickSettingsToggle.svelte";

  let opened = false;

  actionCenterOpened.subscribe((v) => (opened = v));

  function clear() {
    NotificationStore.set({});
    CurrentNotification.set(null);
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
  class="actioncenter"
  class:docked={$UserData.sh.taskbar.docked}
  class:launcher={$UserData.sh.taskbar.isLauncher}
  class:opened
  class:noquick={$UserData.sh.noQuickSettings}
  class:colored={$UserData.sh.taskbar.colored}
  style="z-index: {$maxZIndex + 4};"
>
  <h3 class="title">
    Notifications <button
      class="clear"
      on:click={clear}
      disabled={!Object.entries($NotificationStore).length}>Clear</button
    >
  </h3>
  <Notifications />
  <QuickSettingsToggle />
  <QuickSettings />
</div>
