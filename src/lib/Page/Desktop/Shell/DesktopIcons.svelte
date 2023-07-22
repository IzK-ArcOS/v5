<script lang="ts">
  import "../../../../css/desktop/desktopicons.css";
  import { isPopulatable } from "../../../../ts/applogic/checks";
  import { WindowStore } from "../../../../ts/applogic/store";
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
    {#each $WindowStore as app}
      {#if isPopulatable(app) || $UserData.sh.showHiddenApps}
        <DesktopIcon {app} />
      {/if}
    {/each}
  </div>
{/if}
