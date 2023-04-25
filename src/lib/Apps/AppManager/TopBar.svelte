<script lang="ts">
  import { staticAppManActions } from "../../../ts/applogic/apps/AppManager/store";
  import Action from "./TopBar/Action.svelte";
  import AppInfo from "./TopBar/AppInfo.svelte";
  import Close from "./TopBar/Close.svelte";
  import DisableApp from "./TopBar/DisableApp.svelte";
</script>

<div class="topbar">
  <div class="actions">
    <AppInfo />
    <div class="sep" />
    <DisableApp />
    <Close />
    <div class="sep" />
    {#each staticAppManActions as action}
      <Action {action} />
    {/each}
  </div>
</div>
