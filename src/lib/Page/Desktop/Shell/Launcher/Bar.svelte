<script lang="ts">
  import { ProcessStore, maxZIndex } from "../../../../../ts/applogic/store";
  import { Logo } from "../../../../../ts/branding";
  import { showArcFind } from "../../../../../ts/search/main";
  import { UserData } from "../../../../../ts/userlogic/interfaces";
  import AppButton from "./Bar/AppButton.svelte";
  import Trigger from "./Bar/Trigger.svelte";

  let visible = false;
  let dockfocused = false;
  let interval: NodeJS.Timeout;

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
  class="launcher-bar"
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
    {#each Object.entries($ProcessStore) as [pid, proc]}
      {#if !proc.app.info.hidden}
        <AppButton process={proc} />
      {/if}
    {/each}
  </div>
</div>
<Trigger bind:visible {dockfocused} bind:interval />
