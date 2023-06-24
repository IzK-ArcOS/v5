<script lang="ts">
  import { UserData } from "../../../../ts/userlogic/interfaces";
  import logo from "../../../../assets/systemIcon.svg";
  import {
    WindowStore,
    getOpenedStore,
    maxZIndex,
  } from "../../../../ts/applogic/store";
  import type { App } from "../../../../ts/applogic/interface";
  import AppButton from "./Launcher/AppButton.svelte";

  let oa: App[] = [];

  WindowStore.subscribe(() => {
    oa = getOpenedStore();
  });
</script>

<div
  class="launcher-bar"
  class:colored={$UserData.sh.taskbar.colored}
  class:visible={$UserData.sh.taskbar.isLauncher}
  style="z-index: {$maxZIndex + 20}"
>
  <button class="apps">
    <img src={logo} alt="ArcOS" />
  </button>
  <div class="opened-apps">
    {#each oa as app}
      <AppButton {app} />
    {/each}
  </div>
</div>
