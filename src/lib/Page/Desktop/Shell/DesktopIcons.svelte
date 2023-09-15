<script lang="ts">
  import { onMount } from "svelte";
  import "../../../../css/desktop/desktopicons.css";
  import { isPopulatable } from "../../../../ts/applogic/checks";
  import type { App } from "../../../../ts/applogic/interface";
  import { WindowStore } from "../../../../ts/applogic/store";
  import { UserData } from "../../../../ts/userlogic/interfaces";
  import DesktopIcon from "./DesktopIcons/DesktopIcon.svelte";

  let store: App[] = [];
  let loading = false;

  function update() {
    const len = store.length;
    const newStore = $WindowStore.filter((a) => isPopulatable(a));

    if (newStore.length !== len) store = newStore;
  }

  onMount(update);
  WindowStore.subscribe(update);
  UserData.subscribe(update);
</script>

{#if !loading}
  {#if $UserData.sh.desktop.icons}
    <div
      class="desktopIcons"
      class:launcher={$UserData.sh.taskbar.isLauncher}
      class:undocked-launcher={$UserData.sh.taskbar.isLauncher &&
        !$UserData.sh.taskbar.docked}
    >
      {#each store as app}
        <DesktopIcon {app} />
      {/each}
    </div>
  {/if}
{/if}
