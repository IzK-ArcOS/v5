<script lang="ts">
  import "@css/desktop/actioncenter.css";
  import { maxZIndex } from "$$ts/applogic/store";
  import { ActionCenterOpened } from "$$ts/desktop/actioncenter/main";
  import { CurrentNotification, NotificationStore } from "$$ts/notiflogic/main";
  import { UserData } from "$$ts/userlogic/interfaces";
  import Notifications from "./ActionCenter/Notifications.svelte";
  import QuickSettings from "./ActionCenter/QuickSettings.svelte";
  import QuickSettingsToggle from "./ActionCenter/QuickSettingsToggle.svelte";

  let opened = false;

  ActionCenterOpened.subscribe((v) => (opened = v));

  function clear() {
    NotificationStore.set({});
    CurrentNotification.set(null);
  }
</script>

<div
  class="actioncenter-shade"
  class:opened
  on:click={() => ($ActionCenterOpened = false)}
  style="z-index: {$maxZIndex + 3};"
/>
<div
  class="actioncenter"
  class:docked={$UserData.sh.taskbar.docked}
  class:opened
  class:noquick={$UserData.sh.noQuickSettings}
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
