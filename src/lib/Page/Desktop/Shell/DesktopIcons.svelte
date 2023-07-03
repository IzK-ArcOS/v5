<script lang="ts">
  import "../../../../css/desktop/desktopicons.css";
  import { isPopulatable } from "../../../../ts/applogic/checks";
  import { AppStore } from "../../../../ts/applogic/store";
  import { UserData } from "../../../../ts/userlogic/interfaces";
  import DesktopIcon from "./DesktopIcons/DesktopIcon.svelte";
</script>

{#if $UserData.sh.desktop.icons}
  <div
    class="desktopIcons"
    class:launcher={$UserData.sh.taskbar.isLauncher}
    class:undocked-launcher={$UserData.sh.taskbar.isLauncher &&
      !$UserData.sh.taskbar.docked}
  >
    {#each Object.entries($AppStore) as [id, app]}
      {#if isPopulatable(app)}
        <DesktopIcon {app} />
      {/if}
    {/each}
  </div>
{/if}
