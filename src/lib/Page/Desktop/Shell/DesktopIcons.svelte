<script lang="ts">
  import { onMount } from "svelte";
  import "../../../../css/desktop/desktopicons.css";
  import { isPopulatable } from "../../../../ts/applogic/checks";
  import type { App } from "../../../../ts/applogic/interface";
  import { WindowStore } from "../../../../ts/applogic/store";
  import { alignDesktopIcons } from "../../../../ts/desktop/icons";
  import { UserData } from "../../../../ts/userlogic/interfaces";
  import DesktopIcon from "./DesktopIcons/DesktopIcon.svelte";

  let store: App[] = [];
  let loading = false;

  async function update() {
    if (
      !$UserData.appdata["ArcShell"] ||
      !Object.keys($UserData.appdata["ArcShell"]).join(",").includes("icon$")
    ) {
      loading = true;
      await alignDesktopIcons(true);

      setTimeout(() => {
        loading = false;
      }, 100);
    }

    const len = store.length;
    const newStore = $WindowStore.filter((a) => isPopulatable(a));

    if (newStore.length !== len) {
      loading = true;
      store = newStore;
      setTimeout(() => {
        loading = false;
      });
    }
  }

  onMount(update);
  WindowStore.subscribe(update);
  UserData.subscribe(update);
</script>

{#if !loading && $UserData.sh.desktop.icons}
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
