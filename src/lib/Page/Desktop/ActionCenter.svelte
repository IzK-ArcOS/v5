<script lang="ts">
  import "../../../css/desktop/actioncenter.css";
  import { maxZIndex } from "../../../ts/applogic/store";
  import { ActionCenterOpened } from "../../../ts/desktop/actioncenter/main";
  import Notifications from "./ActionCenter/Notifications.svelte";

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
  <Notifications />
</div>
