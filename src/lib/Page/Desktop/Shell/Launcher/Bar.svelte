<script lang="ts">
  import type { App } from "../../../../../ts/applogic/interface";
  import {
    WindowStore,
    getOpenedStore,
    maxZIndex,
  } from "../../../../../ts/applogic/store";
  import { Logo } from "../../../../../ts/branding";
  import { showArcFind } from "../../../../../ts/search/main";
  import { UserData } from "../../../../../ts/userlogic/interfaces";
  import AppButton from "./Bar/AppButton.svelte";
  import Trigger from "./Bar/Trigger.svelte";

  let oa: App[] = [];
  let visible = false;
  let dockfocused = false;
  let interval: NodeJS.Timeout;

  WindowStore.subscribe(() => {
    oa = getOpenedStore();
  });

  function mouseenter() {
    dockfocused = true;
    clearTimeout(interval);
  }

  function mouseleave() {
    dockfocused = false;
    interval = setTimeout(() => {
      visible = false;
    }, 1000);
  }

  function toggleLauncher() {
    $showArcFind = !$showArcFind;
  }
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  class="launcher-bar shell-colored"
  class:colored={$UserData.sh.taskbar.colored}
  class:visible
  style="z-index: {$maxZIndex + 31}"
  on:mouseenter={mouseenter}
  on:mouseleave={mouseleave}
>
  <button class="apps" on:click={toggleLauncher}>
    <img src={Logo()} alt="ArcOS" />
  </button>
  <div class="opened-apps">
    {#each oa as app}
      {#if !app.info.hidden}
        <AppButton {app} />
      {/if}
    {/each}
  </div>
</div>
<Trigger bind:visible {dockfocused} bind:interval />
