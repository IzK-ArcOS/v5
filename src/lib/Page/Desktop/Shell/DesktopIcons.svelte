<script lang="ts">
  import "../../../../css/desktop/desktopicons.css";
  import { isPopulatable } from "../../../../ts/applogic/checks";
  import { WindowStore } from "../../../../ts/applogic/store";
  import sleep from "../../../../ts/sleep";
  import { UserData } from "../../../../ts/userlogic/interfaces";
  import DesktopIcon from "./DesktopIcons/DesktopIcon.svelte";

  let loading = false;

  UserData.subscribe(async () => {
    loading = true;

    await sleep(0);

    loading = false;
  });
</script>

{#if !loading}
  {#if $UserData.sh.desktop.icons}
    <div
      class="desktopIcons"
      class:launcher={$UserData.sh.taskbar.isLauncher}
      class:undocked-launcher={$UserData.sh.taskbar.isLauncher &&
        !$UserData.sh.taskbar.docked}
    >
      {#each $WindowStore as app}
        {#if isPopulatable(app)}
          <DesktopIcon {app} />
        {/if}
      {/each}
    </div>
  {/if}
{/if}
