<script lang="ts">
  import "../../../css/desktop/actioncenter.css";
  import { maxZIndex } from "../../../ts/applogic/store";
  import { ActionCenterOpened } from "../../../ts/desktop/actioncenter/main";
  import { NotificationStore } from "../../../ts/notiflogic/main";
  import Notifications from "./ActionCenter/Notifications.svelte";
  import QuickSettings from "./ActionCenter/QuickSettings.svelte";

  let opened = false;

  ActionCenterOpened.subscribe((v) => (opened = v));
</script>

<div
  class="actioncenter-shade"
  class:opened
  on:click={() => ($ActionCenterOpened = false)}
  style="z-index: {$maxZIndex + 3};"
/>
<div class="actioncenter" class:opened style="z-index: {$maxZIndex + 4};">
  <h3 class="title">
    Notifications <button
      class="clear"
      on:click={() => NotificationStore.set({})}
      disabled={!Object.entries($NotificationStore).length}>Clear</button
    >
  </h3>
  <Notifications />
  <QuickSettings />
</div>
